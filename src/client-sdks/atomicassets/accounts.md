Accounts
========

## Get accounts which own NFTs

### SDK Method

atomicassetsV1AccountsGet

### Description
Get accounts which own specific NFTs

### Parameters

match_owner (optional) — Search for partial account name

collection_name (optional) — Filter by collection name

schema_name (optional) — Filter by schema name

template_id (optional) — Filter by template id

burned (optional) — Filter for burned assets

hide_offers (optional) — Hide assets which are used in an offer

collection_blacklist (optional) — Hide collections from result. Split multiple with &quot;,&quot;

collection_whitelist (optional) — Show only results from specific collections. Split multiple with &quot;,&quot;

ids (optional) — seperate multiple ids with &quot;,&quot;

lower_bound (optional) — lower bound of primary key (value included)

upper_bound (optional) — upper bound of primary key (value excluded)

page (optional) — Result Page default: 1

limit (optional) — Results per Page default: 100

order (optional) — Order direction default: desc


### Example return data

```json
    {
      "data" : [ {
        "assets" : "assets",
        "account" : "account"
      }, {
        "assets" : "assets",
        "account" : "account"
      } ],
      "success" : true,
      "query_time" : 0
    }
```


### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

## Get account stats

### SDK Method

atomicassetsV1AccountsAccountGet

### Description
Get a specific account stats

### Parameters

account (required) — Account name

hide_offers (optional) — Hide assets which are used in an offer

collection_blacklist (optional) — Hide collections from result. Split multiple with &quot;,&quot;

collection_whitelist (optional) — Show only results from specific collections. Split multiple with &quot;,&quot;

### Example return data
```json
    {
      "data" : [ {
        "assets" : "assets",
        "collections" : [ {
          "assets" : "assets",
          "collection" : {
            "created_at_block" : "created_at_block",
            "data" : { },
            "author" : "author",
            "created_at_time" : "created_at_time",
            "contract" : "contract",
            "name" : "name",
            "allow_notify" : true,
            "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
            "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
            "collection_name" : "collection_name",
            "market_fee" : 0.8008281904610115
          }
        }, {
          "assets" : "assets",
          "collection" : {
            "created_at_block" : "created_at_block",
            "data" : { },
            "author" : "author",
            "created_at_time" : "created_at_time",
            "contract" : "contract",
            "name" : "name",
            "allow_notify" : true,
            "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
            "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
            "collection_name" : "collection_name",
            "market_fee" : 0.8008281904610115
          }
        } ],
        "templates" : [ {
          "assets" : "assets",
          "template_id" : "template_id"
        }, {
          "assets" : "assets",
          "template_id" : "template_id"
        } ]
      }, {
        "assets" : "assets",
        "collections" : [ {
          "assets" : "assets",
          "collection" : {
            "created_at_block" : "created_at_block",
            "data" : { },
            "author" : "author",
            "created_at_time" : "created_at_time",
            "contract" : "contract",
            "name" : "name",
            "allow_notify" : true,
            "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
            "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
            "collection_name" : "collection_name",
            "market_fee" : 0.8008281904610115
          }
        }, {
          "assets" : "assets",
          "collection" : {
            "created_at_block" : "created_at_block",
            "data" : { },
            "author" : "author",
            "created_at_time" : "created_at_time",
            "contract" : "contract",
            "name" : "name",
            "allow_notify" : true,
            "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
            "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
            "collection_name" : "collection_name",
            "market_fee" : 0.8008281904610115
          }
        } ],
        "templates" : [ {
          "assets" : "assets",
          "template_id" : "template_id"
        }, {
          "assets" : "assets",
          "template_id" : "template_id"
        } ]
      } ],
      "success" : true,
      "query_time" : 0
    }
```

### Responses

#### 200

OK

#### 500

Internal Server Error

* * *


## Get account stats for collection

### SDK Method

atomicassetsV1AccountsAccountCollectionNameGet

### Description
Retrieves the template and schema count for the given account and collection name 

### Parameters

account (required) — Account name

collection_name (required) — Collection Name

### Example return data

```json
    {
      "data" : [ {
        "templates" : [ {
          "assets" : "assets",
          "template_id" : "template_id"
        }, {
          "assets" : "assets",
          "template_id" : "template_id"
        } ],
        "schemas" : [ {
          "assets" : "assets",
          "schema_name" : "schema_name"
        }, {
          "assets" : "assets",
          "schema_name" : "schema_name"
        } ]
      }, {
        "templates" : [ {
          "assets" : "assets",
          "template_id" : "template_id"
        }, {
          "assets" : "assets",
          "template_id" : "template_id"
        } ],
        "schemas" : [ {
          "assets" : "assets",
          "schema_name" : "schema_name"
        }, {
          "assets" : "assets",
          "schema_name" : "schema_name"
        } ]
      } ],
      "success" : true,
      "query_time" : 0
    }
```


### Responses

#### 200

OK

#### 500

Internal Server Error

* * *
