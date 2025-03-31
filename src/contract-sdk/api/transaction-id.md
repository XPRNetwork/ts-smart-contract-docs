---
description: Transaction ID
---

# Transaction ID


## getTransactionId

```ts
  function getTransactionId(): Checksum256
  ```
  This function returns the id of the currently executing transaction. The id of the transaction is a `sha256` checksum of the transaction data.

  **Throws if:**
    - transaction read fails for some reason

  The function should be used inside the action method of the contract. 

  <sub>**Example:**</sub>
  ```ts
  import { getTransactionId } from 'proton-tsc'
  // ...
  @action('act')
  doAction(): void {
    const txid = getTransactionId();
    /* txid is 9bf0f9c2d2acb17eb18af416fda425f69f1091ec47e96370ea77f6f7f92814bb */
  }
  ```