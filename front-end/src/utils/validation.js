export const validateForm = (formData, rules) => {
  const errors = {};

  for (const field in rules) {
    const value = formData[field];
    const rule = rules[field];

    if (rule.type === "file" && value) {
      if (rule.maxSize && value.size > rule.maxSize) {
        const maxSizeMB = rule.maxSize / 1048576;
        errors[field] =
          `${rule.label || field} harus kurang dari ${maxSizeMB} MB.`;
        continue;
      }

      if (rule.allowedTypes && !rule.allowedTypes.includes(value.type)) {
        errors[field] =
          `${rule.label || field} harus berformat ${rule.allowedTypes.join(", ")}.`;
        continue;
      }
    }

    if (rule.required) {
      if (typeof value === "boolean" && !value) {
        errors[field] = `${rule.label || field} harus disetujui.`;
        continue;
      }
      if (typeof value !== "boolean" && !value) {
        errors[field] = `${rule.label || field} harus diisi.`;
        continue;
      }
    }

    if (
      rule.type === "email" &&
      value &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    ) {
      errors[field] = `${rule.label || field} tidak valid.`;
    }

    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] =
        `${rule.label || field} minimal ${rule.minLength} karakter.`;
    }

    if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[field] =
        `${rule.label || field} maksimal ${rule.maxLength} karakter.`;
    }

    if (rule.matchesField && value !== formData[rule.matchesField]) {
      const targetFieldLabel =
        rules[rule.matchesField]?.label || rule.matchesField;
      errors[field] =
        `${rule.label || field} tidak cocok dengan ${targetFieldLabel}.`;
    }

    if (rule.pattern && value && !rule.pattern.test(value)) {
      errors[field] =
        `${rule.label || field} tidak sesuai format yang diharapkan.`;
    }

    if (rule.custom && typeof rule.custom === "function") {
      const customError = rule.custom(value, formData);
      if (customError) {
        errors[field] = customError;
      }
    }

    if (rule.type === "number" && value) {
      const numericValue = parseFloat(value);
      if (isNaN(numericValue)) {
        errors[field] = `${rule.label || field} harus angka.`;
      } else {
        if (rule.min !== undefined && numericValue < rule.min) {
          errors[field] = `${rule.label || field} harus minimal ${rule.min}.`;
        }
        if (rule.max !== undefined && numericValue > rule.max) {
          errors[field] =
            `${rule.label || field} harus kurang dari ${rule.max}.`;
        }
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors,
  };
};
