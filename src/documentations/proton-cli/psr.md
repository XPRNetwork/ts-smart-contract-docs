# PSR (Proton Signing Request) Commands

## Create Session
**Command:** `proton psr <uri>`

**Description:** Create a session to handle Proton Signing Requests (PSR). This command allows you to sign transactions using PSR URIs.

**Arguments:**
- `uri` (required): The PSR URI to process

**Features:**
- Interactive account selection
- Automatic session management
- WebSocket connection handling
- Transaction signing
- Long-running session support (24-hour timeout)

**Process:**
1. Takes a PSR URI as input
2. Prompts for signing account (format: account@permission)
3. Creates a unique session with a generated request key
4. Connects to the default service (cb.anchor.link)
5. Signs the transaction with the provided account
6. Maintains an active session for additional requests

**Example:**
```bash
proton psr esr://gmNgZGBY1mTC_MoglIGBIVzX5uxZRqAQGMBoExwGBiYGBgYGAA

# Then enter account when prompted:
# Enter account to login with (e.g. account@active): myaccount@active
```

**Notes:**
- The session remains active for 24 hours
- Uses cb.anchor.link as the default service
- Automatically validates permissions before signing
- Provides real-time feedback on transaction status