<script lang="ts" setup>
import type { Log } from "viem";
import { watchContractEvent } from "@wagmi/core";

const events = ref<Log[]>([]);

watchContractEvent(
  {
    ...usdcContractConfig,
    eventName: "Approval",
  },
  (logs) => {
    events.value.push(...logs);
  }
);
</script>

<template>
  <div>
    <details>
      <summary>{{ events.length }} USDC `Approval`s logged</summary>

      {{
        events
          .reverse()
          .map((log) => stringify(log))
          .join("\n\n\n\n")
      }}
    </details>
  </div>
</template>

<style scoped></style>
