import { ethers } from "ethers";
import * as bip39 from "bip39";
import PQueue from "p-queue";

export async function generateMnemonic(strength = 128) {
  return bip39.generateMnemonic(strength);
}

export function mnemonicToHDNode(mnemonic: string) {
  return ethers.utils.HDNode.fromMnemonic(mnemonic);
}

export function deriveAddresses(mnemonic: string, pathBase: string, start = 0, count = 10) {
  const hd = mnemonicToHDNode(mnemonic);
  const result: { index: number; address: string; privateKey: string }[] = [];
  for (let i = start; i < start + count; i++) {
    const node = hd.derivePath(`${pathBase}/${i}`);
    result.push({ index: i, address: ethers.getAddress(node.address), privateKey: node.privateKey });
  }
  return result;
}

export async function encryptKeystore(privateKey: string, password: string) {
  const wallet = new ethers.Wallet(privateKey);
  return wallet.encrypt(password);
}

export async function decryptKeystore(json: string, password: string) {
  return ethers.Wallet.fromEncryptedJson(json, password);
}

export async function batchBalances(provider: ethers.providers.Provider, addresses: string[], concurrency = 10) {
  const queue = new PQueue({ concurrency });
  const results = await Promise.all(addresses.map(a => queue.add(async () => ({ address: a, balance: await provider.getBalance(a) }))));
  return results;
}
