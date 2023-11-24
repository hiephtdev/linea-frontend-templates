<script lang="ts" setup>
import { readContract } from "@wagmi/core";

const {
  result: supply,
  execute: fetchTotalSupply,
  loading,
  error,
} = useAsync(async () => {
  return await readContract({
    ...usdcContractConfig,
    functionName: "totalSupply",
  });
});

fetchTotalSupply();
</script>

<template>
  <div>
    <div>
      Total Supply: {{ supply?.toString() }}
      <button
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 mr-2 px-4 border border-gray-400 rounded shadow"
        @click="fetchTotalSupply"
      >
        {{ loading ? "Fetching..." : "Refetch" }}
      </button>
    </div>
    <div v-if="error">Error: {{ error?.message }}</div>
  </div>
</template>

<style scoped></style>
