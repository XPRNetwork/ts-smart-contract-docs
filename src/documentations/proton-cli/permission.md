# Permission Commands

## Update Permission
**Command:** `proton permission <account>`

**Description:** Interactive tool to manage account permissions, including creating, editing, and deleting permissions.

**Arguments:**
- `account` (required): Account to modify

**Features:**
- View and edit existing permissions
- Add new permissions
- Modify permission thresholds
- Add/remove keys and accounts
- Edit weights for keys and accounts
- Delete custom permissions
- Interactive menu-driven interface

**Example:**
```bash
proton permission myaccount
```

## Link Permission
**Command:** `proton permission:link <account> <permission> <contract> [action] [flags]`

**Description:** Link a permission to a specific contract action.

**Arguments:**
- `account` (required): Account that owns the permission
- `permission` (required): Permission to link
- `contract` (required): Contract to link the permission to
- `action` (optional): Specific action to link (if empty, links to all actions)

**Flags:**
- `-p, --permission`: Permission to sign with (e.g., account@active)

**Example:**
```bash
# Link custom permission to specific action
proton permission:link myaccount custom eosio.token transfer

# Link custom permission to all contract actions
proton permission:link myaccount custom eosio.token
```

## Unlink Permission
**Command:** `proton permission:unlink <account> <contract> [action] [flags]`

**Description:** Remove a permission link from a contract action.

**Arguments:**
- `account` (required): Account that owns the permission
- `contract` (required): Contract to unlink from
- `action` (optional): Specific action to unlink (if empty, unlinks from all actions)

**Flags:**
- `-p, --permission`: Permission to sign with (e.g., account@active)

**Example:**
```bash
# Unlink from specific action
proton permission:unlink myaccount eosio.token transfer

# Unlink from all contract actions
proton permission:unlink myaccount eosio.token
```