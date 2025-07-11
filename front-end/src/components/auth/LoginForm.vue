<script setup>
import { onMounted, ref } from "vue";
import { validateForm } from "../../utils/validation.js";
import { useRouter } from "vue-router";

import FormInput from "../ui/FormInput.vue";
import FormError from "../ui/FormError.vue";
import { useAuthStore } from "../../stores/index.js";
import { storeToRefs } from "pinia";
import LoadingSpinner2 from "../ui/LoadingSpinner2.vue";
import ErrorMessage from "../ui/ErrorMessage.vue";
import {
  getRememberedCredentials,
  removeRememberedCredentials,
  storeCredentials,
} from "../../utils/auth.js";

const router = useRouter();
const authStore = useAuthStore();
const { loading, error: authError } = storeToRefs(authStore);

onMounted(() => {
  const credentials = getRememberedCredentials();
  if (credentials.email) {
    email.value = credentials.email;
    rememberMe.value = true;
  }
});

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const errors = ref({});
authStore.error = null;

const handleSubmit = async () => {
  errors.value = {};

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
  };

  const validation = validateForm(formData, rules);

  if (validation.isValid) {
    if (rememberMe.value) {
      storeCredentials(email.value);
    } else {
      removeRememberedCredentials();
    }

    await authStore.login(formData);

    if (!authStore.error) {
      await router.push("/");
    }
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

    <ErrorMessage v-if="authError" :message="authError" />

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
          <router-link
            to="/forgot-password"
            class="text-tertiary text-base hover:underline font-medium"
            >Lupa kata sandi?</router-link
          >
        </div>

        <FormInput
          id="password"
          type="password"
          v-model="password"
          placeholder="••••••••"
          autocomplete="password"
          required
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
        :disabled="loading"
        type="submit"
        class="w-full text-base bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
      >
        <LoadingSpinner2 v-if="loading" />
        <span v-else>Masuk</span>
      </button>

      <div class="mt-6 text-center">
        <p class="text-gray-600 text-base">
          Belum punya akun?
          <router-link
            to="/register"
            class="text-tertiary text-base font-medium hover:underline"
            >Daftar Sekarang</router-link
          >
        </p>
      </div>
    </form>
  </div>
</template>
