---
description: Global scope
---

# Globals

The following global constants and functions are present alongside the standard library's classes.

## Constants

* ```ts
  const NaN: auto // f32 or f64
  ```
  Not a number as a 32-bit or 64-bit float depending on context. Compiles to a constant.

* ```ts
  const Infinity: auto // f32 or f64
  ```
  Positive infinity as a 32-bit or 64-bit float depending on context. Compiles to a constant.

## Functions

* ```ts
  function isNaN<T>(value: T): bool
  ```
  Tests if a 32-bit or 64-bit float is `NaN`.

* ```ts
  function isFinite<T>(value: T): bool
  ```
  Tests if a 32-bit or 64-bit float is finite, that is not `NaN` or +/-`Infinity`.

* ```ts
  function parseInt(str: string, radix?: i32): i64
  ```
  Parses a string to a 64-bit integer. Returns `0` on invalid inputs.

* ```ts
  function parseFloat(str: string): f64
  ```
  Parses a string to a 64-bit float. Returns `NaN` on invalid inputs.

## Builtins

The following builtins provide direct access to WebAssembly and compiler features. They form the low-level foundation of the standard library, while also being available for everyone to utilize where directly tapping into WebAssembly or the compiler is desired.

### Static type checks

By making use of the following special type checks, especially in generic contexts, untaken branches can be eliminated statically, leading to concrete WebAssembly functions that handle one type specificially.

* ```ts
  function isInteger<T>(value?: T): bool
  ```
  Tests if the specified type _or_ expression is of an integer type and not a reference. Compiles to a constant.

* ```ts
  function isFloat<T>(value?: T): bool
  ```
  Tests if the specified type _or_ expression is of a float type. Compiles to a constant.

* ```ts
  function isSigned<T>(value?: T): bool
  ```
  Tests if the specified type _or_ expression can represent negative numbers. Compiles to a constant.

* ```ts
  function isReference<T>(value?: T): bool
  ```
  Tests if the specified type _or_ expression is of a reference type. Compiles to a constant.

* ```ts
  function isString<T>(value?: T): bool
  ```
  Tests if the specified type _or_ expression can be used as a string. Compiles to a constant.

* ```ts
  function isArray<T>(value?: T): bool
  ```
  Tests if the specified type _or_ expression can be used as an array. Compiles to a constant.

* ```ts
  function isFunction<T>(value?: T): bool
  ```
  Tests if the specified type _or_ expression is of a function type. Compiles to a constant.

* ```ts
  function isNullable<T>(value?: T): bool
  ```
  Tests if the specified type _or_ expression is of a nullable reference type. Compiles to a constant.

* ```ts
  function isDefined(expression: auto): bool
  ```
  Tests if the specified expression resolves to a defined element. Compiles to a constant.

* ```ts
  function isConstant(expression: auto): bool
  ```
  Tests if the specified expression evaluates to a constant value. Compiles to a constant.

* ```ts
  function isManaged<T>(expression: auto): bool
  ```
  Tests if the specified type _or_ expression is of a managed type. Compiles to a constant. Usually only relevant when implementing custom collection-like classes.

#### Example of static type checking

```ts
function add<T>(a: T, b: T): T {
  return a + b // addition if numeric, string concatenation if a string
}

function add<T>(a: T, b: T): T {
  if (isString<T>()) { // eliminated if T is not a string
    return parseInt(a) + parseInt(b)
  } else { // eliminated if T is a string
    return a + b
  }
}
```

::: tip
If you are not going to use low-level WebAssembly in the foreseeable future, feel free to come back to the following paragraphs at a later time.
:::

### Utilities

* ```ts
  function sizeof<T>(): usize
  ```
  Determines the byte size of the respective _basic type_. Means: If `T` is a class type, the size of `usize`, the pointer type, is returned. To obtain the size of a class in memory, use `offsetof<T>()` instead. Compiles to a constant.

* ```ts
  function offsetof<T>(fieldName?: string): usize
  ```
  Determines the offset of the specified field within the given class type. If `fieldName` is omitted, this returns what could be interpreted as either the size of the class, or the offset where the next field would be located, before alignment. Compiles to a constant. The `fieldName` argument must be a compile-time constant `string` because there is no information about field names anymore at runtime. Therefore, the field's name must be known at the time the returned constant is computed.

* ```ts
  function alignof<T>(): usize
  ```
  Determines the alignment \(log2\) of the specified underlying _basic type_; i.e. If `T` is a class type, the alignment of `usize` is returned. Compiles to a constant.

