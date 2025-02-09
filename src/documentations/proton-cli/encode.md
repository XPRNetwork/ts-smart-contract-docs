# Encode Commands

## Encode Name
**Command:** `proton encode:name <account>`

**Description:** Converts an account name to its numerical representation in the blockchain.

**Arguments:**
- `account` (required): The account name to encode

**Example:**
```bash
proton encode:name myaccount
```

## Encode Symbol
**Command:** `proton encode:symbol <symbol> <precision>`

**Description:** Converts a token symbol and precision to its numerical representation in the blockchain.

**Arguments:**
- `symbol` (required): The token symbol to encode (e.g., XPR)
- `precision` (required): The number of decimal places for the token

**Example:**
```bash
proton encode:symbol XPR 4
```