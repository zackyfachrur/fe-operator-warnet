<script setup lang="ts">
import { ref, watchEffect } from "vue";

interface Props {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  name?: string;
  icon?: string;
  type?: string;
  error?: string;
  toggleable?: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits<{ (e: "update:modelValue", v: string): void }>();

const localType = ref(props.type ?? "text");
const toggle = () => {
  if (!props.toggleable) return;
  localType.value = localType.value === "password" ? "text" : "password";
};

watchEffect(() => {
  if (!props.toggleable) localType.value = props.type ?? "text";
});
</script>

<template>
  <label :for="name" class="font-semibold">{{ label }}</label>
  <div class="flex items-center border rounded p-2 gap-2">
    <i :class="`ri-${icon}-line text-gray-500`" />

    <input
      :id="name"
      :name="name"
      :type="localType"
      :placeholder="placeholder"
      class="flex-1 outline-none"
      :value="modelValue"
      @input="
        emits('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />

    <i
      v-if="toggleable"
      @click="toggle"
      :class="localType === 'text' ? 'ri-eye-line' : 'ri-eye-off-line'"
      class="cursor-pointer text-gray-600"
    />
  </div>

  <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>
</template>
