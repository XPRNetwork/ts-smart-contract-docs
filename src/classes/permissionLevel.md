---
description: Permission Level
---

# PermissionLevel

Creates object for account and permission.

This object can be used to check account authentication or/and permission.

`permission` argument is optional. `active` permission will be used by default if no value is passed.

## Constructor

* ```ts
  constructor(
    public actor: Name = new Name(),
    public permission: Name = Name.fromString("active")
  )
  ```
  <sub>**Example:**</sub>
  ```ts
    import { PermissionLevel } from 'as-chain'

    const payer = new PermissionLevel(Name.fromString("payer")) 
    // specifies permission for payer@active

    const buyer = new PermissionLevel(Name.fromString("buyer"), Name.fromString("current")) 
    // specifies permission for buyer@current
  ```