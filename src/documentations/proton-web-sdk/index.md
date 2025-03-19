# Proton Web SDK

The Proton Web SDK is a comprehensive toolkit for integrating XPRNetwork blockchain functionality into web applications. It provides a set of tools and utilities for handling wallet connections, transactions, and blockchain interactions.

## Package Structure

The SDK is organized into several key modules:

### Core Modules

- `connect.ts` - Handles wallet connection and authentication
- `constants.ts` - Contains SDK constants and configuration values
- `storage.ts` - Manages persistent storage for sessions and settings
- `types.ts` - TypeScript type definitions
- `walletTypeSelector.ts` - Manages wallet type selection and configuration

### Links Module

The `links` directory contains implementations for different connection types:
- `protonWeb.ts` - Web-based Proton connection implementation
- `cleos.ts` - Command-line interface connection implementation

## Main Components

### ConnectWallet

The main function for establishing a wallet connection.

```typescript
async function ConnectWallet({
    linkOptions,
    transportOptions,
    selectorOptions
}: ConnectWalletArgs): Promise<ConnectWalletRet>
```

#### Parameters
- `linkOptions`: Configuration for the link connection
- `transportOptions`: Transport layer configuration
- `selectorOptions`: Wallet selector configuration

#### Returns
- `ConnectWalletRet`: Connection result object containing session info

### Types

#### ConnectWalletArgs
```typescript
interface ConnectWalletArgs {
    linkOptions: LinkOptions;
    transportOptions?: TransportOptions;
    selectorOptions?: SelectorOptions;
}
```

#### LinkOptions
```typescript
interface LinkOptions {
    endpoints: string[];
    chainId: string;
    scheme?: string;
    storage?: LinkStorage;
    client?: JsonRpc;
    transport?: LinkTransport;
}
```

#### TransportOptions
```typescript
interface TransportOptions {
    customStyleOptions?: StyleOptions;
    walletType?: string;
}
```

## Storage

The SDK provides a flexible storage system for managing session data:

```typescript
interface ProtonWebStorage extends LinkStorage {
    write(key: string, data: string): Promise<void>;
    read(key: string): Promise<string | null>;
    remove(key: string): Promise<void>;
}
```

## Styling

The SDK supports customizable styling through the StyleOptions interface:

```typescript
interface StyleOptions {
    modalBackgroundColor?: string;
    logoBackgroundColor?: string;
    isLogoRound?: boolean;
    optionBackgroundColor?: string;
    optionFontColor?: string;
    primaryFontColor?: string;
    secondaryFontColor?: string;
    linkColor?: string;
}
```

## Usage Example

```typescript
import { ConnectWallet } from '@proton/web-sdk'

const connect = async () => {
    try {
        const { session } = await ConnectWallet({
            linkOptions: {
                endpoints: ['https://api.rockerone.io'],
                chainId: '384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0',
            },
            transportOptions: {
                walletType: ['webauth']
            },
            selectorOptions: {
                appName: 'My App'
            }
        })
        
        // Session established, ready to make transactions
        console.log('Connected:', session)
    } catch (error) {
        console.error('Connection error:', error)
    }
}
```

## Error Handling

The SDK provides several error types for handling different scenarios:

```typescript
class ProtonError extends Error {
    constructor(message: string, code?: string, details?: any)
}

class ConnectionError extends ProtonError {
    constructor(message: string, details?: any)
}

class TransactionError extends ProtonError {
    constructor(message: string, details?: any)
}
```

## Constants

Important constants defined in the SDK:

```typescript
const DEFAULT_SCHEME = 'proton'
const CHAIN_MAINNET = '384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0'
const CHAIN_TESTNET = '71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd'
```

## Browser Support

The SDK is designed to work with modern web browsers and includes:
- Full support for desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile browser support
- Responsive design for different screen sizes
- Support for both HTTP and HTTPS connections