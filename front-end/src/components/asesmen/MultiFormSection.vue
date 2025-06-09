<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import { createPrediction } from "../../api/predict.js";
import { validateForm } from "../../utils/validation.js";
import { calculateAgeInMonths, formatDateForInput } from "../../utils/date.js";

import { useAuthStore, useProfileStore } from "../../stores/index.js";

import FormError from "../ui/FormError.vue";
import FormInput from "../ui/FormInput.vue";
import LoadingSpinner2 from "../ui/LoadingSpinner2.vue";
import ErrorMessage from "../ui/ErrorMessage.vue";

const router = useRouter();
const authStore = useAuthStore();
const profileStore = useProfileStore();
const { profile } = storeToRefs(profileStore);
const { user: authUser } = storeToRefs(authStore);

const formData = ref({
  // Step 1 data
  namaLengkap: "",
  namaAnak: "",
  jenisKelamin: "",
  tanggalLahir: "",

  // Step 2 data
  bbLahir: "",
  tbLahir: "",
  bb: "",
  tb: "",
});

const currentStep = ref(1);
const errors = ref({});
const totalSteps = 2;
const isSubmitting = ref(false);

const progressPercentage = computed(() => {
  return (currentStep.value / totalSteps) * 100;
});

const autoFillFromProfile = () => {
  if (profile.value) {
    formData.value.namaLengkap = profile.value.namaLengkap;
    formData.value.namaAnak = profile.value.namaAnak;
    formData.value.jenisKelamin = profile.value.jenisKelamin;
    formData.value.tanggalLahir = formatDateForInput(
      profile.value.tanggalLahir,
    );
    formData.value.bbLahir = profile.value.bbLahir;
    formData.value.tbLahir = profile.value.tbLahir;
  }
};

const hasProfileData = computed(() => ({
  namaLengkap: profile.value?.namaLengkap,
  namaAnak: profile.value?.namaAnak,
  jenisKelamin: profile.value?.jenisKelamin,
  tanggalLahir: profile.value?.tanggalLahir,
  bbLahir: profile.value?.bbLahir,
  tbLahir: profile.value?.tbLahir,
}));

