---
description: Current Time
---

## Current Time

```ts
  function currentTimePoint(): TimePoint
  ```
  Current time point of the blockchain

```ts
  function currentTime(): u64
  ```
  Current microseconds since epoch of the blockchain

```ts
  function currentTimeMs(): u64
  ```
  Current milliseconds since epoch of the blockchain

```ts
  function currentTimeSec(): u32
  ```
  Current seconds since epoch of the blockchain

## Time Helpers
```ts
  function seconds(s: i64): Microseconds
  ```
  Helper function to create a [Microseconds](../classes/time/Microseconds.md) object from a seconds input

```ts
  function milliseconds(s: i64): Microseconds
  ```
  Helper function to create a [Microseconds](../classes/time/Microseconds.md) object from a milliseconds input

```ts
  function minutes(s: i64): Microseconds
  ```
  Helper function to create a [Microseconds](../classes/time/Microseconds.md) object from a minutes input

```ts
  function hours(s: i64): Microseconds
  ```
  Helper function to create a [Microseconds](../classes/time/Microseconds.md) object from a hours input

```ts
  function days(s: i64): Microseconds
  ```
  Helper function to create a [Microseconds](../classes/time/Microseconds.md) object from a days input