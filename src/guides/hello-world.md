---
description: A guide for Hello world contract
---

# Hello World!

This guide describes how to create your first basic contract and try it with test blockchain using Proton.

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
proton generate:contract helloworld
```

Note: the contract name must be 1-12 chars, only lowercase a-z and numbers 1-5 are possible.

2. The `proton generate:contract` command prompts you for information about the action of the contact: name and parameters. Let's add action `say` with `text` parameter that is `string`:
    ``` bash
    Let's add some actions to the class
    ? Enter new action name: say
    ? Do you want to add parameters to the action? Yes
    ? Enter new parameter name: text
    ? Choose parameter type: string
    ? Is the parameter an array? No
    ? Can the parameter be nullable? No
    ————————————
    ? Do you want to add one more parameter? No
    ————————————
    ? Do you want to add one more action? No

    ```
3. The command will prompt you to select your favorite Node.Js package manager if you have both `npm` and `yarn` installed. Feel free to select the one you like.
4. After the contract is ready navigate to `helloworld` folder. The folder will have the following structure:
    | Files                    | Details                               |
    | ------------------------ | ------------------------------------- |
    | `helloworld.contract.ts` | The contract code, written in Proton  |
    | `playground.ts`          | The code to try a contract            |

5. Open `helloworld.contract.ts` file. It should look like this:
    ``` ts
    import { Contract } from "proton-tsc";

    @contract
    export class helloworld extends Contract {

        @action("say")
        say(
            text: string
        ): void {
            // Add code of your contract here
        }
    }
    ```
6. Let's modify the contract to print your name. Import `print` function from `proton-tsc`:
    ```
    import { Contract, print } from "proton-tsc";
    ```
7. And add the call of the function to the `say` method instead of `// Add here a code of your contract` statement:
    ``` ts
    @action("say")
    say(
        text: string
    ): void {
        print(`Hello, ${text}`);
    }
    ```
8. Open `playground.ts` file. It should look like this:
    ``` ts
    import { Blockchain } from "@proton/vert";

    async function wait(ms: number) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    async function main() {
        const blockchain = new Blockchain();
        const contract = blockchain.createContract('helloworld', 'target/helloworld.contract');
        await wait(0);

        // Put you actions calls here
        await contract.actions.say(['']).send('helloworld@active');
    }

    main();
    ```
9. Let's modify it adding `World!` instead of empty line:
    ``` ts
    await contract.actions.say(['World!']).send('helloworld@active');
    ```
10. Now we can run the playground and check how it works:
    ``` bash
    npm run playground
    ```

    The result should be the following:

    ``` bash
    DEBUG:

    START ACTION
    Contract: helloworld
    Action: say
    Inline: false
    Notification: false
    First Receiver: helloworld
    Sender:
    Authorization: [{"actor":"helloworld","permission":"active"}]
    Data: {
        "text": "World!"
    }
    Action Order: 0
    Execution Order: 0

    DEBUG: action_data_size
    DEBUG: read_action_data
    DEBUG: prints_l Hello, World!
    ```


As you can see, the last line displays the result of `print` function. 

Congrats, you just created your first contract!



