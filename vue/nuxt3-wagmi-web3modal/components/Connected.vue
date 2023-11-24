<script lang="ts" setup>
const { account } = storeToRefs(useWagmi());
</script>

<template>
  <div>
    <slot v-if="account.isConnected" />
  </div>
</template>

<style scoped></style>
