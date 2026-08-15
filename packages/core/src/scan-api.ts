import { ethers } from "ethers";
import { deriveAddresses } from './wallet';
import { multicallBalances } from './scanner';

export type ScanOptions = {
  paths: string[]; // base paths like "m/44'/60'/0'/0"
  startIndex: number;
  endIndex: number; // inclusive
  concurrency: number;
  multicallAddresses?: { [chain: string]: string };
};

export async function scanMnemonic(mnemonic: string, provider: ethers.Provider, options: ScanOptions) {
  const { paths, startIndex, endIndex, concurrency } = options;
  const results: { path: string; index: number; address: string; balance: string }[] = [];

  // derive addresses for all paths and indices
  const tasks: { path: string; index: number; address: string; privateKey?: string }[] = [];
  for (const p of paths) {
    for (let i = startIndex; i <= endIndex; i++) {
      const d = deriveAddresses(mnemonic, p, i, 1)[0];
      tasks.push({ path: p, index: i, address: d.address, privateKey: d.privateKey });
    }
  }

  // Batch ETH balance checks with limited concurrency
  const pLimit = (concurrency > 0 ? concurrency : 10);
  const chunks: string[][] = [];
  for (let i = 0; i < tasks.length; i += pLimit) {
    chunks.push(tasks.slice(i, i + pLimit).map(t => t.address));
  }

  for (const chunk of chunks) {
    const balances = await Promise.all(chunk.map(a => provider.getBalance(a)));
    for (let i = 0; i < chunk.length; i++) {
      const task = tasks.shift()!; // tasks consumed in order
      results.push({ path: task.path, index: task.index, address: chunk[i], balance: balances[i].toString() });
    }
  }

  return results.filter(r => r.balance !== '0');
}
