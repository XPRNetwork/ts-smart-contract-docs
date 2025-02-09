# The @proton/cli crash course

## What is the @proton/cli ?

I often define the @proton/cli package as “The swiss army knife for XPRNetwork devs”.Create account, manage resources, perform permission mutation, claim faucet… This little command line interface allows you to interact with most of the useful actions,contracts and API spread across multiple platforms in the XPRNetwork ecosystem from a single place: your terminal \!

In this short course section, we will see how to install it, and how to use a few commands. We will cover it in depth later in this course.

## Installation as global package

The @proton/cli package will be installed from npm as a global package, so let’s do that: 

```javascript
npm i @proton/cli -g
```

Now in your terminal, enter the following command 

```javascript
proton version
```

And it should output something like this 

```javascript
0.1.93
```

Ok let move on

## Command syntax and structure 

Every commands starts with … **`` `proton` ``** followed by the “main topic”, then a column (:) with the actual action to perform, and finally arguments. Some command have 0,1 or more arguments. 

This is look like this, you can type the enter command

```javascript
proton chain:info
```

And you will get something like 

```javascript
{
  "server_version": "6f872d97",
  "chain_id": "384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0",
  "head_block_num": 298355606,
  "last_irreversible_block_num": 298355270,
  "last_irreversible_block_id": "11c88a46b4fc8b28bcd75158192eddbfcd2b2509a669f41e5bbd731e7422f2e8",
  "head_block_id": "11c88b960bbe149539fca7ec7e6a6554bcc0ae7d05f509eb22273474910a95e8",
  "head_block_time": "2025-01-14T10:49:35.500",
  "head_block_producer": "luminaryvisn",
  "virtual_block_cpu_limit": 200000000,
  "virtual_block_net_limit": 1048576000,
  "block_cpu_limit": 200000,
  "block_net_limit": 1048576,
  "server_version_string": "v4.0.5",
  "fork_db_head_block_num": 298355606,
  "fork_db_head_block_id": "11c88b960bbe149539fca7ec7e6a6554bcc0ae7d05f509eb22273474910a95e8",
  "server_full_version_string": "v4.0.5-6f872d97fc9d02e27397b987d8df33c805551759",
  "total_cpu_weight": "1070089208000",
  "total_net_weight": "1037831278000",
  "earliest_available_block_num": 1,
  "last_irreversible_block_time": "2025-01-14T10:46:47.500"
}
```

Great you’ve exectured your first command with the @proton/cli

## Switching between testnet and mainnet

You will see across this course, we do everything on the testnet, so it’s important to know how to switch between testnet and mainnet.

To switch to testnet: 

```javascript
proton chain:set proton-test
```

And you should be prompted by 

```javascript
Success: Switched to chain proton-test
```

To switch back to mainnet: 

```javascript
proton chain:set proton
```

And the result would be

```javascript
Success: Switched to chain proton
```

**Remember:** After switching the chain, the setting remains active till the next switch, even if you close your terminal. I use switches so often that I sometimes forget which chain I am. To be sure you perform your operation on the right chain, invoke this command before starting to enter other commands. 


## Creating a new XPRNetwork account: The dev way\!

Ok first be sure you are on testnet \!

```javascript
proton chain:set proton-testSuccess: Switched to chain proton-test
```

