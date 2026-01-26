#!/usr/bin/env node

/**
 * Link and Endpoint Checker for XPR Network Documentation
 *
 * This script validates:
 * 1. API endpoints by checking /v1/chain/get_info
 * 2. HTTP/HTTPS links in markdown files
 * 3. GitHub repository links
 *
 * Usage:
 *   node scripts/check-links.js [options]
 *
 * Options:
 *   --endpoints-only    Only check API endpoints from endpoints.md
 *   --links-only        Only check markdown links
 *   --verbose           Show all results, not just failures
 *   --timeout=<ms>      Set request timeout (default: 10000)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const CONFIG = {
  srcDir: path.join(__dirname, '..', 'src'),
  timeout: 10000,
  verbose: false,
  endpointsOnly: false,
  linksOnly: false,
  // URLs to skip (known to be examples, block bots, or intentionally broken)
  skipPatterns: [
    /localhost/,
    /127\.0\.0\.1/,
    /example\.com/,
    /your[_-]?server/i,
    /YOU_ACCOUNT/,
    /ACCOUNT_NAME/,
    /youracc/,
    /<.*>/,  // Template placeholders
    /twitter\.com/,  // Twitter blocks bots
    /x\.com/,  // X (Twitter) blocks bots
    /npmjs\.com/,  // npmjs blocks bots with 403
    /github\.com\/user\/repo/,  // Example repo placeholder
    // API endpoints (checked by --endpoints-only, often return 404 at root)
    /proton\.eosusa\.io$/,
    /proton\.cryptolions\.io$/,
    /api\.protonnz\.com$/,
    /proton\.protonuk\.io$/,
    /proton\.eoscafeblock\.com$/,
    /api\.totalproton\.tech$/,
    /mainnet\.brotonbp\.com$/,
    /proton\.eu\.eosamsterdam\.net$/,
    /protonapi\.blocksindia\.com$/,
    /api-xprnetwork-main\.saltant\.io$/,
    /protonapi\.ledgerwise\.io$/,
    /proton-api\.eosiomadrid\.io$/,
    /proton\.genereos\.io$/,
    /api-proton\.nodeone\.network/,
    /proton-public\.neftyblocks\.com$/,
    /api-proton\.eosarabia\.net$/,
    /api\.luminaryvisn\.com$/,
    /testnet-api\.alvosec\.com$/,
    /proton-testnet\.cryptolions\.io$/,
    /testnet\.brotonbp\.com$/,
    /testnet-api\.xprcore\.com$/,
    /protontest\.eu\.eosamsterdam\.net$/,
    /api-xprnetwork-test\.saltant\.io$/,
    /testnet-api\.xprdata\.org$/,
    /testnet\.rockerone\.io$/,
    /test\.proton\.eosusa\.io$/,
  ],
  // File patterns to check
  markdownPattern: /\.md$/,
};

// Parse command line arguments
process.argv.slice(2).forEach(arg => {
  if (arg === '--endpoints-only') CONFIG.endpointsOnly = true;
  if (arg === '--links-only') CONFIG.linksOnly = true;
  if (arg === '--verbose') CONFIG.verbose = true;
  if (arg.startsWith('--timeout=')) CONFIG.timeout = parseInt(arg.split('=')[1], 10);
});

// Results tracking
const results = {
  endpoints: { passed: [], failed: [] },
  links: { passed: [], failed: [], skipped: [] },
};

/**
 * Make an HTTP/HTTPS request and return a promise
 */
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;

    const reqOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      timeout: CONFIG.timeout,
      headers: {
        'User-Agent': 'XPR-Docs-Link-Checker/1.0',
        ...options.headers,
      },
    };

    const req = client.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data,
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

/**
 * Check if an API endpoint is healthy
 */
async function checkApiEndpoint(endpoint) {
  const url = endpoint.endsWith('/') ? endpoint : endpoint + '/';
  const infoUrl = url + 'v1/chain/get_info';

  try {
    const response = await makeRequest(infoUrl);
    if (response.statusCode === 200) {
      const data = JSON.parse(response.data);
      if (data.head_block_num) {
        return {
          success: true,
          endpoint,
          headBlock: data.head_block_num,
          chainId: data.chain_id?.substring(0, 16) + '...',
        };
      }
    }
    return { success: false, endpoint, error: `Status: ${response.statusCode}` };
  } catch (error) {
    return { success: false, endpoint, error: error.message };
  }
}

/**
 * Check if a URL is reachable
 */
async function checkUrl(url, source) {
  // Skip certain patterns
  for (const pattern of CONFIG.skipPatterns) {
    if (pattern.test(url)) {
      return { success: 'skipped', url, source, reason: 'Matches skip pattern' };
    }
  }

  try {
    const response = await makeRequest(url, { method: 'HEAD' });

    // Follow redirects for 301/302
    if ([301, 302, 307, 308].includes(response.statusCode) && response.headers.location) {
      const redirectUrl = response.headers.location.startsWith('http')
        ? response.headers.location
        : new URL(response.headers.location, url).href;
      return checkUrl(redirectUrl, source);
    }

    if (response.statusCode >= 200 && response.statusCode < 400) {
      return { success: true, url, source, statusCode: response.statusCode };
    }

    // Some servers don't support HEAD, try GET
    if (response.statusCode === 405) {
      const getResponse = await makeRequest(url);
      if (getResponse.statusCode >= 200 && getResponse.statusCode < 400) {
        return { success: true, url, source, statusCode: getResponse.statusCode };
      }
      return { success: false, url, source, error: `Status: ${getResponse.statusCode}` };
    }

    return { success: false, url, source, error: `Status: ${response.statusCode}` };
  } catch (error) {
    return { success: false, url, source, error: error.message };
  }
}

