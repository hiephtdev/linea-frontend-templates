<script lang="ts" setup>
import { recoverTypedDataAddress } from "viem";
import { signTypedData as wagmiSignTypedData } from "@wagmi/core";
import { defaultChain } from "~/stores/wagmi";

const domain = {
  name: "Gpt Discovery",
  version: "1",
  chainId: defaultChain.id,
  verifyingContract: "0x1Be8d7851d64BC296e9E941F414f9a6635b5D830",
} as const;

const types = {
  Person: [
    { name: "name", type: "string" },
    { name: "wallet", type: "address" },
  ],
  Module: [
    { name: "name", type: "string" },
    { name: "id", type: "string" },
  ],
  Vote: [
    { name: "from", type: "Person" },
    { name: "module", type: "Module" },
    { name: "contents", type: "string" },
  ],
} as const;

const message = {
  from: {
    name: "hiepht.eth",
    wallet: "0xDFCAd51FfE0e1786A46Dde716931B89074D8FE67",
  },
  module: {
    name: "SEObot",
    id: "655a2419ad59eee21296d941",
  },
  contents: "An excellent, useful, and fantastic application",
} as const;

const {
  result,
  execute: signTypedData,
  loading,
  error,
} = useAsync(async () => {
  const signature = await wagmiSignTypedData({
    domain,
    types,
    message,
    primaryType: "Vote",
  });
  const recoveredAddress = await recoverTypedDataAddress({
    domain,
    types,
    message,
    primaryType: "Vote",
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
    <button
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 mr-2 px-4 border border-gray-400 rounded shadow"
      type="submit"
      @click="signTypedData"
    >
      Sign Typed Data
    </button>

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
