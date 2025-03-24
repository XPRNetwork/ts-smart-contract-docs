# Table Commands

## Get Table Rows
**Command:** `proton table <contract> [table] [scope] [flags]`

**Description:** Query and display rows from a smart contract's table storage.

**Arguments:**
- `contract` (required): The account name of the contract
- `table` (optional): The name of the table to query (if not provided, shows interactive menu)
- `scope` (optional): The scope of the table (defaults to contract name)

**Flags:**
- `-l, --lowerBound`: Lower bound of the key to start search
- `-u, --upperBound`: Upper bound of the key to end search
- `-k, --keyType`: Type of the key for index
- `-r, --reverse`: Reverse the order of results
- `-p, --showPayer`: Show who paid for each row
- `-c, --limit`: Maximum number of rows to return (default: 100)
- `-i, --indexPosition`: Position of the index to use (default: 1)

**Features:**
- Interactive table selection if table name not provided
- Flexible querying with multiple index support
- Customizable result limits and ordering
- Optional payer information

**Examples:**
```bash
# Basic query
proton table eosio.token accounts

# Query with scope
proton table eosio.token accounts myaccount

# Advanced query with flags
proton table eosio.token accounts myaccount --limit 10 --reverse --showPayer

# Query using secondary index
proton table mycontract mytable --indexPosition 2 --keyType i64

# Interactive table selection
proton table eosio.token
```

**Output Format:**
Returns a JSON object containing:
- `rows`: Array of table rows
- `more`: Boolean indicating if more rows are available
- `next_key`: Key to use for pagination (if more rows exist)