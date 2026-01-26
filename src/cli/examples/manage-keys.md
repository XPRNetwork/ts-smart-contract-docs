# Manage Keys

In this guide, we will go through managing private keys.

### Pre-requisites

- NodeJS 16 [Installation Guide](https://github.com/XPRNetwork/proton-cli#install-nodejs)
- NPM
- Git
- [XPR Network CLI](https://github.com/XPRNetwork/proton-cli)
``` bash
npm install -g @proton/cli
```

Many commands in XPR Network CLI interact with blockchain: transaction, contract:set etc. And to do it right, the CLI needs to store private keys somewhere for one or several accounts you work with. Otherwise, it would be necessary to provide private key for every use of the command.

XPR Network CLI has a Key Manager to work work with private keys. And there is a set of commands to work with this manager.
These commands have `key:` prefix. Let's try all of them.

1. Generation a new private key: `proton key:generate`

    This command allows to generate a new private key, public key and a mnemonic phrase for the key. It can be useful in cases when you need to change a private key for you account or accounts. 

    *NOTICE*: This key will *NOT* be stored in Key Manager.

    The output for the command is the following (note that you output will be different - all keys are unique):
    ```
    Note: Please store private key or mnemonic securely!
    {
        "public": "PUB_K1_58jVu7RoEZ5k1H13P8k1DaDMtQPufeNwGd1riCJvbMTAtLSUi1",
        "private": "PVT_K1_t9BdFgBGgkekfrfRbqokoeDToJrGg1AXJfrfLLndsrLqysYtS",
        "mnemonic": "empower arrest glimpse noodle broccoli alcohol girl black left ranch proof wet"
    }
    ```

2. Adding a new key: `proton key:add`

    This command allows you to add an existing private key to the Manager. 

    Let's add a private key from previous step to the manager:
    ```
    proton key:add

    Would you like to encrypt your stored keys with a password? (yes/no): no
    Enter private key (starts with PVT_K1): *********************************************************
    Success: Added new private key for public key: PUB_K1_58jVu7RoEZ5k1H13P8k1DaDMtQPufeNwGd1riCJvbMTAtLSUi1
    ```
    You can see that public key is the same with a public key from `key:generate` command. It means the key was added properly.

3. List of keys: `proton key:list`

    To get a list of keys private keys currently stored in Key Manager.

    By default there is no key, so the output should be empty:
    ```
    proton key:list

    []
    ```
    In our case the output should contain a private key we added on the previous step:
    ```
    [
    {
        "publicKey": "PUB_K1_58jVu7RoEZ5k1H13P8k1DaDMtQPufeNwGd1riCJvbMTAtLSUi1",
        "privateKey": "PVT_K1_t9BdFgBGgkekfrfRbqokoeDToJrGg1AXJfrfLLndsrLqysYtS"
    }
    ]
    ```

4. Protecting keys with password: `proton key:lock`

    Of course, it is very insecure to store such sensitive data as private key in a open form. There is a built-in mechanism to protect keys in storage. You can encrypt all your keys with a strong password. So nobody except you will be able to manage them. It is *strongly* recommended to lock keys.

    Let's set a password:
    ```
    proton: key:lock
    Enter 32 character password (leave empty to create new):

                Please safely store your 32 character password, you will need it to unlock your wallet:
                Password: 6972fceb12e12042e08700e4c402734a

    Success: Locked wallet
    ```

    Now if you'll try, for example, to list your keys with `proton key:list` command you'll see a request for password:
    ```
    Please enter your 32 character password:
    ```

5. Disabling keys protection: `proton key:unlock`

    The protection can be removed. Then all keys will be decrypted and stored in an open form. To do it you need to provide your password. 

    ```
    Enter 32 character password: ********************************
    Success: Unlocked wallet
    Note: Your private keys are stored as plaintext on disk until you call keys:lock again
    ```

6. Getting a private key by a public key: `proton key:get`

    Sometimes it can be difficult to remember what private key is used for an account. Knowing the public key can help in this situation. You can use a public key to get a private key from the Manager.

    Let's try to get a private key for the public key we generated previously in the step 1:
    ```
    proton key:get PUB_K1_58jVu7RoEZ5k1H13P8k1DaDMtQPufeNwGd1riCJvbMTAtLSUi1
    Success: PVT_K1_t9BdFgBGgkekfrfRbqokoeDToJrGg1AXJfrfLLndsrLqysYtS
    ```

7. Removing the key: `proton key:remove`

    If you don't need some of your keys, you can remove them from the Manager:
    ```
    proton key:remove

    Enter private key to delete (starts with PVT_K1): ********************************************************
    Are you sure you want to delete this private key? (yes/no): yes
    Success: Removed private key for public key PUB_K1_58jVu7RoEZ5k1H13P8k1DaDMtQPufeNwGd1riCJvbMTAtLSUi1
    ```
    You can check if the key was removed using `proton key:list` command

8. Cleaning up the Manager: `proton key:reset`

    If you want to remove all your keys from the Manager, then you can use a reset command.

    *CAUTION:* This operation will remove all your keys without a possibility to restore them. Be very very careful when you use it.
    ```
    proton key:reset

    Caution: Are you sure you want to delete all your private keys? (yes/no): yes
    Caution: Are you REALLY sure? There is no coming back from this (yes/no): yes
    Success: Reset password and deleted all stored private keys.
    ```
