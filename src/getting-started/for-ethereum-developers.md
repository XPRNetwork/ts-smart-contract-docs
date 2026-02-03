---
description: Key differences between Ethereum/ERC-20 and XPR Network for developers transitioning from the EVM ecosystem
---

# For Ethereum Developers

If you're coming from Ethereum or other EVM chains, this guide will help you understand the key architectural differences in XPR Network. Many patterns you're familiar with work differently here—often more simply.

## Quick Comparison

| Feature | Ethereum (ERC-20) | XPR Network |
|---------|-------------------|-------------|
| Token transfers | `approve()` + `transferFrom()` | Single `transfer()` action |
| Transfer metadata | Not supported | Native `memo` field |
| Transaction fees | User pays gas (variable) | Free for users (dApp covers via delegated resources) |
| Account format | `0x742d35Cc6634...` (42 chars) | `paulgnz` (up to 12 chars) |
| Block time | ~12 seconds | 0.5 seconds |
| Contract language | Solidity | AssemblyScript (TypeScript-like) |
| Contract upgrades | Proxy patterns required | Native (redeploy to same account) |
| Multi-sig | External contracts (Gnosis Safe) | Native permission system |

## Token Transfers: No Approve/TransferFrom

### The Ethereum Pattern

In ERC-20, interacting with DeFi requires two transactions:

```solidity
// Ethereum: Two transactions required
token.approve(dexContract, amount);    // Transaction 1
dexContract.swap(token, amount);        // Transaction 2
```

This pattern has led to:
- UX friction (unexpected second confirmation)
- Security exploits from lingering approvals ($120M+ in hacks)
- Wasted gas on approval transactions

### The XPR Network Pattern

On XPR Network, tokens transfer directly in a single action:

```typescript
// XPR Network: Single action
@action("transfer")
transfer(from: Name, to: Name, quantity: Asset, memo: string): void {
    requireAuth(from);
    check(quantity.isValid(), "Invalid quantity");

    this.subBalance(from, quantity);
    this.addBalance(to, quantity);
}
```

For DeFi interactions, contracts use **inline actions**—the swap contract transfers tokens on behalf of the user within the same atomic transaction:

```typescript
@action("swap")
swap(user: Name, amountIn: Asset): void {
    requireAuth(user);

    // Transfer tokens to this contract (inline action)
    Token.transfer(user, this.receiver, amountIn, "swap in");

    // Calculate swap output
    const amountOut = this.calculateOutput(amountIn);

    // Transfer output back to user (inline action)
    Token.transfer(this.receiver, user, amountOut, "swap out");
}
```

All actions in a transaction succeed or fail atomically. No approvals to exploit.

## Native Transfer Metadata (Memos)

### The Ethereum Problem

ERC-20 has no standard way to attach metadata to transfers:

```solidity
// Ethereum: No memo field
function transfer(address to, uint256 amount) public returns (bool);
```

This creates reconciliation nightmares for payments: "Which of these 50 transfers was for invoice #12345?"

Workarounds include:
- Creating unique deposit addresses per payment
- Off-chain databases mapping transactions
- Custom token implementations

### The XPR Network Solution

Every token transfer includes a native memo field:

```typescript
// XPR Network: Memo is standard
transfer(from: Name, to: Name, quantity: Asset, memo: string): void
```

```bash
# CLI example
proton transfer paulgnz merchant "100.0000 XPR" "Invoice #12345 - Web Development"
```

No workarounds needed. Payment reconciliation is trivial.

## Transaction Fees: Free for Users

### Ethereum's Gas Model

Users pay for every transaction:
- Gas prices fluctuate based on network congestion
- Users must hold ETH even for token-only transactions
- Failed transactions still consume gas
- New users face "buy ETH first" onboarding barrier

### XPR Network's Resource Model

XPR Network uses a **delegation-based resource model**, accessed through subscription plans:

| Resource | Purpose | How It Works |
|----------|---------|--------------|
| **CPU** | Computation time | Delegated SYS tokens provide CPU allocation |
| **NET** | Bandwidth | Delegated SYS tokens provide NET allocation |
| **RAM** | Storage | Buy independently (up to 6 MB per account) |

**How it works under the hood:**

When you purchase a resource plan, the `resources` account delegates system tokens to your account:

```bash
# Check your account's delegated resources
proton account myaccount

# Example output:
# CPU  35.37 s   Delegated: 100.0000 SYS
# NET  33.16 MB  Delegated: 10.0000 SYS
```

