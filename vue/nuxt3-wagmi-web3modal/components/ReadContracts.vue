<script lang="ts" setup>
import { readContracts } from "@wagmi/core";
import { stringify } from "viem";

const { account } = storeToRefs(useWagmi());

const {
  result: results,
  execute: fetchContracts,
  loading,
  error,
} = useAsync(async () => {
  return await readContracts({
    contracts: [
      {
        ...usdcContractConfig,
        functionName: "balanceOf",
        args: [account.value.address!],
      },
      {
        ...usdcContractConfig,
        functionName: "name",
      },
      {
        ...usdcContractConfig,
        functionName: "totalSupply",
      },
    ],
  });
});

fetchContracts();
</script>

<template>
  <div>
    <div>Data:</div>
    <div v-if="loading">loading...</div>
    <div v-if="results">
      <pre v-for="(item, index) in results" :key="index">{{
        stringify(item)
      }}</pre>
    </div>
    <div v-if="error">Error: {{ error?.message }}</div>
  </div>
</template>

<style scoped></style>
