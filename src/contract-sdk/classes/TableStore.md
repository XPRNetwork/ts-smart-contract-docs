---
description: Storage for multiple rows of data in block chain
---

# TableStore

A table store provides storage for multiple rows of data in block chain and methods for adding, modifying, and deleting data. This is a higher level wrapper for `MultiIndex` instance.

Any value stored in `TableStore` must be an instance inherited from `Table` class.

There are two options to get and search data in the storage. The first is to get data by primary key (`u64` value). 
The second is to pass a value inherited from `Table` class. The method `getPrimaryValue` will be used to get a primary key then.

## Constructors

```ts
  constructor(
    contract: Name,
    scope: Name
  )
```
    
`contract` -  The `Name` object with for the contract

  Example: `Name.fromString('mycontract')`

`scope` - The `Name` object with for the scope of the table. Recommended same as contract name

  Example: `Name.fromString('mycontract')`

<sub>**Example:**</sub>
```ts
  import { TableStore } from 'proton-tsc'
  import {MyTable} from './tables'
  const contract = Name.fromString('mycontract');
  const scope = Name.fromString('mycontract');

  const tablestore = new TableStore<MyTable>(contract, scope);
```
 


### Instance Methods
#### Set
```ts
set(value: T, payer: Name): void
  ```
  Creates new record or updates the existing one in the storage for the provided value and account passed as `payer` argument.

  <sub>**Example:**</sub>
  ```ts
  tablestore.set(value, contract)
  ```

#### Store
```ts
  store(value: T, payer: Name): void
  ```
  Creates new record in the storage for the provided value and account passed as `payer` argument.

  **Throws if:**
   - If the record with provided primary value already exists

  <sub>**Example:**</sub>
  ```ts
  tablestore.store(value, contract)
  ```
#### Update
```ts
  update(value: T, payer: Name): void
  ```
  Updates the existing record in the storage for the provided value and account passed as `payer` argument.

  **Throws if:**
   - If the record with provided primary value does not exist

  <sub>**Example:**</sub>
  ```ts
  tablestore.update(value, contract)
  ```
#### Remove
```ts
  remove(value: T): void
  ```
  Removes the existing record in the storage for the provided value

  **Throws if:**
   - If the record with provided primary value does not exist

  <sub>**Example:**</sub>
  ```ts
  tablestore.remove(value)
  ```

#### Get
```ts
  get(key: u64): T | null
  ```
  Returns the value for a provided key. `null` is returned if there is not value found.

  <sub>**Example:**</sub>
  ```ts
  tablestore.get(key)
  ```

#### RequireGet
```ts
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

#### Exists
```ts
  exists(pk: u64): bool
  ```
  Checks if the record for provided primary key exist in the table or not.

#### ExistsValue
```ts
  existsValue(value: T): bool
  ```
  Checks if the record for provided value exist in the table or not.

#### Next
```ts
  next(value: T): T | null
  ```
  Returns the record that is the next after the provided value
  **Throws if:**
   - If the record for the provided value is the last in the storage
#### Previous
```ts
  previous(value: T): T | null
  ```
  Returns the record that is the previous to the provided value
  **Throws if:**
   - If no record for the provided value is the first in the storage
#### First
```ts
  first(): T | null
  ```
  Returns the first record in the storage. Or `null` if no records yet.
#### Last
```ts
  last(): T | null
  ```
  Returns the last record in the storage. Or `null` if no records yet.
#### Empty
```ts
  isEmpty(): bool
  ```
  Checks if there is any record in the storage
#### LowerBound
```ts
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
#### UpperBound
```ts
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

#### AvailablePrimaryKey
```ts
  availablePrimaryKey: u64
  ```
  Returns the available primary key that can be used to save data.
  Read-only field

#### GetBySecondaryU64
```ts
  getBySecondaryU64(secondaryValue: u64, index: u8): T | null
  ```
  Utility method.
  Find the first table element that matches secondary value or `null` if there is no such value in the table
  `secondaryValue` is the secondary value to search for.
  `index` is the index to search in.

#### NextBySecondaryU64
```ts
  nextBySecondaryU64(value: T, index: u8): T | null
  ```
  Utility method.
  Returns the record that is the next after the provided secondary value.
  Returns `null` if there is no such value or the value is the last in the table.
  `value` is the secondary value to search for.
  `index` is the index to search in.

#### PreviousBySecondaryU64
```ts
  previousBySecondaryU64(value: T, index: u8): T | null
  ```
  Utility method.
  Returns the record that is the next after the provided secondary value.
  Returns `null` if there is no such value or the value is the first in the table.
  `value` is the secondary value to search for.
  `index` is the index to search in.

#### GetBySecondaryU128
```ts
  getBySecondaryU128(secondaryValue: U128, index: u8): T | null
  ```
  The same as `getBySecondaryU64` but with extended size of the secondary value

#### GetBySecondaryU256
```ts
  getBySecondaryU256(secondaryValue: U256, index: u8): T | null
  ```
  The same as `getBySecondaryU64` but with extended size of the secondary value

#### GetBySecondaryF64
```ts
  getBySecondaryF64(secondaryValue: f64, index: u8): T | null
  ```
  The same as `getBySecondaryU64` but with `f64` type of the secondary value
