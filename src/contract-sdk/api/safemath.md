---
description: SafeMath
---

# SafeMath

This is an utility class with a set of static methods to perform mathematical operations without overflow.

### add
* ```ts
  static add(x: u64, y: u64): u64
  ```
  Returns the result of adding one u64 number to another

  **Throws if:**
    - If the result overflows the u64 type

  <sub>**Example:**</sub>
  ```ts
  import { SafeMath } from 'proton-tsc'
  
  const a = SafeMath.add(<u64>4398046836870, <u64>4398046836871);
  // Result: 8796093673741

  const b = SafeMath.add(<u64>18446744073709551615, <u64>1);
  // Error: SafeMath Add Overflow
  ```

### sub
* ```ts
  static sub(x: u64, y: u64): u64
  ```
  Returns the result of substracting `y` from `x`

  **Throws if:**
    - If the result is less than zero

  <sub>**Example:**</sub>
  ```ts
  import { SafeMath } from 'proton-tsc'
  
  const a = SafeMath.sub(<u64>4398046836871, <u64>4398046836870);
  // Result: 1

  const b = SafeMath.add(<u64>4398046836870, <u64>4398046836871);
  // Error: SafeMath Sub Overflow
  ```

### mul
* ```ts
  static mul(x: u64, y: u64): u128
  ```
  Returns the result of multiplication `x` by `y`

  **Throws if:**
    - If the division of the result to `y` is not equal to `x` 

  <sub>**Example:**</sub>
  ```ts
  import { SafeMath } from 'proton-tsc'
  
  const a = SafeMath.mul(<u64>18446744073709551615, <u64>18446744073709551615);
  // result is 40282366920938463463374607431768211455
  ```

### div
* ```ts
  static div(x: u64, y: u64): u64
  ```
  Returns the result of division `x` to `y`

  **Throws if:**
    - If `y` is equal to zero

  <sub>**Example:**</sub>
  ```ts
  import { SafeMath } from 'proton-tsc'
  
  const a = SafeMath.div(<u64>4398046836870, <u64>4);
  // result: 1099511709217

  const a = SafeMath.div(<u64>4398046836870, <u64>0);
  // error: SafeMath Div Overflow
  ```


