import { describe, it, expect } from 'vitest';
import { generateMnemonic } from './wallet';
import { scanMnemonic } from './scan-api';
import { ethers } from 'ethers';

// A smoke test that uses Ethers default provider (public) for a tiny range
// This test is mainly for developer smoke; it may be flaky depending on public RPC availability.

describe('scanner smoke', () => {
  it('scans a tiny range without throwing', async () => {
    const mnemonic = await generateMnemonic();
    const provider = ethers.getDefaultProvider('mainnet');
    const res = await scanMnemonic(mnemonic, provider, { paths: ["m/44'/60'/0'/0"], startIndex: 0, endIndex: 2, concurrency: 5 });
    expect(Array.isArray(res)).toBe(true);
  }, 20000);
});
