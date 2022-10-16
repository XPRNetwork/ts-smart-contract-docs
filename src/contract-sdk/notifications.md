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

**Important:** Understand the [Execution Order](./execution-order.md) of smart contracts before using notifications.

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
    if (from == this.contract) {
        return;
    }

    // Ensure it is incoming
    check(to == this.contract, "Invalid Deposit");

    // Create ExtendedAsset from parameters
    const received = new ExtendedAsset(quantity, this.firstReceiver)

    // ...
  }
}
```

**Note 1:** Inside a notification, no authorizations are given, which means:
  1. All `requireAuth` calls will throw an error.
  2. All rows stored must specify the receiver contract as RAM payer.

**Note 2:** A contract will only receive notifications from contracts other than itself.

**Note 3:** Always validate the firstReceiver, remember any contract can send you a notification.

**Note 4:** Always validate the incoming parameters.

**Note 5:** If your token is sending outgoing token transfers and listening for incoming notifications, remember that token contracts specify `requireRecipient(from)`, so your contract would be notified of this. In the example above we account for this by skipping if outgoing.

## Common Notifications

Remember that only contracts explicitly notified using `requireRecipient` will be notified.

Here is a list of common contracts, actions and their notifications

<br/>

**Token Contracts (e.g. xtokens)**

<u>transfer</u>

Parameters: `(from: Name, to: Name, quantity: Asset, memo: string)`

Notifies: from and to

<br/>

**NFT Contract (atomicassets)**

Note that all notified accounts (ANA) is specified by a collection's `notify_accounts`

<u>transfer</u>

Parameters: `(from: Name, to: Name, assetIds: u64[], memo: string)`

Notifies: from and to


<u>logtransfer</u>

Parameters: `(collection: Name, from: Name, to: Name, assetIds: u64[], memo: string)`

Notifies: ANA

<u>lognewtempl</u>

Parameters: `(templateId: i32, creator: Name, collection: Name, schema: Name, transferable: boolean, burnable: boolean, maxSupply: u32, immutableData: AtomicAttribute[])`

Notifies: ANA

<u>logsetdata</u>

Parameters: `(owner: Name, assetId: u64, oldData: AtomicAttribute[], newData: AtomicAttribute[])`

Notifies: ANA

<u>logburnasset</u>

Parameters: `(owner: Name, assetId: u64, collection: Name, schema: Name, templateId: i32, backedTokens: Asset[], oldImmutableData: AtomicAttribute[], oldMutableData: AtomicAttribute[], ramPayer: Name)`

Notifies: ANA

<u>acceptoffer</u>

Parameters: `(offerId: u64)`

Notifies: sender and recipient

<u>lognewoffer</u>

Parameters: `(offerId: u64, sender: Name, recipient: Name, senderAssetIds: u64[], recipientAssetIds: u64[], memo: string)`

Notifies: sender and recipient

<u>logmint</u>

Parameters: `(assetId: u64, minter: Name, collection: Name, schema: Name, templateId: i32, newOwner: Name, immutableData: AtomicAttribute[], mutableData: AtomicAttribute[], backedTokens: Asset[], immutableTemplateData: AtomicAttribute[])`

Notifies: newOwner and ANA

<u>logbackasset</u>

Parameters: `(owner: Name, assetId: u64, backedToken: Asset)`

Notifies: owner and ANA

<br/>

**NFT Market Contract (atomicmarket)**

<u>lognewsale</u>

Parameters: `(saleId: u64, seller: Name, assetIds: u64[], listingPrice: Asset, settlementSymbol: Symbol, makerMarketplace: Name, collection: Name, collectionFee: f64)`

Notifies: seller

<u>lognewauct</u>

Parameters: `(auctionId: u64, seller: Name, assetIds: u64[], startingBid: Asset, duration: u32, endTime: u32, makerMarketplace: Name, collection: Name, collectionFee: f64)`

Notifies: seller
