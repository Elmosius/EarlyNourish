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
    default: "+0.8",
  },
  heightSD: {
    type: String,
    default: "+1.2",
  },
});

const statusClass = computed(() => {
  const baseClass = "text-xs px-2 py-0.5 rounded-full ";
  switch (props.riskStatus) {
    case "Berisiko Stunting":
      return baseClass + "bg-yellow-100 text-yellow-800";
    case "Normal":
      return baseClass + "bg-green-100 text-green-800";
    case "Stunting":
      return baseClass + "bg-red-100 text-red-800";
    default:
      return baseClass + "bg-gray-100 text-gray-800";
  }
});
</script>

<template>
  <section class="px-8 py-6 md:px-14 lg:px-38">
    <div
      class="container mx-auto mx-w-4xl bg-white rounded-xl shadow-sm mb-4 p-4"
    >
      <div class="flex flex-col items-center text-center gap-4 mb-4">
        <div class="bg-green-100 rounded-full p-3">
          <UserIcon class="text-tertiary" />
        </div>
        <div>
          <h2 class="font-bold text-lg">{{ childName }}</h2>
          <p class="text-base my-1">{{ gender }}, {{ childAge }}</p>
          <span :class="statusClass" ">{{ riskStatus }}</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-2">
        <div class="bg-gray-50 rounded-lg p-3">
          <p class="text-sm text-gray-500 mb-1">Berat</p>
          <p class="font-bold text-xl">{{ weight }} kg</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-3">
          <p class="text-sm text-gray-500 mb-1">Tinggi</p>
          <p class="font-bold text-xl">{{ height }} cm</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-3">
          <p class="text-sm text-gray-500 mb-1">Berat Berdasarkan Usia</p>
          <p class="font-bold text-xl">{{ height }} cm</p>
        </div>
        <div class="bg-gray-50 rounded-lg p-3">
          <p class="text-sm text-gray-500 mb-1">Tinggi Berdasarkan Usia</p>
          <p class="font-bold text-xl">{{ height }} cm</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
