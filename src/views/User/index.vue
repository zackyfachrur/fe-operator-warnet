<script setup lang="ts">
import ListComputer from "./ListComputer.vue";
import ActiveCollection from "../Home/ActiveCollection.vue";
</script>

<template>
  <section class="w-full ml-12 mr-8 mt-12 flex flex-col gap-8">
    <ListComputer />
    <ActiveCollection />
  </section>
</template>
