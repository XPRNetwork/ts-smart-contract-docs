---
description: Security
---

## Security

The main goal of smart contract security is to prevent the usage of your smart contracts in unexpected ways.

Remember that anyone can call an action on your contract with any acceptable parameter. As a developer, it is your responsibility to validate every parameter inputted into the contract.

### General Recommendations
- Write unit tests to cover all expected states and incorrect authorization cases
- Write integration tests to cover interactions of your smart contract with other contracts
- Apply a multi-signature to your smart contract to prevent private key hacks

### Common Pitfalls
- Using `===` instead of `==`, remember that `===` checks for reference equality
  - Fix: Always use `==`
- Changing the columns of a table can corrupt the data
  - Fix: Instead of modifying table columns, create a new table with your new data. Other option is to use a temporary migration table, where you migrate all the existing data to. If using a migration table, make sure to pause the contract to prevent addition of new rows during migration.
- Incorrect paramater validation
  - Fix: Use `check` statements to validate all paramaters for acceptable values and ranges
  - Example: Not checking that an Asset's quantity is positive. Remember that assets store `i64` amounts, and can represent a negative quantity.
- Missing authorization checks
  - Fix: Use `requireAuth` to restrict actions to only the intended accounts
- Outgoing notifications or inline actions can abort, reverting the entire transaction
  - Fix: Do not send any notifications or inline actions if the action must not revert (or only send them to contracts you know will not abort with certainty)
- Transactions can be aborted by callers
  - Fix: Split up this transaction into two seperate transactions, one for the user to commit to a random value, and the second to use the committed value to perform an action.
  - Example: A dApp that calculates a pseudo random value and mints an NFT based on this value in the same transaction. An attacker may build a contract that calls your action as an inline action, and then queues a second inline action that checks if they received the desired NFT and aborts if it didn't. Even if you ensure that your action has not been called as an inline action (`getSender()` == `Name()`), a sophisticated attacker could build a custom Proton node that does optimistically executes your transaction and does not relay it at the P2P level to other nodes if criteria is not met
- Integer overflow
  - Fix: Use `SafeMath` library
  - Example: Multiplying two assets with u64 values may result in an integer overflow as the value may be suited for u128
- Re-entrancy attacks from notifications and inline actions
  - Fix: Understand that the creation order of notifications and inline actions does not match the execution order, as explained in depth in [inline actions](./inline-actions.md)
- Denial of service from RAM overconsumption
  - Fix: When storing rows in tables, the RAM payer is set by the contract. If you are paying for the RAM, ensure that an attacker has limits on how many rows they can spuriously create according to your business case.

For more in-depth considerations of these smart contract pitfalls, read this this [WCR collection](https://github.com/klevoya/eosio-wcr-registry)