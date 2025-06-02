<script setup>
const props = defineProps({
  assessment: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["view-details", "show-menu"]);

const getRiskBadgeClass = (riskLevel) => {
  const baseClass = "inline-block ";
  if (riskLevel >= 70) return baseClass + "bg-red-100 text-red-800";
  if (riskLevel >= 30) return baseClass + "bg-yellow-100 text-yellow-800";
  return baseClass + "bg-green-100 text-green-800";
};

const getRiskStatusText = (riskLevel) => {
  if (riskLevel >= 70) return "Risiko Tinggi";
  if (riskLevel >= 30) return "Risiko Sedang";
  return "Risiko Rendah";
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>

<template>
  <div class="relative">
    <div
      class="relative bg-white rounded-xl border border-gray-300 p-6 ml-8 hover:shadow-md transition-shadow"
    >
      <div
        class="absolute -left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-[#E0E7FF] shadow-md z-10"
      ></div>

      <div class="flex justify-between items-start mb-6">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
            <h3 class="text-base md:text-sm font-bold text-gray-800">
              {{ assessment.ageLabel }}
            </h3>
            <span
              :class="getRiskBadgeClass(assessment.riskLevel)"
              class="px-4 py-1.5 rounded-full text-base font-medium"
            >
              {{ getRiskStatusText(assessment.riskLevel) }}
            </span>
          </div>
          <p class="text-gray-500 text-base mb-3">
            {{ formatDate(assessment.date) }}
          </p>

          <button
            @click="$emit('view-details', assessment)"
            class="md:hidden text-blue-600 hover:text-blue-700 text-base font-medium transition-colors"
          >
            Lihat Rincian
          </button>
        </div>

        <div class="hidden md:block my-1 mx-2">
          <a
            href=""
            @click="$emit('view-details', assessment)"
            class="text-blue-600 hover:text-blue-700 text-base font-medium transition-colors"
          >
            Lihat Rincian
          </a>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6 wrap-anywhere">
        <!-- Height -->
        <div class="space-y-1 rounded-xl p-3 bg-gray-50">
          <div class="flex items-center gap-2">
            <p class="text-gray-500 text-base">Tinggi</p>
          </div>
          <p class="font-bold text-gray-800 text-base md:text-sm">
            {{ assessment.height }} cm
          </p>
        </div>

        <!-- Weight -->
        <div class="space-y-1 rounded-xl p-3 bg-gray-50">
          <p class="text-gray-500 text-base">Berat</p>
          <p class="font-bold text-gray-800 text-base md:text-sm">
            {{ assessment.weight }} kg
          </p>
        </div>

        <!-- Height by Age -->
        <div class="space-y-1 rounded-xl p-3 bg-gray-50">
          <p class="text-gray-500 text-base">Tinggi Berdasarkan Umur</p>
          <p class="font-bold text-gray-800 text-base md:text-sm">
            {{ assessment.heightByAge }} SD
          </p>
        </div>

        <!-- Risk Level -->
        <div class="space-y-1 rounded-xl p-3 bg-gray-50">
          <p class="text-gray-500 text-base">Level Risiko</p>
          <p class="font-bold text-gray-800 text-base md:text-sm">
            {{ assessment.riskPercentage }}%
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transition-shadow {
  transition: box-shadow 0.2s ease-in-out;
}

.transition-colors {
  transition: color 0.2s ease-in-out;
}
</style>
