# XPR Network Documentation Improvement Plan

**Repository:** https://github.com/paulgnz/ts-smart-contract-docs
**Primary Audience:** New Developers
**Secondary Audiences:** AI Agents, Enterprise/Institutional Teams
**Approach:** Full Professional Rewrite with New Content

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Phase 1: Critical Fixes](#phase-1-critical-fixes-immediate)
3. [Phase 2: Professional Tone Rewrite](#phase-2-professional-tone-rewrite)
4. [Phase 3: New Documentation Sections](#phase-3-new-documentation-sections)
5. [Phase 4: Structure & Navigation Improvements](#phase-4-structure--navigation-improvements)
6. [Phase 5: AI Agent Optimization](#phase-5-ai-agent-optimization)
7. [Phase 6: Enterprise Readiness](#phase-6-enterprise-readiness)
8. [Implementation Checklist](#implementation-checklist)

---

## Executive Summary

This plan outlines a comprehensive overhaul of the XPR Network developer documentation to make it:
- **Beginner-friendly** with clear learning paths
- **Professionally written** with consistent, formal tone
- **Complete** with all necessary sections for production use
- **AI-parseable** with structured, unambiguous content
- **Enterprise-ready** with security, compliance, and DevOps guidance

### Current State Assessment

| Category | Current Score | Target Score |
|----------|---------------|--------------|
| Clarity for New Developers | 6.5/10 | 9/10 |
| Technical Accuracy | 7.5/10 | 9.5/10 |
| Code Examples Quality | 4.5/10 | 9/10 |
| AI Agent Suitability | 5.5/10 | 8.5/10 |
| Enterprise Readiness | 4/10 | 8/10 |

---

## Phase 1: Critical Fixes (Immediate)

### 1.1 Code Errors That Must Be Fixed

| File | Line | Issue | Fix |
|------|------|-------|-----|
| `getting-started/action-transactions-executions-order.md` | 16 | Typo: `"tranfer"` | Change to `"transfer"` |
| `getting-started/action-transactions-executions-order.md` | 20 | Incomplete JSON structure | Add closing brace |
| `contract-sdk/api/inlineAction.md` | All | Wrong content (duplicates notify.md) | Complete rewrite with InlineAction class documentation |
| `contract-sdk/classes/checksum/Checksum256.md` | 45, 50 | References "Checksum160" instead of "Checksum256" | Fix type references |
| `contract-sdk/classes/keys/ECCPublicKey.md` | 36, 41, 46, 51 | References "PublicKey" instead of "ECCPublicKey" | Fix type references |
| `contract-sdk/classes/keys/WebauthNPublicKey.md` | 15, 69, 74 | Wrong descriptions and type references | Fix all copy-paste errors |
| `contract-sdk/classes/keys/PublicKey.md` | 50 | Duplicate field definition | Remove duplicate |
| `contract-sdk/api/print.md` | 102, 169 | Output format inconsistencies | Correct output examples |
| `signing-and-pushing-transactions/signing-and-pushing-transactions.md` | 67 | Hardcoded private key | Replace with placeholder and security warning |

### 1.2 Incomplete Documentation to Complete

| File | Issue | Action |
|------|-------|--------|
| `getting-started/data-types.md` | Ends mid-sentence at line 12 | Complete the "important concepts" section with full explanations of: Asset format, Symbol structure, Hash formats, Key types, JSON serialization |
| `contract-sdk/examples.md` | Links with no descriptions | Add 2-3 sentence descriptions for each example explaining what developers will learn |
| `contract-sdk/api/notify.md` | Functions listed without usage examples | Add complete usage examples with context |
| `contract-sdk/classes/Action.md` | Single brief section | Document: Constructor parameters, send() method, authorization patterns, inline action creation |
| `contract-sdk/classes/Signature.md` | Minimal documentation | Add: Validation patterns, verification examples, real-world use cases |
| `contract-sdk/api/cryptography.md` | Only function signatures | Add: Practical usage examples, algorithm selection guidance, security considerations |

### 1.3 Sidebar Configuration Fix

**File:** `src/.vuepress/sidebar.js`

```javascript
// Lines 84-89 - Duplicate "Storage" entry
{
  title: "Storage",           // Line 84 - Correct
  path: "/documentations/proton-web-sdk/storage.md",
},
{
  title: "Storage",           // Line 88 - WRONG: Should be "WalletTypeSelector"
  path: "/documentations/proton-web-sdk/walletTypeSelector.md",
},
```

**Fix:** Change line 88 title from "Storage" to "WalletTypeSelector"

---

## Phase 2: Professional Tone Rewrite

### 2.1 Files Requiring Tone Updates

#### High Priority (Casual/Unprofessional Language)

| File | Issues | Examples to Remove/Rewrite |
|------|--------|---------------------------|
| `getting-started/introduction.md` | Casual language, exclamations | "Wayyyy much faster", "Yeah sorry", "So smart!", "Break things!" |
| `getting-started/terminology.md` | Informal phrasing, emoji | "awesome team", "flavors" (use "variants"), Line 9 emoji |
| `getting-started/data-types.md` | Unprofessional commentary | "(wut??)", "So smart!" |
| `getting-started/mainnet-vs-testnet.md` | Emoji usage | Line 3 emoji, "blazingly fast" |
| `contract-sdk/globals.md` | Emoji instead of text | Replace all emoji icons with text labels |
| `contract-sdk/concepts.md` | Emoji usage | Replace emoji with professional text |
| `getting-started/action-transactions-executions-order.md` | Informal opening | "Bear with me" should be removed |

### 2.2 Tone Guidelines for Rewrite

**Before (Current):**
> "Wayyyy much faster execution than other chains! Zero gas fees (Yup, you read that right!). Super affordable..."

**After (Professional):**
> "XPR Network provides sub-second transaction finality with zero gas fees. This cost-efficient model enables developers to build applications without transaction fee overhead."

**Writing Standards:**
1. Use active voice and present tense
2. Avoid exclamation marks (use periods)
3. Replace casual phrases with technical equivalents
4. Remove all emoji from technical documentation
5. Use "Note:" or "Important:" callouts instead of informal warnings
6. Maintain consistent capitalization (XPR Network, not XPRNetwork)

### 2.3 Terminology Standardization

| Inconsistent | Standard Form |
|-------------|---------------|
| XPRNetwork / XPR Network | XPR Network |
| action / Action | action (lowercase in prose, PascalCase in code) |
| permission / Permission | permission (lowercase in prose) |
| Tables / tables | tables (lowercase) |
| mainnet / Mainnet | mainnet (lowercase) |
| testnet / Testnet | testnet (lowercase) |
| smart contract / Smart Contract | smart contract (lowercase) |

---

## Phase 3: New Documentation Sections

### 3.1 Glossary (New File)

**Location:** `src/getting-started/glossary.md`

**Content Structure:**
```markdown
# Glossary

## Core Concepts
- **Account**: A unique identifier on the XPR Network blockchain...
- **Action**: A single operation within a transaction...
- **Authorization**: The permission required to execute an action...
[Continue for all 30+ terms]

## Resources
- **CPU**: Computational resource measured in microseconds...
- **NET**: Network bandwidth measured in bytes...
- **RAM**: On-chain storage measured in bytes...

## Smart Contract Terms
- **ABI**: Application Binary Interface...
- **WASM**: WebAssembly binary format...
- **Table**: Persistent storage structure...

## Wallet & Security
- **Mnemonic**: A 12 or 24-word recovery phrase...
- **Private Key**: A cryptographic key for signing...
- **WebAuth**: XPR Network's keyless authentication...
```

### 3.2 Production Deployment Guide (New File)

**Location:** `src/guides/production-deployment.md`

**Content Structure:**
```markdown
# Production Deployment Guide

## Overview
This guide covers deploying smart contracts and dApps to XPR Network mainnet.

## Prerequisites
- Completed testnet deployment and testing
- Security audit (recommended for contracts handling value)
- Mainnet account with sufficient resources

## Mainnet vs Testnet Differences
| Aspect | Testnet | Mainnet |
|--------|---------|---------|
| Chain ID | 71ee83bc... | 384da888... |
| Token Value | No real value | Real XPR tokens |
| Faucet | Available | Not available |
| Block Producers | Limited set | Full network |

## Pre-Deployment Checklist
- [ ] All tests passing on testnet
- [ ] Security review completed
- [ ] Resource requirements calculated
- [ ] Backup of contract code and ABI
- [ ] Rollback plan documented

## Deployment Steps
1. Verify mainnet account
2. Purchase required RAM
3. Stake for CPU/NET
4. Deploy contract
5. Verify deployment
6. Update endpoints in dApp

## Post-Deployment Monitoring
- Transaction success rates
- Resource consumption
- Error logging

## Rollback Procedures
- How to revert to previous contract version
- Data migration considerations
```

### 3.3 Security Best Practices Guide (New File)

**Location:** `src/guides/security-best-practices.md`

**Content Structure:**
```markdown
# Security Best Practices

## Smart Contract Security

### Input Validation
- Always validate action parameters
- Check authorization before state changes
- Validate asset amounts and symbols

### Common Vulnerabilities
1. **Reentrancy**: Use checks-effects-interactions pattern
2. **Integer Overflow**: Use SafeMath operations
3. **Authorization Bypass**: Always verify `require_auth()`
4. **Resource Exhaustion**: Limit iteration counts

### Code Examples
[Include secure vs insecure code comparisons]

## Key Management
- Never commit private keys to version control
- Use environment variables for sensitive data
- Implement key rotation procedures
- Consider hardware wallets for high-value accounts

## Permission Architecture
- Principle of least privilege
- Separate owner and active permissions
- Use custom permissions for specific actions
- Multi-signature for critical operations

## Audit Checklist
- [ ] All inputs validated
- [ ] Authorization checked on all actions
- [ ] No hardcoded sensitive values
- [ ] Overflow protection in place
- [ ] Edge cases handled
- [ ] Error messages don't leak sensitive info

## Incident Response
- Contact procedures
- Emergency pause mechanisms
- Communication templates
```

### 3.4 Troubleshooting Guide (New File)

**Location:** `src/guides/troubleshooting.md`

**Content Structure:**
```markdown
# Troubleshooting Guide

## Common Error Messages

### Transaction Errors
| Error | Cause | Solution |
|-------|-------|----------|
| `eosio_assert_message assertion failure` | Check failed in contract | Review the assertion message for details |
| `transaction net usage is too high` | Insufficient NET staked | Stake more XPR for NET |
| `billed CPU time exceeded` | Contract too CPU-intensive | Optimize code or stake more CPU |
| `account does not exist` | Invalid account name | Verify account exists on chain |
| `missing required authority` | Wrong permission used | Check authorization requirements |

### Deployment Errors
| Error | Cause | Solution |
|-------|-------|----------|
| `insufficient ram` | Not enough RAM purchased | Buy more RAM bytes |
| `wasm validation error` | Invalid WASM binary | Rebuild contract |
| `ABI serialization error` | ABI mismatch | Regenerate and redeploy ABI |

### SDK Errors
| Error | Cause | Solution |
|-------|-------|----------|
| `Network request failed` | Endpoint unreachable | Try alternate endpoint |
| `Session expired` | Login timeout | Re-authenticate user |
| `Invalid signature` | Wrong key used | Verify correct account/permission |

## Debugging Techniques
1. Using print statements in contracts
2. Reading transaction traces
3. Testing with playground
4. Using block explorer

## Getting Help
- GitHub Issues: [link]
- Discord: [link]
- Telegram: [link]
```

### 3.5 Error Handling Patterns (New File)

**Location:** `src/guides/error-handling.md`

**Content Structure:**
```markdown
# Error Handling Patterns

## Smart Contract Error Handling

### Using check() and assert()
[Examples with proper error messages]

### Custom Error Types
[Pattern for defining and throwing errors]

## SDK Error Handling

### Transaction Errors
[try/catch patterns with retry logic]

### Network Errors
[Fallback endpoints, timeout handling]

### Authentication Errors
[Session recovery, re-authentication flows]

## Best Practices
- Use descriptive error messages
- Log errors appropriately
- Implement retry logic for transient failures
- Provide user-friendly error messages in dApps
```

### 3.6 Learning Path / Roadmap (New File)

**Location:** `src/getting-started/learning-path.md`

**Content Structure:**
```markdown
# Developer Learning Path

## Beginner Track (Week 1-2)

### Day 1-2: Fundamentals
1. [What's XPR Network](/getting-started/introduction)
2. [Key Terminology](/getting-started/terminology)
3. [Mainnet vs Testnet](/getting-started/mainnet-vs-testnet)

### Day 3-4: Core Concepts
4. [Data Types](/getting-started/data-types)
5. [Actions & Transactions](/getting-started/action-transactions-executions-order)
6. [Accounts & Permissions](/getting-started/accounts-and-permissions)

### Day 5-7: First Steps
7. [CLI Crash Course](/cli-101/cli-crash-course)
8. [Reading On-Chain Data](/reading-onchain-data/reading-onchain-data)

## Intermediate Track (Week 3-4)

### Smart Contract Development
1. [Write Your First Contract](/smart-contracts/write-your-first-smart-contract)
2. [Storage & Tables](/contract-sdk/storage)
3. [Inline Actions](/contract-sdk/inline-actions)
4. [Testing](/contract-sdk/testing)

### dApp Development
5. [Signing Transactions](/signing-and-pushing-transactions/signing-and-pushing-transactions)
6. [Your First dApp](/your-first-dapp-with-the-web-sdk/your-first-dapp-with-the-web-sdk)

## Advanced Track (Week 5+)

### Production Readiness
1. [Security Best Practices](/guides/security-best-practices)
2. [Production Deployment](/guides/production-deployment)
3. [Error Handling](/guides/error-handling)

### Mastery
- Multi-signature workflows
- Custom permission structures
- Advanced table indexing
- Performance optimization

## Learning Outcomes

By completing this path, you will be able to:
- Understand XPR Network architecture
- Write and deploy smart contracts
- Build full-stack dApps
- Follow security best practices
- Deploy to production with confidence
```

### 3.7 Quick Start Guide (New File)

**Location:** `src/getting-started/quick-start.md`

**Content Structure:**
```markdown
# Quick Start Guide

Get from zero to your first transaction in 10 minutes.

## Prerequisites
- Node.js 20+
- npm or yarn
- Code editor (VS Code recommended)

## Step 1: Install CLI (2 minutes)
\`\`\`bash
npm install -g @proton/cli
proton version
\`\`\`

## Step 2: Create Account (3 minutes)
\`\`\`bash
proton account:create myaccount123
\`\`\`
[Verification steps]

## Step 3: Get Test Tokens (1 minute)
\`\`\`bash
proton faucet:claim myaccount123
\`\`\`

## Step 4: Send Your First Transaction (2 minutes)
\`\`\`bash
proton action eosio.token transfer ...
\`\`\`

## Step 5: Verify on Explorer (2 minutes)
[Link to explorer with instructions]

## What's Next?
- [Read data from the chain](/reading-onchain-data/reading-onchain-data)
- [Build your first dApp](/your-first-dapp-with-the-web-sdk/your-first-dapp-with-the-web-sdk)
- [Write a smart contract](/smart-contracts/write-your-first-smart-contract)
```

---

## Phase 4: Structure & Navigation Improvements

### 4.1 Homepage Updates

**File:** `src/index.md`

**Changes:**
1. Add "Quick Start" card linking to new quick-start guide
2. Add "Learning Path" card for guided journey
3. Update tool descriptions to remove informal language ("come with super power!")
4. Add "Documentation" section with categorized links:
   - Tutorials
   - API Reference
   - Guides
   - Examples

### 4.2 Sidebar Restructure

**File:** `src/.vuepress/sidebar.js`

**Proposed New Structure:**

```javascript
// New sidebar organization
[
  {
    title: "Getting Started",
    collapsable: false,
    children: [
      { title: "Quick Start", path: "/getting-started/quick-start" },
      { title: "Learning Path", path: "/getting-started/learning-path" },
      { title: "What's XPR Network", path: "/getting-started/introduction" },
      { title: "Terminology", path: "/getting-started/terminology" },
      { title: "Glossary", path: "/getting-started/glossary" },
    ]
  },
  {
    title: "Core Concepts",
    collapsable: true,
    children: [
      { title: "Mainnet vs Testnet", path: "/getting-started/mainnet-vs-testnet" },
      { title: "Data Types", path: "/getting-started/data-types" },
      { title: "Actions & Transactions", path: "/getting-started/action-transactions-executions-order" },
      { title: "Accounts & Permissions", path: "/getting-started/accounts-and-permissions" },
    ]
  },
  {
    title: "Tutorials",
    collapsable: true,
    children: [
      { title: "CLI Crash Course", path: "/cli-101/cli-crash-course" },
      { title: "Reading On-Chain Data", path: "/reading-onchain-data/reading-onchain-data" },
      { title: "Signing Transactions", path: "/signing-and-pushing-transactions/signing-and-pushing-transactions" },
      { title: "Your First dApp", path: "/your-first-dapp-with-the-web-sdk/your-first-dapp-with-the-web-sdk" },
      { title: "Your First Smart Contract", path: "/smart-contracts/write-your-first-smart-contract" },
    ]
  },
  {
    title: "Guides",
    collapsable: true,
    children: [
      { title: "Security Best Practices", path: "/guides/security-best-practices" },
      { title: "Production Deployment", path: "/guides/production-deployment" },
      { title: "Error Handling", path: "/guides/error-handling" },
      { title: "Troubleshooting", path: "/guides/troubleshooting" },
    ]
  },
  // ... existing Documentation section
]
```

### 4.3 Cross-References & Navigation

**Add to each page:**
- "Prerequisites" section at the top (what you should know first)
- "Next Steps" section at the bottom (where to go after this)
- Related pages links in sidebars

**Example format:**
```markdown
---
## Prerequisites
Before reading this page, you should be familiar with:
- [Key Terminology](/getting-started/terminology)
- [Accounts & Permissions](/getting-started/accounts-and-permissions)

---

[Page content]

---

## Next Steps
Now that you understand [topic], continue to:
- [Next Topic](/path/to/next)
- [Related Topic](/path/to/related)
```

---

## Phase 5: AI Agent Optimization

### 5.1 Structured Data Formats

**Add to each tutorial/guide:**

```markdown
## Quick Reference

### Commands Used
| Command | Purpose | Example |
|---------|---------|---------|
| `proton account:create` | Create new account | `proton account:create myaccount` |

### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `account` | string | Yes | Account name (1-12 chars, a-z, 1-5) |

### Return Values
| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Whether operation succeeded |
| `transaction_id` | string | Transaction hash if successful |
```

### 5.2 Validation Rules Documentation

**Add to relevant pages:**

```markdown
## Validation Rules

### Account Names
- Length: 1-12 characters
- Allowed characters: a-z, 1-5
- Cannot start with a number
- Regex: `^[a-z][a-z1-5]{0,11}$`

### Asset Amounts
- Format: `"0.0000 SYMBOL"`
- Precision: Depends on token (XPR=4, FOOBAR=6)
- Example: `"10.0000 XPR"`
```

### 5.3 Deterministic Examples

**Update all examples to include:**
1. Exact expected input format
2. Exact expected output format
3. Success verification criteria
4. Error conditions and messages

**Example:**
```markdown
## Create Account

**Input:**
\`\`\`bash
proton account:create testaccount1
\`\`\`

**Expected Output (Success):**
\`\`\`
Account created: testaccount1
Transaction ID: abc123...
\`\`\`

**Expected Output (Error - Account Exists):**
\`\`\`
Error: Account testaccount1 already exists
\`\`\`

**Verification:**
\`\`\`bash
proton account:info testaccount1
# Should show account details
\`\`\`
```

---

## Phase 6: Enterprise Readiness

### 6.1 New Enterprise Documentation

**Location:** `src/enterprise/` (new directory)

**Files to create:**
1. `src/enterprise/devops-guide.md` - CI/CD, deployment pipelines
2. `src/enterprise/monitoring.md` - Logging, alerting, observability
3. `src/enterprise/compliance.md` - Audit trails, regulatory considerations
4. `src/enterprise/team-workflows.md` - Multi-developer coordination
5. `src/enterprise/disaster-recovery.md` - Backup, recovery procedures

### 6.2 Version Information

**Add to each page:**
```markdown
---
lastUpdated: 2026-01-26
sdkVersion: "@proton/cli@1.0.0"
chainVersion: "Antelope 3.x"
---
```

### 6.3 API Versioning Documentation

**Create:** `src/enterprise/api-versioning.md`

Cover:
- SDK version compatibility
- ABI versioning strategies
- Contract upgrade patterns
- Backwards compatibility considerations

---

## Implementation Checklist

### Phase 1: Critical Fixes
- [ ] Fix "tranfer" typo in action-transactions-executions-order.md
- [ ] Fix incomplete JSON in action-transactions-executions-order.md
- [ ] Rewrite api/inlineAction.md with correct content
- [ ] Fix type references in Checksum256.md
- [ ] Fix type references in ECCPublicKey.md
- [ ] Fix type references in WebauthNPublicKey.md
- [ ] Remove duplicate in PublicKey.md
- [ ] Fix print.md output examples
- [ ] Replace hardcoded private key in signing-and-pushing-transactions.md
- [ ] Complete data-types.md
- [ ] Add descriptions to examples.md
- [ ] Expand notify.md with examples
- [ ] Expand Action.md documentation
- [ ] Expand Signature.md documentation
- [ ] Add examples to cryptography.md
- [ ] Fix sidebar duplicate "Storage" entry

### Phase 2: Professional Tone
- [ ] Rewrite introduction.md
- [ ] Rewrite terminology.md
- [ ] Rewrite data-types.md
- [ ] Update mainnet-vs-testnet.md
- [ ] Replace emoji in globals.md
- [ ] Replace emoji in concepts.md
- [ ] Update action-transactions-executions-order.md
- [ ] Standardize "XPR Network" across all files
- [ ] Standardize lowercase terminology

### Phase 3: New Content
- [ ] Create glossary.md
- [ ] Create production-deployment.md
- [ ] Create security-best-practices.md
- [ ] Create troubleshooting.md
- [ ] Create error-handling.md
- [ ] Create learning-path.md
- [ ] Create quick-start.md

### Phase 4: Structure
- [ ] Update homepage (index.md)
- [ ] Restructure sidebar.js
- [ ] Add prerequisites to all pages
- [ ] Add next steps to all pages
- [ ] Add cross-references

### Phase 5: AI Optimization
- [ ] Add quick reference tables
- [ ] Add validation rules
- [ ] Make examples deterministic
- [ ] Add success/error output examples

### Phase 6: Enterprise
- [ ] Create enterprise directory
- [ ] Add devops-guide.md
- [ ] Add monitoring.md
- [ ] Add compliance.md
- [ ] Add team-workflows.md
- [ ] Add disaster-recovery.md
- [ ] Add version information to pages
- [ ] Create api-versioning.md

---

## Estimated Effort

| Phase | Files | New Content | Estimated Effort |
|-------|-------|-------------|------------------|
| Phase 1 | 16 fixes | None | Medium |
| Phase 2 | 7+ files | Rewrites | Medium |
| Phase 3 | 7 new files | ~20 pages | High |
| Phase 4 | 5+ files | Navigation | Medium |
| Phase 5 | All tutorials | Tables/formats | Medium |
| Phase 6 | 6 new files | ~15 pages | High |

---

## Success Metrics

After implementation, the documentation should achieve:

1. **New Developer Success Rate**: 90%+ can complete Quick Start without assistance
2. **Time to First Transaction**: Under 15 minutes for new developers
3. **Search Findability**: All common questions answered within 2 clicks
4. **Code Example Success**: 100% of examples run without modification
5. **Professional Appearance**: Zero informal language, zero emoji in technical docs
6. **Completeness**: Zero "coming soon" or incomplete sections

---

## Next Steps

1. Review this plan and provide feedback
2. Prioritize phases if full implementation is not feasible
3. Begin implementation with Phase 1 (Critical Fixes)
4. Create a branch for improvements: `feature/documentation-overhaul`
5. Submit PRs in logical groupings for review

---

*Plan created: January 26, 2026*
*Target audience: New Developers, AI Agents, Enterprise Teams*

---

## Appendix A: Real-World Developer Insights

The following insights come from actual development experience across multiple XPR Network projects (Protonlink, XPR-Slots, XPR-Message, ProtonRating, PriceBattle). These MUST be incorporated into the documentation.

### A.1 CRITICAL: Mobile Wallet Integration (Not Documented!)

**Source:** xpr-slots/SUGGESTIONS.md

The current docs do NOT mention that `@proton/link` is required for mobile wallet signing. This causes hours of debugging.

**Problem:** Mobile wallet signing gets stuck on "Processing..." forever without `@proton/link`.

**The 6 Critical Requirements:**

| # | Requirement | Why It Matters |
|---|-------------|----------------|
| 1 | Install both packages | `@proton/link` provides mobile transport layer |
| 2 | Use dynamic imports with Promise.all | Static imports don't reliably initialize mobile handlers |
| 3 | Set `requestAccount` | Identifies your dApp for deep link callbacks |
| 4 | Set `enabledWalletTypes` | Shows both browser and mobile wallet options |
| 5 | Set `requestStatus: true` | Enables proper callback handling |
| 6 | Set meaningful `appName` | Shows in WebAuth app during approval |

**New Section to Add (web-sdk.md):**

```markdown
## Mobile Wallet Support

For mobile wallet signing to work (WebAuth iOS/Android app), you MUST install and import `@proton/link`:

### Installation

\`\`\`bash
npm install @proton/web-sdk @proton/link
\`\`\`

### Dynamic Import Pattern (Required for Mobile!)

Static imports don't reliably initialize mobile handlers. Use this pattern:

\`\`\`typescript
let ProtonWebSDK: any;
let sdkReady: Promise<void> | null = null;

if (typeof window !== 'undefined') {
  sdkReady = Promise.all([
    import('@proton/web-sdk').then((mod) => {
      ProtonWebSDK = mod.default;
    }),
    import('@proton/link')  // Critical for mobile deep linking
  ]).then(() => {});
}

async function waitForSdk() {
  if (sdkReady) await sdkReady;
}

async function login() {
  await waitForSdk();  // MUST await before using SDK

  const { link, session } = await ProtonWebSDK({
    linkOptions: {
      chainId: '384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0',
      endpoints: ['https://proton.greymass.com', 'https://proton.eosusa.io'],
      restoreSession: false
    },
    transportOptions: {
      requestAccount: 'yourappname',  // Your contract/app account
      requestStatus: true
    },
    selectorOptions: {
      appName: 'Your App Name',
      enabledWalletTypes: ['webauth', 'proton']  // Show both options
    }
  });

  return { link, session };
}
\`\`\`

### Troubleshooting Mobile Issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| Mobile stuck on "Processing..." | Missing `@proton/link` or static import | Use dynamic import with Promise.all |
| Shows "Unknown requestor" | `requestAccount` empty or missing | Set to your contract name |
| App signs but doesn't return | `requestAccount` wrong or `requestStatus` missing | Verify account, add `requestStatus: true` |
| Only browser wallet shown | `enabledWalletTypes` not set | Add `['webauth', 'proton']` |
| Safari iOS popup blocked | Safari blocks popups by default | User: Settings > Safari > Block Pop-ups OFF |
\`\`\`

---

### A.2 AssemblyScript Clarification (High Priority)

**Source:** xpr-message/SUGGESTIONS.md

Developers coming from other EOSIO chains expect C++. This causes immediate confusion.

**Add prominent callout to smart-contracts.md:**

```markdown
> **IMPORTANT**: XPR Network contracts are written in **AssemblyScript** (TypeScript-like syntax), NOT C++ like traditional EOSIO chains. Use `proton-tsc` for compilation.
```

---

### A.3 Build Command Clarification

**Source:** xpr-message/SUGGESTIONS.md

**Issue:** Developers try `proton-tsc` command, but the correct command is `npx proton-asc`.

**Add to smart-contracts.md:**

```markdown
### Building Contracts

\`\`\`bash
# Compile AssemblyScript contract
npx proton-asc assembly/index.ts --output assembly/target

# This generates:
# - assembly/target/CONTRACT.wasm
# - assembly/target/CONTRACT.abi
\`\`\`

Note: Use `npx proton-asc`, not `proton-tsc` directly.
```

---

### A.4 Signing Without Broadcasting

**Source:** xpr-message/SUGGESTIONS.md

Useful pattern for signature-based authentication/encryption, not documented.

**Add to web-sdk.md:**

```typescript
// Sign transaction without broadcasting (useful for signature-based auth)
const result = await session.transact({
  actions: [{
    account: 'mycontract',
    name: 'prove',
    authorization: [{ actor: session.auth.actor, permission: session.auth.permission }],
    data: { account: session.auth.actor, message: 'some-message' },
  }],
}, { broadcast: false });

const signature = result.signatures[0]; // Use for verification or key derivation
```

---

### A.5 WebAuth Signing Restrictions

**Source:** xpr-message/SUGGESTIONS.md

**Issue:** WebAuth wallets won't sign arbitrary messages - must use valid contract actions.

**Add to web-sdk.md:**

```markdown
### WebAuth Signing Limitations

WebAuth wallets (webauth.com) enforce strict signing rules:
- Cannot sign arbitrary messages directly
- Must sign valid contract actions
- For signature-based authentication, deploy a minimal "prove" contract:

\`\`\`typescript
@contract
export class ProveContract extends Contract {
  @action("prove")
  prove(account: Name, message: string): void {
    requireAuth(account);
    // Empty - the signature is the goal
  }
}
\`\`\`
```

---

### A.6 Table Schema Safety (CRITICAL)

**Source:** protonrating-contract/CLAUDE.md, protonwall-contract (January 2026 incident)

**NEVER modify existing table structures once deployed with data.**

**New Section: Contract Safety Guide**

```markdown
## Table Schema Safety

### The Golden Rule

**NEVER add or remove fields from tables that contain data.**

### What Happens When You Break This Rule

EOSIO stores data as raw binary bytes, not JSON. Adding/removing fields breaks deserialization:

\`\`\`
Error: "Stream unexpectedly ended; unable to unpack field 'new_field' of struct 'Table'"
\`\`\`

### Real Incident (January 2026)

Attempted to add `parent_id` field to existing `posts` table. Result: All posts became unreadable until ABI was rolled back.

### Safe Patterns for New Features

1. **Create NEW tables** - doesn't affect existing data
2. **Create NEW contracts** - zero risk to existing data
3. **Migration action (advanced)** - read old, delete, write new

### Recovery

Data is NEVER lost - only the ABI (decoder) breaks. Rollback the ABI to restore access:

1. Remove the new field from code
2. Rebuild: `npm run build`
3. Redeploy: `proton contract:set ACCOUNT ./assembly/target -a`
4. Data immediately readable again
```

---

### A.7 Multi-Contract Deployment Safety

**Source:** protonrating-contract/CLAUDE.md

**Issue:** Easy to accidentally deploy to wrong account when working with multiple contracts.

**Add Pre-Deployment Checklist:**

```markdown
### Pre-Deployment Safety Checklist

Before ANY deployment:
- [ ] `pwd` - Verify correct project directory
- [ ] `proton account ACCOUNT` - Verify target account exists
- [ ] `proton contract:abi ACCOUNT` - Check current ABI (if updating)
- [ ] Read the command - is the account name correct?
- [ ] **NEVER copy-paste deployment commands without checking the account name**

**Recommended:** Use `.contract` file (PR #33) for safer deployments:
\`\`\`bash
# .contract file in project root
ACCOUNT=mycontract
SOURCE=./assembly/target
NETWORK=proton
\`\`\`
```

---

### A.8 WebAuthn Keys Cannot Sign from CLI

**Source:** protonlink/SUGGESTIONS.md

**Issue:** WebAuthn keys (`PUB_WA_*`) cannot sign transactions from CLI, with no clear error message.

**Add to CLI documentation:**

```markdown
### WebAuthn Key Limitation

WebAuthn keys (starting with `PUB_WA_`) cannot sign transactions from the CLI. If your account uses a WebAuthn key:

\`\`\`bash
# Error: Cannot find signing key for account
\`\`\`

**Solution:** Add a K1 key to your account's active permission:

\`\`\`bash
proton action eosio updateauth '{
  "account":"ACCOUNT",
  "permission":"active",
  "parent":"owner",
  "auth":{
    "threshold":1,
    "keys":[{"key":"PUB_K1_xxx","weight":1}],
    "accounts":[{"permission":{"actor":"ACCOUNT","permission":"eosio.code"},"weight":1}],
    "waits":[]
  }
}' ACCOUNT@owner
\`\`\`
```

---

### A.9 SDK Error Handling Pattern

**Source:** protonlink/SUGGESTIONS.md

**Issue:** Error details are available but not documented.

**Add to web-sdk.md:**

```typescript
// Error handling with details
try {
  return await session.transact(...)
} catch (error) {
  // Access detailed error info
  const details = error.json?.error?.details?.[0]?.message;
  // Example: "assertion failure with message: overdrawn balance"

  const errorCode = error.json?.error?.code;
  // Example: 3050003

  console.error(`Transaction failed: ${details} (code: ${errorCode})`);
}
```

---

### A.10 TypeScript Types for Table Rows

**Source:** protonlink/SUGGESTIONS.md

**Tool discovered:** `@rockerone/abi2ts` - generates TypeScript types from contract ABIs.

**Add to Developer Tools section:**

```markdown
### Generate TypeScript Types from ABI

Use [@rockerone/abi2ts](https://github.com/SuperstrongBE/xpr_abi_2_ts_types) to generate type-safe table interfaces:

\`\`\`bash
# Generate types from deployed contract
npx abi2ts mycontract > ./types/mycontract.ts

# Generate from local ABI file
npx abi2ts mycontract -f ./assembly/target/mycontract.abi > ./types/mycontract.ts
\`\`\`

Then use in your code:
\`\`\`typescript
import { MyTableRow } from './types/mycontract';

const { rows } = await rpc.get_table_rows<MyTableRow>({...});
// rows is now properly typed!
\`\`\`
```

---

### A.11 Project Structure for Mixed Frontend/Contract

**Source:** xpr-message/SUGGESTIONS.md

**Issue:** AssemblyScript contract folder conflicts with Next.js TypeScript build.

**Add to Project Setup guide:**

```markdown
### Mixed Frontend + Contract Projects

\`\`\`
my-dapp/
├── contract/              # AssemblyScript contract
│   ├── assembly/
│   │   └── index.ts
│   └── package.json       # Separate package.json
├── src/                   # Next.js/React app
├── tsconfig.json          # Exclude contract folder!
└── package.json
\`\`\`

**Important**: Exclude the contract folder from your frontend's TypeScript config:

\`\`\`json
// tsconfig.json
{
  "exclude": ["node_modules", "contract"]
}
\`\`\`

This prevents the frontend build from trying to compile AssemblyScript as TypeScript.
```

---

### A.12 Action Data Types Reference

**Source:** xpr-message/SUGGESTIONS.md

**Add type reference table to smart-contracts.md:**

```markdown
### Action Parameter Types

| TypeScript/JS | AssemblyScript | JSON Format |
|---------------|----------------|-------------|
| `string` | `string` | `"hello"` |
| `number` | `u64` / `i64` | `123` |
| `Name` | `Name` | `"myaccount"` |
| `Asset` | `Asset` | `"1.0000 XPR"` |
| `Uint8Array` | `u8[]` | base64 string |
| `boolean` | `bool` | `true` / `false` |
```

---

### A.13 Oracle Integration Pattern

**Source:** pricebattle-contract/CLAUDE.md

**Add Oracle section:**

```markdown
### Using On-Chain Oracles

XPR Network provides native price oracles:

\`\`\`javascript
// Query oracle data
const { rows } = await rpc.get_table_rows({
  code: 'oracles',
  scope: 'oracles',
  table: 'data',
  lower_bound: 4,  // BTC/USD
  upper_bound: 4,
  limit: 1
});

const price = rows[0].aggregate.d_double; // "95322.71000000..."
\`\`\`

**Available Oracles:**

| Index | Pair | Description |
|-------|------|-------------|
| 4 | BTC/USD | BTC price |
| 5 | ETH/USD | ETH price |
| 13 | XPR/USD | XPR price |
```

---

### A.14 RAM Requirements

**Source:** protonrating-contract/CLAUDE.md

**Add to deployment docs:**

```markdown
### RAM Requirements

Smart contracts require significant RAM for deployment:

| Contract Size | Estimated RAM |
|---------------|---------------|
| Small (< 100KB) | ~125KB RAM |
| Medium (100-500KB) | ~200-600KB RAM |
| Large (> 500KB) | ~750KB+ RAM |

Check and buy RAM before deploying:

\`\`\`bash
proton account ACCOUNT          # Check available RAM
proton ram                       # Check RAM price
proton ram:buy ACCOUNT ACCOUNT 150000 -p ACCOUNT@active  # Buy 150KB
\`\`\`

Note: Use `-p ACCOUNT@active` flag (not positional argument) for authorization.
```

---

### A.15 Known Issues to Document

**Source:** protonlink/CLAUDE.md

**Add Known Issues section:**

```markdown
## Known Issues

### WebAuth iOS App Session Caching

**Status:** Unresolved - issue is in WebAuth iOS app

**Symptom:** After logout/login with different account, transactions fail with wrong signature.

**Workaround:** Force quit WebAuth iOS app before switching accounts.

### Safari iOS Popup Blocking

**Symptom:** WebAuth signing stuck on "Processing..." on Safari iOS.

**Solution:** User must disable popup blocker: Settings > Safari > Block Pop-ups OFF

### Testnet Mobile Limitations

The WebAuth mobile app is primarily designed for mainnet. On testnet:
- Mobile callbacks may not work reliably
- Use webauth.com browser wallet for testnet testing
- Test mobile flow on mainnet with small amounts
```

---

### A.16 Related GitHub Issues/PRs to Reference

**Source:** protonlink/SUGGESTIONS.md

| Repo | Issue/PR | Topic | Status |
|------|----------|-------|--------|
| XPRNetwork/proton-cli | [#31](https://github.com/XPRNetwork/proton-cli/pull/31) | Error messages, deployment output | 3/4 approvals |
| XPRNetwork/proton-cli | [#33](https://github.com/XPRNetwork/proton-cli/pull/33) | `.contract` file support | Approved |
| XPRNetwork/proton-web-sdk | [#47](https://github.com/XPRNetwork/proton-web-sdk/issues/47) | DX improvements | Internal ticket |

---

## Appendix B: Additional Checklist Items

Based on real-world experience, add these items to the implementation checklist:

### Phase 1 Additions
- [ ] Add mobile wallet integration section (CRITICAL - A.1)
- [ ] Add AssemblyScript vs C++ clarification (A.2)
- [ ] Fix build command documentation (A.3)
- [ ] Document signing without broadcasting (A.4)
- [ ] Document WebAuth signing restrictions (A.5)

### Phase 3 Additions
- [ ] Create Table Schema Safety guide (A.6)
- [ ] Create Multi-Contract Safety checklist (A.7)
- [ ] Document WebAuthn CLI limitations (A.8)
- [ ] Add SDK error handling patterns (A.9)
- [ ] Document abi2ts type generation (A.10)
- [ ] Add mixed project structure guide (A.11)
- [ ] Create action data types reference (A.12)
- [ ] Add oracle integration patterns (A.13)
- [ ] Document RAM requirements (A.14)
- [ ] Add known issues section (A.15)
