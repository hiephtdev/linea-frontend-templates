<script lang="ts" setup>
import { useWagmi } from "@/stores/wagmi";
useWagmi();
</script>

<template>
  <div>
    <h1 class="text-3xl font-extrabold py-4">Linea - Web3Modal - Nuxt 3</h1>

    <w3m-button />

    <Connected>
      <hr />
      <h2>Network</h2>
      <NetworkSwitcher />
      <br />
      <hr />
      <h2>Account</h2>
      <Account />
      <br />
      <hr />
      <h2>Balance</h2>
      <Balance />
      <br />
      <FindBalance />
      <br />
      <hr />
      <h2>Block Number</h2>
      <BlockNumber />
      <br />
      <hr />
      <h2>Read Contract</h2>
      <ReadTokenBalance />
      <br />
      <ReadTokenSupply />
      <br />
      <hr />
      <h2>Read Contracts</h2>
      <ReadContracts />
      <br />
      <hr />
      <h2>Send Transaction</h2>
      <SendTransaction />
      <br />
      <hr />
      <h2>Send Transaction (Prepared)</h2>
      <SendTransactionPrepared />
      <br />
      <hr />
      <h2>Sign Message</h2>
      <SignMessage />
      <br />
      <hr />
      <h2>Sign Typed Data</h2>
      <SignTypedData />
      <br />
      <hr />
      <h2>Token</h2>
      <Token />
      <br />
      <hr />
      <h2>Watch Contract Events</h2>
      <WatchContractEvents />
      <br />
      <hr />
      <h2>Watch Pending Transactions</h2>
      <WatchPendingTransactions />
      <br />
      <hr />
      <h2>Write Contract</h2>
      <WriteContract />
      <br />
      <hr />
      <h2>Write Contract (Prepared)</h2>
      <WriteContractPrepared />
    </Connected>
  </div>
</template>

<style scoped></style>
