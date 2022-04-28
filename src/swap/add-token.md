---
description: Propose to add token
---

# Add Token

**For this listing example, we will assume:**

- Proposer Account: `myaccount`
- Symbol: `FOOBAR`
- Precision: `6` 
- Token Contract: `xtokens`
- Price: 1 XPR = 10 FOOBAR
- LT Symbol: `FOOXPR` (7 char limit)


**1. Prepare deposit of FOOBAR and XPR**

ProtonScan: [Link](https://www.protonscan.io/account/proton.swaps?loadContract=true&tab=Actions&account=proton.swaps&scope=proton.swaps&limit=100&action=depositprep&table=pools)

`owner` = `myaccount`

`symbols` = `[{"sym":"4,XPR","contract":"eosio.token"}, {"sym":"6,FOOBAR","contract":"xtokens"}]`

**2. Transfer 100 XPR and 1000 FOOBAR to `proton.swaps` with memo `deposit`**

**3. Add proposal**

ProtonScan: [Link](https://www.protonscan.io/account/proton.swaps?loadContract=true&tab=Actions&account=proton.swaps&scope=proton.swaps&limit=100&action=proposaladd)

`pool_creator` = `myaccount`

`lt_symbol` = `FOOXPR`

`pool1` = `{"quantity":"1000.000000 FOOBAR", "contract":"xtokens"}`

`pool2` = `{"quantity":"100.0000 XPR", "contract":"eosio.token"}`

`memo` = `FOOBAR<>XPR`

`amplifier` = `0`

**4. Contact Metal team**
