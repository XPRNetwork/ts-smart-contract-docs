---
description: Query user tokens
---

# User Tokens

## Install

```
npm i @proton/api
```

## Instantiation

```ts
import { ApiClass } from '@proton/api'

const protonApi = new ApiClass('proton')
```

## Fetch All Token Balances For User

```ts
await protonApi.getAccountTokens(accountName)
```

An example of an expected response is shown below.

```ts
[
	{
		currency: 'XPR',
		amount: 50,
		contract: 'eosio.token',
		decimals: '4'
	},
	{
		currency: 'XUSDC',
		amount: 19.99,
		contract: 'xtokens',
		decimals: '6'
	},
	{
		currency: 'FOOBAR',
		amount: 300,
		contract: 'xtokens',
		decimals: '6'
	}
]
```

### Fetch Single Token Balance for User

A token balance can be retrieved using the getTokenBalance method.
This method takes an account which is a smart contract storing the tokens, an account who has a balance in the token table of the specified smart contract, and the symbol of the token to retrieve the currency balance for.

```ts
await protonApi.getTokenBalance('eosio.token', 'testacc', 'XPR')
```

An example of an expected response is shown below.

```ts
[ '68.3081 XPR' ]
```
