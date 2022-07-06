# Transfer Token

### Transfer XPR
```sh
proton action eosio.token transfer '{
    "from": "account1",
    "to": "account2",
    "quantity": "1.0000 XPR",
    "memo": "",
}' account1@active
```

### Transfer XUSDC
```sh
proton action xtokens transfer '{
    "from": "account1",
    "to": "account2",
    "quantity": "1.000000 XUSDC",
    "memo": "",
}' account1@active
```