* ```ts
  function assert<T>(isTrueish: T, message?: string): T
  ```
  Traps if the specified value is not true-ish, otherwise returns the non-nullable value. Like assertions in C, aborting the entire program if the expectation fails. Where desired, the `--noAssert` compiler option can be used to disable assertions in production.

* ```ts
  function instantiate<T>(...args: auto[]): T
  ```
  Instantiates a new instance of `T` using the specified constructor arguments.

* ```ts
  function changetype<T>(value: auto): T
  ```
  Changes the type of a value to another one. Useful for casting class instances to their pointer values and vice-versa.

* ```ts
  function idof<T>(): u32
  ```
  Obtains the computed unique id of a class type. Usually only relevant when allocating objects or dealing with RTTI externally.

* ```ts
  function nameof<T>(value?: T): string
  ```
  Returns the name of a given type.

* ```ts
  function bswap<T>(value: T): T
  ```
  Reverses the byte order of the specified integer.

* ```ts
  function bswap16<T>(value: T): T
  ```
  Reverses only the last 2 bytes regardless of the type argument.

### WebAssembly

#### Math

The following generic built-ins compile to WebAssembly instructions directly.

* ```ts
  function clz<T>(value: T): T
  ```
  <details><summary>Performs the sign-agnostic count leading zero bits operation on a 32-bit or 64-bit integer. All zero bits are considered leading if the value is zero.</summary>

  | T                                | Instruction
  |----------------------------------|-------------
  | i8, u8, i16, u16, i32, u32, bool | i32.clz
  | i64, u64                         | i64.clz
  </details>

* ```ts
  function ctz<T>(value: T): T
  ```
  <details><summary>Performs the sign-agnostic count tailing zero bits operation on a 32-bit or 64-bit integer. All zero bits are considered trailing if the value is zero.</summary>

  | T                                | Instruction
  |----------------------------------|-------------
  | i8, u8, i16, u16, i32, u32, bool | i32.ctz
  | i64, u64                         | i64.ctz
  </details>

* ```ts
  function popcnt<T>(value: T): T
  ```
  <details><summary>Performs the sign-agnostic count number of one bits operation on a 32-bit or 64-bit integer.</summary>

  | T                          | Instruction
  |----------------------------|-------------
  | i8, u8, i16, u16, i32, u32 | i32.popcnt
  | i64, u64                   | i64.popcnt
  | bool                       | *none*
  </details>

* ```ts
  function rotl<T>(value: T, shift: T): T
  ```
  <details><summary>Performs the sign-agnostic rotate left operation on a 32-bit or 64-bit integer.</summary>

  | T                | Instruction
  |------------------|-------------
  | i32, u32         | i32.rotl
  | i64, u64         | i64.rotl
  | i8, u8, i16, u16 | *emulated*
  | bool             | *none*
  </details>

* ```ts
  function rotr<T>(value: T, shift: T): T
  ```
  <details><summary>Performs the sign-agnostic rotate right operation on a 32-bit or 64-bit integer.</summary>

  | T                | Instruction
  |------------------|-------------
  | i32, u32         | i32.rotr
  | i64, u64         | i64.rotr
  | i8, u8, i16, u16 | *emulated*
  | bool             | *none*
  </details>

* ```ts
  function abs<T>(value: T): T
  ```
  <details><summary>Computes the absolute value of an integer or float.</summary>

  | T                       | Instruction
  |-------------------------|-------------
  | f32                     | f32.abs
  | f64                     | f64.abs
  | i8, i16, i32, i64       | *emulated*
  | u8, u16, u32, u64, bool | *none*
  </details>

* ```ts
  function max<T>(left: T, right: T): T
  ```
  <details><summary>Determines the maximum of two integers or floats. If either operand is <code>NaN</code>, returns <code>NaN</code>.</summary>

  | T                                          | Instruction
  |--------------------------------------------|-------------
  | f32                                        | f32.max
  | f64                                        | f64.max
  | i8, u8, i16, u16, i32, u32, i64, u64, bool | *emulated*
  </details>

* ```ts
  function min<T>(left: T, right: T): T
  ```
  <details><summary>Determines the minimum of two integers or floats. If either operand is <code>NaN</code>, returns <code>NaN</code>.</summary>

  | T                                          | Instruction
  |--------------------------------------------|-------------
  | f32                                        | f32.min
  | f64                                        | f64.min
  | i8, u8, i16, u16, i32, u32, i64, u64, bool | *emulated*
  </details>

