import { erc20ABI } from "@wagmi/core";

export const usdcContractConfig = {
  address: "0x6d8727B664D3f877de683F836E75EB2de47FD197", // Linea Goerli Testnet USDC token address
  abi: erc20ABI,
} as const;
