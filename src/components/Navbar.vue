<script setup lang="ts">
import { useGlobalRefs } from "../store/useGLobalRefs";
import { useRouter } from "vue-router";
const { showSidebar, showCreateBilling } = useGlobalRefs();
const globalRefs = useGlobalRefs();
const router = useRouter();
const logOut = () => {
  globalRefs.isLoggedIn.value = false;
  localStorage.setItem("isLoggedIn", "false");
  localStorage.removeItem("username");
  router.push("/");
};
</script>

<template>
  <button
    v-if="globalRefs.isLoggedIn"
    @click="showSidebar = !showSidebar"
    class="fixed top-4 left-4 z-50 cursor-pointer text-[var(--purple-color)] text-2xl bg-white rounded-xl px-6 py-2 transition"
  >
    <Motion
      :key="showSidebar"
      :initial="{ opacity: 0, scale: 0.5 }"
      :enter="{ opacity: 1, scale: 1 }"
      :leave="{ opacity: 0, scale: 0.5 }"
      class="inline-block"
    >
      <i :class="showSidebar ? 'ri-close-line' : 'ri-side-bar-fill'"></i>
    </Motion>
  </button>

  <Motion
    v-if="globalRefs.isLoggedIn"
    :visible="true"
    :initial="{ opacity: 1 }"
    :enter="{ opacity: 1 }"
    :leave="{ opacity: 1 }"
    class="fixed top-0 left-0 h-[100vh] w-[250px] z-30"
  >
    <nav
      class="flex flex-col justify-between pb-8 top-0 left-0 h-[100vh] w-[250px] bg-white text-[var(--purple-color)] font-semibold pt-20 transition-transform duration-300 ease-in-out px-6 drop-shadow-xl"
      :class="showSidebar ? 'translate-x-0' : '-translate-x-[140px]'"
    >
      <div class="flex flex-col">
        <router-link
          to="/"
          class="px-4 py-2 rounded-2xl transition duration-200 active:scale-95"
          :class="showSidebar ? 'translate-x-0' : '-translate-x-[170px]'"
          ><i class="ri-dashboard-3-line"></i> Dashboard</router-link
        >
        <router-link
          to="/user"
          class="px-4 py-2 rounded-2xl transition duration-200 active:scale-95"
          :class="showSidebar ? 'translate-x-0' : '-translate-x-[170px]'"
          ><i class="ri-computer-line"></i> Komputer Aktif</router-link
        >
      </div>
      <div class="w-full flex flex-col gap-1">
        <button
          class="bg-gradient-to-r from-gray-950 to-gray-800 hover:opacity-80 active:scale-95 text-white py-2 rounded-2xl flex justify-between px-8 cursor-pointer transition hover:duration-10"
          @click="showCreateBilling = true"
          :class="
            showSidebar
              ? 'translate-x-0 duration-500'
              : '-translate-x-[170px] duration-800'
          "
        >
          Buat Billing <i class="ri-add-line"></i>
        </button>
        <button
          class="hover:opacity-80 active:scale-95 text-gray-800 py-2 rounded-2xl flex gap-1 px-8 cursor-pointer transition hover:duration-10"
          :class="
            showSidebar
              ? 'translate-x-0 duration-500'
              : '-translate-x-[170px] duration-800'
          "
        >
          <i class="ri-settings-3-line"></i> Settings
        </button>
        <button
          @click="logOut"
          class="hover:opacity-80 active:scale-95 text-gray-800 py-2 rounded-2xl flex gap-1 px-8 cursor-pointer transition hover:duration-10"
          :class="
            showSidebar
              ? 'translate-x-0 duration-500'
              : '-translate-x-[170px] duration-800'
          "
        >
          <i class="ri-logout-circle-line"></i> Keluar
        </button>
      </div>
    </nav>
  </Motion>
</template>
