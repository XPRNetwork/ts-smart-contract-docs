---
description: Debug
---

# Debug

## print

* ```ts
  function print(value: string): void
  ```
  ```ts
  function prints(value: string): void
  ```
  ```ts
  function printString(value: string): void
  ```
  All these functions are aliases. They print value as a string. 

  The function should be used inside the action method of the contract. 
  The result if the print will be visible in console when you run test with LOG_LEVEL=debug.

  <sub>**Example:**</sub>
  ```ts
  // ...
  @action('act')
  doAction(): void {
    print('Hello! I am print');
    // Output: 
    // DEBUG: prints_l Hello! I am print

    prints('Hello! I am prints');
    // Output
    // DEBUG: prints_l Hello! I am prints

    printString('Hello! I am printString');
    // Output
    // DEBUG: prints_l Hello! I am printString
  }
  ```

## printui

* ```ts
  function printui(value: u64): void
  ```
  Prints value as a 64 bit unsigned integer.

  The function should be used inside the action method of the contract. 
  The result if the print will be visible in console when you run test with LOG_LEVEL=debug.

  <sub>**Example:**</sub>
  ```ts
  // ...
  @action('act')
  doAction(): void {
    // NOTE: You need to define type of value explicitly. Otherwise you'll get an error during compilation
    printui(<u64>1e+18); 
    // Output: 
    // DEBUG: printui 1000000000000000000
  }
  ```

## printi

* ```ts
  function printi(value: i64): void
  ```
  Prints value as a 64 bit signed integer. 

  The function should be used inside the action method of the contract. 
  The result if the print will be visible in console when you run test with LOG_LEVEL=debug.

  <sub>**Example:**</sub>
  ```ts
  // ...
  @action('act')
  doAction(): void {
    // NOTE: You need to define type of value explicitly. Otherwise you'll get an error during compilation
    printi(<i64>-1e+18); 
    // Output: 
    // DEBUG: printi -1000000000000000000

    // Be careful with types:
    printi(<i64>10); // DEBUG: printi 10
    printui(<i64>10); // DEBUG: printui 10

    // But 
    printi(<i64>-10); // DEBUG: printi -10
    printui(<i64>-10); // DEBUG: printui 18446744073709551606
  }
  ```

## printI128
* ```ts
  function printI128(value: I128): void
  ```
  Prints value as a 128 bit signed integer

  The function should be used inside the action method of the contract. 
  The result if the print will be visible in console when you run test with LOG_LEVEL=debug.

  <sub>**Example:**</sub>
  ```ts
  // ...
  @action('act')
  doAction(): void {
    // NEED example here with proper type casting
  }
  ```

## printU128
* ```ts
  function printU128(value: U128): void
  ```
  Prints value as a 128 bit unsigned integer

  The function should be used inside the action method of the contract. 
  The result if the print will be visible in console when you run test with LOG_LEVEL=debug.

  <sub>**Example:**</sub>
  ```ts
  // ...
  @action('act')
  doAction(): void {
    // NEED example here with proper type casting
  }
  ```

## printsf
* ```ts
  function printsf(value: f32): void
  ```
  Prints value as single-precision floating point number

  The function should be used inside the action method of the contract. 
  The result if the print will be visible in console when you run test with LOG_LEVEL=debug.

  <sub>**Example:**</sub>
  ```ts
  // ...
  @action('act')
  doAction(): void {
    printsf(123.4);
    // Output 
    // DEBUG: printsf 123.4000015258789
    printsf(123.45);
    // Output
    // DEBUG: printsf 123.44999694824219
    printsf(123.456);
    // Output
    // DEBUG: printsf 123.45600128173828
  }
  ```

## printdf
* ```ts
  function printdf(value: f64): void
  ```
  Prints value as double-precision floating point number

  The function should be used inside the action method of the contract. 
  The result if the print will be visible in console when you run test with LOG_LEVEL=debug.

  <sub>**Example:**</sub>
  ```ts
  // ...
  @action('act')
  doAction(): void {
    printsdf(123.456789);
    // Output
    // DEBUG: printsdf 123.456789
    printsdf(123.45678912345679);
    // Output
    // DEBUG: printsdf 123.45678912345679
  }
  ```

## printqf
* ```ts
  function printqf(value: Float128): void
  ```
  Prints value as quadruple-precision floating point number

  The function should be used inside the action method of the contract. 
  The result if the print will be visible in console when you run test with LOG_LEVEL=debug.

  <sub>**Example:**</sub>
  ```ts
  // ...
  @action('act')
  doAction(): void {
    // NEED example here with proper type casting
  }
  ```

## printn
* ```ts
  function printn(value: Name): void
  ```
  Prints a 64 bit names as base32 encoded string

  The function should be used inside the action method of the contract. 
  The result if the print will be visible in console when you run test with LOG_LEVEL=debug.

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
* ```ts
  function printArray(data: u8[]): void
  ```
  ?? Not clear how the function should be used. No examples provided.

  The function should be used inside the action method of the contract. 
  The result if the print will be visible in console when you run test with LOG_LEVEL=debug.

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

    // ! Need to provide examples here
  }
  ```

## printHex
* ```ts
  function printHex(data: u8[]): void
  ```
  Prints hexidecimal data

  The function should be used inside the action method of the contract. 
  The result if the print will be visible in console when you run test with LOG_LEVEL=debug.

  NOT FULLY CLEAN WHAT THIS FUNCTION IS FOR. AND WHAT ARE EXAMPLES.

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
    // ! Need to provide examples here
  }
  ```