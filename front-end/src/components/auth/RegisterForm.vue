<script setup>
import { ref } from "vue";
import FormInput from "../ui/FormInput.vue";

const nama = ref("");
const email = ref("");
const password = ref("");
const confirm_password = ref("");
const sk = ref(false);

const handleSubmit = () => {
  console.log("Login attempt with:", {
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value,
  });
};
</script>

<template>
  <div class="w-full my-auto lg:w-1/2 p-4 md:p-6 lg:p-8">
    <h2 class="text-2xl font-extrabold mb-1 text-center">Buat Akun</h2>
    <p class="text-gray-500 mb-6 text-center text-base">
      Silahkan isi data berikut untuk mendaftar
    </p>

    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <FormInput
          id="nama"
          label="Nama"
          type="nama"
          v-model="nama"
          placeholder="Masukkan nama lengkap"
        />
      </div>

      <div class="mb-4">
        <FormInput
          id="email"
          label="Email"
          type="email"
          v-model="email"
          placeholder="nama@gmail.com"
        />
      </div>

      <div class="mb-4">
        <FormInput
          id="password"
          label="Password"
          type="password"
          v-model="password"
          placeholder="••••••••"
        />
        <p class="text-gray-500 text-[0.7rem] mt-1">
          Minimal 8 karakter, kombinasi huruf besar, huruf kecil, dan angka.
        </p>
      </div>

      <div class="mb-4">
        <FormInput
          id="confirm_password"
          label="Konfirmasi Password"
          type="password"
          v-model="confirm_password"
          placeholder="••••••••"
        />
      </div>

      <div class="mb-6">
        <label class="flex items-center">
          <input
            type="checkbox"
            v-model="sk"
            class="rounded border-gray-300 text-tertiary focus:text-tertiary"
          />
          <span class="ml-2 text-gray-700 text-base">Saya menyetujui</span>
          <span class="ml-1 text-tertiary text-base"> Syarat & Kentuan </span>
        </label>
      </div>

      <button
        type="submit"
        class="w-full text-base bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
      >
        Masuk
      </button>

      <div class="mt-6 text-center">
        <p class="text-gray-600 text-base">
          Sudah punya akun?
          <a
            href="#"
            class="text-tertiary text-base font-medium hover:underline"
            >Masuk</a
          >
        </p>
      </div>
    </form>
  </div>
</template>
