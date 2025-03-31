---
description: Authentication
---

# Authentication

## requireAuth

```ts
  function requireAuth(name: Name): void
  ```
  This function verifies that the action caller has the permission of name@active. An error is thrown if the action caller does not satisfy this permission.

  The function should be used inside the action method of the contract. 

  <sub>**Example:**</sub>
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

## requireAuth2
```ts
  function requireAuth2(permissionLevel: PermissionLevel): void
  ```
  This function verifies that the action caller has the permission of specified permissionLevel. An error is thrown if the action caller does not satisfy this permission.

  The function should be used inside the action method of the contract. The behavior is almost the same as requireAuth

  <sub>**Example:**</sub>
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

## hasAuth
```ts
  function hasAuth(name: Name): bool
  ```
  This function verifies that the action caller has the permission of name@active.

  The function only preforms the check, but will not throw an error if name@active authorization is not satisfied
  
  If you need to perform check and throw is not satisfied, see `check` function

  <sub>**Example:**</sub>
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

## isAccount
```ts
  function isAccount(name: Name): bool
  ```
  The function only performs the check, but will not throw an error if the name is not an existing account

  The function only preforms the check, but will not unwinds all pending changes if the name is not an existing account

  If you need to perform check and throw is not satisfied, see `check` function

  <sub>**Example:**</sub>
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

## currentReceiver
```ts
  function currentReceiver(): Name
  ```
  Get the current receiver of the action. Will always be equal to the name of the current executing contract.

  <sub>**Example:**</sub>
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

## getSender
```ts
  function getSender(): Name
  ```
  This function return Name(0) when current action is not an inline action.

  Users interact with blockchain by submitting 1 transaction which has an array of actions. Those actions are called top-level actions, so they are not inline actions. However each of those top-level actions could send additional "inline" actions.
  
  If `Action A` on `Contract A` (top-level) sends `Action B` on `Contract B` (inline), calling `getSender()` inside `B` would return `Name(A)`

  If you called getSender inside a top-level action, you would get Name(0) to indicate its top-level 