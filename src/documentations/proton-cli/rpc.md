# RPC Commands

## Get Accounts by Authorization
**Command:** `proton rpc:accountsbyauthorizers <authorizations> [keys]`

**Description:** Query accounts based on their authorization structure or public keys.

**Arguments:**
- `authorizations` (required): JSON array of authorization objects or a single authorization object
- `keys` (optional): Array of public keys to query

**Authorization Format:**
```json
{
  "actor": "accountname",
  "permission": "permissionname"
}
```

**Examples:**
```bash
# Query by single authorization
proton rpc:accountsbyauthorizers '{"actor":"myaccount","permission":"active"}'

# Query by multiple authorizations
proton rpc:accountsbyauthorizers '[{"actor":"acc1","permission":"active"},{"actor":"acc2","permission":"owner"}]'

# Query by authorization and keys
proton rpc:accountsbyauthorizers '{"actor":"myaccount","permission":"active"}' '["PUB_K1_key1","PUB_K1_key2"]'
```

**Output:**
Returns a JSON object containing accounts that match the provided authorization criteria or public keys.