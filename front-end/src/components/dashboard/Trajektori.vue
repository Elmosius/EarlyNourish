<script setup>
import { computed } from "vue";
import VueApexCharts from "vue3-apexcharts";
import {
  generateTrajectoryData,
  getChartConfig,
} from "../../utils/trajektori.js";

const apexchart = VueApexCharts;

const { predictionData } = defineProps({
  predictionData: {
    type: Object,
    default: null,
  },
});

// Generate trajectory data tanpa proyeksi
const trajectoryData = computed(() => {
  return generateTrajectoryData(predictionData);
});

const chartConfig = computed(() => getChartConfig(trajectoryData.value));

const chartSeries = computed(() => {
  const data = trajectoryData.value;

  return [
    // 1. Data Aktual Berat (Lahir + Sekarang)
    {
      name: "Berat Aktual",
      data: data.actualData.map((item) => ({
        x: item.x,
        y: parseFloat(item.weight),
      })),
      color: chartConfig.value.colors.actualData,
      yAxisIndex: 0,
    },
    // 2. Data Aktual Tinggi (menggunakan yAxis kedua)
    {
      name: "Tinggi Aktual",
      data: data.actualData.map((item) => ({
        x: item.x,
        y: parseFloat(item.height),
      })),
      color: chartConfig.value.colors.actualData,
      yAxisIndex: 1,
    },
    // 3. Standar WHO Berat
    {
      name: "Standar WHO (Berat)",
      data: data.whoStandards.map((item) => ({
        x: item.x,
        y: item.weightWHO,
      })),
      color: chartConfig.value.colors.whoWeight,
      yAxisIndex: 0,
    },
    // 4. Standar WHO Tinggi
    {
      name: "Standar WHO (Tinggi)",
      data: data.whoStandards.map((item) => ({
        x: item.x,
        y: item.heightWHO,
      })),
      color: chartConfig.value.colors.whoHeight,
      yAxisIndex: 1,
    },
  ];
});

const chartOptions = computed(() => ({
  chart: {
    type: "line",
    height: "100%",
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    fontFamily: "Inter, sans-serif",
  },
  stroke: {
    width: [2, 2, 2, 2], // Aktual tebal, WHO tipis
    curve: "smooth",
    dashArray: [0, 0, 8, 8], // Solid, solid, dashed, dashed
  },
  markers: {
    size: [2, 2, 2, 2], // Titik aktual besar, WHO kecil
    strokeWidth: 2,
    strokeColors: ["#fff"],
    hover: {
      size: 10,
    },
  },
  colors: [
    chartConfig.value.colors.actualData, // Berat Aktual - Biru
    chartConfig.value.colors.actualData, // Tinggi Aktual - Biru (sama)
    chartConfig.value.colors.whoWeight, // WHO Berat - Merah
    chartConfig.value.colors.whoHeight, // WHO Tinggi - Orange
  ],
  grid: {
    borderColor: "#f1f5f9",
    strokeDashArray: 3,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  xaxis: {
    type: "category",
    labels: {
      style: {
        fontSize: "11px",
        colors: "#64748b",
      },
      rotate: -45,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: [
    // Y-axis kiri untuk Berat Badan
    {
      title: {
        text: "Berat Badan (kg)",
        style: {
          fontSize: "12px",
          color: "#1E40AF",
          fontWeight: "600",
        },
      },
      labels: {
        style: {
          fontSize: "12px",
          colors: "#1E40AF",
        },
        formatter: (value) => `${value} kg`,
      },
      min: chartConfig.value.weightRange.min,
      max: chartConfig.value.weightRange.max,
    },
    // Y-axis kanan untuk Tinggi Badan
    {
      opposite: true,
      title: {
        text: "Tinggi Badan (cm)",
        style: {
          fontSize: "12px",
          color: "#059669",
          fontWeight: "600",
        },
      },
      labels: {
        style: {
          fontSize: "12px",
          colors: "#059669",
        },
        formatter: (value) => `${value.toFixed()} cm`,
      },
      min: chartConfig.value.heightRange.min,
      max: chartConfig.value.heightRange.max,
    },
  ],
  legend: {
    show: false,
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: "light",
    style: {
      fontSize: "12px",
    },
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      const categories = w.globals.categoryLabels;
      const category = categories[dataPointIndex];

      let tooltipContent = `<div class="p-3 space-y-1"><strong class="text-base text-gray-800">${category}</strong><br/>`;

      series.forEach((value, index) => {
        if (value && value[dataPointIndex] !== null) {
          const seriesName = w.config.series[index].name;
          const unit = seriesName.includes("Berat") ? "kg" : "cm";
          const color = w.config.colors[index];
          tooltipContent += `
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 rounded-full" style="background-color: ${color}"></div>
              <span class="text-xs">${seriesName}: <strong>${value[dataPointIndex]} ${unit}</strong></span>
            </div>`;
        }
      });

      tooltipContent += "</div>";
      return tooltipContent;
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 300,
        },
        xaxis: {
          labels: {
            rotate: -90,
            style: {
              fontSize: "10px",
            },
          },
        },
      },
    },
  ],
}));

const legendItems = computed(() => [
  {
    color: chartConfig.value.colors.actualData,
    label: "Data Aktual",
    style: "solid",
    description: "Berat & tinggi anak dari lahir sampai pemeriksaan sekarang",
    category: "actual",
  },
  {
    color: chartConfig.value.colors.whoWeight,
    label: "Standar WHO (Berat)",
    style: "dashed",
    description: "Standar median WHO untuk berat badan (kg)",
    category: "who",
  },
  {
    color: chartConfig.value.colors.whoHeight,
    label: "Standar WHO (Tinggi)",
    style: "dashed",
    description: "Standar median WHO untuk tinggi badan (cm)",
    category: "who",
  },
]);

// Status styles
const getStatusStyle = (type) => {
  const styles = {
    success: "bg-green-50 border-green-200 text-green-700",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
    info: "bg-blue-50 border-blue-200 text-blue-700",
  };
  return styles[type] || styles.info;
};
</script>

<template>
  <section class="px-8 py-3 md:px-14 lg:px-38">
    <div
      class="container mx-auto max-w-4xl bg-white rounded-xl shadow-xl mb-4 p-6"
    >
      <h2 class="font-bold text-gray-800 mb-3">Trajektori Pertumbuhan</h2>

      <div class="h-96 w-full mb-4 rounded-lg p-2">
        <apexchart
          type="line"
          height="100%"
          :options="chartOptions"
          :series="chartSeries"
        />
      </div>

      <div class="mb-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div
            v-for="item in legendItems"
            :key="item.label"
            class="flex items-center p-3 rounded"
          >
            <div
              class="w-8 h-1 mr-3"
              :class="{
                'border-b-2': item.style === 'solid',
                'border-b-2 border-dashed': item.style === 'dashed',
              }"
              :style="{
                borderColor: item.color,
                backgroundColor:
                  item.style === 'solid' ? item.color : 'transparent',
              }"
            ></div>
            <div>
              <span class="text-gray-800 font-medium block">{{
                item.label
              }}</span>
              <span class="text-gray-600 text-xs">{{ item.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.apexcharts-tooltip) {
  border-radius: 8px !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
}

:deep(.apexcharts-legend) {
  justify-content: center !important;
}

:deep(.apexcharts-yaxis-title) {
  font-weight: 600 !important;
}
</style>
