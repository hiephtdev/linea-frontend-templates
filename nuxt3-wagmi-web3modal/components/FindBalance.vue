<script lang="ts" setup>
import { fetchBalance as wFetchBalance, type Address } from "@wagmi/core";

const address = ref("");

const {
  result: balance,
  execute: fetchBalance,
  loading,
  error,
} = useAsync(wFetchBalance);
</script>

<template>
  <div>
    <div>
      Find balance:
      <input
        class="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded mr-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="address"
        type="text"
        placeholder="wallet address"
      />
      <button
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
        @click="() => fetchBalance({ address: address as Address })"
      >
        {{ loading ? "fetching..." : "fetch" }}
      </button>
    </div>
    <div>{{ balance?.formatted }}</div>
    <div v-if="error">Error: {{ error?.message }}</div>
  </div>
</template>

<style scoped></style>
