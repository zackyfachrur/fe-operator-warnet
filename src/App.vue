<script setup lang="ts">
import { onMounted } from "vue";
import { useGlobalRefs } from "./store/useGLobalRefs";
import Auth from "./views/Auth/index.vue";
import Navbar from "./components/Navbar.vue";

const { isLoggedIn } = useGlobalRefs();

onMounted(() => {
  const savedLogin = localStorage.getItem("isLoggedIn");
  isLoggedIn.value = savedLogin === "true";
});
</script>

<template>
  <section class="flex">
    <Auth v-if="!isLoggedIn" />
    <template v-else>
      <Navbar />
      <router-view />
    </template>
  </section>
</template>
