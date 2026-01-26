# Deploy Token

In this guide, we will go through what deploying a token contract to an example `tokentester` account would like.

### Pre-requisites

- NodeJS 16 [Installation Guide](https://github.com/XPRNetwork/proton-cli#install-nodejs)
- NPM
- Git
- [XPR Network CLI](https://github.com/XPRNetwork/proton-cli)
``` bash
npm install -g @proton/cli
```

### Steps
1. Create account

```
proton account:create tokentester
```


2. Buy RAM

```
proton ram:buy tokentester tokentester 200000
```

3. Set token contract

```
proton contract:set tokentester https://github.com/XPRNetwork/ts-smart-contracts/tree/main/external/xtokens
```

4. Create token

maximum_supply is the maximum # of tokens that can ever be minted of your token e.g. 1000000.0000 TOKEN, notice the .0000 means a precision of 4 decimals

```
proton action tokentester create '{
    "issuer": "tokentester",
    "maximum_supply": "1000000.0000 TOKEN"
}' tokentester@active
```

5. Issue token

```
proton action tokentester issue '{
    "to": "tokentester",
    "quantity": "1000000.0000 TOKEN",
    "memo": "First issue"
}' tokentester@active
```


6. Add logo to wallet

Ensure that the symbol matches the precision and symbol code you created earlier. "1000000.0000 TOKEN" = "4,TOKEN"

```
proton action token.proton reg '{
    "tcontract": "tokentester",
    "tname": "My Token",
    "url": "https://token.com",
    "desc": "The Best Token",
    "iconurl": "https://token.com/image.png",
    "symbol": "4,MEME",
}' tokentester@active
```

**Important** It is good practice for token contracts to null out their keys by setting both owner and active keys to eosio@active to prevent further changes to the token contract. This will be required if you want your token to be used directly for buying and selling tokens through NFT marketplace. You can do this using `proton permission` command.