<script setup>
import { ref } from "vue";
import FormInput from "../ui/FormInput.vue";

const childName = ref("");
const birthDate = ref("");
const gender = ref("");
const parentName = ref("");
const email = ref("");

const submitForm = () => {
  console.log({
    childName: childName.value,
    birthDate: birthDate.value,
    gender: gender.value,
    parentName: parentName.value,
    email: email.value,
  });
};
</script>

<template>
  <section class="px-8 py-12">
    <div class="container mx-auto">
      <!-- Progress bar -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <p class="text-base">Langkah 1/2</p>
          <p class="text-sm">50%</p>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-tertiary h-2 rounded-full" style="width: 50%"></div>
        </div>
      </div>

      <div
        class="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
      >
        <div class="bg-green-50 p-6">
          <h2 class="text-sm font-montserrat font-semibold text-gray-800">
            Detail Informasi
          </h2>
          <p class="text-gray-600 mt-1 text-base">
            Mari kita mulai dengan beberapa informasi dasar tentang anak Anda.
          </p>
        </div>

        <form @submit.prevent="submitForm" class="p-6">
          <div class="space-y-6">
            <FormInput
              id="childName"
              label="Nama Anak"
              v-model="childName"
              placeholder="Masukkan nama anak"
            />

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
                placeholder="mm/dd/yyyy"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base"
                required
              />
            </div>

            <div>
              <label class="block text-gray-700 mb-1 text-base font-semibold"
                >Jenis Kelamin</label
              >
              <div class="space-y-2">
                <div class="border border-gray-300 rounded-md px-4 py-2">
                  <label class="flex items-center cursor-pointer">
                    <input
                      id="male"
                      type="radio"
                      name="gender"
                      value="male"
                      v-model="gender"
                      class="h-4 w-4 text-green-600 focus:ring-green-500"
                    />
                    <span class="ml-2 text-gray-700 text-base">Laki-laki</span>
                  </label>
                </div>
                <div class="border border-gray-300 rounded-md px-4 py-2">
                  <label class="flex items-center cursor-pointer">
                    <input
                      id="female"
                      type="radio"
                      name="gender"
                      value="female"
                      v-model="gender"
                      class="h-4 w-4 text-green-600 focus:ring-green-500"
                    />
                    <span class="ml-2 text-gray-700 text-base">Perempuan</span>
                  </label>
                </div>
              </div>
            </div>

            <FormInput
              id="parentName"
              label="Nama Orang Tua"
              v-model="parentName"
              placeholder="Masukkan nama Anda"
            />

            <FormInput
              id="email"
              label="Email"
              type="email"
              v-model="email"
              placeholder="Masukkan Email Anda"
            />
          </div>

          <div class="mt-5 border-t border-gray-300">
            <div class="mt-4 flex justify-end">
              <button
                type="submit"
                class="bg-linear-65 from-[#4ADE80] to-[#22C55E] shadow-xl inset-shadow-xs inset-shadow-gray-400 hover:opacity-85 text-white font-medium py-2 px-6 rounded-full transition duration-300 text-base"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
