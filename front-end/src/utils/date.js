export const formatDateForInput = (dateValue) => {
  if (!dateValue) return "";

  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "";

    return date.toISOString().split("T")[0];
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

export const isValidDate = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const calculateAgeInMonths = (birthDate) => {
  if (!birthDate) return 0;

  const birth = new Date(birthDate);
  const current = new Date();

  let months = (current.getFullYear() - birth.getFullYear()) * 12;
  months += current.getMonth() - birth.getMonth();

  if (current.getDate() < birth.getDate()) {
    months--;
  }

  return Math.max(0, months);
};
