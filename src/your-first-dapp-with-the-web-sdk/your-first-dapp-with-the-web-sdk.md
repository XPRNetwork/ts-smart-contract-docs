# Your first dApp with the web-sdk

## Preamble 

For this section I suggest you to be familiar with NextJS. Why ? NextJS is a great React based framework that plays very nicely with @proton/web-sdk. If you want to start with NextJS, please take a look at the documentation.   
Of course you can use the @proton/web-sdk with any JS framework you want.

## Basic concept

We don’t want to dig too deep in the way the identity process works, but it’s good to know what techs are involved behind the scene, because the whole process is made from several components.

### Transport

The transport refers to the method or protocol used for communication between the wallet and the blockchain, typically the XPR Network. It handles the secure transfer of data, such as user transactions, between the wallet and the XPR Network nodes. Common transports can include HTTP(S) or WebSocket connections, depending on the specific wallet implementation. You will hear about transport in the @proton/web-sdk instantiation, unless you never interact with it directly.

### Storage

Storage refers to the place where the link and session are stored. This refers to a local storage on the device (e.g., browser local storage, or secure hardware wallets) this is how wallet information is persisted during interactions with the XPR Network. You will hear about storage in the @proton/web-sdk instantiation, unless you never interact with it directly.

### PSR

The **Proton Signing Request (PSR)** is a standardized format used to simplify the process of signing transactions in the XPR Network blockchain ecosystem. It provides a way for users and applications to interact with XPR Network blockchains by packaging transaction requests, which include the necessary data, permissions, and actions, into a format that can be signed by a user's private key. This allows for secure, off-chain signing while enabling users to authorize actions like token transfers or smart contract interactions without exposing their private keys. PSR enhances the usability and security of decentralized applications by streamlining the signing process and improving user experience. PSR is a thing that you almost never see in his true form, but it’s the input for all QR code you see when you sign identity or action on XPR Network

### Session

A session in this context represents the duration of an active connection between the wallet and the dApp or service. During the session, user authentication and other wallet-related actions take place. A session helps ensure that a user is continuously authenticated without having to re-enter credentials for each interaction, improving the user experience. Session is returned when the user authenticates successfully  within XPR Network. It’s the central piece for all interaction between the session owner (the connected user) and your dApp.

### Link

A link is the connection established between the XPR Network account and an external service or dApp (decentralized application). It allows the wallet to interact with blockchain services. Links are often used in the context of connecting the wallet to websites or applications that need access to blockchain data or user transactions. You will hear about link in the @proton/web-sdk instantiation, unless you never interact with it directly. Session is returned when the user authenticates successfully  within XPR Network. It’s the central piece for all interaction between the session owner and your dApp.

## The proton/web-sdk

Ok enough theory now, it’s time to do real stuff. The @proton/web-skd exposes only two core functions \`ConnectWallet\` and \`disconnect\`. This is all we need to allow our user to connect and interact with our dApp through WebAuth. Of course for that we will need a webpage :) So let’s create a react application with create-react-app.

> This is NOT a react tutorial, so please check out the doc or use your favorite framework, examples a simple enought to be applyed on any front end framework.


```javascript
import React from 'react'
export default function App() {
  return (
    <div className="app">Hello XPRNetwok</div>
  )
}
```

Ok now inside our react application we import our @proton/web-sdk, instanciate it and make a button.

```javascript
import React from 'react';
function App() {
  return (
    <div className="App">
      Hello XPRNetwork
    </div>
  );
}
export default App;
```
The \`ConnectWallet\` function handles the complete chain signature under the hood:

1. Select wallet type (desktop,mobile,browser)  
2. Show QR code (if wallet type is mobile)

```javascript
import React from 'react';
import {ConnectWallet} from '@proton/web-sdk';

