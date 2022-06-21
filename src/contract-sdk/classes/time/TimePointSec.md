---
description: Time Point - Time Manipulation
---

# TimePointSec

Creates a time point seconds object

## Constructors

* ```ts
  constructor(
    public utcSeconds: u32 = 0
  )
  ```
  `utcSeconds` - Time in seconds since epoch

<sub>**Example:**</sub>
```ts
  import { TimePointSec } from 'proton-tsc'

  const tp = new TimePointSec(5)
  // tp.utcSeconds == 5
```

* ```ts
  static fromTimePoint(t: TimePoint): TimePointSec
  ```

  Creates a TimePointSec object from a precise TimePoint

## Static Methods
* ```ts
  static function maximum(): TimePointSec
  ```

  Returns maximum seconds of 0xffffffff (4294967295)

* ```ts
  static function min(): TimePointSec
  ```

  Returns minimum seconds of 0

## Instance Methods
* ```ts
  function secSinceEpoch(): u32
  ```

  Time in seconds elapsed since epoch

* ```ts
  function toString(): string
  ```

  Returns string representation of number of microseconds since epoch


## Static Math and Equality methods
* ```ts
  static function add(a: TimePoint, b: TimePoint): TimePoint
  ```
  Adds two time point values

* ```ts
  static function sub(a: TimePoint, b: TimePoint): TimePoint
  ```
  Substracts two time point values

* ```ts
  static function mul(a: TimePoint, b: TimePoint): TimePoint
  ```
  Multiplies two time point values

* ```ts
  static function div(a: TimePoint, b: TimePoint): TimePoint
  ```
  Divides two time point values

* ```ts
  static function eq(a: TimePoint, b: TimePoint): bool
  ```
  Checks that the amounts of two time point values are equal

* ```ts
  static function neq(a: TimePoint, b: TimePoint): bool
  ```
  Checks that the amounts of two time point values are not equal
  
* ```ts
  static function lt(a: TimePoint, b: TimePoint): bool
  ```
  Checks that the microseconds since epoch of a is less than b

* ```ts
  static function lte(a: TimePoint, b: TimePoint): bool
  ```
  Checks that the microseconds since epoch of a is less than or equal to b

* ```ts
  static function gt(a: TimePoint, b: TimePoint): bool
  ```
  Checks that the microseconds since epoch of a is greater than b

* ```ts
  static function gte(a: TimePoint, b: TimePoint): bool
  ```
  Checks that the microseconds since epoch of a is greater than or equal to b