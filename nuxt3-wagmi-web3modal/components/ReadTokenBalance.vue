<script lang="ts" setup>
import { readContract } from "@wagmi/core";

const { account } = storeToRefs(useWagmi());
const address = ref(account.value.address);

const {
  result: balance,
  execute: fetchBalance,
  loading,
  error,
} = useAsync(async () => {
  return await readContract({
    ...usdcContractConfig,
    functionName: "balanceOf",
    args: [address.value!],
  });
});

fetchBalance();
</script>

<template>
  <div>
    <div>Token balance: {{ balance?.toString() }}</div>
    <div>
      <input
        class="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded mr-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="address"
        type="text"
        placeholder="wallet address"
      />
      <button
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 mr-2 px-4 border border-gray-400 rounded shadow"
        @click="fetchBalance"
      >
        {{ loading ? "Fetching..." : "Refetch" }}
      </button>
    </div>
    <div v-if="error">Error: {{ error?.message }}</div>
  </div>
</template>

<style scoped></style>
