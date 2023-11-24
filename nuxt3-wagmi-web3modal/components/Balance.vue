<script lang="ts" setup>
import { fetchBalance as wFetchBalance } from "@wagmi/core";

const { account } = storeToRefs(useWagmi());

const {
  result: balance,
  execute: fetchBalance,
  loading,
  error,
} = useAsync(wFetchBalance);
const getAccountBalance = () =>
  fetchBalance({ address: account.value.address! });

watch(
  account,
  ({ address }) => {
    if (!address) return;
    getAccountBalance();
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <div>
      Connected wallet balance:
      {{ balance?.formatted }}
      <button
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
        @click="getAccountBalance"
      >
        Refetch
      </button>
    </div>
    <div v-if="error">Error: {{ error?.message }}</div>
  </div>
</template>

<style scoped></style>