* ```ts
  function ceil<T>(value: T): T
  ```
  <details><summary>Performs the ceiling operation on a 32-bit or 64-bit float.</summary>

  | T                                          | Instruction
  |--------------------------------------------|-------------
  | f32                                        | f32.ceil
  | f64                                        | f64.ceil
  | i8, u8, i16, u16, i32, u32, i64, u64, bool | *none*
  </details>

* ```ts
  function floor<T>(value: T): T
  ```
  <details><summary>Performs the floor operation on a 32-bit or 64-bit float.</summary>

  | T                                          | Instruction
  |--------------------------------------------|-------------
  | f32                                        | f32.floor
  | f64                                        | f64.floor
  | i8, u8, i16, u16, i32, u32, i64, u64, bool | *none*
  </details>

* ```ts
  function copysign<T>(x: T , y: T): T
  ```
  <details><summary>Composes a 32-bit or 64-bit float from the magnitude of <code>x</code> and the sign of <code>y</code>.</summary>

  | T   | Instruction
  |-----|-------------
  | f32 | f32.copysign
  | f64 | f64.copysign
  </details>

* ```ts
  function nearest<T>(value: T): T
  ```
  <details><summary>Rounds to the nearest integer <a href="https://en.wikipedia.org/wiki/Rounding#Round_half_to_even" target="_blank" rel="noopener noreferrer">half to even</a> of a 32-bit or 64-bit float.</summary>

  | T                                          | Instruction
  |--------------------------------------------|-------------
  | f32                                        | f32.nearest
  | f64                                        | f64.nearest
  | i8, u8, i16, u16, i32, u32, i64, u64, bool | *none*
  </details>

* ```ts
  function reinterpret<TTo>(value: auto): TTo
  ```
  <details><summary>Reinterprets the bits of the specified value as type <code>T</code>.</summary>

  | TTo      | Instruction
  |----------|-------------
  | i32, u32 | i32.reinterpret_f32
  | i64, u64 | i64.reinterpret_f64
  | f32      | f32.reinterpret_i32
  | f64      | f64.reinterpret_i64
  </details>

* ```ts
  function sqrt<T>(value: T): T
  ```
  <details><summary>Calculates the square root of a 32-bit or 64-bit float.</summary>

  | T   | Instruction
  |-----|-------------
  | f32 | f32.sqrt
  | f64 | f64.sqrt
  </details>

* ```ts
  function trunc<T>(value: T): T
  ```
  <details><summary>Rounds to the nearest integer towards zero of a 32-bit or 64-bit float.</summary>

  | T                                          | Instruction
  |--------------------------------------------|-------------
  | f32                                        | f32.trunc
  | f64                                        | f64.trunc
  | i8, u8, i16, u16, i32, u32, i64, u64, bool | *none*
  </details>

#### Memory

Similarly, the following built-ins emit WebAssembly instructions accessing or otherwise modifying memory.

::: tip NOTE
The `immOffset` and `immAlign` arguments, if provided, must be compile time constant values.
:::

* ```ts
  function load<T>(ptr: usize, immOffset?: usize): T
  ```
  <details><summary>Loads a value of the specified type from memory. Equivalent to dereferencing a pointer in other languages.</summary>

  | T        | Instruction  | If contextual type is i64
  |----------|--------------|---------------------------
  | i8       | i32.load8_s  | i64.load8_s
  | u8       | i32.load8_u  | i64.load8_u
  | i16      | i32.load16_s | i64.load16_s
  | u16      | i32.load16_u | i64.load16_u
  | i32      | i32.load     | i64.load32_s
  | u32      | i32.load     | i64.load32_u
  | i64, u64 | i64.load     | *n/a*
  | f32      | f32.load     | *n/a*
  | f64      | f64.load     | *n/a*
  | \<ref>   | i32/i64.load | *n/a*
  </details>

* ```ts
  function store<T>(ptr: usize, value: auto, immOffset?: usize): void
  ```
  <details><summary>Stores a value of the specified type to memory. Equivalent to dereferencing a pointer in other languages and assigning a value.</summary>

  | T        | Instruction   | If value is i64
  |----------|---------------|-----------------
  | i8, u8   | i32.store8    | i64.store8
  | i16, u16 | i32.store16   | i64.store16
  | i32, u32 | i32.store     | i64.store32
  | i64, u64 | i64.store     | *n/a*
  | f32      | f32.store     | *n/a*
  | f64      | f64.store     | *n/a*
  | \<ref>   | i32/i64.store | *n/a*
  </details>

