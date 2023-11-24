<script lang="ts" setup>
import { switchNetwork as wSwitchNetwork } from "@wagmi/core";

const { network } = storeToRefs(useWagmi());

const { execute: switchNetwork, loading, error } = useAsync(wSwitchNetwork);
</script>

<template>
  <div>
    <div class="font-extrabold">
      Connected to {{ network.chain?.name ?? network.chain?.id }}
      <span v-if="network.chain?.unsupported">(unsupported)</span>
    </div>
    <br />
    <div>
      Switch to:
      <button
        v-for="(item, index) in network.chains"
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 mr-2 px-4 border border-gray-400 rounded shadow"
        :key="index"
        @click="switchNetwork({ chainId: item.id })"
      >
        {{ item.name }}
      </button>
    </div>

    <div v-if="error">Error: {{ error?.message }}</div>
  </div>
</template>

<style scoped></style>
