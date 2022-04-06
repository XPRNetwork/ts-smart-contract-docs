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
  // specifies permission for payer@active

  const buyer = new PermissionLevel(Name.fromString("buyer"), Name.fromString("current")) 
  // specifies permission for buyer@current
```

### Action

Creates object for action that can be performed in blockchain.

#### Constructor

* ```ts
  constructor(
    public authorization: PermissionLevel[] = [],
    public account: Name = new Name(),
    public name: Name = new Name(),
    public data: u8[] = [],
  )
  ```
  `authorization` - a list of authorizations provided to action

  `account` - the name of the contract that will be called in action

  `name` - the name of the action in the contract that will be called
  
  `data` - parameters to pass to action

**Example:**
```ts
  const payer = new PermissionLevel(Name.fromString("payer"));

  const permissions = [payer];

  const contract = Name.fromString('test');
  const action_name = Name.fromString('pay');

  const data = { transfer: '1.0000 XPR' };

  const action = new Action(permissions, contract, action_name, data.pack());
  action.send();

```

## Functions

### requireAuth

* ```ts
  function requireAuth(name: Name): void
  ```
  This function verifies that the action caller has the permission of name@active. An error is thrown if the action caller does not satisfy this permission.

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
  This function verifies that the action caller has the permission of specified permissionLevel. An error is thrown if the action caller does not satisfy this permission.

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
  This function verifies that the action caller has the permission of name@active.

  The function only preforms the check, but will not throw an error if name@active authorization is not satisfied
  
  If you need to perform check and throw is not satisfied, see `check` function

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
  The function only performs the check, but will not throw an error if the name is not an existing account

  The function only preforms the check, but will not unwinds all pending changes if the name is not an existing account

  If you need to perform check and throw is not satisfied, see `check` function

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
  Get the current receiver of the action. Will always be equal to the name of the current executing contract.

  **Example**
  ```ts
  @contract('basic')
  class Basic extends Contract{

    @action('action')
    doAction(): void {
      const current = currentReceiver();
      // current will be equal to Name.fromString("basic")
    }
  }
  ```

### getSender
* ```ts
  function function getSender(): Name
  ```
  This function return Name(0) when current action is not an inline action.

  Users interact with blockchain by submitting 1 transaction which has an array of actions. Those actions are called top-level actions, so they are not inline actions. However each of those top-level actions could send additional "inline" actions.
  
  If `Action A` on `Contract A` (top-level) sends `Action B` on `Contract B` (inline), calling `getSender()` inside `B` would return `Name(A)`

  If you called getSender inside a top-level action, you would get Name(0) to indicate its top-level 

### readActionData
* ```ts
  function readActionData(): u8[]
  ```
  Users interact with the chain by sending a transaction.A transaction is essentially an array of actions that are executed sequentially.
  
  `readActionData` allows you to read the data passed in for the current action. The data is packed, so you need to unpack it before using.
  
  In most cases you don't need to do it, as the framework will handle it for you automatically. And you'll get unpacked values as action arguments

### unpackActionData
* ```ts
  function unpackActionData<T extends Packer>(): T
  ```
  Users interact with the chain by sending a transaction.A transaction is essentially an array of actions that are executed sequentially.
  
  `unpackActionData` allows you to read the unpacked data passed in for the current action.
  
  In most cases you don't need to do it, as the framework will handle it for you automatically. And you'll get unpacked values as action arguments

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