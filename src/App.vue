<script setup lang="ts">
import { onMounted } from "vue";
import { useGlobalRefs } from "./store/useGLobalRefs";
import Auth from "./views/Auth/index.vue";
import Navbar from "./components/Navbar.vue";
import StartBilling from "./components/StartBilling.vue";
const { isLoggedIn, showCreateBilling } = useGlobalRefs();

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
      <main class="ml-64 w-[80vw]">
        <StartBilling
          v-if="showCreateBilling"
          @close="showCreateBilling = false"
        />
        <router-view />
      </main>
    </template>
  </section>
</template>
