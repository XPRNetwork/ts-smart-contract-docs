---
description: How to create and deploy a token on XPR Network
---

# Create a Token

This guide walks you through creating and deploying your own token on XPR Network.

## Prerequisites

- [proton CLI installed](/cli-101/cli-crash-course)
- A testnet account with resources ([get one here](https://testnet.webauth.com))
- Basic familiarity with the command line

## Quick Start

### Step 1: Create an Account for Your Token

```bash
# Set to testnet
proton chain:set proton-test

# Create account (this will be your token contract)
proton account:create mytoken
```

### Step 2: Buy RAM for the Contract

Token contracts need RAM to store balances. Buy enough for your expected users:

```bash
proton ram:buy mytoken mytoken 200000
```

### Step 3: Deploy the Token Contract

Deploy the standard token contract directly from GitHub:

```bash
proton contract:set mytoken https://github.com/XPRNetwork/ts-smart-contracts/tree/main/external/xtokens
```

### Step 4: Create Your Token

Define your token's maximum supply. The precision (decimal places) is determined by the format:

```bash
proton action mytoken create '{
    "issuer": "mytoken",
    "maximum_supply": "1000000.0000 MYTKN"
}' mytoken@active
```

| Format | Precision | Example |
|--------|-----------|---------|
| `1000000 MYTKN` | 0 decimals | Whole tokens only |
| `1000000.00 MYTKN` | 2 decimals | Like USD cents |
| `1000000.0000 MYTKN` | 4 decimals | Standard (like XPR) |
| `1000000.00000000 MYTKN` | 8 decimals | Like BTC |

### Step 5: Issue Tokens

Issue tokens to your account (or any account):

```bash
proton action mytoken issue '{
    "to": "mytoken",
    "quantity": "100000.0000 MYTKN",
    "memo": "Initial issuance"
}' mytoken@active
```

### Step 6: Transfer Tokens

```bash
proton action mytoken transfer '{
    "from": "mytoken",
    "to": "recipient",
    "quantity": "1000.0000 MYTKN",
    "memo": "Test transfer"
}' mytoken@active
```

## Register Token in Wallet

To show your token with a logo in WebAuth and other wallets:

```bash
proton action token.proton reg '{
    "tcontract": "mytoken",
    "tname": "My Token",
    "url": "https://mytoken.com",
    "desc": "Description of my token",
    "iconurl": "https://mytoken.com/logo.png",
    "symbol": "4,MYTKN"
}' mytoken@active
```

Note: The symbol format is `precision,SYMBOL` (e.g., `4,MYTKN` for 4 decimal places).

## Standard Token Actions

| Action | Description | Who Can Call |
|--------|-------------|--------------|
| `create` | Create a new token with max supply | Contract account |
| `issue` | Mint new tokens (up to max supply) | Issuer only |
| `transfer` | Transfer tokens between accounts | Token holder |
| `open` | Open a zero balance for an account | Anyone (pays RAM) |
| `close` | Close a zero balance | Account owner |
| `retire` | Burn tokens permanently | Token holder |

## Checking Balances and Stats

```bash
# Check an account's balance
proton table mytoken recipient accounts

# Check token statistics
proton table mytoken MYTKN stat
```

## Security: Lock Your Token Contract

For production tokens, remove the ability to modify the contract by setting permissions to `eosio@active`:

```bash
# Lock the contract (irreversible!)
proton permission mytoken owner eosio@active
proton permission mytoken active eosio@active
```

::: warning
This is irreversible. Only do this when you're certain the contract is working correctly.
:::

## Complete Example

```bash
# 1. Setup
proton chain:set proton-test
proton account:create gametoken

# 2. Buy RAM
proton ram:buy gametoken gametoken 200000

# 3. Deploy contract
proton contract:set gametoken https://github.com/XPRNetwork/ts-smart-contracts/tree/main/external/xtokens

# 4. Create token (1 million max, 4 decimals)
proton action gametoken create '{"issuer":"gametoken","maximum_supply":"1000000.0000 GOLD"}' gametoken@active

# 5. Issue initial supply
proton action gametoken issue '{"to":"gametoken","quantity":"500000.0000 GOLD","memo":"initial"}' gametoken@active

# 6. Register in wallet
proton action token.proton reg '{"tcontract":"gametoken","tname":"Game Gold","url":"https://mygame.com","desc":"In-game currency","iconurl":"https://mygame.com/gold.png","symbol":"4,GOLD"}' gametoken@active

# 7. Transfer to players
proton action gametoken transfer '{"from":"gametoken","to":"player1","quantity":"100.0000 GOLD","memo":"welcome bonus"}' gametoken@active
```

## Custom Token Logic

For custom behavior (transfer fees, allowlists, etc.), you'll need to modify the token contract source:

1. Clone the repo:
   ```bash
   git clone https://github.com/XPRNetwork/ts-smart-contracts.git
   cd ts-smart-contracts/external/xtokens
   ```

2. Modify the contract code

3. Build and deploy:
   ```bash
   npm install
   npm run build
   proton contract:set mytoken ./target
   ```

See the [token contract source](https://github.com/XPRNetwork/ts-smart-contracts/tree/main/external/xtokens) for implementation details.

## Next Steps

- [Contract Examples](/contract-sdk/examples) - More contract examples
- [Mainnet vs Testnet](/getting-started/mainnet-vs-testnet) - Deploy to production
