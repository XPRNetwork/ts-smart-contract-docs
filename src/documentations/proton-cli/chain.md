# Chain Commands

## Get Current Chain
**Command:** `proton chain:get` or `proton network`

**Description:** Displays information about the currently selected blockchain network.

**Example:**
```bash
proton chain:get
```

## Get Chain Info
**Command:** `proton chain:info`

**Description:** Retrieves detailed information about the current blockchain, including head block number, head block time, head block producer, and other chain-specific information.

**Example:**
```bash
proton chain:info
```

## List All Networks
**Command:** `proton chain:list`

**Description:** Displays a list of all available blockchain networks that can be connected to.

**Example:**
```bash
proton chain:list
```

## Set Chain
**Command:** `proton chain:set [chain]`

**Description:** Changes the current blockchain network to the specified chain. If no chain is specified, presents an interactive menu to choose from available networks.

**Arguments:**
- `chain` (optional): The name of the chain to switch to

**Interactive Mode:**
If no chain is specified, the command will present a list of available chains to choose from.

**Example:**
```bash
# Set specific chain
proton chain:set mainnet

# Interactive mode
proton chain:set
```