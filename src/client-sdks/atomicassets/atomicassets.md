NFT API
==================


### Table of Contents

#### [Accounts](#Accounts)

* [`get /atomicassets/v1/accounts/{account}/{collection_name}`](#atomicassetsV1AccountsAccountCollectionNameGet)
* [`get /atomicassets/v1/accounts/{account}`](#atomicassetsV1AccountsAccountGet)
* [`get /atomicassets/v1/accounts`](#atomicassetsV1AccountsGet)

#### [Assets](#Assets)

* [`get /atomicassets/v1/assets/{asset_id}`](#atomicassetsV1AssetsAssetIdGet)
* [`get /atomicassets/v1/assets/{asset_id}/logs`](#atomicassetsV1AssetsAssetIdLogsGet)
* [`get /atomicassets/v1/assets/{asset_id}/stats`](#atomicassetsV1AssetsAssetIdStatsGet)
* [`get /atomicassets/v1/assets`](#atomicassetsV1AssetsGet)

#### [Burns](#Burns)

* [`get /atomicassets/v1/burns/{account}`](#atomicassetsV1BurnsAccountGet)
* [`get /atomicassets/v1/burns`](#atomicassetsV1BurnsGet)

#### [Collections](#Collections)

* [`get /atomicassets/v1/collections/{collection_name}`](#atomicassetsV1CollectionsCollectionNameGet)
* [`get /atomicassets/v1/collections/{collection_name}/logs`](#atomicassetsV1CollectionsCollectionNameLogsGet)
* [`get /atomicassets/v1/collections/{collection_name}/stats`](#atomicassetsV1CollectionsCollectionNameStatsGet)
* [`get /atomicassets/v1/collections`](#atomicassetsV1CollectionsGet)

#### [Config](#Config)

* [`get /atomicassets/v1/config`](#atomicassetsV1ConfigGet)

#### [Offers](#Offers)

* [`get /atomicassets/v1/offers`](#atomicassetsV1OffersGet)
* [`get /atomicassets/v1/offers/{offer_id}`](#atomicassetsV1OffersOfferIdGet)
* [`get /atomicassets/v1/offers/{offer_id}/logs`](#atomicassetsV1OffersOfferIdLogsGet)

#### [Schemas](#Schemas)

* [`get /atomicassets/v1/schemas/{collection_name}/{schema_name}`](#atomicassetsV1SchemasCollectionNameSchemaNameGet)
* [`get /atomicassets/v1/schemas/{collection_name}/{schema_name}/logs`](#atomicassetsV1SchemasCollectionNameSchemaNameLogsGet)
* [`get /atomicassets/v1/schemas/{collection_name}/{schema_name}/stats`](#atomicassetsV1SchemasCollectionNameSchemaNameStatsGet)
* [`get /atomicassets/v1/schemas`](#atomicassetsV1SchemasGet)

#### [Templates](#Templates)

* [`get /atomicassets/v1/templates/{collection_name}/{template_id}`](#atomicassetsV1TemplatesCollectionNameTemplateIdGet)
* [`get /atomicassets/v1/templates/{collection_name}/{template_id}/logs`](#atomicassetsV1TemplatesCollectionNameTemplateIdLogsGet)
* [`get /atomicassets/v1/templates/{collection_name}/{template_id}/stats`](#atomicassetsV1TemplatesCollectionNameTemplateIdStatsGet)
* [`get /atomicassets/v1/templates`](#atomicassetsV1TemplatesGet)

#### [Transfers](#Transfers)

* [`get /atomicassets/v1/transfers`](#atomicassetsV1TransfersGet)

Accounts
========

# get /atomicassets/v1/accounts/{account}/{collection_name}

Retrieves the template and schema count for the given account and collection name (atomicassetsV1AccountsAccountCollectionNameGet)

### Path parameters

account (required)

Path Parameter — Account name

collection_name (required)

Path Parameter — Collection Name


### Example return data

Content-Type: application/json

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



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

# get /atomicassets/v1/accounts/{account}

Get a specific account stats (atomicassetsV1AccountsAccountGet)

### Path parameters

account (required)

Path Parameter — Account name

### Query parameters

hide_offers (optional)

Query Parameter — Hide assets which are used in an offer

collection_blacklist (optional)

Query Parameter — Hide collections from result. Split multiple with &quot;,&quot;

collection_whitelist (optional)

Query Parameter — Show only results from specific collections. Split multiple with &quot;,&quot;


### Example return data

Content-Type: application/json

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



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

## Get accounts which own atomicassets NFTs - atomicassetsV1AccountsGet

> GET /atomicassets/v1/accounts

### Query parameters

match_owner (optional)

Query Parameter — Search for partial account name

collection_name (optional)

Query Parameter — Filter by collection name

schema_name (optional)

Query Parameter — Filter by schema name

template_id (optional)

Query Parameter — Filter by template id

burned (optional)

Query Parameter — Filter for burned assets

hide_offers (optional)

Query Parameter — Hide assets which are used in an offer

collection_blacklist (optional)

Query Parameter — Hide collections from result. Split multiple with &quot;,&quot;

collection_whitelist (optional)

Query Parameter — Show only results from specific collections. Split multiple with &quot;,&quot;

ids (optional)

Query Parameter — seperate multiple ids with &quot;,&quot;

lower_bound (optional)

Query Parameter — lower bound of primary key (value included)

upper_bound (optional)

Query Parameter — upper bound of primary key (value excluded)

page (optional)

Query Parameter — Result Page default: 1

limit (optional)

Query Parameter — Results per Page default: 100

order (optional)

Query Parameter — Order direction default: desc


### Example return data

Content-Type: application/json

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



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

Assets
======

## Fetch asset by id - atomicassetsV1AssetsAssetIdGet

> GET /atomicassets/v1/assets/{asset_id}

### Path parameters

asset_id (required)

Path Parameter — ID of asset


### Example return data

Content-Type: application/json

    {
      "data" : {
        "owner" : "owner",
        "schema" : {
          "created_at_block" : "created_at_block",
          "created_at_time" : "created_at_time",
          "format" : [ {
            "name" : "name",
            "type" : "type"
          }, {
            "name" : "name",
            "type" : "type"
          } ],
          "schema_name" : "schema_name"
        },
        "template" : {
          "immutable_data" : { },
          "created_at_block" : "created_at_block",
          "created_at_time" : "created_at_time",
          "max_supply" : "max_supply",
          "template_id" : "template_id",
          "is_transferable" : true,
          "issued_supply" : "issued_supply",
          "is_burnable" : true
        },
        "burned_at_block" : "burned_at_block",
        "data" : { },
        "burned_at_time" : "burned_at_time",
        "template_mint" : "template_mint",
        "updated_at_time" : "updated_at_time",
        "contract" : "contract",
        "minted_at_block" : "minted_at_block",
        "asset_id" : "asset_id",
        "collection" : {
          "created_at_block" : "created_at_block",
          "author" : "author",
          "created_at_time" : "created_at_time",
          "name" : "name",
          "allow_notify" : true,
          "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
          "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
          "collection_name" : "collection_name",
          "market_fee" : 0.8008281904610115
        },
        "transferred_at_time" : "transferred_at_time",
        "immutable_data" : { },
        "backed_tokens" : [ {
          "amount" : "amount",
          "token_precision" : 6,
          "token_contract" : "token_contract",
          "token_symbol" : "token_symbol"
        }, {
          "amount" : "amount",
          "token_precision" : 6,
          "token_contract" : "token_contract",
          "token_symbol" : "token_symbol"
        } ],
        "transferred_at_block" : "transferred_at_block",
        "mutable_data" : { },
        "burned_by_account" : "burned_by_account",
        "name" : "name",
        "is_transferable" : true,
        "updated_at_block" : "updated_at_block",
        "minted_at_time" : "minted_at_time",
        "is_burnable" : true
      },
      "success" : true,
      "query_time" : 0
    }



### Responses

#### 200

OK

#### 416

Element not found

#### 500

Internal Server Error

* * *

# get /atomicassets/v1/assets/{asset_id}/logs

Fetch asset logs (atomicassetsV1AssetsAssetIdLogsGet)

### Path parameters

asset_id (required)

Path Parameter — ID of asset

### Query parameters

page (optional)

Query Parameter — Result Page default: 1

limit (optional)

Query Parameter — Results per Page default: 100

order (optional)

Query Parameter — Order direction default: desc

action_whitelist (optional)

Query Parameter — Action whitelist

action_blacklist (optional)

Query Parameter — Action blacklist


### Example return data

Content-Type: application/json

    {
      "data" : [ {
        "log_id" : "log_id",
        "created_at_block" : "created_at_block",
        "data" : { },
        "created_at_time" : "created_at_time",
        "name" : "name",
        "txid" : "txid"
      }, {
        "log_id" : "log_id",
        "created_at_block" : "created_at_block",
        "data" : { },
        "created_at_time" : "created_at_time",
        "name" : "name",
        "txid" : "txid"
      } ],
      "success" : true,
      "query_time" : 0
    }



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

# get /atomicassets/v1/assets/{asset_id}/stats

Fetch asset stats (atomicassetsV1AssetsAssetIdStatsGet)

### Path parameters

asset_id (required)

Path Parameter — ID of asset


### Example return data

Content-Type: application/json

    {
      "data" : {
        "template_mint" : 0
      },
      "success" : true,
      "query_time" : 6
    }



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

# get /atomicassets/v1/assets

Fetch assets. (atomicassetsV1AssetsGet)

You can filter the result by specific asset / template data fields.You can add for example &template\_data.rarity=common to only receive results which have an attribute "rarity" with the value "common". You can query specific asset data by using &immutable\_data.rarity=common or &mutable_data.rarity=common .If you want to query a non text type you need to specify it explicitly (defaults to text type) like data:bool.foil=true or data:number.id=4 or data:text.rarity=common. Integers which are defined greater than 32 bit (eg 64 bit) in the schema need to be queried as text.

### Query parameters

collection_name (optional)

Query Parameter — Filter by collection name

schema_name (optional)

Query Parameter — Filter by schema name

template_id (optional)

Query Parameter — Filter by template id

burned (optional)

Query Parameter — Filter for burned assets

owner (optional)

Query Parameter — Filter by owner

match (optional)

Query Parameter — Search for input in asset name on template data

search (optional)

Query Parameter — Fuzzy search for input in asset name on template data

match\_immutable\_name (optional)

Query Parameter — Search for input in asset name on asset immutable data

match\_mutable\_name (optional)

Query Parameter — Search for input in asset name on asset mutable data

is_transferable (optional)

Query Parameter — Check if asset is transferable

is_burnable (optional)

Query Parameter — Check if asset is burnable

collection_blacklist (optional)

Query Parameter — Hide collections from result. Split multiple with &quot;,&quot;

collection_whitelist (optional)

Query Parameter — Show only results from specific collections. Split multiple with &quot;,&quot;

only\_duplicate\_templates (optional)

Query Parameter — Show only duplicate assets grouped by template

has\_backed\_tokens (optional)

Query Parameter — Show only assets that are backed by a token

authorized_account (optional)

Query Parameter — Filter for assets the provided account can edit.

template_whitelist (optional)

Query Parameter — Filter for multiple template ids split by &quot;,&quot;

template_blacklist (optional)

Query Parameter — Dont include specific template ids split by &quot;,&quot;

hide\_templates\_by_accounts (optional)

Query Parameter — Dont templates that are owned by an account

hide_offers (optional)

Query Parameter — Hide assets which are used in an offer

collection_blacklist (optional)

Query Parameter — Hide collections from result. Split multiple with &quot;,&quot;

collection_whitelist (optional)

Query Parameter — Show only results from specific collections. Split multiple with &quot;,&quot;

ids (optional)

Query Parameter — seperate multiple ids with &quot;,&quot;

lower_bound (optional)

Query Parameter — lower bound of primary key (value included)

upper_bound (optional)

Query Parameter — upper bound of primary key (value excluded)

before (optional)

Query Parameter — Only show results before this timestamp in milliseconds (value excluded)

after (optional)

Query Parameter — Only show results after this timestamp in milliseconds (value excluded)

page (optional)

Query Parameter — Result Page default: 1

limit (optional)

Query Parameter — Results per Page default: 100

order (optional)

Query Parameter — Order direction default: desc

sort (optional)

Query Parameter — Column to sort default: asset_id


### Example return data

Content-Type: application/json

    {
      "data" : [ {
        "owner" : "owner",
        "schema" : {
          "created_at_block" : "created_at_block",
          "created_at_time" : "created_at_time",
          "format" : [ {
            "name" : "name",
            "type" : "type"
          }, {
            "name" : "name",
            "type" : "type"
          } ],
          "schema_name" : "schema_name"
        },
        "template" : {
          "immutable_data" : { },
          "created_at_block" : "created_at_block",
          "created_at_time" : "created_at_time",
          "max_supply" : "max_supply",
          "template_id" : "template_id",
          "is_transferable" : true,
          "issued_supply" : "issued_supply",
          "is_burnable" : true
        },
        "burned_at_block" : "burned_at_block",
        "data" : { },
        "burned_at_time" : "burned_at_time",
        "template_mint" : "template_mint",
        "updated_at_time" : "updated_at_time",
        "contract" : "contract",
        "minted_at_block" : "minted_at_block",
        "asset_id" : "asset_id",
        "collection" : {
          "created_at_block" : "created_at_block",
          "author" : "author",
          "created_at_time" : "created_at_time",
          "name" : "name",
          "allow_notify" : true,
          "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
          "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
          "collection_name" : "collection_name",
          "market_fee" : 0.8008281904610115
        },
        "transferred_at_time" : "transferred_at_time",
        "immutable_data" : { },
        "backed_tokens" : [ {
          "amount" : "amount",
          "token_precision" : 6,
          "token_contract" : "token_contract",
          "token_symbol" : "token_symbol"
        }, {
          "amount" : "amount",
          "token_precision" : 6,
          "token_contract" : "token_contract",
          "token_symbol" : "token_symbol"
        } ],
        "transferred_at_block" : "transferred_at_block",
        "mutable_data" : { },
        "burned_by_account" : "burned_by_account",
        "name" : "name",
        "is_transferable" : true,
        "updated_at_block" : "updated_at_block",
        "minted_at_time" : "minted_at_time",
        "is_burnable" : true
      }, {
        "owner" : "owner",
        "schema" : {
          "created_at_block" : "created_at_block",
          "created_at_time" : "created_at_time",
          "format" : [ {
            "name" : "name",
            "type" : "type"
          }, {
            "name" : "name",
            "type" : "type"
          } ],
          "schema_name" : "schema_name"
        },
        "template" : {
          "immutable_data" : { },
          "created_at_block" : "created_at_block",
          "created_at_time" : "created_at_time",
          "max_supply" : "max_supply",
          "template_id" : "template_id",
          "is_transferable" : true,
          "issued_supply" : "issued_supply",
          "is_burnable" : true
        },
        "burned_at_block" : "burned_at_block",
        "data" : { },
        "burned_at_time" : "burned_at_time",
        "template_mint" : "template_mint",
        "updated_at_time" : "updated_at_time",
        "contract" : "contract",
        "minted_at_block" : "minted_at_block",
        "asset_id" : "asset_id",
        "collection" : {
          "created_at_block" : "created_at_block",
          "author" : "author",
          "created_at_time" : "created_at_time",
          "name" : "name",
          "allow_notify" : true,
          "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
          "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
          "collection_name" : "collection_name",
          "market_fee" : 0.8008281904610115
        },
        "transferred_at_time" : "transferred_at_time",
        "immutable_data" : { },
        "backed_tokens" : [ {
          "amount" : "amount",
          "token_precision" : 6,
          "token_contract" : "token_contract",
          "token_symbol" : "token_symbol"
        }, {
          "amount" : "amount",
          "token_precision" : 6,
          "token_contract" : "token_contract",
          "token_symbol" : "token_symbol"
        } ],
        "transferred_at_block" : "transferred_at_block",
        "mutable_data" : { },
        "burned_by_account" : "burned_by_account",
        "name" : "name",
        "is_transferable" : true,
        "updated_at_block" : "updated_at_block",
        "minted_at_time" : "minted_at_time",
        "is_burnable" : true
      } ],
      "success" : true,
      "query_time" : 1
    }



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

Burns
=====

# get /atomicassets/v1/burns/{account}

Get a specific account (atomicassetsV1BurnsAccountGet)

### Path parameters

account (required)

Path Parameter — Account name

### Query parameters

hide_offers (optional)

Query Parameter — Hide assets which are used in an offer

collection_blacklist (optional)

Query Parameter — Hide collections from result. Split multiple with &quot;,&quot;

collection_whitelist (optional)

Query Parameter — Show only results from specific collections. Split multiple with &quot;,&quot;


### Example return data

Content-Type: application/json

    {
      "data" : [ {
        "assets" : "assets",
        "collections" : [ {
          "assets" : "assets",
          "collection_name" : "collection_name"
        }, {
          "assets" : "assets",
          "collection_name" : "collection_name"
        } ],
        "templates" : [ {
          "assets" : "assets",
          "template_id" : "template_id",
          "collection_name" : "collection_name"
        }, {
          "assets" : "assets",
          "template_id" : "template_id",
          "collection_name" : "collection_name"
        } ]
      }, {
        "assets" : "assets",
        "collections" : [ {
          "assets" : "assets",
          "collection_name" : "collection_name"
        }, {
          "assets" : "assets",
          "collection_name" : "collection_name"
        } ],
        "templates" : [ {
          "assets" : "assets",
          "template_id" : "template_id",
          "collection_name" : "collection_name"
        }, {
          "assets" : "assets",
          "template_id" : "template_id",
          "collection_name" : "collection_name"
        } ]
      } ],
      "success" : true,
      "query_time" : 0
    }



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

## Get NFT burns

### SDK Action

atomicassetsV1BurnsGet

### HTTP

GET /atomicassets/v1/burns

### Query parameters

match_owner (optional)

Query Parameter — Search for partial account name

collection_name (optional)

Query Parameter — Filter by collection name

schema_name (optional)

Query Parameter — Filter by schema name

template_id (optional)

Query Parameter — Filter by template id

burned (optional)

Query Parameter — Filter for burned assets

collection_blacklist (optional)

Query Parameter — Hide collections from result. Split multiple with &quot;,&quot;

collection_whitelist (optional)

Query Parameter — Show only results from specific collections. Split multiple with &quot;,&quot;

ids (optional)

Query Parameter — seperate multiple ids with &quot;,&quot;

lower_bound (optional)

Query Parameter — lower bound of primary key (value included)

upper_bound (optional)

Query Parameter — upper bound of primary key (value excluded)

page (optional)

Query Parameter — Result Page default: 1

limit (optional)

Query Parameter — Results per Page default: 100

order (optional)

Query Parameter — Order direction default: desc


### Example return data

Content-Type: application/json

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



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

Collections
===========

# get /atomicassets/v1/collections/{collection_name}

Find collection by its name (atomicassetsV1CollectionsCollectionNameGet)

### Path parameters

collection_name (required)

Path Parameter — Name of collection


### Example return data

Content-Type: application/json

    {
      "data" : {
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
      },
      "success" : true,
      "query_time" : 0
    }



### Responses

#### 200

OK

#### 416

Element not found

#### 500

Internal Server Error

* * *

# get /atomicassets/v1/collections/{collection_name}/logs

Fetch collection logs (atomicassetsV1CollectionsCollectionNameLogsGet)

### Path parameters

collection_name (required)

Path Parameter — Name of collection

### Query parameters

page (optional)

Query Parameter — Result Page default: 1

limit (optional)

Query Parameter — Results per Page default: 100

order (optional)

Query Parameter — Order direction default: desc

action_whitelist (optional)

Query Parameter — Action whitelist

action_blacklist (optional)

Query Parameter — Action blacklist


### Example return data

Content-Type: application/json

    {
      "data" : [ {
        "log_id" : "log_id",
        "created_at_block" : "created_at_block",
        "data" : { },
        "created_at_time" : "created_at_time",
        "name" : "name",
        "txid" : "txid"
      }, {
        "log_id" : "log_id",
        "created_at_block" : "created_at_block",
        "data" : { },
        "created_at_time" : "created_at_time",
        "name" : "name",
        "txid" : "txid"
      } ],
      "success" : true,
      "query_time" : 0
    }



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

# get /atomicassets/v1/collections/{collection_name}/stats

Get stats about collection (atomicassetsV1CollectionsCollectionNameStatsGet)

### Path parameters

collection_name (required)

Path Parameter — Name of collection


### Example return data

Content-Type: application/json

    {
      "data" : {
        "assets" : "assets",
        "templates" : "templates",
        "schemas" : "schemas",
        "burned" : "burned"
      },
      "success" : true,
      "query_time" : 0
    }



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

# get /atomicassets/v1/collections

Fetch collections (atomicassetsV1CollectionsGet)

### Query parameters

author (optional)

Query Parameter — Get collections by author

match (optional)

Query Parameter — Search for input in collection name

authorized_account (optional)

Query Parameter — Filter for collections which the provided account can use to create assets

notify_account (optional)

Query Parameter — Filter for collections where the provided account is notified

collection_blacklist (optional)

Query Parameter — Hide collections from result. Split multiple with &quot;,&quot;

collection_whitelist (optional)

Query Parameter — Show only results from specific collections. Split multiple with &quot;,&quot;

ids (optional)

Query Parameter — seperate multiple ids with &quot;,&quot;

lower_bound (optional)

Query Parameter — lower bound of primary key (value included)

upper_bound (optional)

Query Parameter — upper bound of primary key (value excluded)

before (optional)

Query Parameter — Only show results before this timestamp in milliseconds (value excluded)

after (optional)

Query Parameter — Only show results after this timestamp in milliseconds (value excluded)

page (optional)

Query Parameter — Result Page default: 1

limit (optional)

Query Parameter — Results per Page default: 100

order (optional)

Query Parameter — Order direction default: desc

sort (optional)

Query Parameter — Column to sort default: created


### Example return data

Content-Type: application/json

    {
      "data" : [ {
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
      }, {
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
      } ],
      "success" : true,
      "query_time" : 6
    }



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

Config
======

# get /atomicassets/v1/config

Get general information about the API and the connected contract (atomicassetsV1ConfigGet)


### Example return data

Content-Type: application/json

    {
      "data" : {
        "contract" : "contract",
        "collection_format" : [ {
          "name" : "name",
          "type" : "type"
        }, {
          "name" : "name",
          "type" : "type"
        } ],
        "version" : "version",
        "supported_tokens" : [ {
          "token_precision" : 0,
          "token_contract" : "token_contract",
          "token_symbol" : "token_symbol"
        }, {
          "token_precision" : 0,
          "token_contract" : "token_contract",
          "token_symbol" : "token_symbol"
        } ]
      },
      "success" : true,
      "query_time" : 6
    }



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

Offers
======

# get /atomicassets/v1/offers

Fetch offers (atomicassetsV1OffersGet)

### Query parameters

account (optional)

Query Parameter — Notified account (can be sender or recipient) - separate multiple with &quot;,&quot;

sender (optional)

Query Parameter — Offer sender - separate multiple with &quot;,&quot;

recipient (optional)

Query Parameter — Offer recipient - separate multiple with &quot;,&quot;

memo (optional)

Query Parameter — Search for exact memo

match_memo (optional)

Query Parameter — Search for text in memo

state (optional)

Query Parameter — Filter by Offer State (0: PENDING - Offer created and valid, 1: INVALID - Assets are missing because ownership has changed, 2: UNKNOWN - Offer is not valid anymore, 3: ACCEPTED - Offer was accepted, 4: DECLINED - Offer was declined by recipient, 5: CANCELLED - Offer was canceled by sender) - separate multiple with &quot;,&quot;

is\_recipient\_contract (optional)

Query Parameter — Filter offers where recipient is a contract

asset_id (optional)

Query Parameter — only offers which contain this asset_id - separate multiple with &quot;,&quot;

template_id (optional)

Query Parameter — only offers which contain assets of this template - separate multiple with &quot;,&quot;

schema_name (optional)

Query Parameter — only offers which contain assets of this schema - separate multiple with &quot;,&quot;

collection_name (optional)

Query Parameter — only offers which contain assets of this collection - separate multiple with &quot;,&quot;

account_whitelist (optional)

Query Parameter — Only offers which are sent by one of these accounts

account_blacklist (optional)

Query Parameter — Exclude offers which are sent by one of these accounts

sender\_asset\_whitelist (optional)

Query Parameter — Only offers which contain these assets

sender\_asset\_blacklist (optional)

Query Parameter — Exclude offers which contain these assets

recipient\_asset\_whitelist (optional)

Query Parameter — Only offers which contain these assets

recipient\_asset\_blacklist (optional)

Query Parameter — Exclude offers which contain these assets

hide_contracts (optional)

Query Parameter — dont show offers from or to accounts that have code deployed

hide\_empty\_offers (optional)

Query Parameter — dont show offers where one side is empty

ids (optional)

Query Parameter — seperate multiple ids with &quot;,&quot;

lower_bound (optional)

Query Parameter — lower bound of primary key (value included)

upper_bound (optional)

Query Parameter — upper bound of primary key (value excluded)

before (optional)

Query Parameter — Only show results before this timestamp in milliseconds (value excluded)

after (optional)

Query Parameter — Only show results after this timestamp in milliseconds (value excluded)

collection_blacklist (optional)

Query Parameter — Hide collections from result. Split multiple with &quot;,&quot;

collection_whitelist (optional)

Query Parameter — Show only results from specific collections. Split multiple with &quot;,&quot;

page (optional)

Query Parameter — Result Page default: 1

limit (optional)

Query Parameter — Results per Page default: 100

order (optional)

Query Parameter — Order direction default: desc

sort (optional)

Query Parameter — Column to sort default: created


### Example return data

Content-Type: application/json

    {
      "data" : [ {
        "sender_assets" : [ {
          "owner" : "owner",
          "schema" : {
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "format" : [ {
              "name" : "name",
              "type" : "type"
            }, {
              "name" : "name",
              "type" : "type"
            } ],
            "schema_name" : "schema_name"
          },
          "template" : {
            "immutable_data" : { },
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "max_supply" : "max_supply",
            "template_id" : "template_id",
            "is_transferable" : true,
            "issued_supply" : "issued_supply",
            "is_burnable" : true
          },
          "burned_at_block" : "burned_at_block",
          "data" : { },
          "burned_at_time" : "burned_at_time",
          "template_mint" : "template_mint",
          "updated_at_time" : "updated_at_time",
          "contract" : "contract",
          "minted_at_block" : "minted_at_block",
          "asset_id" : "asset_id",
          "collection" : {
            "created_at_block" : "created_at_block",
            "author" : "author",
            "created_at_time" : "created_at_time",
            "name" : "name",
            "allow_notify" : true,
            "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
            "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
            "collection_name" : "collection_name",
            "market_fee" : 0.8008281904610115
          },
          "transferred_at_time" : "transferred_at_time",
          "immutable_data" : { },
          "backed_tokens" : [ {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          }, {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          } ],
          "transferred_at_block" : "transferred_at_block",
          "mutable_data" : { },
          "burned_by_account" : "burned_by_account",
          "name" : "name",
          "is_transferable" : true,
          "updated_at_block" : "updated_at_block",
          "minted_at_time" : "minted_at_time",
          "is_burnable" : true
        }, {
          "owner" : "owner",
          "schema" : {
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "format" : [ {
              "name" : "name",
              "type" : "type"
            }, {
              "name" : "name",
              "type" : "type"
            } ],
            "schema_name" : "schema_name"
          },
          "template" : {
            "immutable_data" : { },
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "max_supply" : "max_supply",
            "template_id" : "template_id",
            "is_transferable" : true,
            "issued_supply" : "issued_supply",
            "is_burnable" : true
          },
          "burned_at_block" : "burned_at_block",
          "data" : { },
          "burned_at_time" : "burned_at_time",
          "template_mint" : "template_mint",
          "updated_at_time" : "updated_at_time",
          "contract" : "contract",
          "minted_at_block" : "minted_at_block",
          "asset_id" : "asset_id",
          "collection" : {
            "created_at_block" : "created_at_block",
            "author" : "author",
            "created_at_time" : "created_at_time",
            "name" : "name",
            "allow_notify" : true,
            "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
            "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
            "collection_name" : "collection_name",
            "market_fee" : 0.8008281904610115
          },
          "transferred_at_time" : "transferred_at_time",
          "immutable_data" : { },
          "backed_tokens" : [ {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          }, {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          } ],
          "transferred_at_block" : "transferred_at_block",
          "mutable_data" : { },
          "burned_by_account" : "burned_by_account",
          "name" : "name",
          "is_transferable" : true,
          "updated_at_block" : "updated_at_block",
          "minted_at_time" : "minted_at_time",
          "is_burnable" : true
        } ],
        "is_recipient_contract" : true,
        "updated_at_time" : "updated_at_time",
        "created_at_time" : "created_at_time",
        "contract" : "contract",
        "memo" : "memo",
        "sender_name" : "sender_name",
        "offer_id" : "offer_id",
        "recipient_assets" : [ null, null ],
        "created_at_block" : "created_at_block",
        "is_sender_contract" : true,
        "state" : 0,
        "recipient_name" : "recipient_name",
        "updated_at_block" : "updated_at_block"
      }, {
        "sender_assets" : [ {
          "owner" : "owner",
          "schema" : {
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "format" : [ {
              "name" : "name",
              "type" : "type"
            }, {
              "name" : "name",
              "type" : "type"
            } ],
            "schema_name" : "schema_name"
          },
          "template" : {
            "immutable_data" : { },
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "max_supply" : "max_supply",
            "template_id" : "template_id",
            "is_transferable" : true,
            "issued_supply" : "issued_supply",
            "is_burnable" : true
          },
          "burned_at_block" : "burned_at_block",
          "data" : { },
          "burned_at_time" : "burned_at_time",
          "template_mint" : "template_mint",
          "updated_at_time" : "updated_at_time",
          "contract" : "contract",
          "minted_at_block" : "minted_at_block",
          "asset_id" : "asset_id",
          "collection" : {
            "created_at_block" : "created_at_block",
            "author" : "author",
            "created_at_time" : "created_at_time",
            "name" : "name",
            "allow_notify" : true,
            "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
            "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
            "collection_name" : "collection_name",
            "market_fee" : 0.8008281904610115
          },
          "transferred_at_time" : "transferred_at_time",
          "immutable_data" : { },
          "backed_tokens" : [ {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          }, {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          } ],
          "transferred_at_block" : "transferred_at_block",
          "mutable_data" : { },
          "burned_by_account" : "burned_by_account",
          "name" : "name",
          "is_transferable" : true,
          "updated_at_block" : "updated_at_block",
          "minted_at_time" : "minted_at_time",
          "is_burnable" : true
        }, {
          "owner" : "owner",
          "schema" : {
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "format" : [ {
              "name" : "name",
              "type" : "type"
            }, {
              "name" : "name",
              "type" : "type"
            } ],
            "schema_name" : "schema_name"
          },
          "template" : {
            "immutable_data" : { },
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "max_supply" : "max_supply",
            "template_id" : "template_id",
            "is_transferable" : true,
            "issued_supply" : "issued_supply",
            "is_burnable" : true
          },
          "burned_at_block" : "burned_at_block",
          "data" : { },
          "burned_at_time" : "burned_at_time",
          "template_mint" : "template_mint",
          "updated_at_time" : "updated_at_time",
          "contract" : "contract",
          "minted_at_block" : "minted_at_block",
          "asset_id" : "asset_id",
          "collection" : {
            "created_at_block" : "created_at_block",
            "author" : "author",
            "created_at_time" : "created_at_time",
            "name" : "name",
            "allow_notify" : true,
            "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
            "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
            "collection_name" : "collection_name",
            "market_fee" : 0.8008281904610115
          },
          "transferred_at_time" : "transferred_at_time",
          "immutable_data" : { },
          "backed_tokens" : [ {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          }, {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          } ],
          "transferred_at_block" : "transferred_at_block",
          "mutable_data" : { },
          "burned_by_account" : "burned_by_account",
          "name" : "name",
          "is_transferable" : true,
          "updated_at_block" : "updated_at_block",
          "minted_at_time" : "minted_at_time",
          "is_burnable" : true
        } ],
        "is_recipient_contract" : true,
        "updated_at_time" : "updated_at_time",
        "created_at_time" : "created_at_time",
        "contract" : "contract",
        "memo" : "memo",
        "sender_name" : "sender_name",
        "offer_id" : "offer_id",
        "recipient_assets" : [ null, null ],
        "created_at_block" : "created_at_block",
        "is_sender_contract" : true,
        "state" : 0,
        "recipient_name" : "recipient_name",
        "updated_at_block" : "updated_at_block"
      } ],
      "success" : true,
      "query_time" : 6
    }



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

# get /atomicassets/v1/offers/{offer_id}

Find offer by id (atomicassetsV1OffersOfferIdGet)

### Path parameters

offer_id (required)

Path Parameter — ID of offer


### Example return data

Content-Type: application/json

    {
      "data" : {
        "sender_assets" : [ {
          "owner" : "owner",
          "schema" : {
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "format" : [ {
              "name" : "name",
              "type" : "type"
            }, {
              "name" : "name",
              "type" : "type"
            } ],
            "schema_name" : "schema_name"
          },
          "template" : {
            "immutable_data" : { },
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "max_supply" : "max_supply",
            "template_id" : "template_id",
            "is_transferable" : true,
            "issued_supply" : "issued_supply",
            "is_burnable" : true
          },
          "burned_at_block" : "burned_at_block",
          "data" : { },
          "burned_at_time" : "burned_at_time",
          "template_mint" : "template_mint",
          "updated_at_time" : "updated_at_time",
          "contract" : "contract",
          "minted_at_block" : "minted_at_block",
          "asset_id" : "asset_id",
          "collection" : {
            "created_at_block" : "created_at_block",
            "author" : "author",
            "created_at_time" : "created_at_time",
            "name" : "name",
            "allow_notify" : true,
            "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
            "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
            "collection_name" : "collection_name",
            "market_fee" : 0.8008281904610115
          },
          "transferred_at_time" : "transferred_at_time",
          "immutable_data" : { },
          "backed_tokens" : [ {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          }, {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          } ],
          "transferred_at_block" : "transferred_at_block",
          "mutable_data" : { },
          "burned_by_account" : "burned_by_account",
          "name" : "name",
          "is_transferable" : true,
          "updated_at_block" : "updated_at_block",
          "minted_at_time" : "minted_at_time",
          "is_burnable" : true
        }, {
          "owner" : "owner",
          "schema" : {
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "format" : [ {
              "name" : "name",
              "type" : "type"
            }, {
              "name" : "name",
              "type" : "type"
            } ],
            "schema_name" : "schema_name"
          },
          "template" : {
            "immutable_data" : { },
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "max_supply" : "max_supply",
            "template_id" : "template_id",
            "is_transferable" : true,
            "issued_supply" : "issued_supply",
            "is_burnable" : true
          },
          "burned_at_block" : "burned_at_block",
          "data" : { },
          "burned_at_time" : "burned_at_time",
          "template_mint" : "template_mint",
          "updated_at_time" : "updated_at_time",
          "contract" : "contract",
          "minted_at_block" : "minted_at_block",
          "asset_id" : "asset_id",
          "collection" : {
            "created_at_block" : "created_at_block",
            "author" : "author",
            "created_at_time" : "created_at_time",
            "name" : "name",
            "allow_notify" : true,
            "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
            "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
            "collection_name" : "collection_name",
            "market_fee" : 0.8008281904610115
          },
          "transferred_at_time" : "transferred_at_time",
          "immutable_data" : { },
          "backed_tokens" : [ {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          }, {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          } ],
          "transferred_at_block" : "transferred_at_block",
          "mutable_data" : { },
          "burned_by_account" : "burned_by_account",
          "name" : "name",
          "is_transferable" : true,
          "updated_at_block" : "updated_at_block",
          "minted_at_time" : "minted_at_time",
          "is_burnable" : true
        } ],
        "is_recipient_contract" : true,
        "updated_at_time" : "updated_at_time",
        "created_at_time" : "created_at_time",
        "contract" : "contract",
        "memo" : "memo",
        "sender_name" : "sender_name",
        "offer_id" : "offer_id",
        "recipient_assets" : [ null, null ],
        "created_at_block" : "created_at_block",
        "is_sender_contract" : true,
        "state" : 0,
        "recipient_name" : "recipient_name",
        "updated_at_block" : "updated_at_block"
      },
      "success" : true,
      "query_time" : 0
    }



### Responses

#### 200

OK

#### 416

Element not found

#### 500

Internal Server Error

* * *

# get /atomicassets/v1/offers/{offer_id}/logs

Fetch offer logs (atomicassetsV1OffersOfferIdLogsGet)

### Path parameters

offer_id (required)

Path Parameter — ID of offer

### Query parameters

page (optional)

Query Parameter — Result Page default: 1

limit (optional)

Query Parameter — Results per Page default: 100

order (optional)

Query Parameter — Order direction default: desc

action_whitelist (optional)

Query Parameter — Action whitelist

action_blacklist (optional)

Query Parameter — Action blacklist


### Example return data

Content-Type: application/json

    {
      "data" : [ {
        "log_id" : "log_id",
        "created_at_block" : "created_at_block",
        "data" : { },
        "created_at_time" : "created_at_time",
        "name" : "name",
        "txid" : "txid"
      }, {
        "log_id" : "log_id",
        "created_at_block" : "created_at_block",
        "data" : { },
        "created_at_time" : "created_at_time",
        "name" : "name",
        "txid" : "txid"
      } ],
      "success" : true,
      "query_time" : 0
    }



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

Schemas
=======

# get /atomicassets/v1/schemas/{collection_name}/{schema_name}

Find schema by schema_name (atomicassetsV1SchemasCollectionNameSchemaNameGet)

### Path parameters

collection_name (required)

Path Parameter — Collection name of schema

schema_name (required)

Path Parameter — Name of schema


### Example return data

Content-Type: application/json

    {
      "data" : {
        "created_at_block" : "created_at_block",
        "created_at_time" : "created_at_time",
        "contract" : "contract",
        "format" : [ {
          "name" : "name",
          "type" : "type"
        }, {
          "name" : "name",
          "type" : "type"
        } ],
        "schema_name" : "schema_name",
        "collection" : {
          "created_at_block" : "created_at_block",
          "author" : "author",
          "created_at_time" : "created_at_time",
          "name" : "name",
          "allow_notify" : true,
          "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
          "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
          "collection_name" : "collection_name",
          "market_fee" : 0.8008281904610115
        }
      },
      "success" : true,
      "query_time" : 0
    }



### Responses

#### 200

OK

#### 416

Element not found

#### 500

Internal Server Error

* * *

# get /atomicassets/v1/schemas/{collection_name}/{schema_name}/logs

Fetch schema logs (atomicassetsV1SchemasCollectionNameSchemaNameLogsGet)

### Path parameters

collection_name (required)

Path Parameter — Collection name of schema

schema_name (required)

Path Parameter — Name of schema

### Query parameters

page (optional)

Query Parameter — Result Page default: 1

limit (optional)

Query Parameter — Results per Page default: 100

order (optional)

Query Parameter — Order direction default: desc

action_whitelist (optional)

Query Parameter — Action whitelist

action_blacklist (optional)

Query Parameter — Action blacklist


### Example return data

Content-Type: application/json

    {
      "data" : [ {
        "log_id" : "log_id",
        "created_at_block" : "created_at_block",
        "data" : { },
        "created_at_time" : "created_at_time",
        "name" : "name",
        "txid" : "txid"
      }, {
        "log_id" : "log_id",
        "created_at_block" : "created_at_block",
        "data" : { },
        "created_at_time" : "created_at_time",
        "name" : "name",
        "txid" : "txid"
      } ],
      "success" : true,
      "query_time" : 0
    }



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

# get /atomicassets/v1/schemas/{collection_name}/{schema_name}/stats

Get stats about a specific schema (atomicassetsV1SchemasCollectionNameSchemaNameStatsGet)

### Path parameters

collection_name (required)

Path Parameter — Collection name of schema

schema_name (required)

Path Parameter — Name of schema


### Example return data

Content-Type: application/json

    {
      "data" : {
        "assets" : "assets",
        "templates" : "templates",
        "burned" : "burned"
      },
      "success" : true,
      "query_time" : 0
    }



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

# get /atomicassets/v1/schemas

Fetch schemas (atomicassetsV1SchemasGet)

### Query parameters

collection_name (optional)

Query Parameter — Get all schemas within the collection

authorized_account (optional)

Query Parameter — Filter for schemas the provided account can edit

schema_name (optional)

Query Parameter — Schema name

match (optional)

Query Parameter — Search for input in schema name

collection_blacklist (optional)

Query Parameter — Hide collections from result. Split multiple with &quot;,&quot;

collection_whitelist (optional)

Query Parameter — Show only results from specific collections. Split multiple with &quot;,&quot;

ids (optional)

Query Parameter — seperate multiple ids with &quot;,&quot;

lower_bound (optional)

Query Parameter — lower bound of primary key (value included)

upper_bound (optional)

Query Parameter — upper bound of primary key (value excluded)

before (optional)

Query Parameter — Only show results before this timestamp in milliseconds (value excluded)

after (optional)

Query Parameter — Only show results after this timestamp in milliseconds (value excluded)

page (optional)

Query Parameter — Result Page default: 1

limit (optional)

Query Parameter — Results per Page default: 100

order (optional)

Query Parameter — Order direction default: desc

sort (optional)

Query Parameter — Column to sort default: created


### Example return data

Content-Type: application/json

    {
      "data" : [ {
        "created_at_block" : "created_at_block",
        "created_at_time" : "created_at_time",
        "contract" : "contract",
        "format" : [ {
          "name" : "name",
          "type" : "type"
        }, {
          "name" : "name",
          "type" : "type"
        } ],
        "schema_name" : "schema_name",
        "collection" : {
          "created_at_block" : "created_at_block",
          "author" : "author",
          "created_at_time" : "created_at_time",
          "name" : "name",
          "allow_notify" : true,
          "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
          "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
          "collection_name" : "collection_name",
          "market_fee" : 0.8008281904610115
        }
      }, {
        "created_at_block" : "created_at_block",
        "created_at_time" : "created_at_time",
        "contract" : "contract",
        "format" : [ {
          "name" : "name",
          "type" : "type"
        }, {
          "name" : "name",
          "type" : "type"
        } ],
        "schema_name" : "schema_name",
        "collection" : {
          "created_at_block" : "created_at_block",
          "author" : "author",
          "created_at_time" : "created_at_time",
          "name" : "name",
          "allow_notify" : true,
          "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
          "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
          "collection_name" : "collection_name",
          "market_fee" : 0.8008281904610115
        }
      } ],
      "success" : true,
      "query_time" : 0
    }



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

Templates
=========

# get /atomicassets/v1/templates/{collection_name}/{template_id}

Find template by id (atomicassetsV1TemplatesCollectionNameTemplateIdGet)

### Path parameters

collection_name (required)

Path Parameter — Name of collection

template_id (required)

Path Parameter — ID of template


### Example return data

Content-Type: application/json

    {
      "data" : {
        "immutable_data" : { },
        "created_at_block" : "created_at_block",
        "scheme" : {
          "created_at_block" : "created_at_block",
          "created_at_time" : "created_at_time",
          "format" : [ {
            "name" : "name",
            "type" : "type"
          }, {
            "name" : "name",
            "type" : "type"
          } ],
          "schema_name" : "schema_name"
        },
        "created_at_time" : "created_at_time",
        "contract" : "contract",
        "max_supply" : "max_supply",
        "template_id" : "template_id",
        "is_transferable" : true,
        "collection" : {
          "created_at_block" : "created_at_block",
          "author" : "author",
          "created_at_time" : "created_at_time",
          "name" : "name",
          "allow_notify" : true,
          "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
          "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
          "collection_name" : "collection_name",
          "market_fee" : 0.8008281904610115
        },
        "issued_supply" : "issued_supply",
        "is_burnable" : true
      },
      "success" : true,
      "query_time" : 0
    }



### Responses

#### 200

OK

#### 416

Element not found

#### 500

Internal Server Error

* * *

# get /atomicassets/v1/templates/{collection_name}/{template_id}/logs

Fetch template logs (atomicassetsV1TemplatesCollectionNameTemplateIdLogsGet)

### Path parameters

collection_name (required)

Path Parameter — Name of collection

template_id (required)

Path Parameter — ID of template

### Query parameters

page (optional)

Query Parameter — Result Page default: 1

limit (optional)

Query Parameter — Results per Page default: 100

order (optional)

Query Parameter — Order direction default: desc

action_whitelist (optional)

Query Parameter — Action whitelist

action_blacklist (optional)

Query Parameter — Action blacklist


### Example return data

Content-Type: application/json

    {
      "data" : [ {
        "log_id" : "log_id",
        "created_at_block" : "created_at_block",
        "data" : { },
        "created_at_time" : "created_at_time",
        "name" : "name",
        "txid" : "txid"
      }, {
        "log_id" : "log_id",
        "created_at_block" : "created_at_block",
        "data" : { },
        "created_at_time" : "created_at_time",
        "name" : "name",
        "txid" : "txid"
      } ],
      "success" : true,
      "query_time" : 0
    }



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

# get /atomicassets/v1/templates/{collection_name}/{template_id}/stats

Get stats about a specific template (atomicassetsV1TemplatesCollectionNameTemplateIdStatsGet)

### Path parameters

collection_name (required)

Path Parameter — Name of collection

template_id (required)

Path Parameter — ID of template


### Example return data

Content-Type: application/json

    {
      "data" : {
        "assets" : "assets",
        "burned" : "burned"
      },
      "success" : true,
      "query_time" : 0
    }



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

# get /atomicassets/v1/templates

Fetch templates. (atomicassetsV1TemplatesGet)

You can filter the result by specific asset / template data fields.You can add for example &template\_data.rarity=common to only receive results which have an attribute "rarity" with the value "common". You can query specific asset data by using &immutable\_data.rarity=common or &mutable_data.rarity=common .If you want to query a non text type you need to specify it explicitly (defaults to text type) like data:bool.foil=true or data:number.id=4 or data:text.rarity=common. Integers which are defined greater than 32 bit (eg 64 bit) in the schema need to be queried as text.

### Query parameters

collection_name (optional)

Query Parameter — Get all templates within the collection

schema_name (optional)

Query Parameter — Get all templates which implement that schema

issued_supply (optional)

Query Parameter — Filter by issued supply

min\_issued\_supply (optional)

Query Parameter — Filter by issued supply

max\_issued\_supply (optional)

Query Parameter — Filter by issued supply

has_assets (optional)

Query Parameter — Only show templates with existing supply &gt; 0

max_supply (optional)

Query Parameter — Filter by max supply

is_burnable (optional)

Query Parameter — Filter by burnable

is_transferable (optional)

Query Parameter — Filter by transferable

authorized_account (optional)

Query Parameter — Filter for templates the provided account can use

match (optional)

Query Parameter — Search for template id or

collection_blacklist (optional)

Query Parameter — Hide collections from result. Split multiple with &quot;,&quot;

collection_whitelist (optional)

Query Parameter — Show only results from specific collections. Split multiple with &quot;,&quot;

ids (optional)

Query Parameter — seperate multiple ids with &quot;,&quot;

lower_bound (optional)

Query Parameter — lower bound of primary key (value included)

upper_bound (optional)

Query Parameter — upper bound of primary key (value excluded)

before (optional)

Query Parameter — Only show results before this timestamp in milliseconds (value excluded)

after (optional)

Query Parameter — Only show results after this timestamp in milliseconds (value excluded)

page (optional)

Query Parameter — Result Page default: 1

limit (optional)

Query Parameter — Results per Page default: 100

order (optional)

Query Parameter — Order direction default: desc

sort (optional)

Query Parameter — Column to sort default: created


### Example return data

Content-Type: application/json

    {
      "data" : [ {
        "immutable_data" : { },
        "created_at_block" : "created_at_block",
        "scheme" : {
          "created_at_block" : "created_at_block",
          "created_at_time" : "created_at_time",
          "format" : [ {
            "name" : "name",
            "type" : "type"
          }, {
            "name" : "name",
            "type" : "type"
          } ],
          "schema_name" : "schema_name"
        },
        "created_at_time" : "created_at_time",
        "contract" : "contract",
        "max_supply" : "max_supply",
        "template_id" : "template_id",
        "is_transferable" : true,
        "collection" : {
          "created_at_block" : "created_at_block",
          "author" : "author",
          "created_at_time" : "created_at_time",
          "name" : "name",
          "allow_notify" : true,
          "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
          "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
          "collection_name" : "collection_name",
          "market_fee" : 0.8008281904610115
        },
        "issued_supply" : "issued_supply",
        "is_burnable" : true
      }, {
        "immutable_data" : { },
        "created_at_block" : "created_at_block",
        "scheme" : {
          "created_at_block" : "created_at_block",
          "created_at_time" : "created_at_time",
          "format" : [ {
            "name" : "name",
            "type" : "type"
          }, {
            "name" : "name",
            "type" : "type"
          } ],
          "schema_name" : "schema_name"
        },
        "created_at_time" : "created_at_time",
        "contract" : "contract",
        "max_supply" : "max_supply",
        "template_id" : "template_id",
        "is_transferable" : true,
        "collection" : {
          "created_at_block" : "created_at_block",
          "author" : "author",
          "created_at_time" : "created_at_time",
          "name" : "name",
          "allow_notify" : true,
          "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
          "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
          "collection_name" : "collection_name",
          "market_fee" : 0.8008281904610115
        },
        "issued_supply" : "issued_supply",
        "is_burnable" : true
      } ],
      "success" : true,
      "query_time" : 0
    }



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *

Transfers
=========

# get /atomicassets/v1/transfers

Fetch transfers (atomicassetsV1TransfersGet)

### Query parameters

account (optional)

Query Parameter — Notified account (can be sender or recipient) - separate multiple with &quot;,&quot;

sender (optional)

Query Parameter — Transfer sender - separate multiple with &quot;,&quot;

recipient (optional)

Query Parameter — Transfer recipient - separate multiple with &quot;,&quot;

memo (optional)

Query Parameter — Search for exact memo

match_memo (optional)

Query Parameter — Search for text in memo

asset_id (optional)

Query Parameter — only transfers which contain this asset_id - separate multiple with &quot;,&quot;

template_id (optional)

Query Parameter — only transfers which contain assets of this template - separate multiple with &quot;,&quot;

schema_name (optional)

Query Parameter — only transfers which contain assets of this schema - separate multiple with &quot;,&quot;

collection_name (optional)

Query Parameter — only transfers which contain assets of this collection - separate multiple with &quot;,&quot;

hide_contracts (optional)

Query Parameter — dont show transfers from or to accounts that have code deployed

ids (optional)

Query Parameter — seperate multiple ids with &quot;,&quot;

lower_bound (optional)

Query Parameter — lower bound of primary key (value included)

upper_bound (optional)

Query Parameter — upper bound of primary key (value excluded)

before (optional)

Query Parameter — Only show results before this timestamp in milliseconds (value excluded)

after (optional)

Query Parameter — Only show results after this timestamp in milliseconds (value excluded)

collection_blacklist (optional)

Query Parameter — Hide collections from result. Split multiple with &quot;,&quot;

collection_whitelist (optional)

Query Parameter — Show only results from specific collections. Split multiple with &quot;,&quot;

page (optional)

Query Parameter — Result Page default: 1

limit (optional)

Query Parameter — Results per Page default: 100

order (optional)

Query Parameter — Order direction default: desc

sort (optional)

Query Parameter — Column to sort default: created


### Example return data

Content-Type: application/json

    {
      "data" : [ {
        "assets" : [ {
          "owner" : "owner",
          "schema" : {
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "format" : [ {
              "name" : "name",
              "type" : "type"
            }, {
              "name" : "name",
              "type" : "type"
            } ],
            "schema_name" : "schema_name"
          },
          "template" : {
            "immutable_data" : { },
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "max_supply" : "max_supply",
            "template_id" : "template_id",
            "is_transferable" : true,
            "issued_supply" : "issued_supply",
            "is_burnable" : true
          },
          "burned_at_block" : "burned_at_block",
          "data" : { },
          "burned_at_time" : "burned_at_time",
          "template_mint" : "template_mint",
          "updated_at_time" : "updated_at_time",
          "contract" : "contract",
          "minted_at_block" : "minted_at_block",
          "asset_id" : "asset_id",
          "collection" : {
            "created_at_block" : "created_at_block",
            "author" : "author",
            "created_at_time" : "created_at_time",
            "name" : "name",
            "allow_notify" : true,
            "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
            "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
            "collection_name" : "collection_name",
            "market_fee" : 0.8008281904610115
          },
          "transferred_at_time" : "transferred_at_time",
          "immutable_data" : { },
          "backed_tokens" : [ {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          }, {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          } ],
          "transferred_at_block" : "transferred_at_block",
          "mutable_data" : { },
          "burned_by_account" : "burned_by_account",
          "name" : "name",
          "is_transferable" : true,
          "updated_at_block" : "updated_at_block",
          "minted_at_time" : "minted_at_time",
          "is_burnable" : true
        }, {
          "owner" : "owner",
          "schema" : {
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "format" : [ {
              "name" : "name",
              "type" : "type"
            }, {
              "name" : "name",
              "type" : "type"
            } ],
            "schema_name" : "schema_name"
          },
          "template" : {
            "immutable_data" : { },
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "max_supply" : "max_supply",
            "template_id" : "template_id",
            "is_transferable" : true,
            "issued_supply" : "issued_supply",
            "is_burnable" : true
          },
          "burned_at_block" : "burned_at_block",
          "data" : { },
          "burned_at_time" : "burned_at_time",
          "template_mint" : "template_mint",
          "updated_at_time" : "updated_at_time",
          "contract" : "contract",
          "minted_at_block" : "minted_at_block",
          "asset_id" : "asset_id",
          "collection" : {
            "created_at_block" : "created_at_block",
            "author" : "author",
            "created_at_time" : "created_at_time",
            "name" : "name",
            "allow_notify" : true,
            "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
            "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
            "collection_name" : "collection_name",
            "market_fee" : 0.8008281904610115
          },
          "transferred_at_time" : "transferred_at_time",
          "immutable_data" : { },
          "backed_tokens" : [ {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          }, {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          } ],
          "transferred_at_block" : "transferred_at_block",
          "mutable_data" : { },
          "burned_by_account" : "burned_by_account",
          "name" : "name",
          "is_transferable" : true,
          "updated_at_block" : "updated_at_block",
          "minted_at_time" : "minted_at_time",
          "is_burnable" : true
        } ],
        "created_at_block" : "created_at_block",
        "created_at_time" : "created_at_time",
        "contract" : "contract",
        "memo" : "memo",
        "sender_name" : "sender_name",
        "transfer_id" : "transfer_id",
        "recipient_name" : "recipient_name"
      }, {
        "assets" : [ {
          "owner" : "owner",
          "schema" : {
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "format" : [ {
              "name" : "name",
              "type" : "type"
            }, {
              "name" : "name",
              "type" : "type"
            } ],
            "schema_name" : "schema_name"
          },
          "template" : {
            "immutable_data" : { },
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "max_supply" : "max_supply",
            "template_id" : "template_id",
            "is_transferable" : true,
            "issued_supply" : "issued_supply",
            "is_burnable" : true
          },
          "burned_at_block" : "burned_at_block",
          "data" : { },
          "burned_at_time" : "burned_at_time",
          "template_mint" : "template_mint",
          "updated_at_time" : "updated_at_time",
          "contract" : "contract",
          "minted_at_block" : "minted_at_block",
          "asset_id" : "asset_id",
          "collection" : {
            "created_at_block" : "created_at_block",
            "author" : "author",
            "created_at_time" : "created_at_time",
            "name" : "name",
            "allow_notify" : true,
            "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
            "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
            "collection_name" : "collection_name",
            "market_fee" : 0.8008281904610115
          },
          "transferred_at_time" : "transferred_at_time",
          "immutable_data" : { },
          "backed_tokens" : [ {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          }, {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          } ],
          "transferred_at_block" : "transferred_at_block",
          "mutable_data" : { },
          "burned_by_account" : "burned_by_account",
          "name" : "name",
          "is_transferable" : true,
          "updated_at_block" : "updated_at_block",
          "minted_at_time" : "minted_at_time",
          "is_burnable" : true
        }, {
          "owner" : "owner",
          "schema" : {
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "format" : [ {
              "name" : "name",
              "type" : "type"
            }, {
              "name" : "name",
              "type" : "type"
            } ],
            "schema_name" : "schema_name"
          },
          "template" : {
            "immutable_data" : { },
            "created_at_block" : "created_at_block",
            "created_at_time" : "created_at_time",
            "max_supply" : "max_supply",
            "template_id" : "template_id",
            "is_transferable" : true,
            "issued_supply" : "issued_supply",
            "is_burnable" : true
          },
          "burned_at_block" : "burned_at_block",
          "data" : { },
          "burned_at_time" : "burned_at_time",
          "template_mint" : "template_mint",
          "updated_at_time" : "updated_at_time",
          "contract" : "contract",
          "minted_at_block" : "minted_at_block",
          "asset_id" : "asset_id",
          "collection" : {
            "created_at_block" : "created_at_block",
            "author" : "author",
            "created_at_time" : "created_at_time",
            "name" : "name",
            "allow_notify" : true,
            "notify_accounts" : [ "notify_accounts", "notify_accounts" ],
            "authorized_accounts" : [ "authorized_accounts", "authorized_accounts" ],
            "collection_name" : "collection_name",
            "market_fee" : 0.8008281904610115
          },
          "transferred_at_time" : "transferred_at_time",
          "immutable_data" : { },
          "backed_tokens" : [ {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          }, {
            "amount" : "amount",
            "token_precision" : 6,
            "token_contract" : "token_contract",
            "token_symbol" : "token_symbol"
          } ],
          "transferred_at_block" : "transferred_at_block",
          "mutable_data" : { },
          "burned_by_account" : "burned_by_account",
          "name" : "name",
          "is_transferable" : true,
          "updated_at_block" : "updated_at_block",
          "minted_at_time" : "minted_at_time",
          "is_burnable" : true
        } ],
        "created_at_block" : "created_at_block",
        "created_at_time" : "created_at_time",
        "contract" : "contract",
        "memo" : "memo",
        "sender_name" : "sender_name",
        "transfer_id" : "transfer_id",
        "recipient_name" : "recipient_name"
      } ],
      "success" : true,
      "query_time" : 0
    }



### Responses

#### 200

OK

#### 500

Internal Server Error

* * *