---
description: Represents a token quantity
---

# Asset

An asset is a representation of a token's amount, symbol and precision.

It is important to note that smart contracts view token amounts as raw values without decimals. Take for example XPR with precision 4. An asset representing `1.2345 XPR` would have an amount value of `12,345`

## Import

* ```ts
  import { Asset } from 'as-chain'
  ```

## Constructors

* ```ts
  constructor Asset(amount: u64 = 0, symbol: Symbol = new Symbol())
  ```

**Example:**
```ts
  const symbol = new Symbol(4, "XPR")
  const asset = new Asset(10000, symbol)
```

* ```ts
  static fromString(assetStr: string): Asset
  ```

**Example:**
```ts
  const asset = Asset.from("1.0000 XPR")
```

## Instance members

### Fields

* ```ts
  var amount: i64
  ```
  The amount of this asset.
  
  **Example:**

  1.0000 XPR = amount 10,000

  0.0010 XPR = amount 10

* ```ts
  var symbol: Symbol
  ```
  The symbol of this asset. Symbols store precision and symbol code of the asset.


### Methods

* ```ts
  function isAmountWithinRange(): bool
  ```
  Checks that the asset has not overflown or underflown

* ```ts
  function isValid(): bool
  ```
  Checks the Asset's isAmountWithinRange and that the symbol is valid

* ```ts
  function toString(): string
  ```
  Converts an asset to string.

  **Example**
  ```ts
  const symbol = new Symbol(6, "XUSDC")
  const asset = new Asset(1000000, symbol)
  console.log(asset.toString()) // 1.000000 XUSDC
  ```

## Static Math and Equality methods
* ```ts
  static function add(a: Asset, b: Asset): Asset
  ```
  Adds two assets with the same symbol and returns a new asset with amount a + b

  **Throws if:**
    - Asset symbols do not match
    - (a + b) underflows u64
    - (a + b) overflows u64

* ```ts
  static function sub(a: Asset, b: Asset): Asset
  ```
  Substracts two assets with the same symbol and returns a new asset with amount a - b

  **Throws if:**
    - Asset symbols do not match
    - (a - b) underflows u64
    - (a - b) overflows u64

* ```ts
  static function mul(a: Asset, b: Asset): Asset
  ```
  Multiplies two positive assets with the same symbol and returns a new asset with amount a * b

  **Throws if:**
    - Asset symbols do not match
    - a or b are negative
    - (a * b) overflows u64
    - (a - b) overflows

* ```ts
  static function div(a: Asset, b: Asset): Asset
  ```
  Divides two positive assets with the same symbol and returns a new asset with amount a / b

  **Throws if:**
    - Asset symbols do not match
    - a or b are negative

* ```ts
  static function eq(a: Asset, b: Asset): bool
  ```
  Checks that the amounts of two assets are equal

  **Throws if:**
    - Asset symbols do not match

* ```ts
  static function ne(a: Asset, b: Asset): bool
  ```
  Checks that the amounts of two assets are not equal

  **Throws if:**
    - Asset symbols do not match
  
* ```ts
  static function lt(a: Asset, b: Asset): bool
  ```
  Checks that the amounts of a is less than b

  **Throws if:**
    - Asset symbols do not match

* ```ts
  static function gt(a: Asset, b: Asset): bool
  ```
  Checks that the amounts of a is greater than b

  **Throws if:**
    - Asset symbols do not match

* ```ts
  static function lte(a: Asset, b: Asset): bool
  ```
  Checks that the amounts of a is less than or equal to b

  **Throws if:**
    - Asset symbols do not match

* ```ts
  static function gte(a: Asset, b: Asset): bool
  ```
  Checks that the amounts of a is greater than or equal to b

  **Throws if:**
    - Asset symbols do not match