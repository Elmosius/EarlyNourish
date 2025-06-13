<script setup>
import { ref } from "vue";
import { validateForm } from "../../utils/validation.js";
import FormInput from "../ui/FormInput.vue";
import FormError from "../ui/FormError.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/index.js";
import { storeToRefs } from "pinia";
import LoadingSpinner2 from "../ui/LoadingSpinner2.vue";
import ErrorMessage from "../ui/ErrorMessage.vue";

const router = useRouter();
const authStore = useAuthStore();
const { loading, error: authError } = storeToRefs(authStore);

const namaLengkap = ref("");
const email = ref("");
const password = ref("");
const confirm_password = ref("");
const sk = ref(false);
const errors = ref({});
authStore.error = null;

const handleSubmit = async () => {
  errors.value = {};
  authStore.error = null;

  const rules = {
    namaLengkap: {
      required: true,
      label: "Nama Lengkap",
      maxLength: 50,
      minLength: 5,
    },
    email: {
      required: true,
      type: "email",
      label: "Email",
    },
    password: {
      required: true,
      minLength: 8,
      pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/,
      label: "Password",
    },
    confirm_password: {
      required: true,
      matchesField: "password",
      label: "Konfirmasi Password",
    },
    sk: {
      required: true,
      label: "Syarat & Ketentuan",
    },
  };

  const formData = {
    namaLengkap: namaLengkap.value,
    email: email.value,
    password: password.value,
    confirm_password: confirm_password.value,
    sk: sk.value,
  };

  const validation = validateForm(formData, rules);

  if (validation.isValid) {
    await authStore.register({
      namaLengkap: namaLengkap.value,
      email: email.value,
      password: password.value,
    });

    if (!authError.value) {
      await router.push("/login");
    }
  } else {
    errors.value = validation.errors;
  }
};
</script>

<template>
  <div class="w-full my-auto lg:w-1/2 p-4 md:p-6 lg:p-8">
    <h2 class="text-2xl font-extrabold mb-1 text-center">Buat Akun</h2>
    <p class="text-gray-500 mb-6 text-center text-base">
      Silahkan isi data berikut untuk mendaftar
    </p>

    <ErrorMessage v-if="authError" :message="authError" />

    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <FormInput
          id="namaLengkap"
          label="Nama Lengkap"
          type="text"
          v-model="namaLengkap"
          required
          placeholder="Masukkan nama lengkap"
        />
        <FormError :message="errors.namaLengkap" v-if="errors.namaLengkap" />
      </div>

      <div class="mb-4">
        <FormInput
          id="email"
          label="Email"
          type="email"
          v-model="email"
          required
          placeholder="nama@gmail.com"
        />
        <FormError :message="errors.email" v-if="errors.email" />
      </div>

      <div class="mb-4">
        <FormInput
          id="password"
          label="Password"
          type="password"
          v-model="password"
          required
          placeholder="••••••••"
        />
        <p class="text-gray-500 text-[0.7rem] mt-1">
          Minimal 8 karakter, kombinasi huruf besar, huruf kecil, dan angka.
        </p>

        <FormError :message="errors.password" v-if="errors.password" />
      </div>

      <div class="mb-4">
        <FormInput
          id="confirm_password"
          label="Konfirmasi Password"
          type="password"
          v-model="confirm_password"
          required
          placeholder="••••••••"
        />

        <FormError
          :message="errors.confirm_password"
          v-if="errors.confirm_password"
        />
      </div>

      <div class="mb-6">
        <label class="flex items-center">
          <input
            type="checkbox"
            v-model="sk"
            class="rounded border-gray-300 text-tertiary focus:text-tertiary"
            required
          />
          <span class="ml-2 text-gray-700 text-base">Saya menyetujui</span>
          <router-link
            to="sk"
            class="ml-1 text-tertiary text-base cursor-pointer"
          >
            Syarat & Ketentuan
          </router-link>
        </label>

        <FormError :message="errors.sk" v-if="errors.sk" />
      </div>

      <button
        :disabled="loading"
        type="submit"
        class="w-full text-base bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
      >
        <LoadingSpinner2 v-if="loading" />
        <span v-else>Daftar</span>
      </button>

      <div class="mt-6 text-center">
        <p class="text-gray-600 text-base">
          Sudah punya akun?
          <router-link
            to="/login"
            class="text-tertiary text-base font-medium hover:underline"
            >Masuk</router-link
          >
        </p>
      </div>
    </form>
  </div>
</template>
