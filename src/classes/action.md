---
description: Defines API for querying action and sending action
---

# Action

Creates object for action that can be performed in blockchain.

## Constructor

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

  <sub>**Example:**</sub>
  ```ts
    import { PermissionLevel, Name, Action } from 'proton-tsc'

    const payer = new PermissionLevel(Name.fromString("payer"));

    const permissions = [payer];

    const contract = Name.fromString('test');
    const action_name = Name.fromString('pay');

    const data = { transfer: '1.0000 XPR' };

    const action = new Action(permissions, contract, action_name, data.pack());
    action.send();
  ```