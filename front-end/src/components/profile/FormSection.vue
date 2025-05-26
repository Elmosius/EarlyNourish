<script setup>
import { ref } from "vue";
import { InfoIcon, UserIcon } from "lucide-vue-next";
import FormInput from "../ui/FormInput.vue";

const profilePhoto = ref(null);
const fullName = ref("");
const role = ref("");
const email = ref("");
const address = ref("");
const childName = ref("");
const birthDate = ref("");
const birthWeight = ref("");
const birthHeight = ref("");
const headCircumference = ref("");

const roles = [
  { value: "parent", label: "Orang Tua" },
  { value: "guardian", label: "Wali" },
  { value: "caregiver", label: "Pengasuh" },
];

const handlePhotoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    profilePhoto.value = file;
  }
};

const handleSubmit = () => {
  const formData = {
    profilePhoto: profilePhoto.value,
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

  console.log("Complete form submitted with data:", formData);
};
</script>

<template>
  <section class="bg-quaternary px-8 py-12 md:px-14 lg:px-60">
    <div
      class="container mx-auto max-w-5xl bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <h1 class="text-[1rem] font-montserrat font-semibold text-gray-800 mb-6">
        Informasi Pribadi
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Profile Photo Section -->
        <div class="flex flex-col items-center">
          <div class="relative mb-4">
            <div
              class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
            >
              <UserIcon class="h-12 w-12 text-tertiary" />
            </div>
          </div>

          <label
            for="photoUpload"
            class="border border-gray-500 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition duration-300 cursor-pointer"
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
            <FormInput
              id="fullName"
              label="Nama Lengkap"
              v-model="fullName"
              placeholder="Masukkan nama Anda"
            />

            <div>
              <label
                for="role"
                class="block text-gray-700 mb-1 text-base font-semibold"
                >Peran</label
              >
              <select
                id="role"
                v-model="role"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-tertiary text-base"
                required
              >
                <option value="" disabled>Pilih</option>
                <option
                  v-for="roleOption in roles"
                  :key="roleOption.value"
                  :value="roleOption.value"
                >
                  {{ roleOption.label }}
                </option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              id="email"
              label="Email"
              type="email"
              v-model="email"
              placeholder="Masukkan email Anda"
            />

            <div>
              <label
                for="address"
                class="block text-gray-700 mb-1 text-base font-semibold"
                >Alamat</label
              >
              <textarea
                id="address"
                v-model="address"
                placeholder="Masukkan Alamat Anda"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-tertiary text-base resize-none"
                required
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Detail Informasi Anak Section -->
        <div>
          <h2 class="text-[1rem] font-semibold text-gray-800 mb-4">
            Detail Informasi Anak
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormInput
              id="childName"
              label="Nama Anak"
              v-model="childName"
              placeholder="Masukkan nama anak Anda"
            />

            <div>
              <label
                for="birthWeight"
                class="block text-gray-700 mb-1 text-base font-semibold"
                >Berat Lahir (kg)</label
              >
              <input
                id="birthWeight"
                type="number"
                step="0.1"
                v-model="birthWeight"
                placeholder="Contoh : 3.2"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-tertiary text-base"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                for="birthDate"
                class="block text-gray-700 mb-1 text-base font-semibold"
                >Tanggal Lahir</label
              >
              <input
                id="birthDate"
                type="date"
                v-model="birthDate"
                placeholder="dd/mm/yyyy"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-tertiary text-base"
                required
              />
            </div>

            <div>
              <label
                for="birthHeight"
                class="block text-gray-700 mb-1 text-base font-semibold"
                >Tinggi Lahir (cm)</label
              >
              <input
                id="birthHeight"
                type="number"
                v-model="birthHeight"
                placeholder="Contoh : 50"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-tertiary text-base"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="headCircumference"
                class="block text-gray-700 mb-1 text-base font-semibold"
                >Lingkar Kepala ketika Lahir (cm)</label
              >
              <input
                id="headCircumference"
                type="number"
                v-model="headCircumference"
                placeholder="Contoh : 34"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-tertiary text-base"
                required
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
