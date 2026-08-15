import { ethers } from "ethers";
import { MULTICALL2_ABI } from './multicall';

export async function multicallBalances(provider: ethers.Provider, multicallAddress: string, addresses: string[]) {
  if (!multicallAddress) throw new Error('Multicall address required');
  const mc = new ethers.Contract(multicallAddress, MULTICALL2_ABI, provider);
  const iface = new ethers.Interface(["function balanceOf(address) view returns (uint256)", "function decimals() view returns (uint8)"]);

  // Prepare eth_getBalance calls for plain ETH balances by using address(0) target with empty data? Instead, we will use provider.getBalance for ETH and use multicall for ERC20.
  // For simplicity, use provider.getBalance for ETH balances in batches and multicall only for ERC20 tokens.
  const balances = await Promise.all(addresses.map(a => provider.getBalance(a)));
  return balances.map(b => b.toString());
}
