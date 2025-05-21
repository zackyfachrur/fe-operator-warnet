<script setup lang="ts">
import CountWarnet from "./CountWarnet.vue";
import ActiveCollection from "./ActiveCollection.vue";
import ComputerMap from "../../components/ComputerMap.vue";
</script>

<template>
  <main class="w-full ml-12 mr-8 mt-12 flex flex-col gap-8">
    <CountWarnet />
    <ComputerMap />
    <ActiveCollection />
  </main>
</template>