/**
 * Extract URLs from markdown content
 */
function extractUrls(content, filePath) {
  const urls = [];

  // Match markdown links: [text](url)
  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const url = match[2].trim();
    if (url.startsWith('http://') || url.startsWith('https://')) {
      urls.push({ url, source: filePath, context: match[1] });
    }
  }

  // Match bare URLs in code blocks (stop at quotes, brackets, and HTML entities)
  const bareUrlRegex = /https?:\/\/[^\s\n\r'"`<>\]\[()&]+/g;
  while ((match = bareUrlRegex.exec(content)) !== null) {
    const url = match[0].replace(/[.,;:!?)]+$/, ''); // Clean trailing punctuation
    // Avoid duplicates
    if (!urls.find(u => u.url === url)) {
      urls.push({ url, source: filePath, context: 'code/text' });
    }
  }

  return urls;
}

/**
 * Extract API endpoints from endpoints.md
 */
function extractApiEndpoints(content) {
  const endpoints = [];
  const lines = content.split('\n');

  let inCodeBlock = false;
  for (const line of lines) {
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      const trimmed = line.trim();
      if (trimmed.startsWith('https://') && !trimmed.includes(' ')) {
        // Check if it looks like an API endpoint (not a docs URL)
        if (!trimmed.includes('/v2/docs') && !trimmed.includes('/v1/')) {
          endpoints.push(trimmed);
        }
      }
    }
  }

  return [...new Set(endpoints)]; // Remove duplicates
}

/**
 * Recursively find all markdown files
 */
function findMarkdownFiles(dir) {
  const files = [];

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        walk(fullPath);
      } else if (entry.isFile() && CONFIG.markdownPattern.test(entry.name)) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

/**
 * Main function
 */
async function main() {
  console.log('XPR Network Documentation Link Checker\n');
  console.log('='.repeat(50));

  // Check API endpoints
  if (!CONFIG.linksOnly) {
    console.log('\n## Checking API Endpoints\n');

    const endpointsFile = path.join(CONFIG.srcDir, 'client-sdks', 'endpoints.md');
    if (fs.existsSync(endpointsFile)) {
      const content = fs.readFileSync(endpointsFile, 'utf-8');
      const endpoints = extractApiEndpoints(content);

      console.log(`Found ${endpoints.length} API endpoints to check...\n`);

      for (const endpoint of endpoints) {
        process.stdout.write(`  Checking ${endpoint}... `);
        const result = await checkApiEndpoint(endpoint);

        if (result.success) {
          results.endpoints.passed.push(result);
          console.log(`\x1b[32mOK\x1b[0m (block: ${result.headBlock})`);
        } else {
          results.endpoints.failed.push(result);
          console.log(`\x1b[31mFAILED\x1b[0m - ${result.error}`);
        }
      }
    } else {
      console.log('  endpoints.md not found!');
    }
  }

  // Check markdown links
  if (!CONFIG.endpointsOnly) {
    console.log('\n## Checking Documentation Links\n');

    const markdownFiles = findMarkdownFiles(CONFIG.srcDir);
    console.log(`Found ${markdownFiles.length} markdown files to scan...\n`);

    const allUrls = [];
    for (const file of markdownFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const relativePath = path.relative(CONFIG.srcDir, file);
      const urls = extractUrls(content, relativePath);
      allUrls.push(...urls);
    }

    // Deduplicate URLs
    const uniqueUrls = [];
    const seen = new Set();
    for (const item of allUrls) {
      if (!seen.has(item.url)) {
        seen.add(item.url);
        uniqueUrls.push(item);
      }
    }

    console.log(`Found ${uniqueUrls.length} unique URLs to check...\n`);

    for (const item of uniqueUrls) {
      process.stdout.write(`  Checking ${item.url.substring(0, 60)}${item.url.length > 60 ? '...' : ''}... `);
      const result = await checkUrl(item.url, item.source);

      if (result.success === true) {
        results.links.passed.push(result);
        console.log(`\x1b[32mOK\x1b[0m`);
      } else if (result.success === 'skipped') {
        results.links.skipped.push(result);
        console.log(`\x1b[33mSKIPPED\x1b[0m - ${result.reason}`);
      } else {
        results.links.failed.push(result);
        console.log(`\x1b[31mFAILED\x1b[0m - ${result.error}`);
      }
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('\n## Summary\n');

  if (!CONFIG.linksOnly) {
    console.log(`API Endpoints:`);
    console.log(`  \x1b[32mPassed: ${results.endpoints.passed.length}\x1b[0m`);
    console.log(`  \x1b[31mFailed: ${results.endpoints.failed.length}\x1b[0m`);
  }

  if (!CONFIG.endpointsOnly) {
    console.log(`Documentation Links:`);
    console.log(`  \x1b[32mPassed: ${results.links.passed.length}\x1b[0m`);
    console.log(`  \x1b[31mFailed: ${results.links.failed.length}\x1b[0m`);
    console.log(`  \x1b[33mSkipped: ${results.links.skipped.length}\x1b[0m`);
  }

  // Print failed items in detail
  const totalFailed = results.endpoints.failed.length + results.links.failed.length;
  if (totalFailed > 0) {
    console.log('\n## Failed Items\n');

    for (const item of results.endpoints.failed) {
      console.log(`  \x1b[31m[ENDPOINT]\x1b[0m ${item.endpoint}`);
      console.log(`            Error: ${item.error}`);
    }

    for (const item of results.links.failed) {
      console.log(`  \x1b[31m[LINK]\x1b[0m ${item.url}`);
      console.log(`         Source: ${item.source}`);
      console.log(`         Error: ${item.error}`);
    }
  }

  // Exit with error code if there are failures
  process.exit(totalFailed > 0 ? 1 : 0);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
