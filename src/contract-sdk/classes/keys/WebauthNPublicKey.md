---
description: WebAuthNPublicKey
---

# WebAuthNPublicKey

Represents a public key object storing either a WebAuthN key


## Constructor

```ts
  constructor()
  ```
  Creates an empty checksum, data is added through `unpack` function.

## Fields
```ts
  var key: ECCPublicKey | null;
  ```

  ECC public key storing data bytes, null by default

```ts
  var userPresence: UserPresence;
  ```

  User presence of key, possible values:
    ```ts
    enum UserPresence {
      USER_PRESENCE_NONE = 0,
      USER_PRESENCE_PRESENT = 1,
      USER_PRESENCE_VERIFIED = 2,
    }
    ```

```ts
  var rpid: string = "";
  ```

  Resource provider ID

## Instance Methods
```ts
  static function pack(): u8[]
  ```

  Serializes the ECC key data, userPresence and rpid into bytes.

```ts
  static function unpack(data: u8[]): usize
  ```
  Decodes and sets the bytes into ECC key data, userPresence and rpid. Returns 0.

## Static Equality methods
```ts
  static function eq(a: WebAuthNPublicKey, b: WebAuthNPublicKey): bool
  ```
  Checks that the two web auth public keys are equal

```ts
  static function neq(a: WebAuthNPublicKey, b: WebAuthNPublicKey): bool
  ```
  Checks that the two web auth public keys are not equal

```ts
  static function gt(a: WebAuthNPublicKey, b: WebAuthNPublicKey): bool
  ```
  Checks whether web auth a is larger than ECC public key b

```ts
  static function lt(a: WebAuthNPublicKey, b: WebAuthNPublicKey): bool
  ```
  Checks whether web auth a is less than ECC public key b