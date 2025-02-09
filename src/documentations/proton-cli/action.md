# Action Commands

## Execute Action
**Command:** `proton action <contract> [action] [data] [authorization]`

**Description:** Execute an action on a smart contract. If no action is specified, it will display all available actions for the contract.

**Arguments:**
- `contract` (required): The name of the contract to execute the action on
- `action` (optional): The name of the action to execute
- `data` (optional): The action data in JSON format
- `authorization` (optional): Account to authorize with (format: account@permission)

**Data Format:**
The data can be provided in two formats:
1. Array format: `[arg1, arg2, ...]`
2. Object format: `{"field1": value1, "field2": value2, ...}`

**Example Usage:**
```bash
# List available actions
proton action eosio.token

# Execute action
proton action eosio.token transfer '{"from":"myaccount","to":"otheraccount","quantity":"1.0000 XPR","memo":"test"}' myaccount@active

# Execute action with array format
proton action eosio.token transfer '["myaccount","otheraccount","1.0000 XPR","test"]' myaccount@active
```

**Notes:**
- If action is specified but data is missing, it will show the required fields for that action
- Authorization defaults to 'active' permission if only account is provided (e.g., 'myaccount' is same as 'myaccount@active')
- All required fields must be provided in the data object when using object format