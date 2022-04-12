---
description: Debugging
---
## Debugging

The easiest way to debug your smart contracts is by using `print` statements inside your contract, and running tests using LOG_LEVEL=debug, which will log all data from inside your smart contract to your console. 

### Debug symbols

When compiling with the `--debug` option, the compiler appends a name section to the binary, containing names of functions, globals, locals and so on. These names will show up in stack traces. Note that debug builds are larger in WASM size, and should only be used for testing.

### Source maps

The compiler can generate a source map alongside a binary using the `--sourceMap` option. By default, a relative source map path will be embedded in the binary which browsers can pick up when instantiating a module from a `fetch` response.

### Breakpoints (Experimental)

> **Note: There is currently no support for DWARF, so breakpoints will not show variable names**

Some JavaScript engines also support adding break points directly in WebAssembly code. Please consult your engine's documentation: [Chrome](https://developers.google.com/web/tools/chrome-devtools/javascript/breakpoints), [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Set_a_breakpoint), [Node.js](https://nodejs.org/api/debugger.html), [Safari](https://support.apple.com/de-de/guide/safari-developer/dev5e4caf347/mac).