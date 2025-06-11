<script setup>
import { computed } from "vue";
import { CircleAlert } from "lucide-vue-next";
import { processGrowthStatuses } from "../../utils/status.js";

const props = defineProps({
  predictionData: {
    type: Object,
    default: null,
  },
});

const growthStatuses = computed(() => {
  return processGrowthStatuses(props.predictionData);
});

const riskPercentage = computed(() => {
  if (!growthStatuses.value.length) return 50;

  const worstZScore = Math.max(
    ...growthStatuses.value.map((status) => Math.abs(status.value)),
  );
  if (worstZScore >= 4) return 95;
  if (worstZScore >= 3) return 85;
  if (worstZScore >= 2) return 65;
  if (worstZScore >= 1) return 40;
  if (worstZScore >= 0.5) return 20;
  return 5;
});

const riskFactors = computed(() => {
  if (!growthStatuses.value.length) {
    return ["Data pertumbuhan tidak tersedia"];
  }

  const factors = [];

  growthStatuses.value.forEach((status) => {
    if (status.value < -2) {
      factors.push(`${status.name} Dibawah -2 SD (${status.value})`);
    } else if (status.value > 2) {
      factors.push(`${status.name} Diatas +2 SD (${status.value})`);
    }
  });

  if (factors.length === 0) {
    if (riskPercentage.value >= 40) {
      factors.push("Faktor risiko lingkungan atau sosial ekonomi");
      factors.push("Monitoring rutin diperlukan");
    } else {
      factors.push("Tidak ada faktor risiko signifikan terdeteksi");
    }
  }

  return factors;
});

const riskCircleClass = computed(() => {
  if (riskPercentage.value >= 70) return "border-red-400 bg-red-50";
  if (riskPercentage.value >= 40) return "border-yellow-400 bg-yellow-50";
  return "border-secondary bg-quaternary";
});

const riskTextColorClass = computed(() => {
  if (riskPercentage.value >= 70) return "text-red-600";
  if (riskPercentage.value >= 40) return "text-yellow-600";
  return "text-tertiary";
});

const riskStatusClass = computed(() => {
  if (riskPercentage.value >= 70)
    return "bg-red-100 text-red-800 hover:bg-red-200";
  if (riskPercentage.value >= 40)
    return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
  return "bg-quaternary text-tertiary hover:bg-green-200";
});

const riskStatusText = computed(() => {
  if (riskPercentage.value >= 70) return "Risiko Stunting Tinggi";
  if (riskPercentage.value >= 40) return "Risiko Stunting Sedang";
  return "Risiko Stunting Rendah";
});
</script>

<template>
  <section class="px-8 py-3 md:px-14 lg:px-38">
    <div
      class="container mx-auto max-w-4xl bg-white rounded-xl shadow-xl mb-4 p-6"
    >
      <h2 class="font-bold text-gray-800">Asesmen Risiko Stunting</h2>

      <div class="flex justify-center my-10">
        <div
          :class="riskCircleClass"
          class="w-32 h-32 rounded-full border-4 flex items-center justify-center"
        >
          <div class="text-center">
            <div :class="riskTextColorClass" class="text-4xl font-bold">
              {{ riskPercentage }}%
            </div>
            <div :class="riskTextColorClass" class="text-xs font-medium mt-1">
              Risiko
            </div>
          </div>
        </div>
      </div>

      <h3 class="font-semibold text-gray-700 mb-2 text-sm">
        Faktor Risiko Teridentifikasi
      </h3>
      <ul class="space-y-2 mb-4">
        <li
          v-for="factor in riskFactors"
          :key="factor"
          class="flex items-start"
        >
          <CircleAlert
            class="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5"
          />
          <span class="text-base md:sm">{{ factor }}</span>
        </li>
      </ul>

      <div class="flex flex-col gap-2">
        <button
          :class="riskStatusClass"
          class="text-base md:text-sm py-2 px-4 rounded-full w-full text-center font-medium"
        >
          {{ riskStatusText }}
        </button>
        <button
          class="bg-blue-50 text-blue-800 text-base md:text-sm py-2 px-4 rounded-full w-full text-center hover:bg-blue-100 transition-colors ease-in-out duration-200"
        >
          Informasi Nutrisi Dipersonalisasi
        </button>
        <button
          class="bg-gray-100 text-gray-800 text-base md:text-sm py-2 px-4 rounded-full w-full text-center hover:bg-gray-200 transition-colors ease-in-out duration-200"
        >
          Pemeriksaan Rutin Diperlukan
        </button>
      </div>
    </div>
  </section>
</template>
