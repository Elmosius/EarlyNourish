<script setup>
import { ref, computed } from "vue";
import { validateForm } from "../../utils/validation.js";
import FormInput from "../ui/FormInput.vue";
import FormError from "../ui/FormError.vue";

const formData = ref({
  // Step 1 data
  childName: "",
  birthDate: "",
  gender: "",
  parentName: "",
  email: "",

  // Step 2 data - Medical Information
  birthWeight: "",
  birthHeight: "",
  currentWeight: "",
  currentHeight: "",
  breastfeedingDuration: "",
  motherAgeAtBirth: "",
  fatherHeight: "",
  motherHeight: "",
});

const currentStep = ref(2);
const errors = ref({});
const totalSteps = 2;

const progressPercentage = computed(() => {
  return (currentStep.value / totalSteps) * 100;
});

const step1Rules = {
  childName: {
    label: "Nama Anak",
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  birthDate: { label: "Tanggal Lahir", required: true },
  gender: { label: "Jenis Kelamin", required: true },
  parentName: {
    label: "Nama Orang Tua",
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  email: { label: "Email", type: "email", required: true },
};

const step2Rules = {
  birthWeight: {
    label: "Berat Badan Lahir",
    required: true,
    type: "number",
    min: 0.5,
    max: 10,
  },
  birthHeight: {
    label: "Tinggi Badan Lahir",
    required: true,
    type: "number",
    min: 20,
    max: 70,
  },
  currentWeight: {
    label: "Berat Badan Saat Ini",
    required: true,
    type: "number",
    min: 1,
    max: 200,
  },
  currentHeight: {
    label: "Tinggi Badan Saat Ini",
    required: true,
    type: "number",
    min: 30,
    max: 250,
  },
  breastfeedingDuration: {
    label: "Pemberian ASI",
    required: true,
    type: "number",
    min: 0,
    max: 60,
  },
  motherAgeAtBirth: {
    label: "Usia Ibu saat Melahirkan",
    required: true,
    type: "number",
    min: 15,
    max: 60,
  },
  fatherHeight: {
    label: "Tinggi Badan Ayah",
    required: true,
    type: "number",
    min: 120,
    max: 250,
  },
  motherHeight: {
    label: "Tinggi Badan Ibu",
    required: true,
    type: "number",
    min: 120,
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

// Navigation handlers
const handleNext = () => {
  if (currentStep.value === 1 && validateStep1()) {
    currentStep.value = 2;
  } else if (currentStep.value === 2 && validateStep2()) {
    // Submit form
    console.log("Form submitted:", formData.value);
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
            <div class="lg:flex gap-6">
              <div class="w-full mb-2">
                <FormInput
                  id="childName"
                  label="Nama Anak"
                  v-model="formData.childName"
                  @input="clearError('childName')"
                  placeholder="Masukkan nama anak"
                  class="w-full"
                  required
                />
                <FormError
                  :message="errors.childName"
                  v-if="errors.childName"
                />
              </div>

              <div class="w-full">
                <FormInput
                  id="birthDate"
                  label="Tanggal Lahir"
                  type="date"
                  v-model="formData.birthDate"
                  @input="clearError('birthDate')"
                  placeholder="mm/dd/yyyy"
                  required
                />
                <FormError
                  :message="errors.birthDate"
                  v-if="errors.birthDate"
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
                      name="gender"
                      value="male"
                      v-model="formData.gender"
                      @change="clearError('gender')"
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
                      name="gender"
                      value="female"
                      v-model="formData.gender"
                      @change="clearError('gender')"
                      class="h-4 w-4 text-tertiary focus:ring-tertiary"
                    />
                    <span class="ml-2 text-gray-700 text-base">Perempuan</span>
                  </label>
                </div>
              </div>
              <FormError :message="errors.gender" v-if="errors.gender" />
            </div>

            <div>
              <FormInput
                id="parentName"
                label="Nama Orang Tua"
                v-model="formData.parentName"
                @input="clearError('parentName')"
                placeholder="Masukkan nama Anda"
                required
              />
              <FormError
                :message="errors.parentName"
                v-if="errors.parentName"
              />
            </div>

            <div>
              <FormInput
                id="email"
                label="Email"
                type="email"
                v-model="formData.email"
                @input="clearError('email')"
                placeholder="Masukkan Email Anda"
                required
              />
              <FormError :message="errors.email" v-if="errors.email" />
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
                  id="birthWeight"
                  label="Berat Badan Lahir (kg)"
                  type="number"
                  step="0.1"
                  v-model="formData.birthWeight"
                  @input="clearError('birthWeight')"
                  placeholder="Contoh: 3.2"
                  required
                />
                <FormError
                  :message="errors.birthWeight"
                  v-if="errors.birthWeight"
                />
              </div>

              <div class="w-full">
                <FormInput
                  id="birthHeight"
                  label="Tinggi Badan Lahir (cm)"
                  type="number"
                  v-model="formData.birthHeight"
                  @input="clearError('birthHeight')"
                  placeholder="Contoh: 50"
                  required
                />
                <FormError
                  :message="errors.birthHeight"
                  v-if="errors.birthHeight"
                />
              </div>
            </div>

            <!-- Data Saat Ini -->
            <h3 class="text-base font-semibold text-gray-800 mb-4">
              Data Saat Ini
            </h3>
            <div class="lg:flex gap-6">
              <div class="w-full mb-2">
                <FormInput
                  id="currentWeight"
                  label="Berat Badan Saat Ini (kg)"
                  type="number"
                  step="0.1"
                  v-model="formData.currentWeight"
                  @input="clearError('currentWeight')"
                  placeholder="Contoh: 15.5"
                  required
                />
                <FormError
                  :message="errors.currentWeight"
                  v-if="errors.currentWeight"
                />
              </div>

              <div class="w-full">
                <FormInput
                  id="currentHeight"
                  label="Tinggi Badan Saat Ini (cm)"
                  type="number"
                  v-model="formData.currentHeight"
                  @input="clearError('currentHeight')"
                  placeholder="Contoh: 95"
                  required
                />
                <FormError
                  :message="errors.currentHeight"
                  v-if="errors.currentHeight"
                />
              </div>
            </div>

            <div>
              <FormInput
                id="breastfeedingDuration"
                label="Pemberian ASI (bulan)"
                type="number"
                v-model="formData.breastfeedingDuration"
                @input="clearError('breastfeedingDuration')"
                placeholder="Contoh: 24"
                required
              />
              <FormError
                :message="errors.breastfeedingDuration"
                v-if="errors.breastfeedingDuration"
              />
            </div>

            <!-- Data Orang Tua -->
            <h3 class="text-base font-semibold text-gray-800 mb-4">
              Data Orang Tua
            </h3>
            <div class="space-y-4">
              <div>
                <FormInput
                  id="motherAgeAtBirth"
                  label="Usia Ibu saat Melahirkan (tahun)"
                  type="number"
                  v-model="formData.motherAgeAtBirth"
                  @input="clearError('motherAgeAtBirth')"
                  placeholder="Contoh: 28"
                  required
                />
                <FormError
                  :message="errors.motherAgeAtBirth"
                  v-if="errors.motherAgeAtBirth"
                />
              </div>

              <div class="lg:flex gap-6">
                <div class="w-full mb-2">
                  <FormInput
                    id="fatherHeight"
                    label="Tinggi Badan Ayah (cm)"
                    type="number"
                    v-model="formData.fatherHeight"
                    @input="clearError('fatherHeight')"
                    placeholder="Contoh: 175"
                    required
                  />
                  <FormError
                    :message="errors.fatherHeight"
                    v-if="errors.fatherHeight"
                  />
                </div>

                <div class="w-full">
                  <FormInput
                    id="motherHeight"
                    label="Tinggi Badan Ibu (cm)"
                    type="number"
                    v-model="formData.motherHeight"
                    @input="clearError('motherHeight')"
                    placeholder="Contoh: 160"
                    required
                  />
                  <FormError
                    :message="errors.motherHeight"
                    v-if="errors.motherHeight"
                  />
                </div>
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
