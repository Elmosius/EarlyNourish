<script setup>
import { ref, computed } from "vue";
import { validateForm } from "../../utils/validation.js";
import FormInput from "../ui/FormInput.vue";
import FormError from "../ui/FormError.vue";

const formData = ref({
  // Step 1 data
  namaLengkap: "",
  email: "",
  namaAnak: "",
  jenisKelamin: "",
  tanggalLahir: "",

  // Step 2 data
  bbLahir: "",
  tbLahir: "",
  bb: "",
  tb: "",
});

const currentStep = ref(2);
const errors = ref({});
const totalSteps = 2;

const progressPercentage = computed(() => {
  return (currentStep.value / totalSteps) * 100;
});

const umurInMonths = computed(() => {
  if (!formData.value.tanggalLahir) return 0;

  const birthDate = new Date(formData.value.tanggalLahir);
  const currentDate = new Date();

  let months = (currentDate.getFullYear() - birthDate.getFullYear()) * 12;
  months += currentDate.getMonth() - birthDate.getMonth();

  if (currentDate.getDate() < birthDate.getDate()) {
    months--;
  }

  return Math.max(0, months);
});

const step1Rules = {
  namaLengkap: {
    label: "Nama Orang Tua",
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  email: {
    label: "Email",
    type: "email",
    required: true,
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
    min: 30,
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

// Fungsi untuk menyiapkan data prediksi
const preparePredictionData = () => {
  return {
    jenisKelamin: formData.value.jenisKelamin,
    bbLahir: parseFloat(formData.value.bbLahir),
    tbLahir: parseFloat(formData.value.tbLahir),
    umur: umurInMonths.value,
    bb: parseFloat(formData.value.bb),
    tb: parseFloat(formData.value.tb),
  };
};

// Navigation handlers
const handleNext = () => {
  if (currentStep.value === 1 && validateStep1()) {
    currentStep.value = 2;
  } else if (currentStep.value === 2 && validateStep2()) {
    // Submit form
    const predictionData = preparePredictionData();
    console.log("Form data:", formData.value);
    console.log("Prediction data:", predictionData);
    alert("Form berhasil dikirim!");
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
            <div class="flex justify-betwee gap-6">
              <div class="w-full">
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
              </div>

              <div class="w-full">
                <FormInput
                  id="email"
                  label="Email"
                  type="email"
                  v-model="formData.email"
                  @input="clearError('email')"
                  placeholder="email@example.com"
                  readonly
                  required
                />
                <FormError :message="errors.email" v-if="errors.email" />
              </div>
            </div>

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
                <FormError :message="errors.namaAnak" v-if="errors.namaAnak" />
              </div>
              <div class="w-full">
                <FormInput
                  id="tanggalLahir"
                  label="Tanggal Lahir"
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
                {{ currentStep === totalSteps ? "Kirim" : "Selanjutnya" }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
