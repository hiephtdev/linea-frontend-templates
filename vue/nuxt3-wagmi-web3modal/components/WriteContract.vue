<script lang="ts" setup>
import {
  writeContract as wWriteContract,
  waitForTransaction,
} from "@wagmi/core";

const amount = ref<string | null>(null);

const {
  result: transaction,
  execute: writeContract,
  loading,
  error,
} = useAsync(async () => {
  // random address for testing, replace with contract address that you want to allow to spend your tokens
  const spender = "0xa1cf087DB965Ab02Fb3CFaCe1f5c63935815f044";

  const result = await wWriteContract({
    ...usdcContractConfig,
    functionName: "approve",
    args: [spender, BigInt(amount.value!)],
  });
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
</script>

<template>
  <div>
    <h3>Approve allowance</h3>
    <form @submit.prevent="writeContract">
      <input
        class="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded mr-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        v-model="amount"
        type="number"
        placeholder="allowance amount"
      />
      <button
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 mr-2 px-4 border border-gray-400 rounded shadow"
        type="submit"
      >
        Approve
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

    <div v-if="error">Error: {{ error?.message }}</div>
    <div v-if="receiptError">Receipt Error: {{ receiptError?.message }}</div>
  </div>
</template>

<style scoped></style>
