import { processGrowthStatuses } from "./status.js";

/**
 * Fungsi terpusat untuk menghitung risiko stunting
 * Digunakan baik untuk tampilan real-time maupun chart history
 */
export const calculateStuntingRisk = (predictionData) => {
  if (!predictionData)
    return { percentage: 50, category: "Data tidak tersedia" };

  const growthStatuses = processGrowthStatuses(predictionData);

  if (!growthStatuses.length) {
    return { percentage: 50, category: "Data tidak tersedia" };
  }

  // Ambil Z-score terburuk (absolut terbesar)
  const worstZScore = Math.max(
    ...growthStatuses.map((status) => Math.abs(status.value)),
  );

  let percentage, category;

  if (worstZScore >= 4) {
    percentage = 95;
    category = "severely stunting";
  } else if (worstZScore >= 3) {
    percentage = 85;
    category = "severely stunting";
  } else if (worstZScore >= 2) {
    percentage = 65;
    category = "stunting";
  } else if (worstZScore >= 1) {
    percentage = 40;
    category = "normal";
  } else if (worstZScore >= 0.5) {
    percentage = 20;
    category = "normal";
  } else {
    percentage = 5;
    category = "normal";
  }

  return { percentage, category };
};

/**
 * Konversi kategori risiko ke persentase untuk konsistensi
 */
export const getRiskPercentageFromCategory = (category) => {
  const normalizedCategory = category.toLowerCase();

  switch (normalizedCategory) {
    case "severely stunting":
    case "stunting berat":
      return 85;
    case "stunting":
    case "stunting ringan":
      return 65;
    case "normal":
      return 20;
    default:
      return 50;
  }
};

/**
 * Konversi persentase ke kategori risiko
 */
export const getRiskCategoryFromPercentage = (percentage) => {
  if (percentage >= 70) return "severely stunting";
  if (percentage >= 40) return "stunting";
  return "normal";
};

/**
 * Fungsi untuk menyinkronkan data history dengan perhitungan terbaru
 */
export const syncHistoryWithCurrentRisk = (
  historyData,
  currentPredictionData,
) => {
  if (!historyData || !Array.isArray(historyData)) return [];

  return historyData.map((entry) => {
    // Jika entry memiliki prediction data, hitung ulang risikonya
    if (entry.predictionData || (entry.tbU && entry.bbU && entry.bbTb)) {
      const predictionForEntry = entry.predictionData || {
        tbU: entry.tbU,
        bbU: entry.bbU,
        bbTb: entry.bbTb,
      };

      const calculatedRisk = calculateStuntingRisk(predictionForEntry);

      return {
        ...entry,
        risikoStunting: calculatedRisk.category,
        risikoPersentase: calculatedRisk.percentage,
      };
    }

    // Jika tidak ada prediction data, gunakan kategori yang ada
    // tapi pastikan persentase konsisten
    return {
      ...entry,
      risikoPersentase: getRiskPercentageFromCategory(entry.risikoStunting),
    };
  });
};
