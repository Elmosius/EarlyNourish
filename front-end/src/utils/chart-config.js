import { TrendingUp, Weight, Ruler } from "lucide-vue-next";

export const CHART_TYPES = [
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

export const DEFAULT_CHART = "stunting-risk";

export const requiresWHOStandards = (chartType) => {
  return chartType === "weight-progress" || chartType === "height-progress";
};
