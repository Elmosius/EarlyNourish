<script setup>
import { ref } from "vue";
import FormInput from "../ui/FormInput.vue";
import { validateForm } from "../../utils/validation.js";
import FormError from "../ui/FormError.vue";

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const errors = ref({});

const handleSubmit = () => {
  const rules = {
    email: {
      required: true,
      type: "email",
      label: "Email",
    },
    password: {
      required: true,
      label: "Password",
    },
  };

  const formData = {
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value,
  };

  const validation = validateForm(formData, rules);

  if (validation.isValid) {
    console.log("Login attempt with:", formData);
    errors.value = {};
  } else {
    errors.value = validation.errors;
  }
};
</script>

<template>
  <div class="w-full my-auto lg:w-1/2 p-4 md:p-6 lg:p-8">
    <h2 class="text-2xl font-extrabold mb-1 text-center">Masuk ke Akun</h2>
    <p class="text-gray-500 mb-6 text-center text-base">
      Silahkan masuk untuk melanjutkan
    </p>

    <form
      @submit.prevent="handleSubmit"
      :autocomplete="rememberMe ? 'on' : 'off'"
    >
      <div class="mb-4">
        <FormInput
          id="email"
          label="Email"
          type="email"
          v-model="email"
          placeholder="nama@gmail.com"
          autocomplete="email"
        />
        <FormError :message="errors.email" v-if="errors.email" />
      </div>

      <div class="mb-4">
        <div class="flex justify-between items-center">
          <label
            for="password"
            class="block text-gray-700 mb-1 text-base font-semibold"
            >Password</label
          >
          <a
            href="#"
            class="text-tertiary text-base hover:underline font-medium"
            >Lupa kata sandi?</a
          >
        </div>

        <FormInput
          id="password"
          type="password"
          v-model="password"
          placeholder="••••••••"
          autocomplete="current-password"
        />
        <FormError :message="errors.password" v-if="errors.password" />
      </div>

      <div class="mb-6">
        <label class="flex items-center">
          <input
            type="checkbox"
            v-model="rememberMe"
            class="rounded border-gray-300 text-tertiary focus:text-tertiary"
          />
          <span class="ml-2 text-gray-700 text-base">Ingat saya</span>
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
          Belum punya akun?
          <a
            href="#"
            class="text-tertiary text-base font-medium hover:underline"
            >Daftar Sekarang</a
          >
        </p>
      </div>
    </form>
  </div>
</template>
