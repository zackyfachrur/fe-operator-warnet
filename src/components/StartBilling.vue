<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useGlobalRefs } from "../store/useGLobalRefs";
const { showCreateBilling } = useGlobalRefs();

const username = ref("");
const computerId = ref<number | null>(null);

const now = new Date();
const pad = (n: number) => n.toString().padStart(2, "0");
const localDateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
  now.getDate()
)}T${pad(now.getHours())}:${pad(now.getMinutes())}`;

const startTime = ref(localDateTime);
const durationMinutes = ref(null);

const emit = defineEmits(["close"]);

async function endBilling(billing_id: number) {
  try {
    const end_time = new Date().toISOString().slice(0, 19).replace("T", " ");
    const price_per_minute = 1000;

    const res = await axios.post("http://localhost:3000/api/billings/end", {
      billing_id,
      end_time,
      price_per_minute,
    });
    alert(
      `Billing selesai! Durasi: ${res.data.duration} menit, Total: Rp${res.data.total}`
    );
  } catch (err: any) {
    alert(err.response?.data?.message || "Gagal mengakhiri billing otomatis");
  }
}

function scheduleAutoEndBilling(billing: {
  id: number;
  start_time: string;
  duration_minutes: number;
}) {
  const start = new Date(billing.start_time);
  const durationMs = billing.duration_minutes * 60 * 1000;
  const endTime = new Date(start.getTime() + durationMs);
  const now = new Date();

  const delay = endTime.getTime() - now.getTime();
  if (delay > 0) {
    setTimeout(() => {
      endBilling(billing.id);
    }, delay);
  } else {
    endBilling(billing.id);
  }
}

const startBilling = async () => {
  try {
    const formattedStartTime = startTime.value.replace("T", " ") + ":00";
    const res = await axios.post("http://localhost:3000/api/billings/start", {
      username: username.value,
      computer_id: computerId.value,
      start_time: formattedStartTime,
      duration_minutes: durationMinutes.value,
    });

    alert("Billing dimulai!");
    const newBilling = res.data.billing;
    scheduleAutoEndBilling(newBilling);
    emit("close");
  } catch (err: any) {
    alert(err.response?.data?.message || "Gagal memulai billing");
  }
};
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-xl max-w-md w-full flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold">Buat Billing</h2>
        <button
          class="text-2xl cursor-pointer"
          @click="showCreateBilling = false"
        >
          <i class="ri-close-line"></i>
        </button>
      </div>
      <form @submit.prevent="startBilling" class="space-y-4">
        <label class="font-semibold">User PC</label>
        <div class="flex items-center justify-between border rounded p-2 gap-2">
          <i class="ri-user-line text-gray-500" />

          <input
            v-model="username"
            class="w-full outline-none"
            type="string"
            required
            placeholder="Input User PC (contoh: PC1)"
          />
        </div>
        <label class="font-semibold">ID PC</label>
        <div class="flex items-center justify-between border rounded p-2 gap-2">
          <i class="ri-computer-line text-gray-500" />

          <input
            v-model.number="computerId"
            class="w-full outline-none"
            type="number"
            required
            placeholder="Input ID PC (contoh: 1)"
          />
        </div>
        <label class="font-semibold">Waktu Mulai</label>
        <div class="flex items-center justify-between border rounded p-2 gap-2">
          <i class="ri-time-line text-gray-500" />

          <input
            v-model="startTime"
            class="w-full outline-none"
            type="datetime-local"
            placeholder="Inputkan durasi (contoh: 5)"
            required
          />
        </div>
        <label class="font-semibold">Durasi</label>
        <div class="flex items-center justify-between border rounded p-2 gap-2">
          <i class="ri-timer-line text-gray-500" />

          <input
            v-model="durationMinutes"
            class="w-full outline-none"
            type="number"
            placeholder="Inputkan durasi (contoh: 5)"
            required
          />
          <p class="text-gray-400 font-semibold">menit</p>
        </div>

        <button
          type="submit"
          class="button-billing w-full py-2 font-bold rounded-2xl cursor-pointer hover:opacity-80 active:scale-95"
        >
          Mulai Billing
        </button>
      </form>
    </div>
  </div>
</template>
