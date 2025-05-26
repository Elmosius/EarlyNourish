<script setup>
import { ref, computed } from "vue";
import {
  TrendingUp,
  Weight,
  Ruler,
  Download,
  FileText,
  Share2,
} from "lucide-vue-next";
import ChartTemplate from "../template/ChartTemplate.vue";

const selectedChart = ref("stunting-risk");

const chartTypes = [
  {
    id: "stunting-risk",
    title: "Riwayat Risiko Stunting",
    description: "Persentase risiko stunting",
    icon: TrendingUp,
  },
  {
    id: "weight-progress",
    title: "Progres Berat Badan",
    description: "Perkembangan berat badan",
    icon: Weight,
  },
  {
    id: "height-progress",
    title: "Progres Tinggi Badan",
    description: "Perkembangan tinggi badan",
    icon: Ruler,
  },
];

const chartData = {
  "stunting-risk": {
    title: "Riwayat Risiko Stunting",
    info: "Grafik ini menunjukkan persentase risiko stunting anak Anda dari waktu ke waktu. Warna hijau menunjukkan risiko rendah (0-30%), kuning untuk risiko sedang (30-70%), dan merah untuk risiko tinggi (70-100%).",
    data: {
      riskData: [
        { x: "3 mo", y: 15 },
        { x: "6 mo", y: 25 },
        { x: "9 mo", y: 35 },
        { x: "12 mo", y: 45 },
        { x: "15 mo", y: 55 },
        { x: "18 mo", y: 60 },
      ],
    },
  },
  "weight-progress": {
    title: "Progres Berat Badan",
    info: "Grafik ini membandingkan berat badan anak Anda (garis ungu) dengan standar rata-rata WHO (garis abu-abu putus-putus). Pantau apakah pertumbuhan anak mengikuti kurva yang sehat.",
    data: {
      actualData: [
        { x: "3 mo", y: 5.8 },
        { x: "6 mo", y: 7.2 },
        { x: "9 mo", y: 8.1 },
        { x: "12 mo", y: 8.7 },
        { x: "15 mo", y: 9.0 },
        { x: "18 mo", y: 9.2 },
      ],
      standardData: [
        { x: "3 mo", y: 6.2 },
        { x: "6 mo", y: 7.8 },
        { x: "9 mo", y: 8.9 },
        { x: "12 mo", y: 9.6 },
        { x: "15 mo", y: 10.1 },
        { x: "18 mo", y: 10.4 },
      ],
    },
  },
  "height-progress": {
    title: "Progres Tinggi Badan",
    info: "Grafik ini membandingkan tinggi badan anak Anda (garis biru) dengan standar rata-rata WHO (garis abu-abu putus-putus). Tinggi badan yang konsisten mengikuti kurva pertumbuhan menunjukkan perkembangan yang sehat.",
    data: {
      actualData: [
        { x: "3 mo", y: 61.0 },
        { x: "6 mo", y: 66.5 },
        { x: "9 mo", y: 70.2 },
        { x: "12 mo", y: 73.1 },
        { x: "15 mo", y: 75.0 },
        { x: "18 mo", y: 76.5 },
      ],
      standardData: [
        { x: "3 mo", y: 62.5 },
        { x: "6 mo", y: 68.0 },
        { x: "9 mo", y: 72.5 },
        { x: "12 mo", y: 76.0 },
        { x: "15 mo", y: 78.5 },
        { x: "18 mo", y: 80.0 },
      ],
    },
  },
};

const currentChartConfig = computed(() => chartData[selectedChart.value]);

const exportChart = (format) => {
  console.log(`Exporting chart as ${format}`);
};

const shareChart = () => {
  console.log("Sharing chart");
  if (navigator.share) {
    navigator.share({
      title: currentChartConfig.value.title,
      text: "Lihat perkembangan pertumbuhan anak saya di Early Nourish",
      url: window.location.href,
    });
  }
};
</script>

<template>
  <section class="px-8 md:px-14 lg:px-38">
    <div class="container mx-auto max-w-4xl">
      <div class="bg-white rounded-xl shadow-xl p-6 mb-6">
        <h2 class="font-bold text-gray-800 mb-3">Pilih Jenis Grafik</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            v-for="chartType in chartTypes"
            :key="chartType.id"
            @click="selectedChart = chartType.id"
            :class="
              selectedChart === chartType.id
                ? 'bg-secondary text-white border-secondary'
                : 'bg-white text-gray-700 border-gray-300 hover:border-quaternary'
            "
            class="flex items-center gap-3 p-3 border-2 rounded-lg transition-colors"
          >
            <component :is="chartType.icon" class="h-5 w-5" />
            <div class="text-left">
              <div class="font-medium text-sm">{{ chartType.title }}</div>
              <div class="text-xs opacity-75">{{ chartType.description }}</div>
            </div>
          </button>
        </div>
      </div>

      <ChartTemplate
        :title="currentChartConfig.title"
        :template="selectedChart"
        :data="currentChartConfig.data"
      />
    </div>
  </section>
</template>

<style scoped>
.transition-colors {
  transition:
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
}
</style>
