export const validateForm = (formData, rules) => {
  const errors = {};

  for (const field in rules) {
    const value = formData[field];
    const rule = rules[field];

    if (rule.required && !value) {
      errors[field] = `${rule.label || field} harus diisi.`;
      continue;
    }

    if (
      rule.type === "email" &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      errors[field] = `${rule.label || field} tidak valid.`;
    }

    if (
      rule.type === "email" &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      errors[field] = `* ${rule.label || field} harus email yang valid`;
    }

    if (rule.type === "number" && value) {
      const numericValue = parseFloat(value);
      if (isNaN(numericValue)) {
        errors[field] = `* ${rule.label || field} harus angka.`;
      } else {
        if (rule.min !== undefined && numericValue < rule.min) {
          errors[field] = `* ${rule.label || field} harus minimal ${rule.min}.`;
        }
        if (rule.max !== undefined && numericValue > rule.max) {
          errors[field] =
            `* ${rule.label || field} harus kurang dari ${rule.max}.`;
        }
      }
    }
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors,
  };
};
