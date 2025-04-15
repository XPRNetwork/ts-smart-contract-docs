---
description: ECCPublicKey
---

# ECCPublicKey

Represents a public key object storing either a K1 or R1 key


## Constructor

```ts
  constructor(
    data: u8[] | null = null
  )
  ```

  `data` - Data bytes of public key

## Fields
```ts
  var data: u8[] | null;
  ```

  Data bytes of public key, null by default


## Instance Methods
```ts
  static function toString(): string
  ```
  Prints the hex representation of the public key bytes. Note this will not print prefixes like PUB_K1, those are client-side

## Static Equality methods
```ts
  static function eq(a: PublicKey, b: PublicKey): bool
  ```
  Checks that the two ECC public keys are equal

```ts
  static function neq(a: PublicKey, b: PublicKey): bool
  ```
  Checks that the two ECC public keys are not equal

```ts
  static function gt(a: PublicKey, b: PublicKey): bool
  ```
  Checks whether ECC public key a is larger than ECC public key b

```ts
  static function lt(a: PublicKey, b: PublicKey): bool
  ```
  Checks whether ECC public key a is less than ECC public key b