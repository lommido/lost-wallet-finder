### Scanning engine

This feature branch adds a simple scanning engine to the core package.

What it includes:
- scanMnemonic(mnemonic, provider, options) — derives addresses for configured derivation paths and index ranges, batches ETH balance checks via provider.getBalance, and returns discovered addresses with non-zero balances.
- A small multicall placeholder (multicall.ts) for future ERC-20 batch checks.

Notes & limitations:
- This first iteration uses provider.getBalance in batches. For large scans we will extend multicall usage and token detection (ERC-20) using Multicall2.
- Scans on mainnet against public RPC endpoints may be slow or rate-limited. Add your own RPC API keys in .env to improve speed.

Default params in UI will be: paths = ["m/44'/60'/0'/0", "m/44'/60'/0'"], index range 0..1000, concurrency 20. These are configurable by the user in the web UI.
