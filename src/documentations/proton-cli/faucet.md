# Faucet Commands

## List Faucets
**Command:** `proton faucet`

**Description:** Lists all available faucets and their details, including claim amounts and time intervals.

**Example:**
```bash
proton faucet
```

**Output Format:**
```
SYMBOL: Claim AMOUNT every DURATION seconds
```

## Claim Faucet
**Command:** `proton faucet:claim <symbol> <authorization>`

**Description:** Claims tokens from a specific faucet.

**Arguments:**
- `symbol` (required): The token symbol to claim (e.g., XPR)
- `authorization` (required): Authorization in the format account@permission (e.g., myaccount@active)

**Example:**
```bash
proton faucet:claim XPR myaccount@active
```

**Notes:**
- The faucet must exist for the specified symbol
- Claims are processed through the 'token.faucet' contract
- Each faucet has a specific time duration between claims