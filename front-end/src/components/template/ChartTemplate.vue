<script setup>
import { computed } from "vue";
import VueApexCharts from "vue3-apexcharts";

const apexchart = VueApexCharts;

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  template: {
    type: String,
    required: true,
    validator: (value) =>
      ["stunting-risk", "weight-progress", "height-progress"].includes(value),
  },
  data: {
    type: Object,
    required: true,
  },
});

const chartTemplates = {
  "stunting-risk": {
    colors: ["#f59e0b"],
    yAxisMax: 100,
    yAxisTitle: "Risiko (%)",
    strokeWidth: 3,
    markerSize: 6,
    legendItems: [
      { name: "Risiko Rendah (0-30%)", color: "#10b981" },
      { name: "Risiko Sedang (30-70%)", color: "#f59e0b" },
      { name: "Risiko Tinggi (70-100%)", color: "#ef4444" },
    ],
  },
  "weight-progress": {
    colors: ["#8b5cf6", "#d1d5db"],
    yAxisMax: 12,
    yAxisTitle: "Berat (kg)",
    strokeWidth: [3, 2],
    markerSize: [6, 4],
    strokeDashArray: [0, 5],
    legendItems: [
      { name: "Berat Anak", color: "#8b5cf6" },
      { name: "Standar Rata-Rata", color: "#d1d5db" },
    ],
  },
  "height-progress": {
    colors: ["#3b82f6", "#d1d5db"],
    yAxisMax: 85,
    yAxisTitle: "Tinggi (cm)",
    strokeWidth: [3, 2],
    markerSize: [6, 4],
    strokeDashArray: [0, 5],
    legendItems: [
      { name: "Tinggi Anak", color: "#3b82f6" },
      { name: "Standar Rata-Rata", color: "#d1d5db" },
    ],
  },
};

const currentTemplate = computed(() => chartTemplates[props.template]);
const legendItems = computed(() => currentTemplate.value.legendItems);

const chartSeries = computed(() => {
  if (props.template === "stunting-risk") {
    return [
      {
        name: "Risiko Stunting",
        data: props.data.riskData || [],
      },
    ];
  } else {
    return [
      {
        name:
          props.template === "weight-progress" ? "Berat Anak" : "Tinggi Anak",
        data: props.data.actualData || [],
      },
      {
        name: "Standar Rata-Rata",
        data: props.data.standardData || [],
      },
    ];
  }
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
    width: currentTemplate.value.strokeWidth,
    curve: "smooth",
    dashArray: currentTemplate.value.strokeDashArray || [0],
  },
  markers: {
    size: currentTemplate.value.markerSize,
    strokeWidth: 2,
    strokeColors: ["#fff"],
    hover: {
      size: Array.isArray(currentTemplate.value.markerSize)
        ? currentTemplate.value.markerSize.map((size) => size + 2)
        : currentTemplate.value.markerSize + 2,
    },
  },
  colors: currentTemplate.value.colors,
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
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      text: currentTemplate.value.yAxisTitle,
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
      formatter: (value) => {
        if (props.template === "stunting-risk") {
          return `${value}%`;
        } else if (props.template === "weight-progress") {
          return `${value} kg`;
        } else {
          return `${value} cm`;
        }
      },
    },
    min: 0,
    max: currentTemplate.value.yAxisMax,
  },
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
    y: {
      formatter: function (value) {
        if (props.template === "stunting-risk") {
          return `${value}%`;
        } else if (props.template === "weight-progress") {
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
          height: 250,
        },
        xaxis: {
          labels: {
            style: {
              fontSize: "10px",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              fontSize: "10px",
            },
          },
        },
      },
    },
  ],
}));
</script>

<template>
  <div class="bg-white rounded-xl shadow-xl p-6">
    <h3 class="font-bold text-gray-800 mb-4">
      {{ title }}
    </h3>

    <div class="h-64 md:h-80 w-full mb-4">
      <apexchart
        type="line"
        height="100%"
        :options="chartOptions"
        :series="chartSeries"
      />
    </div>

    <div class="flex flex-wrap justify-center gap-4 text-sm">
      <div
        v-for="legend in legendItems"
        :key="legend.name"
        class="flex items-center gap-2"
      >
        <div
          class="w-3 h-3 rounded-full"
          :style="{ backgroundColor: legend.color }"
        ></div>
        <span class="text-gray-600">{{ legend.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.apexcharts-tooltip) {
  border-radius: 8px !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
}
</style>
