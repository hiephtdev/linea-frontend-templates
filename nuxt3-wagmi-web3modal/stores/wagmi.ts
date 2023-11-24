import { defineStore } from "pinia";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/vue";
import { linea, lineaTestnet } from "viem/chains";
import {
  getAccount,
  getNetwork,
  watchAccount,
  watchNetwork,
} from "@wagmi/core";

export const defaultChain =
  import.meta.env.MODE === "development" ? lineaTestnet : linea;

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useWagmi = defineStore("wagmi", () => {
  const projectId = useAppConfig().walletConnectProjectID;
  if (!projectId)
    throw new Error(
      "Missing WalletConnect project ID in .env file, please check .env file"
    );

  const metadata = {
    name: "Linea - web3Modal - nuxt 3",
    description: "Linea - web3Modal - nuxt 3 template",
    url: "https://web3modal.com",
    icons: ["https://walletconnect.com/meta/favicon.ico"],
  };
  const chains = [linea, lineaTestnet];
  const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
  const web3modal = createWeb3Modal({
    wagmiConfig,
    projectId,
    chains,
    defaultChain,
  });

  const account = ref(getAccount());
  const network = ref(getNetwork());

  watchAccount((newAccount) => {
    account.value = newAccount;
  });
  watchNetwork((newNetwork) => {
    network.value = newNetwork;
  });

  return {
    account,
    network,
  };
});
