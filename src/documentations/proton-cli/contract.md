# Contract Commands

## Get Contract ABI
**Command:** `proton contract:abi <account>`

**Description:** Retrieves the Application Binary Interface (ABI) for a smart contract.

**Arguments:**
- `account` (required): The account name of the contract

**Example:**
```bash
proton contract:abi eosio.token
```

## Clean Contract
**Command:** `proton contract:clear <account> [flags]`

**Description:** Removes the WASM and/or ABI from a contract account.

**Arguments:**
- `account` (required): The account to cleanup the contract from

**Flags:**
- `-a, --abiOnly`: Only remove ABI
- `-w, --wasmOnly`: Only remove WASM

**Example:**
```bash
proton contract:clear mycontract
proton contract:clear mycontract --abiOnly
```

## Enable Inline Actions
**Command:** `proton contract:enableinline <account> [flags]`

**Description:** Enables inline actions on a contract by adding the eosio.code permission to the contract's active authority.

**Arguments:**
- `account` (required): Contract account to enable

**Flags:**
- `-p, --authorization`: Use a specific authorization other than contract@active

**Example:**
```bash
proton contract:enableinline mycontract
proton contract:enableinline mycontract -p myaccount@active
```

## Deploy Contract
**Command:** `proton contract:set <account> <source> [flags]`

**Description:** Deploys a smart contract (WASM + ABI) to an account. Can deploy from local directory or GitHub repository.

**Arguments:**
- `account` (required): The account to publish the contract to
- `source` (required): Path of directory with WASM and ABI or URL for GitHub folder with WASM and ABI

**Flags:**
- `-a, --abiOnly`: Only deploy ABI
- `-w, --wasmOnly`: Only deploy WASM
- `-s, --disableInline`: Disable inline actions on contract

**Features:**
- Supports both local and GitHub deployments
- Validates contract files before deployment
- Checks for existing tables and data
- Warns about potential data corruption
- Automatically enables inline actions unless disabled

**Example:**
```bash
# Deploy from local directory
proton contract:set mycontract ./path/to/contract

# Deploy from GitHub
proton contract:set mycontract https://github.com/user/repo/tree/branch/contract

# Deploy only ABI
proton contract:set mycontract ./path/to/contract --abiOnly
```

**Safety Features:**
- Validates WASM and ABI file existence
- Checks for table changes that might affect existing data
- Provides warnings and confirmation prompts for potentially dangerous operations
- Shows transaction links for verification