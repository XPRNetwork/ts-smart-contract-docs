# Generate Commands

## Add Actions
**Command:** `proton generate:action [flags]`

**Description:** Add extra actions to an existing smart contract.

**Flags:**
- `-o, --output`: Destination folder
- `-c, --contract`: The name of the contract (1-12 chars, only lowercase a-z and numbers 1-5)

**Example:**
```bash
proton generate:action --contract mycontract
```

## Create Contract
**Command:** `proton generate:contract <contractName> [flags]`

**Description:** Creates a new smart contract project with initial structure and files.

**Arguments:**
- `contractName` (required): The name of the contract (1-12 chars, only lowercase a-z and numbers 1-5)

**Flags:**
- `-o, --output`: Destination folder

**Features:**
- Creates contract boilerplate
- Interactive action generation
- Automatic package installation (npm/yarn)
- TypeScript support

**Example:**
```bash
proton generate:contract mycontract
```

## Add Inline Action
**Command:** `proton generate:inlineaction <actionName> [flags]`

**Description:** Adds an inline action class to an existing smart contract.

**Arguments:**
- `actionName` (required): The name of the inline action's class

**Flags:**
- `-o, --output`: Destination folder
- `-c, --contract`: The name of the contract (1-12 chars, only lowercase a-z and numbers 1-5)

**Example:**
```bash
proton generate:inlineaction MyAction --contract mycontract
```

## Add Table
**Command:** `proton generate:table <tableName> [flags]`

**Description:** Adds a new table to an existing smart contract.

**Arguments:**
- `tableName` (required): The name of the contract's table (1-12 chars, only lowercase a-z and numbers 1-5)

**Flags:**
- `-t, --class`: The name of TypeScript class for the table
- `-s, --singleton`: Create a singleton table (default: false)
- `-o, --output`: Destination folder
- `-c, --contract`: The name of the contract (1-12 chars, only lowercase a-z and numbers 1-5)

**Features:**
- Interactive table configuration
- Primary key definition
- Additional fields configuration
- Automatic contract integration
- Support for singleton tables

**Example:**
```bash
proton generate:table mytable --contract mycontract --singleton
```