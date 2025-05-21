<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

interface Computer {
  id: number;
  name: string;
  status: "aktif" | "dipakai" | "maintenance";
  created_at: string;
}

const computers = ref<Computer[]>([]);
const error = ref<string | null>(null);

const fetchComputers = async () => {
  try {
    const response = await axios.get<Computer[]>(
      "http://localhost:3000/api/computers"
    );
    computers.value = response.data;
  } catch (err: any) {
    error.value = err.message || "Gagal mengambil data komputer";
  }
};

onMounted(() => {
  fetchComputers();
});
</script>

<template>
  <section class="bg-transparent rounded-2xl py-8">
    <div
      class="flex justify-between bg-white px-6 py-4 rounded-2xl text-[var(--purple-color)] text-2xl font-semibold items-center gap-2"
    >
      <h2 class="w-[20%]">Daftar Komputer</h2>
      <hr
        class="text-transparent bg-gray-300 mt-2 h-[1px] rounded-full w-full"
      />
      <i class="ri-mouse-line"></i>
    </div>
    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>
    <div class="grid grid-cols-6 gap-4 mt-4">
      <div
        v-for="computer in computers"
        :key="computer.id"
        class="flex items-center gap-3 py-2 px-4 rounded-2xl bg-white drop-shadow-xl text-gray-600 font-bold"
      >
        <i
          class="ri-computer-line"
          :class="{
            'text-green-500': computer.status === 'aktif',
            'text-yellow-400': computer.status === 'dipakai',
            'text-red-500': computer.status === 'maintenance',
          }"
        ></i>
        <span>{{ computer.name }}</span>
        <span
          class="w-4 h-4 rounded-full"
          :class="{
            'bg-green-500': computer.status === 'aktif',
            'bg-yellow-400': computer.status === 'dipakai',
            'bg-red-500': computer.status === 'maintenance',
          }"
          title="Status"
        ></span>
      </div>
    </div>
  </section>
</template>