* ```ts
  function memory.size(): i32
  ```
  Returns the current size of the memory in units of pages. One page is 64kb.

* ```ts
  function memory.grow(value: i32): i32
  ```
  Grows linear memory by a given unsigned delta of pages. One page is 64kb. Returns the previous size of the memory in units of pages or `-1` on failure.

  ::: warning
  Calling `memory.grow` where a memory manager is present might break it.
  :::

* ```ts
  function memory.copy(dst: usize, src: usize, n: usize): void
  ```
  Copies `n` bytes from `src` to `dst` . Regions may overlap. Emits the respective instruction if bulk-memory is enabled, otherwise ships a polyfill.

* ```ts
  function memory.fill(dst: usize, value: u8, n: usize): void
  ```
  Fills `n` bytes at `dst` with the given byte `value`. Emits the respective instruction if bulk-memory is enabled, otherwise ships a polyfill.

* ```ts
  function memory.repeat(dst: usize, src: usize, srcLength: usize, count: usize): void
  ```
  Repeats a sequence of bytes given as `src` with `srcLength` `count` times into destination `dst`.

* ```ts
  function memory.compare(lhs: usize, rhs: usize, n: usize): i32
  ```
  Compares the first `n` bytes of `left` and `right` and returns a value that indicates their relationship:
  - **Negative** value if the first differing byte in `lhs` is less than the corresponding byte in `rhs`.
  - **Positive** value if the first differing byte in `lhs` is greater than the corresponding byte in `rhs`.
  - **Zero​** if all `n` bytes of `lhs` and `rhs` are equal.

* ```ts
  function memory.data(size: i32, align?: i32): usize
  ```
  Gets a pointer to a zeroed static chunk of memory of the given size. Alignment defaults to `16`. Arguments must be compile-time constants.

* ```ts
  function memory.data<T>(values: T[], align?: i32): usize
  ```
  Gets a pointer to a pre-initialized static chunk of memory. Alignment defaults to the size of `T`. Arguments must be compile-time constants.

#### Control flow

* ```ts
  function select<T>(ifTrue: T, ifFalse: T, condition: bool): T
  ```
  Selects one of two pre-evaluated values depending on the condition. Differs from an `if/else` in that both arms are always executed and the final value is picked based on the condition afterwards. Performs better than an `if/else` only if the condition is random \(means: branch prediction is not going to perform well\) and both alternatives are cheap. It is also worth to note that Binaryen will do relevant optimizations like switching to a `select` automatically, so simply using a ternary `? :` may be preferable.

* ```ts
  function unreachable(): auto
  ```
  Emits an unreachable instruction that results in a runtime error \(trap\) when executed. Both a statement and an expression of any type. Beware that trapping in managed code will most likely lead to memory leaks or even break the program because it ends execution prematurely.


#### Constructing constant vectors

* ```ts
  function i8x16(a: i8, ... , p: i8): v128
  ```
  Initializes a 128-bit vector from sixteen 8-bit integer values. Arguments must be compile-time constants.

* ```ts
  function i16x8(a: i16, ..., h: i16): v128
  ```
  Initializes a 128-bit vector from eight 16-bit integer values. Arguments must be compile-time constants.

* ```ts
  function i32x4(a: i32, b: i32, c: i32, d: i32): v128
  ```
  Initializes a 128-bit vector from four 32-bit integer values. Arguments must be compile-time constants.

* ```ts
  function i64x2(a: i64, b: i64): v128
  ```
  Initializes a 128-bit vector from two 64-bit integer values. Arguments must be compile-time constants.

* ```ts
  function f32x4(a: f32, b: f32, c: f32, d: f32): v128
  ```
  Initializes a 128-bit vector from four 32-bit float values. Arguments must be compile-time constants.

* ```ts
  function f64x2(a: f64, b: f64): v128
  ```
  Initializes a 128-bit vector from two 64-bit float values. Arguments must be compile-time constants.

### Inline instructions

In addition to using the generic builtins above, most WebAssembly instructions can be written directly in AssemblyScript code. For example, the following is equivalent:

```ts
// generic builtin
v128.splat<i32>(42);

// inline instruction
i32x4.splat(42);
```