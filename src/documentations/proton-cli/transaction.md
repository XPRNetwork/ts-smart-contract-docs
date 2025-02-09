# Transaction Commands

## Get Transaction
**Command:** `proton transaction:get <id>`

**Description:** Retrieve detailed information about a transaction using its ID.

**Arguments:**
- `id` (required): The transaction ID to look up

**Example:**
```bash
proton transaction:get 1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```

## Execute Transaction
**Command:** `proton transaction <json>`

**Description:** Execute a transaction using a JSON transaction object.

**Arguments:**
- `json` (required): The transaction object in JSON format

**Example:**
```bash
proton transaction '{"actions":[{"account":"eosio.token","name":"transfer","data":{"from":"user1","to":"user2","quantity":"1.0000 XPR","memo":"test"},"authorization":[{"actor":"user1","permission":"active"}]}]}'
```

## Push Transaction
**Command:** `proton transaction:push <transaction> [flags]`

**Description:** Push a transaction to the blockchain with optional RPC endpoint specification.

**Arguments:**
- `transaction` (required): The transaction object in JSON format

**Flags:**
- `-u, --endpoint`: Specify a custom RPC endpoint

**Example:**
```bash
# Push with default endpoint
proton transaction:push '{"actions":[...]}'

# Push with custom endpoint
proton transaction:push '{"actions":[...]}' --endpoint "https://proton.cryptolions.io"
```

**Transaction JSON Format:**
```json
{
  "actions": [{
    "account": "contract_name",
    "name": "action_name",
    "data": {
      // Action-specific data
    },
    "authorization": [{
      "actor": "account_name",
      "permission": "permission_name"
    }]
  }]
}
```

**Notes:**
- All commands return detailed transaction information
- Error messages include detailed blockchain error information
- Transaction objects must be properly formatted JSON
- Authorization must be valid for the executing account