# Write your first smart contract

Smart contracts can seem intimidating—and yes, they are challenging\! But on the XPR Network, you can write smart contracts in TypeScript, and that’s a game-changer. Why? Let’s list the advantages:

* No need to learn a new programming language.  
* No need to spend hours configuring your environment.  
* Access to built-in functions, classes, and interfaces to handle KV, NFTs, tokens, and more.

With XPR Network, your entire project—backend, frontend, and smart contract—can be fully TypeScript. Sweet\! But before diving into code, let’s cover the basics.

## **What is a Smart Contract?**

It might sound like a silly question, but it's good to clarify.

A smart contract is essentially a "simple piece of software" that executes a linear process: it reads values, checks conditions, and (usually) writes values. That’s it.

We encounter smart contracts every day in the form of automated processes. The best analogy is a vending machine: insert a coin, choose a snack, and if the conditions are met (e.g., correct amount entered), you get your snack. Otherwise, the machine returns your coin.

This process is linear, predictable, and **deterministic**. That last word is key. Smart contracts must always produce the same result for the same input. That’s why they can’t perform random operations.

## **Smart Contracts and Resources**

XPR Network uses a resource system, a kind of "Holy Trinity": **CPU, NET, and RAM**.

**CPU**: Computation time (in milliseconds). Each contract action must be completed within 30 ms. Your account receives 3.23 seconds of CPU at creation—enough to execute several actions.

**NET**: The amount of data transmitted across the chain (in bytes). Each action's input consumes NET bandwidth. Every new account receives 16.6MB of NET—plenty for many actions.

**RAM**: On-chain storage (in bytes). RAM is scarce and should be used wisely. As a smart contract developer, you're responsible for managing RAM for your users.

To keep your contract scalable:

* Keep operations under 30ms (CPU).  
* Limit the data sent per operation (NET).  
* Minimize storage requirements (RAM).

**You’ll need to understand how to count storage in bytes.** 

To measure how much by row in a table could consume, you should know how many bytes each type requires. Basic types generally tell you how many BITS they carry. Like u8 is a 8bits representation of a number. 1 bytes \= 8 bits so the storage of a u8 in your table will consume 1 byte of ram.  So the rest is easy to grasp:

| u8 / i8  | 1 byte |
| :---- | :---- |
| u16 / i16 | 2 bytes |
| u32 / i32 | 4 bytes |
| u64 / i64 | 8 bytes |
| u128 / i128 | Yeah you get it… 16 bytes |
| string | 1 byte for null char if empty 1 Byte per char \+ 1 byte for null char |
| Array\<type\> | Size of \<type\> \* array length \+ 4 bytes for array length   |

## **Storage System and Data Structure**

The storage system is **not** query-based like SQL. It is intentionally limited for performance reasons. You can't use complex queries, foreign keys, views, or full-text search.

Instead, you typically:

* Use numeric values for lookups  
* Define ranges with lower and upper bounds  
* Use `for` or `while` loops for scanning

This may feel unintuitive at first. That's why it helps to understand types, scopes, and bounds before writing code. Pro-tip: sketch your data structures on paper before implementing them.

## **Smart Contract Terminology**

A quick reference:

* **Contract**: Your main smart contract file.  
* **Tables**: Store contract data (e.g., user balances, settings).  
* **Row**: A single entry in a table.  
* **Scope**: A group of entries in a table.  
* **Actions**: Functions triggered to perform tasks like transferring tokens or updating balances.  
* **Inline Actions**: External actions that your contract can call.  
* **Notification**: Triggers sent between contracts.  
* **ABI** : A schematic description of your contract and how the system should decode bytes from blocks and encode contract inputs .  
* **WASM**: Compiled file representing your contract.

If you’re unfamiliar with these terms, refer to the "Terminology You Need to Know" guide before continuing.

## **What Are We Building?**

In this tutorial, we’ll build the "greeting" contract from Chapter 2 (Signing and Pushing Transactions). The contract allows users to post a greeting message by paying 10 XPR. We’ll add an **escrow** feature:

An escrow is a third party holding tokens or assets on behalf of users, releasing them when conditions are met.

Our contract will hold tokens for users to allow them to post greeting messages.

## **Ready ? Steady, GO!**

Now where are ready to go\! So let's use our good pal, the proton/CLI. If you haven’t installed this bad boy yet please refer to the **@proton/cli crash course** and follow the installation process. 

Once it’s done create a new folder from your terminal and access it, run the following command

```javascript
proton generate:contract myfirstcontract
```

It will run the interactive prompt command to create the smart contract. I feel it a bit unintuitive, so i  just answer the first question 

```javascript
? Enter new action name:
```

Type `transfer` as the action name and press the enter key

```javascript
? Do you want to add parameters to the action? (y/N)
```

Answer `N` here and press the enter key

```javascript
? Do you want to add one more action? (y/N)
```

Answer `N` here and press the enter key

```javascript
? Choose your preferred package manager: (Use arrow keys)
❯ npm
  yarn
```

Finally choose your favorite package manager and hit enter

And the generation process starts, after a few minutes the process should have generated required files and installed the required packages. 

Open the contract folder in your favorite code editor, it should look like this   
![image1](/smart-contracts/write-your-first-sc-1.png)

The file named `mycontract.contract.ts` is your main contract file, the `playground.ts` file is a, as the name suggests, a way to perform some tests on your contract without deploying it, we will see this file later. 

Open the contract file, and you should have the following code 

```javascript
import { Contract } from "proton-tsc";

@contract
export class mycontract extends Contract {

    @action("transfer")
    transfer(): void {
        // Add here a code of your contract
    }
}
```

Let’s break down the contract structure. The `@contract` decorator tells the compiler the class below is a smart contract then we export our class that extends the `Contract` from the `proton-tsc` package. Inside the class, the `@action` decorator will generate an action named `transfer` with the following function as handler.  

It’s pretty empty isn't it? Yes, but before adding real functionality, let’s focus on the action. 

We named the action `transfer` but it’s just a default name, to be a real `transfer` action, i mean an action that could handle token transfer, we need to add more stuff. First we need to add parameters, a transfer token action requires 4 parameters. Let’s introduce each of them and their types. If you are not familiar with types, please read **A quick note on data types**

- **from:**  the emitter account of the token transfer as **Name**  
- **to:** the recipient account of the token transfer as **Name**  
- **quantity:** the quantity of transferred token as **Asset**  
- **memo:** an arbitrary note to the transfer as **String**

Let’s do it 

```javascript
import { Asset, Contract, Name} from "proton-tsc";

@contract
export class mycontract extends Contract {

    @action("transfer")
    transfer(from:Name,to:Name, quantity: Asset, memo:string): void {
        // Add here a code of your contract
    }
}
```

Ok cool, before defining our transfer feature, i would like to introduce the `notify` flag. This flag is set on the `@action`, it defines that the action is triggered by a notification from another contract… WUUUT ?

When you define a contract’s action, you can specify that the action dispatches a notification to the account(s) involved in the action. If the notified account(s) have a contract that implements the same action defined as notification, it will be triggered. 

So if you send some XPR to an account, the `eosio.token` contract , the contract that drives the XPR token, will notify both of the accounts. If any account has a contract that handles the transfer action as notification, the action will be triggered.

So, once we set the `notify` flag on our transfer action, the action itself becomes unavailable to be called directly, but will be called through the notification system. Let’s modify our contract:

```javascript
import { Asset, Contract, Name} from "proton-tsc";

@contract
export class mycontract extends Contract {

    @action("transfer",notify)
    transfer(from:Name,to:Name, quantity: Asset, memo:string): void {
        // Add here a code of your contract
    }
}
```

Youhou… but our action still useless, let’s move to the next step, let’s add a table for storage:

## **Let’s build some tables**

Let's build a table. Add a new folder in your project, smartly named `tables`   
You can use the CLI to generate a new table 

```javascript
proton generate:table greets
```

I'm not a big fan of this method, I prefer to create my table manually, I also like to name my file with a `.table.ts`. It's just my own convention, it changes nothing.  
![image2](/smart-contracts/write-your-first-sc-2.png)

Open the `greeting.table.ts`,  here is the skeleton.

```javascript
import { Table } from "proton-tsc";

@table('greets')
export class GreetingTable extends Table {
  constructor() {
    super()
  }
}
```

To create a storage table, you use the @table() decorator to tell the compiler that’s a table and provide the table a Name (with capital N cause it have the same behaviors as the type) and extend the Table class, where the constructor parameters define the columns and their types in your table.  
   
As you can see, we import the abstract `table` class from the `proton-tsc` package. Then we declare the `@table` decorator and define our table name as `greetings`, make sure this name respects the Name rules (the type), this name will be your reference to fetch your data through RPC. After that, we export our class that extends the `Table` class. The name of the class will be a reference for the code, it has no incidence on the contract itself. Finally we add our constructor with a call for `super()`  that applies the constructor from the extended class. 

You will see that tables are quite boring but easy to create because the pattern repeats over and over. Now we need to define the structure, the field that will be stored for each row within the table. So we need a `key` field which will be our unique identifier of the row, a `owner` field that holds the account that has generated the string `message`.

So let’s add those fields

```javascript
import { EMPTY_NAME, Name, Table } from "proton-tsc";

@table('greets')
export class GreetingTable extends Table {
  constructor(
    public key: u64 = 0,
    public owner: Name = EMPTY_NAME,
    public message:string = ""
  ) {
    super()
  }
}
```

You must define the parameters as public, and provide a default value for each according to their type.

Now we need to tell the compiler what field is the primary key with the @primary decorators before the getters and setters of the field. Key is our unique identifier, so we will define it as our primary key \!

```javascript
import { EMPTY_NAME, Name, Table } from "proton-tsc";

@table('greets')
export class GreetingTable extends Table {
  constructor(
    public key: u64 = 0,
    public owner: Name = EMPTY_NAME,
    public message:string = ""
  ) {
    super()
  }

  @primary()
  get by_key(): u64 {
    return this.key;
  }

  set by_key(value: u64) {
    this.key = value;
  }
}
```

And voilà our first table is ready \! Let’s add another one.   
Since our contracts need an. Our greeting system needs a table to handle the escrow feature. Let’s create a `tickets.table.ts` in our tables folder.

```javascript
import { EMPTY_NAME, Name, Table } from "proton-tsc";

@table('tickets')
export class TicketsTable extends Table {
  constructor(
    public owner: Name = EMPTY_NAME,
    public count:u32 = 0
  ) {
    super()
  }

  @primary()
  get by_owner(): u64 {
    return this.owner.N;
  }

  set by_owner(value: u64) {
    this.owner = Name.fromU64(value);
  }

}
```

As you can see, the structure is pretty the same as the `greets` table class, but it has a big difference. Here we use the `owner` as the primary key\! As you should know (yeah you should, really) the `Name`type is a “string” that could be read as a number (u64) and because we want to maintain the number of times an account pay to post a message in the `count` field, and decrease it when the user post a message, we need the primary key to be unique per account.

To achieve this, we take advantage of the getter and setter of the primary key, the getter returns the u64 value of the `owner` name, and the setter assigns the u64 value to a name with the Name’s static function `fromU64`.

Just to make the next steps cleaner and keep our code easy to maintain, let’s export our table from a index.ts  
![image3](/smart-contracts/write-your-first-sc-3.png)  
The content of the index file just reference our 2 tables as export 

```javascript
export * from './greets.table';
export * from './tickets.table';
```

## **Glue everything together**

Now it’s time to put everything at work\! Let's go back to our smart contract file and reference our tables as private.

```javascript
import { Contract, TableStore } from "proton-tsc";
import { GreetsTable, TicketsTable } from "./tables";

@contract
export class mycontract extends Contract {

    private greetsTable:TableStore<GreetsTable> = new TableStore<GreetsTable>(this.firstReceiver,this.firstReceiver)

    private ticketsTable:TableStore<TicketsTable> = new TableStore<TicketsTable>(this.firstReceiver,this.firstReceiver)

    @action("transfer",notify)
    transfer(from:Name,to:Name, quantity: Asset, memo:string): void {
        // Add here a code of your contract
    }
}
```

