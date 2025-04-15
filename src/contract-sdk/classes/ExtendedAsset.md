---
description: Represents a token quantity and a contract name
---

# ExtendedAsset

An extended asset is a representation of a token's amount, symbol, precision and a contract name.

## Constructors

```ts
  constructor(
    public quantity: Asset,
    public contract: Name
  )
  ```
    `quantity` -  The `Asset` object.
      
    `contract` - The `Name` object with for the contract
    
    <sub>**Example:**</sub>
    ```ts
      import { ExtendedAsset, Asset, Name } from 'proton-tsc'
      const asset = Asset.fromString("1.0000 XPR");
      const contract =  Name.fromString('mycontract');
      
      const extendedAsset = new ExtendedAsset(asset, contract)
    ```
 
----------------------------------------------------------------

```ts
  static fromInteger(v: i64, s: ExtendedSymbol): ExtendedAsset
  ```
    Creates new symbol from i64 number and `ExtendedSymbol`

    <sub>**Example:**</sub>
    ```ts
      const symbol = new Symbol("XPR", 4);
      const contract = Name.fromString('mycontract');
      const extendedSymbol = new ExtendedSymbol(symbol, contract);

      const extendedAsset = ExtendedAsset.fromInteger(1000, extendedSymbol);
    ```

### Instance Methods

```ts
  function getExtendedSymbol(): ExtendedSymbol
  ```
  Returns the `ExtendedSymbol` object based on the current asset

```ts
  function toString(): string
  ```
  Returns the extended asset as a string in format `quantity sign@contract`.
  Uses `toString` method on `Asset` object for the part before `@` sign.

  <sub>**Example:**</sub>
  ```ts
  const symbol = new Symbol("XUSDC", 6);
  const asset = new Asset(1000000, symbol);
  const contract = Name.fromString('mycontract');

  const extendedAsset = new ExtendedAsset(asset, contract)
  print(extendedAsset.toString()) // 1.000000 XUSDC@mycontract
  ```

## Static Methods
```ts
  static function add(a: ExtendedAsset, b: ExtendedAsset): ExtendedAsset
  ```
  Adds two extended assets with the same symbol and contract and returns a new extended assets with amount a + b

  **Throws if:**
    - Asset contracts do not match
    - Asset symbols do not match
    - (a + b) underflows i64
    - (a + b) overflows i64

```ts
  static function sub(a: ExtendedAsset, b: ExtendedAsset): ExtendedAsset
  ```
  Substracts two extended assets with the same symbol and contract and returns a new extended asset with amount a - b

  **Throws if:**
    - Asset contracts do not match
    - Asset symbols do not match
    - (a - b) underflows i64
    - (a - b) overflows i64

```ts
  static function eq(a: ExtendedAsset, b: ExtendedAsset): bool
  ```
  Checks that the amounts of two assets are equal
  
  **Throws if:**
    - Asset symbols do not match

```ts
  static function neq(a: ExtendedAsset, b: ExtendedAsset): bool
  ```
  Checks that the amounts of two assets are not equal and the contracts of two assets are not equal

  **Throws if:**
    - Asset symbols do not match
  
```ts
  static function lt(a: ExtendedAsset, b: ExtendedAsset): bool
  ```
  Checks that the amounts of a is less than b

  **Throws if:**
    - Asset contracts do not match
    - Asset symbols do not match

```ts
  static function gt(a: ExtendedAsset, b: ExtendedAsset): bool
  ```
  Checks that the amounts of a is greater than b

  **Throws if:**
    - Asset contracts do not match
    - Asset symbols do not match

```ts
  static function lte(a: Asset, b: Asset): bool
  ```
  Checks that the amounts of a is less than or equal to b

  **Throws if:**
    - Asset contracts do not match
    - Asset symbols do not match

```ts
  static function gte(a: Asset, b: Asset): bool
  ```
  Checks that the amounts of a is greater than or equal to b

  **Throws if:**
    - Asset contracts do not match
    - Asset symbols do not match