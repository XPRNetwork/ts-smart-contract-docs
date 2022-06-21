---
description: Storage
---


# Storage

## Overview

A good mental model for storage in Proton is that of a standard table with rows and columns. As a developer, you start off by defining the columns of data to store, and each entry is stored as a row. Every row is uniquely identified by a u64 primary key, which you specify using the @primary decorator.

Blockchain storage capacity (RAM) is purchased using XPR, either through the CLI or on [Proton Resources.](https://protonresources.com) Each row will consume a variable amount of RAM, depending on the size of your columns and the specific row data (for variable length types like strings).

It is important to note that once rows have been inserted to a table, the columns cannot be safely modified. Modifying the columns requires migrating all rows to a temporary migration table, modifying the old empty table columns and then migrating the rows back to the modified table.

## Storage layout

Each contract has its own storage space.

Therefore, a specific row on the blockchain is addressed through 4 levels:
1. Contract name
2. Table name
3. Table scope (recommended same as contract name)
4. Primary key of row
   
## Initialize Table

```ts
import { Table, TableStore, Name } from "proton-tsc"

@table("myrows")
export class MyRow extends Table {
    constructor (
       public id: u64 = 0,
       public from: Name = new Name(),
       public to: Name | null = null,
    ) {
        super();
    }

    @primary
    get primary(): u64 {
        return this.id;
    }
}
```

Let's break down this code:

1. The @table decorator specifies the name of the table in the ABI for client SDKs to query it. Table names have the same constraints as a standard Name, so 1-12 characters long with a-z lowercase or 1-5.

    ```ts
    @table("myrows")
    ```

2. Extend your row class as a type of Table to automatically handle serialization and deserialization

    ```ts
    class MyRow extends Table
    ```

3. Specify the columns of the table, in this example each row would store the fields:
   - `id` - type u64
   - `from` - type Name
   - `to` - type Name or null

   Each field must be initialized to a default value or null.

    ```ts
    constructor (
        public id: u64 = 0,
        public from: Name = new Name(),
        public to: Name | null = null,
    ) {
        super();
    }
    ```

4. The @primary decorator specifies which getter to use as the primary key of the row

    ```ts
    @primary
    get primary(): u64 {
        return this.id;
    }
    ```

## Store Row
```ts
import { Contract, Name, TableStore } from 'proton-tsc'

// ... MyRow definition ...

@contract
class MyContract extends Contract {
  myTable: TableStore<MyRow> = new TableStore<MyRow>(this.receiver)

  @action("action1")
  myAction(): void {
    const row = new MyRow(0, Name.fromString("alice"), null)
    this.myTable.store(row, this.receiver)
    // this.myTable.set(row, this.receiver) // or upsert
  }
}
```

Let's break down this code:

1. Create a contract
    ```ts
    @contract
    class MyContract extends Contract
    ```

2. Initialize your table store using the name of the deployed contract (`this.receiver`).
    ```ts
    myTable: TableStore<MyRow> = new TableStore(this.receiver)
    ```

3. Create an action named "action1"
    ```ts
    @action("action1")
    myAction(): void
    ```

4. Create a row object with ID 0 from Alice to null
    ```ts
    const row = new MyRow(0, Name.fromString("alice"), null)
    ```

5. Save the row to myTable, with the contract (this.receiver) paying for RAM. 
   
   There are two ways to store a row:

    **store** - throws error if row with same primary key already exists
    ```ts
    this.myTable.store(row, this.receiver)
    ```

    **set** - update if exists, create if does not exist (upsert)

    ```ts
    this.myTable.set(row, this.receiver)
    ```

## Row Exists

Checks that a row exists using its primary key

```ts
import { Contract, Name, TableStore, check } from 'proton-tsc'

// ... MyRow definition ...

@contract
class MyContract extends Contract {
  myTable: TableStore<MyRow> = new TableStore<MyRow>(this.receiver)

  @action("action1")
  myAction(): void {
    const row = new MyRow(0, Name.fromString("alice"), null)
    this.myTable.store(row, this.receiver)

    check(this.myTable.exists(0), "No row with ID 0 exists")
  }
}
```

## Get Row

Gets a row using a primary key, returns null if row does not exist

```ts
import { Contract, Name, TableStore, check, print } from 'proton-tsc'

// ... MyRow definition ...

@contract
class MyContract extends Contract {
  myTable: TableStore<MyRow> = new TableStore<MyRow>(this.receiver)

  @action("action1")
  myAction(): void {
    // Store row
    const row = new MyRow(0, Name.fromString("alice"), null)
    this.myTable.store(row, this.receiver)

    // Fetch row from table
    const fetchedRow = this.myTable.get(0)
    if (!fetchedRow) {
        check(false, "row does not exist")
        return // just for intellisense
    }

    // Print data from fetched table
    print(`${fetchedRow.from}`) // "alice"
  }
}
```

## Update Row

Updates a row exists using a row object, **throws** if no row with the primary key exists

```ts
import { Contract, Name, TableStore, check } from 'proton-tsc'

// ... MyRow definition ...

@contract
class MyContract extends Contract {
  myTable: TableStore<MyRow> = new TableStore<MyRow>(this.receiver)

  @action("action1")
  myAction(): void {
    // Create row object
    const row = new MyRow(0, Name.fromString("alice"), null)

    // Update table
    // this.myTable.update(row, this.receiver) // would throw since row doesn't exist yet to update

    // Store row
    this.myTable.store(row, this.receiver)

    // Update row
    row.to = Name.fromString("bob")
    this.myTable.update(row, this.receiver)
  }
}
```

## Delete Row

Deletes a row exists using a row object, **throws** if no row with the primary key exists

```ts
import { Contract, Name, TableStore, check } from 'proton-tsc'

// ... MyRow definition ...

@contract
class MyContract extends Contract {
  myTable: TableStore<MyRow> = new TableStore<MyRow>(this.receiver)

  @action("action1")
  myAction(): void {
    // Store row
    const row = new MyRow(0, Name.fromString("alice"), null)
    this.myTable.store(row, this.receiver)

    // Remove row
    this.myTable.remove(row)

    // Remove row again -> throws error since no row with primary key 0 exists anymore
    this.myTable.remove(row)
  }
}
```





