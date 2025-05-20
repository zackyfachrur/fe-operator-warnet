<script setup lang="ts">
import ThumbnailImg from "../../assets/Thumbnail-PC.jpg";
</script>

<template>
  <section class="bg-white rounded-2xl px-8 py-8">
    <div
      class="flex justify-between text-gray-400 text-2xl font-semibold items-center gap-2"
    >
      <h2 class="w-[11%]">Billing Aktif</h2>
      <hr
        class="text-transparent bg-gray-300 mt-2 h-[1px] rounded-full w-full"
      />
      <i class="ri-mouse-line"></i>
    </div>
    <div class="grid grid-cols-4 mt-4">
      <!-- Card -->
      <div
        class="bg-gradient-to-r from-[var(--purple-color)] to-[var(--purple-light-color)] flex flex-col rounded-2xl px-4 py-4 gap-2"
      >
        <img
          :src="ThumbnailImg"
          alt="Thumbnail Images"
          class="h-[200px] object-cover rounded-2xl"
        />
        <div class="flex flex-col gap-2">
          <div class="flex justify-between">
            <h2 class="text-white text-2xl font-bold">PC-001</h2>
            <p class="text-2xl text-white font-medium">Jajang</p>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex justify-between text-md">
              <span class="text-white font-semibold">Sisa Waktu</span>
              <span class="text-white font-semibold">02:45:12</span>
            </div>
            <button
              class="w-full bg-white hover:opacity-80 active:scale-95 transition duration-100 px-8 py-2 rounded-2xl font-semibold text-[var(--purple-color)] cursor-pointer"
            >
              Lihat Detail
            </button>
          </div>
        </div>
      </div>
      <!-- End Card -->
    </div>
  </section>
</template>
