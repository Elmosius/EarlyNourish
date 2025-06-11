export const RISK_LEVELS = {
  HIGH: 70,
  MEDIUM_MIN: 30,
  MEDIUM_MAX: 70,
  LOW: 30,
};

export const FILTER_OPTIONS = [
  { value: "all", label: "Semua" },
  { value: "high-risk", label: "Risiko Tinggi" },
  { value: "medium-risk", label: "Risiko Sedang" },
  { value: "low-risk", label: "Risiko Rendah" },
  { value: "recent", label: "3 Bulan Terakhir" },
];

export const SORT_OPTIONS = [
  { value: "newest", label: "Terbaru" },
  { value: "oldest", label: "Terlama" },
  { value: "risk-high", label: "Risiko Tertinggi" },
  { value: "risk-low", label: "Risiko Terendah" },
];

export const STUNTING_RISK_MAPPING = {
  "severely stunting": 85,
  stunting: 65,
  normal: 20,
  default: 0,
};

export const isValidAssessmentEntry = (entry) => {
  return !!(
    entry.predictionId &&
    entry.risikoStunting &&
    entry.bb &&
    entry.tb &&
    entry.usia &&
    entry.createdAt
  );
};

export const getRiskPercentage = (riskCategory) => {
  const normalizedRisk = riskCategory.toLowerCase();
  return STUNTING_RISK_MAPPING[normalizedRisk] || STUNTING_RISK_MAPPING.default;
};

export const calculateBMI = (weight, height) => {
  if (!weight || !height) return 0;
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return Math.round(bmi * 10) / 10;
};

export const formatAge = (ageInMonths) => {
  const age = parseInt(ageInMonths);
  if (age < 12) {
    return `${age} Bulan`;
  } else {
    const years = Math.floor(age / 12);
    const months = age % 12;
    if (months === 0) {
      return `${years} Tahun`;
    } else {
      return `${years} Tahun ${months} Bulan`;
    }
  }
};

const safeParseFloat = (value, defaultValue = 0) => {
  if (value === null || value === undefined || value === "") {
    return defaultValue;
  }
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

export const transformToAssessment = (entry, index) => {
  const riskPercentage = getRiskPercentage(entry.risikoStunting);
  const weight = parseFloat(entry.bb);
  const height = parseFloat(entry.tb);
  const bmi = calculateBMI(weight, height);

  // Pastikan tbU, bbU, bbTb tidak null/undefined
  const tbU = safeParseFloat(entry.tbU, 0);
  const bbU = safeParseFloat(entry.bbU, 0);
  const bbTb = safeParseFloat(entry.bbTb, 0);

  return {
    id: entry.predictionId || `assessment-${index}`,
    predictionId: entry.predictionId,
    ageLabel: formatAge(entry.usia),
    age: parseInt(entry.usia),
    date: entry.createdAt.split("T")[0],
    height: height,
    weight: weight,
    heightByAge: tbU, // Gunakan tbU yang sudah diproses
    weightByAge: bbU, // Gunakan bbU yang sudah diproses
    tbU: tbU,
    bbTb: bbTb,
    bbU: bbU,
    riskPercentage: riskPercentage,
    riskLevel: riskPercentage,
    riskCategory: entry.risikoStunting,
    bmi: bmi,
    createdAt: entry.createdAt,
    originalEntry: entry,
  };
};

export const processAssessmentData = (historyData) => {
  if (!historyData || !Array.isArray(historyData)) {
    return [];
  }

  return historyData
    .filter(isValidAssessmentEntry)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map(transformToAssessment);
};

export const filterAssessments = (assessments, filterType) => {
  switch (filterType) {
    case "high-risk":
      return assessments.filter((a) => a.riskLevel >= RISK_LEVELS.HIGH);

    case "medium-risk":
      return assessments.filter(
        (a) =>
          a.riskLevel >= RISK_LEVELS.MEDIUM_MIN &&
          a.riskLevel < RISK_LEVELS.MEDIUM_MAX,
      );

    case "low-risk":
      return assessments.filter((a) => a.riskLevel < RISK_LEVELS.LOW);

    case "recent":
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return assessments.filter((a) => new Date(a.date) >= threeMonthsAgo);

    case "all":
    default:
      return assessments;
  }
};

export const sortAssessments = (assessments, sortOrder) => {
  const sorted = [...assessments];

  switch (sortOrder) {
    case "newest":
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));

    case "oldest":
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));

    case "risk-high":
      return sorted.sort((a, b) => b.riskLevel - a.riskLevel);

    case "risk-low":
      return sorted.sort((a, b) => a.riskLevel - b.riskLevel);

    default:
      return sorted;
  }
};

export const getFilteredAssessments = (
  historyData,
  filterType = "all",
  sortOrder = "newest",
) => {
  const processedAssessments = processAssessmentData(historyData);
  const filteredAssessments = filterAssessments(
    processedAssessments,
    filterType,
  );
  const sortedAssessments = sortAssessments(filteredAssessments, sortOrder);

  return sortedAssessments;
};
