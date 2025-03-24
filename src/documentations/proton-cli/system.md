# System Commands

These commands are system-level operations that interact with core blockchain functionality. Most of these commands are hidden and intended for system use.

## Buy RAM (System)
**Command:** `proton system:buyram <receiver> <bytes>`

**Description:** System-level command to buy RAM using system account.

**Arguments:**
- `receiver` (required): Account receiving the RAM
- `bytes` (required): Amount of RAM in bytes

## Delegate Bandwidth
**Command:** `proton system:delegatebw <receiver> <cpu> <net> [flags]`

**Description:** System-level command to delegate CPU and NET resources.

**Arguments:**
- `receiver` (required): Account receiving the resources
- `cpu` (required): Amount of CPU to delegate
- `net` (required): Amount of NET to delegate

**Flags:**
- `-t, --transfer`: Transfer ownership of staked tokens

## Create New Account
**Command:** `proton system:newaccount <account> <owner> <active> [flags]`

**Description:** System-level command to create a new account.

**Arguments:**
- `account` (required): Name of the new account
- `owner` (required): Owner permission (public key or account)
- `active` (required): Active permission (public key or account)

**Flags:**
- `-n, --net`: NET stake amount (default: "10.0000 SYS")
- `-c, --cpu`: CPU stake amount (default: "10.0000 SYS")
- `-r, --ram`: RAM bytes (default: 12288)
- `-t, --transfer`: Transfer ownership of staked tokens
- `--code`: Add eosio.code permission

## Set RAM Limit
**Command:** `proton system:setramlimit <account> <ramlimit>`

**Description:** System-level command to set RAM limits for an account.

**Arguments:**
- `account` (required): Account to set limit for
- `ramlimit` (required): New RAM limit in bytes

## Undelegate Bandwidth
**Command:** `proton system:undelegatebw <receiver> <cpu> <net>`

**Description:** System-level command to undelegate CPU and NET resources.

**Arguments:**
- `receiver` (required): Account to undelegate from
- `cpu` (required): Amount of CPU to undelegate
- `net` (required): Amount of NET to undelegate

**Note:** These commands are typically restricted to system accounts and may not be available for general use.