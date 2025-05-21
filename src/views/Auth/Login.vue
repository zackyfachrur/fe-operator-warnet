<script setup lang="ts">
import { useLoginForm } from "../../script/LoginForm.logic";
import BaseInput from "../../components/BaseInput.vue";

const { username, password, confirmPassword, errors, submitForm } =
  useLoginForm();
</script>

<template>
  <section class="flex justify-center items-center h-[100vh] w-[50%]">
    <div class="bg-white p-6 w-[50%] shadow-md rounded-2xl">
      <img
        src="../../assets/App-Logo.png"
        alt="App Icon Images"
        class="mx-auto mb-4"
      />
      <h2 class="font-bold text-gray-600 text-center mb-1 text-4xl">
        Operator Login
      </h2>
      <p class="text-gray-400 text-center mb-6">
        Login sebagai operator untuk melihat billing
      </p>
      <form @submit.prevent="submitForm" class="flex flex-col gap-4">
        <BaseInput
          v-model="username"
          name="username"
          label="Username"
          placeholder="Input username anda"
          icon="user"
          :error="errors.username"
        />

        <BaseInput
          v-model="password"
          name="password"
          label="Password"
          placeholder="Input password anda"
          icon="lock"
          type="password"
          :error="errors.password"
          toggleable
        />

        <BaseInput
          v-model="confirmPassword"
          name="confirmPassword"
          label="Konfirmasi Password"
          placeholder="Input konfirmasi password anda"
          icon="lock"
          type="password"
          :error="errors.confirmPassword"
          toggleable
        />
        <p v-if="errors.general" style="color: red">{{ errors.general }}</p>
        <button
          type="submit"
          class="bg-[var(--purple-color)] text-white font-semibold py-2 rounded cursor-pointer hover:bg-black transition"
        >
          Login Operator
        </button>
      </form>
    </div>
  </section>
</template>
