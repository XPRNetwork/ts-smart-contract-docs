---
description: Inline Actions
---


# Inline Actions

## Overview

Inline Actions provide a way for smart contracts to execute actions on other contracts.

## Execution order

Proton's architecture prevents re-entrancy attacks by scheduling inline actions instead of executing them immediately. 

The actions array in a transaction submitted by the user to the blockchain are referred to as root actions. Root actions are executed in the order provided and each of these root actions may send outgoing notifications or inline actions recursively. Root action 1 and all of its recursive notifications and inline actions must be fully executed before root action 2 is executed.

Each root and inline action create their own 2 internal FIFO queues:
1. Notification queue
2. Action queue

As code executes in the current root or inline action's context:
1. Outgoing notifications get added to the current action's notification queue.
2. Outgoing actions get added to the current action's actions queue.

The blockchain execution logic follows:
1. If current action is executed, process the next notification in the notification queue.
2. If current action's notification queue is empty, process the next action in the actions queue.
3. If current action's notification and action queues are empty, process queues from the parent action.

Example:

<img src="./images/executionOrder.png">

## Sending Inline Action

```ts
import { InlineAction, Name, Asset, Contract } from "proton-tsc"

// Create packer class for object to send
@packer
export class TokenTransfer extends InlineAction {
    constructor (
        public from: Name = new Name(),
        public to: Name = new Name(),
        public quantity: Asset = new Asset(),
        public memo: string = "",
    ) {
        super();
    }
}

class SenderContract extends Contract {
  @action("transfer")
  sendinline(): void {
    // Create transfer object
    const actionParams = new TokenTransfer(this.receiver, Name.fromString("receiver"), Asset.fromString("1.000000 XUSDC"), "memo")

    // Create transfer action
    const action = transfer.act("xtokens", new PermissionLevel(this.receiver))

    // Send action (add to queue)
    action.send(actionParams)
  }
}
```

**Note:** If the inline action aborts, it will revert the entire transaction.


## Send Tokens and NFTs

`proton-tsc` provides many inline action helpers for common tasks like sending tokens and NFTs

**Tokens**
```ts
import { sendTransferTokens } from "proton-tsc/token"

sendTransferTokens(
  Name.fromString("sender"),
  Name.fromString("receiver"),
  [new ExtendedAsset(Asset.fromString("1.000000 XUSDC"), Name.fromString("xtokens"))],
  "my memo"
)
```

**NFTs**
```ts
import { sendTransferNfts } from "proton-tsc/atomicassets"

sendTransferNfts(
  Name.fromString("sender"),
  Name.fromString("receiver"),
  [<u64>4398046836870, <u64>4398046836871],
  "my memo"
)
```