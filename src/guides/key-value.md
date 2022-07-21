---
description: A guide for Key-Value contract
---

# Key-Value

This guide describes how to create contract that allows to store, add, modify and remove data in blockchain using Proton

Let's start!

### Pre-requisites

- NodeJS 16 [Installation Guide](https://github.com/ProtonProtocol/proton-cli#install-nodejs)
- NPM
- Git
- [Proton CLI](https://github.com/ProtonProtocol/proton-cli)
``` bash
npm install -g @proton/cli
```

### Steps

1. Generate a contract by providing a contract name, as shown here:
    ``` bash
    proton generate:contract kv
    ```
    Note: the contract name must be 1-12 chars, only lowercase a-z and numbers 1-5 are possible.

2. The `proton generate:contract` command prompts you for information about the action of the contact: name and parameters. Let's add `updatevalues` action with 2 parameters: 
    1.  with `actor` parameter that is `Name`
    2. `values` parameter that is `string` array
    ``` bash
    Let's add some actions to the class
    ? Enter new action name: updatevalues
    ? Do you want to add parameters to the action? Yes
    ? Enter new parameter name: actor
    ? Choose parameter type: Name
    ? Is the parameter an array? No
    ? Can the parameter be nullable? No
    ————————————
    ? Do you want to add one more parameter? Yes
    ? Enter new parameter name: values
    ? Choose parameter type: string
    ? Is the parameter an array? Yes
    ? Can the parameter be nullable? No
    ————————————
    ? Do you want to add one more parameter? No
    ————————————
    ? Do you want to add one more action? No
    ```
3. The command will prompt you to select your favorite Node.Js package manager if you have both `npm` and `yarn` installed. Feel free to select the one you like.
4. After the contract is ready navigate to `kv` folder. The folder will have the following structure:
    | Files                    | Details                               |
    | ------------------------ | ------------------------------------- |
    | `kv.contract.ts`         | The contract code, written in Proton  |
    | `playground.ts`          | The code to try a contract            |
5. Now let's add a table to our contract using `proton generate:table` command. The table will be used to store data related to the actor we will pass to the contract. 
    ``` bash
    proton generate:table kvs --class=AccountKV
    ```
    The table will have name `kvs`. Proton class name will be `AccountKV`. 

    Also the table will have 2 parameters:
    1. Primary `account` that is `Name`
    2. `values` that is `string` array
    The command prompt should look like this:
    ``` bash
    proton generate:table kvs --class=AccountKV

    ? Is the table singleton? No
    Let's add a primary parameter for the table
    ? Enter new primary parameter name: account
    ? Choose parameter type: Name
    ————————————
    ? Do you want to one more parameter? Yes
    ? Enter new parameter name: values
    ? Choose parameter type: string
    ? Is the parameter an array? Yes
    ? Can the parameter be nullable? No
    ————————————
    ? Do you want to add one more parameter? No
    Table kvs successfully created
    Adding the table to the contract kv
    ```
4. After the table is ready new file `kv.tables.ts` will appear in the folder. It should look like this:
    ```ts
    import { Name, Table } from "proton-tsc";

    @table("kvs")
    export class AccountKV extends Table {
        constructor(
            public account: Name = new Name(),
            public values: string[] = []
        ) {
            super();
        }

        @primary
        get primary(): u64 {
            return this.account.N;
        }
    }
    ```
5. Let's modify this file to add possibility to store key-value. First we need to add new `KV` class to describe key-value type:
    ```ts
    @packer
    export class KV {
        constructor (
            public key: string = "",
            public value: string = "",
        ) {}
    }
    ```
6. After that need to modify `AccountKV` constructor. Need to change `values` parameter type from `string[]` to `KV[]`:
    ```ts
    constructor(
        public account: Name = new Name(),
        public values: KV[] = []
    ) {
        super();
    }
    ```
7. The result should look like this:
    ```ts
    import { Name, Table } from "proton-tsc";

    @packer
    export class KV {
        constructor (
            public key: string = "",
            public value: string = "",
        ) {}
    }

    @table("kvs")
    export class AccountKV extends Table {
        constructor(
            public account: Name = new Name(),
            public values: KV[] = []
        ) {
            super();
        }

        @primary
        get primary(): u64 {
            return this.account.N;
        }
    }
    ```
8. Now let's implement method to store data in blockchain. Open `kv.contract.ts` and modify `updatevalues` method the following way:
    ```ts
    @action("updatevalues")
    updatevalues(
        actor: Name,
        values: KV[]
    ): void {
        // Require authentication for the account we want to store data for
        requireAuth(actor)

        // Values should be passed
        check(values.length > 0, "Must provide at least one value")
        for (let i = 0; i < values.length; i++) {
            // The max key length should be less than 255 symbols
            check(values[i].key.length < 255, "The max key length is 255")
            // The max value length should be less than 255 symbols
            check(values[i].value.length < 255, "The max value length is 255")
        }

        // Check if there are any previously saved data for the account
        let kv = this.accountkvTableStore.get(actor.N)
        if (kv == null) {
            // Creating new key-value object for saving in blockchain
            kv = new AccountKV(actor, values)
        } else {
            // Adding or updating keys in existing data
            const existingKeys = kv.values.map<string>(value => value.key)
            for (let i = 0; i < values.length; i++) {
                const keyMatchIndex = existingKeys.indexOf(values[i].key)
                if (keyMatchIndex == -1) {
                    kv.values.push(values[i])
                } else {
                    kv.values[keyMatchIndex].value = values[i].value
                }
            }
        }

        // Save data in table
        this.accountkvTableStore.set(kv, actor)
    }

    ```
9. Also need to update imports by adding `check`, `requireAuth` functions and `KV` class:
    ```ts
    import { Contract, Name, TableStore, check, requireAuth } from "proton-tsc";
    import { AccountKV, KV } from "./kv.tables";
    ```
10. Now let's check if our contract works and stores data. To do it let's modify `playground.ts` file the following way:
    ```ts
    import { Blockchain } from "@proton/vert";

    async function wait(ms: number) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    async function main() {
        const blockchain = new Blockchain();
        const contract = blockchain.createContract('kv', 'target/kv.contract');
        await wait(0);

        // First, we will check if there is no data in table store before the contract executed
        console.log('------ BEFORE ------');
        console.log(contract.tables.kvs().getTableRows());
        console.log('--------------------');

        // Let's save webpage address for kv account
        await contract.actions.updatevalues(['kv', [{ key: 'webpage', value: 'www.proton.org' }]]).send('kv@active');

        // And after all we will check if the data was properly saved to table store
        console.log('------ AFTER ------');
        const data = contract.tables.kvs().getTableRows()
        console.log(JSON.stringify(data));
        console.log('--------------------');
    }

    main();
    ```
11. And then we need to run `npm run playground` command. The output should be similar to:
    ```bash
    ------ BEFORE ------
    []
    --------------------
    ...
    ------ AFTER ------
    [{"account":"kv","values":[{"key":"webpage","value":"www.proton.org"}]}]
    --------------------
    ```
    As you see in the `AFTER` block, the data was properly saved and we are able to read it.
12. Now let's try to deploy our contract to the blockchain and check how it will work inside the chain. It is easy to do using Proton CLI (more detailed info can be found [here](/introduction/getting-started.md#create-testnet-account)):
    1. Create an account in `proton-test` chain using these commands (account can contain 12 characters max using charset a-z and 1-5):
        ```bash
        proton chain:set proton-test
        proton account:create <ACCOUNT_NAME>
        ```
    2. Deploy the contract using the following commands:
        ```bash
        proton faucet:claim XPR <ACCOUNT_NAME>
        proton ram:buy <ACCOUNT_NAME> <ACCOUNT_NAME> 300000
        proton contract:set <ACCOUNT_NAME> ./target
        ```

13. After the contract is deployed, we can read the data from `kvs` table using:
    ```bash
    proton table <ACCOUNT_NAME> kvs
    ```
    The output should be the following:
    ```bash
    {
        "rows": [],
        "more": false,
        "next_key": ""
    }
    ```
14. Now let's add data using our contract in blockchain. The command is the following:
    ```bash
    proton action <ACCOUNT_NAME> updatevalues '{"actor":"<ACCOUNT_NAME>","values":[{"key":"webpage","value":"www.proton.org"}]}' <ACCOUNT_NAME>
    ```
15. And check that the data was successfully added to the store:
    ```bash
    proton table <ACCOUNT_NAME> kvs
    ```
    The output should be the following:
    ```bash
    {
        "rows": [
            {
            "account": "<ACCOUNT_NAME>",
            "values": [
                {
                "key": "webpage",
                "value": "www.proton.org"
                }
            ]
            }
        ],
        "more": false,
        "next_key": ""
    }
    ```
16. There is one more way how you can get access to the data inside the blockchain - using Proton API for this.
    Let's try it.
    1. Install Proton Api package using NPM - `npm install --save @proton/api`
    2. Create a new file `api.ts` and edit it the following way:
        ```ts
        import { ApiClass } from '@proton/api'
        
        // Creating new API instance for proton-test chain
        const protonApi = new ApiClass('proton-test')
        
        // perform request for data from kvs table from ACCOUNT_NAME contract
        protonApi.rpc.get_table_rows({
            table: 'kvs',
            code: '<ACCOUNT_NAME>',
            scope: '<ACCOUNT_NAME>'
        }).then((res) => {
            console.log(JSON.stringify(res, null, 2));
        });

        ```
    3. Execute the code using the command: `npx ts-node ./api.ts`. The result should be the following:
        ```bash
        {
            "rows": [
                {
                "account": "ACCOUNT_NAME",
                "values": [
                    {
                    "key": "webpage",
                    "value": "www.proton.org"
                    }
                ]
                }
            ],
            "more": false,
            "next_key": ""
        }
        ```
        It is the same with CLI result as you see.
17. Now we know how to store data in the contract and how to check the the data is properly saved.
    You can play with the contract and check the result:
    1. Add one more key to the storage
        ```bash
        proton action <ACCOUNT_NAME> updatevalues '{"actor":"<ACCOUNT_NAME>","values":[{"key":"twitter","value":"https://twitter.com/protonxpr/"}]}' <ACCOUNT_NAME>
        ```
    2. Update one of the values by key:
        ```
        proton action <ACCOUNT_NAME> updatevalues '{"actor":"<ACCOUNT_NAME>","values":[{"key":"webpage","value":"protonchain.com"}]}' <ACCOUNT_NAME>
        ```
18. The only thing we cannot do using the contract is data removal. We can only add or update values. So let's implement this feature in our contract. Let's add new action to KV contract using CLI command `proton generate:action`. The action name will be `removekeys`. It will have 2 parameters:
    1.  with `actor` parameter that is `Name`
    2. `keys` parameter that is `string` array

    ``` bash
    ? Enter new action name: removekeys
    ? Do you want to add parameters to the action? Yes
    ? Enter new parameter name: actor
    ? Choose parameter type: Name
    ? Is the parameter an array? No
    ? Can the parameter be nullable? No
    ————————————
    ? Do you want to add one more parameter? Yes
    ? Enter new parameter name: keys
    ? Choose parameter type: string
    ? Is the parameter an array? Yes
    ? Can the parameter be nullable? No
    ————————————
    ? Do you want to add one more parameter? No
    ————————————
    ? Do you want to add one more action? No
    Actions were successfully added
    ```
19. Now let's implement method to remove data from blockchain. Open `kv.contract.ts` and modify `removekeys` method the following way:
    ```ts
    @action("removekeys")
    removekeys(
        actor: Name,
        keys: string[]
    ): void {
        // Require authentication for the account we want to remove data for
        requireAuth(actor)

        // Get previously saved data for the account
        const kv = this.accountkvTableStore.requireGet(actor.N, `no kv found with name ${actor}`)

        // Find keys to remove
        let filteredValues: KV[] = []
        for (let i = 0; i < kv.values.length; i++) {
            if (keys.indexOf(kv.values[i].key) == -1) {
                filteredValues.push(kv.values[i])
            }
        }
        kv.values = filteredValues

        if (kv.values.length > 0) {
            // Save data for actor without keys passed to the method
            this.accountkvTableStore.update(kv, actor)
        } else {
            // Remove the key at all
            this.accountkvTableStore.remove(kv)
        }
    }
    ```
20. After the code is in place need to modify `playground.ts` to check if removal really works. Add the following lines to the end of `main` function:
    ```ts
    await contract.actions.updatevalues(['kv', [{ key: 'twitter', value: 'https://twitter.com/protonxpr' }]]).send('kv@active');

    // Check if there is any data in the store
    console.log('------ BEFORE REMOVE ------');
    const data_before_remove = contract.tables.kvs().getTableRows()
    console.log(JSON.stringify(data_before_remove));
    console.log('--------------------');

    await contract.actions.removekeys(['kv', ['webpage']]).send('kv@active');
    console.log('------ AFTER WEBPAGE REMOVE ------');
    const data_without_webpage = contract.tables.kvs().getTableRows()
    console.log(JSON.stringify(data_without_webpage));
    console.log('--------------------');

    await contract.actions.removekeys(['kv', ['twitter']]).send('kv@active');
    console.log('------ AFTER REMOVING ALL ------');
    const data_clean = contract.tables.kvs().getTableRows()
    console.log(JSON.stringify(data_clean));
    console.log('--------------------');
    ```
21. And then run `npm run playground` command. The output should be similar to:
    ```bash
    ------ BEFORE ------
    []
    --------------------
    ...
    ------ AFTER ------
    [{
        "account":"kv",
        "values":[
            {"key":"webpage","value":"www.proton.org"}
        ]
    }]
    --------------------
    ...
    ------ BEFORE REMOVE ------
    [{
        "account":"kv",
        "values":[
            {"key":"webpage","value":"www.proton.org"},
            {"key":"twitter","value":"https://twitter.com/protonxpr"}
        ]
    }]
    --------------------
    ...
    ------ AFTER WEBPAGE REMOVE ------
    [{
        "account":"kv",
        "values":[
            {"key":"twitter","value":"https://twitter.com/protonxpr"}
        ]
    }]
    --------------------
    ...
    ------ AFTER REMOVING ALL ------
    []
    --------------------
    ```
    So you see, that we started with a clean storage and finished with the clean storage. Now we are sure that remove feature is in place.
22. Now let's re-deploy the contract with command `proton contract:set <ACCOUNT_NAME> ./target` and check if the feature works in a real blockchain:
    1. Either with CLI or `api.ts` check if the data we added previously to the store is still in place.
    2. Now let's try to remove `webpage` key from store:
        ```bash
        proton action <ACCOUNT_NAME> removekeys '{"actor":"<ACCOUNT_NAME>","keys":["webpage"]}' <ACCOUNT_NAME>
        ```
    3. And check the result with CLI. The result should be the following:
        ```bash
        {
            "rows": [
                {
                "account": "<ACCOUNT_NAME>",
                "values": [
                    {
                    "key": "twitter",
                    "value": "https://twitter.com/protonxpr/"
                    }
                ]
                }
            ],
            "more": false,
            "next_key": ""
        }
        ```
    4. And now let's remove the `twitter` key to get clean store:
        ```bash
        proton action <ACCOUNT_NAME> removekeys '{"actor":"<ACCOUNT_NAME>","keys":["twitter"]}' <ACCOUNT_NAME>
        ```
    5. The check using CLI should give the following result:
        ```bash
        {
            "rows": [],
            "more": false,
            "next_key": ""
        }
        ```
Perfect! You created a contract that allows to store, modify and remove data in blockchain. This will help you to create more complex and amazing contract in the future.