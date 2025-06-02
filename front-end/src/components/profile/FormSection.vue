<script setup>
import { ref } from "vue";
import { InfoIcon, UserIcon } from "lucide-vue-next";
import { validateForm } from "../../utils/validation.js";

import FormInput from "../ui/FormInput.vue";
import FormTextArea from "../ui/FormTextArea.vue";
import FormError from "../ui/FormError.vue";

const profilePhotoUrl = ref(null);
const profilePhotoFile = ref(null);

const fullName = ref("");
const role = ref("");
const email = ref("");
const address = ref("");
const childName = ref("");
const birthDate = ref("");
const birthWeight = ref("");
const birthHeight = ref("");
const headCircumference = ref("");

const errors = ref({});

const handlePhotoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    profilePhotoFile.value = file;
    profilePhotoUrl.value = URL.createObjectURL(file);
  }
};

const handleSubmit = () => {
  const rules = {
    fullName: {
      label: "Nama Lengkap",
      minLength: 5,
      maxLength: 100,
    },
    email: { type: "email", label: "Email" },
    address: { label: "Alamat", minLength: 10 },
    childName: { label: "Nama Anak", minLength: 5 },
    birthDate: { label: "Tanggal Lahir" },
    birthWeight: {
      type: "number",
      label: "Berat Lahir",
      min: 0.1,
      max: 10,
    },
    birthHeight: {
      type: "number",
      label: "Tinggi Lahir",
      min: 20,
      max: 100,
    },
    headCircumference: {
      type: "number",
      label: "Lingkar Kepala",
      min: 10,
      max: 60,
    },
  };

  const formData = {
    profilePhoto: profilePhotoFile.value,
    fullName: fullName.value,
    role: role.value,
    email: email.value,
    address: address.value,
    childName: childName.value,
    birthDate: birthDate.value,
    birthWeight: birthWeight.value,
    birthHeight: birthHeight.value,
    headCircumference: headCircumference.value,
  };

  const validation = validateForm(formData, rules);

  if (validation.isValid) {
    console.log("Complete form submitted with data:", formData);
    errors.value = {};
  } else {
    errors.value = validation.errors;
  }
};
</script>

<template>
  <section class="bg-quaternary px-8 py-12 md:px-14 lg:px-60">
    <div
      class="container mx-auto max-w-5xl bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <h1 class="font-montserrat font-bold text-gray-800 mb-6">
        Informasi Pribadi
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-8">
        <div class="flex flex-col items-center">
          <div class="relative mb-4">
            <div
              class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden"
            >
              <img
                v-if="profilePhotoUrl"
                :src="profilePhotoUrl"
                alt="Profile Photo"
                class="w-full h-full object-cover"
              />
              <UserIcon v-else class="h-12 w-12 text-tertiary" />
            </div>
          </div>

          <label
            for="photoUpload"
            class="border border-gray-500 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-quaternary transition duration-300 cursor-pointer"
          >
            Edit Foto
          </label>
          <input
            id="photoUpload"
            type="file"
            accept="image/*"
            @change="handlePhotoUpload"
            class="hidden"
          />

          <p class="text-gray-600 text-base mt-3 text-center max-w-xs">
            Kami sarankan Anda mengunggah foto dengan rasio 1:1. Pastikan ukuran
            file kurang dari 1 MB.
          </p>
        </div>

        <!-- Detail Akun Section -->
        <div>
          <h2 class="text-[1rem] font-semibold text-gray-800 mb-4">
            Detail Akun
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <FormInput
                id="fullName"
                label="Nama Lengkap"
                v-model="fullName"
                placeholder="Masukkan nama Anda"
                autofocus
              />
              <FormError :message="errors.fullName" v-if="errors.fullName" />
            </div>

            <div>
              <FormInput
                id="email"
                label="Email"
                type="email"
                v-model="email"
                placeholder="Masukkan email Anda"
                autofocus
              />
              <FormError :message="errors.email" v-if="errors.email" />
            </div>

            <div>
              <FormTextArea
                id="address"
                v-model="address"
                placeholder="Masukkan Alamat Anda"
                rows="3"
                label="Alamat"
                autofocus
              />
              <FormError :message="errors.address" v-if="errors.address" />
            </div>
          </div>
        </div>

        <!-- Detail Informasi Anak Section -->
        <div>
          <h2 class="text-[1rem] font-semibold text-gray-800 mb-4">
            Detail Informasi Anak
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <FormInput
                id="childName"
                label="Nama Anak"
                v-model="childName"
                placeholder="Masukkan nama anak Anda"
              />
              <FormError :message="errors.childName" v-if="errors.childName" />
            </div>

            <div>
              <FormInput
                id="birthWeight"
                type="number"
                v-model="birthWeight"
                placeholder="Contoh : 3.2"
                step="0.1"
                label="Berat Lahir (kg)"
              />
              <FormError
                :message="errors.birthWeight"
                v-if="errors.birthWeight"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormInput
              id="birthDate"
              label="Tanggal Lahir"
              type="date"
              v-model="birthDate"
            />

            <div>
              <FormInput
                id="birthHeight"
                type="number"
                v-model="birthHeight"
                placeholder="Contoh : 50"
                label="Tinggi Lahir (cm)"
              />
              <FormError
                :message="errors.birthHeight"
                v-if="errors.birthHeight"
              />
            </div>

            <div>
              <FormInput
                id="headCircumference"
                type="number"
                v-model="headCircumference"
                placeholder="Contoh : 34"
                label="Lingkar Kepala ketika Lahir (cm)"
              />
              <FormError
                :message="errors.headCircumference"
                v-if="errors.headCircumference"
              />
            </div>
          </div>
        </div>

        <!-- Information Security Notice -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-start">
            <InfoIcon class="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 class="font-semibold text-blue-800 mb-1 text-[1rem]">
                Informasi Keamanan
              </h3>
              <p class="text-blue-700 text-base text-justify">
                Data Anda akan digunakan untuk memberikan rekomendasi nutrisi
                yang dipersonalisasi dan memantau pertumbuhan anak Anda. Kami
                sangat menjaga privasi Anda dan tidak akan pernah membagikan
                informasi Anda kepada pihak ketiga tanpa izin Anda.
              </p>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center">
          <button
            type="submit"
            class="bg-linear-65 from-[#4ADE80] to-[#22C55E] shadow-xl inset-shadow-xs inset-shadow-gray-500 hover:opacity-85 text-white font-medium py-2 px-6 rounded-full transition duration-300"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
