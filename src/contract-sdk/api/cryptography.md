---
description: Cryptography
---

## Recover Key

* ```ts
  function recoverKey(digest: Checksum256, sig: Signature): PublicKey
  ```
  Recover public key from a digest and signature

* ```ts
  function assertRecoverKey(digest: Checksum256, sig: Signature, pub: PublicKey): void
  ```
  Throws if the key recovered the digest and signature does not match the provided public key

## Hash Functions

### SHA-256
* ```ts
  function sha256(data: u8[]): Checksum256
  ```
  Hashes the data byte array using SHA-256 to create a checksum

* ```ts
  function assertSha256(data: u8[], hash: Checksum256): void
  ```
  Throws if the digest of the data array does not match the provided checksum

### SHA-512
* ```ts
  function sha512(data: u8[]): Checksum512
  ```
  Hashes the data byte array using SHA-512 to create a checksum

* ```ts
  function assertSha512(data: u8[], hash: Checksum512): void
  ```
  Throws if the digest of the data array does not match the provided checksum
  
### SHA-1
* ```ts
  function sha1(data: u8[]): Checksum160
  ```
  Hashes the data byte array using SHA-1 to create a checksum

* ```ts
  function assertSha1(data: u8[], hash: Checksum160): void
  ```
  Throws if the digest of the data array does not match the provided checksum

### RIPEMD-160
* ```ts
  function ripemd160(data: u8[]): Checksum160
  ```
  Hashes the data byte array using RIPEMD-160 to create a checksum

* ```ts
  function assertRipemd160(data: u8[], hash: Checksum160): void
  ```
  Throws if the digest of the data array does not match the provided checksum
