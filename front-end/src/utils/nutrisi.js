import { Heart, Egg, Carrot, Milk, Leaf, Apple, Fish } from "lucide-vue-next";

export const containsText = (nutrisiArray, text) => {
  if (!Array.isArray(nutrisiArray)) return false;
  return nutrisiArray.some(
    (item) =>
      typeof item === "string" &&
      item.toLowerCase().includes(text.toLowerCase()),
  );
};

export const getRecommendedFoods = (nutrisiArray) => {
  if (!Array.isArray(nutrisiArray)) return [];

  const foodMappings = [
    {
      keyword: "telur",
      food: {
        name: "Telur",
        benefit: "Tinggi Protein",
        icon: Egg,
        bgColor: "bg-yellow-50",
        iconBgColor: "bg-yellow-100",
        iconColor: "text-yellow-600",
      },
    },
    {
      keyword: "ikan",
      food: {
        name: "Ikan",
        benefit: "Omega-3 & Protein",
        icon: Fish,
        bgColor: "bg-blue-50",
        iconBgColor: "bg-blue-100",
        iconColor: "text-blue-600",
      },
    },
    {
      keywords: ["bayam", "sayur hijau"],
      food: {
        name: "Sayuran Hijau",
        benefit: "Zat Besi & Folat",
        icon: Leaf,
        bgColor: "bg-green-50",
        iconBgColor: "bg-green-100",
        iconColor: "text-green-600",
      },
    },
    {
      keyword: "susu",
      food: {
        name: "Susu",
        benefit: "Kalsium & Vitamin D",
        icon: Milk,
        bgColor: "bg-indigo-50",
        iconBgColor: "bg-indigo-100",
        iconColor: "text-indigo-600",
      },
    },
  ];

  const defaultFood = {
    name: "Buah-buahan",
    benefit: "Vitamin & Serat",
    icon: Apple,
    bgColor: "bg-red-50",
    iconBgColor: "bg-red-100",
    iconColor: "text-red-600",
  };

  const foods = [];

  foodMappings.forEach((mapping) => {
    if (mapping.keyword && containsText(nutrisiArray, mapping.keyword)) {
      foods.push(mapping.food);
    } else if (
      mapping.keywords &&
      mapping.keywords.some((keyword) => containsText(nutrisiArray, keyword))
    ) {
      foods.push(mapping.food);
    }
  });

  // Add default item if not enough specific foods found
  if (foods.length < 4 && !foods.some((f) => f.name === defaultFood.name)) {
    foods.push(defaultFood);
  }

  return foods.slice(0, 4); // Limit to 4 items
};

export const getNutritionRecommendations = (nutrisiArray) => {
  if (!Array.isArray(nutrisiArray)) return [];

  return [
    {
      title: "ASI & Makanan Pendamping",
      description: containsText(nutrisiArray, "ASI")
        ? "Teruskan pemberian ASI dan tambahkan makanan pendamping sesuai usia"
        : "Berikan makanan bergizi seimbang sesuai tahap pertumbuhan anak",
      color: "green",
      icon: Heart,
    },
    {
      title: "Sumber Protein Berkualitas",
      description:
        "Berikan makanan kaya protein seperti telur, ikan, daging, dan kacang-kacangan untuk mendukung pertumbuhan optimal.",
      color: "yellow",
      icon: Egg,
    },
    {
      title: "Sayuran & Buah-buahan",
      description:
        "Pastikan anak mengonsumsi sayuran hijau dan buah-buahan untuk mendapat vitamin dan mineral penting.",
      color: "purple",
      icon: Carrot,
    },
  ];
};

export const getMealPlan = (nutrisiArray) => {
  if (!Array.isArray(nutrisiArray)) {
    return { breakfast: [], lunch: [], dinnerSnacks: [] };
  }

  const meals = nutrisiArray.map((item) => item.trim()).filter(Boolean);

  const mealCategories = {
    breakfast: ["bubur", "sarapan", "pagi"],
    lunch: ["nasi tim", "siang"],
    dinnerSnacks: ["snack", "camilan", "malam"],
  };

  return {
    breakfast: meals
      .filter((meal) =>
        mealCategories.breakfast.some((keyword) =>
          meal.toLowerCase().includes(keyword),
        ),
      )
      .slice(0, 4),
    lunch: meals
      .filter((meal) =>
        mealCategories.lunch.some((keyword) =>
          meal.toLowerCase().includes(keyword),
        ),
      )
      .slice(0, 4),
    dinnerSnacks: meals
      .filter((meal) =>
        mealCategories.dinnerSnacks.some((keyword) =>
          meal.toLowerCase().includes(keyword),
        ),
      )
      .slice(0, 4),
  };
};

export const getColorClasses = (color) => {
  const colorMappings = {
    green: {
      recommendation: "bg-quaternary",
      iconBg: "bg-green-200",
      iconColor: "text-tertiary",
      title: "text-green-800",
      description: "text-green-700",
    },
    purple: {
      recommendation: "bg-purple-100",
      iconBg: "bg-purple-200",
      iconColor: "text-purple-600",
      title: "text-purple-800",
      description: "text-purple-700",
    },
    yellow: {
      recommendation: "bg-yellow-100",
      iconBg: "bg-yellow-200",
      iconColor: "text-yellow-600",
      title: "text-yellow-800",
      description: "text-yellow-700",
    },
    default: {
      recommendation: "bg-gray-100",
      iconBg: "bg-gray-200",
      iconColor: "text-gray-600",
      title: "text-gray-800",
      description: "text-gray-700",
    },
  };

  return colorMappings[color] || colorMappings.default;
};

export const getMealTypeLabel = (mealType) => {
  const labels = {
    breakfast: "Sarapan",
    lunch: "Makan Siang",
    dinnerSnacks: "Makan Malam & Cemilan",
  };
  return labels[mealType] || mealType;
};
