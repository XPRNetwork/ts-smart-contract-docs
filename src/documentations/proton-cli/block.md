# Block Commands

## Get Block
**Command:** `proton block:get <blockNumber>`

**Description:** Retrieves detailed information about a specific block from the blockchain.

**Arguments:**
- `blockNumber` (required): The block number (height) to retrieve

**Output:**
Returns a JSON object containing block information including:
- Block timestamp
- Producer
- Confirmed status
- Previous block hash
- Transaction merkle root
- Action merkle root
- Schedule version
- Producer signature
- Transactions
- And other block-specific data

**Example:**
```bash
proton block:get 12345
```