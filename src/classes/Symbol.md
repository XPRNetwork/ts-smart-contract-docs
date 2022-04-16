---
description: Stores code and precision.
---

# Symbol

A symbol store code and precision of the token amount.

It is important to note that smart contracts view token amounts as raw values without decimals. Take for example XPR with precision 4. A symbol representing `1.2345 XPR` would have an amount value of `12345`.


## Constructors

* ```ts
  constructor(
    name: string="", 
    precision: u8=0
  )
  ```
    `name` -  The symbol code of the token.
  
      Example: XPR 

    `precision` - The number that indicates the precision for current amount 
    
      Example: 4 

    <sub>**Example:**</sub>
    ```ts
      import { Symbol } from 'proton-tsc'

      const symbol = new Symbol("XPR", 4)
    ```
 
----------------------------------------------------------------

* ```ts
  static fromU64(value: u64): Symbol
  ```
    Creates new symbol from u64 number

    <sub>**Example:**</sub>
    ```ts
      const symbol = Symbol.fromU64(1380997124)
      // XPR,4
    ```

### Instance Methods

* ```ts
  fromU64(value: u64): Symbol
  ```
  Creates new symbol from u64 number. 

  <sub>**Example:**</sub>
  ```ts
  const symbol = new Symbol("XUSDC", 6);
  const new_symbold = symbol.fromU64(1380997124);
  print(symbol.toString()); // 4,XPR
  ```

* ```ts
  getSymbolString(): string
  ```
  Returns the symbol code

  <sub>**Example:**</sub>
  ```ts
  const symbol = new Symbol("XUSDC", 6);
  print(symbol.getSymbolString()); // XUSDC
  ```

* ```ts
  code(): u64
  ```
  Returns the code of the symbol as u64 number

  <sub>**Example:**</sub>
  ```ts
  const symbol = new Symbol("XUSDC", 6);
  printui(symbol.code()); // 288909120856,
  ```

* ```ts
  precision(): u8
  ```
  Returns the precision of the symbol

  <sub>**Example:**</sub>
  ```ts
  const symbol = new Symbol("XUSDC", 6);
  printui(symbol.precision()); // 6,
  ```

* ```ts
  isValid(): bool
  ```
  Checks the symbol is valid

* ```ts
  toString(): string
  ```
  Returns the symbol as a string in format `precision,symbol`

  <sub>**Example:**</sub>
  ```ts
  const symbol = new Symbol("XUSDC", 6);
  print(symbol.toString()); // 6,XUSDC
  ```

## Static Methods

* ```ts
  static function eq(a: Symbol, b: Symbol): bool
  ```
  Checks that two symbols are equal

  **Throws if:**
    - Symbols do not match

* ```ts
  static function neq(a: Symbol, b: Symbol): bool
  ```
  Checks that two symbols are not equal

  **Throws if:**
    - Symbols are equal
  
* ```ts
  static function lt(a: Symbol, b: Symbol): bool
  ```
  Checks that the symbol a is less than b

  **Throws if:**
    - Symbols a is greater or equal b
