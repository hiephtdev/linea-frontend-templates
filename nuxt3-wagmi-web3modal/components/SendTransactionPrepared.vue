<script lang="ts" setup>
import { parseEther } from "viem";
import {
  type Address,
  prepareSendTransaction as wPrepareSendTransaction,
  sendTransaction as wSendTransaction,
  waitForTransaction,
} from "@wagmi/core";

const address = ref<Address | null>(null);
const value = ref<string | null>(null);

const {
  result: preparedTransaction,
  execute: prepareTransaction,
  loading: prepareLoading,
  error: prepareError,
} = useAsync(async () => {
  return await wPrepareSendTransaction({
    to: address.value!,
    value: parseEther(value.value!),
  });
});
const {
  result: transaction,
  execute: sendTransaction,
  loading,
  error,
} = useAsync(async () => {
  const result = await wSendTransaction(preparedTransaction.value!);
  waitForReceipt(result.hash);
  return result;
});
const {
  result: receipt,
  execute: waitForReceipt,
  loading: receiptLoading,
  error: receiptError,
} = useAsync(async (transactionHash) => {
  return await waitForTransaction({ hash: transactionHash });
});

watch(
  [address, value],
  () => {
    if (!address.value || !value.value) return;
    prepareTransaction();
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <form @submit.prevent="sendTransaction">
      <input
        class="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded mr-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="address"
        placeholder="address"
      />
      <input
        class="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded mr-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="value"
        placeholder="value (ether)"
      />
      <button
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 mr-2 px-4 border border-gray-400 rounded shadow"
        :disabled="prepareLoading || !preparedTransaction"
        type="submit"
      >
        Send
      </button>
    </form>

    <div v-if="loading">Transaction pending...</div>
    <div v-else-if="transaction">
      <div>Transaction Hash: {{ transaction?.hash }}</div>
      <div>
        Transaction Receipt:
        <span v-if="receiptLoading">Pending...</span>
        <pre>{{ stringify(receipt, null, 2) }}</pre>
      </div>
    </div>

    <div v-if="prepareError">
      Preparing Transaction Error: {{ prepareError?.message }}
    </div>
    <div v-if="error">Error: {{ error?.message }}</div>
    <div v-if="receiptError">Receipt Error: {{ receiptError?.message }}</div>
  </div>
</template>

<style scoped></style>
