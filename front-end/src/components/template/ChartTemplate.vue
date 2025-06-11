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
    colors: ["#ffa500"],
    yAxisMax: 100,
    yAxisTitle: "Risiko (%)",
    strokeWidth: 3,
    markerSize: 4,
    legendItems: [
      { name: "Risiko Rendah (0-30%)", color: "#10b981" },
      { name: "Risiko Sedang (30-70%)", color: "#f59e0b" },
      { name: "Risiko Tinggi (70-100%)", color: "#ef4444" },
    ],
  },
  "weight-progress": {
    colors: ["#8b5cf6", "#d1d5db"],
    yAxisMax: 15,
    yAxisTitle: "Berat (kg)",
    strokeWidth: [3, 2],
    markerSize: [4, 4],
    strokeDashArray: [0, 5],
    legendItems: [
      { name: "Berat Anak", color: "#8b5cf6" },
      { name: "Standar Rata-Rata", color: "#d1d5db" },
    ],
  },
  "height-progress": {
    colors: ["#3b82f6", "#d1d5db"],
    yAxisMax: 100,
    yAxisTitle: "Tinggi (cm)",
    strokeWidth: [3, 2],
    markerSize: [4, 4],
    strokeDashArray: [0, 5],
    legendItems: [
      { name: "Tinggi Anak", color: "#3b82f6" },
      { name: "Standar Rata-Rata", color: "#d1d5db" },
    ],
  },
};

const currentTemplate = computed(() => chartTemplates[props.template]);
const legendItems = computed(() => currentTemplate.value.legendItems);

// Function to get color based on risk percentage
const getRiskColor = (value) => {
  if (value <= 30) return "#10b981"; // Green - Low risk
  if (value <= 70) return "#f59e0b"; // Amber - Medium risk
  return "#ef4444"; // Red - High risk
};

const chartSeries = computed(() => {
  console.log("Chart series data:", props.data);

  if (props.template === "stunting-risk") {
    return [
      {
        name: "Risiko Stunting",
        data: props.data.riskData || [],
      },
    ];
  } else {
    const series = [
      {
        name:
          props.template === "weight-progress" ? "Berat Anak" : "Tinggi Anak",
        data: props.data.actualData || [],
      },
    ];

    // Only add standard data if it exists
    if (props.data.standardData && props.data.standardData.length > 0) {
      series.push({
        name: "Standar Rata-Rata",
        data: props.data.standardData,
      });
    }

    return series;
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
      size: 4,
    },
    // Add discrete colors for markers based on risk percentage
    discrete:
      props.template === "stunting-risk" && props.data.riskData
        ? props.data.riskData.map((point, index) => ({
            seriesIndex: 0,
            dataPointIndex: index,
            fillColor: getRiskColor(point.y),
            strokeColor: "#fff",
            size: 4,
          }))
        : [],
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
    type: "datetime",
    labels: {
      style: {
        fontSize: "10px",
        colors: "#64748b",
      },
      datetimeFormatter: {
        year: "yyyy",
        month: "MMM 'yy",
        day: "dd MMM",
        hour: "HH:mm",
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
    x: {
      format: "dd MMM yyyy HH:mm",
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
    // Add custom tooltip for risk chart to show risk level
    custom:
      props.template === "stunting-risk"
        ? function ({ series, seriesIndex, dataPointIndex, w }) {
            const value = series[seriesIndex][dataPointIndex];
            let riskLevel = "";
            let riskColor = "";

            if (value <= 30) {
              riskLevel = "Risiko Rendah";
              riskColor = "#10b981";
            } else if (value <= 70) {
              riskLevel = "Risiko Sedang";
              riskColor = "#f59e0b";
            } else {
              riskLevel = "Risiko Tinggi";
              riskColor = "#ef4444";
            }

            return `
        <div class="custom-tooltip" style="background: white; padding: 10px; border-radius: 8px; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <div style="width: 12px; height: 12px; border-radius: 50%; background-color: ${riskColor};"></div>
            <span style="font-weight: 600; color: #374151;">${riskLevel}</span>
          </div>
          <div style="color: #6b7280; font-size: 12px;">
            Persentase Risiko: <strong>${value}%</strong>
          </div>
        </div>
      `;
          }
        : undefined,
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

    <!-- Debug info untuk chart -->
    <div class="bg-gray-50 p-2 mb-4 rounded text-xs" v-if="false">
      <p>
        Chart Series Length:
        {{
          chartSeries && chartSeries[0] && chartSeries[0].data
            ? chartSeries[0].data.length
            : 0
        }}
      </p>
      <p>
        Sample Data:
        {{
          JSON.stringify(
            chartSeries && chartSeries[0] && chartSeries[0].data
              ? chartSeries[0].data.slice(0, 2)
              : [],
          )
        }}
      </p>
    </div>

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
        <span class="text-gray-600 text-base">{{ legend.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.apexcharts-tooltip) {
  border-radius: 8px !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
}

:deep(.custom-tooltip) {
  font-family: "Inter", sans-serif !important;
}
</style>
