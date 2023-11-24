<script lang="ts" setup>
import { recoverMessageAddress } from "viem";
import { signMessage as wSignMessage } from "@wagmi/core";

const message = ref<string | null>(null);

const {
  result,
  execute: signMessage,
  loading,
  error,
} = useAsync(async () => {
  const signature = await wSignMessage({ message: message.value! });
  const recoveredAddress = await recoverMessageAddress({
    message: message.value!,
    signature,
  });

  return {
    signature,
    recoveredAddress,
  };
});
</script>

<template>
  <div>
    <form @submit.prevent="signMessage">
      <input
        class="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded mr-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="message"
        placeholder="message"
        required
      />
      <button
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 mr-2 px-4 border border-gray-400 rounded shadow"
        type="submit"
      >
        Sign Message
      </button>
    </form>

    <div v-if="result && !loading">
      <div>
        <div>Signature: {{ result.signature }}</div>
        <div>Recovered address: {{ result.recoveredAddress }}</div>
      </div>
    </div>

    <div v-if="error">Error: {{ error?.message }}</div>
  </div>
</template>

<style scoped></style>