Great\! Now let’s create a new XPRNetwork account\!  Because we are devs, and we are organised we will output the process to a file to keep our keys and mnemonic stored in a place, it could be anywhere.When I start a new project,  I tend to store my testnet keys in a .json file. Let’s start the process en type this command, of course change the name to one that suits you and who follow the rule of XPRNetwork names (see [Getting started / A quick note on data types](https://docs.google.com/document/u/6/d/1Va5wF66JmGPwVEUWy-ZWtoXryoSpzM41rEyz5S9uaGY/edit) on name if you haven’t read yet):

```javascript
proton create:account devcourse > devcourse.json
```

As you can see, the command follows the structure I mentioned above, so we create a new account on testnet, and the account name argument is **`` `devcourse`. ``** The last part after the arguments **`` `> devcourse.json` ``** is not a part of the @proton/cli. If you are familiar with terminal, it means “send everything that the command outputs in a file, a json file in this case”. It will allow us to store keys generated during the process. Now hit the enter key and the process begins\! 

```javascript
Enter private key for new account (leave empty to generate new key):
```

You can leave it empty, the private key will be in our .json file

```javascript
Enter email for verification code:
```

Since we are on testnet, you can provide a fake email address, with a well known domain, like [devcourse@gmail.com](mailto:devcourses@gmail.com). **On mainnet you should provide a real email address, where you will receive your 6 digits verification code.**

```javascript
Enter display name for account:
```

Time to be creative a give a really cool name like “The account of the coolest nerds on earth ”

```javascript
Enter 6-digit verification code (sent to devcourse@gmail.com):
```

On testnet the 6-digit verification code is always 000000, **on mainnet you should have received the code on the email address you entered previously.**

And done \!  
If you did everything correctly, the process should end and … show nothing, it’s because we have sent everything to our .json file, it should contain something like this 

```javascript
^[[33mNote:^[[39m Please store private key or mnemonic securely!
{
  "public": "PUB_K1_7GZeo3d9p4aH6aGzU9Qj3rewYaZ7dZyHyiadjKHzUPffJ7x2mH",
  "private": "PVT_K1_2btTxMLq72bwHUZgTf9fyxwF3CU6mtFkCtLvdpQD1PEngFdHfk",
  "mnemonic": "abandon lonely mean pottery frog under sunny amazing mango whip dilemma avocado"
}
^[[32mSuccess:^[[39m Added new private key for public key: PUB_K1_7GZeo3d9p4aH6aGzU9Qj3rewYaZ7dZyHyiadjKHzUPffJ7x2mH

^[[32mAccount devcourse successfully created!^[[39m
```

 Cool \! We heve our public, private and mnemonic, not the line after the keys json object, it says  “`Added new private key for public key`” that means your version of the @proton/cli is able to sign transactions that involve the devcourse account.  

I always remove the text around and keep the keys json object. I also add 2 new fields and my final json file look like this:

```javascript
{
  "account":"devcourse",
  "chain":"testnet",
  "public": "PUB_K1_7GZeo3d9p4aH6aGzU9Qj3rewYaZ7dZyHyiadjKHzUPffJ7x2mH",
  "private": "PVT_K1_2btTxMLq72bwHUZgTf9fyxwF3CU6mtFkCtLvdpQD1PEngFdHfk",
  "mnemonic": "abandon lonely mean pottery frog under sunny amazing mango whip dilemma avocado"
}
```

A little help for  the future me, I have added the account name and the chain where we have created it.

## A few useful commands before we leave.

### Check account

To be sure our account is created, we can use the account command. This command will be useful later when we talk about deploying smart contracts. 

Enter this command:

```javascript
proton account devcourse
```

And it spits 

```javascript
Created:
Jan-14-2025, 12:22:40 PM

Permissions:
owner (=1):
 +1 PUB_K1_7GZeo3d9p4aH6aGzU9Qj3rewYaZ7dZyHyiadjKHzUPffJ7x2mH

    active (=1):
     +1 PUB_K1_7GZeo3d9p4aH6aGzU9Qj3rewYaZ7dZyHyiadjKHzUPffJ7x2mH

Resources:
 Type Used    Available Max       Delegated
 ──── ─────── ───────── ───────── ───────────
 RAM  2.93 KB 10.16 KB  13.08 KB
 CPU  0 µs    863.09 ms 863.09 ms 10.0000 SYS
 NET  0 Bytes 4.32 MB   4.32 MB   10.0000 SYS

```

Perfect\! As you can see, the public key in the response matches our public key from our generated json file. We also have information about the account's resources, but we will talk about this later.  

### Claim faucet

On testnet you will need “fake tokens” to test your contract, or dApp. Faucet is just that,0 valued tokens that mirror real ones from mainnet  (those who have real value). On mainnet, you can use the FooBar token, a real token with 0 value. 

To get faucet, enter the following command on testnet

```javascript
proton faucet:claim XPR devcourse
```

   
The result should be 

```javascript
Success: faucet claimed
```

Keep in mind that you can claim the same token once per 24 hours.

### Get the balance of your account

All tokens contract share the same base of tables set and actions. So we can use this command to fetch table from contract where argument is the contract account name, the table name, and the sope we are looking for, you account in this case:

```javascript
proton table eosio.token accounts devcourse
```

   
And the return response shows us how rich this account is \! As you can see the account have the 1000.0000 XPR received from the faucet claim command. 

```javascript
{
  "rows": [
    {
      "balance": "1000.0000 XPR"
    }
  ],
  "more": false,
  "next_key": ""
}
```

---

## Session complete

You now have the basic of @proton/cli on XPRNetwork.  
**\>\> Next, we’ll see how to read the on-chain data**