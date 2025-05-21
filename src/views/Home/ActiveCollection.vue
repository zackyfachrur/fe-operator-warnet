<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";

interface BillingActive {
  id: number;
  computer_id: number;
  computer_name: string;
  username: string;
  start_time: string;
  computer_status: string;
  billing_status: string;
  duration_minutes: number;
}

interface BillingWithRemaining extends BillingActive {
  remaining_time: string;
}

const activeBillings = ref<BillingWithRemaining[]>([]);

function calculateRemainingTime(
  start_time: string,
  maxDurationMinutes: number
): string {
  const now = new Date();
  const start = new Date(start_time);
  const elapsedMinutes = (now.getTime() - start.getTime()) / 60000;
  const remainingMinutes = Math.max(0, maxDurationMinutes - elapsedMinutes);

  if (remainingMinutes <= 0) return "00:00:00";

  const remainingHours = Math.floor(remainingMinutes / 60);
  const remainingMins = Math.floor(remainingMinutes % 60);
  const remainingSecs = Math.floor((remainingMinutes % 1) * 60);

  return (
    String(remainingHours).padStart(2, "0") +
    ":" +
    String(remainingMins).padStart(2, "0") +
    ":" +
    String(remainingSecs).padStart(2, "0")
  );
}

async function fetchActiveBillings() {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/billings/active"
    );
    activeBillings.value = data.map((b: BillingActive) => ({
      ...b,
      remaining_time: calculateRemainingTime(
        b.start_time,
        b.duration_minutes ?? 0
      ),
    }));
  } catch (error) {
    alert("Gagal mengambil data billing aktif");
  }
}

let intervalId: number;

onMounted(() => {
  fetchActiveBillings();

  intervalId = window.setInterval(() => {
    activeBillings.value = activeBillings.value.map((billing) => ({
      ...billing,
      remaining_time: calculateRemainingTime(
        billing.start_time,
        billing.duration_minutes ?? 0
      ),
    }));
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

function showBillingDetail(billing: BillingWithRemaining) {
  alert(
    `Billing ID: ${billing.id}\n` +
      `Komputer: ${billing.computer_name}\n` +
      `User: ${billing.username}\n` +
      `Start Time: ${billing.start_time}\n` +
      `Sisa Waktu: ${billing.remaining_time}`
  );
}
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

    <div class="grid grid-cols-4 gap-4 mt-4">
      <div
        v-for="comp in activeBillings"
        :key="comp.id"
        class="bg-gradient-to-r from-[var(--purple-color)] to-[var(--purple-light-color)] flex flex-col rounded-2xl px-4 py-4 gap-4"
      >
        <img
          src="../../assets/Thumbnail-PC.jpg"
          alt="Thumbnail Images"
          class="h-[200px] object-cover rounded-2xl"
        />
        <div class="flex justify-between items-center">
          <h2 class="text-white text-2xl font-bold">
            {{ comp.computer_name }}
          </h2>
          <p class="text-white font-medium">{{ comp.username }}</p>
        </div>
        <div class="flex justify-between text-white font-semibold">
          <span>Sisa Waktu</span>
          <span>{{ comp.remaining_time }}</span>
        </div>
        <button
          class="w-full bg-white text-[var(--purple-color)] py-2 rounded-2xl font-semibold hover:opacity-80 transition duration-100 active:scale-95"
          @click="showBillingDetail(comp)"
        >
          Lihat Detail
        </button>
      </div>
    </div>
  </section>
</template>