**Resource Plans** (via [resources.xprnetwork.org](https://resources.xprnetwork.org)):

| Plan | Cost | Delegation | Transactions/Day |
|------|------|------------|------------------|
| Basic | 100 XPR/mo | 100 SYS (CPU) + 10 SYS (NET) | ~500 |
| Plus | 1,000 XPR/mo | 1,000 SYS (CPU) + 100 SYS (NET) | ~5,000 |
| Pro | 10,000 XPR/mo | 10,000 SYS (CPU) + 1,000 SYS (NET) | ~50,000 |
| Enterprise | 100,000 XPR/mo | 100,000 SYS (CPU) + 10,000 SYS (NET) | ~500,000 |

**Key difference**: DApps purchase resource plans, which delegate resources to cover their users' transactions.

```typescript
// Users sign transactions, dApp's delegated resources cover the cost
// User experience: completely free
```

This enables:
- Frictionless onboarding (no "buy tokens first" for end users)
- Predictable monthly costs for dApp operators
- Failed transactions don't cost users anything
- Start building for free, add a plan when going live
- Resources regenerate over time (not consumed permanently)

## Account Names: Human-Readable

### Ethereum Addresses

```
0x742d35Cc6634C0532925a3b844Bc454e83b9e7595f
```

- 42 characters (40 hex + "0x")
- Case-sensitive checksum
- No semantic meaning
- Easy to make copy/paste errors

### XPR Network Names

```
paulgnz
metalx.dex
eosio.token
```

- Up to 12 characters
- Only `a-z` and `1-5`
- Human-readable and memorable
- Can convey meaning (`metalx.dex` is clearly Metal X's DEX)

**Validation is trivial:**

```typescript
// XPR Network: Simple validation
function isValidName(name: string): boolean {
    return /^[a-z1-5.]{1,12}$/.test(name);
}
```

## Permissions: Native Multi-Sig

### Ethereum Approach

Multi-signature wallets require external contracts:

```solidity
// Ethereum: Deploy Gnosis Safe or similar
GnosisSafe safe = new GnosisSafe(owners, threshold);
```

All-or-nothing access: whoever controls the private key controls everything.

### XPR Network Approach

Hierarchical permissions are built into every account:

```
account: paulgnz
permissions:
  owner (1/1):     [EOS8abc... weight:1]
  active (1/1):    [EOS7xyz... weight:1]
  trading (2/3):   [bot1 weight:1, bot2 weight:1, bot3 weight:1]
```

**Link permissions to specific actions:**

```bash
# Only allow "trading" permission to call the "swap" action on metalx.dex
proton permission:link paulgnz metalx.dex swap trading
```

This enables:
- Granular access control (AI agent can only trade, not withdraw)
- Native multi-sig (no external contracts)
- Key rotation without changing account
- Custom permission hierarchies

## Contract Development

### Language: AssemblyScript vs Solidity

**Solidity (Ethereum):**

```solidity
function transfer(address to, uint256 amount) public returns (bool) {
    require(balanceOf[msg.sender] >= amount, "Insufficient balance");
    balanceOf[msg.sender] -= amount;
    balanceOf[to] += amount;
    emit Transfer(msg.sender, to, amount);
    return true;
}
```

**AssemblyScript (XPR Network):**

```typescript
@action("transfer")
transfer(from: Name, to: Name, quantity: Asset, memo: string): void {
    requireAuth(from);
    check(quantity.isValid(), "Invalid quantity");

    this.subBalance(from, quantity);
    this.addBalance(to, quantity);

    // Notify sender and receiver
    requireRecipient(from);
    requireRecipient(to);
}
```

AssemblyScript is a subset of TypeScript—if you know TypeScript, you're already most of the way there.

### Upgradability: No Proxy Patterns

**Ethereum:** Contracts are immutable. Upgrades require:
- Proxy patterns (UUPS, Transparent, Diamond)
- Careful storage layout management
- Trust in proxy admin

**XPR Network:** Contracts are upgradeable by default.

```bash
# Deploy updated contract to same account
proton contract:set myaccount ./target
```

Want immutability? Remove the code permission:

```bash
# Make contract immutable
proton permission:unlink myaccount eosio setcode active
```

### Data Storage: Tables vs Mappings

**Ethereum mappings:**

```solidity
mapping(address => uint256) public balances;
// Cannot enumerate keys
// No pagination
// Need events or indexer for queries
```

**XPR Network tables:**

```typescript
@table("balances")
class Balance extends Table {
    constructor(
        public account: Name = new Name(),
        public amount: u64 = 0
    ) { super(); }

    @primary
    get primary(): u64 { return this.account.N; }
}
```

Tables support:
- **Enumeration**: Get all rows
- **Pagination**: `lower_bound`, `upper_bound`, `limit`
- **Secondary indexes**: Query by non-primary fields
- **Scopes**: Partition data logically
- **Direct RPC queries**: No indexer required for basic queries

## Quick Reference: Ethereum → XPR Network

| Ethereum Concept | XPR Network Equivalent |
|------------------|------------------------|
| `msg.sender` | `requireAuth(account)` / first authorizer |
| `address` | `Name` |
| `uint256` | `u64` or `Asset` for tokens |
| `mapping` | `TableStore` |
| `event` | `requireRecipient()` for notifications |
| `payable` | Handle via `on_notify` for token transfers |
| `require()` | `check()` |
| `revert()` | `check(false, "message")` |
| `modifier` | Inline checks or helper functions |
| Gas | CPU/NET (resource plans) + RAM (purchased) |

## Getting Started

Ready to build? Here's the fastest path:

1. **Install the CLI:**
   ```bash
   npm i -g @proton/cli
   ```

2. **Create a testnet account:**
   ```bash
   proton chain:set proton-test
   proton account:create myaccount
   ```

3. **Generate a contract:**
   ```bash
   proton generate:contract mycontract
   cd mycontract
   npm install
   npm run build
   ```

4. **Deploy:**
   ```bash
   proton contract:set myaccount ./target
   ```

## Further Reading

- [CLI Crash Course](/cli-101/cli-crash-course) - Get familiar with the CLI
- [Write Your First Smart Contract](/smart-contracts/write-your-first-smart-contract) - Step-by-step tutorial
- [Deploy a Token](/cli/examples/deploy-token) - Deploy token contracts with the CLI
- [Contract Examples](/contract-sdk/examples) - Sample contracts including tokens, NFTs, and more
- [Storage & Tables](/contract-sdk/storage) - Working with on-chain data
- [Accounts & Permissions](/getting-started/accounts-and-permissions) - Understanding the permission system
