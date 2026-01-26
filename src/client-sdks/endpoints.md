---
description: Chain IDs and Endpoints
---

# Chain IDs and Endpoints

## Chain IDs

| Network | Chain ID |
|---------|----------|
| **Mainnet** | `384da888112027f0321850a169f737c33e53b388aad48b5adace4bab97f437e0` |
| **Testnet** | `71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd` |

## Mainnet API Endpoints

*Last verified: January 2026*

```
https://api.protonnz.com
https://proton.protonuk.io
https://proton.eosusa.io
https://proton.cryptolions.io
https://proton.eoscafeblock.com
https://api.totalproton.tech
https://mainnet.brotonbp.com
https://proton.eu.eosamsterdam.net
https://protonapi.blocksindia.com
https://api-xprnetwork-main.saltant.io
https://protonapi.ledgerwise.io
https://proton-api.eosiomadrid.io
https://proton.genereos.io
https://api-proton.nodeone.network:8344
https://proton-public.neftyblocks.com
https://api-proton.eosarabia.net
https://api.luminaryvisn.com
```

### Mainnet Hyperion (History) Endpoints

```
https://proton.protonuk.io
https://api-xprnetwork-main.saltant.io
```

## Testnet API Endpoints

*Last verified: January 2026*

```
https://test.proton.eosusa.io
https://testnet-api.alvosec.com
https://proton-testnet.cryptolions.io
https://testnet.brotonbp.com
https://testnet-api.xprcore.com
https://protontest.eu.eosamsterdam.net
https://api-xprnetwork-test.saltant.io
https://testnet-api.xprdata.org
https://testnet.rockerone.io
```

## Usage Examples

### JavaScript/TypeScript

```typescript
import { JsonRpc } from '@proton/js';

// Mainnet
const mainnetRpc = new JsonRpc('https://proton.eosusa.io');

// Testnet
const testnetRpc = new JsonRpc('https://testnet-api.alvosec.com');
```

### With Multiple Endpoints (Fault Tolerance)

```typescript
const endpoints = [
  'https://proton.eosusa.io',
  'https://api.protonnz.com',
  'https://proton.cryptolions.io'
];

// The SDK will automatically failover to the next endpoint if one fails
```

### CLI

```bash
# Set mainnet endpoint
proton chain:set proton
proton endpoint:set https://proton.eosusa.io

# Set testnet endpoint
proton chain:set proton-test
proton endpoint:set https://testnet-api.alvosec.com
```

## P2P Peer Addresses

For node operators running XPR Network nodes, P2P peer configurations are available in the official repositories:

- **Mainnet**: [xpr.start](https://github.com/XPRNetwork/xpr.start)
- **Testnet**: [xpr-testnet.start](https://github.com/XPRNetwork/xpr-testnet.start)

## Endpoint Health

To check if an endpoint is healthy:

```bash
curl -s https://proton.eosusa.io/v1/chain/get_info | jq '.head_block_num'
```

A healthy endpoint will return the current head block number.

## Validating Endpoints

This documentation includes a link checker script. Run it to verify all endpoints:

```bash
# Check all API endpoints
npm run check-endpoints

# Check all documentation links
npm run check-docs-links

# Check everything
npm run check-links
```
