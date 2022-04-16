---
description: Notifications
---


# Notifications

## Overview

Notifications are a way for smart contracts to alert other contracts and users about transactions.

Contracts can listen for incoming notifications and perform actions in response to them.

Users will see two types of transactions in their transaction history on [ProtonScan](https://protonscan.io):
1. Transactions that they authorized with one of their permissions
2. Transactions that specify them as a recipient

By default, token contracts send notifications to both the sender and recipient account.


## Sending Notifications

```ts
import { requireRecipient, Contract, Name, Asset } from "proton-tsc"

class SenderContract extends Contract {
  @action("transfer")
  transfer(from: Name, to: Name, quantity: Asset, memo: string): void {
    requireRecipient(from);
    requireRecipient(to);
  }
}
```

When the transfer action above executes, it would notify both the `from` and `to` account with the transfer action parameters.

**Note:** If the recipient is a contract, it can abort the incoming notification to revert the entire transaction.

## Receiving Notifications

To handle incoming `transfer` actions from any contract, simply add `notify` to the @action decorator.

Inside a notification, use `this.firstReceiver` to get the Name of the contract that sent the notification. 

```ts
import { requireRecipient, Contract, Name, Asset } from "proton-tsc"

class ReceiverContract extends Contract {
  @action("transfer", notify)
  ondeposit(from: Name, to: Name, quantity: Asset, memo: string): void {
    // Skip if outgoing
    if (t.from == this.contract) {
        return;
    }

    // Ensure it is incoming
    check(t.to == this.contract, "Invalid Deposit");

    // Create ExtendedAsset from parameters
    const received = new ExtendedAsset(t.quantity, this.firstReceiver)

    // ...
  }
}
```

**Note 1:** A contract will only receive notifications from contracts other than itself.

**Note 2:** Always validate the firstReceiver, remember any contract can send you a notification.

**Note 3:** Always validate the parameters.

**Note 4:** If your token is sending outgoing token transfers and listening for incoming notifications, remember that token contracts specify `requireRecipient(from)`, so your contract would be notified of this. In the example above we account for this by skipping if outgoing.
