import { whoCalculator } from "./who-calculator.js";

// info section
export const getStatusCircleClass = (riskStatus) => {
  const baseClass = "inline-block w-3 h-3 mr-1 rounded-full";

  switch (riskStatus) {
    case "Stunting":
      return `${baseClass} bg-yellow-500`;
    case "Normal":
      return `${baseClass} bg-tertiary`;
    case "Stunting Berat":
      return `${baseClass} bg-red-500`;
    default:
      return `${baseClass} bg-gray-500`;
  }
};

export const getStatusBadgeClass = (riskStatus) => {
  const baseClass =
    "text-xs md:text-sm px-4 py-1.5 rounded-full shadow-xl font-medium";

  switch (riskStatus) {
    case "Stunting":
      return `${baseClass} bg-yellow-100 text-yellow-800`;
    case "Normal":
      return `${baseClass} bg-quaternary text-tertiary`;
    case "Stunting Berat":
      return `${baseClass} bg-red-100 text-red-800`;
    default:
      return `${baseClass} bg-gray-100 text-gray-800`;
  }
};

// Mapping data API ke format internal
export const mapPredictionData = (predictionData) => {
  if (!predictionData) return null;

  const { tbU, bbU, bbTb } = predictionData;

  return {
    "tb-u": tbU,
    "bb-u": bbU,
    "bb-tb": bbTb,
  };
};

// Process Z-scores menjadi data untuk tampilan
export const processGrowthStatuses = (predictionData) => {
  const zScoreMapping = mapPredictionData(predictionData);

  const results = [];
  const indicatorOrder = ["tb-u", "bb-u", "bb-tb"];

  indicatorOrder.forEach((indicator) => {
    const zScore = zScoreMapping[indicator];

    if (zScore !== undefined && zScore !== null && !isNaN(parseFloat(zScore))) {
      const parsedZScore = parseFloat(zScore);
      const interpretation = whoCalculator.interpretZScore(
        indicator,
        parsedZScore,
      );
      const detailed = whoCalculator.getDetailedInterpretation(
        indicator,
        parsedZScore,
      );

      results.push({
        name: whoCalculator.getIndicatorName(indicator),
        value: parsedZScore,
        status: interpretation,
        percentage: detailed.percentage,
        healthStatus: detailed.healthStatus,
        color: whoCalculator.getStatusColor(interpretation),
      });
    }
  });

  return results;
};

// Progress bar color utilities
export const getProgressColorByPercentage = (percentage) => {
  if (percentage >= 80) return "bg-green-500";
  if (percentage >= 50) return "bg-yellow-500";
  return "bg-red-500";
};

// Status color utilities
export const getStatusColorClass = (color) => {
  switch (color) {
    case "green":
      return "text-green-600 bg-green-50";
    case "yellow":
      return "text-yellow-600 bg-yellow-50";
    case "red":
      return "text-red-600 bg-red-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};
