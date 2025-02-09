# Multisig (msig) Commands

## Approve Multisig
**Command:** `proton msig:approve <proposer> <proposal> <auth>`

**Description:** Approve a proposed multisig transaction.

**Arguments:**
- `proposer` (required): Name of the account that proposed the multisig
- `proposal` (required): Name of the proposal
- `auth` (required): Signing authorization (e.g., user1@active)

**Example:**
```bash
proton msig:approve proposer1 myprop1 myaccount@active
```

## Cancel Multisig
**Command:** `proton msig:cancel <proposalName> <auth>`

**Description:** Cancel a proposed multisig transaction.

**Arguments:**
- `proposalName` (required): Name of the proposal to cancel
- `auth` (required): Your authorization (must be the proposer)

**Example:**
```bash
proton msig:cancel myprop1 myaccount@active
```

## Execute Multisig
**Command:** `proton msig:exec <proposer> <proposal> <auth>`

**Description:** Execute a proposed multisig transaction after required approvals are met.

**Arguments:**
- `proposer` (required): Name of the proposer
- `proposal` (required): Name of the proposal
- `auth` (required): Your authorization (e.g., user1@active)

**Example:**
```bash
proton msig:exec proposer1 myprop1 myaccount@active
```

## Propose Multisig
**Command:** `proton msig:propose <proposalName> <actions> <auth> [flags]`

**Description:** Create a new multisig proposal.

**Arguments:**
- `proposalName` (required): Name for the new proposal
- `actions` (required): JSON string containing the actions to be executed
- `auth` (required): Your authorization

**Flags:**
- `-b, --blocksBehind`: Number of blocks behind (default: 30)
- `-x, --expireSeconds`: Seconds until transaction expires (default: 7 days)

**Features:**
- Automatically determines required signers from action authorizations
- Serializes actions for blockchain submission
- Provides link to view proposal in explorer

**Example:**
```bash
proton msig:propose myprop1 '[{"account":"eosio.token","name":"transfer","data":{"from":"user1","to":"user2","quantity":"1.0000 XPR","memo":"test"},"authorization":[{"actor":"user1","permission":"active"}]}]' myaccount@active
```