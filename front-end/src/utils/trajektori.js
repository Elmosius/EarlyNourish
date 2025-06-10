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

// Generate trajectory simple: lahir → sekarang + standar WHO
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

  // 1. TITIK LAHIR (umur 0 bulan)
  actualData.push({
    x: "Lahir",
    weight: birthWeight,
    height: birthHeight,
    age: 0,
    type: "birth",
  });

  // 2. TITIK PEMERIKSAAN SEKARANG
  const currentLabel = `${currentAge} bulan`;
  actualData.push({
    x: currentLabel,
    weight: currentWeight,
    height: currentHeight,
    age: currentAge,
    type: "current",
  });

  // 3. STANDAR WHO dari lahir sampai sekarang
  const agePoints = Array.from({ length: currentAge + 1 }, (_, i) => i);

  for (const age of agePoints) {
    const label = formatAgeLabel(age);

    const whoWeight = getWHOStandard(age, gender, "weight");
    const whoHeight = getWHOStandard(age, gender, "height");

    if (whoWeight && whoHeight) {
      whoStandards.push({
        x: label,
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
    actualData, // Data lahir + pemeriksaan sekarang
    whoStandards, // Standar WHO
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

const formatAgeLabel = (age) => {
  if (age === 0) return "Lahir";
  if (age === 1) return "1 bulan";
  if (age < 12) return `${age} bulan`;

  const years = Math.floor(age / 12);
  const months = age % 12;

  if (months === 0) {
    return years === 1 ? "1 tahun" : `${years} tahun`;
  } else {
    const yearText = years === 1 ? "1 tahun" : `${years} tahun`;
    const monthText = months === 1 ? "1 bulan" : `${months} bulan`;
    return `${yearText} ${monthText}`;
  }
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
