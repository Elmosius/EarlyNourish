import { getWHOStandard } from "./data-who";
import {
  calculateStuntingRisk,
  getRiskPercentageFromCategory,
} from "./unified-risk.js";

export const isValidHistoryEntry = (entry) => {
  return !!(entry.predictionId && entry.bb && entry.tb && entry.usia);
};

export const getValidHistoryEntries = (historyData) => {
  if (!historyData || !Array.isArray(historyData)) {
    return [];
  }

  return historyData
    .filter(isValidHistoryEntry)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
};

export const calculateAgeRange = (entries) => {
  if (!entries.length) {
    return { min: 0, max: 24 };
  }

  const ages = entries.map((entry) => parseInt(entry.usia));
  const minAge = Math.max(0, Math.min(...ages) - 2);
  const maxAge = Math.min(60, Math.max(...ages) + 2);

  return { min: minAge, max: maxAge };
};

export const generateWHOStandards = (minAge, maxAge, gender, type) => {
  const whoData = [];

  for (let age = minAge; age <= maxAge; age++) {
    const whoStandard = getWHOStandard(age, gender, type);

    if (whoStandard && whoStandard.SD0) {
      const approximateDate = new Date();
      approximateDate.setMonth(approximateDate.getMonth() - (maxAge - age));

      whoData.push({
        x: approximateDate.getTime(),
        y: parseFloat(whoStandard.SD0),
      });
    }
  }

  return whoData;
};

// Fungsi yang diperbaiki untuk konsistensi perhitungan risiko
export const getRiskPercentage = (entry) => {
  // Prioritas 1: Jika ada prediction data, hitung ulang
  if (entry.predictionData || (entry.tbU && entry.bbU && entry.bbTb)) {
    const predictionData = entry.predictionData || {
      tbU: entry.tbU,
      bbU: entry.bbU,
      bbTb: entry.bbTb,
    };

    const riskCalc = calculateStuntingRisk(predictionData);
    return riskCalc.percentage;
  }

  // Prioritas 2: Jika ada risikoPersentase yang sudah dihitung
  if (entry.risikoPersentase && !isNaN(entry.risikoPersentase)) {
    return parseFloat(entry.risikoPersentase);
  }

  // Prioritas 3: Konversi dari kategori risiko
  if (entry.risikoStunting) {
    return getRiskPercentageFromCategory(entry.risikoStunting);
  }

  // Default jika tidak ada data
  return 50;
};

export const transformToChartData = (entries, dataType) => {
  return entries.map((entry, index) => {
    const timestamp = new Date(entry.createdAt).getTime();
    let yValue;

    switch (dataType) {
      case "risk":
        yValue = getRiskPercentage(entry);
        break;
      case "weight":
        yValue = parseFloat(entry.bb);
        break;
      case "height":
        yValue = parseFloat(entry.tb);
        break;
      default:
        yValue = 0;
    }

    return {
      x: timestamp + index, // Add index for unique x values
      y: yValue,
      // Tambahkan metadata untuk debugging
      meta: {
        originalRisk: entry.risikoStunting,
        calculatedRisk: dataType === "risk" ? yValue : null,
        date: new Date(entry.createdAt).toLocaleDateString(),
      },
    };
  });
};

export const processHistoryData = (historyData) => {
  const validEntries = getValidHistoryEntries(historyData);

  if (validEntries.length === 0) {
    console.warn("No valid entries found for chart");
    return {
      riskData: [],
      weightData: [],
      heightData: [],
      whoWeightData: [],
      whoHeightData: [],
      gender: null,
      ageRange: { min: 0, max: 24 },
    };
  }

  const gender = validEntries[0].jenisKelamin;
  const ageRange = calculateAgeRange(validEntries);

  const whoWeightData = generateWHOStandards(
    ageRange.min,
    ageRange.max,
    gender,
    "weight",
  );
  const whoHeightData = generateWHOStandards(
    ageRange.min,
    ageRange.max,
    gender,
    "height",
  );

  const riskData = transformToChartData(validEntries, "risk");
  const weightData = transformToChartData(validEntries, "weight");
  const heightData = transformToChartData(validEntries, "height");

  // Debug log untuk melihat konsistensi data
  console.log(
    "Risk data points:",
    riskData.map((d) => ({
      date: d.meta.date,
      originalRisk: d.meta.originalRisk,
      calculatedPercentage: d.y,
    })),
  );

  return {
    riskData,
    weightData,
    heightData,
    whoWeightData,
    whoHeightData,
    gender,
    ageRange,
  };
};

export const getChartConfigurations = (processedData) => {
  return {
    "stunting-risk": {
      title: "Riwayat Risiko Stunting",
      info: "Grafik ini menunjukkan persentase risiko stunting anak Anda dari waktu ke waktu berdasarkan perhitungan Z-score.",
      data: {
        riskData: processedData.riskData,
      },
    },
    "weight-progress": {
      title: "Progres Berat Badan",
      info: "Grafik ini menunjukkan perkembangan berat badan anak Anda dibandingkan dengan standar WHO.",
      data: {
        actualData: processedData.weightData,
        standardData: processedData.whoWeightData,
      },
    },
    "height-progress": {
      title: "Progres Tinggi Badan",
      info: "Grafik ini menunjukkan perkembangan tinggi badan anak Anda dibandingkan dengan standar WHO.",
      data: {
        actualData: processedData.heightData,
        standardData: processedData.whoHeightData,
      },
    },
  };
};
