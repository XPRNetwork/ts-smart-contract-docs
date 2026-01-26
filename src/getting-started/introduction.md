# Getting Started with XPR Network

## What is XPR Network?

XPR Network is a high-performance, gas-free blockchain built on Antelope technology. It enables instant, zero-cost transactions between users.

Compared to other blockchain networks, XPR Network provides:

* **Sub-second finality**: Most transactions complete in under one second.
* **Zero transaction fees**: No gas costs for users or developers.
* **Proven reliability**: The network has maintained 100% uptime since its genesis block.
* **Strong decentralization**: XPR Network has one of the highest Nakamoto coefficients among delegated proof-of-stake networks.

These characteristics make XPR Network suitable for a wide range of applications, from DeFi to gaming to social platforms.

## Prerequisites

No prior blockchain or C++ experience is required. You will need:

* A computer running Linux, macOS, or Windows
  * Windows users should have Windows Terminal installed
* Node.js 20 or higher
* Basic TypeScript knowledge
* Command line familiarity
* Basic Git knowledge (command line or GUI)

## Example Code Repository

All examples from this documentation are available in our developer examples repository. Clone it to follow along:

[https://github.com/XPRNetwork/developer-examples](https://github.com/XPRNetwork/developer-examples)

## Important Concepts Before You Begin

### TypeScript for Smart Contracts

XPR Network smart contracts are written in TypeScript (compiled to WebAssembly). This provides type safety, which is critical when interacting with blockchain data where type mismatches can cause transaction failures or data corruption.

### On-Chain Storage Considerations

Blockchain storage is a limited resource. When developing for XPR Network:

* Minimize the data stored on-chain
* Optimize operations for execution time
* Perform computation-intensive tasks off-chain (on web servers)
* Design data structures to use the smallest possible byte footprint

### Understanding Core Concepts

Take time to understand foundational concepts like resources (CPU, NET, RAM) and transaction execution order. These fundamentals are essential for debugging issues and building efficient applications.

### Iterative Development

Start with small projects and iterate. Fork existing projects from the XPR Network GitHub organization to experiment and learn from working code.

## For AI Agents and Claude Code Users

If you are using Claude Code or other AI development tools, a dedicated skill is available that provides comprehensive XPR Network development knowledge:

**XPR Network Developer Skill:** [https://github.com/XPRNetwork/xpr-network-dev-skill](https://github.com/XPRNetwork/xpr-network-dev-skill)

This skill provides AI agents with:
- Complete smart contract development patterns
- CLI command references and examples
- Web SDK integration guidance
- Common troubleshooting solutions
- Best practices for XPR Network development

To use with Claude Code, add the skill to your project or reference it in your prompts for XPR Network development assistance.
