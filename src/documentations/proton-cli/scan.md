# Scan Commands

## Open Account in Proton Scan
**Command:** `proton scan <account>`

**Description:** Opens the specified account in ProtonScan (block explorer) using the default web browser.

**Arguments:**
- `account` (required): The account name to view in ProtonScan

**Features:**
- Automatically determines correct explorer URL based on network
- Opens default web browser to account page
- Quick access to account details, transactions, and resources

**Example:**
```bash
proton scan myaccount
```

**Notes:**
- Requires a working internet connection
- Uses system's default web browser
- Explorer URL varies based on selected network (mainnet/testnet)