We import the `GreetsTable` and `TicketsTable` from the `./tables` directory. Then we create a class level private constants for each table, by using the `TableStore`. And we define the contract that own the table to `this.receiver` that means the current contract, we also define the scope of the table to the current contract, this is the value by default. 

The `TableStore` class is an interface that wraps your table structure and provides an API to interact with the storage. You can read more about the `TableStore` in the  [dedicated documentation](https://docs.xprnetwork.org/contract-sdk/storage.html#overview).

Our user will be able to post a message for a cost of 10XPR. Let’s get back to our `transfer` action and start to add features. First we need to do a couple of check

- Is the transferred token XPR ?  
- Is the amount equal or multiple of 10 ?  
- Is the transfer `from` the contract itself ?

Let convert it to code, for the first two, we will use the `check` function 

```javascript
import { Asset, check, Contract, Name, TableStore } from "proton-tsc";
import { GreetsTable, TicketsTable } from "./tables";

@contract
export class mycontract extends Contract {

    private greetsTable:TableStore<GreetsTable> = new TableStore<GreetsTable>(this.receiver,this.receiver)

    private ticketsTable:TableStore<TicketsTable> = new TableStore<TicketsTable>(this.receiver,this.receiver)

    @action("transfer",notify)
    transfer(from:Name,to:Name, quantity: Asset, memo:string): void {
check(quantity.symbol.getSymbolString() == "XPR", "Token must be XPR");
check(quantity.amount %10 == 0, "Amount must be a multiple of 10");
    }
}
```

The check accepts two parameters, the first is the condition represented by a `boolean`, and the second one is the error message as a `string`. If the condition is `true` the action process continues, If the condition is false, the action process is halted and the error message is returned. So for this two check we can think as 

- If the token symbol IS XPR we can continue, if not we stop and send “Token must be XPR”  
- If the quantity of transferred token is a multiple of 10000 (10000? I will explain it right after) we can continue, if not, we stop and send “Amount must be a multiple of 10” 


Ok but what about the third check “*Is the transfer `from` the contract itself ?”*. Well, this check should not halt the action but we need to stop the process to avoid error to occur. For this, we simply use the good old `if` statement and `return` to halt the process silently. 

```javascript
import { Asset, check, Contract, Name, TableStore } from "proton-tsc";
import { GreetsTable, TicketsTable } from "./tables";

@contract
export class mycontract extends Contract {

    private greetsTable:TableStore<GreetsTable> = new TableStore<GreetsTable>(this.receiver,this.receiver)

    private ticketsTable:TableStore<TicketsTable> = new TableStore<TicketsTable>(this.receiver,this.receiver)

    @action("transfer",notify)
    transfer(from:Name,to:Name, quantity: Asset, memo:string): void {
check(quantity.symbol.getSymbolString() == "XPR", "Token must be XPR");
check(quantity.amount %10_0000 == 0, "Amount must be a multiple of 10");
if (from == this.receiver) return;
    }
}
```

Great now we are done with the checks. Now let’s store some values 🙂. We have to verify if the current user that transfers the amount has an entry or not in the `tickets` table. To do so we use the `get`method of the `TableStore`.

Then we need to convert the transferred amount into a ticket number, so we do a little computation by dividing the amount of transferred tokens by … 10000\! Why ?? Well, because, in smart contract, the token value is displayed without a comma, and zeros are added to match the required precision. That means, for XPR by example who have a precision of 4, 1 XPR is expressed as 1000 on contract side.    
We wrap the returned value from the calculus in an explicit cast as u32 to make sure it match the table type of the `count` field

If the current user has a row in the `tickets` table we update the count, if not, we create a new entry with the bought tickets count. 

```javascript
import { Asset, check, Contract, Name, TableStore } from "proton-tsc";
import { GreetsTable, TicketsTable } from "./tables";

@contract
export class mycontract extends Contract {

    private greetsTable:TableStore<GreetsTable> = new TableStore<GreetsTable>(this.receiver,this.receiver)
    private ticketsTable:TableStore<TicketsTable> = new TableStore<TicketsTable>(this.receiver,this.receiver)

    @action("transfer",notify)
    transfer(from:Name,to:Name, quantity: Asset, memo:string): void {
        check(quantity.symbol.getSymbolString() == "XPR", "Token must be XPR");
        check(quantity.amount % 10_0000 == 0, "Amount must be a multiple of 10");
        if (from == this.receiver) return;

	 // We use the get method from the TableStore to get a possible row
        let existingTickets = this.ticketsTable.get(from.N);	 // We convert the transfered amount into ticket
 const boughtTickets = u32(quantity.amount / 10_0000);

        if (existingTickets) {
            // If the user have row we add the bougth tickets to the entry
            existingTickets.count += boughtTickets;	     // We use the update method of the table store, the current contract is the   	     // ram payer 
            this.ticketsTable.update(existingTickets, this.receiver);
        } else {
            // If the user have no row we create a new one and set boughtTickets
            const newTicket = new TicketsTable(from, boughtTickets);
            // We create the new entry in the table, the current contract is the   	     // ram payer.
            this.ticketsTable.store(newTicket, this.receiver);
        } 
    }
}
```

If you make an abstraction of the comments, the process is quite short isn’t.  
Great, our payment flow is ready, now let’s add another action to let the user create a greeting message. The action will be named `greet`. Before doing the process itself, our new action will also need some checks:

- Is the owner's signature valid ?   
- Is the message not too long?  
- Does the owner have at least 1 ticket ?

If the conditions above are met, the process would be simple, we should create a new instance of a `greets` and store it, and finally decrease the tickets count from the current owner. Let’s code this:

```javascript
import { Asset, check, Contract, Name, requireAuth, TableStore } from "proton-tsc";
import { GreetsTable, TicketsTable } from "./tables";

@contract
export class mycontract extends Contract {

    private greetsTable:TableStore<GreetsTable> = new TableStore<GreetsTable>(this.receiver,this.receiver)
    private ticketsTable:TableStore<TicketsTable> = new TableStore<TicketsTable>(this.receiver,this.receiver)

    @action("transfer",notify)
    transfer(from:Name,to:Name, quantity: Asset, memo:string): void {
        check(quantity.symbol.getSymbolString() == "XPR", "Token must be XPR");
        check(quantity.amount % 10_0000 == 0, "Amount must be a multiple of 10");
        if (from == this.receiver) return;

        let existingTickets = this.ticketsTable.get(from.N);
 const boughtTickets = u32(quantity.amount / 10_0000);

        if (existingTickets) {
            existingTickets.count += boughtTickets;
            this.ticketsTable.update(existingTickets, this.receiver);
        } else {
            const newTicket = new TicketsTable(from, boughtTickets);
            this.ticketsTable.store(newTicket, this.receiver);
        }
    }

    @action('greet')
    postGreet(owner: Name, message: string): void {
        
        // Check if the owner is authorized
        requireAuth(owner);
        // Check if the message is bellow 256 chars
        check(message.length <= 256, "Greeting message is too long");
        // Get the possible ticket row or return an error
        let existingOwner = this.ticketsTable.requireGet(
owner.N,
`No ticket found for ${owner}`
  );
        // Just for the compiler to not complain
        if (!existingOwner) return;
        // Check if the user have at least 1 ticket
        check(existingOwner.count > 0, `No ticket found for ${owner}`);
        
        // Create the new message entry
        const newGreetMessage = new GreetsTable(
this.greetsTable.availablePrimaryKey, 
owner, 
message
  );
        // Store the new message entry
        this.greetsTable.store(newGreetMessage, this.receiver);

        // Decrease the message count for the current user
        existingOwner.count -= 1;
        // Update the current user row in ticketsTable
        this.ticketsTable.update(existingOwner, this.receiver);

    }
}
```

The first check here is one of the more important checks \! Remember this function `requireAuth` is a function that verifies if the account has signed the action within the transaction, if not it halts the action process and throws an error message. The second one checks if the message is below or equal to 256 characters. Why? Because we want to limit the RAM usage, of course.

After we try to get the ticket row for the `owner` with the `requireGet` method from the `TableStore` api. You can see this method as the same as the previously used `get` combined with a `check` to throw an error if it does not exist. Because the `existingOwner` could be null, the compiler could cry about it for the next lines, to make him happy, we add an extra `if` statement with a return. The last check is for the tickets count that should be at least 1\. 

After all those checks, the real process starts. We create a new `GreetTable` entry. The line `this.greetsTable.availablePrimaryKey` could be translated as “Please provide me with the next available key from this table”, then we set the greeting message owner and the message itself and store it into the table. 

And finally, we decrease the tickets count for the current user and update his row from the ticket table \! 

## **Let’s play!** 

Now, you may wanna deploy this contract, yes but… no. I’m sorry but before rushing to deploy our contract on-chain, better to perform some tests with the `playground.ts`. 

The playground is a simple file that allows you to test your action in a basic environment. It uses the `@proton/vert` package, which emulates XPR Network in a breeze. But it has limitations… The blockchain is just like started at block 0, it has no tokens, no contract, no account. If you need something that exists on testnet or mainnet, you have to define it. 

Also the playground IS NOT a testing suite. For a small contract like this it’s ok, but for a larger and more complex contract, I would suggest you create a real test suite with Mocha and Chai. 

Let’s open the file: 

```javascript
import { Blockchain } from "@proton/vert";

async function wait(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function main() {
    const blockchain = new Blockchain();
    const contract = blockchain.createContract('mycontract', 'target/mycontract.contract');
    await wait(0);

    // Put you actions calls here
    await contract.actions.transfer([]).send('mycontract@active');
}

main();
```

Fortunately, the playground file has been pre-populated when we have generated the contract from the CLI. The `main` function creates an instance of the blockchain emulator, then it loads our contract. This `blockchain.createContract` loads the contract ABI and WASM file and return a new account named ‘mycontract’. The next line uses a little trick with wait(0), it’s just to give the blockchain emulator the time to handle the change. 

Then we have the line to have our interest, the call of our transfer action. But it has no parameters\! Remember (or scroll up) we need: `from`, `to`,  `quantity` and then `memo` … But we have to create accounts, tokens and all that jazz 🙂. 

Hopefully our friends from the engineering team have provided us with some helpers \! Let’s add some accounts. 

```javascript
import {Blockchain, mintTokens} from "@proton/vert";

async function wait(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function main() {
  const blockchain = new Blockchain();
  const contract = blockchain.createContract(
    "mycontract",
    "target/mycontract.contract"
  );

  // Create accounts
  const [mitch, alice] = blockchain.createAccounts("mitch", "alice");
  // Create tokens account with contract
  const tokens = blockchain.createContract(
    "xtokens",
    "node_modules/proton-tsc/external/xtokens/xtokens"
  );
  await wait(0);
  // Mint 10 million XPR with precision 4
  // Distribute 1 million each to mitch and alice
  await mintTokens(tokens, "XPR", 4, 10_000_000, 1_000_000, [mitch, alice]);
  await wait(0);
  // Transfer 10XPR from alice to our contract
  // This should trigger a notification on our contract
  await tokens.actions
    .transfer([
      alice.name.toString(),
      contract.name.toString(),
      "10.0000 XPR",
      "",
    ])
    .send(`${alice.name.toString()}@active`);
  }

main();

```

With these new lines, we have created `bob` and `alice` accounts  with the `createAccounts` method on the `blockchain` emulator instance. Then we use again the `createContract` method to load the token contract available from the proton-tsc package in an account named `xprtoken`, and we mint the XPR Token with the same precision as the original XPR token: 4, with a 10\_000\_000 (10 million)  max supply, and finally provide 1 millions to bob and alice. 

Finally we add the bob account as the first parameters (the `from`), the second is the contract (the `to`), set ‘10.0000 XPR’ for the third (the `quantity`) and an empty string for the fourth (the `memo`). 

Before running the playground, we have to compile our contract to generate the target folder within our WASM and ABI file.

Open the integrated terminal of your code editor

```javascript
npm run build 
```

   
The terminal should print something like this 

```javascript
npm run build

> mycontract@0.0.0 build
> npx proton-asc mycontract.contract.ts

Build Starting ······
++++++writeFile: ../target/mycontract.contract.abi
Build progressing. Generating target files ······
Build Done. Targets generated. Target directory: target.
```

And you should have a new target folder containing the following:  
![image4](/smart-contracts/write-your-first-sc-4.png)

Great, so now let’s run our playground 

```javascript
node ./playground.ts
```

Here is the output of the playground run, I have omitted some debug traces to keep the following short. 

```javascript
mycontract@0.0.0 playground
> npm run build && cross-env LOG_LEVEL=debug ts-node ./playground.ts


> mycontract@0.0.0 build
> npx proton-asc mycontract.contract.ts

Build Starting ······
++++++writeFile: ../target/mycontract.contract.abi
Build progressing. Generating target files ······
Build Done. Targets generated. Target directory: target.

[09:27:26] DEBUG: 
  
START ACTION
Contract: xtokens
Action: create
Inline: false
Notification: false
First Receiver: xtokens
Sender: 
Authorization: [{"actor":"xtokens","permission":"active"}]
Data: {
    "issuer": "xtokens",
    "maximum_supply": "10000000.0000 XPR"
}
Action Order: 0
Execution Order: 0

// ... omitted debug
  
START ACTION
Contract: xtokens
Action: issue
Inline: false
Notification: false
First Receiver: xtokens
Sender: 
Authorization: [{"actor":"xtokens","permission":"active"}]
Data: {
    "to": "xtokens",
    "quantity": "10000000.0000 XPR",
    "memo": ""
}
Action Order: 0
Execution Order: 0

// ... omitted debug
  
START ACTION
Contract: xtokens
Action: transfer
Inline: false
Notification: false
First Receiver: xtokens
Sender: 
Authorization: [{"actor":"xtokens","permission":"active"}]
Data: {
    "from": "xtokens",
    "to": "mitch",
    "quantity": "1000000.0000 XPR",
    "memo": ""
}
Action Order: 0
Execution Order: 0

// ... omitted debug
  
START ACTION
Contract: xtokens
Action: transfer
Inline: false
Notification: false
First Receiver: xtokens
Sender: 
Authorization: [{"actor":"xtokens","permission":"active"}]
Data: {
    "from": "xtokens",
    "to": "alice",
    "quantity": "1000000.0000 XPR",
    "memo": ""
}
Action Order: 0
Execution Order: 0

// ... omitted debug
  
START ACTION
Contract: xtokens
Action: transfer
Inline: false
Notification: false
First Receiver: xtokens
Sender: 
Authorization: [{"actor":"alice","permission":"active"}]
Data: {
    "from": "alice",
    "to": "mycontract",
    "quantity": "10.0000 XPR",
    "memo": ""
}
Action Order: 0
Execution Order: 0

// ... omitted debug
  
START ACTION
Contract: mycontract
Action: transfer
Inline: false
Notification: true
First Receiver: xtokens
Sender: 
Authorization: []
Data: {
    "from": "alice",
    "to": "mycontract",
    "quantity": "10.0000 XPR",
    "memo": ""
}
Action Order: 0
Execution Order: 1
```

You can see that the playground command includes the run of the build command. This is made to make sure the contract is up to date with your last changes. 

The most interesting traces are the last 2 traces. The second to last action is the transfer of 10 XPR we initiated from the `alice` account to `mycontract` account  transfer through our `xtokens` token contract.   
And so the last one is the notification of the transfer to our `mycontract` account: The `Contract` field is set to `mycontract`,  the `Notification` field of the trace is set to true and the `First Receiver` is `xtokens`. 

Let's see if we can explore our contract table and verify if `alice` has tickets.

```javascript
import {Blockchain, mintTokens, nameToBigInt} from "@proton/vert";

async function wait(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function main() {
  const blockchain = new Blockchain();
  const contract = blockchain.createContract(
    "mycontract",
    "target/mycontract.contract"
  );

  // Create accounts
  const [mitch, alice] = blockchain.createAccounts("mitch", "alice");
  // Create tokens account with contract
  const tokens = blockchain.createContract(
    "xtokens",
    "node_modules/proton-tsc/external/xtokens/xtokens"
  );
  await wait(0);
  // Mint 10 million XPR with precision 4
  // Distribute 1 million each to mitch and alice
  await mintTokens(tokens, "XPR", 4, 10_000_000, 1_000_000, [mitch, alice]);
  await wait(0);
  // Transfer 10XPR from alice to our contract
  // This should trigger a notification on our contract
  await tokens.actions
    .transfer([
      alice.name.toString(),
      contract.name.toString(),
      "10.0000 XPR",
      "",
    ])
    .send(`${alice.name.toString()}@active`);

  await wait(0);
  // Reading all rows from tickets table on mycontract
  const rows = await contract.tables
    .tickets(nameToBigInt("mycontract"))
    .getTableRows();
  // Output available rows
  const output = rows.map((row: any) => {
    return `Account ${row.owner} have ${row.count} ticket(s)`;
  });
  console.log(output.join("\n"));
}

main();
```

Great, let’s see what the playground outputs, run it again\!  
I just kept the end of the traces

```javascript
// ... omitted debugSTART ACTION
Contract: mycontract
Action: transfer
Inline: false
Notification: true
First Receiver: xtokens
Sender: 
Authorization: []
Data: {
    "from": "alice",
    "to": "mycontract",
    "quantity": "10.0000 XPR",
    "memo": ""
}
Action Order: 0
Execution Order: 1

// ... omitted debug

Account alice have 1 ticket(s)
```

   
Great, let's make another round of modification. Alice will buy 3 tickets for 30 XPR, mitch will transfer 12 XPR and it should raise an error. Then alice will post a message, and we will verify tables again.

```javascript
import {Blockchain, mintTokens, nameToBigInt} from "@proton/vert";

async function wait(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function main() {
  const blockchain = new Blockchain();
  const contract = blockchain.createContract(
    "mycontract",
    "target/mycontract.contract"
  );

  // Create accounts
  const [mitch, alice] = blockchain.createAccounts("mitch", "alice");
  // Create tokens account with contract
  const tokens = blockchain.createContract(
    "xtokens",
    "node_modules/proton-tsc/external/xtokens/xtokens"
  );
  await wait(0);
  // Mint 10 million XPR with precision 4
  // Distribute 1 million each to mitch and alice
  await mintTokens(tokens, "XPR", 4, 10_000_000, 1_000_000, [mitch, alice]);
  await wait(0);
  // Transfer 30XPR from alice to our contract for 3 tickets
  // This should trigger a notification on our contract
  await tokens.actions
    .transfer([
      alice.name.toString(),
      contract.name.toString(),
      "30.0000 XPR",
      "",
    ])
    .send(`${alice.name.toString()}@active`);

  await wait(0);
  
  // Transfer 12XPR from mitch to our contract
  // This should throw an error
  // so we catch it to be sure our playground continue
  try {

    await tokens.actions
    .transfer([
      mitch.name.toString(),
      contract.name.toString(),
      "12.0000 XPR",
      "",
    ])
    .send(`${mitch.name.toString()}@active`);
    
  } catch (e: any) {
    // Logging the error
    console.log(e)
  }
  // Reading all rows from tickets table on mycontract
  const rows = await contract.tables
    .tickets(nameToBigInt("mycontract"))
    .getTableRows();
  // Output available rows
  const output = rows.map((row: any) => {
    return `Account ${row.owner} have ${row.count} ticket(s)`;
  });
  console.log(output.join("\n"));
}

main();

```

  Now we run our playground again and  here is the output

```javascript

// ... omitted debug

START ACTION
Contract: xtokens
Action: transfer
Inline: false
Notification: false
First Receiver: xtokens
Sender: 
Authorization: [{"actor":"alice","permission":"active"}]
Data: {
    "from": "alice",
    "to": "mycontract",
    "quantity": "30.0000 XPR",
    "memo": ""
}
Action Order: 0
Execution Order: 0

// ... omitted debug
  
START ACTION
Contract: mycontract
Action: transfer
Inline: false
Notification: true
First Receiver: xtokens
Sender: 
Authorization: []
Data: {
    "from": "alice",
    "to": "mycontract",
    "quantity": "30.0000 XPR",
    "memo": ""
}
Action Order: 0
Execution Order: 1

// ... omitted debug
  
START ACTION
Contract: xtokens
Action: transfer
Inline: false
Notification: false
First Receiver: xtokens
Sender: 
Authorization: [{"actor":"mitch","permission":"active"}]
Data: {
    "from": "mitch",
    "to": "mycontract",
    "quantity": "12.0000 XPR",
    "memo": ""
}
Action Order: 0
Execution Order: 0

// ... omitted debug
  
START ACTION
Contract: mycontract
Action: transfer
Inline: false
Notification: true
First Receiver: xtokens
Sender: 
Authorization: []
Data: {
    "from": "mitch",
    "to": "mycontract",
    "quantity": "12.0000 XPR",
    "memo": ""
}
Action Order: 0
Execution Order: 1

// ... omitted debug

[11:18:24] DEBUG: revert item update
[11:18:24] DEBUG: revert item update
Error: eosio_assert: Amount must be a multiple of 10
    at eosio_assert 

// ... omitted debug

Account alice have 3 ticket(s)
```

Great as expected the mitch transfer throw an error and alice receive 3 tickets to post message   
Ok now the final round, alice will post a message that should reduce her tickets to 2\. Mitch will also post a message and that should throw an error according to our check in the `greet` action   

```javascript
import {Blockchain, mintTokens, nameToBigInt} from "@proton/vert";

async function wait(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function main() {
  const blockchain = new Blockchain();
  const contract = blockchain.createContract(
    "mycontract",
    "target/mycontract.contract"
  );

  // Create accounts
  const [mitch, alice] = blockchain.createAccounts("mitch", "alice");
  // Create tokens account with contract
  const tokens = blockchain.createContract(
    "xtokens",
    "node_modules/proton-tsc/external/xtokens/xtokens"
  );
  await wait(0);
  // Mint 10 million XPR with precision 4
  // Distribute 1 million each to mitch and alice
  await mintTokens(tokens, "XPR", 4, 10_000_000, 1_000_000, [mitch, alice]);
  await wait(0);
  // Transfer 30XPR from alice to our contract for 3 tickets
  // This should trigger a notification on our contract
  await tokens.actions
    .transfer([
      alice.name.toString(),
      contract.name.toString(),
      "30.0000 XPR",
      "",
    ])
    .send(`${alice.name.toString()}@active`);

  await wait(0);
  // Transfer 12XPR from mitch to our contract
  // This should throw an error
  // so we catch it to be sure our playground continue
  try {

    await tokens.actions
    .transfer([
      mitch.name.toString(),
      contract.name.toString(),
      "12.0000 XPR",
      "",
    ])
    .send(`${mitch.name.toString()}@active`);
    
  } catch (e: any) {
    // Logging the error
    console.log(e)
  }

  await wait(0);
  // alice trigger the greet action on our contract 
  // With a message
  try {

    await contract.actions
      .greet([
        mitch.name.toString(),
        "XPR Network devs rules!",
      ])
      .send(`${mitch.name.toString()}@active`);
    
  } catch (e: any) { 
    console.log(e)
  }
  await contract.actions
  .greet([
    alice.name.toString(),
    "XPR Network devs rules!",
  ])
  .send(`${alice.name.toString()}@active`);

  await wait(0);
  // Reading all rows from tickets table on mycontract
  const ticketsRows = await contract.tables
    .tickets(nameToBigInt("mycontract"))
    .getTableRows();
  // Output available rows
  const ticketsOutput = ticketsRows.map((row: any) => {
    return `Account ${row.owner} have ${row.count} ticket(s)`;
  });
  console.log(ticketsOutput.join("\n"));
 
  const greetsRows = await contract.tables
    .greets(nameToBigInt("mycontract"))
    .getTableRows();
  // Output available rows
  const greetsOutput = greetsRows.map((row: any) => {
    return `Account ${row.owner} has posted "${row.message}"`;
  });
  console.log(greetsOutput.join("\n"));
}

main();

```

```javascript
  
START ACTION
Contract: mycontract
Action: transfer
Inline: false
Notification: true
First Receiver: xtokens
Sender: 
Authorization: []
Data: {
    "from": "alice",
    "to": "mycontract",
    "quantity": "30.0000 XPR",
    "memo": ""
}
Action Order: 0
Execution Order: 1

// ... omitted debug
  
START ACTION
Contract: xtokens
Action: transfer
Inline: false
Notification: false
First Receiver: xtokens
Sender: 
Authorization: [{"actor":"mitch","permission":"active"}]
Data: {
    "from": "mitch",
    "to": "mycontract",
    "quantity": "12.0000 XPR",
    "memo": ""
}
Action Order: 0
Execution Order: 0

// ... omitted debug
  
START ACTION
Contract: mycontract
Action: transfer
Inline: false
Notification: true
First Receiver: xtokens
Sender: 
Authorization: []
Data: {
    "from": "mitch",
    "to": "mycontract",
    "quantity": "12.0000 XPR",
    "memo": ""
}
Action Order: 0
Execution Order: 1

// ... omitted debug

[12:03:39] DEBUG: revert item update
[12:03:39] DEBUG: revert item update
Error: eosio_assert: Amount must be a multiple of 10
    at eosio_assert 
  
START ACTION
Contract: mycontract
Action: greet
Inline: false
Notification: false
First Receiver: mycontract
Sender: 
Authorization: [{"actor":"mitch","permission":"active"}]
Data: {
    "owner": "mitch",
    "message": "XPR Network devs rules!"
}
Action Order: 0
Execution Order: 0

// ... omitted debug

Error: eosio_assert: No ticket found for mitch
    at eosio_assert 

// ... omitted debug
  
START ACTION
Contract: mycontract
Action: greet
Inline: false
Notification: false
First Receiver: mycontract
Sender: 
Authorization: [{"actor":"alice","permission":"active"}]
Data: {
    "owner": "alice",
    "message": "XPR Network devs rules!"
}
Action Order: 0
Execution Order: 0

Account alice have 2 ticket(s)
Account alice has posted "XPR Network devs rules!"
```

Perfect this last run confirms almost everything from our check\! This concludes our playground experimentation. Little reminder: **Playground don’t replace proper test suites, it’s just a place to play with action from your contract\!**

## **Let’s deploy it!**

This is the moment we have been waiting for, making our contract alive on-chain. And guess what, for this we will use… the CLI \! 

First let’s create an account on testnet, we switch to proton testnet with the following

```javascript
proton chain:set proton-test
```

Then, we create our account and output the keys in a json file in the same folder as our contract project, pick a cool account name for yourself. **For a project on production remember to exclude the account.json files from commit 🙂**

```javascript
proton account:create coolaccname > account.json
// Below are the interactive prompt for the account:create command
Enter private key for new account (leave empty to generate new key): 
Enter email for verification code: cool@gmail.com
Enter display name for account: Cool Name
Enter 6-digit verification code (sent to cool@gmail.com):000000    

```

Great now you account.json should be available in your project folder![image5](/smart-contracts/write-your-first-sc-5.png)

Open it and remove the text outside the JSON body. I suggest you to add an `actor` field to the JSON with the name you choose for the account. Now  save the json file and copy the value of the `private` field.   
Next we will add this private key to the CLI secure storage. 

```javascript
proton key:add paste_your_private_key// Success: Added new private key for public key: should_be_your_public_key
```

Sweet, now we are able to push transactions through CLI for the account we have created. So let’s claim faucets to buy ram. 

```javascript
proton faucet:claim XPR your_account_name// Success: Faucet claimed
```

And now we buy the 45000 bytes of ram for ourself to deploy our contract

```javascript
proton buy:ram your_account_name your_account_name 450000// Success: RAM Purchased
```

And FINALLY we deploy our contract wasm (-w flag) and abi (-a flag) \! 

```javascript
proton contract:set your_account_name ./target
// get abi for eosio
// get abi for eosio
// WASM Successfully Deployed:
// https://proton-test.ProtonScan.io/tx/...
// get abi for eosio
// get abi for eosio
// ABI Successfully Deployed:
// https://testnet.protonscan.io/tx/...
```

HORRRRAY we did it\! Now our contract is living on the testnet \! Visit the link [https://testnet.explorer.xprnetwork.org/](https://testnet.explorer.xprnetwork.org/) search for you account, and go to the contract tab you should have this\! 

Our tables  
![image6](/smart-contracts/write-your-first-sc-6.png)

Our action, here we just see the ‘greet’ action, because the transfer action is a notification 🙂  
![image7](/smart-contracts/write-your-first-sc-7.png)

Now we can send 10 XPR from webauth testnet to get a ticket and trigger the `greet` action from the explorer form.   
If you don’t have a testnet account, you can repeat the account creation step from the deploy section to create and claim faucet to test it \! 

## Conclusion

To close this chapter on smart contract development with typescript, as you can see this is really easy to create scalable smart contracts that back your dApp, and create complete on-chain experience on XPR Network. Don’t by shy, code don’t byte, open the proton-tsc package and read the source code, you will surely find interesting concepts,learn more about the way it works and how you can leverage base classes to make advanced smart contracts.

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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w9eVYOicnJy0c+fOuWsWFhbagQMH7NChQ4ljT5486QKt5qn5KOT29/fPG6eystKuXr1q9fX1kWsBAABgdSwrvOaWVrp1rsHwWju1P3LcUhw5ciQRBBU4VWENHyMNDQ12//59t62gevfuXcvI+CAsq039wbZLly65McNjSTC8qpra2NiY6FOofvTokau+FhUVuVCclZWV6FebrwJrnJ6eHjdGTU1N5DoAAABYPcsKr017z0WWDPRe+9RccMyMHLuYzs7OREV1//791tfX57ZVTd2xY4erZmoZwOPHjx31KaiqLThOsjaNq2AZvqb48JqZmenGVSAN9t+5c8dVWZuamlwwDZ8fHMfPTVXbcD8AAABWz7LCa/flFyPhVUraFl5juhBVNLVuVY//9ad/zD8+Pm6nT592VVDtK5wqUPrtcFBN1raU8Krta9euWV1dXaJPFVdVXjUXzUvLDxRyfb/m7NfEapyuri4XtLXmNngcAAAAVlfa4bWgusEmX303ElylenTGsguKrHHnSWveey5y7kJ27tzp1pxqralv0/dTjx8/7sKgqCq7kvCqoOqXJ0gwvGo97bFjx1wg1bW2b98+b/mCXv7asmWL61Og1VxHRkbmjaM+hW3dS3AOAAAAWD1ph9fi5o2R0Or1337Nxl5+032JIK+sKnLuQhQ89di9tbU10abH+AqJWtuqUDo2Nrai8DoxMWGXL19O9AXDq4Knviag8UUvaPmXyPxcFEzVpxfK9PKWXwMbHEfLBvS1AoXkYFAGAADA6kg7vIrWt8pY4KUtbTfuOmU5Ren/QwV6Q1/BM9kjd31pIPgS1kosNo6ur7W24XbPV2bD7QAAAHg6lhVeX/hDCCyqb7UNLd3u+66ZOck/SbUYVUS15nShtakAAACAt7zwuor0tQE+MQUAAICleObhFQAAAFgqwisAAABig/AKAACA2CC8AgAAIDYIrwAAAIgNwisAAABig/AKAACA2CC8AgAAIDYIrwAAAIgNwisAAABig/AKAACA2CC8AgAAIDYIrwAAAIgNwisAAABig/AKAACA2CC8AgAAIDYIrwAAAIgNwisAAABig/AKAACA2CC8AgAAIDYIrwAAAIgNwisAAABig/AKAACA2CC8AgAAIDYIrwAAAIgNwisAAABig/AKAACA2CC8AgAAIDYIrwAAAIgNwisAAABig/AKAACA2CC8AgAAIDYIrwAAAIgNwisAAABig/AKAACA2CC8AgAAIDYIrwAAAIgNwisAAABig/AKAACA2CC8AgAAIDYIrwAAAIgNwisAAABig/AKAACA2CC8AgAAIDYIrwAAAIgNwisAAABig/AKAACA2CC8AgAAIDYIrwAAAIiN/w9pxTdXmijuRAAAAABJRU5ErkJggg==>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAqcAAAEQCAYAAACNwt1UAAA8HUlEQVR4Xu3dd5Mdx33ucb8Ibc455wBszhGLsIuccwYWOQcGCKQoiUGBl5ZlS7Qlk5Ilk5Rl6ZavfW3JvnbZLmeXXXb5xfzueRrsg9mZswnYxc6C3z8+hZnuCX0OVaUHv+4++I0vfelLBgAAAMTBb4QbAAAAgLVCOAUAAEBsEE4BAAAQG4RTAAAAxAbhFAAAALFBOAUAAEBsEE4BAAAQG4RTAAAAxMa6CKdZWVmWnp4eafcyMjIsMzMz0h4XcR8fAABAXKx4OFUQGx0dteHh4TmBUscjIyOuT8fl5eXuuKKiInlNc3OzuyY3N9edl5WVWX9/v7tO7W1tbZaWlpa8Pjs727q7u5PP7e3ttYKCgmR/Y2PjnOdJQ0ODu1bHdXV17jiss7PT9ff09CTb9Hm6urosLy9vzudVcPbXBN8jOg8+Q8cas/r0jvB7pb6+fs4zAAAAvkhShtOlVPnmu8aHU1G49O0+jIoPrQprfX197lghT0GypaXFnefk5LhAqHBaU1Pj2nWvAqz6FVJ9MFUIVdAcHBy0gYGB5NjUrnt0nQ+1wXBaXFzszv2zOzo63HlVVVVyfHqe3q/3+vEEP6+u9Z9LY/Dt+oy6X/cocKpPxwrQ/j69S+/Uva2tre5cYwo+HwAA4IskZThVYPIBLRWFtfb29ki7BMPpxo0bk+3BSqEPpyUlJckQ66ucvrLog2WwUqnKqcKigqa/t7q6Otnv2zS+4DPEVySD4dTTO8LPEoVL8ecKqLrOj1H0uVRR3bBhw5xrS0tL3bXB71HHCqj5+fnJNr1T1wXbAAAAvqhShlMFTAWuVAFVwU/hdb41oD6cKgQqbKqK6auiPiwG79V7VD1VaFN/uD38fE9hMxwURc9RiNWxf5/O9X5N+T9rONXn0Jj0fF+F9VP6+k4qKyvdsZ/a9+PTNcFnhhFOAQAAnkoZTiVVQFWQWiiY+vsUtrSWVNPpul/3+WeFw2lhYaFrU+gLLhXQ9HewEhnW1NTk7tP7gu2a2vcV22AY1vMUdv19wXsWCqdq92ta9aeWJ/h+Hyz1Gfwz/NT+fOMLI5wCAAA8NW84FQUrTVsrVIpC30LB1N/jw6kPpQqpqiymCqeiQKlp8WCb1mAqsAbDnZ/+V+XSr2HVVL7v1zpVtfkpfB9OdezDoxd810LhVKFW/frswWUHos8VfKb4Nan6/DoPriFVAFVo1Th9G+EUAADgqQXDqShIKqAuJZhKMJyqEqpAJ2pfTjhVqNN9em9RUZF73tDQULIqqulyrT8VhVaFVL8Bya9TDYZTCW5eCr5roXDqq7cKj7rGb9hSSNW51t7qWPzGKj3Pj09hVetP9XkUdPUZgp+fcAoAAPDUouF0uYLhVOcKnX7z1HLCqegZ/qekRME0OPWv9Z3B6qXCn4Ks7w+HUz+ecNtSwqnoc/ifpgpO6Yef46f2FTj90gA/vnAIJZwCAAA8teLhdDWoKhkOtEEKxIttPFpLflNYuB0AAABzrYtwCgAAgC8GwikAAABig3AKAACA2CCcAgAAIDYIpwAAAIgNwikAAABig3AKAACA2CCcAgAAIDYIpwAAAIgNwikAAABig3AKAACA2CCcAgAAIDZWPJzm5eXZwYMHLSsrK9L3IhUWFtrExESkPW56e3utpqYm0h6m73VqairSDgAA8DJZ8XAqIyMjdvz4ccvMzIz0vSjV1dV27dq1SHvcHD582AXUcHtYWVmZ3blzJ9IOAADwMlmVcCrDw8NrGlAJpwAAAOvPqoVTGRoasqNHj1pGRkakL5VLly7Zxo0b7fz583b16lU3jZ2enp7s7+josDNnztitW7dcqFNg830FBQV26NAh13f69Gnr6uqaE05zcnJsz549duPGDTt79qx7Vvj9qfT399u2bdts165d7tkK3EVFRbZ//34XFs+dOzdnHFVVVXbkyBF37cmTJ62trS3yvIsXL9rNmzfdsgNd68OplkM0Nzcnr21oaHCfU8fhcLrQ59FfCHbs2OE+v2zZsmXO9wgAABBXqxpOZWBgwAWwcHsq9+7dc6EvPz/fhTwF1KamJtfX2NjoAl19fb1lZ2e7pQNXrlxxx+pXIN25c6dbm1lZWekCYDCcKiRPT09bbm6u1dbW2vXr162uri4yhrDR0VEXNBUU9S59Fo1DIVLravVOhUpdq3HruX19fe5aXaN7VcVVvz/XZ1C43LRpk929ezcZTvUZ2tvbk+9ubW114VfH4XC60OfRd+P/UqDvQ8f+ewQAAIizFxJOT5w4EWlPReFUQcufK3yJjlUJnJycnHO9KqwKfNr8dP/+/TkV2u7u7mQ4VWjUs4PVw82bN9vWrVsjYwhTOFVF1p/39PTYqVOnkud6v4KwjlW9DH9WjV/v0rGCbPgzKGAvN5wu9nlUkdWzSkpK5rwLAAAg7lY1nCqYamp7qTv3FbiKi4uT52NjY246Xcd6Tmdn55zrDxw44JYOqKqqJQHBPoVcH07V//DhQ1eJ9XS+d+/eyBjCFE53796dPNdygWPHjiXPVVGdnZ11xwqeCtHB+/Ud+HCb6jOoqrnccLrY59G0/szMjKvwXr582Y2LaX0AALAerFo4VShThXGpwVQWCqcKiAqKweu1/lQBThVC3ZuWlpbsUxXTh1M981k3Ey0nnKpaq7AZvF/rPX1FU2tE9ZmC/brXh1OFVz3D9+kzpAqny/k8+pkqVXbD3x0AAEAcrUo4VTBVFdCvB12qhcLphg0bXNjUZiSda+OUKoNac6lzhTxVCBVQ1aZQF1xzeuHCBRfQ1K/pf1UWg0FwPssJpxqb1pT6TU0KlBqjKp0694HZfwaF0gcPHiTDqaquqrIq0Kv6qaCbKpzKQp9H0/pad6pj9euZ/hwAACDOVjycagOOwttyg6ksFE5FAUsbfxQAFc6C61MV3hTkbt++7aa5BwcH54RTBUJVcnWvQp6mwJfyM1fLCaeijUeqVOo9God25wefp18gUJ9oDWpwt77GqGdpfFqLqg1T84XThT6P/y70XWkM2mT2LP89AAAAXrQVD6cvwkJBa6E+UVUyuHFKYXM+fpf9s1hoHFr/udByB+3kDy5RWEj48wRpDKw1BQAA68m6DKcrad++ffPSzvzw9QAAAFg9X/hwCgAAgPggnAIAACA2CKcAAACIDcIpAAAAYoNwCgAAgNggnAIAACA2CKcAAACIDcIpAAAAYoNwCgAAgNggnAIAACA21m04zcvLs6mpqUi7V1tbyz8/CgAAsM7EKpxu2LDBurq6Iu2plJWV2Z07dyLtXl9fnx06dCjSDgAAgPhasXCqSma4LWyxazZv3mw7duyItKdCOAUAAHj5rFg4PXbsmA0MDETavZGRETt48GCk3duyZYvdvn3bBc4rV664IJuRkWHT09N2/fp1u3Hjhu3Zs8eysrLc9T6ctre32+XLl901ujYtLc31h8NpZWWlHTlyxG7dumVHjx61qqqqZF9RUZFru3nzpl26dGnJ1VsAAACsrBULp9nZ2Xb69OmUAXV4eNiOHz+eDJappKen29atW23Xrl2WmZnp2jo6OlygLSgosMLCQjt16pSNj4+7PoXTBw8e2P79+11faWmpnTt3zjZt2uT6g+FUQffq1avW3d3txqk/r127Zjk5Oa7/8OHDNjEx4Y4VYvWc3NzcyBgBAACwulYsnIqCnwJkMKAODQ25YOoD50IWmtZXeJ2cnExWXxVOHz586IKpv6apqclmZ2fdcTCcKuRqDMHnKUi3tra64xMnTrj3+rAKAACAtbGi4VRUHT158qQLqKLp8qUEUwmHU023K2CqyqmpfoVRhUr1KZzevXt3zv26XtVUTe0Hw6lCre5V9dTTeX9/v+svKSlxoVfLBM6cOcO0PgAAwBpZ8XAqCqiqRmqNp9aNhvvnEw6nul9T/f4ZWrd64MABd+wrp8FNVnV1dS7E6jgYTjWNv5TNUarOag2rQq9+iircDwAAgNW1KuH0WQ0ODrplAQqJOlcF1q8xzc/Pt4sXL0bCqcKswqsCsTZlzczMuP5gOFVFVZudGhsbk89S8NX6Up3rmVoSoGMtTVCltqamJjI+AAAArK5YhVNtfNK0vabXFSDr6+uTO/UvXLjgdvQHw6mu09S8gqeOFUb9EoLwbv3m5ma3HlXX6lcBxsbGkn1tbW3uPX7Xv5YBhMcGAACA1RercOr5yqm32M55Xb/QLwEEadOT/7mpMDZEAQAArK1YhlMAAAB8MRFOAQAAEBuEUwAAAMQG4RQAAACxQTgFAABAbKx4ONXPPYXbAAAAgKUgnAIAACA2CKcAAACIDcIpAAAAYoNwCgAAgNggnAIAACA2CKdrLC8vz6ampiLtXm1trfX09ETaAQAAXkarGk4zcvOtenxnRH51o+vPzC+yiv4pK27rtbS09Miz1lJFRcWCoXEhGzZssK6urkh7KmVlZXbnzp1Iu9fX12eHDh2KtC/F+Pi41dTURNoBAADialXDaXZxmXWcf806Zx/bxHufWf+99915aceQFbd22/g7n1jXpTet//4HNvzoQxdmw89bKy0tLXbp0qVI+1Js3rzZduzYEWlPZTXD6ZkzZ6yjoyPSDgAAEFerGk69rIJiF05rJnYn2zrOvWo9199+cp6WZp0XHllZz1jk3qDCwkIX1G7dumWnT5+2jRs3uj/VV1lZaadOnbLh4WG7ceOGdXZ2PnlPIpwppKlt7969lpOTk3ye7jly5Ih73tGjR62qqsq1q/Kp6+/fv29Xrlyx1tZW1z40NOQCq/oOHDjgpuTDY9Tnv337tguculfXZGRk2PT0tF2/ft3du2fPHsvKynLX+3Da3t5uly9fdtfo2rTEd6L+cDidb8xhJ0+edOO/efOmHT9+3LUVFRW5e9Smz7HU6i4AAMCLsmbhtGJgKtH2qbUdvWEFDe2Re1I5d+6czczMWG5urpt21/m1a9dcn6avFcY0Fa8Qm5mZafX19S7sad2mQqnuVbDT9QqNV69ete7ubsvOznZ/6lm6TsFQYVEBTs/ReXV1tXtWQUGBa9u6daubNg+PMT093fXt2rXLXac2BeSDBw+6ezU2hWh/r8LpgwcPbP/+/a6vtLTUfa5Nmza5/mA4XWjM4XEoEJ89e9Zdo2O1HT582CYmJtyxQq7eo+8yfC8AAMBaWbNwKoVNHa6COvHup9Y1+4Zl5EQrkV5JSYndvXvXhT/fpsppMJyqYukrjqKp9WCAVLVSQVDBToHRVxQ9VWF9lTQ8rd/Q0OCqlXV1dXPuSWWhaX2Nf3Jy0oVVnSucPnz40AVTf01TU5PNzs6642A4XWzMYeFp/RMnTrhxpQqzAAAAcbBm4bSsa8QK6lvdcU55tY1+5SOrmdwbuddTONS0d7BNFdFgOFVVMdivSqqCn9o9natqqICYqq+/v9/dGw6n4qf1FVJVGVUlNDxOCYdTTacrYGqsmurXe/xyBIVThe7g/bpeIVpBOxhOFxtzWDicKuArFGsZgfqY1gcAAHGzZuFUG6GGXv+e5VU3Wn5ti42+9bE17TkXudfT9LMCW7DCODo6umA43b17t1uDGn6WaLp7oY1GqcKpV1xc7Nac+iUCYeFwqus01e+n10dGRtz9OvaV0+D6VVVnFWJ1HAyni405LBxOPVVvtWxBoVgBP9wPAACwVl5IONVPRmk3fuXwtmSbdvK3HLzsAurQ69+31sPXLDPvafBMRWtGL1y4YIODgy4Aak3lQuFUG5tUbfWBVkHs2LFjLiSqOqmNQY2NT37WKj8/34VIVVV1rj/v3buXDI1tbW0u7PplBQqYwfWrWj7gw6fGp3Wl/lptTvLLC/SeixcvRsKpwqzu19IDjVGfVf3BcLrYmLU5qre3N/n5VSUN/vfQO7VkQMda2qDvjp+aAgAAcfJCwulK0TS3KoEKbgqAqjAuFE5F1VW/S179wfWZzc3Nbm2nAp/Wq46Nzf21AG1SUrtCrsKcwp2m9FVRVTBWsNR12nilqXKFR51rul/T9mpTgPQbszQGhWt9R8Fwqus0Na9x6Fhh1G+mCu/WX2jMOlbwDV6rsWrjk84VsDUO/6sAWiYQ/LwAAABrbV2F04GBAbdu0p+rGqmfRgpfl8pCu9L9Dv1wuwQ3YImvboavS3V/+N6FxuCvT/XsVOYbc6q28DjYEAUAAOJqXYVTVQZV8dPvlWrnuSqRS9k9DwAAgPVhXYVT0TS4pvY1Zb1YJRIAAADry7oLpwAAAHh5EU4BAAAQG4RTAAAAxMZv6AflV9KePXsibQAAAMBSEE4BAAAQG4RTAAAAxAbhFAAAALFBOAUAAEBsEE4BAAAQG+smnOpfhvr6179uGzdujPQtxfnz523Tpk2RdgAAAMTHqobT0qoaa952MKKqvdv1l9XUW+PETqvtG7fiktLIs4Kqqqrso48+soGBgUjfUuheBdRw+/M4fPiwnTp1KtIOAACAZ7Oq4bS8vtl6Lj223qtv2cR7n9nggw/cef3QZqvtHbXxdz6xvmtfs6GH37GRx7/nwmz4eStlNcLpG2+8Yd/85jcj7QAAAHg2qxpOvfLaBhdOW6YPJ9t6Zh9b/633npyXlFjv5TetYXQ6cm/Qn/3Zn1lXV5c7/vWvf21Hjx61P/3TP7W/+Zu/sUePHrmpf3/t7Oys/fmf/7n94z/+oz18+DASTo8dO2a/+MUv7B/+4R/su9/9rtXX17t2Hd+5cyd5ncLn7du3I2N588037V//9V/t3//93+2v//qvrbm52VV3df3f/u3fOromOCYAAAAsbM3CaePkzkTbp9Z56q5Vdy5tqv7f/u3frK+vzx3/53/+p33/+9+3lpYWGxsbcwF1586drm/37t32z//8z7Z161YXOl9//XX7j//4j2Q43bZtm/3d3/2dW4Pa0NBg77zzjv3oRz9yfQq///RP/2T9/f3ueX/xF3/hQmd4LOXl5fbWW2/Z+++/7/pLEgH71q1b9uMf/9gqKyutqanJHfsxAQAAYHFrFk6lpnvIVVAn3v3Ueq9+1UorqyP3BoXDaXCD09tvv+02TOn429/+tr366qtz7lV104fTb3zjG/bgwQMXKKW6utr++7//22pra12/qq4/+9nP7Fe/+pVNTk5GxuGFp/VfeeUV+/nPf56s7gIAAGB51iyc1o9steqOfndc2dxuY299bC0zRyL3BoXDaWdnZ7Lv3r17roqpYwXLEydOzLlXVUwfTv/rv/7L/ud//sdVWz2dj46OJq9XxVSV2fAYgsLhVBVUVWFVef2rv/ore+2111yFNXwfAAAAUluzcKqNUCOPPrSqti6r3thrY1/9kW04dDlyb9BSw+l3vvMddx68V1VQH04/+OADu3nzZuT53oEDB+yXv/ylm/ofGRmJ9HvhcOqpGquqrta8BtevAgAAYGEvJJzqJ6O0G79pam+yTTv5O47fdAF15MsfWufJ21ZWXRe5N2ip4fT48eMuWHZ0dLigqFCqaXsfTvUTUKps+t9MnZqasp/85CdWUVHh1opqM9PQ0JD7mShtuPLVT61tvXDhQvKd165dc1Va36+NV37zlN77gx/8gHAKAACwDC8knK6UpYZT+fKXv2z/8i//4jZGfetb37KPP/54zm59hca///u/d7v1Na2/d++T4Pzhhx/a48ePk9f99Kc/db8E4N+haqjva29vd2tMtWNfG7P0G6x/8id/4oKxnqllAXV1CwduAAAAPLWuwuly6WecamoW/u3UxsbGSNtCVBENt4XXlWpjVbgNAAAAi3upwykAAADWF8IpAAAAYoNwCgAAgNggnAIAACA2CKcAAACIjd/40pe+ZCtpy5YtkTYAAABgKQinAAAAiA3CKQAAAGKDcAoAAIDYIJwCAAAgNginAAAAiI11HU6bm5ttYGAg0p7K5OSkFRYWRtrjora21np6eiLtS+0HAAB4GaxqOM3Izbfq8Z0R+dWNrj8zv8gq+qesuK3X0tLSI88K27Bhg3V1dSXPdbx169bIdalcv37dqqqqIu2LCb9zOcbHx62mpibSnkpfX58dOnQo0r7U/vmkp6fbzp07LScnJ9IHAAAQN6saTrOLy6zj/GvWOfvYJt77zPrvve/OSzuGrLi128bf+cS6Lr1p/fc/sOFHH7owG35e0ObNm23Hjh2R9qV41nD6PO88c+aMdXR0RNpTWSx8LtY/n8zMTHv48KEVFBRE+gAAAOJmVcOpl1VQ7MJpzcTuZFvHuVet5/rbT87T0qzzwiMr6xmL3Bt87u3bt+3OnTt25coVy8vLs97eXpuZmUleU1lZaUeOHLFbt27ZuXPnrK2tLdkXDKe67uzZs1ZeXv5kLIkAqSB548YN27t3b7LKmOqdCnsKq9euXXN0jaqT4fGePHnS7t+/bzdv3rTjx4+7toyMDJuennZj0bv0r2llZWW5Ph8+tfxA91y8eNG1+eeFw+l8Yw5SIL169aoLpxrr1NSUa29sbHTfj95z+vRpq66ujtwLAACwFtYsnFYMTCXaPrW2ozesoKE9ck+YAqCm8Hft2uUCotqGhoZs37597jg/P9+FPq1Bzc7OttbWVrt7966Vlpa6fh9OKyoq7PLly1ZXV+fa6+vrXZ/WdCrgKewq4M73zpGRETt69KgLmgqrOm5qaoqMV/0KwN3d3e5YbQqUBw8edKFR619PnTrlpv7Vp/Cp8SqcahwNDQ0uZPtnB8PpQmMOy83NdeG0pKTEfR5R4Nbz0xJ/KdD4nqUiCwAAsBrWLJxKYVOHq6BOvPupdc2+YRk5eZF7g8JT7MFwquCnamXw+rKyMhdadawwp7Wjly5dmlMp1PN8QBRVMh88eOACbqp3TkxMuGqjwl7wXaksNK2vkKggqrCqc4VPhebgNZs2bUq+OxhOFxtzUHhaX0H53r17rursQzMAAEBcrFk4LesasYL6VnecU15to1/5yGom90buDQoHxWA4VdBbaG2owqlCmvjAKpp6V5umvz2da+o/1TsV9lSp1JS4wqTem2paX8LhtKioyAVMTbFrmYDeo6CrPoXPcPVTYfrEiRPJfh9OFxtzUDicin7lQFVbLVc4fPjwkjdtAQAArLY1C6faCDX0+vcsr7rR8mtbbPStj61pz7nIvUHhoBgMpwpyfm1n8r1ZWcnqoMKpgqKCpYKZD5S7d++24eHhyLvme2eQQp3Who6Ojkb6JBxOFT61TMCPSUsEDhw44I4VPvWs4P2qjmpJge/34XSxMQelCqeelgSoEqyQOl/ABgAAeJFeSDjVT0ZpN37l8LZkm3bytxy87ALq0Ovft9bD1ywzb+HfIR0cHJwTLIPhVGs4tUbTb4LSlL7OfTXRrznVvZr+3759u2vXT0WpAup/A1XrOI8dO5YMkOF3KswpVOpYazYVGP25nq/pcj9eTdkHvw+910/Hq3qrMBoMp5qa979lWlxc7Ma8cePGZL8Pp4uNWfdoTakfo6q8WoOrc1VvtU7W36slDlqDSjgFAABx8ELC6UpR9U/T4Kr0KdwFw6loF7oCn0KpKFj6vuBufd2rqXUfJFX59DvoNUXug1yqdyr0aqe7rte1+/fvT671HBsbm1P91PS51rjqep37jUx6z4ULF9x3FQynmmJXpdSPX2tO/bOC4XSxMSt8+vAtCs+6btu2J3850FIEBdLZ2Vm3vCD4qwYAAABraV2FU2+xKl+qjUFLoZ3t4TYv/E69I9wmqlSG28LXLfQe0XKE8D3zSfWsVGMIt+s41c9PAQAArKV1GU4BAADwciKcAgAAIDYIpwAAAIgNwikAAABig3AKAACA2FjxcAoAAAA8K8IpAAAAYoNwCgAAgNggnAIAACA2CKcAAACIDcIpAAAAYoNwCgAAgOeSk5FhG4vLbLC8yspzcyP9y/Fc4TQjN9+qx3dG5Fc3uv7M/CKr6J+y4rZeS0tLj9y/3kxU19m22iefbTWs9vPnk5mebrd7Bi0/MyvStxKaCovs7IauSLu32u8HAACrpyQ7xx70DdvrA2N2t3fIvj4yZQOJkBq+bqmeK5xmJxJyx/nXrHP2sU2895n133vfnZd2DFlxa7eNv/OJdV160/rvf2DDjz50YTb8jPXkwsYeu9k9EGlfKav9/PlkJ/6288tdh60s5/n+pjOfoYpq+97Ujki7t9rvBwAAq2dnQ3MinI5YVvqTQuSZ9i67nzgPX7dUzxVOvayCYhdOayZ2J9s6zr1qPdfffnKelmadFx5ZWc9Y5N4gBZgttQ32O1Pb7cfTe21HfZONVtbYh5t3uvPzG7rddbrm1f7ROffeSIS6XQ0t7rilqNi+MjRpP53ZZ785Oe2e4a9rLSqxt4Yn7SeJvm+MbZnTtztx/6WOXrvRNeDep2d0lpa7PgXHP5zZb59s32+/t2WXFWdnu/d8M/GMQ83t9qNte9249B/mSmeffbRtj3vG/d5hV+r279hcU2/fGt+aGNt+9zeLuvzCeZ8f/HyiyqKe93Hi2fpOjrdutLTP+/Sn/seg7/D3t+52lcjge9W+KfHu70zO2A8Sz1clMyPx30WB8IeJc4VD3Xfu8+9Y18/UNbk/fWDuSnwX306MXWPUc4YToXOxsU1U1brv5uc7D7nPFfy+Zb7395VVuv92f5D4DvV9tSX+u4W/DwAAsPZKs3Mcf364eYOrpIavW6pVC6cVA1OJtk+t7egNK2hoj9yTyh/tOOjKwQWJoNNXXunOFUILs54EwU+3H7DmwmIrSpz/LNGnP3VfdnqGC0yVuXmutKyAtLexNRGYMm24sto+23HAavMLkn1K+HmJvsGKKhdS24tL3XOOtGxwAXEkEaA0BgU4hU/1aep5NhFcFfpU6VPw2pi4T6FL15Un3q1xKHx+eXDcha6KRJsCsIKantFbVmE/md5nPYk/9fxjiXYFxfRESEz1/PD383YizN7pGXLBVd+DgqMCvPpOtnXa+xPb3OfU/0BeSXxvjwae/mVA3+VriXN9Bwroem9/eZV7j75HhcPqvHw3Dn/948TnUHjOzch0Y3x3dLNNJT6fzrcmgri+V3/9fGPTfWOJgPr9zTvc59J58DOler9Cs8K7vq+0xPF0XaMbS/j7AAAA8aJikopvmjUN9y3VqoVTKWzqcBXUiXc/ta7ZNywjJy9yb5ACkYKTP1dFTQHKn39zfKur/ulYAXBnfbM7Hk+EHwUnHSsc+mOvoaDQhbJUfapy+mqdwulXhyeTfQpNv0iET4VjnYen3RVOFWYVoILP9BSyTrd3JUOi7j3d3jnnGj3Dl8HDzw9S2FUQ9tf6NoVRHSsMKvT6Po35jxPX++qpvtuNJWXJfn1u0XGqaXVdv1C1UgFV9zQWFC06tuVO6+s5er/CrQ+/AAAg3poKn8xc+5nsZ7Vq4bSsa8QK6lvdcU55tY1+5SOrmdwbuTdIgaQq7+m61N/dvNM6AoHKV+50rOnirw1vcsda57D98wqiwuDN7sHIs+frU4VVQVfHCqeq3Ab7FbpUAdVxODwqWKoCGbxe1VtV+TRFrWlshS5NS6vvvcT4NfUfvD4o/PwgTXNrujzcLgrBv0ixZlNVWlWcdRz+blW1VZVWx+FwmOp62d/UZr+1acZ9tt9JhE3do/8hLjQ2WW44FS2kVtVa1fI3hybcdx2+DwAAxIMKgW8mgumexucLprJq4VQboYZe/57lVTdafm2Ljb71sTXtORe5NygciBYKp6qoaU1neSLQaE2jpunVrt3uKicHn6sqn6pxmh4OVkZFgVDT6TpeiXCq9axat+qriHqmr5wqDB5v7Zhzvab3/VR3+PlBGoO+HwVR36bvQJ9NxwrCwcqo2lX11dIGnYe/2+WGU18l9tVQjVnBUeF0sbE9Szj1tJb1ZFuHW7ZBFRUAgPipz1cwnbB7iQzVVFBkjYVPBHPBcqxIONVPRmk3fuXwtmSbdvK3HLzsAurQ69+31sPXLDPvyeaf+YQD0ULhVK539bsNOq8EdoRp7ac2QvmNN1ozqXNVEFXV1LHWmqqvPpHyFXBV+dP5YuFUlUOtIfUhKVU41Rh9ANVSgu9u2p4MpxqT1rzW5D0JeFqioHMfZMPP17ICrVf15x9MTLslCPqPrTCuz34gcY/6NEWvYKxAqH4F5OAShvB3GwynWpagjUdanzvf9Vr/qWsUpnWuirOvnC42Nq1BDa4RFn12PTPV+/Xf6avDm9xfPHSuNcFag0o4BQAgfo4mMoX2noQF/39/OVYknK6UcCBaLJwqHCoghRfdKmz+diIUalpbYXRfIkj5Pq1h1a8BqO+HW3e7Hfq+b7FwqsqepuhVMVTwTBVOtaNdgVPVXE2BX9zYM2dj0oHmdjctro1YqnZ2lz5dJxp+vp7lN3r5fn0HGruuUbj0gU1/are8+kTV4+D/KMLfbTCcij67xqxQm+p6hU49X5ug9PkUmhXsfThdaGzyWv+oq7zqt1x1rvCpv1zM936tzdX1qrjqe9KmKn8tAAB4ecUqnC6XfuZJAXO+srGmtFPtehe/DOBZzPe+IL+Jaj4L/eB88PmpNltpk9N8Y1C7fjUg3L4U+q7Cu+nD9O6Fnr/Y2JI/fZXimvD7dU1B1vzfEwAAePms23Cqyp8qatvqXvy/qAQAAIDVsW7DqaaH/e+TAgAA4OWwbsMpAAAAXj6EUwAAAMQG4RQAAACxQTgFAABAbBBOAQAAEBuEUwAAAMQG4RQAAACxQTgFAABAbKxoOC0szLS0tKfn+fkZlpER/WcqAQAAgFRWJJwqlP7uhz32V78es7y8p//u+tUrDfYn/3vYjh6pjtzzIk1OTibGWBhpf1HS09Ntenp6TccAAACwHqxIOD14oMr+31+OWVdXwZz2nJx0++Z7G+0XPx+aU1F90a5fv25VVVWR9hclMzPTjhw5YmVlZZE+AAAAPLUi4fT0qVoXTnNz0yN916402K/+fDTS/iKtdTgFAADA0qxIOD3weeW0ojwr0vfKwxZXOQ23p3Lp0iVra2uzc+fO2a1bt2zfvn2Wk5OT7O/r63PX3Llzx06cOGElJSXJPl23Z88eF0R1zfj4eLIvGE4rKyvt7NmzVl5e7s7r6urszJkz7pnnz5+3lpaW5H2ahj906JAby+nTp23jxo3uT9+vZ6kiqv6jR48uGIAvXrxoxcXF7rixsdF9xps3b7rnVVc/XfagZ/hnnjx50n0fvq+/v9+2bdtm27dvd/fqOo0//C4AAID16rnDaWNDrn33O132s88GU07d79tX6daiHj60+LrTe/fuuaCo6e/8/Hzbv3+/C4fqUxBVqFQgVBDVGs5jx44l7z1+/Ljt2rXL8vLy3DWzs7PW29vr+nw4raiosMuXLycDXVpamguAHR0dlpWVZV1dXXb37l23RlT9CpAzMzOWm5vr7tX5tWvXXJ/ec/XqVevu7rbs7Gz3p/qCYTpI4be0tNQ9+/bt29bQ0ODer/v8Z9Rn1lgVwvXM5uZmF1J9eB0dHXX3tra2uvdMTU3ZqVOnIu8CAABYr547nE5Pl7uq6YnjNZE+UTX1xx/32e//4ElQXIjCqYKXP1cAfPDggQuO4Wvr6+tdkNRxQUGB3b9/3zIynm7GUpuvrCrwKXiqohqsUobpPQ8fPnRVVd0bDKqiyqkPpwq0CsTB+1UFDY4/yIdTjVGfU8E5OF7/TFWEg20K4Zs3b3bHCqeq0Po+hWZ9P/oz/D4AAID16LnDqRw/VmO//ovRlGtOL19qsP/7pyOJ4Lf4T0optCnABdtUOVQlVJuKVMVU5VMVS4VI0TWaJlfwDD/PUzj116s6GewbGhqyCxcuuNCpaquuUZVUlU29K3htbW1tMpzqFwB0rcbi6VxT7+H3iw+nOlZFVBVPtR0+fNhqap4Eez1zx44dc+4bGBhIVlYVTnfv3j2nX6GcXwEAAAAvixUJp7t2VrjqaWlptMJ5726z/dn/GYm0p6Jw2tTUlDzX1LYCn6awFcw0Be+rhAp0Cq46VjjTvcEqp6qSvuKqcKqqpMKtQqG/Ts/QNLkPjZpmV2BUOPVVyWDw0xh8OA1Oxy9FMJx6+lwTExOuT2PSM4OVUdmyZYtt3brVHRNOAQDAy25FwumRw9UL7tb/y1+NplyPGqaAqWlthVL/26B+TaWqigpuape9e/cmw6loPaimv9Wn+7V2VVVR9fk1p+pTwNWGIrWrOqqNRX6dqKqUvnKqc4VZVVUHBwfds7Xm1YfToqIid6+qtjpXRVYblFTl1bne59e8ig+nuk+fwwdKLTNQQNbY1KfPpMqq+rT2NvgOwikAAHjZrUg47ewscOH08ZfbLDPz6fT98HCxffbJgH37Wx2Re1JRONW0uAKgApsCpg9eWkOqc7VrCn1kZGROOFW/gqfaFAS1Ocqv6Qzu1leI1PMVHBUItcNfa0t1jXb4Kwz6cKpKqq+4KqBqI5UPp6IQqaUAukfjGhsbS/bpWDv0/Xmwcqqgret175UrV+bsyFflWPfpc+hzBpcJEE4BAMDLbkXCqUxvK7fXX2217Oyn1dPxsRLbu6fSSkoyI9enonCqn1tSKFT1M9wvqnKqP9zuaSo/OL2/FLpHa1rD7aqkBn+uSuE1PO0u843Jt/lNUNrgFeybb2e/zPf5AQAAXmYrFk5Xgg+n4fa1ouqnKqpaQqDlBjdu3Fj274oqkGoXf/BnrwAAAJBarMKpprRTVTDXktZ9ampfU/jP8pNNqsou9PNVAAAAeCpW4RQAAABfbIRTAAAAxAbhFAAAALFBOAUAAEBsEE4BAAAQG4RTAAAAxAbhFAAAALFBOAUAAEBsEE4BAAAQG+smnOqfAZ2amoq0v0waGhqss7Mz0g4AAPBF8VzhNCM336rHd0bkVze6/sz8Iqvon7Litl5LS0uP3L8c+mdE79y5E2l/mYyMjNiePXsi7VJRUfHSh3MAAIDnCqfZxWXWcf4165x9bBPvfWb9995356UdQ1bc2m3j73xiXZfetP77H9jwow9dmA0/Y6m+6OG0paXFLl26FGkHAAB4mTxXOPWyCopdOK2Z2J1s6zj3qvVcf/vJeVqadV54ZGU9Y5F7gxS+2tra7Ny5c3br1i3bt2+f5eTkuL5wOK2rq7MzZ864tvPnz7vwpnZNi+/fv3/Oc3fs2GF9fX3ueHBw0C5evGg3b9608fFx27Vrl3V0dLi+/v5+m56etr1797rnFhYWuvZNmzbZ7OysXbt2zV2flZXl2jUNf+TIkTnvOnTokDU1Nbnj3bt3u2ceO3bMvU/3+mdKfX29nTx50m7fvu3GPDk5mTKcbtiwwW7cuGH379+3K1euWGtrq2sfGhpy35n6Dhw44JY+hO8FAABYT1YtnFYMTCXaPrW2ozesoKE9ck8q9+7dc4FTQTQ/P98FNoU99QXDaVoi7CrUKVQqKHZ1ddndu3ctPT3dcnNz3XN8UMvMzHT3FRUVWXt7uwtytbW1LvQqnKqvt7fXXTs6OurOFXD1fr1nYmLCjamkpMS1KTArCOr65uZmF4yDn+Hs2bPJ8KjgqiBcXl7uQqnO/dR8QUGBC+AKzdnZ2S6AKqSmCqcah8auIKrPo/Pq6mq7fv26e47atm7d6j5P+F4AAID1ZNXCqRQ2dbgK6sS7n1rX7BuWkbNwZU+h0gc7UcB88OCBC6DhymmQ+h8+fOhCoM4VaH3gVKg7ceKEO1ZFdGxsbvVW4TEYTg8fPjynX4FQFVJ/rvDrx7SUcKpn+j4FUH+9ArUfl6dKa6pwKuFpfY1J4VYV5PC1AAAA69WqhdOyrhErqG91xznl1Tb6lY+sZnJv5N4ghdPS0tI5bQpglZWVkXCqKe0LFy64qXZNuSucatOQ+hQCNZWuYwXSnp4ed6xqq0Jh8PlHjx6dE04VEH2fKrF6rqqTqca0lHDa3d2d7FOQvHz5sjvWUgEtNwjeq+C81HAqflpf49GSgfA4AQAA1ptVC6faCDX0+vcsr7rR8mtbbPStj61pz7nIvUEKp369pmi6W+FQU/DBcFpTU+OmwH2Q1TS3+nw4zcjIcNP3mkrXn3qO2rWeNBgIVf3UWtD5wqlojaeWAQTvUeVUz2xsbLSrV6/OuV5BeSnhVIFZwTh4r8a2nHDqFRcXu6UG4fWvAAAA682KhFP9ZJR241cOb0u2aSd/y8HLLqAOvf59az18zTLznm4GSkXhVFPdCn6qWipMnjp1yvUFw6mmtBUq/WapgYGBOZVT2b59u1srqjWivk1hVlXGmZkZt1Hp+PHjLvAtFE41BoU+hVKNadu2bcnpeFUq9V5tbNK5grWC61LCqdaw6vOo+qrzqqqqyJpT7d5X8NSxKrXBtbTaOKaxakz+WsIpAABY71YknK4UhS+FRk3VK6gpXPrd7cFwqkCmEKdNUNoUpI1ACqvBcKrqqoKj38XvKaDqeoVOBb7g+tRU4dS/S6FWFGiDu+K1w17jVoVW9y51Wl+0/ECVVz339OnTtnnz5mQ49VVd/0sCog1i+l50nwK8qqW6VwFb79V3FBw7AADAehO7cKpKoabp/VT8QhTgtFM93C4Kggp+vrIoqk4Gw6LuV9gLTtvPR8+Z713qW8p45+MrwGH6HsJtwc8jWsLgf9oKAABgvYtlOA23L5c2FmmtaHjzk6bhVbnUxihVKFWh1bR/qhAIAACAFy9W4VRrNuerTi6Hpr31O6DhdtHz9R79lqmm9cP9AAAAWDuxCqcAAAD4YiOcAgAAIDYIpwAAAIgNwikAAABig3AKAACA2CCcAgAAIDYIpwAAAIgNwikAAABi47nDaWZeoRU2blhUfk1T5F4AAAAg6LnDace5V23ivc+WZL0E1Kq8fDu3odv2Nra68wNNbdZXtvx/TSojLc2udPZZeU5upA8AAOBlkZuRYRuLy6ynrMKKs7Mj/cvx3OG0a/aNSAidjyqo4fuDJqrrbFttY6T9RfvNyWm70zNkG4pL3fnlRMDcXFMfuW4x2Yn/UF8ZmrT6gsJIHwAAwMugJq/AHg2M2Wv9o3a/b8S+NrzJep+hqOfFKpxe2NhjN7sHIu0vUlpamv1i5yErz82L9AEAAGCuk22dbqY4PZGhdH5mQ5fdeI48F5twqmD6hzP77ZPt++33tuxyJWFVHhVWf3/rbkfXaKpc16clnG7vsu9N7bCPt+2xe73DlpeZmXyeKp3fHt9qP5neZ28MTVhd/tPqpe7ZlOj/zuSM/SDxrrOJL1HP1XS+zn+567D9MPE+VUx1/a3uQdtS2+COdd31rn77KPHODzfvtNHKGvudxPMq5wmzv71pu1UnnqtjLQ1QVfYPpvfatxJjaysqSV7Xmjh+a3jSfjKzz74xtsU91/ftbmixSx29dqNrwH6cuFfV2M7S8si7AAAAXjRlIxX3dKw/Zzt6EhmtM3LdUq1YOB18+FvWvP9iUt+db9ngK9+11kNXbcPJu4uG08z09MSH6bXbPYMulCp8Hmput68Ob7KsRF9RVrY77i+vctefaOuwDyamrTa/wFU5XxsYs/uJgKo+hUAFwK5EgMtPBNbDLRtc4PXh9Y92HHTXl2TnuFCoQKrn6p25GZkunCpsaky6/vHguO1KBEQdK7AqPCpwai3pg74RV2lVSTv8mURhW2PUf7ifJsJ3b1mF+w83XdfonqtrNA4F7J0NzW6MgxVVLqS2f76s4Ehi/AruI4nAWpCZ5cL0NxNjCL8LAABgrVzr6nfT+2fbuywv42nBcLlWLJz23/9fVj9zLNGWZrVT+63zwiPLyMmz6rEdVt4zvmg4lfC0vsrE3xzfmqw8Bqn6qaDnzxUqfSVSzzjVNjexq0qq0KdjhdONJWXJPpWiRccqSSucBhfzBsOpKrgdgXsVLHX9YuFUAVvv3VHflAy9nqq8745untOm8WhTlo4VTr86PJnsU1BXIC7Mer4FxwAAACtF+WhTdZ290j9qh5vbI/1LtWLh1EtLS7fhxz+w4Ucf2pcSQa/t6A2bePfTZwqnqqBe7ex3VVBNoatErAqk/CIRCOfbBf9eIuj5aXjv9USS1657HSskagrf9x1r3egqtjpeKJzqvX+cCIUVgSl8VUH1vMXCqY4HyqtcxfPT7QfszaEJ2/h5ZVTLE252P3m/p18K+PLnlVWF07u9Q3P6fx4aBwAAwFrQLv2yQCabqKq1t0emrCArK3LtUqxaONVx+4k7llVY4kLp+Dt/uOxw6mm6XUFO6zcV1NT2u4mwqml7f41Cpaa8dXy3Z8iOtmyc84z3J7Yl13E+azjV8W9tmpmzc18V2KVUToNt+YlxnmzrcH2qomqKP1gZFX0XWuagY8IpAACIK60x1f4cZavS7Fy7mMgwjwcnkhuklmvVwunIm7+f8EMbev177jpN+y8WTvc3tbn1nH7aWwFO60V1rAqlQqIPp9ogpFSuNZr+90R9pVGJXdPvfpOSNj9pI5Gmw3X+POFU5Wptsjre+mRsX0+MIVg51RrWnfXNyXt9ONVYtGbWV3u1nlRrUPVZ1ffTmX3JZQf66SmN1/+2KuEUAADEVWl2jl3r7He5TB72jVhTYXHkuqVa8XBa1jVio299bAMPftMycvPdutPSjiEbf+eTRcOpSsLaxa5pb63lbEiENO1u1874H27Z5TYxaYOTrlUgVWDTlL82C2kqP/jzTwqOuk9BUtXO4DrR5wmnoh+YnU38reBMe5cbpwKoD6d61u9MbU9eG6ycalmCxqr1stqgNZYI0f46bcjSfRqvfilAO/R9H+EUAADEXU5GRnIW+3k8dzitGp1xATWVztnHbmOUjvUvSemfOg3fn4r/uShP1dHwJqLgtfoywu3Be8Ntz0NLA4L/WpR+0slPz/s2/3MKfhOUr9j6voXWYKz0eAEAANaT5w6nXzT95ZVuyl1LCPRzCZqa3/f5P3MapMqrqsBfG9kU6QMAAEBqhNNnoKl8TclPVtfNWR4QpJ+20rpSbeYK9wEAACA1wikAAABig3AKAACA2CCcAgAAIDYIpwAAAIgNwikAAABig3AKAACA2CCcAgAAIDYIpwAAAIgNwikAAABiY1XCaXnfpGXkpv6Xk+JocnLSCgsLI+3LtVLPAQAA+KJa0XCanplllYNbbPQrH1n31a9ZZn5R5Jo4un79ulVVVUXal2ulngMAAPBFtWLhtLit14Yf/8Am3vssKb+mKXJdHK1UqFyp5wAAAHxRrVg4bTl4eU4wXW447ezstP37989p27Fjh/X19blj/Xnp0iW7c+eOnThxwkpKSlx7ZWWlnTp1yoaHh+3GjRvuOb5N91y9etXOnTtn3d3dkXd64VC5adMmm52dtWvXrtmuXbssKysr2ZeTk2N79uxx92g84+PjKZ+jMZw9e9bKy8sj7wMAAEBqKxZOy3sn5gTTwVe+m2hPi1w3n9zcXLt3757l5eW588zMTBdEi4qKXBBV0FPgUzicnp62Y8eOuetqamrs/v37NjU15dZ76j7fpuCYnZ1t7e3t7tk6Dr9XgqFyYmLCzpw5496Zn59v+/btswMHDiSvPX78uAusGqfGoxDb29s75zkVFRV2+fJlq6uri7wLAAAA81uRcJpdUuHWmQbDac3k3sh1izl06FAy6ClQqkIavkbq6+vt7t277lhB9Pbt25aW9jQIq039wbYLFy64Z4afJcFwqmpoQ0NDsk+h+cGDB656WlBQ4EJvRkZGsl9tvoqr53R1dblnVFdXR94DAACAha1IOG3cfSYypd995a1EOEyPXLuQDRs2JCuie/futZ6eHnesaujMzIyrRmqa/uHDh476FETVFnxOqjY9V8Ex/E7x4TQ9Pd09V4Ez2H/r1i1XJW1sbHTBM3x/8Dl+bKq6hvsBAACwsBUJp50XH0XCqRS3zr/OMxVVJLVuVNPz+tNPw4+OjtrJkyddFVPnCp8KjP44HERTtS0lnOr4ypUrVltbm+xTxVSVU41F49LyAIVY368x+zWpek5HR4cL0lrzGrwOAAAAi3vucJpXVW8T734aCaZSNTxtmXkF1rD9uDXtPhO5N5Xt27e7NZ9a6+nb9PuhR48edWFPVFV9nnCqIOqXD0gwnGo965EjR1zg1Lu2bds2Z3mBNldt3rzZ9SmwaqxDQ0NznqM+hWl9luAYAAAAsLDnDqeFTRsjodTrvfmejbzxQ7eTP6e0MnJvKgqWmhZvaWlJtmmaXSFQa0sVOkdGRp4rnI6NjdnFixeTfcFwqmCp3fh6vmgDlN+k5cei4Kk+bdjS5ii/BjX4HE3ra7d/MAQDAABgYc8dTkXrS2UksClKxw07TlhWwfJ+iF873BUsU02Ja6d+cJPT81jsOXq/1rqG2z1fWQ23AwAA4NmtSDj90udBr6CuxYqaO93vm6Znpf7ZpoWooqk1n/OtDQUAAMDLbWXC6QrRbn1+ggkAAOCLK1bhFAAAAF9shFMAAADEBuEUAAAAsUE4BQAAQGwQTgEAABAbhFMAAADEBuEUAAAAsUE4BQAAQGwQTgEAABAbhFMAAADEBuEUAAAAsUE4BQAAQGwQTgEAABAbhFMAAADEBuEUAAAAsUE4BQAAQGwQTgEAABAbhFMAAADEBuEUAAAAsUE4BQAAQGwQTgEAABAbhFMAAADEBuEUAAAAsUE4BQAAQGwQTgEAABAbhFMAAADEBuEUAAAAsUE4BQAAQGwQTgEAABAbhFMAAADExv8HJKiRDhBCOBoAAAAASUVORK5CYII=>

[image4]: <data:image/png;base64,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qwTAB1DNtPovEugxvg9/yc6rwKyvBmh7bTt16tREHWtNTU2D2VY94lcNr7bXun+5S+dZtmyZC7zBUKsyAM3Kir8O1dT64wVDbXPjVmj1wV0UvLXd+PF//nGhsgkF2fr6elcKEfxaBAAAQJzEKtR6zc0mJntRqqX0lYBwmxc+r84TbhPNiobbwts1dR5P5RPh/RqT7HjJxhFu13Kyz4ABAADESSxDLQAAABBEqAUAAEDsEWoBAAAQe4RaAAAAxB6hFgAAALH3P/oOKgAAABBnhFoAAADEHqEWAAAAsUeoBQAAQOwRagEAABB7hFoAAADEHqEWAAAAsUeoBQAAQOzdVaF25syZtmDBgkh7e+nbt68988wzlp2dHekDAADA3atVQm1ubm6kLZnmttuzZ48dPnw40t5e0tPT7ffff7fCwsJIHwAAAO5erRJqX331VVu1alWkPWjjxo328ssvR9q9vXv32o0bN+zHH3+0L774wvLy8iwtLc0OHjxo33zzjV29etWOHTtmGRkZbvvq6mp74403bP369fbtt9/avHnzXPvq1avtww8/tOvXr9v27dvt2WeftTlz5ri+Pn362I4dO5xPPvnEPvvsM9u5c6drV5D98ssvXaj9+uuvbdeuXZExAgAA4O7UKqG2f//+9uabb7pgmyzcKni+/vrriUCajB7979u3z44cOeJmTBU0586daydPnnSBc9CgQXbp0iXbunWr237UqFF269YtF0oHDhzo9pkxY4YLv6NHj3YlBNpWIXnp0qVuny1btrhjSHFxsaNxb9q0yZ1PM8kKtaWlpW484TECAADg7tQqoVaysrLczKkEg+2aNWvs3LlzLnSG9wlrqvwgNTXVzbD62V6FWs3sKoz6bZ577jkXXIP7adbWh9qPP/7Yxo4d62g/mTRpkr377ruun/IDAACAeGq1UCuZmZmOZkL9rO3Zs2dbFGglHGo1k3rq1ClXDqCSBAVOzayqT6FW5QLB/S9cuBB50UznV6jVzKv2//nnnx3tKzdv3nQzvtqWUAsAABBPrRpqPQXb8+fP2+nTp11dbLi/MeFQe+bMGdu/f3/iGCoTCM7UhkPt448/3mB/jePatWuJmVptX1NT44TPLYRaAACAeGqTUPtXqVRBs7y+nlUzr9u2bXPL+fn59sEHHzQZasvKytwLYk888YStWLHCXnvtNfv0008T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ZOl7CXvm/McKsktsStXSBu2iYBs+JgAAANCcdg+1TekIoVb/Pe+CBQsi7a2pPc6RTN++fe2ZZ56x7OzsSF9rqaystJ07d0baAQAAmkKobWV79uyxw4cPR9pbU3ucI5n09HT7/fffrbCwMNLXWvTv55NPPom0AwAANCVWoVZhZ968efbhhx/atWvXbOnSpTZ16lT77LPP3LrCnrbTNi+++GKDfZ966imrr69PrFdXV9vp06ft+++/t/fee88dJ9h35swZ++677+zSpUsN+lasWGEHDhxwx9M5X3nlFRs7dqzr27t3r924ccN+/PFH++KLLywvL88d64033rD169fbt99+68aWlpZmBw8etG+++cauXr1qx44ds4yM/6snnjt3rvPmm2+64507d87Ky8sbPUfwOkUzqTqmzvfpp5/a1q1brU+fPq5PPzUT+vHHH9vXX39tR44caXBu3ePZs2fb+++/b19++aXbNjU11QVZrSvUar9du3Y5fp/Fixe7nz5s655cvnzZjVPHmjJlSrPjmzFjhmu7deuWu7bgfZenn37a5syZk1g/f/68O69f1+9szJgxblm/a9GYfvjhB7ft4MGDE9uuXbvW9en+v/zyy4n76H+/ui/6t/H6669bcXGx+/ek47z77rs2dOjQBuMCAAB3XqxC7S+//GJHjx51oeiBBx6wX3/91YWNnJwcFx4VoKqqqiw3N9dtq5/aTzOMCiQKJ/n5+c6VK1ds1apV1r9/fxe4fv75ZysrK3N9ClbLly+3rKwsmzRpkgu3tbW17libNm1yofLhhx9241DoU2hVnx7P79u3zwUinVNBbdSoUS6kabuBAwe6dgXWkydPuqA4aNAgF5wV7HSMiRMn2vXr150JEya4c2zZssUFypSUlKTnCN+n1157zZ599lkX1IYPH+4CrP4AUN8jjzxib7/9tg0ZMsQKCgrshRdecKEueI9PnDjh7kNNTY07b11dnTuP7qdCbWlpqRuH+H1OnTrlgndmZqYb54ULF1wA1bpKJXR//faNjU/7TZ8+3YVNXZvWg9e1Zs0at5+W9btU6NR5ta7fo37/2k/h9Z133nH070L38PHHH3d/HGhb/S71+9f91/b79+9P3H/9fvX71u9Bx9QfLfpdTJ482V2LgrV+d+F7DgAA7qx2DbUH579uhxdfdj+fXvKOHZh3zvbNPWtPLrzU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>

[image5]: <data:image/png;base64,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>

[image6]: <data:image/png;base64,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>

[image7]: <data:image/png;base64,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>