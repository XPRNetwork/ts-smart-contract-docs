# Storage Module

The Storage module provides functionality for persisting session data and other information required by the Proton Web SDK.

## Interface: ProtonWebStorage

```typescript
interface ProtonWebStorage extends LinkStorage {
    write(key: string, data: string): Promise<void>;
    read(key: string): Promise<string | null>;
    remove(key: string): Promise<void>;
}
```

### Methods

#### write
Writes data to storage.
```typescript
write(key: string, data: string): Promise<void>
```
- `key`: Storage key identifier
- `data`: String data to store
- Returns: Promise that resolves when write is complete

#### read
Reads data from storage.
```typescript
read(key: string): Promise<string | null>
```
- `key`: Storage key identifier
- Returns: Promise that resolves with the stored data or null if not found

#### remove
Removes data from storage.
```typescript
remove(key: string): Promise<void>
```
- `key`: Storage key identifier
- Returns: Promise that resolves when removal is complete

## Default Implementation

The SDK provides a default implementation using browser's localStorage:

```typescript
class WebStorage implements ProtonWebStorage {
    async write(key: string, data: string): Promise<void> {
        localStorage.setItem(key, data);
    }

    async read(key: string): Promise<string | null> {
        return localStorage.getItem(key);
    }

    async remove(key: string): Promise<void> {
        localStorage.removeItem(key);
    }
}
```

## Usage Example

```typescript
import { WebStorage } from '@proton/web-sdk'

const storage = new WebStorage();

// Store session data
await storage.write('session', JSON.stringify({
    actor: 'myaccount',
    permission: 'active',
    publicKey: 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV'
}));

// Read session data
const sessionData = await storage.read('session');
if (sessionData) {
    const session = JSON.parse(sessionData);
    console.log('Session:', session);
}

// Remove session data
await storage.remove('session');
```

## Custom Storage Implementation

You can implement your own storage adapter by implementing the ProtonWebStorage interface:

```typescript
class CustomStorage implements ProtonWebStorage {
    async write(key: string, data: string): Promise<void> {
        // Your custom write implementation
    }

    async read(key: string): Promise<string | null> {
        // Your custom read implementation
    }

    async remove(key: string): Promise<void> {
        // Your custom remove implementation
    }
}
```

## Storage Keys

Common storage keys used by the SDK:
- `wallet-type`: Stores the selected wallet type
- `user-auth`: Stores the user's authentication data
- `session-${chainId}`: Stores session data for specific chain
- `link-${chainId}`: Stores link data for specific chain