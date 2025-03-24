# Wallet Type Selector Module

The Wallet Type Selector module manages the selection and configuration of different wallet types in the Proton Web SDK.

## Interface: WalletTypeSelector

```typescript
interface WalletTypeSelector {
    select(options: SelectorOptions): Promise<string>;
    getAvailableWallets(): string[];
    setPreferredWallet(type: string): void;
    clearPreferredWallet(): void;
}
```

### Methods

#### select
Prompts the user to select a wallet type.
```typescript
select(options: SelectorOptions): Promise<string>
```
- `options`: Configuration options for the selector
- Returns: Promise that resolves with the selected wallet type

#### getAvailableWallets
Returns a list of available wallet types.
```typescript
getAvailableWallets(): string[]
```
- Returns: Array of available wallet type identifiers

#### setPreferredWallet
Sets the preferred wallet type for future connections.
```typescript
setPreferredWallet(type: string): void
```
- `type`: Wallet type identifier to set as preferred

#### clearPreferredWallet
Clears the preferred wallet type setting.
```typescript
clearPreferredWallet(): void
```

## Configuration

### SelectorOptions Interface
```typescript
interface SelectorOptions {
    appName: string;              // Your application name
    walletTypes?: string[];      // List of supported wallet types
    enabledWalletTypes?: string[]; // List of enabled wallet types
    customStyleOptions?: StyleOptions; // Custom styling options
}
```

### StyleOptions Interface
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

## Supported Wallet Types

The SDK supports the following wallet types:
- `webauth`: Web-based authentication
- `proton`: Proton Wallet
- `anchor`: Anchor Wallet
- `cleos`: Command-line interface

## Usage Example

```typescript
import { WalletTypeSelector } from '@proton/web-sdk'

const selector = new WalletTypeSelector();

// Get available wallets
const availableWallets = selector.getAvailableWallets();
console.log('Available wallets:', availableWallets);

// Select a wallet type
try {
    const selectedType = await selector.select({
        appName: 'My dApp',
        walletTypes: ['webauth', 'proton'],
        customStyleOptions: {
            modalBackgroundColor: '#ffffff',
            primaryFontColor: '#000000'
        }
    });
    
    console.log('Selected wallet:', selectedType);
    
    // Set as preferred wallet
    selector.setPreferredWallet(selectedType);
} catch (error) {
    console.error('Wallet selection failed:', error);
}
```

## Customization

### Custom Wallet Type Implementation

You can add support for custom wallet types by extending the base wallet type:

```typescript
class CustomWalletType implements WalletType {
    id = 'custom-wallet';
    name = 'Custom Wallet';
    
    async connect(options: ConnectOptions): Promise<WalletConnection> {
        // Your custom connection logic
    }
    
    async disconnect(): Promise<void> {
        // Your custom disconnection logic
    }
}
```