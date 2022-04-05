---
description: Introduction to Proton
---

# Introduction

Proton Smart Contracts compile a **variant** of [TypeScript](https://www.typescriptlang.org) \([Assemblyscript](https://www.assemblyscript.org/)\) to [WebAssembly](https://webassembly.org). 

A simple smart contract looks like:

```ts
import { Contract, print } from 'as-chain'

@contract("hello")
class HelloContract extends Contract {
    @action("say")
    say(text: string): void {
        print(text);
    }
}
```

To generate the WASM and ABI that you can upload to the Proton blockchain:
```sh
npx eosio-asc hello.ts
```

AssemblyScript is very similiar to Typescript with extended type support for WebAssembly, including types like u8, u16, u32, u64 and many more!

Ready to begin your journey? Head on over to [get started](./getting-started.md)!
