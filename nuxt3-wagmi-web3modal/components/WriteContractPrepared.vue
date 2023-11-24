<script lang="ts" setup>
import {
  prepareWriteContract as wPrepareWriteContract,
  writeContract as wWriteContract,
  waitForTransaction,
} from "@wagmi/core";

const { account } = storeToRefs(useWagmi());
const amount = ref<string | null>(null);

const {
  result: preparedWriteContract,
  execute: prepareTransaction,
  loading: prepareLoading,
  error: prepareError,
} = useAsync(async () => {
  // random address for testing, replace with contract address that you want to allow to spend your tokens
  const spender = "0x2C1b868d6596a18e32E61B901E4060C872647b6C";

  return await wPrepareWriteContract({
    ...usdcContractConfig,
    functionName: "approve",
    args: [spender, BigInt(amount.value!)],
  });
});
const {
  result: transaction,
  execute: sendTransaction,
  loading,
  error,
} = useAsync(async () => {
  const result = await wWriteContract(preparedWriteContract.value!);
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
  [() => account.value.address, amount],
  ([_address, _amount]) => {
    if (!_address || !_amount) return;
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
        v-model="amount"
        type="number"
        placeholder="allowance amount"
      />
      <button
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 mr-2 px-4 border border-gray-400 rounded shadow"
        :disabled="prepareLoading || !preparedWriteContract"
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

    <div v-if="prepareError">
      Preparing Transaction Error: {{ prepareError?.message }}
    </div>
    <div v-if="error">Error: {{ error?.message }}</div>
    <div v-if="receiptError">Receipt Error: {{ receiptError?.message }}</div>
  </div>
</template>

<style scoped></style>
