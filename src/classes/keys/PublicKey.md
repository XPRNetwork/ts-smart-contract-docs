---
description: PublicKey
---

# PublicKey

Represents a public key object storing either a K1, R1 or WebAuthN key


## Constructor

* ```ts
  constructor(
    keyType: PublicKeyType = PublicKeyType.K1,
    data: u8[] | null = null
  )
  ```

  `keyType` - Type of public key

  `data` - Data bytes of public key

## Fields
* ```ts
  var keyType: PublicKeyType;
  ```

  Uses PublicKeyType enum where:
    ```ts
    enum PublicKeyType {
      K1 = 0,
      R1 = 1,
      WebAuthN = 2
    }
    ```

* ```ts
  var k1: ECCPublicKey | null;
  ```

  ECCPublicKey object is type is K1, null by default

* ```ts
  var r1: ECCPublicKey | null;
  ```

  ECCPublicKey object is type is R1, null by default

* ```ts
  var k1: ECCPublicKey | null;
  ```

  ECCPublicKey object is type is K1, null by default

* ```ts
  var webAuthN: WebAuthNPublicKey | null;
  ```

  WebAuthNPublicKey object is type is WebAuthN, null by default



## Instance Methods
* ```ts
  static function toString(): string
  ```
  Prints the hex representation of the public key bytes. Note this will not print prefixes like PUB_K1, those are client-side

## Static Equality methods
* ```ts
  static function eq(a: PublicKey, b: PublicKey): bool
  ```
  Checks that the two public keys are equal

* ```ts
  static function neq(a: PublicKey, b: PublicKey): bool
  ```
  Checks that the two public keys are not equal

* ```ts
  static function gt(a: PublicKey, b: PublicKey): bool
  ```
  Checks whether public key a is larger than public key b

* ```ts
  static function lt(a: PublicKey, b: PublicKey): bool
  ```
  Checks whether public key a is less than public key b