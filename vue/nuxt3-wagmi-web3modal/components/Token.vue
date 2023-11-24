<script lang="ts" setup>
import { fetchToken as wFetchToken } from "@wagmi/core";

const tokenAddress = ref(usdcContractConfig.address);

const {
  result: token,
  execute: fetchToken,
  loading,
  error,
} = useAsync(wFetchToken);
const fetchCurrentToken = () => fetchToken({ address: tokenAddress.value });
</script>

<template>
  <div>
    <form @submit.prevent="fetchCurrentToken">
      <input
        class="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded mr-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="tokenAddress"
        placeholder="token address"
      />
      <button
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 mr-2 px-4 border border-gray-400 rounded shadow"
        type="submit"
      >
        Fetch
      </button>
    </form>
    <div v-if="loading">Fetching token...</div>
    <div v-else-if="token">
      <pre>{{ stringify(token, null, 4) }}</pre>
    </div>
    <div v-else-if="error">Error: {{ error?.message }}</div>
  </div>
</template>

<style scoped></style>
