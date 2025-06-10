import { getWHOStandard } from "./data-who.js";

export const ACTION_MAP = {
  "ASI eksklusif": {
    title: "ASI Eksklusif 6 Bulan",
    description: "Satu-satunya asupan nutrisi terbaik untuk bayi",
  },
  "Evaluasi menyusui": {
    title: "Evaluasi Teknik Menyusui",
    description: "Pastikan bayi mendapat ASI dengan efektif",
  },
  "Gizi ibu ditingkatkan": {
    title: "Tingkatkan Gizi Ibu",
    description: "Fokus pada protein, zat besi, dan vitamin esensial",
  },
  "Rujukan bila perlu": {
    title: "Konsultasikan ke Dokter",
    description: "Berikan hasil ini ketika mengunjungi dokter",
  },
  "MPASI dimulai usia 6 bulan": {
    title: "Mulai MPASI pada Usia 6 Bulan",
    description: "Perkenalkan makanan sesuai tahap perkembangan",
  },
  "PMT atau RUTF": {
    title: "Pemberian Makanan Tambahan",
    description: "Dapatkan PMT dari Posyandu atau Puskesmas setempat",
  },
  "Suplementasi Fe, zinc, vitamin A/D": {
    title: "Suplementasi Vitamin dan Mineral",
    description: "Sesuai dengan anjuran tenaga kesehatan",
  },
};

export function transformRecommendations(
  recommendations = [],
  defaultActions = [],
) {
  if (!recommendations || recommendations.length === 0) return defaultActions;

  const actions = recommendations.map((rec) => {
    return (
      ACTION_MAP[rec] || {
        title: rec,
        description: "Ikuti petunjuk tenaga kesehatan",
      }
    );
  });

  actions.push({
    title: "Jadwalkan Asesmen Lanjutan dalam 1 Bulan",
    description: "Untuk memantau kemajuan pertumbuhan anak",
  });

  return actions;
}

export function calculateMilestones(data, defaultMilestones = {}) {
  if (!data) return defaultMilestones;

  const gender = data.jenisKelamin === "l" ? "l" : "p";
  const currentAge = data.usia;
  const targetAge = currentAge + 3;

  // Get WHO standards
  const currentHeightStd = getWHOStandard(currentAge, gender, "height");
  const targetHeightStd = getWHOStandard(targetAge, gender, "height");
  const currentWeightStd = getWHOStandard(currentAge, gender, "weight");
  const targetWeightStd = getWHOStandard(targetAge, gender, "weight");

  // Calculate growth targets
  const currentHeight = data.tb;
  const currentWeight = data.bb;
  const heightSD = currentHeightStd.SD1 - currentHeightStd.SD0;
  const weightSD = currentWeightStd.SD1 - currentWeightStd.SD0;

  // Target is to improve by 0.5 SD over 3 months
  const targetHeightZImprovement = Math.min(0.5, Math.abs(data.tbU) / 2);
  const targetWeightZImprovement = Math.min(0.5, Math.abs(data.bbU) / 2);

  // Calculate target values
  const targetHeight = (
    currentHeight +
    (targetHeightStd.SD0 - currentHeightStd.SD0) +
    targetHeightZImprovement * heightSD
  ).toFixed(1);
  const targetWeight = (
    currentWeight +
    (targetWeightStd.SD0 - currentWeightStd.SD0) +
    targetWeightZImprovement * weightSD
  ).toFixed(1);
  const targetHeightZ = (data.tbU + targetHeightZImprovement).toFixed(1);

  const now = new Date();
  const endDate = new Date(now);
  endDate.setMonth(now.getMonth() + 3);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const periodLabel = `${months[now.getMonth()]} - ${months[endDate.getMonth()]} ${endDate.getFullYear()}`;

  return {
    period: {
      label: "Target 3 Bulan ke Depan",
      value: periodLabel,
    },
    targets: [
      {
        label: "Target Tinggi Badan",
        targetValue: `${targetHeight} cm`,
        currentValue: `${currentHeight} cm`,
        targetChange: `+${(targetHeight - currentHeight).toFixed(1)} cm`,
        targetColor: "text-tertiary",
        progressPercentage: 30,
      },
      {
        label: "Target Berat Badan",
        targetValue: `${targetWeight} kg`,
        currentValue: `${currentWeight} kg`,
        targetChange: `+${(targetWeight - currentWeight).toFixed(1)} kg`,
        targetColor: "text-tertiary",
        progressPercentage: 25,
      },
      {
        label: "Target Tinggi Berdasarkan Umur",
        targetValue: `${targetHeightZ} SD`,
        currentValue: `${data.tbU} SD`,
        targetChange: `+${targetHeightZImprovement.toFixed(1)} SD`,
        targetColor: "text-tertiary",
        progressPercentage: 40,
      },
    ],
  };
}