const step1Rules = {
  namaLengkap: {
    label: "Nama Orang Tua",
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  namaAnak: {
    label: "Nama Anak",
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  jenisKelamin: {
    label: "Jenis Kelamin",
    required: true,
  },
  tanggalLahir: {
    label: "Tanggal Lahir",
    required: true,
  },
};

const step2Rules = {
  bbLahir: {
    label: "Berat Badan Lahir",
    required: true,
    type: "number",
    min: 0.5,
    max: 10,
  },
  tbLahir: {
    label: "Tinggi Badan Lahir",
    required: true,
    type: "number",
    min: 20,
    max: 70,
  },
  bb: {
    label: "Berat Badan Saat Ini",
    required: true,
    type: "number",
    min: 1,
    max: 200,
  },
  tb: {
    label: "Tinggi Badan Saat Ini",
    required: true,
    type: "number",
    min: 20,
    max: 250,
  },
};

const validateStep1 = () => {
  const validation = validateForm(formData.value, step1Rules);
  errors.value = validation.errors;
  return validation.isValid;
};

const validateStep2 = () => {
  const validation = validateForm(formData.value, step2Rules);
  errors.value = validation.errors;
  return validation.isValid;
};

const preparePredictionData = () => {
  return {
    jenisKelamin: formData.value.jenisKelamin.toUpperCase(),
    bbLahir: parseFloat(formData.value.bbLahir),
    tbLahir: parseFloat(formData.value.tbLahir),
    umur: calculateAgeInMonths(formData.value.tanggalLahir),
    bb: parseFloat(formData.value.bb),
    tb: parseFloat(formData.value.tb),
  };
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;

    const profileUpdateData = {};

    if (!hasProfileData.value.namaLengkap && formData.value.namaLengkap) {
      profileUpdateData.namaLengkap = formData.value.namaLengkap;
    }
    if (!hasProfileData.value.namaAnak && formData.value.namaAnak) {
      profileUpdateData.namaAnak = formData.value.namaAnak;
    }
    if (!hasProfileData.value.jenisKelamin && formData.value.jenisKelamin) {
      profileUpdateData.jenisKelamin = formData.value.jenisKelamin;
    }
    if (!hasProfileData.value.tanggalLahir && formData.value.tanggalLahir) {
      profileUpdateData.tanggalLahir = formatDateForInput(
        formData.value.tanggalLahir,
      );
    }
    if (!hasProfileData.value.bbLahir && formData.value.bbLahir) {
      profileUpdateData.bbLahir = parseFloat(formData.value.bbLahir);
    }
    if (!hasProfileData.value.tbLahir && formData.value.tbLahir) {
      profileUpdateData.tbLahir = parseFloat(formData.value.tbLahir);
    }

    if (Object.keys(profileUpdateData).length > 0) {
      console.log("Updating profile with:", profileUpdateData);
      await profileStore.updateUserProfile(
        authUser.value.userId,
        profileUpdateData,
      );
    }

    const predictionData = preparePredictionData();
    console.info("Prediction data:", predictionData);
    const result = await createPrediction(predictionData);

    console.log("Form data:", formData.value);
    console.log("Prediction data:", predictionData);
    console.log("Prediction result:", result);

    if (result && result.id) {
      await router.push(`/dashboard/${result.id}`);
    } else {
      errors.value = {
        general: "Gagal membuat prediksi. Silakan coba lagi.",
      };
      await router.push("/assessment");
    }

    alert("Prediksi berhasil dibuat!");
  } catch (error) {
    console.error("Error:", error);
    alert("Terjadi kesalahan saat memproses data");
  } finally {
    isSubmitting.value = false;
  }
};

const handleNext = () => {
  if (currentStep.value === 1 && validateStep1()) {
    currentStep.value = 2;
  } else if (currentStep.value === 2 && validateStep2()) {
    handleSubmit();
  }
};

const handlePrevious = () => {
  if (currentStep.value > 1) {
    currentStep.value -= 1;
    errors.value = {};
  }
};

const clearError = (field) => {
  if (errors.value[field]) {
    errors.value[field] = "";
  }
};

onMounted(async () => {
  if (authUser.value && authUser.value.userId) {
    await profileStore.fetchProfile(authUser.value.userId);
    autoFillFromProfile();
  }
});
</script>

<template>
  <section class="px-8 py-12 md:px-14 lg:px-38">
    <div class="container mx-auto">
      <!-- Progress bar -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <p class="text-base">Langkah {{ currentStep }}/{{ totalSteps }}</p>
          <p class="text-sm">{{ Math.round(progressPercentage) }}%</p>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-tertiary h-2 rounded-full"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
      </div>

      <ErrorMessage message="{{ errors.general }}" v-if="errors.general" />

      <div
        class="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
      >
        <div class="bg-green-50 p-6">
          <h2
            class="text-sm lg:text-lg font-montserrat font-semibold text-gray-800"
          >
            {{ currentStep === 1 ? "Detail Informasi" : "Data Kesehatan Anak" }}
          </h2>
          <p class="text-gray-600 mt-1 text-base lg:text-sm">
            {{
              currentStep === 1
                ? "Mari kita mulai dengan beberapa informasi dasar tentang anak Anda."
                : "Berikan informasi kesehatan dan perkembangan fisik anak untuk asesmen yang lebih akurat."
            }}
          </p>
        </div>

        <form @submit.prevent="handleNext" class="p-6">
          <!-- Step 1 Form -->
          <div v-if="currentStep === 1" class="space-y-6 flex flex-col">
            <div class="grid gap-6">
              <FormInput
                id="namaLengkap"
                label="Nama Orang Tua"
                v-model="formData.namaLengkap"
                @input="clearError('namaLengkap')"
                placeholder="Masukkan nama lengkap Anda"
                required
              />
              <FormError
                :message="errors.namaLengkap"
                v-if="errors.namaLengkap"
              />

              <div class="flex justify-between gap-6">
                <div class="w-full">
                  <FormInput
                    id="namaAnak"
                    label="Nama Anak"
                    v-model="formData.namaAnak"
                    @input="clearError('namaAnak')"
                    placeholder="Masukkan nama anak"
                    required
                  />
                  <FormError
                    :message="errors.namaAnak"
                    v-if="errors.namaAnak"
                  />
                </div>
                <div class="w-full">
                  <FormInput
                    id="tanggalLahir"
                    label="Tanggal Lahir Anak"
                    type="date"
                    v-model="formData.tanggalLahir"
                    @input="clearError('tanggalLahir')"
                    required
                  />
                  <FormError
                    :message="errors.tanggalLahir"
                    v-if="errors.tanggalLahir"
                  />
                </div>
              </div>
            </div>

            <div>
              <label class="text-gray-700 mb-1 text-base font-semibold"
                >Jenis Kelamin</label
              >
              <div class="lg:flex gap-6">
                <div
                  class="w-full border border-gray-300 rounded-md px-4 py-2 mb-2 lg:mb-0"
                >
                  <label class="flex items-center cursor-pointer">
                    <input
                      id="male"
                      type="radio"
                      name="jenisKelamin"
                      value="l"
                      v-model="formData.jenisKelamin"
                      @change="clearError('jenisKelamin')"
                      class="h-4 w-4 text-tertiary focus:ring-tertiary"
                    />
                    <span class="ml-2 text-gray-700 text-base">Laki-laki</span>
                  </label>
                </div>
                <div class="w-full border border-gray-300 rounded-md px-4 py-2">
                  <label class="flex items-center cursor-pointer">
                    <input
                      id="female"
                      type="radio"
                      name="jenisKelamin"
                      value="p"
                      v-model="formData.jenisKelamin"
                      @change="clearError('jenisKelamin')"
                      class="h-4 w-4 text-tertiary focus:ring-tertiary"
                    />
                    <span class="ml-2 text-gray-700 text-base">Perempuan</span>
                  </label>
                </div>
              </div>
              <FormError
                :message="errors.jenisKelamin"
                v-if="errors.jenisKelamin"
              />
            </div>
          </div>

          <!-- Step 2 Form - Medical Information -->
          <div v-if="currentStep === 2" class="space-y-6 flex flex-col">
            <!-- Data Lahir -->
            <h3 class="text-base font-semibold text-gray-800 mb-4">
              Data Saat Lahir
            </h3>
            <div class="lg:flex gap-6">
              <div class="w-full mb-2">
                <FormInput
                  id="bbLahir"
                  label="Berat Badan Lahir (kg)"
                  type="number"
                  step="0.1"
                  v-model="formData.bbLahir"
                  @input="clearError('bbLahir')"
                  placeholder="Contoh: 3.2"
                  required
                />
                <FormError :message="errors.bbLahir" v-if="errors.bbLahir" />
              </div>

              <div class="w-full">
                <FormInput
                  id="tbLahir"
                  label="Tinggi Badan Lahir (cm)"
                  type="number"
                  v-model="formData.tbLahir"
                  @input="clearError('tbLahir')"
                  placeholder="Contoh: 50"
                  required
                />
                <FormError :message="errors.tbLahir" v-if="errors.tbLahir" />
              </div>
            </div>

            <!-- Data Saat Ini -->
            <h3 class="text-base font-semibold text-gray-800 mb-4">
              Data Saat Ini
            </h3>
            <div class="lg:flex gap-6">
              <div class="w-full mb-2">
                <FormInput
                  id="bb"
                  label="Berat Badan Saat Ini (kg)"
                  type="number"
                  step="0.1"
                  v-model="formData.bb"
                  @input="clearError('bb')"
                  placeholder="Contoh: 15.5"
                  required
                />
                <FormError :message="errors.bb" v-if="errors.bb" />
              </div>

              <div class="w-full">
                <FormInput
                  id="tb"
                  label="Tinggi Badan Saat Ini (cm)"
                  type="number"
                  v-model="formData.tb"
                  @input="clearError('tb')"
                  placeholder="Contoh: 95"
                  required
                />
                <FormError :message="errors.tb" v-if="errors.tb" />
              </div>
            </div>
          </div>

          <div class="mt-5 border-t border-gray-300">
            <div class="mt-4 flex justify-between">
              <button
                v-if="currentStep > 1"
                @click="handlePrevious"
                type="button"
                class="border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-full transition duration-300 text-base hover:bg-gray-50"
              >
                Sebelumnya
              </button>
              <div v-else></div>

              <button
                type="submit"
                class="bg-linear-65 from-[#4ADE80] to-[#22C55E] shadow-xl inset-shadow-xs inset-shadow-gray-400 hover:opacity-85 text-white font-medium py-2 px-6 rounded-full transition duration-300 text-base"
              >
                <span v-if="isSubmitting" class="flex items-center">
                  <LoadingSpinner2 />
                </span>
                <span v-else>
                  {{
                    currentStep === totalSteps
                      ? "Kirim Prediksi"
                      : "Selanjutnya"
                  }}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
