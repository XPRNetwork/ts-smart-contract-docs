---
description: Basic AssemblyScript concepts.
---

# Concepts

An overview of basic AssemblyScript concepts.

## Sandboxed execution

One of WebAssembly's unique features is that a module cannot access external resources without explicitly importing them, providing strong security guarantees by default. As such, you do not have access to the internet inside your code.

## Language

XPR Network uses AssemblyScript which is very similar to TypeScript with largely compatible syntax and semantics. As such, many of the concepts known from TypeScript apply to XPR Network as well, but not all TypeScript features map well to ahead of time compilation or WebAssembly's so far supported feature set. 

## Strictly typed

While TypeScript has types, its type system is able to describe many of JavaScript's dynamic features. TypeScript is a superset / a type checker on top of JavaScript after all. On the contrary, AssemblyScript is compiled statically ahead of time. The following are some common differences:


**No `any` or `undefined` types:**

```ts
❌
function foo(a?) {}
function foo(a: any) {}

✅
function foo(a: i32 = 0): void {}
function foo(a: i32 | null = null): i32 {
  return 1;
}
```

**No union types:**
```ts
❌
function foo(a: i32 | string): void {}

✅
function foo<T>(a: T): void {}
```

**Objects must be typed, using a `Map` or `class`:**
```ts
❌
var a = {}
a.prop = "hello world"

✅
var a = new Map<string,string>()
a.set("prop", "hello world")

✅
class A {
  constructor(public prop: string) {}
}
var a = new A("hello world")
```

**Nullability checks are limited to locals:**
```ts
❌
function doSomething(foo: Foo): void {
  if (foo.something) {
    foo.something.length // fails
  }
}

✅
function doSomething(foo: Foo): void {
  const something = foo.something
  if (something) {
    something.length // works
  }
}
```

**Triple equal checks strict reference equality:**
```ts
❌
function doSomething(foo: Foo): void {
  const a = "abc"
  const b = "def"
  check(a === b, "will fail")
}

✅
function doSomething(foo: Foo): void {
  const a = "abc"
  const b = "def"
  check(a == b, "will pass")
}
```


## Language features

| Feature                                           | What to expect?
|---------------------------------------------------|-----------------
| 🐤&nbsp;**Functional**
| OOP                                               | Mostly compatible. Access modifiers like `private` and `protected` are not currently strictly enforced. There is support for interfaces but they must specify getters instead of fields.
| Standard&nbsp;library                                  | Full Standard library compatability can be seen [here](https://github.com/AssemblyScript/assemblyscript/wiki/Status-and-Roadmap#standard-library-compatibility)
| Generics                                          | Generics are compiled as monomorphized templates for now and can be specialized with static type checks. Constraining `extends XY` clauses are not yet enforced.
||
| 🐣&nbsp;**Limited**
| Union&nbsp;types                                  | Union types are not supported by design, except for nullable class types. There is no `any` type. A viable alternative is to use generics specialized with static type checks to achieve a similar effect.
| Symbols                                           | Symbols are implemented in the standard library, but don't have deep compiler integration yet.
| Object literals                                   | Object literals can be used in places where the current type is a bare class, then corresponding to an instantiation of the class.
| JSON                                              | No native support for JSON. Suggested library: [assemblyscript-json](https://github.com/nearprotocol/assemblyscript-json)
| RegExp                                            | No native support for RegExp. Suggested library: [assemblyscript-regex](https://github.com/ColinEberhardt/assemblyscript-regex)
| Date                                              | No native support for Date. See [Blockchain Time](./api/currentTime.md). Optional library: [assemblyscript-temporal](https://github.com/ColinEberhardt/assemblyscript-temporal).
||
| 🥚&nbsp;**Not&nbsp;implemented**
| Closures                                          | Captures of local variables are not yet supported and would be best implemented on top of future WebAssembly features, also to avoid inventing a custom ABI. Can be worked around by using a global variable instead (does not need to be captured), or passing an argument with the relevant values.
| Iterators                                         | Iterators and `for..of` loops are not supported yet. Use `for(let i = 0; i < length; i++)`
| try/catch                                         | Not supported. Throwing currently aborts the contract.
| Promises                                          | There is no concept of async/await yet due to the lack of an event loop.
| BigInt                                            | Instead of BigInts, AssemblyScript has opted to utilize WebAssembly's 64-bit integers. It is currently unclear how both concepts could mix.
||
| 🕳️&nbsp;**Not&nbsp;supported**
| Dynamicness                                       | AssemblyScript avoids overly dynamic JavaScript features by design and focuses on static compilation.
