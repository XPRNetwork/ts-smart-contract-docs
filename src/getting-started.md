
# Getting started

On your way to your first Proton Smart Contract!

## Pre-requisites

- NodeJS 16 [Installation Guide](https://github.com/ProtonProtocol/proton-cli/blob/master/INSTALL_NODE.md)
- NPM
- Git

## Setting up a new project

1. Fork the current contracts repository:

```sh
git clone https://github.com/ProtonProtocol/proton-ts-contracts
```

2. Install the node packages:
```
npm i
```

3. Build the hello smart contract
```
npm run build:hello
```

4. Run tests for the hello smart contract
```
npm run test:hello
```

## Deploy to the blockchain

To deploy your smart contract to the blockchain, you first need to create an account. For this tutorial, we will be using Proton Testnet network.


1. Install [Proton CLI](https://github.com/ProtonProtocol/proton-cli)
```
npm i -g @proton/cli
```

2. Change network to proton-test
```
proton network:set
```

3. Create an account (names can be up to 12 chars long and use chars a-z, 1-5)
```
proton account:create <ACCOUNT_NAME>
```

4. Obtain some XPR from testnet

5. Purchase some Blockchain Storage (RAM)
```
proton ram:buy
```

6. Deploy Contract
```
proton contract:set ./contracts/hello/target <ACCOUNT_NAME>
```

## Interact with deployed contract
Typically, users would interact with your smart contract using a web interface integrated with the [Proton Web SDK](https://github.com/ProtonProtocol/ProtonWeb), that allows logging in with the [WebAuth Wallet](http://webauth.com/).

For the purposes of this tutorial, we will interact with the contract through our CLI to verify successful deployment.

Run the hello action on your contract using:
```
proton action <ACCOUNT_NAME> hello
```


## What's next?

In this tutorial, we looked at deploying a simple hello world contract.

The next steps are to:
1. Have a look at the different [examples](./examples.md)
2. Read the different API functions available inside contracts starting with [Authentication](./api/authentication.md)
3. Read the different classes commonly used starting with [Asset](./classes/asset.md)

Equipped with these resources, you can create anything on the Proton blockchain!