# Escrow

### Install
```
npm i @proton/web-sdk @proton/api
```

### Initialize SDK

```js
import ProtonSDK from '@proton/web-sdk'
import { ApiClass } from '@proton/api'

const api = new ApiClass('proton') // 'proton-test' for testnet

const { link, session } = await ProtonSDK({
    linkOptions: {
        endpoints: [
            'https://api.protonnz.com',
            'https://proton.eosusa.io'
        ] // Mainnet endpoints. Replace with your own if needed 
    },
    transportOptions: {
        requestAccount: 'youracc', // Replace with your own account name
    },
    selectorOptions: {
        appName: 'My Escrow App' // Replace with your own app name
    }
})
```

### Create escrow

We will assume `user1` wants to escrow 1 XPR for an NFT `user2` owns with ID 1000000000330

```js
// Expire in 1 hour
const expiry = new Date()
expiry.setMinutes(expiry.getMinutes() + 60)

// Authorization
const authorization = [{
    actor: 'user1',
    permission: 'active'
}]

const actions = [
    {
        account: 'eosio.token',
        name: 'transfer',
        data: {
            from: 'user1',
            to: 'token.escrow',
            quantity: '1.0000 XPR',
            memo: ''
        },
        authorization
    }
    {
        account: 'token.escrow',
        name: 'startescrow',
        data: {
            from: 'user1',
            to: 'user2',
            fromTokens: [{
                contract: 'eosio.token',
                quantity: '1.0000 XPR'
            }],
            fromNfts: [],
            toTokens: [],
            toNfts: [1000000000330],
            expiry: Math.floor(expiry.getTime() / 1000)
        },
        authorization
    }
]

await session.transact({
    transaction: {
        actions
    }
})
```


### Fetch Escrows for User
```js
async function fetchEscrows(accountName) {
    const { rows } = await api.rpc.get_table_rows({
        code: 'token.escrow',
        scope: 'token.escrow',
        table: 'escrows',
        index_position: 2,
        key_type: 'i64',
        lower_bound: accountName,
        upper_bound: accountName,
        limit: -1
    })
    return rows
}

const escrows = await fetchEscrows('user1')
```

### Fill Escrow

Lets assume the ID of the escrow fetched is 1001

```js
// Authorization
const authorization = [{
    actor: 'user2',
    permission: 'active'
}]

const actions = [
    {
        account: 'atomicassets',
        name: 'transfer',
        data: {
            from: 'user2',
            to: 'token.escrow',
            asset_ids: [1000000000330],
            memo: ''
        },
        authorization
    }
    {
        account: 'token.escrow',
        name: 'fillescrow',
        data: {
            actor: 'user2',
            id: 1001
        },
        authorization
    }
]

await session.transact({
    transaction: {
        actions
    }
})
```

### Cancel Escrow

```js
// Authorization
const authorization = [{
    actor: 'user1',
    permission: 'active'
}]

const actions = [
    {
        account: 'token.escrow',
        name: 'cancelescrow',
        data: {
            actor: 'user1',
            id: 1001
        },
        authorization
    }
]

await session.transact({
    transaction: {
        actions
    }
})
```

### Fetch Escrow History

```js
const history = await api.getActionsFromHyperion("user1", {
    limit: 10,
    skip: 0,
    sort: "desc",
    filter: "token.escrow:*"
});
```
