---
description: Signature
---

# Signature

Represents a blockchain signature (66 bytes)


## Constructor

```ts
  constructor()
  ```
  Creates an empty signature, data is added through `unpack` function.

## Fields
```ts
  var data: u8[] | null;
  ```

  Data bytes of signature, null by default


## Instance Methods
```ts
  static function pack(): u8[]
  ```

  Returns serialized data bytes in the signature

```ts
  static function unpack(data: u8[]): usize
  ```

  Sets first 66 bytes of data array as the signature data.
  Returns the position of the decoder

```ts
  static function toString(): string
  ```
  Prints the hex representation of the bytes in the signature

## Static Equality methods
```ts
  static function eq(a: Signature, b: Signature): bool
  ```
  Checks that the two signature bytes are equal

```ts
  static function neq(a: Signature, b: Signature): bool
  ```
  Checks that the signature bytes are not equal