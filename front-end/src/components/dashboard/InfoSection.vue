<script setup>
import { computed } from "vue";
import { UserIcon } from "lucide-vue-next";
import {
  getStatusBadgeClass,
  getStatusCircleClass,
} from "../../utils/status.js";
import { calculateAgeInMonths } from "../../utils/date.js";

const { predictionData, profile } = defineProps({
  predictionData: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  profile: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const statusStunting = computed(() => {
  if (predictionData.risikoStunting === "stunting") {
    return "Stunting";
  } else if (predictionData.risikoStunting === "severely stunting") {
    return "Stunting Berat";
  } else {
    return "Normal";
  }
});

const jenisKelamin = computed(() => {
  return profile.jenisKelamin === "l" ? "Laki-laki" : "Perempuan";
});

const statusCirle = computed(() => getStatusCircleClass(statusStunting.value));

const statusClass = computed(() => getStatusBadgeClass(statusStunting.value));

const userProfilePhoto = computed(() => {
  if (profile && profile.fotoProfil) {
    return `${import.meta.env.VITE_API_URL}/${profile.fotoProfil}`;
  }
  return null;
});
</script>

<template>
  <section class="px-8 py-3 md:px-14 lg:px-38">
    <div
      class="container mx-auto max-w-4xl bg-white rounded-xl shadow-xl mb-4 p-6"
    >
      <!-- Mobile Layout -->
      <div class="block md:hidden">
        <div class="flex flex-col items-center text-center gap-4 mb-4">
          <div
            class="bg-quaternary rounded-full shadow-lg w-24 h-24 border-white border-2 overflow-hidden flex items-center justify-center"
            :class="{ 'p-3': !profile.fotoProfil }"
          >
            <img
              v-if="profile.fotoProfil"
              :src="userProfilePhoto"
              alt="Profile Photo"
              class="w-full h-full object-cover"
            />
            <UserIcon v-else class="text-tertiary h-8 w-8" />
          </div>
          <div>
            <h2 class="font-bold">{{ profile.namaAnak }}</h2>
            <p class="text-base my-2">
              {{ jenisKelamin }}, {{ predictionData.usia }} bulan
            </p>

            <div :class="statusClass">
              <span :class="statusCirle"></span>
              {{ statusStunting }}
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 wrap-break-word">
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-base text-gray-500 mb-1">Berat</p>
            <p class="font-semibold text-sm">{{ predictionData.bb }} kg</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-base text-gray-500 mb-1">Tinggi</p>
            <p class="font-semibold text-sm">{{ predictionData.tb }} cm</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-base text-gray-500 mb-1">Berat Berdasarkan Usia</p>
            <p class="font-semibold text-sm">{{ predictionData.bbU }} SD</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-base text-gray-500 mb-1">Tinggi Berdasarkan Usia</p>
            <p class="font-semibold text-sm">{{ predictionData.tbU }} SD</p>
          </div>
        </div>
      </div>

      <!-- Tablet/ Desktop Layout -->
      <div class="hidden md:flex items-center gap-8">
        <div class="flex-shrink-0">
          <div
            class="bg-quaternary rounded-full shadow-lg border-white border-4 w-24 h-24 flex items-center justify-center overflow-hidden"
            :class="{ 'p-8': !profile.fotoProfil }"
          >
            <img
              v-if="profile.fotoProfil"
              :src="userProfilePhoto"
              alt="Profile Photo"
              class="w-full h-full object-cover"
            />
            <UserIcon v-else class="text-tertiary h-8 w-8" />
          </div>
        </div>

        <div class="flex-1">
          <div class="flex justify-between items-start mb-6">
            <div class="flex-1">
              <h2 class="font-bold">{{ profile.namaAnak }}</h2>
              <p class="text-gray-600 text-sm">
                {{ jenisKelamin }}, {{ predictionData.usia }} bulan
              </p>
            </div>
            <div class="flex-shrink-0 my-auto p-3">
              <div :class="statusClass">
                <span :class="statusCirle"></span>
                {{ statusStunting }}
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div class="bg-gray-50 rounded-lg p-3">
              <p class="text-gray-600 text-sm mb-1">Berat</p>
              <p class="font-semibold mb-3">{{ predictionData.bb }} kg</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-3">
              <p class="text-gray-600 text-sm mb-1">Berat Berdasarkan Usia</p>
              <p class="font-semibold">{{ predictionData.bbU }} SD</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-3">
              <p class="text-gray-600 text-sm mb-1">Tinggi</p>
              <p class="font-semibold mb-3">{{ predictionData.tb }} cm</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-3">
              <p class="text-gray-600 text-sm mb-1">Tinggi Berdasarkan Usia</p>
              <p class="font-semibold">{{ predictionData.tbU }} SD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
