---
description: Debug
---

# Print

Print functions are the XPR Network equivalent of `console.log` and will be visible in console when you run tests with LOG_LEVEL=debug

## print

```ts
  function print(value: string): void
  ```
```ts
  function prints(value: string): void
  ```
```ts
  function printString(value: string): void
  ```
  All these functions are aliases. 
  
  Prints value as a string. 

  <sub>**Example:**</sub>
  ```ts
  @action('act')
  doAction(): void {
    print('Hello! I am print');
    prints('Hello! I am prints');
    printString('Hello! I am printString');

    // Output: 
    // DEBUG: prints_l Hello! I am print
    // DEBUG: prints_l Hello! I am prints
    // DEBUG: prints_l Hello! I am printString
  }
  ```

## printui

```ts
  function printui(value: u64): void
  ```
  Prints value as a 64 bit unsigned integer.

  <sub>**Example:**</sub>
  ```ts
  @action('act')
  doAction(): void {
    // NOTE: You need to define type of value explicitly. Otherwise you'll get an error during compilation
    printui(<u64>1e+18); 
    printui(<i64>-10);

    // Output: 
    // DEBUG: printui 1000000000000000000
    // DEBUG: printui 18446744073709551606
  }
  ```

## printi

```ts
  function printi(value: i64): void
  ```
  Prints value as a 64 bit signed integer. 

  <sub>**Example:**</sub>
  ```ts
  @action('act')
  doAction(): void {
    // NOTE: You need to define type of value explicitly. Otherwise you'll get an error during compilation
    printi(<i64>-1e+18);
    printi(<i64>10);
    printi(<i64>-10);

    // Output: 
    // DEBUG: printi -1000000000000000000
    // DEBUG: printi 10
    // DEBUG: printi -10
  }
  ```

## printI128
```ts
  function printI128(value: I128): void
  ```
  Prints value as a 128 bit signed integer

  <sub>**Example:**</sub>
  ```ts
  // ...
  @action('act')
  doAction(): void {
    // NOTE: You need to define type of value explicitly. Otherwise you'll get an error during compilation
    printI128(I128.from(100000));
    printI128(I128.from(10));
    printI128(I128.from(-10));

    // Output: 
    // DEBUG: printi128 100000
    // DEBUG: printi128 10
    // DEBUG: printi128 18446744073709551606
  }
  ```

## printU128
```ts
  function printU128(value: U128): void
  ```
  Prints value as a 128 bit unsigned integer

  <sub>**Example:**</sub>
  ```ts
  @action('act')
  doAction(): void {
    // NOTE: You need to define type of value explicitly. Otherwise you'll get an error during compilation
    printU128(I128.from(100000));
    printU128(I128.from(10));
    printU128(I128.from(-10));

    // Output: 
    // DEBUG: printi128 100000
    // DEBUG: printi128 10
    // DEBUG: printi128 18446744073709551606
  }
  ```

## printsf
```ts
  function printsf(value: f32): void
  ```
  Prints value as single-precision floating point number

  Note that floats are imprecise due to precision loss.

  <sub>**Example:**</sub>
  ```ts
  // ...
  @action('act')
  doAction(): void {
    printsf(123.4);
    printsf(123.45);
    printsf(123.456);

    // Output 
    // DEBUG: printsf 123.4000015258789
    // DEBUG: printsf 123.44999694824219
    // DEBUG: printsf 123.45600128173828
  }
  ```

## printdf
```ts
  function printdf(value: f64): void
  ```
  Prints value as double-precision floating point number

  Note that floats are imprecise due to precision loss.

  <sub>**Example:**</sub>
  ```ts
  // ...
  @action('act')
  doAction(): void {
    printdf(123.456789);
    printdf(123.45678912345679);

    // Output
    // DEBUG: printsdf 123.456789
    // DEBUG: printsdf 123.45678912345679
  }
  ```

## printqf
```ts
  function printqf(value: Float128): void
  ```
  Prints value as quadruple-precision floating point number

  <sub>**Example:**</sub>
  ```ts
  // ...
  @action('act')
  doAction(): void {
    printqf(new Float128(1000, 70));
    printqf(new Float128(4000, 30));

    // Output
    // DEBUG: printsqf 12096
    // DEBUG: printsqf 12272
  }
  ```

## printn
```ts
  function printn(value: Name): void
  ```
  Prints a 64 bit names as base32 encoded string

  <sub>**Example:**</sub>
  ```ts
  // ...
  @action('act')
  doAction(): void {
    printn(Name.fromString('contract'))

    // Output
    // DEBUG: printn contract
  }
  ```

## printArray
```ts
  function printArray(data: u8[]): void
  ```
  Prints byte array as string.

  <sub>**Example:**</sub>
  ```ts
  // ...
  @action('act')
  doAction(): void {
    printArray([
        0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64
    ])

    // Output:
    // DEBUG: prints Hello world
  }
  ```

## printHex
```ts
  function printHex(data: u8[]): void
  ```
  Prints bytes array as hex

  <sub>**Example:**</sub>
  ```ts
  // ...
  @action('act')
  doAction(): void {
    printHex([
        0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64
    ])

    // Output
    // DEBUG: printhex 48656c6c6f20776f726c64
  }
  ```