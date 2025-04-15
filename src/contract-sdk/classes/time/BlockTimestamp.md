---
description: Time Point - Time Manipulation
---

# BlockTimestamp

Creates a block timestamp object

Rarely used, typically in blockchain block headers

## Constructors

```ts
  constructor(
    public slot: u32 = 0
  )
  ```
  `slot` - Blocks since epoch

<sub>**Example:**</sub>
```ts
  import { BlockTimestamp } from 'proton-tsc'

  const bt = new BlockTimestamp(5)
  // tp.slot == 5
```

```ts
  static fromTimePoint(t: TimePoint): BlockTimestamp
  ```

  Creates a BlockTimestamp object from a precise TimePoint

```ts
  static fromTimePointSec(t: TimePointSec): BlockTimestamp
  ```

  Creates a BlockTimestamp object from a precise TimePointSec

## Static Fields
```ts
  static blockIntervalMs: i32 = 500;
  ```
  Represents interval between each block

```ts
  static blockTimestampEpoch: i64 = 946684800000;
  ```
  Start of epoch

## Static Methods
```ts
  static function maximum(): BlockTimestamp
  ```

  Returns block timestamp of 0xffff (65535)

```ts
  static function min(): BlockTimestamp
  ```

  Returns block timestamp of 0

## Instance Methods
```ts
  function next(): BlockTimestamp
  ```

  Returns a new BlockTimestamp with slot incremented by 1
  
```ts
  function toTimePoint(): TimePoint
  ```

  Convert block timestamp to a TimePoint object
  
```ts
  function setTimePoint(t: TimePoint): void
  ```

  Sets the slot field using a time point

```ts
  function setTimePointSec(t: TimePointSec): void
  ```

  Sets the slot field using a time point sec

```ts
  function toString(): string
  ```

  Returns string representation of number of slots since epoch


## Static Equality methods
```ts
  static function eq(a: BlockTimestamp, b: BlockTimestamp): bool
  ```
  Checks that the slots of the two block timestamps are equal

```ts
  static function neq(a: BlockTimestamp, b: BlockTimestamp): bool
  ```
  Checks that the slots of the two block timestamps are not equal
  
```ts
  static function lt(a: BlockTimestamp, b: BlockTimestamp): bool
  ```
  Checks that the slot of a is less than b

```ts
  static function lte(a: BlockTimestamp, b: BlockTimestamp): bool
  ```
  Checks that the slot of a is less than or equal to b

```ts
  static function gt(a: BlockTimestamp, b: BlockTimestamp): bool
  ```
  Checks that the slot of a is greater than b

```ts
  static function gte(a: BlockTimestamp, b: BlockTimestamp): bool
  ```
  Checks that the slot of a is greater than or equal to b