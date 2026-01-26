# Reading data from XPR Network

You can explore the [code examples on github](https://github.com/XPRNetwork/developer-examples/tree/main/1_reading_from_xprnetwork_tables) 

This is where your journey begins, let’s go small but fun. In this topic we will just read data from the chain, this is the most basic of every Web3 dev routine.   
There is some important information you have to be aware of:

* **Fetching data:** You cannot make complex queries like good old database language, nor using a deep foreign key system. If you want to manage complex data structure, better to rely on a server side solution, but we will discuss this later.  
* …

## Let start with the setup

With your favorite package manager, initialize a new project. Then we will install dependencies 

```
npm install typescript @proton/js
```

Most interactions with XPR Network goes through the @proton/js package. Later when we discuss frontend integration, you will see that @proton/web-sdk uses @proton/js package as dependency to push transactions to the chain.

## Your gateway to XPR Network data: The JSONRpc

All data request from XPR Network are made with the JSONRpc, so let’s import and instanciate  it to our index.ts file 

```javascript
import {JSONRpc} from ‘@proton/js’;

const jsonRpc = new JSONRpc([‘https://testnet.rockerone.io’,...])

```

Here we create our jsonRpc instance, and provide XPR Network endpoints as an array of strings. Why an array ? Because the JSONRpc is smart enough to check if an endpoint is not available and switch to another one. 

Now let’s fetch some data with the get\_table\_rows method from the JSONRpc instance.

```javascript
import {JsonRpc} from "@proton/js";
const jsonRpc = new JsonRpc(["https://testnet.rockerone.io"]);

jsonRpc
  .get_table_rows({
    code: "eosio.token",
    table: "accounts",
    scope: "eosio.token",
  })
  .then((res: any) => {
    console.log(res);
  });
```

[See 1\_reading\_eosio\_token\_balance from github repo](https://github.com/XPRNetwork/developer-examples/blob/main/1_reading_from_xprnetwork_tables/1_reading_eosio_token_balance.ts)

Now lets run this code. \`node index.ts\` This snippet should print, it’s time to explain the code. 

By using **`code:eosio.token`**, we're instructing the **`eosio.token`** contract to retrieve data from the **`account`** table, using the **`eosio.token`** scope. 

What exactly is a scope? A scope is a key concept in XPR Network's table, it represents a distinct subset of data within a table. Scoping helps keep data organized and simplifies queries. While not all tables utilize multiple scopes, the default scope is always the name of the contract. 

## Response structure

```javascript
{
  rows: [
    {
      balance: "16.0012 XPR",
    }
  ],
  more: false,
  next_key: "",
}
```

Great but this is probably not your balance 🙂. In fact, this is the balance of the current contract, \`eosio.token\`. Let’s explain the returned data:

**`Rows`** contains an array of objects, the data fetched from the table. The structure of this object is defined by the table structure, so from a table to another the object structure is different. The **`more`** field is set to **`false`**, that means there is no more data to fetch, you reach the last available row for this table. If you receive **`more:true`** the **`next_key`** should contain a number value that can be used to fetch the next set of rows in the next request. Here, the **`more`** field value is **`false`**, so **`next_key`** is empty.

So to target your own account: 

```javascript
import {JsonRpc} from "@proton/js";

const jsonRpc = new JsonRpc(["https://testnet.rockerone.io"]);

jsonRpc
  .get_table_rows({
    code: "eosio.token",
    table: "accounts",
    scope: "youraccount", // Change to match your own account
  })
  .then((res: any) => {
    console.log(res);
  });
```

[See 2\_reading\_your\_xpr\_balance from github repo](https://github.com/XPRNetwork/developer-examples/blob/main/1_reading_from_xprnetwork_tables/2_reading_your_xpr_balance.ts)

This change should print 

```javascript
{
  rows: [
    {
      balance: "XXX.XXXX XPR",
    }
  ],
  more: false,
  next_key: "",
}
```

So far so good \! Let’s see another example with the **`atomicassets`** contract, the NFT protocol on XPR Network and get the list of available NFTs collections.

```javascript
import {JsonRpc} from "@proton/js";

const jsonRpc = new JsonRpc(["https://testnet.rockerone.io"]);

jsonRpc
  .get_table_rows({
    code: "atomicassets",
    table: "collections",
    scope: "atomicassets", // Default scope
  })
  .then((res: any) => {
    console.log(res);
  });
```

[See 3\_reading\_atomicassets\_collection from github repo](https://github.com/XPRNetwork/developer-examples/blob/main/1_reading_from_xprnetwork_tables/3_reading_atomicassets_collection.ts)

Run this snippet and you should see the following in your console, we got a way longer result:

```javascript
{
  rows: [
    {
      collection_name: "121352553432",
      author: "prem",
      allow_notify: 1,
      authorized_accounts: [ "prem" ],
      notify_accounts: [],
      market_fee: "0.00000000000000000",
      serialized_data:[...],
    }, {
      collection_name: "121555214134",
      author: "prem",
      allow_notify: 1,
      authorized_accounts: [ "prem" ],
      notify_accounts: [],
      market_fee: "0.00000000000000000",
      serialized_data:[...],
    }, {
      collection_name: "122111113415",
      author: "joesobo",
      allow_notify: 1,
      authorized_accounts: [ "joesobo" ],
      notify_accounts: [],
      market_fee: "0.01000000000000000",
      serialized_data:[...],
    },     ... // 10 rows received
  ],
  more: true,
  next_key: "651371098584204880",
}
```

### Query limit

Now we received 10 rows, and the **`more`** field value is **`true`** because we have more than 10 rows in this **`collections`** table. Why do we receive only 10 rows ? Because this is the default **`limit`** on the JSONRpc. Let’s crank it up a bit up to 100 rows by adding a field **`limit:100`**.  As you can see the structure inside the **`rows`** array has changed, according to the **`collections`** table from the **`atomicassets`** contract. 

For performance reasons, the maximum rows set size you can query is 1000 rows per request.

```javascript
import {JsonRpc} from "@proton/js";

const jsonRpc = new JsonRpc(["https://testnet.rockerone.io"]);

jsonRpc
  .get_table_rows({
    code: "atomicassets",
    table: "collections",
    scope: "atomicassets", // Default scope
    limit: 100
  })
  .then((res: any) => {
    console.log(res);
  });
```

[See 4\_reading\_100\_rows\_atomicassets\_collection from github repo](https://github.com/XPRNetwork/developer-examples/blob/main/1_reading_from_xprnetwork_tables/4_reading_100_rows_atomicassets_collection.ts)

And here are our 100 rows, it starts to look good. 

```javascript
{
  rows: [
    {
      collection_name: "121352553432",
      author: "prem",
      allow_notify: 1,
      authorized_accounts: [ "prem" ],
      notify_accounts: [],
      market_fee: "0.00000000000000000",
      serialized_data:[...],
    }, {
      collection_name: "121555214134",
      author: "prem",
      allow_notify: 1,
      authorized_accounts: [ "prem" ],
      notify_accounts: [],
      market_fee: "0.00000000000000000",
      serialized_data:[...],
    }, {
      collection_name: "122111113415",
      author: "joesobo",
      allow_notify: 1,
      authorized_accounts: [ "joesobo" ],
      notify_accounts: [],
      market_fee: "0.01000000000000000",
      serialized_data:[...],
    },     ... // 100 rows received
  ],
  more: true,
  next_key: "7035932571481548816",
}
```

Take a look at the **`next_key`** we receive from the previous example… Yes it’s different, it’s because in the previous example, we received the primary key (the “id” of the row, a unique identifier)  that next to the last rows received in the array, means the primary key of the 11th row. And in this snippet return, we receive the primary key of the 101th. What can we do with this ? Let’s see… please be focused 🙂

## Crawling down the rows

Most of the time, primary keys are numbers (u64 in fact but let’s call it number for now), even if it’s a Name (like an account name), it’s a u64 in reality (see the ”A quick note on data type”). To get a more specific set of results, as we previously saw,  we can use scope, but we also have **`bounds`**: **`lower_bound`** and **`upper_bound`** to be precise. Bounds are a way to target a set of from a starting primary key (**`lower_bound`**) to an ending primary key (**`upper_bound`**) let’s see from pseudo code perspective

```javascript
// Rows asbtracted here as an array of numbers
[
  ...,  19,
  20, // Our lower_bound
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,// Our upper_bound
  31,
  ...
]
```

By defining **`lower_bound`** and **`upper_bound`** in our table, we are requesting the following set of rows: \[20,21,22,23,24,25,26,27,28,29,30\]. You get it ? Cool, let's move on…   

That allows us to use our \`next\_key\` value received from the previous request as **`lower_bound`**. So it should get the 101th row in our table, check out on the  how it’s implemented in the next example :

```javascript
import {JsonRpc} from "@proton/js";

const jsonRpc = new JsonRpc(["https://testnet.rockerone.io"]);
let allRows:any[] = []
jsonRpc
  .get_table_rows({
    code: "atomicassets",
    table: "collections",
    scope: "atomicassets", // Default scope
    limit: 3,
  })
  .then((firstRes: any) => {
    allRows = allRows.concat(firstRes.rows)
    jsonRpc
      .get_table_rows({
        code: "atomicassets",
        table: "collections",
        scope: "atomicassets", // Default scope
        limit: 3,
        lower_bound: firstRes.next_key,
      })
      .then((secondRes: any) => {
        allRows = allRows.concat(secondRes.rows)
        console.log(
          allRows
        );
      });
  });
```

[See 5\_reading\_next\_100\_rows\_atomicassets\_collection from github repo](https://github.com/XPRNetwork/developer-examples/blob/main/1_reading_from_xprnetwork_tables/5_reading_next_100_rows_atomicassets_collection.ts)

For the sake of simplicity we just avoided to use recursive function to crawl through all table rows, and lower the limit to three rows per request, in order to have a shorter results and keep you from scrolling over 200 results.

You can see that the 2 successive requests have 6 results. That is what we want, the first 3 followed by the 3 next rows on the second call.  

```javascript
[
  {
    collection_name: "121352553432",
    author: "prem",
    allow_notify: 1,
    authorized_accounts: [ "prem" ],
    notify_accounts: [],
    market_fee: "0.00000000000000000",
    serialized_data: [...],
  }, {
    collection_name: "121555214134",
    author: "prem",
    allow_notify: 1,
    authorized_accounts: [ "prem" ],
    notify_accounts: [],
    market_fee: "0.00000000000000000",
    serialized_data: [...],
  }, {
    collection_name: "122111113415",
    author: "joesobo",
    allow_notify: 1,
    authorized_accounts: [ "joesobo" ],
    notify_accounts: [],
    market_fee: "0.01000000000000000",
    serialized_data: [...],
  }, {
    collection_name: "123142141243",
    author: "devtest2",
    allow_notify: 1,
    authorized_accounts: [ "devtest2" ],
    notify_accounts: [],
    market_fee: "0.03000000000000000",
    serialized_data: [...],
  }, {
    collection_name: "124232412131",
    author: "nfctest",
    allow_notify: 1,
    authorized_accounts: [ "nfctest" ],
    notify_accounts: [],
    market_fee: "0.05000000000000000",
    serialized_data: [...],
  }, {
    collection_name: "12daysb4xmas",
    author: "12daysb4xmas",
    allow_notify: 1,
    authorized_accounts: [ "12daysb4xmas" ],
    notify_accounts: [ "12daysb4xmas" ],
    market_fee: "0.00000000000000000",
    serialized_data: [],
  }
]

```

Great, now we know how to crawl our table rows by jumping from a batch to the next using **`next_key`** in conjunction with the **`lower_bound`** params in the JSONRpc. But what about this **`upper_bound`** field ? That’s what we will discover next. 

## Search through the primary key 

Well some time you need to search for a primary key, no matter the use case. And of course it’s hard to guess how many rows your request will return. And that what bounds is all about: searching through primary keys\! How does it works? Here is a simple, yet comprehensive breakthrough:   
As we saw before, Name are string that could be expressed as number, and primary keys are numbers. Lower\_bound and upper\_bound can define a range where we “capture” a set of rows by their primary key within this lower and upper range, so we can easily search a set of rows by “capturing” them within **`lower_bound`** and **`upper_bound`**, like the next example.

Let’s say, i want to get the all stakers of XPR tokens with a account name that start with **`test`**: 

```javascript
import {JsonRpc} from "@proton/js";

const jsonRpc = new JsonRpc(["https://testnet.rockerone.io"]);

jsonRpc
  .get_table_rows({
    code: "eosio",
    table: "votersxpr",
    scope: "eosio",
    lower_bound:'test', //from test
    upper_bound:'testzzzzzzzz', //to test(an everything after)
  })
  .then((res: any) => {
    console.log(res);
  });
```

[See 6\_searching\_for\_rows from github repo](https://github.com/XPRNetwork/developer-examples/blob/main/1_reading_from_xprnetwork_tables/6_searching_for_rows.ts)

And here are our guys and girls

```
{
  rows: [
    {
      owner: "testacc51",
      staked: 21197,
      isqualified: 1,
      claimamount: 3278,
      lastclaim: 1674029941,
      startstake: null,
      startqualif: null,
    }, {
      owner: "testacc54",
      staked: 30000,
      isqualified: 1,
      claimamount: 6251,
      lastclaim: 0,
      startstake: null,
      startqualif: null,
    }, {
      owner: "testalvosec",
      staked: "25347496572",
      isqualified: 1,
      claimamount: 2689517818,
      lastclaim: 1698579428,
      startstake: null,
      startqualif: null,
    }, {
      owner: "testerter",
      staked: 5350000,
      isqualified: 1,
      claimamount: 63863,
      lastclaim: 0,
      startstake: null,
      startqualif: null,
    }, {
      owner: "testicles",
      staked: 1010000,
      isqualified: 1,
      claimamount: 340276,
      lastclaim: 1630525389,
      startstake: null,
      startqualif: null,
    }, {
      owner: "testnetacc",
      staked: 3492569744,
      isqualified: 1,
      claimamount: 1089172260,
      lastclaim: 1641745650,
      startstake: null,
      startqualif: null,
    }, {
      owner: "testnetsec",
      staked: 510000000,
      isqualified: 1,
      claimamount: 159284833,
      lastclaim: 0,
      startstake: null,
      startqualif: null,
    }, {
      owner: "testuser111",
      staked: 23270000,
      isqualified: 1,
      claimamount: 8020924,
      lastclaim: 0,
      startstake: null,
      startqualif: null,
    }, {
      owner: "testuser123",
      staked: 1900000,
      isqualified: 1,
      claimamount: 631164,
      lastclaim: 1631242242,
      startstake: null,
      startqualif: null,
    }
  ],
  more: false,
  next_key: "",
}

```

You can see here from the result that the **`more`** field’s value is false, so there are no more rows to fetch, that means we retrieve all possible results for stakers accounts that match our **`lower_bound`** and **`upper_bound`** range. 

## Advanced search with secondary keys

Despite the advanced term in the title of this section, searching by secondary keys is not that hard, but it sometimes requires a little bit of retro engineering of the contract if you don’t have the documentation for the contract dev. Because **there is no information on secondary keys within the contract of the associated ABI file (the definition file that allows our contract to be accessible from outside for short).**

You can visualize the atomicassets offers table [here](https://explorer.xprnetwork.org/account/atomicassets?loadContract=true&tab=Tables&account=atomicassets&scope=atomicassets&limit=100&table=offers), as you can see the **`sender`** column is a name, we can expect to be a secondary key.

For the next snippet we will use new fields to define the “targeted” key:

```javascript
import {JsonRpc} from "@proton/js";

const jsonRpc = new JsonRpc(["https://testnet.rockerone.io"]);

jsonRpc
  .get_table_rows({
    code: "atomicassets",
    table: "offers",
    scope: "atomicassets", 
    index_position: 2,		// secondary key, default is 1 for primary
    key_type:'name',		// Expected key type 
    lower_bound:'solid',		// the lower_bound for the secondary
    upper_bound:'solidzzzzzzz',	// the upper_bound for the secondary
    
  })
  .then((res: any) => {
    console.log(res);
  });
```

[See 7\_advanced\_search\_with\_secondary\_keys from github repo](https://github.com/XPRNetwork/developer-examples/blob/main/1_reading_from_xprnetwork_tables/7_advanced_search_with_secondary_keys.ts)

A little explanation on the request of the atomicassets offers table we just wrote: Basically it’s the same as the previous example, except the **`index_position`** and the **`key_type.`**

**`Index_position:`** this is the way you target the key, by default the value is one for primary, here the value is 2 for secondary. As you can guess, 3 target the ternary and so on … This fields works in addition with the **`lower_bound`** and **`upper_bound`**, it defines on which key the bound range should be applied.  
* **`Key_type:`** It’s the type expected for the secondary (in this example), here we are looking for a name (but it could be i64, i128, i256, float64, float128). This is the value type expected by **`lower_bound`** and **`upper_bound.`** 

In short, we are requesting on the table offers from **`atomicassets`** contract, searching for the **`sender`** key where the send name start with solid and everything after.

There is the output:

```javascript
{
  rows: [
    {
      offer_id: 4699,
      sender: "solid",
      recipient: "atomicmarket",
      sender_asset_ids: [ "4398046531998" ],
      recipient_asset_ids: [],
      memo: "sale",
      ram_payer: "res.pink",
    }, {
      offer_id: 4700,
      sender: "solid",
      recipient: "atomicmarket",
      sender_asset_ids: [ "4398046532005" ],
      recipient_asset_ids: [],
      memo: "sale",
      ram_payer: "res.pink",
    }, {
      offer_id: 4390,
      sender: "solidcircle2",
      recipient: "atomicmarket",
      sender_asset_ids: [ "4398046562892" ],
      recipient_asset_ids: [],
      memo: "sale",
      ram_payer: "res.pink",
    }
  ],
  more: false,
  next_key: "",
}

```

Yeah\! So we received all senders that have a name starting with solid, no more result remains \!

<a class="learn-topics footer" href="/signing-and-pushing-transactions/signing-and-pushing-transactions.html">
    <div class="inner">
    <h2 class="head">Session complete</h2>
    <div class="title">
    <p>Next: Signing and pushing transactions</p>
      <div class="block-link">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
    </div>
    </div>
  </a>

