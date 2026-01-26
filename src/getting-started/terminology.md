# Terminology

## Some terms you need to be familiar with

Here is some technical terminology you will find across XPR Network documentation, chat and post. 

* **Account:** An account is a wallet, defined by a readable name. Say good bye to the old and ugly hexadecimal key like 0xae54g4781b45c54….. but hello to @bob or @alice.  

* **WebAuth:** The amazing wallet made by our awesome team that allows you to sign transactions, manage your tokens and more on XPR Network. WebAuth comes in three flavors: Mobile app, desktop app, browser app. The best thing is that you can use all of this version to manage your account and interact with the chain the exact same way.   
* **Mnemonic**: Some call it “passphrase”, it’s a set of 12 random words provided only once at the account creation, remember to write it down on a piece of paper and secure it. The mnemonic is the most important piece of your account. It allows you to recover your account in case of emergency. **The mnemonic is private and should remain always private, never share it.**      
* **Private key:** Private as your mnemonic. The private key is a cryptographic key “derived” from the mnemonic. This key always starts with \`PVT\_K1\_\` and look like   \`PVT\_K1\_UFfHbU8FUm9wmf7dmETYUUoFvdYkanFTjZxALiC1NxG6nNxuF\`. **Never share it.**  
* **Public key:** Derived from your private key this key start with \`PUB\_K1\_\` or , the public key identifies your account ( exemple @myaccount \= PUB\_K1\_6GXjHQE61Mt7C1cBipry2hqFQjDe7HcV2ya7oNcjKWe41PdunZ) the cryptographic way.  As the name suggest, you can share it safely   
* **Smart contract:** A smart contract is a piece of software that runs on XPR Network and that can execute transactions (send tokens, store data …) on the behalf of the account that owns the contract.  
* **Action:** This is a callable function on a contract that performs operation on the behalf of the account that owns the contract. An action can accept multiple inputs (account name, amount of tokens, text, … ), action execution “occupy” **NET** and **CPU**  
* **Tables:** This is where the data are stored, think of an excel sheet with rows and columns. Store data in table cost **RAM**  
* **Transaction:** A transaction is a batch of action performed in cascade. It sounds simple but please read carefully the section about transactions because execution order matters a lot.   
* **Resources:** Resources are most important for dev, but as a user, it is good to know what we are talking about. When we speak about **resources** we speak about **RAM**, **NET**, and **CPU**  
* **RAM:** RAM is the quantity of data you can store in **tables**, expressed in bytes. By default any account receives X Bytes at creation. As we said, as a user it’s not really matter to you, since RAM is (in most cases) exclusively provided by the contract you interact with. If data are removed from tables, the corresponding amount of **RAM** is freed.  
* **CPU:** CPU, expressed as milliseconds, is tied to smart contract execution time, in other words: “The time during which a contract can execute an action”. An action “occupies” CPU time during execution, once the action process is complete, the CPU is freed. By default every account receives 30 milliseconds CPU.  
* **NET:** The NET is “The amount of data transported across the chain”, it’s the quantity of bytes the action inputs “occupy” during action execution. Once the action process is complete, the occupied NET is freed.   
* **Permissions:** Ok, permission is a huge topic on XPR Network. Permissions are authorization schemas that secure your account and allow/disallow execution of transactions. An entire section is devoted to permissions. Keep in mind that permissions are a powerful way to secure and/or allow an account to be controlled by one or a group of external accounts, where each external account has more or less weight on the targeted account controls. You can create as many permissions you want. By default every created account receives two permissions: owner and active  
  * Owner is the master control of the account, it allows to revoke/remove all other permission and allows to perform any operations on the account. You should never modify owner permission unless you know what you are doing.  
  * Active is a permission that depends on the owner's permission, and it’s used for daily operations through webauth. It can be changed to modify signature behaviors, but be careful.   
* **Block producer and Nodes:** Block producers and nodes are servers that host an instance of the XPR Network node software and a copy of the entire blockchain data, owned by an individual or a company.  
  All of these servers are always in sync with each other through the peer to peer network.  
  The difference between the block producer and nodes is:   
  * **Block producers** are servers that mutate the chain state, they are the “brain” that process actions, write data, and validate what that could eventually lead to a new block and broadcast this newly mutated state to all block producers nodes  to keep it short.   
  * **Nodes** are “only” relays that send transactions to the block producers. Each node keeps an entire copy of the blockchain state.   
* **Endpoints**: Endpoints are the gateway for your interaction with XPR Network. What we call an endpoint is the url to a node .
  
