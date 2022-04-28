---
description: Stores code, precision and a contract name.
---

# ExtendedSymbol

An extended symbol stores code, precision of the token amount and a contract name.

## Constructors

* ```ts
  constructor(
    public sym: Symbol,
    public contract: Name
  )
  ```
    `sym` -  The `Symbol` object.
  
    `contract` - The `Name` object with for the contract

    <sub>**Example:**</sub>
    ```ts
      import { ExtendedSymbol, Symbol, Name } from 'proton-tsc'

      const symbol = new ExtendedSymbol(new Symbol("XPR", 4), Name.fromString('mycontract'))
    ```
 
----------------------------------------------------------------

### Instance Methods

* ```ts
  toString(): string
  ```
  Returns the extended symbol as a string in format `precision,symbol@contract`
  Uses `toString` method on `Symbol` object for the part before `@` sign

  <sub>**Example:**</sub>
  ```ts
  const symbol = new ExtendedSymbol(new Symbol("XUSDC", 6), Name.fromString('mycontract'));
  print(symbol.toString()); // 6,XUSDC@mycontract
  ```

## Static Methods

* ```ts
  static function eq(a: ExtendedSymbol, b: ExtendedSymbol): bool
  ```
  Checks that symbols and contracts are equal for objects

  **Throws if:**
    - Symbols do not match or contracts do not match

* ```ts
  static function neq(a: ExtendedSymbol, b: ExtendedSymbol): bool
  ```
  Checks that symbols and contracts are not equal for objects

  **Throws if:**
    - Symbols are equal and contracts are equal
  
* ```ts
  static function lt(a: ExtendedSymbol, b: ExtendedSymbol): bool
  ```
  Checks that the symbol `a` is less than `b` and contract `a` is less than `b`

  **Throws if:**
    - Symbol `a` is greater or equal `b` or contract `a` is greater or equal `b`
