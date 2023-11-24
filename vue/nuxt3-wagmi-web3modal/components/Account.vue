<script lang="ts" setup>
const { account } = storeToRefs(useWagmi());
</script>

<template>
  <div>
    {{ account.address }}
  </div>
</template>

<style scoped></style>