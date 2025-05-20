<script setup lang="ts">
import { inject } from "vue";
const showSidebar = inject("showSidebar");

interface Props {
  text: string;
}

const props = defineProps<Props>();
</script>

<template>
  <button
    class="hover:opacity-80 active:scale-95 text-gray-800 py-2 rounded-2xl flex gap-1 px-8 cursor-pointer transition duration-500"
    :class="
      showSidebar
        ? 'translate-x-0 duration-500'
        : '-translate-x-[170px] duration-800'
    "
  >
    <i class="ri-settings-3-line"></i> {{ props.text }}
  </button>
</template>
