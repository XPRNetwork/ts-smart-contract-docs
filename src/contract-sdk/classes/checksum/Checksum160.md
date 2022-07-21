---
description: Checksum160
---

# Checksum160

Represents a 160 bit checksum (20 bytes)


## Constructor

* ```ts
  constructor(
    data: u8[] | null = null
  )
  ```

  `data` - byte array for initial value of checksum

## Fields
* ```ts
  var data: u8[] = undefined;
  ```
  The bytes in the checksum

## Instance Methods
* ```ts
  static function pack(): u8[]
  ```

  Returns serialized data bytes in the checksum

* ```ts
  static function unpack(data: u8[]): usize
  ```

  Tries to place the first 20 bytes from `data` into the checksum. Returns how many bytes were unpacked from data.

* ```ts
  static function toString(): string
  ```
  Prints the hex representation of the bytes in the checksum

## Static Equality methods
* ```ts
  static function eq(a: Checksum160, b: Checksum160): bool
  ```
  Checks that the two checksum bytes are equal

* ```ts
  static function neq(a: Checksum160, b: Checksum160): bool
  ```
  Checks that the checksum bytes are not equal