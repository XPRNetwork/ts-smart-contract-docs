---
description: Use XPR Network CLI to programatically create a new account without the email verification flow
---

# Paid New Account

Use XPR Network CLI to programatically create a new account without the email verification flow

The following example command would cost 26.6666 XPR for RAM. 

Replace `<YOUR_ACCOUNT>`, `<NEW_ACCOUNT>`, and `<NEW_ACCOUNT_KEY>` with your own values.

```sh
proton transaction:push '{
    "actions": [
    {
      "account": "eosio",
      "name": "newaccount",
      "authorization": [{
        "actor": "<YOUR_ACCOUNT>",
        "permission": "active"
      }],
      "data": {
        "creator": "<YOUR_ACCOUNT>",
        "name": "<NEW_ACCOUNT>",
        "owner": {
          "threshold": 1,
          "keys": [
            {
              "weight": 1,
              "key": "<NEW_ACCOUNT_KEY>"
            }
          ],
          "accounts": [],
          "waits": []
        },
        "active": {
          "threshold": 1,
          "keys": [
            {
              "weight": 1,
              "key": "<NEW_ACCOUNT_KEY>"
            }
          ],
          "accounts": [],
          "waits": []
        }
      }
    },
    {
      "account": "eosio",
      "name": "buyrambytes",
      "authorization": [{
          "actor": "<YOUR_ACCOUNT>",
          "permission": "active"
        }
      ],
      "data": {
        "payer": "<YOUR_ACCOUNT>",
        "receiver": "<NEW_ACCOUNT>",
        "bytes": 12000
      }
    },
    {
      "account": "eosio.proton",
      "name": "newaccres",
      "authorization": [{
        "actor": "<YOUR_ACCOUNT>",
        "permission": "active"
      }],
      "data": {
        "account": "<NEW_ACCOUNT>"
      }
    }
  ]
}'
```