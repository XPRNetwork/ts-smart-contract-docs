---
description: Inline Action
---


### readActionData
```ts
  function readActionData(): u8[]
  ```
  Users interact with the chain by sending a transaction.A transaction is essentially an array of actions that are executed sequentially.
  
  `readActionData` allows you to read the data passed in for the current action. The data is packed, so you need to unpack it before using.
  
  In most cases you don't need to do it, as the framework will handle it for you automatically. And you'll get unpacked values as action arguments

### unpackActionData
```ts
  function unpackActionData<T extends Packer>(): T
  ```
  Users interact with the chain by sending a transaction.
  
  A transaction is essentially an array of actions that are executed sequentially.
  
  `unpackActionData` allows you to read the unpacked data passed in for the current action.
  
  In most cases you don't need to do it, as the framework will handle it for you automatically. And you'll get unpacked values as action arguments

### actionDataSize
```ts
  function actionDataSize(): u32
  ```
  Get the length of the current action's data field. This method is useful for dynamically sized actions
