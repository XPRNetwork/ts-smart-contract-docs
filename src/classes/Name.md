---
description: Name
---

# Name

A Name is the core representation of addresses on the Proton blockchain.

For maximum performance, every Name can be serialized into an 8 byte u64. Thus, the possible character set in a Name are lowercase a-z characters, dots and number 1-5. A regex for this is `/^[a-zA-Z12345.]+$`. Additionally, the max length of a Name is 12 characters.

On Proton, users can freely register names with a minimum of 4 characters. Names with 3 characters or less are reserved by the protocol. Additionally, if a user owns an address like `account`, they can freely create `ab.account`, `1.account`, `a.v.account` and so on.

## Constructors

* ```ts
  constructor(
    n: u64 = 0
  )
  ```
    `n` -  The unsigned 64 bit integer representing the name

    <sub>**Example:**</sub>
    ```ts
      import { Name, print } from 'proton-tsc'

      const accountName = new Name(3607749778751881216)
      print(`${accountName}`) // "account1"
    ```
 
----------------------------------------------------------------

* ```ts
  static fromString(s: string): Name
  ```

    <sub>**Example:**</sub>
    ```ts
      const accountName = Name.fromString("account1")
    ```

### Instance Methods

* ```ts
  function suffix(): Name
  ```
  Returns the suffix of the name.

  <sub>**Example:**</sub>
  ```ts
  const loanToken = Name.fromString("loan.token")
  print(`${loanToken.suffix()}`) // token

  const account1 = Name.fromString("account1")
  print(`${accountName.suffix()}`) // account1
  ```

* ```ts
  function toString(): string
  ```
  Converts a name to string.

  <sub>**Example:**</sub>
  ```ts
  const accountName = Name.fromString("account1")
  print(accountName.toString()) // account1
  ```

## Static Methods
* ```ts
  static function eq(a: Name, b: Name): bool
  ```
  Checks that the two names are equal

  **Throws if:**
    - Name symbols do not match

* ```ts
  static function neq(a: Name, b: Name): bool
  ```
  Checks that the two names are not equal

  **Throws if:**
    - Name symbols do not match
  
* ```ts
  static function lt(a: Name, b: Name): bool
  ```
  Checks that the u64 value of a is less than b

* ```ts
  static function gt(a: Name, b: Name): bool
  ```
  Checks that the u64 value of a is greater than b

* ```ts
  static function lte(a: Name, b: Name): bool
  ```
  Checks that the u64 value of a is less than or equal to b

* ```ts
  static function gte(a: Name, b: Name): bool
  ```
  Checks that the u64 value of a is greater than or equal to b