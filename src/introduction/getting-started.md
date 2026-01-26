
# Getting started

On your way to your first XPR Network Smart Contract!

### Pre-requisites

- NodeJS 16 [Installation Guide](https://github.com/XPRNetwork/proton-cli#install-nodejs)
- NPM
- Git
- [XPR Network CLI](https://github.com/XPRNetwork/proton-cli)
``` bash
npm install -g @proton/cli
```

## Create Testnet Account

1. Change chain to XPR Network Testnet
```
proton chain:set proton-test
```

2. Create an account (12 characters max using charset a-z and 1-5)
```
proton account:create <ACCOUNT_NAME>
```

## Setting up a new project

1. Run the CLI contract generator:

```sh
proton generate:contract <ACCOUNT_NAME>
cd <ACCOUNT_NAME>
```

2. Build contract (to `target` folder) and run the playground (a simulated blockchain environment)
```
npm run playground
```

## Deploy to the blockchain


1. Obtain some XPR from testnet faucet
```
proton faucet:claim XPR <ACCOUNT_NAME>
```

2. Purchase some blockchain storage (RAM)
```
proton ram:buy <ACCOUNT_NAME> <ACCOUNT_NAME> 300000
```

3. Deploy Contract
```
proton contract:set <ACCOUNT_NAME> ./target
```

## Interact with deployed contract
Typically, users would interact with your smart contract using a web interface integrated with the [XPR Network Web SDK](https://github.com/XPRNetwork/proton-web-sdk), that allows logging in with the [WebAuth Wallet](http://webauth.com/). Earlier in this tutorial, we also saw how to run a simulated playground and execute actions inside it using `npm run playground`

Next, we will interact with the contract through our CLI to verify successful deployment to the blockchain. 

The following command executes "action1" on your contract:
```
proton action <ACCOUNT_NAME> action1 '[]' <ACCOUNT_NAME>
```

## What's next?

In this tutorial, we looked at deploying a barebones contract.

The next steps are to:
1. Read more about how XPR Network accounts, starting with [Accounts and Permissions](./accounts-and-permissions.md)
2. Read the different API functions available inside contracts starting with [Authentication](/contract-sdk/api/authentication.md)
3. Read the different classes commonly used starting with [Asset](/contract-sdk/classes/Asset.md)
4. Have a look at our extensive contract [examples](/contract-sdk/examples.md)

Equipped with these resources, you can create anything on the XPR Network blockchain!