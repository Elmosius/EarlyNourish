// info section
export const getStatusCircleClass = (riskStatus) => {
  const baseClass = "inline-block w-3 h-3 mr-1 rounded-full";

  switch (riskStatus) {
    case "Stunting Ringan":
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
    case "Stunting Ringan":
      return `${baseClass} bg-yellow-100 text-yellow-800`;
    case "Normal":
      return `${baseClass} bg-quaternary text-tertiary`;
    case "Stunting Berat":
      return `${baseClass} bg-red-100 text-red-800`;
    default:
      return `${baseClass} bg-gray-100 text-gray-800`;
  }
};
