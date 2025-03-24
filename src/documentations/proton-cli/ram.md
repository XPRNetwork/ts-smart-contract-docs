# RAM Commands

## Get RAM Price
**Command:** `proton ram`

**Description:** Display current RAM prices in XPR (Proton) per byte and kilobyte.

**Output Format:**
```
RAM costs X.XXXX XPR / byte
RAM costs X.XXXX XPR / KB
```

**Example:**
```bash
proton ram
```

## Buy RAM
**Command:** `proton ram:buy <buyer> <receiver> <bytes> [flags]`

**Description:** Purchase RAM for an account on the Proton blockchain.

**Arguments:**
- `buyer` (required): Account paying for the RAM
- `receiver` (required): Account receiving the RAM
- `bytes` (required): Amount of RAM to purchase in bytes

**Flags:**
- `-p, --authorization`: Use a specific authorization other than buyer@active

**Example:**
```bash
# Buy RAM for self
proton ram:buy myaccount myaccount 8192

# Buy RAM for another account
proton ram:buy myaccount otheraccount 8192

# Buy RAM with specific authorization
proton ram:buy myaccount otheraccount 8192 -p myaccount@custom
```

**Notes:**
- RAM is a required resource for storing data on the blockchain
- RAM prices fluctuate based on supply and demand
- Use the `ram` command to check current prices before buying