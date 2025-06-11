import { getWHOStandard } from "./data-who";

export const RISK_MAPPING = {
  "severely stunting": 85,
  stunting: 65,
  normal: 20,
  default: 0,
};

export const isValidHistoryEntry = (entry) => {
  return !!(
    entry.predictionId &&
    entry.risikoStunting &&
    entry.bb &&
    entry.tb &&
    entry.usia
  );
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
      // Create timestamp for consistent x-axis
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

export const getRiskPercentage = (riskCategory) => {
  const normalizedRisk = riskCategory.toLowerCase();
  return RISK_MAPPING[normalizedRisk] || RISK_MAPPING.default;
};

export const transformToChartData = (entries, dataType) => {
  return entries.map((entry, index) => {
    const timestamp = new Date(entry.createdAt).getTime();
    let yValue;

    switch (dataType) {
      case "risk":
        yValue = getRiskPercentage(entry.risikoStunting);
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
    };
  });
};

export const processHistoryData = (historyData) => {
  console.log("Processing history data:", historyData);

  // Get valid entries
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

  // Extract metadata
  const gender = validEntries[0].jenisKelamin;
  const ageRange = calculateAgeRange(validEntries);

  // Generate WHO standard data
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

  console.log("Processed data:", {
    riskDataCount: riskData.length,
    weightDataCount: weightData.length,
    heightDataCount: heightData.length,
    whoWeightDataCount: whoWeightData.length,
    whoHeightDataCount: whoHeightData.length,
    gender: gender,
    ageRange: ageRange,
  });

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
      info: "Grafik ini menunjukkan persentase risiko stunting anak Anda dari waktu ke waktu.",
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
