# Key Commands

## Add Key
**Command:** `proton key:add [privateKey]`

**Description:** Add a private key to the wallet. Optionally encrypt stored keys with a password.

**Arguments:**
- `privateKey` (optional): The private key to add (starts with PVT_K1)

**Interactive Features:**
- Option to encrypt stored keys with a password
- Prompts for private key if not provided as argument

**Example:**
```bash
proton key:add
proton key:add PVT_K1_your_private_key
```

## Find Private Key
**Command:** `proton key:get <publicKey>`

**Description:** Find the corresponding private key for a given public key in the wallet.

**Arguments:**
- `publicKey` (required): The public key to look up

**Example:**
```bash
proton key:get PUB_K1_your_public_key
```

## List Keys
**Command:** `proton key:list`

**Description:** List all public and private key pairs stored in the wallet.

**Example:**
```bash
proton key:list
```

## Lock Keys
**Command:** `proton key:lock`

**Description:** Encrypt stored keys with a password.

**Features:**
- Option to use existing 32-character password
- Can generate new random password
- Displays generated password for safekeeping

**Example:**
```bash
proton key:lock
```

## Remove Key
**Command:** `proton key:remove [privateKey]`

**Description:** Remove a private key from the wallet.

**Arguments:**
- `privateKey` (optional): The private key to remove

**Safety Features:**
- Confirmation prompt before deletion
- Interactive mode if private key not provided

**Example:**
```bash
proton key:remove
proton key:remove PVT_K1_your_private_key
```

## Reset Keys
**Command:** `proton key:reset`

**Description:** Reset password and delete all stored private keys.

**Safety Features:**
- Double confirmation required
- Warning about irreversible action

**Example:**
```bash
proton key:reset
```

## Unlock Keys
**Command:** `proton key:unlock [password]`

**Description:** Unlock the wallet to access stored keys.

**Arguments:**
- `password` (optional): The 32-character password

**Security Note:**
- Keys will be stored in plaintext until locked again
- Displays warning about plaintext storage

**Example:**
```bash
proton key:unlock
proton key:unlock your_32_character_password
```