import {
  getWHOStandard,
  calculateZScore,
  getNutritionalStatus,
} from "./data-who";

export const generateTrajectoryData = (predictionData) => {
  // Data dasar
  const currentAgeInMonths = predictionData.usia;
  const birthWeight = parseFloat(predictionData.bbLahir);
  const birthHeight = parseFloat(predictionData.tbLahir);
  const currentWeight = parseFloat(predictionData.bb);
  const currentHeight = parseFloat(predictionData.tb);
  const gender = predictionData.jenisKelamin;

  return generateActualTrajectory(
    birthWeight,
    birthHeight,
    currentWeight,
    currentHeight,
    currentAgeInMonths,
    gender,
  );
};

const generateActualTrajectory = (
  birthWeight,
  birthHeight,
  currentWeight,
  currentHeight,
  currentAge,
  gender,
) => {
  const actualData = [];
  const whoStandards = [];

  const relevantAges = [0, currentAge];

  // 1. DATA AKTUAL - hanya 2 titik
  actualData.push({
    x: 0,
    weight: birthWeight,
    height: birthHeight,
    age: 0,
    type: "birth",
  });

  actualData.push({
    x: currentAge,
    weight: currentWeight,
    height: currentHeight,
    age: currentAge,
    type: "current",
  });

  // 2. STANDAR WHO - hanya untuk titik yang sama dengan data aktual
  for (const age of relevantAges) {
    const whoWeight = getWHOStandard(age, gender, "weight");
    const whoHeight = getWHOStandard(age, gender, "height");

    if (whoWeight && whoHeight) {
      whoStandards.push({
        x: age,
        weightWHO: parseFloat(whoWeight.SD0) || 0,
        heightWHO: parseFloat(whoHeight.SD0) || 0,
        age: age,
      });
    }
  }

  // Hitung Z-scores dan status gizi saat ini
  const weightZScore = calculateZScore(
    currentWeight,
    currentAge,
    gender,
    "weight",
  );
  const heightZScore = calculateZScore(
    currentHeight,
    currentAge,
    gender,
    "height",
  );
  const weightStatus = getNutritionalStatus(
    currentWeight,
    currentAge,
    gender,
    "weight",
  );
  const heightStatus = getNutritionalStatus(
    currentHeight,
    currentAge,
    gender,
    "height",
  );

  return {
    actualData,
    whoStandards,
    currentAge,
    analysis: {
      weightZScore: weightZScore,
      heightZScore: heightZScore,
      weightStatus: weightStatus || "Data tidak tersedia",
      heightStatus: heightStatus || "Data tidak tersedia",
      currentWeight,
      currentHeight,
      birthWeight,
      birthHeight,
    },
  };
};

export const getChartConfig = (trajectoryData) => {
  // Hitung range untuk y-axis berdasarkan data real
  const weights = [
    ...trajectoryData.actualData.map((d) => parseFloat(d.weight) || 0),
    ...trajectoryData.whoStandards.map((d) => d.weightWHO || 0),
  ].filter((w) => w > 0); // Filter out invalid weights

  const heights = [
    ...trajectoryData.actualData.map((d) => parseFloat(d.height) || 0),
    ...trajectoryData.whoStandards.map((d) => d.heightWHO || 0),
  ].filter((h) => h > 0); // Filter out invalid heights

  const weightRange = {
    min: weights.length ? Math.max(0, Math.floor(Math.min(...weights)) - 1) : 0,
    max: weights.length ? Math.ceil(Math.max(...weights)) + 1 : 20,
  };

  const heightRange = {
    min: heights.length
      ? Math.max(30, Math.floor(Math.min(...heights)) - 2)
      : 40,
    max: heights.length ? Math.ceil(Math.max(...heights)) + 2 : 100,
  };

  return {
    colors: {
      actualData: "#1E40AF", // Biru untuk data aktual
      whoWeight: "#DC2626", // Merah untuk WHO berat
      whoHeight: "#EA580C", // Orange untuk WHO tinggi
      birthPoint: "#059669", // Hijau untuk titik lahir
      currentPoint: "#7C3AED", // Ungu untuk titik sekarang
    },
    weightRange,
    heightRange,
  };
};
