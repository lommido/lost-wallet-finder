// very small test
import { describe, it, expect } from 'vitest';
import { generateMnemonic, deriveAddresses } from './wallet';

describe('wallet core', () => {
  it('generates mnemonic and derives addresses', async () => {
    const m = await generateMnemonic();
    expect(m.split(' ').length).toBeGreaterThanOrEqual(12);
    const addrs = deriveAddresses(m, "m/44'/60'/0'/0", 0, 3);
    expect(addrs.length).toBe(3);
  });
});
