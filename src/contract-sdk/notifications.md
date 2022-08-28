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
    if (from == this.receiver) {
        return;
    }

    // Ensure it is incoming
    check(to == this.receiver, "Invalid Deposit");

    // Create ExtendedAsset from parameters
    const received = new ExtendedAsset(t.quantity, this.firstReceiver)

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
Transfer tokens from a wallet to another
Parameters: `(from: Name, to: Name, quantity: Asset, memo: string)`

- `from: Name`   
*REQUIRED: The transfer wallet that originated from, as [Name class](https://docs.protonchain.com/contract-sdk/classes/Name.html)*   
- `to: Name`           
*REQUIRED: The desitnation wallet,as [Name class](https://docs.protonchain.com/contract-sdk/classes/Name.html)*   
- `quantity: Asset`  
*REQUIRED: The quantity of transfered tokens, as [Asset class](https://docs.protonchain.com/contract-sdk/classes/Asset.html#constructors)*     
- `memo: string`  
*REQUIRED: An arbitrary message, most of time used to describe the transfer reason.*


Notifies: `from` and `to` accounts
<br/>

**NFT Contract (atomicassets)**

Note that all notified accounts (ANA) is specified by a collection's `notify_accounts`

<u>transfer</u>

Transfer NFTs from a wallet to another
Parameters: `(from: Name, to: Name, assetIds: u64[], memo: string)`

- `from: Name`   
*REQUIRED: The transfer wallet that originated from, as [Name class](https://docs.protonchain.com/contract-sdk/classes/Name.html)*   
- `to: Name`           
*REQUIRED: The desitnation wallet,as [Name class](https://docs.protonchain.com/contract-sdk/classes/Name.html)*   
- `assetIds: u64[]`  
*REQUIRED: A list of assets ID*     
- `memo: string`  
*REQUIRED: An arbitrary message, most of time used to describe the transfer reason.*

**Notifies: `from` and `to` accounts**


<u>logtransfer</u>
**Notifcation only** Called when the NFTs transfer is complete. Params are passed from the `transfer` action to `logtransfer`.
Parameters: `(collection: Name, from: Name, to: Name, assetIds: u64[], memo: string)`

- `from: Name`   
*REQUIRED: The transfer wallet that originated from, as [Name class](https://docs.protonchain.com/contract-sdk/classes/Name.html)*   
- `to: Name`           
*REQUIRED: The desitnation wallet,as [Name class](https://docs.protonchain.com/contract-sdk/classes/Name.html)*   
- `assetIds: u64[]`  
*REQUIRED: A list of assets ID*     
- `memo: string`  
*REQUIRED: An arbitrary message, most of time used to describe the transfer reason.*

**Notifies: All involved accounts**

<u>lognewtempl</u>
**Notifcation only** Called when the creation of a new NFT template is complete. Params are passed from the `createtempl` action to `lognewtempl`.
Parameters: `(templateId: i32, creator: Name, collection: Name, schema: Name, transferable: boolean, burnable: boolean, maxSupply: u32, immutableData: AtomicAttribute[])`

- `templateId: Name`   
*REQUIRED: The ID of the newly created template*   
- `creator: Name`           
*REQUIRED: The creator account,as [Name class](https://docs.protonchain.com/contract-sdk/classes/Name.html)*   
- `collection: Name`  
*REQUIRED: The name of the collection where the template belong, as [Name class](https://docs.protonchain.com/contract-sdk/classes/Name.html)*   
- `schema: Name`  
*REQUIRED: The name of the schema where the schema applyed to the collection, as [Name class](https://docs.protonchain.com/contract-sdk/classes/Name.html)*   
- `transferable: boolean`  
*REQUIRED: Set the minted asset from the template to be transferable or not*
- `burnable: boolean`  
*REQUIRED: Set the minted asset from the template to be burned or not*      
- `maxSupply: u32`  
*REQUIRED: Defined the maximum asset that could be minted from the template*
- `immutableData: AtomicAttribute[]`  
*REQUIRED: A list of atomic attributes that describe the immutable schema that belong to the template as [{"name":"field_name","type":"string"}] 

**Notifies: All involved accounts**

<u>logsetdata</u>

Parameters: `(owner: Name, assetId: u64, oldData: AtomicAttribute[], newData: AtomicAttribute[])`

**Notifies: All involved accounts**

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
