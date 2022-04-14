---
description: Assert
---

# Assert Condition

## check

* ```ts
  function check(condition: boolean, message: string): void
  ```
  This function verifies that the condition is true. If false, the entire transaction will abort, reverting all actions and table storage changes.

  <sub>**Example:**</sub>
  ```ts
  import { check } from "proton-tsc"

  @action('act')
  doAction(): void {
    // Will abort
    check(1 != 1, "invalid math!")

    // Will not execute past this point, since last check aborted

    print("abc")
  }
  ```