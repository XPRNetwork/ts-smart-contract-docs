# Account Commands

## Get Account Information
**Command:** `proton account <account>`

**Description:** Retrieves detailed information about a Proton account including creation date, permissions, resources, voting information, and optionally token balances.

**Arguments:**
- `account` (required): The name of the account to query

**Flags:**
- `-r, --raw`: Display raw JSON output
- `-t, --tokens`: Show token balances

**Example:**
```bash
proton account myaccount
proton account myaccount --tokens
```

## Create New Account
**Command:** `proton account:create <account>`

**Description:** Creates a new Proton account with the specified name. The process includes email verification and key generation.

**Arguments:**
- `account` (required): The name for the new account (4-12 characters, can only contain a-z and 1-5)

**Interactive Prompts:**
1. Private key (optional) - Can generate new one if not provided
2. Email address for verification
3. Display name for the account
4. 6-digit verification code (sent to provided email)

**Validation Rules:**
- Account names must be 4-12 characters long
- Account names can only contain letters a-z and numbers 1-5
- Account must not already exist

**Example:**
```bash
proton account:create mynewaccount
```