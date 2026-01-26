# Signing and pushing transactions

You can explore the [code examples on github](https://github.com/XPRNetwork/developer-examples/tree/main/1_reading_from_xprnetwork_tables)

This is where things start to be really fun\! By signing and pushing transactions we mean: **Writing data on-chain**. And this is what we want, right ?

## Notes on this course part


> **Be careful \!** <br/> In this course we will use our private key to sign transactions in our account behalf  from our code, for this we reference our private key in a .env file. **Never reference your private key directly in your code\!** If you don’t understand why we are remaining you this, you should read [Getting started / terminology for private key definition](https://docs.google.com/document/u/6/d/1Va5wF66JmGPwVEUWy-ZWtoXryoSpzM41rEyz5S9uaGY/edit)

Note that we are signing transactions “the back end way”. This is not how you allow other user to interact with your application, this will be covered in the next chapter [Your first dapp with the web-sdk](https://docs.google.com/document/u/6/d/1Va5wF66JmGPwVEUWy-ZWtoXryoSpzM41rEyz5S9uaGY/edit)


## Sign transaction with the @proton/js API class

First, let me introduce you to 2 new classes from the @proton/js package: the **``API`**\`and the **``JsSignatureProvider`**\`. In fact the JSONRpc class, introduced in [1 Reading the on-chain data](https://docs.google.com/document/u/6/d/1Va5wF66JmGPwVEUWy-ZWtoXryoSpzM41rEyz5S9uaGY/edit), is one of the two building blocks of the API. The API class accepts two arguments when you instanciate it: a JSONRpc instance and a JsSignatureProvider instance. The API allows us to push transactions, signed by the JsSignatureProvider using the private key you provide.

Let’s just goes with the basic setup:

```javascript
import {Api, JsonRpc, JsSignatureProvider} from "@proton/js";

const jsonRpc = new JsonRpc(["https://testnet.rockerone.io"]);
const signatureProvider = new JsSignatureProvider(['PVT_K1_...']);
const api = new Api({ rpc: jsonRpc, signatureProvider: signatureProvider });
```

So we keep our good old JSONRpc friend we saw from [1 Reading the on-chain data](https://docs.google.com/document/u/6/d/1Va5wF66JmGPwVEUWy-ZWtoXryoSpzM41rEyz5S9uaGY/edit). We the new class we spoke about above, the **`JsSignatureProvider`** and the **`API**`.`

Now it’s time to create an action (check [documentation about actions](?tab=t.6mn84wfngzyo) if you haven’t read yet ), if you haven’t read  and try to push it. Make sure the private key provided in the JsSignatureProvider constructor array is the one that belong to the **`authorization.actor`** and the **`data.from`**

```javascript
import {Api, JsonRpc, JsSignatureProvider} from "@proton/js";

const jsonRpc = new JsonRpc(["https://testnet.rockerone.io"]);
const signatureProvider = new JsSignatureProvider(['PVT_K1_...']);
const api = new Api({ rpc: jsonRpc, signatureProvider: signatureProvider });

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

So far, so good, we have created an action to \`transfer\` (the action name) 10 XPR (that data quantity) through the eosio.token (the XPR token contract) to the token.burn account (the to from the data). Let’s fire it up through the api:

Run this piece of code:

```javascript
import {Api, JsonRpc, JsSignatureProvider} from "@proton/js";

const jsonRpc = new JsonRpc(["https://testnet.rockerone.io"]);
const signatureProvider = new JsSignatureProvider(["PVT_K1_2btTxMLq72bwHUZgTf9fyxwF3CU6mtFkCtLvdpQD1PEngFdHfk"]);
const api = new Api({rpc: jsonRpc, signatureProvider: signatureProvider});

const action = {
  account: "eosio.token",
  name: "transfer",
  authorization: [
    {
      actor: "devcourse",
      permission: "active",
    },
  ],
  data: {
    from: "devcourse",
    to: "token.burn",
    quantity: "10.0000 XPR",
    memo: "XPRNetwork dev 101 courses rule !",
  },
};

try {

  api
  .transact({actions: [action]}, {expireSeconds: 30, blocksBehind: 3})
  .then(result => {
    console.log('Transaction succeed');
    console.log(result);
  });
} catch (e) {
  console.log('Transaction fail');
  console.log(e);
}
```

[See 2\_your\_first\_transaction\_to\_transfer\_tokens from github repo](https://github.com/XPRNetwork/developer-examples/blob/main/2_sign_and_push_transactions/2_your_first_transaction_to_transfer_tokens.ts)

And it will output:

```javascript
{
  transaction_id: "2fe2c145a5ea38eafc4d5b62d5dc6cbeae7f6f69819041eebad1f06132abdab4",
  processed: {
    id: "2fe2c145a5ea38eafc4d5b62d5dc6cbeae7f6f69819041eebad1f06132abdab4",
    block_num: 301383517,
    block_time: "2025-01-16T13:03:46.000",
    producer_block_id: null,
    receipt: {
      status: "executed",
      cpu_usage_us: 186,
      net_usage_words: 20,
    },
    elapsed: 186,
    net_usage: 160,
    scheduled: false,
    action_traces: [
      [Object ...]
    ],
    account_ram_delta: null,
    except: null,
    error_code: null,
  },
}
```

Look at this\! We have a **`transaction_id`** and the **`receipt`** have a “executed” **`status`.** Our transaction is executed, let’s check in the testnet explorer a more user friendly confirmation

[Open the explorer](https://testnet.explorer.xprnetwork.org/transaction/2fe2c145a5ea38eafc4d5b62d5dc6cbeae7f6f69819041eebad1f06132abdab4)  
![image1](/sign-and-push-txs/sign-and-push-tx_1.png)
As you can see all informations from the **`action`** are in the actions tab, and our transaction\_id is the same from the **`api.transact`** response call. 

That’s the basics of signing and pushing transactions. You see how easy it is.   
 And you can stack actions in the transaction, but keep in mind that [execution order matters](https://docs.google.com/document/u/6/d/1Va5wF66JmGPwVEUWy-ZWtoXryoSpzM41rEyz5S9uaGY/edit).

## A more functional example 

The most common example is the **`escrow contract`**. Just a quick overview of what is that: 

> An **escrow** is a financial arrangement in which a third party holds and manages funds or assets on behalf of two other parties involved in a transaction. The third party only releases the funds or assets when certain predefined conditions are met. This ensures that both parties fulfill their obligations, providing protection to both the buyer and the seller.*

For this example we have deployed a dedicated smart contract to keep the process simple at this point. This very example will be analysed in deep on [3 Your first dApp with the web-sdk](https://docs.google.com/document/u/6/d/1Va5wF66JmGPwVEUWy-ZWtoXryoSpzM41rEyz5S9uaGY/edit) and [4 introduction to smart contracts](https://docs.google.com/document/u/6/d/1Va5wF66JmGPwVEUWy-ZWtoXryoSpzM41rEyz5S9uaGY/edit). 

The contract in question is a greeting contract with an escrow process. In short, by paying 10 XPR to the contract, you are authorized to publish a message… Lame but easy to understand. A quick look at the [41.devcourse contract on testnet](https://testnet.explorer.xprnetwork.org/account/41.devcourse?loadContract=true&tab=Tables&account=41.devcourse&scope=41.devcourse&limit=100)   
![image2](/sign-and-push-txs/sign-and-push-tx_2.png)  
You will see that we have 2 tables in the tables tab: **`tickets`** and **`greets`**. The tickets table holds “How many authorization to publish greeting you buy” and greets is “The message you have published using a ticket”. 

In the actions tab, you see that we have only a single **`greet`** action, to publish a greeting message by sending an account name as the **`greeter`** and the greeting **`message`**.     
![image3](/sign-and-push-txs/sign-and-push-tx_3.png)  

Let's try to use this contract \! The process now involves 2 actions: a regular **`transfer`** action, the one that allows you to send tokens to any account on XPR Network and the **`greet`** action to publish a greeting. We will just do the first action to see what’s happen on the contract side.

```javascript
import {Api, JsonRpc, JsSignatureProvider} from "@proton/js";

const jsonRpc = new JsonRpc(["https://testnet.rockerone.io"]);
const signatureProvider = new JsSignatureProvider(["PVT_K1_2btTxMLq72bwHUZgTf9fyxwF3CU6mtFkCtLvdpQD1PEngFdHfk"]);
const api = new Api({rpc: jsonRpc, signatureProvider: signatureProvider});

const action = {
  account: "eosio.token",
  name: "transfer",
  authorization: [
    {
      actor: "devcourse",
      permission: "active",
    },
  ],
  data: {
    from: "devcourse",
    to: "41.devcourse",
    quantity: "10.0000 XPR",
    memo: "",
  },
};

try {

  api
  .transact({actions: [action]}, {expireSeconds: 30, blocksBehind: 3})
  .then(result => {
    console.log('Transaction succeed');
    console.log(result);
  });
} catch (e) {
  console.log('Transaction fail');
  console.log(e);
}
```

[See 3\_transaction\_to\_the\_greeting\_contract from github repo](https://github.com/XPRNetwork/developer-examples/blob/main/2_sign_and_push_transactions/2_your_first_transaction_to_transfer_tokens.ts)

As you can see the example is almost the same as the basic transfer, except we have changed the recipient of the transfer (the **`to`** in the action data) to **`41.devcourse`** and removed the memo. On the contract, the cost to buy a ticket is set to 10.0000 XPR.  
Run it\! 

```javascript
{
  transaction_id: "fd7800178c5534e74be6e85344ac805fec9b5de40c0d8c51d30cfba281656568",
  processed: {
    id: "fd7800178c5534e74be6e85344ac805fec9b5de40c0d8c51d30cfba281656568",
    block_num: 302225728,
    block_time: "2025-01-21T10:05:09.500",
    producer_block_id: null,
    receipt: {
      status: "executed",
      cpu_usage_us: 277,
      net_usage_words: 16,
    },
    elapsed: 1055,
    net_usage: 128,
    scheduled: false,
    action_traces: [
      [Object ...]
    ],
    account_ram_delta: null,
    except: null,
    error_code: null,
  },
}
```

Easy peasy, you should receive the transaction\_id and the receipt status should be “executed”  
On the testnet explorer, [the transaction](https://testnet.explorer.xprnetwork.org/transaction/fd7800178c5534e74be6e85344ac805fec9b5de40c0d8c51d30cfba281656568?tab=traces) show that 41.devcourse received 10XPR

![image4](/sign-and-push-txs/sign-and-push-tx_5.png)

And on the contract side, the devcourse account has been granted one ticket to publish a greeting message. Ok, now let’s add the **`greet`** action call to the transaction. Let’s rename the action variable to be more clear. 

```javascript
import {Api, JsonRpc, JsSignatureProvider} from "@proton/js";

const jsonRpc = new JsonRpc(["https://testnet.rockerone.io"]);
const signatureProvider = new JsSignatureProvider(["PVT_K1_2btTxMLq72bwHUZgTf9fyxwF3CU6mtFkCtLvdpQD1PEngFdHfk"]);
const api = new Api({rpc: jsonRpc, signatureProvider: signatureProvider});

const transferAction = {
  account: "eosio.token",
  name: "transfer",
  authorization: [
    {
      actor: "devcourse",
      permission: "active",
    },
  ],
  data: {
    from: "devcourse",
    to: "41.devcourse",
    quantity: "10.0000 XPR",
    memo: "",
  },
};

const greetingAction = {
  account: "41.devcourse",
  name: "greet",
  authorization: [
    {
      actor: "devcourse",
      permission: "active",
    },
  ],
  data: {
    greeter: "devcourse",
    message: "Hello from XPRNetwork, the only network that beat Chuck Norris",
  },
};

try {

  api
  .transact({actions: [transferAction,greetingAction]}, {expireSeconds: 30, blocksBehind: 3})
  .then(result => {
    console.log('Transaction succeed');
    console.log(result);
  });
} catch (e) {
  console.log('Transaction fail');
  console.log(e);
}
```

[See 4\_full\_transaction\_to\_the\_greeting\_contract from github repo](https://github.com/XPRNetwork/developer-examples/blob/main/2_sign_and_push_transactions/2_your_first_transaction_to_transfer_tokens.ts)

So we have renamed the original **`action`** to \`transferAction\` and added the **`greetingAction`**. Booths have been added to the **`actions`** array of the **`transact`** function on the **`api`** instance.  
Let’s run this baby \! 

Once again the response is instant\! **`transaction_id`** and executed status, we have everything \!  

```javascript
{
  transaction_id: "2b00658855d4ba607163abba6c0cca8738d431b343d575d07279b392145ed548",
  processed: {
    id: "2b00658855d4ba607163abba6c0cca8738d431b343d575d07279b392145ed548",
    block_num: 302229877,
    block_time: "2025-01-21T10:41:08.000",
    producer_block_id: null,
    receipt: {
      status: "executed",
      cpu_usage_us: 243,
      net_usage_words: 29,
    },
    elapsed: 243,
    net_usage: 232,
    scheduled: false,
    action_traces: [
      [Object ...], [Object ...]
    ],
    account_ram_delta: null,
    except: null,
    error_code: null,
  },
}
```

On the explorer side, we can see that our transaction has been executed sequentially, with the **`transfer`** executed on the **`eosio.token`** contract in first position, then the **`greet`** action on the **`41.devcourse`** contract.  
![image6](/sign-and-push-txs/sign-and-push-tx_7.png)

On the **`41.devcourse`** contract, we can see in the **`greets`** table our published message\!   
![image7](/sign-and-push-txs/sign-and-push-tx_8.png)

But from the \`tickets\` table, there remains 1 ticket for our account … Why ? Because the last action has bough a ticket and consumed it immediately\! The remaining ticket was acquired by our previous single **`transfer`** action example, that means we can publish 1 other message without transferring tokens. 

We remove the transfer action and run this code 

```javascript
import {Api, JsonRpc, JsSignatureProvider} from "@proton/js";

const jsonRpc = new JsonRpc(["https://testnet.rockerone.io"]);
const signatureProvider = new JsSignatureProvider(["PVT_K1_2btTxMLq72bwHUZgTf9fyxwF3CU6mtFkCtLvdpQD1PEngFdHfk"]);
const api = new Api({rpc: jsonRpc, signatureProvider: signatureProvider});

const greetingAction = {
  account: "41.devcourse",
  name: "greet",
  authorization: [
    {
      actor: "devcourse",
      permission: "active",
    },
  ],
  data: {
    greeter: "devcourse",
    message: "Pump up the jam, pump it up While your feet are stompin', And the jam is pumpin', Look ahead, the crowd is jumpin",
  },
};

try {

  api
  .transact({actions: [greetingAction]}, {expireSeconds: 30, blocksBehind: 3})
  .then(result => {
    console.log('Transaction succeed');
    console.log(result);
  });
} catch (e) {
  console.log('Transaction fail');
  console.log(e);
}
```

     
Response from this call: 

```javascript
{
  transaction_id: "f6e248ab5d312db28edad0fd4dac8305199601c6d43b4e8c733f7656f8acadcf",
  processed: {
    id: "f6e248ab5d312db28edad0fd4dac8305199601c6d43b4e8c733f7656f8acadcf",
    block_num: 302232108,
    block_time: "2025-01-21T10:59:43.500",
    producer_block_id: null,
    receipt: {
      status: "executed",
      cpu_usage_us: 190,
      net_usage_words: 27,
    },
    elapsed: 190,
    net_usage: 216,
    scheduled: false,
    action_traces: [
      [Object ...]
    ],
    account_ram_delta: null,
    except: null,
    error_code: null,
  },
}

```

And here is our [transaction on the explorer](https://testnet.explorer.xprnetwork.org/transaction/f6e248ab5d312db28edad0fd4dac8305199601c6d43b4e8c733f7656f8acadcf?tab=traces) with our single call.  
![image7](/sign-and-push-txs/sign-and-push-tx_11.png)

And our new message from our **`greets`** table ![image7](/sign-and-push-txs/sign-and-push-tx_12.png)

And finally there is no ticket left for our account   
![image7](/sign-and-push-txs/sign-and-push-tx_13.png)

So now if we run our code again and make a single call to the **`greet`** action, we have this expected error. 

```javascript
error: assertion failure with message: No ticket found, transfer 10 XPR before greeting at new RpcError

```

<a class="learn-topics footer" href="/your-first-dapp-with-the-web-sdk/your-first-dapp-with-the-web-sdk.html">
    <div class="inner">
    <h2 class="head">Session complete</h2>
    <div class="title">
    <p>Next: Write your first dApp</p>
      <div class="block-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
    </div>
    </div>
  </a>

