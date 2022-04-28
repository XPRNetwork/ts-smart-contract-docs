---
description: RNG
---

# Random Number Generator (RNG)

Proton provides an easy to use way to get random numbers on the blockchain. 

## Request Random Number

RNG requests using `sendRequestRandom` require 3 parameters from you:
-  `contract` - Name - Contract to call `receiverand` action on once random number is generated.
-  `requestId` - u64 - Any ID to tie the RNG request to your own data.
-  `signingValue` - u64 - A value which will be used by the RNG provider to create a random checksum.

```ts
import { Name, check, requireAuth, Contract, Checksum256, TableStore } from 'proton-tsc'
import { sendRequestRandom, rngChecksumToU64 } from 'proton-tsc/rng';

@contract
class Rng extends Contract {
    @action("myaction")
    myaction(
        requestId: u64,
        signingValue: u64
    ): void {
        // ... Authenticate if needed ...
        
        // ... Save account, requestId and signing value to a table ...

        // Send RNG request
        sendRequestRandom(this.receiver, requestId, signingValue)
    }
}
```


## Receive Random Number

The random number generator will call the `receiverand` action on your contract with:
-  `requestId` - u64 - Any ID to tie the RNG request to your own data
-  `randomChecksum` - Checksum256 - A random checksum based off of the signingValue provided

```ts
import { Name, check, requireAuth, Contract, Checksum256, TableStore } from 'proton-tsc'
import { sendRequestRandom, rngChecksumToU64, RNG_CONTRACT } from 'proton-tsc/rng';

@contract
class Rng extends Contract {
    // ... code for requesting RNG value ...

    @action("receiverand")
    receiverand(
      requestId: u64,
      randomChecksum: Checksum256,
    ): void {
        // Authenticate
        requireAuth(RNG_CONTRACT);

        // ... Get data from your own tables using requestId ...

        // Set random value (100 is used as max value here)
        const randomValue = rngChecksumToU64(randomChecksum, 100);
    }
}
```