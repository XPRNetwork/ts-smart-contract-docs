---
description: Defines different helpers to build actions and contracts
---

# Helpers

## Classes

### ActionWrapperAct

Class to create object for inline action that can be performed in blockchain. This object can be reused in different top level actions of smart contracts.

#### Constructor

* ```ts
  constructor(
    public action: Name,
    public contract: Name,
    public permissionLevel: PermissionLevel
  )
  ```
  `action` - the name of the action to perform
  
  `contract` - the name of the contract for given action

  `permissionLevel` - permission to perform action 

**Example:**
```ts
  const action = Name.fromString('myaction');
  const contract = Name.fromString('mycontract');
  const payer = new PermissionLevel(Name.fromString("payer"));
  const inline = new ActionWrapperAct(action, contract, permissionLevel);
  // inline action can be send unsing `.send` method
  
```
#### Methods
* ```ts
  send <T extends Packer>(data: T): void
  ```
  Method sends the action to blockchain with given data
**Example:**
```ts
  const action = Name.fromString('pay');
  const contract = Name.fromString('balance');
  const payer = new PermissionLevel(Name.fromString("payer"));
  const inline = new ActionWrapperAct(action, contract, permissionLevel);
  const data = { transfer: '1.0000 XPR' };
  inline.send(data);
```

### ActionWrapper

Class is a friendly wrapper around `ActionWrapperAct` class. This class simplifies inline action creation for a given action name. The action can be created for different contracts and authorizations.

#### Constructor

* ```ts
  constructor(
    public action: Name = new Name()
  )
  ```
  `action` - the name of the action to perform

#### Methods
* ```ts
  static fromString(name: string): ActionWrapper
  ```
  The method creates a new instance of ActionWrapper with given name.

  **Example:**
  ```ts
  const action = ActionWrapper.fromString('myaction');
  ```

* ```ts
  act (
        contract: Name,
        permissionLevel: PermissionLevel
  ): ActionWrapperAct
  ```
  The method created the instance of inline action for a given contract name with given permission.

  **Example:**
  ```ts
  const actionWrap = ActionWrapper.fromString('myaction');
  const contract = Name.fromString('mycontract');
  const payer = new PermissionLevel(Name.fromString("payer"));
  const inline = actionWrap.act(contract, payer);
  // inline action can be send unsing `.send` method
  ```



### Contract

#### Constructor

* ```ts
  constructor(
    public receiver: Name,
    public firstReceiver: Name,
    public action: Name
  )
  ```

**Example:**
```ts

```

### Table