function App() {
  const [activeSession,setActiveSession] = useState<LinkSession>();
  const [activeLink,setActiveLink] = useState<Link | ProtonWebLink>();
  const connectHandler = useCallback((res)=>{

    try {
      const {session,link} = ConnectWallet(
        {
          linkOptions: {
          endpoints:["https://testnet.rockerone.io","https://tn1.protonnz.com"],
          restoreSession: false,   
        },
        selectorOptions: {
          appName:"Dev course app",
          enabledWalletTypes:['webauth','proton']
        },
        transportOptions: {
          requestAccount: currentConfig.requesterAccount,
        },
      })
      setActiveSession(session);
      setActiveLink(link);
    }catch(e){
      console.log(e)
    }
  },[])


  return (
    <div className="App">
    	Hello XPRNetwork
      <button onClick={connectHandler}>Let's connect</button>
    </div>
  );
}
export default App;
```

Ok we added a bunch of code, let’s analyse it.

1. So we have imported the \`ConnectWallet\` function and it’s a static one, that means you don’t have to instanciate it.  
2. Next, we create an onClick handler for our button, within which we call the \`ConnectWallet\` function with the required configuration.  
   **`linkOptions`** defines the link between your dApp and the user wallet, it requires an \`endpoints\` array  and if the previous session needs to be restored if exist with the **`restoreSession`** boolean field.  
   **`selectorOptions`** provides configuration for the wallet type selection modal, shown in the first step of the identity process. The  **`enabledWalletTypes`** defines which wallet type will be shown on the list of available WebAuth wallet types.    
   **`transportOptions`** defines the relation between your dApp creator account (...//TODO better definition)   
3. Once the connection process is completed, the **`ConnectWallet`** function returns a  **`ConnectWalletRet`** that contains a **`session`**  object used to access the user account, sign and push TXs and a **`link`** object, which represents the user connection with your dApp.

**// TODO app screen capture**

So far so good, we have our connection, now let’s see the next step.

## Pushing an action

Now it’s time to see our implementation in action. We will implement a transaction.   
As stated in the terminology chapter of the getting started section: 

> A transaction is a batch of actions performed in cascade. 


So we need to define an action first. Action is a structured object where fields are type as

```javascript
{
  account: string,
  name: string,
  authorization:[
    {
      actor: string,
      permission: string
    }
  ],
  data:any
}
```
Here are fields explained 
* `Account` is the name of the smart contract account without the @ (ex: `eosio.token`)  
* `Name` is the action name that will be performed (ex: `transfer`)  
* `Authorization` is an array of Permissions that contain at least one permission    
  * `Actor` the name of the account that will sign the transaction  
  * `Permission` the name of the required permission that will be used to sign the transaction

  Most of the time, when creating dApp, the authorization is issued with the `actor` and the `permission` of the connected user, we will see it in the next example.

* `data` is an object where field match the input from the action definition, it may sound cryptic, but it’s in fact really simple. We will see it in the next example.

How to implement it in our application, let’s see: 

```javascript
import React,{useCallback} from 'react';
import type {Link, LinkSession, ProtonWebLink} from "@proton/web-sdk";
import ConnectWallet from "@proton/web-sdk";

function App() {

  const [activeSession,setActiveSession] = useState<LinkSession>();
  const [activeLink,setActiveLink] = useState<Link | ProtonWebLink>();

  const connectHandler = useCallback(async (res)=>{
    try {
      const {session,link} = await ConnectWallet({
        linkOptions: {
          endpoints:["https://testnet.rockerone.io","https://tn1.protonnz.com"],
          restoreSession: false,   
        },
        selectorOptions: {
          appName:"Dev course app",
          enabledWalletTypes:['webauth','proton']
        },
        transportOptions: {
          requestAccount: currentConfig.requesterAccount,
        },
      })
      setActiveSession(session);
      setActiveLink(link);
    }catch(e){
      console.log(e)
    }
  },[])

  const pushTransferActionHandler = useCallback(()=>{
    if (!activeSession) return;
      const transferAction = {
        account:"eosio.transfer",
        name:"transfer",
        authorization:[
          {
            actor: activeSession.auth.actor.toString(),
            permission: activeSession.auth.permission.toString()
          }
        ],
        data:{
          from: activeSession.auth.actor.toString(),
          to: "devcourse",
          quantity: "10.0000 XPR",
          memo: "XPRNetwork devcourse rule!"
        }
      }
    }
    try {
      activeSession.transact({
        actions:[
          transferAction
        ]
      },
      {
        broadcast:true
      })
      .then((res)=>{
        console.log(res);
      })
    }catch(e){
      console.log(e)
  }
},[activeSession]);

  return (
    <div className="App">
    	Hello XPRNetwork
      {!activeSession && <button onClick={connectHandler}>Let's connect</button>}{activeSession && <button onClick={pushTransferActionHandler}>Send 10 XPR</button>}
    </div>
  );
}
export default App;
```

Let’s focus on the `pushTransferActionHandler`. The very first thing we do is checking if the `activeSession` is set, meaning the user is authenticated through webauth. Next we define our action to the `eosio.token` contract to trigger the `transfer` action. As you can see the `authorization` array contains the `actor` and the `permission` name set from the `activeSession.`  
After this we define our data as required from the `eosio.token transfer` action. How do we know what field it requires ? Just check the contract action from the explorer:


You can see the input we need to provide through the `data` object. 

**Pro tip:** If you feel comfortable enough with typescript interface you can use the package [@rockerone/abi2ts](https://www.npmjs.com/package/@rockerone/abi2ts) that generates actions types for you.

And finally, we request a transaction signature with the `transact` method from the `activeSession`. Note that the method is an asynchronous one, meaning that you need to wait for the promise to be resolved, then we log into the console the transaction result. The `transact` method accept two object: the first one is the transaction details.  
You can pass your transaction in three flavors, but here we use the `actions` array. The second argument is the transaction options, here we just need to pass the `broadcast` flag as true.   
Always think about error management with a `try/catch` block. 

Let’s run our application   
**// TODO app screenshot**

Hooray, now we have our first working dApp. Can we go further ? Sure, but before, why not create our own smart contract ? Follow us to the next section to start developing smart contracts.

<a href="/smart-contracts/write-your-first-smart-contract.html" class="learn-topics footer">
    <div class="inner">
    <h2 class="head">Session complete</h2>
    <div class="title">
    <p>Next: Build your first smart contract</p>
      <div class="block-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
    </div>
    </div>
  </a>