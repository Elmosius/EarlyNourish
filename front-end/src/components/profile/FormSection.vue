<script setup>
import { onMounted, ref, watch } from "vue";
import { InfoIcon, UserIcon } from "lucide-vue-next";
import { validateForm } from "../../utils/validation.js";

import { useProfileStore } from "../../stores/profile.js";
import { useAuthStore } from "../../stores/index.js";
import { storeToRefs } from "pinia";

import FormInput from "../ui/FormInput.vue";
import FormTextArea from "../ui/FormTextArea.vue";
import FormError from "../ui/FormError.vue";
import LoadingSpinner from "../ui/LoadingSpinner.vue";
import ErrorMessage from "../ui/ErrorMessage.vue";
import LoadingSpinner2 from "../ui/LoadingSpinner2.vue";
import FormSelect from "../ui/FormSelect.vue";

const profileStore = useProfileStore();
const authStore = useAuthStore();

const {
  profile,
  loading: profileLoading,
  error: profileError,
} = storeToRefs(profileStore);
const { user: authUser } = storeToRefs(authStore);

const fotoProfil = ref(profile.value?.fotoProfil || null);
const fotoProfilFile = ref(null);

const fullName = ref("");
const email = ref("");
const alamat = ref("");
const namaAnak = ref("");
const jenisKelamin = ref("");
const tanggalLahir = ref("");
const bbLahir = ref("");
const tbLahir = ref("");

const errors = ref({});

const handlePhotoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    fotoProfilFile.value = file;
    fotoProfil.value = URL.createObjectURL(file);
  }
};

const populateForm = (profileData) => {
  if (profileData) {
    fullName.value = profileData.fullName || "";
    email.value = profileData.email || "";
    alamat.value = profileData.alamat || "";
    namaAnak.value = profileData.namaAnak || "";
    jenisKelamin.value = profileData.jenisKelamin || "";
    tanggalLahir.value = profileData.tanggalLahir || "";
    bbLahir.value = profileData.bbLahir || "";
    tbLahir.value = profileData.tbLahir || "";
  }
};

onMounted(async () => {
  if (authUser.value && authUser.value.userId) {
    await profileStore.fetchProfile(authUser.value.userId);
    populateForm(profile.value);
  }
});

watch(profile, (newProfileData) => {
  populateForm(newProfileData);
});

watch(authUser, async (newUser) => {
  if (newUser && newUser.userId && !profile.value) {
    await profileStore.fetchProfile(newUser.userId);
  }
});

const handleSubmit = async () => {
  errors.value = {};
  profileStore.error = null;

  const rules = {
    namaLengkap: {
      label: "Nama Lengkap",
      minLength: 5,
      maxLength: 100,
    },
    email: { type: "email", label: "Email" },
    alamat: { label: "Alamat", minLength: 10 },
    namaAnak: { label: "Nama Anak", minLength: 2 },
    jenisKelamin: { label: "Jenis Kelamin" },
    tanggalLahir: { label: "Tanggal Lahir" },
    bbLahir: {
      type: "number",
      label: "Berat Lahir",
      min: 0.1,
      max: 10,
    },
    tbLahir: {
      type: "number",
      label: "Tinggi Lahir",
      min: 20,
      max: 100,
    },
  };

  const formData = {
    fotoProfil: fotoProfilFile.value,
    namaLengkap: namaLengkap.value,
    email: email.value,
    alamat: alamat.value,
    namaAnak: namaAnak.value,
    jenisKelamin: jenisKelamin.value,
    tanggalLahir: tanggalLahir.value,
    bbLahir: bbLahir.value,
    tbLahir: tbLahir.value,
  };

  const validation = validateForm(formData, rules);

  if (validation.isValid) {
    if (authUser.value && authUser.value.userId) {
      await profileStore.updateUserProfile(authUser.value.userId, formData);
    } else {
      profileStore.error = "User tidak ditemukan. Silakan masuk kembali.";
    }
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

      <ErrorMessage :message="profileError" v-if="profileError" />
      <div v-if="profileLoading">
        <LoadingSpinner />
      </div>
      <form v-else @submit.prevent="handleSubmit" class="space-y-8">
        <div class="flex flex-col items-center">
          <div class="relative mb-4">
            <div
              class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden"
            >
              <img
                v-if="fotoProfil"
                :src="fotoProfil"
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
                placeholder="Masukkan nama lengkap Anda"
                :model-value="profile?.fullName"
                autofocus
              />
              <FormError
                :message="errors.namaLengkap"
                v-if="errors.namaLengkap"
              />
            </div>

            <div>
              <FormInput
                id="email"
                label="Email"
                type="email"
                v-model="email"
                placeholder="Masukkan email Anda"
                :model-value="profile?.email"
                readonly
                class="bg-gray-50 cursor-not-allowed"
              />
              <FormError :message="errors.email" v-if="errors.email" />
            </div>

            <div class="md:col-span-2">
              <FormTextArea
                id="alamat"
                v-model="alamat"
                placeholder="Masukkan alamat lengkap Anda"
                :rows="3"
                label="Alamat"
                :model-value="profile?.alamat"
              />
              <FormError :message="errors.alamat" v-if="errors.alamat" />
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
                id="namaAnak"
                label="Nama Anak"
                v-model="namaAnak"
                placeholder="Masukkan nama anak Anda"
                :model-value="profile?.namaAnak"
              />
              <FormError :message="errors.namaAnak" v-if="errors.namaAnak" />
            </div>

            <div>
              <FormSelect
                id="jenisKelamin"
                :options="['laki-laki', 'perempuan']"
                label="Jenis Kelamin"
                v-model="jenisKelamin"
                :model-value="profile?.jenisKelamin"
              />
            </div>

            <div>
              <FormInput
                id="tanggalLahir"
                label="Tanggal Lahir"
                type="date"
                v-model="tanggalLahir"
                :model-value="profile?.tanggalLahir"
              />
              <FormError
                :message="errors.tanggalLahir"
                v-if="errors.tanggalLahir"
              />
            </div>

            <div>
              <FormInput
                id="bbLahir"
                type="number"
                v-model="bbLahir"
                placeholder="Contoh: 3.2"
                step="0.1"
                label="Berat Lahir (kg)"
                :model-value="profile?.bbLahir"
              />
              <FormError :message="errors.bbLahir" v-if="errors.bbLahir" />
            </div>

            <div>
              <FormInput
                id="tbLahir"
                type="number"
                v-model="tbLahir"
                :model-value="profile?.tbLahir"
                placeholder="Contoh: 50"
                label="Tinggi Lahir (cm)"
              />
              <FormError :message="errors.tbLahir" v-if="errors.tbLahir" />
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
            :disabled="profileLoading"
            type="submit"
            class="bg-linear-65 from-[#4ADE80] to-[#22C55E] shadow-xl inset-shadow-xs inset-shadow-gray-500 hover:opacity-85 text-white font-medium text-base md:text-sm py-2 px-6 rounded-full transition duration-300 disabled:opacity-50"
          >
            <span v-if="profileLoading" class="flex items-center">
              <LoadingSpinner2 />
            </span>
            <span v-else>Simpan Perubahan</span>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
