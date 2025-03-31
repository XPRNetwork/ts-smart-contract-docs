---
description: Time Point - Time Manipulation
---

# TimePoint

Creates a time point object

## Constructor

```ts
  constructor(
    elapsed: i64 = 0
  )
  ```
  `elapsed` - Time in microseconds since epoch

<sub>**Example:**</sub>
```ts
  import { TimePoint } from 'proton-tsc'

  const tp = new TimePoint(5)
  // tp.elapsed.count() == 5
```

## Fields
```ts
  var elapsed: Microseconds
  ```
  Represents microseconds elapsed since epoch


## Instance Methods
```ts
  function timeSinceEpoch(): i64
  ```

  Time in microseconds elapsed since epoch

```ts
  function msSinceEpoch(): i64
  ```

  Time in milliseconds elapsed since epoch

```ts
  function secSinceEpoch(): u32
  ```

  Time in seconds elapsed since epoch

```ts
  function toString(): string
  ```

  Returns string representation of number of microseconds since epoch


## Static Math and Equality methods
```ts
  static function add(a: TimePoint, b: TimePoint): TimePoint
  ```
  Adds two time point values

```ts
  static function sub(a: TimePoint, b: TimePoint): TimePoint
  ```
  Substracts two time point values

```ts
  static function mul(a: TimePoint, b: TimePoint): TimePoint
  ```
  Multiplies two time point values

```ts
  static function div(a: TimePoint, b: TimePoint): TimePoint
  ```
  Divides two time point values

```ts
  static function eq(a: TimePoint, b: TimePoint): bool
  ```
  Checks that the amounts of two time point values are equal

```ts
  static function neq(a: TimePoint, b: TimePoint): bool
  ```
  Checks that the amounts of two time point values are not equal
  
```ts
  static function lt(a: TimePoint, b: TimePoint): bool
  ```
  Checks that the microseconds since epoch of a is less than b

```ts
  static function lte(a: TimePoint, b: TimePoint): bool
  ```
  Checks that the microseconds since epoch of a is less than or equal to b

```ts
  static function gt(a: TimePoint, b: TimePoint): bool
  ```
  Checks that the microseconds since epoch of a is greater than b

```ts
  static function gte(a: TimePoint, b: TimePoint): bool
  ```
  Checks that the microseconds since epoch of a is greater than or equal to b