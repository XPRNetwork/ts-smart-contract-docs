# XPR Network 101: Actions, transactions, and execution order

## What’s a transaction ?

To keep it short for now, let’s say a transaction to be just a batch of actions to be executed in a sequence,  In fact it’s little bit more than just an array, it also has a bunch of fields (expiration time, block num, signature,...) but the api of XPRNetwork takes care of that.

## What’s an action ?

An **action** is a command sent to an account or smart contract. Examples: transferring tokens, posting a message, it’s a request to execute a specific logic in a contract.

Here is what an action look like 

```javascript
const action = {
  account:"eosio.token",
  name:"tranfer",
  authorization: [
    {
      actor: "devcourse",
      permission:"active"
      
    }
  ],
  data: {
    from: "devcourse",
    to: "token.burn",
    quantity: "10.0000 XPR",
    memo:"XPRNetwork dev 101 courses rule !"
  }
}
```

Let’s explain the structure.

Basically, XPRNetwork actions contain these four fields: account, name, authorization and data. Let’s see what each is:

*  **`account:`** The **`` `account` ``** is in fact the account that “hosts” the smart contract. In this case the \`**`` eosio.token` ``** contract.  
* **`name:`** This is the command name you are invoking through this action, in our case it’s the \`**`` transfer` ``** action  
* **`authorization: T`**his is an array of accounts whose signatures are required to execute the current action. The \`**`` actor` ``** field is the account name. The \`**`` permission` ``** field is the name of the permission, for now we will always set it to active. So here we specify the devcourse account with the active permission. Most of the time, you will have a single account in the authorization array.  
* **`data:`** The data object structure is tied to the action itself \! It depends on the inputs required by the action defined by the contract action. To know what fields and value types are expected for an action, please refer to the action’s contract on the explorer. 

### User actions, Inline actions and Notification

When it comes to executing transactions and before talking about execution order, you need to understand these three types of actions.   
The first type, let’s call it **User actions** are actions generated from a dApp, back end of front end and signed by an account. The other type is **Inline actions**. Inline actions are generated from inside a smart contract (as opposed to user-generated). And finally we have **Notifications** who are Incoming alerts from other smart contracts.

## Execution order

Bear with me because this concept is very important. Understanding it could save you from countless hours of hair pulling.

There are 2 queues per user  actions, Notifications queue (RootN) and Inline actions queue (RootIA)  
New notifications (NewN) and new inline actions (NewIA) are added at the end of the every notification or action as:

1. RootN \= \[...RootN, ...NewN\]  
2. Is the current context a notification?  
   * Yes: RootIA \= \[...RootIA, ...NewIA\]  
   * No: RootIA \= \[...NewIA, ...RootIA\]

   

Note that XPR Network will only process the inline actions queue when the notifications queue is empty.

### Basic example 

**Root User action							1**  
**Notification				 			2**  
**Inline action						3**  
**Inline action					4**  
**Notification					3**  
**Root User action							6**  
**Inline action				 			8**  
**Notification							7**

### Complex 

**Root Action								1**  
**Inline Action							7**  
**Notification						8**  
**Inline Action						9**  
**Notification							2**  
**Inline Action						13**  
**Inline Action					15**  
**Notification					14**  
**Notification						4**  
**Notification					6**  
**Inline Action					17**  
**Notification							3**  
**Inline Action						16**  
**Notification						5**  
**Inline Action							10**  
**Inline Action						12**  
**Notification						11**  
**Root Action								18**  
**Inline Action							20**  
**Notification							19**

As you can see, the notification for the current context occurs before inline actions are performed. It run as it until all notification queues are empty, then it processes the inline actions queues, then it moves to the next action. On the explorer you can see the [execution of action](https://explorer.xprnetwork.org/transaction/edc47ae6978b25e400cbecdadcf5e8a0574adb0a97debc2a61746eec776857ec?tab=traces) 

---

## **Session complete**

Congratulation, now you have all the basics you need to understand XPRNetwork developement.  
**\>\> Next, we’ll see how to read the on-chain data**