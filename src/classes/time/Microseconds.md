---
description: Microseconds - Time Manipulation
---

# Microseconds

Creates a microseconds time object

## Constructor

* ```ts
  constructor(
    public _count: i64 = 0
  )
  ```
  `_count` - Time in microseconds

<sub>**Example:**</sub>
```ts
  import { Microseconds } from 'proton-tsc'

  const ms5 = new Microseconds(5)
  // ms5.count() == 5
```

## Static Methods
* ```ts
  static function maximum(): Microseconds
  ```

  Returns maximum microseconds of 0x7FFFFFFFFFFFFFFF (9223372036854775807)

## Instance Methods
* ```ts
  function toTimePoint(): TimePoint
  ```

  Converts microseconds to a TimePoint object

* ```ts
  function toSeconds(): i64
  ```

  Converts microseconds to seconds

* ```ts
  function count(): i64
  ```

  Helper getter method to return internal _count

* ```ts
  function toString(): string
  ```

  Returns string representation of number of microseconds


## Static Math and Equality methods
* ```ts
  static function add(a: Microseconds, b: Microseconds): Microseconds
  ```
  Adds two microsecond values

* ```ts
  static function sub(a: Microseconds, b: Microseconds): Microseconds
  ```
  Substracts two microsecond values

* ```ts
  static function mul(a: Microseconds, b: Microseconds): Microseconds
  ```
  Multiplies two microsecond values

* ```ts
  static function div(a: Microseconds, b: Microseconds): Microseconds
  ```
  Divides two microsecond values

* ```ts
  static function eq(a: Microseconds, b: Microseconds): bool
  ```
  Checks that the amounts of two microsecond values are equal

* ```ts
  static function neq(a: Microseconds, b: Microseconds): bool
  ```
  Checks that the amounts of two microsecond values are not equal
  
* ```ts
  static function lt(a: Microseconds, b: Microseconds): bool
  ```
  Checks that the microseconds of a is less than b

* ```ts
  static function lte(a: Microseconds, b: Microseconds): bool
  ```
  Checks that the microseconds of a is less than or equal to b

* ```ts
  static function gt(a: Microseconds, b: Microseconds): bool
  ```
  Checks that the microseconds of a is greater than b

* ```ts
  static function gte(a: Microseconds, b: Microseconds): bool
  ```
  Checks that the microseconds of a is greater than or equal to b