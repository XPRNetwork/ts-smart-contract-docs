---
description: Defines API for querying action and sending action
---

# Actions

## Classes

### PermissionLevel
Creates object for account and permission.

This object can be used to check account authentication or/and permission.

`permission` argument is optional. `active` permission will be used by default if no value is passed.

#### Constructor

* ```ts
  constructor(
    public actor: Name = new Name(),
    public permission: Name = Name.fromString("active")
  )
  ```
**Example:**
```ts
  const payer = new PermissionLevel(Name.fromString("payer")) 
  // creates account for payer@active

  const buyer = new PermissionLevel(Name.fromString("buyer"), Name.fromString("current")) 
  // creates account for buyer@current
```

### Action

NEED EXPLANATION ABOUT THIS CLASS

#### Constructor

* ```ts
  constructor(
    public authorization: PermissionLevel[] = [],
    public account: Name = new Name(),
    public name: Name = new Name(),
    public data: u8[] = [],
  )
  ```

## Functions

### requireAuth

* ```ts
  function requireAuth(name: Name): void
  ```
  This function verifies that specified account exists in the set of provided auths on a action. It throws an error if not found.

  The function should be used inside the action method of the contract. 

  **Example**
  ```ts
  // ...
  @action('act')
  doAction(): void {
    /* actions defined before requireAuth will be done without authentication required. */
    requireAuth(Name.fromString('test'))
    /* No actions defined after this line will not be performed if user 
    with name test do not exists in the list of provided auths on action.
    The action execution will just stop */
  }
  ```

### requireAuth2
* ```ts
  requireAuth2(permissionLevel: PermissionLevel): void
  ```
  This function verifies that specified account exists in the set of provided auths on a action with appropriate permission. It throws an error if not found.

  The function should be used inside the action method of the contract. The behavior is almost the same as requireAuth

  **Example**
  ```ts
  // ...
  @action('act')
  doAction(): void {
    // actions defined before requireAuth2 will be done without authentication required.
    const buyer = new PermissionLevel(Name.fromString("buyer"), Name.fromString("current"))
    requireAuth2(buyer)
    /* No actions defined after this line will not be performed if user with 
    name test and permission current do not exists in the list of provided auths.
    The action execution will just stop */
  }
  ```

### hasAuth
* ```ts
  function hasAuth(name: Name): bool
  ```
  This function verifies that the provided name has auth (exists in block chain).

  The function only preforms the check, but will not unwinds all pending changes if the name has not auth
  
  If you need to perform check and unwind changes see `check` function

  **Example**
  ```ts
  @action('transfer')
  transferTokens(
    from: Name,
    to: Name
  ): void {
    const payer = hasAuth(to) ? to : from;
    // do tokens transfer for payer
  }
  ```

### isAccount
* ```ts
  function isAccount(name: Name): bool
  ```
  This function verifies that the name passed as name argument is an existing account. 

  The function only preforms the check, but will not unwinds all pending changes if the name is not an existing account

  If you need to perform check and unwind changes see `check` function

  **Example**
  ```ts
  @action('transfer')
  transferTokens(
    payer: Name,
    buyer: Name
  ): void {
    if(isAccount(buyer)) {
      // do tokens transfer from payer to buyer
    }
  }
  ```

### requireRecipient
* ```ts
  function requireRecipient(name: Name): void
  ```
  Add the specified account to set of accounts to be notified about transaction

  **Example**
  ```ts
  @action('transfer')
  transferTokens(
    payer: Name,
    buyer: Name
  ): void {
    requireRecipient(payer);
    requireRecipient(buyer);
    // do tokens transfer from payer to buyer
  }
  ```

### currentReceiver
* ```ts
  function currentReceiver(): Name
  ```
  Get the current receiver of the action. The contract name should be returned in

  **Example**
  ```ts
  @contract('basic')
  class Basic extends Contract{

    @action('action')
    doAction(): void {
      const current = currentReceiver();
      // current will be equal to basic
    }
  }
  ```

### getSender

NOT CLEAR WHAT THIS FUNCTION DOES

### readActionData
* ```ts
  function readActionData(): u8[]
  ```
  Users interact with the chain by sending a transaction.A transaction is essentially an array of actions that are executed sequentially.
  
  `readActionData` allows you to read the data passed in for the current action. The data is packed, so you need to unpack it before using.
  
  In most cases you don't need to do it, because the framework will do it for you.

### unpackActionData
* ```ts
  function unpackActionData<T extends Packer>(): T
  ```
  Users interact with the chain by sending a transaction.A transaction is essentially an array of actions that are executed sequentially.
  
  `unpackActionData` allows you to read the unpacked data passed in for the current action.
  
  In most cases you don't need to do it, because the framework will do it for you.

### actionDataSize
* ```ts
  function actionDataSize(): u32
  ```
  Get the length of the current action's data field. This method is useful for dynamically sized actions
  
### publicationTime
* ```ts
  function publicationTime(): u64
  ```
  This function return the time in microseconds from 1970 of the publication time of the contract

  **Example**
  ```ts
  @action('action')
  doAction(): void {
    const time = publicationTime();
  }
  ```