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

export const formatDateDisplay = (dateValue, options = {}) => {
  if (!dateValue) return "Belum ada data";

  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "Tanggal tidak valid";

    const defaultOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formatOptions = { ...defaultOptions, ...options };

    return date.toLocaleDateString("id-ID", formatOptions);
  } catch (error) {
    console.error("Error formatting date for display:", error);
    return "Tanggal tidak valid";
  }
};

export const formatDateShort = (dateValue) => {
  if (!dateValue) return "";

  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "";

    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date short:", error);
    return "";
  }
};

export const formatRelativeTime = (dateValue) => {
  if (!dateValue) return "";

  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return "";

    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return "Hari ini";
    } else if (diffInDays === 1) {
      return "Kemarin";
    } else if (diffInDays < 7) {
      return `${diffInDays} hari yang lalu`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} minggu yang lalu`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} bulan yang lalu`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return `${years} tahun yang lalu`;
    }
  } catch (error) {
    console.error("Error formatting relative time:", error);
    return "";
  }
};
