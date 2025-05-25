<script setup>
import { computed } from "vue";
import { UserIcon } from "lucide-vue-next";

const props = defineProps({
  childName: {
    type: String,
    default: "Amelia Zahra",
  },
  gender: {
    type: String,
    default: "Perempuan",
  },
  childAge: {
    type: String,
    default: "12 bulan",
  },
  riskStatus: {
    type: String,
    default: "Berisiko Stunting",
  },
  weight: {
    type: Number,
    default: 9.2,
  },
  height: {
    type: Number,
    default: 76.5,
  },
  weightSD: {
    type: String,
    default: "x",
  },
  heightSD: {
    type: String,
    default: "x",
  },
});

const statusCirle = computed(() => {
  const baseClass = "inline-block w-3 h-3 mr-1 rounded-full";
  switch (props.riskStatus) {
    case "Berisiko Stunting":
      return `${baseClass} bg-yellow-500`;
    case "Normal":
      return `${baseClass} bg-green-500`;
    case "Stunting":
      return `${baseClass} bg-red-500 `;
    default:
      return `${baseClass} bg-gray-500`;
  }
});

const statusClass = computed(() => {
  const baseClass =
    "text-xs md:text-sm px-4 py-1.5 rounded-full shadow-xl font-medium ";
  switch (props.riskStatus) {
    case "Berisiko Stunting":
      return `${baseClass} bg-yellow-100 text-yellow-800`;
    case "Normal":
      return `${baseClass} bg-green-100 text-green-800`;
    case "Stunting":
      return `${baseClass} bg-red-100 text-red-800`;
    default:
      return `${baseClass} bg-gray-100 text-gray-800`;
  }
});
</script>

<template>
  <section class="px-8 py-4 md:px-14 lg:px-38">
    <div
      class="container mx-auto max-w-4xl bg-white rounded-xl shadow-xl mb-4 p-6"
    >
      <!-- Mobile Layout -->
      <div class="block md:hidden">
        <div class="flex flex-col items-center text-center gap-4 mb-4">
          <div
            class="bg-green-100 rounded-full p-3 shadow-lg border-white border-2"
          >
            <UserIcon class="text-tertiary h-8 w-8" />
          </div>
          <div>
            <h2 class="font-bold">{{ childName }}</h2>
            <p class="text-base my-2">{{ gender }}, {{ childAge }}</p>

            <div :class="statusClass">
              <span :class="statusCirle"></span>
              {{ riskStatus }}
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 wrap-break-word">
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-base text-gray-500 mb-1">Berat</p>
            <p class="font-semibold text-sm">{{ weight }} kg</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-base text-gray-500 mb-1">Tinggi</p>
            <p class="font-semibold text-sm">{{ height }} cm</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-base text-gray-500 mb-1">Berat Berdasarkan Usia</p>
            <p class="font-semibold text-sm">{{ weightSD }} SD</p>
          </div>
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-base text-gray-500 mb-1">Tinggi Berdasarkan Usia</p>
            <p class="font-semibold text-sm">{{ heightSD }} SD</p>
          </div>
        </div>
      </div>

      <!-- Tablet/ Desktop Layout -->
      <div class="hidden md:flex items-center gap-8">
        <div class="flex-shrink-0">
          <div
            class="bg-green-100 rounded-full p-8 shadow-lg border-white border-4 w-24 h-24 flex items-center justify-center"
          >
            <UserIcon class="text-tertiary h-8 w-8" />
          </div>
        </div>

        <div class="flex-1">
          <div class="flex justify-between items-start mb-6">
            <div class="flex-1">
              <h2 class="font-bold text-lg">{{ childName }}</h2>
              <p class="text-gray-600">{{ gender }}, {{ childAge }}</p>
            </div>
            <div class="flex-shrink-0 my-auto p-3">
              <div :class="statusClass">
                <span :class="statusCirle"></span>
                {{ riskStatus }}
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6">
            <div class="bg-gray-50 rounded-lg p-3">
              <p class="text-gray-600 text-sm mb-1">Berat</p>
              <p class="font-semibold text-lg mb-3">{{ weight }} kg</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-3">
              <p class="text-gray-600 text-sm mb-1">Berat Berdasarkan Usia</p>
              <p class="font-semibold text-lg">{{ weightSD }}</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-3">
              <p class="text-gray-600 text-sm mb-1">Tinggi</p>
              <p class="font-semibold text-lg mb-3">{{ height }} cm</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-3">
              <p class="text-gray-600 text-sm mb-1">Tinggi Berdasarkan Usia</p>
              <p class="font-semibold text-lg">{{ heightSD }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
