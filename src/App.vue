<script setup lang="ts">
import { ref } from "vue";

const display = ref(false);
</script>

<template>
  <section class="flex">
    <button @click="display = !display" class="fixed top-0 z-50 cursor-pointer text-[var(--green-color)] text-2xl bg-white rounded-sm px-2 py-2">
      <i :class="display ? 'ri-menu-line' : 'ri-close-line'"></i>
    </button>

    <Motion
      :visible="display"
      :initial="{ opacity: 0, x: -10}"
      :enter="{ opacity: 1, x: 0}"
      :leave="{ opacity: 0, x: 0}"
    >
      <nav
        class="fixed flex flex-col h-[100vh] bg-[var(--green-color)] w-[200px] text-white font-semibold pt-12"
      >
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </Motion>

    <router-view />
  </section>
</template>
