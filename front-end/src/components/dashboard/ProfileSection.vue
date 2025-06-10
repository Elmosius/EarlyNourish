<script setup>
import { Clipboard } from "lucide-vue-next";
import { formatDateDisplay } from "../../utils/date.js";
import { computed } from "vue";

const data = defineProps({
  predictionData: {
    type: Object,
    required: true,
  },
});

const checkDate = computed(() => {
  return data.predictionData?.createdAt
    ? formatDateDisplay(data.predictionData.createdAt)
    : "Tanggal tidak tersedia";
});
</script>

<template>
  <section class="px-8 pt-12 md:px-14 lg:px-38">
    <div
      class="container mx-auto max-w-4xl bg-white rounded-xl shadow-xl mb-4 p-6"
    >
      <div class="flex flex-col md:flex-row justify-between items-start mb-2">
        <div>
          <div class="flex items-center gap-2 md:gap-3">
            <div class="bg-green-100 p-2 md:p-4 rounded-lg lg:p-4">
              <Clipboard class="text-tertiary" />
            </div>

            <div>
              <h2 class="font-bold text-gray-800">Early Nourish</h2>
              <p class="text-xs text-gray-500 md:text-sm">
                Aplikasi Pemantauan Stunting
              </p>
            </div>
          </div>
        </div>
        <div class="mt-3 md:my-auto">
          <p class="text-xs text-gray-500 md:text-sm">Tanggal Pemeriksaan</p>
          <p class="text-xs font-semibold md:text-sm">{{ checkDate }}</p>
        </div>
      </div>
      <div class="flex justify-end">
        <router-link
          to="/assessment"
          class="bg-linear-65 from-[#4ADE80] to-[#22C55E] shadow-xl inset-shadow-xs inset-shadow-gray-300 text-white text-xs px-4 py-2 md:px-6 rounded-lg hover:opacity-85 transition-opacity lg:px-10"
        >
          Cek Ulang
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
