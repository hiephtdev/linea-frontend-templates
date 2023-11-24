<script lang="ts" setup>
import { watchPendingTransactions, type Hash } from "@wagmi/core";

const transactionHashes = ref<Hash[]>([]);

watchPendingTransactions({}, (hashes) => {
  transactionHashes.value.push(...hashes);
});
</script>

<template>
  <div>
    <details>
      <summary>{{ transactionHashes.length }} transaction hashes</summary>

      {{ transactionHashes.reverse().join("\n") }}
    </details>
  </div>
</template>

<style scoped></style>
