---
description: Stores code and precision.
---

# TableStore

A table store provides storage for multiple rows of data in block chain and methods for adding, modifying, and deleting data. This is a higher level wrapper for `MultiIndex` instance.

Any value stored in `TableStore` must be an instance inherited from `Table` class.

There are two options to get and search data in the storage. The first is to get data by primary key (`u64` value). 
The second is to pass a value inherited from `Table` class. The method `getPrimaryValue` will be used to get a primary key then.

## Constructors

* ```ts
  constructor(
    code: Name, 
    scope: Name, 
    table: Name, 
    indexes: Array<IDXDB>
  )
  ```
    `code` -  The `Name` object with for the contract
  
      Example: `Name.fromString('mycontract')`

    `scope` - The `Name` object with for the scope of the table. Recommended same as contract name
    
      Example: `Name.fromString('mycontract')`
    
    `table` - The `Name` object with for the table name
    
      Example: `Name.fromString('mytable')`
    
    `indexes` - An optional array of `IDXDB` objects to get quick access to the data
    
      Example: `[ new IDX64(code.N, scope.N, 0, 0) ]`
    

    <sub>**Example:**</sub>
    ```ts
      import { TableStore } from 'proton-tsc'

      const contract = Name.fromString('mycontract');
      const scope = Name.fromString('mycontract');
      const table = Name.fromString('mytable');

      const tablestore = new TableStore(contract, scope, table);
    ```
 
----------------------------------------------------------------

### Instance Methods

* ```ts
  store(value: T, payer: Name): void
  ```
  Creates new record in the storage for the provided value and account passed as `payer` argument.

  **Throws if:**
   - If the record with provided primary value already exists

  <sub>**Example:**</sub>
  ```ts
  tablestore.store(value, contract)
  ```

* ```ts
  set(value: T, payer: Name): void
  ```
  Creates new record or updates the existing one in the storage for the provided value and account passed as `payer` argument.

  <sub>**Example:**</sub>
  ```ts
  tablestore.set(value, contract)
  ```

* ```ts
  update(value: T, payer: Name): void
  ```
  Updates the existing record in the storage for the provided value and account passed as `payer` argument.

  **Throws if:**
   - If the record with provided primary value does not exist

  <sub>**Example:**</sub>
  ```ts
  tablestore.update(value, contract)
  ```

* ```ts
  remove(value: T): void
  ```
  Removes the existing record in the storage for the provided value

  **Throws if:**
   - If the record with provided primary value does not exist

  <sub>**Example:**</sub>
  ```ts
  tablestore.remove(value)
  ```

* ```ts
  get(key: u64): T | null
  ```
  Returns the value for a provided key. `null` is returned if there is not value found.

  <sub>**Example:**</sub>
  ```ts
  tablestore.get(key)
  ```

* ```ts
  requireGet(key: u64, errorMsg: string): T 
  ```
  A wrapper for `get` method to throw error if no value for the provided key found.
  Displays the `errorMsg` when throws.
  
  **Throws if:**
   - If the record with provided primary value does not exist. 

  <sub>**Example:**</sub>
  ```ts
  tablestore.requireGet(id, `no recored with ID ${id} found.`)
  ```

* ```ts
  exists(pk: u64): bool
  ```
  Checks if the record for provided primary key exist or not.

* ```ts
  existsValue(value: T): bool
  ```
  Checks if the record for provided value exist or not.

* ```ts
  next(value: T): T | null
  ```
  Returns the record that is the next after the provided value
  **Throws if:**
   - If the record for the provided value is the last in the storage

* ```ts
  previous(value: T): T | null
  ```
  Returns the record that is the previous to the provided value

  **Throws if:**
   - If no record for the provided value is the first in the storage

* ```ts
  first(): T | null
  ```
  Returns the first record in the storage. Or `null` if no records yet.

* ```ts
  last(): T | null
  ```
  Returns the last record in the storage. Or `null` if no records yet.

* ```ts
  isEmpty(): bool
  ```
  Checks if there is any record in the storage

* ```ts
  lowerBound(id: u64): T | null
  ```
  Returns the first element with primary key greater than or equal to the provided primary key.

  <sub>**Example:**</sub>
  ```ts
  // there are records with ids: 3, 5, 7
  const record = tablestore.lowerBound(4)
  // will return record with id 5.
  const record = tablestore.lowerBound(3)
  // will return record with id 3.
  ```

* ```ts
  upperBound(id: u64): T | null
  ```
  Returns the first element with primary key less than or equal to the provided primary key.

  <sub>**Example:**</sub>
  ```ts
  // there are records with ids: 3, 5, 7
  const record = tablestore.upperBound(4)
  // will return record with id 3.
  const record = tablestore.upperBound(5)
  // will return record with id 5.
  ```

* ```ts
  get availablePrimaryKey(): u64
  ```
  Returns the available primary key that can be used to save data.

* ```ts
  getBySecondaryIDX64(secondaryValue: u64, index: u8): T | null
  ```
  Utility method.
  Find the first table element that matches secondary value.
  `secondaryValue` is the secondary value to search for.
  `index` is the index to search in.

* ```ts
  getBySecondaryIDX128(secondaryValue: U128, index: u8): T | null
  ```
  The same as `getBySecondaryIDX64` but with extended size of the secondary value

* ```ts
  getBySecondaryIDX256(secondaryValue: U256, index: u8): T | null
  ```
  The same as `getBySecondaryIDX64` but with extended size of the secondary value

* ```ts
  getBySecondaryIDXDouble(secondaryValue: f64, index: u8): T | null
  ```
  The same as `getBySecondaryIDX64` but with `f64` type of the secondary value

* ```ts
  getBySecondaryIDXLongDouble(secondaryValue: Float128, index: u8): T | null
  ```
  The same as `getBySecondaryIDX64` but with `Float128` type of the secondary value
