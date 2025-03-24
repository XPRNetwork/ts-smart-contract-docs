# Connect Module

The Connect module provides the core functionality for establishing connections with the Proton blockchain.

## Main Function: ConnectWallet

```typescript
async function ConnectWallet({
    linkOptions,
    transportOptions,
    selectorOptions
}: ConnectWalletArgs): Promise<ConnectWalletRet>
```

### Parameters

#### linkOptions (required)
Configuration for the blockchain connection:
```typescript
interface LinkOptions {
    endpoints: string[];      // Array of blockchain node endpoints
    chainId: string;         // Chain ID to connect to
    scheme?: string;         // Protocol scheme (default: 'proton')
    storage?: LinkStorage;   // Storage adapter for session data
    client?: JsonRpc;        // Optional JsonRpc client instance
    transport?: LinkTransport; // Transport layer implementation
}
```

#### transportOptions (optional)
Configuration for the transport layer:
```typescript
interface TransportOptions {
    customStyleOptions?: StyleOptions; // Custom UI styling
    walletType?: string;              // Preferred wallet type
}
```

#### selectorOptions (optional)
Configuration for the wallet selector:
```typescript
interface SelectorOptions {
    appName: string;              // Your application name
    walletTypes?: string[];      // Supported wallet types
    enabledWalletTypes?: string[]; // Enabled wallet types
}
```

### Returns

```typescript
interface ConnectWalletRet {
    session: {
        auth: {
            actor: string;
            permission: string;
        };
        chainId: string;
        transact: (args: TransactArgs, options?: TransactOptions) => Promise<any>;
        link: {
            walletType: string;
            client: JsonRpc;
        };
    };
}
```

### Error Handling

The function may throw the following errors:
- `ConnectionError`: When connection cannot be established
- `WalletError`: When there's an issue with the wallet
- `ChainError`: When there's an issue with the blockchain
- `StorageError`: When there's an issue with session storage

### Example Usage

```typescript
try {
    const { session } = await ConnectWallet({
        linkOptions: {
            endpoints: ['https://proton.greymass.com'],
            chainId: CHAIN_MAINNET,
        },
        transportOptions: {
            walletType: 'webauth',
            customStyleOptions: {
                modalBackgroundColor: '#f5f5f5',
                primaryFontColor: '#000000'
            }
        },
        selectorOptions: {
            appName: 'My dApp',
            walletTypes: ['webauth', 'proton']
        }
    });

    // Use the session
    const result = await session.transact({
        actions: [{
            // Your action here
        }]
    });
} catch (error) {
    console.error('Connection failed:', error);
}
```