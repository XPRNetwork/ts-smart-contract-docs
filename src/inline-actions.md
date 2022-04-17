---
description: Inline Actions
---


# Inline Actions

## Overview

Actions submitted by a user as part of a transaction are referred to as root actions.

Actions sent from inside a smart contract are referred to as inline actions.

## Execution order

Proton's architecture helps mitigate re-entrancy attacks by scheduling inline actions instead of executing them immediately. 

Every root and inline action maintains its own 2 internal FIFO queues for:
1. Notifications
2. Actions

As code executes in the current action's context:
1. Outgoing notifications get added to the current action's notification queue.
2. Outgoing actions get added to the current action's actions queue.

The blockchain execution logic follows:
1. If current action is executed, process the next notification in the notification queue.
2. If current action's notification queue is empty, process the next action in the actions queue.
3. If current action's notification and action queues are empty, process queues from the parent action.

Execution order playground:

<ExecutionOrder/>

<!-- <img src="./images/executionOrder.png"> -->

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