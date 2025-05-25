<script setup>
import { computed } from "vue";
import VueApexCharts from "vue3-apexcharts";

const apexchart = VueApexCharts;

const props = defineProps({
  weightData: {
    type: Array,
    default: () => [
      { x: "Jan 2023", y: 8.5 },
      { x: "Feb 2023", y: 8.8 },
      { x: "Mar 2023", y: 9.0 },
      { x: "Apr 2023", y: 9.1 },
      { x: "May 2023", y: 9.2 },
      { x: "Jun 2023", y: 9.4 },
    ],
  },
  heightData: {
    type: Array,
    default: () => [
      { x: "Jan 2023", y: 72.0 },
      { x: "Feb 2023", y: 73.5 },
      { x: "Mar 2023", y: 74.8 },
      { x: "Apr 2023", y: 75.5 },
      { x: "May 2023", y: 76.5 },
      { x: "Jun 2023", y: 77.2 },
    ],
  },
  targetWeightData: {
    type: Array,
    default: () => [
      { x: "Jan 2023", y: 9.0 },
      { x: "Feb 2023", y: 9.3 },
      { x: "Mar 2023", y: 9.6 },
      { x: "Apr 2023", y: 9.9 },
      { x: "May 2023", y: 10.2 },
      { x: "Jun 2023", y: 10.5 },
    ],
  },
  targetHeightData: {
    type: Array,
    default: () => [
      { x: "Jan 2023", y: 74.0 },
      { x: "Feb 2023", y: 75.0 },
      { x: "Mar 2023", y: 76.0 },
      { x: "Apr 2023", y: 77.0 },
      { x: "May 2023", y: 78.0 },
      { x: "Jun 2023", y: 79.0 },
    ],
  },
});

const chartSeries = computed(() => [
  {
    name: "Berat Aktual",
    data: props.weightData,
    color: "#3b82f6",
  },
  {
    name: "Tinggi Aktual",
    data: props.heightData.map((item) => ({ x: item.x, y: item.y })),
    color: "#10b981",
  },
  {
    name: "Target Berat",
    data: props.targetWeightData,
    color: "#94a3b8",
  },
  {
    name: "Target Tinggi",
    data: props.targetHeightData.map((item) => ({ x: item.x, y: item.y })),
    color: "#cbd5e1",
  },
]);

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
    width: [3, 3, 2, 2],
    curve: "smooth",
    dashArray: [0, 0, 5, 5], // Solid lines for actual, dashed for target
  },
  markers: {
    size: [6, 6, 4, 4],
    strokeWidth: 2,
    strokeColors: ["#fff"],
    hover: {
      size: 8,
    },
  },
  colors: ["#3b82f6", "#10b981", "#94a3b8", "#cbd5e1"],
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
        fontSize: "12px",
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
    {
      title: {
        text: "Berat (kg)",
        style: {
          fontSize: "12px",
          color: "#64748b",
        },
      },
      labels: {
        style: {
          fontSize: "12px",
          colors: "#64748b",
        },
        formatter: (value) => `${value} kg`,
      },
      min: 7,
      max: 12,
    },
    {
      opposite: true,
      title: {
        text: "Tinggi (cm)",
        style: {
          fontSize: "12px",
          color: "#64748b",
        },
      },
      labels: {
        style: {
          fontSize: "12px",
          colors: "#64748b",
        },
        formatter: (value) => `${value} cm`,
      },
      min: 70,
      max: 85,
    },
  ],
  legend: {
    show: false, // We'll use custom legend
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: "light",
    style: {
      fontSize: "12px",
    },
    y: {
      formatter: function (value, { seriesIndex }) {
        if (seriesIndex === 0 || seriesIndex === 2) {
          return `${value} kg`;
        } else {
          return `${value} cm`;
        }
      },
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 200,
        },
        xaxis: {
          labels: {
            rotate: -90,
            style: {
              fontSize: "10px",
            },
          },
        },
        yaxis: [
          {
            labels: {
              style: {
                fontSize: "10px",
              },
            },
          },
          {
            labels: {
              style: {
                fontSize: "10px",
              },
            },
          },
        ],
      },
    },
  ],
}));
</script>

<template>
  <section class="px-8 py-3 md:px-14 lg:px-38">
    <div
      class="container mx-auto max-w-4xl bg-white rounded-xl shadow-sm mb-4 p-6"
    >
      <h2 class="font-bold text-gray-800 mb-3">Trajektori Pertumbuhan</h2>

      <!-- Chart Container -->
      <div class="h-64 w-full">
        <apexchart
          type="line"
          height="100%"
          :options="chartOptions"
          :series="chartSeries"
        />
      </div>

      <!-- Legend -->
      <div class="flex justify-center gap-4 mt-3">
        <div class="flex items-center">
          <div class="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
          <span class="text-xs text-gray-600">Berat (kg)</span>
        </div>
        <div class="flex items-center">
          <div class="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
          <span class="text-xs text-gray-600">Tinggi (cm)</span>
        </div>
        <div class="flex items-center">
          <div class="w-3 h-3 bg-gray-300 rounded-full mr-1"></div>
          <span class="text-xs text-gray-600">Target Normal</span>
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
</style>
