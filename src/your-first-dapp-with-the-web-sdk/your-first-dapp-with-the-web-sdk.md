# Your first dApp with the web-sdk

## Preamble 

For this section I suggest you to be familiar with NextJS. Why ? NextJS is a great React based framework that plays very nicely with @proton/web-sdk. If you want to start with NextJS, please take a look at the documentation.   
Of course you can use the @proton/web-sdk with any JS framework you want.

## Basic concept

We don’t want to dig too deep in the way the identity process works, but it’s good to know what techs are involved behind the scene, because the whole process is made from several components.

### Transport

The transport refers to the method or protocol used for communication between the wallet and the blockchain, typically the XPRNetwork network. It handles the secure transfer of data, such as user transactions, between the wallet and the XPRNetwork nodes. Common transports can include HTTP(S) or WebSocket connections, depending on the specific wallet implementation. You will hear about transport in the @proton/web-sdk instantiation, unless you never interact with it directly.

### Storage

Storage refers to the place where the link and session are stored. This refers to a local storage on the device (e.g., browser local storage, or secure hardware wallets) this is how wallet information is persisted during interactions with the XPRNetwork network. You will hear about storage in the @proton/web-sdk instantiation, unless you never interact with it directly.

### PSR

The **Proton Signing Request (PSR)** is a standardized format used to simplify the process of signing transactions in the XPRNetwork blockchain ecosystem. It provides a way for users and applications to interact with XPRNetwork blockchains by packaging transaction requests, which include the necessary data, permissions, and actions, into a format that can be signed by a user's private key. This allows for secure, off-chain signing while enabling users to authorize actions like token transfers or smart contract interactions without exposing their private keys. PSR enhances the usability and security of decentralized applications by streamlining the signing process and improving user experience. PSR is a thing that you almost never see in his true form, but it’s the input for all QR code you see when you sign identity or action on XPRNetwork

### Session

A session in this context represents the duration of an active connection between the wallet and the dApp or service. During the session, user authentication and other wallet-related actions take place. A session helps ensure that a user is continuously authenticated without having to re-enter credentials for each interaction, improving the user experience. Session is returned when the user authenticates successfully  within XPRNetwork. It’s the central piece for all interaction between the session owner (the connected user) and your dApp.

### Link

A link is the connection established between the XPRNetwork account and an external service or dApp (decentralized application). It allows the wallet to interact with blockchain services. Links are often used in the context of connecting the wallet to websites or applications that need access to blockchain data or user transactions. You will hear about link in the @proton/web-sdk instantiation, unless you never interact with it directly. Session is returned when the user authenticates successfully  within XPRNetwork. It’s the central piece for all interaction between the session owner and your dApp.

## The proton/web-sdk

Ok enough theory now, it’s time to do real stuff. The @proton/web-skd exposes only two core functions \`ConnectWallet\` and \`disconnect\`. This is all we need to allow our user to connect and interact with our dApp through WebAuth. Of course for that we will need a webpage :) So let’s create a react application with create-react-app.

```
This is NOT a react tutorial, so please check out the doc or use your favorite framework, examples a simple enought to be applyed on any front end framework.
```

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
import 
function App() {
  return (
    <div className="App">
      Hello XPRNetwork
    </div>
  );
}
export default App;
```

