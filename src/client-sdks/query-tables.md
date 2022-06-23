---
description: Query Tables
---

## Install

```
npm i @proton/api
```

## Instantiation

```ts
import { ApiClass } from '@proton/api'

const protonApi = new ApiClass('proton')
```

## Get Table Rows

In the example shown below, the xtokens smart contract's table accounts is queried with the scope testacc. The data is returned as json, in-order, and limited to 10 rows. The RAM payer for the returned row is also not shown.

```ts
await protonApi.rpc.get_table_rows({
  json: true,
  code: 'xtokens',
  scope: 'testacc',
  table: 'accounts',
  limit: 10,
  reverse: false,
  show_payer: false
})
```

An example of an expected response is shown below.

```ts
{
  rows: [ { balance: '200.000000 XUSDC' }, { balance: '50.00000000 XBTC' } ],
  more: false
}
```

The following is a list of acceptable arguments:

| Argument          | Type      | Required | Description                                        |
| ----------------- | ------    | -------- | -------------------------------------------------- |
| json              | boolean   | false    | Get the response as json                           |
| code              | string    | true     | Contract that we target                            |
| scope             | string    | true     | Account that owns the data                         |
| table             | string    | true     | Table name                                         |
| lower_bound       | any       | false    | Lower limit for key value                          |
| upper_bound       | any       | false    | Upper limit for key value                          |
| index_position    | number    | false    | Table index (1: primary, 2: secondary)             |
| key_type          | any       | false    | Table key type                             |
| limit             | number    | false    | Maximum number of rows that we want to get         |
| reverse           | boolean   | false    | Get reversed data                                  |
| show_payer        | boolean   | false    | Show ram payer                                     |


### Query By Index

A lower_bound parameter can also be passed to the get_table_rows method. This parameter allows you to query for a particular value of the primary key in the table. Using this in conjunction with limit: 1 allows you to query for 1 row of a table.

In the example shown below, the contract smart contract's table profiles is queried with the scope contract for the row with primary key testacc. The limit is 1 which implies that only 1 row with value testacc will be returned.

```ts
await protonApi.rpc.get_table_rows({
  json: true,
  code: 'contract',
  scope: 'contract',
  table: 'profiles',
  lower_bound: 'testacc',
  limit: 1,
  reverse: false,
  show_payer: false,
})
```

An example of an expected response is shown below.

```ts
{
  "rows": [{
      "user": "testacc",
      "age": 21,
      "surname": "Martin"
    }
  ],
  "more": false
}
```

### Query By Secondary Index

The lower_bound parameter can be used in conjunction with the index_position parameter to query an index different from the primary key.

In the example shown below, the contract smart contract's table profiles is queried with the scope contract for the rows with secondary index age equal to 21. The limit is 1 which implies that only 1 row with the age 21 will be returned.

```ts
await protonApi.rpc.get_table_rows({
  json: true,
  code: 'contract',
  scope: 'contract',
  table: 'profiles',
  index_position: 2,
  lower_bound: 21,
  limit: 1,
  reverse: false,
  show_payer: false,
})
```
