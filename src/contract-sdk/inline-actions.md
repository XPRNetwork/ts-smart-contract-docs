---
description: Inline Actions
---

# Inline Actions

## Overview

Actions sent from inside a smart contract are referred to as inline actions.

**Important:** Understand the [Execution Order](./execution-order.md) of smart contracts before using inline actions.

## Sending Inline Action

```ts
import { Name, Asset, Contract, ActionData, InlineAction } from "proton-tsc"

// Create packer class for object to send
@packer
export class TokenTransfer extends ActionData {
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
  @action("sendinline")
  sendinline(): void {
    // Create transfer action
    const tokenContract = "xtokens"
    const transfer = new InlineAction<TokenTransfer>("transfer")
    const action = transfer.act(tokenContract, new PermissionLevel(this.receiver))

    // Create transfer object
    const actionParams = new TokenTransfer(this.receiver, Name.fromString("receiver"), Asset.fromString("1.000000 XUSDC"), "memo")

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