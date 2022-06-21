---
description: Testing
---

# Testing

## Overview

For testing, Proton smart contracts use `VeRT`, a blockchain virtual machine emulator. 

It uses the built-in WebAssembly object in JavaScript, so can be executed on any modern browsers or runtime environments without additional dependencies. The focus of VeRT is on the better compatibility than the performance, so it can be integrated with development pipelines.

Example complete test [here](https://github.com/jafri/ascdk-minimal/blob/9583a5d3d8ad8df2f1f52a21436a23c922abc546/assembly/escrow/escrow.spec.ts)

## Benefits
- Run and test smart contracts
- Minimum dependencies (No native wrapper, docker or remote connection)
- Volatile key-value store with state rollback


## Requirements
- WebAssembly binary with the exported memory
- JavaScript runtime with WebAssembly BigInt support (nodejs v16 or higher)

## Installation
```
npm install @proton/vert proton-tsc
npm install --save-dev ts-node mocha chai
```

## Run a test
```
npx cross-env LOG_LEVEL=debug mocha -s 250 mytest.spec.ts -r ts-node/register
```

## Common Usage

#### Create new blockchain
```ts
import { Blockchain } from "@proton/vert";

const blockchain = new Blockchain()
```


#### Create new accounts / contracts
```ts
// Accounts
const [account1, account2] = blockchain.createAccounts('account1', 'account2')

// Contract
const mycontract = blockchain.createContract('mycontract', 'target/mycontract.contract')
```

#### Token contract helper
```ts
import { mintTokens } from "@proton/vert"

const tokenContract = blockchain.createContract('xtokens', 'node_modules/proton-tsc/external/xtokens/xtokens')

// Runs before each test
beforeEach(async () => {
  // Delete all existing rows
  blockchain.resetTables()

  // 1. Creates test XUSDC tokens with 1,000,000.000000 XUSDC max supply
  // 2. Issue 100,000.000000 XUSDC to both account1 and account2
  await mintTokens(tokenContract, 'XUSDC', 6, 1000000, 100000, [account1, account2])
})
```

#### Execute an action
```ts
// "describe" formats tests into sections
describe('Test 1', () => {
    await tokenContract.actions.transfer(['account1', 'account2', '1.000000 XUSDC', 'sending']).send('account1@active')

    // Same action, more descriptive
    // Action sent using xtokens@active permission
    // Action data parameters can be provided as an array or with named object
    await tokenContract.actions.transfer({
        from: 'account1',
        to: 'account2',
        quantity: '1.000000 XUSDC',
        memo: 'sending'
    }).send('account1@active')
})
```

#### Read console
```ts
import { expect } from "chai";

describe('Test 1', () => {
    await tokenContract.actions.transfer(['account1', 'account2', '1.000000 XUSDC', 'sending']).send()
    expect(tokenContract.bc.console).to.be.equal('3') // will fail since `transfer` action does not print() anything
})
```

#### Read table storage and expect values
```ts
import { expect } from "chai";
import { nameToBigInt, symbolCodeToBigInt } from "@proton/vert"

const getAccount = (accountName: string, symcode: string) => {
  const accountBigInt = nameToBigInt(Name.from(accountName));
  const symcodeBigInt = symbolCodeToBigInt(Asset.SymbolCode.from(symcode));
  return tokenContract.tables!.accounts(accountBigInt).getTableRow(symcodeBigInt)
}

describe('Test 1', () => {
    expect(getAccount('account1', 'XUSDC')).to.be.deep.equal(account('100000.000000 XUSDC'))
    expect(getAccount('account2', 'XUSDC')).to.be.deep.equal(account('100000.000000 XUSDC'))

    await tokenContract.actions.transfer(['account1', 'account2', '1.000000 XUSDC', 'sending']).send()

    expect(getAccount('account1', 'XUSDC')).to.be.deep.equal(account('99999.000000 XUSDC'))
    expect(getAccount('account2', 'XUSDC')).to.be.deep.equal(account('100001.000000 XUSDC'))
})
```

#### Expect to throw
```ts
import { expect } from "chai";
import { expectToThrow, eosio_assert } from "@proton/vert"

describe('Test 1', () => {
    expectToThrow(
        tokenContract.actions.transfer(['account1', 'account2', '100001.000000 XUSDC', 'sending']).send(),
        eosio_assert('overdrawn balance')
    )
})
```

#### Full test
```ts
import { expect } from "chai";
import { Blockchain, expectToThrow, mintTokens, protonAssert } from "@proton/vert"

const blockchain = new Blockchain()
const [account1, account2] = blockchain.createAccounts('account1', 'account2')
const tokenContract = blockchain.createContract('xtokens', 'node_modules/proton-tsc/external/xtokens/xtokens')

beforeEach(async () => {
  blockchain.resetTables()
  await mintTokens(tokenContract, 'XUSDC', 6, 1000000, 100000, [account1, account2])
})

describe('Test 1', () => {
    expectToThrow(
        tokenContract.actions.transfer(['account1', 'account2', '100001.000000 XUSDC', 'sending']).send(),
        protonAssert('overdrawn balance')
    )
})
```

<!-- 
## Debugging

The easiest way to debug your smart contracts is by using `print` statements inside your contract, and running tests using LOG_LEVEL=debug, which will log all data from inside your smart contract to your console. 

### Debug symbols

When compiling with the `--debug` option, the compiler appends a name section to the binary, containing names of functions, globals, locals and so on. These names will show up in stack traces. Note that debug builds are larger in WASM size, and should only be used for testing.

### Source maps

The compiler can generate a source map alongside a binary using the `--sourceMap` option. By default, a relative source map path will be embedded in the binary which browsers can pick up when instantiating a module from a `fetch` response.

### Breakpoints (Experimental)

> **Note: There is currently no support for DWARF, so breakpoints will not show variable names**

Some JavaScript engines also support adding break points directly in WebAssembly code. Please consult your engine's documentation: [Chrome](https://developers.google.com/web/tools/chrome-devtools/javascript/breakpoints), [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Set_a_breakpoint), [Node.js](https://nodejs.org/api/debugger.html), [Safari](https://support.apple.com/de-de/guide/safari-developer/dev5e4caf347/mac). -->