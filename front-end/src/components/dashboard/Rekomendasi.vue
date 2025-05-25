<script setup>
import { Heart, Sun, Shield, Egg, Carrot, Milk, Leaf } from "lucide-vue-next";

const props = defineProps({
  recommendations: {
    type: Array,
    default: () => [
      {
        title: "Asupan Protein",
        description:
          "Perbanyak makan makanan kaya protein seperti telur, susu, kacang-kacangan, dan daging tanpa lemak.",
        color: "green",
        icon: Heart,
      },
      {
        title: "Makanan Kaya Vitamin A",
        description:
          "Makan buah dan sayuran berwarna orange dan kuning seperti wortel, ubi jalar, dan mangga.",
        color: "purple",
        icon: Sun,
      },
      {
        title: "Makanan Kaya Zat Besi",
        description:
          "Seperti sereal yang diperkaya zat besi, sayur hijau gelap, dan kacang-kacangan untuk mencegah anemia.",
        color: "yellow",
        icon: Shield,
      },
    ],
  },
  recommendedFoods: {
    type: Array,
    default: () => [
      {
        name: "Telur",
        benefit: "Tinggi Protein",
        icon: Egg,
        bgColor: "bg-yellow-50",
        iconBgColor: "bg-yellow-100",
        iconColor: "text-yellow-600",
      },
      {
        name: "Ubi Jalar",
        benefit: "Kaya Vitamin A",
        icon: Carrot,
        bgColor: "bg-orange-50",
        iconBgColor: "bg-orange-100",
        iconColor: "text-orange-600",
      },
      {
        name: "Yogurt",
        benefit: "Kalsium & Protein",
        icon: Milk,
        bgColor: "bg-blue-50",
        iconBgColor: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        name: "Bayam",
        benefit: "Zat Besi & Folat",
        icon: Leaf,
        bgColor: "bg-green-50",
        iconBgColor: "bg-green-100",
        iconColor: "text-green-600",
      },
    ],
  },
  mealPlan: {
    type: Object,
    default: () => ({
      breakfast: [
        "Telur Dadar dan Bayam",
        "Roti Gandum",
        "Irisan Pisang",
        "Susu (120ml)",
      ],
      lunch: ["Ubi Jalar", "Potongan Ayam", "Wortel Kukus", "Yogurt (60g)"],
      dinnerSnacks: [
        "Sup Kacang & Sayuran",
        "Nasi Merah",
        "Siang: Potongan Mangga",
        "Sore: Potongan Keju",
      ],
    }),
  },
});

const getRecommendationClass = (color) => {
  switch (color) {
    case "green":
      return "bg-quaternary";
    case "purple":
      return "bg-purple-100";
    case "yellow":
      return "bg-yellow-100";
    default:
      return "bg-gray-100";
  }
};

const getIconBgClass = (color) => {
  switch (color) {
    case "green":
      return "bg-green-200";
    case "purple":
      return "bg-purple-200";
    case "yellow":
      return "bg-yellow-200";
    default:
      return "bg-gray-200";
  }
};

const getIconColorClass = (color) => {
  switch (color) {
    case "green":
      return "text-tertiary";
    case "purple":
      return "text-purple-600";
    case "yellow":
      return "text-yellow-600";
    default:
      return "text-gray-600";
  }
};

const getTitleClass = (color) => {
  switch (color) {
    case "green":
      return "text-green-800";
    case "purple":
      return "text-purple-800";
    case "yellow":
      return "text-yellow-800";
    default:
      return "text-gray-800";
  }
};

const getDescriptionClass = (color) => {
  switch (color) {
    case "green":
      return "text-green-700";
    case "purple":
      return "text-purple-700";
    case "yellow":
      return "text-yellow-700";
    default:
      return "text-gray-700";
  }
};

const getMealTypeLabel = (mealType) => {
  const labels = {
    breakfast: "Sarapan",
    lunch: "Makan Siang",
    dinnerSnacks: "Makan Malam & Cemilan",
  };
  return labels[mealType] || mealType;
};
</script>

<template>
  <section class="px-8 py-3 md:px-14 lg:px-38">
    <div
      class="container mx-auto max-w-4xl bg-white rounded-xl shadow-xl mb-4 p-6"
    >
      <h2 class="font-bold text-gray-800 mb-4">
        Rekomendasi Nutrisi yang Dipersonalisasi
      </h2>

      <!-- Nutrition Recommendations -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div
          v-for="recommendation in recommendations"
          :key="recommendation.title"
          :class="getRecommendationClass(recommendation.color)"
          class="rounded-xl p-4 md:p-6"
        >
          <div class="flex items-start mb-3">
            <div
              :class="getIconBgClass(recommendation.color)"
              class="p-2 rounded-lg mr-3 flex-shrink-0"
            >
              <component
                :is="recommendation.icon"
                :class="getIconColorClass(recommendation.color)"
                class="h-5 w-5 md:h-6 md:w-6"
              />
            </div>
            <div class="flex-1">
              <h3
                :class="getTitleClass(recommendation.color)"
                class="font-bold text-base md:text-sm mb-2"
              >
                {{ recommendation.title }}
              </h3>
              <p
                :class="getDescriptionClass(recommendation.color)"
                class="text-base md:text-sm leading-relaxed"
              >
                {{ recommendation.description }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recommended Foods -->
      <h3 class="font-bold text-gray-800 mb-4">Makanan yang Disarankan</h3>
      <div
        class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6"
      >
        <div
          v-for="food in recommendedFoods"
          :key="food.name"
          :class="food.bgColor"
          class="rounded-xl p-4 md:p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer"
        >
          <div :class="food.iconBgColor" class="p-3 md:p-4 rounded-full mb-3">
            <component
              :is="food.icon"
              :class="food.iconColor"
              class="h-6 w-6 md:h-8 md:w-8"
            />
          </div>
          <h4 class="font-bold text-gray-800 text-base md:text-sm mb-1">
            {{ food.name }}
          </h4>
          <p class="text-xs md:text-sm text-gray-600">{{ food.benefit }}</p>
        </div>
      </div>

      <!-- Daily Meal Plan -->
      <div class="bg-blue-50 rounded-xl p-4 md:p-6">
        <h3 class="font-bold text-gray-800 mb-4">Rencana Makanan Harian</h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div v-for="(meals, mealType) in mealPlan" :key="mealType">
            <h4 class="font-bold text-blue-700 mb-3 text-sm md:text-base">
              {{ getMealTypeLabel(mealType) }}
            </h4>
            <ul class="space-y-2">
              <li
                v-for="meal in meals"
                :key="meal"
                class="flex items-center text-xs md:text-sm text-gray-700"
              >
                <div
                  class="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 flex-shrink-0"
                ></div>
                {{ meal }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.transition-shadow {
  transition: box-shadow 0.2s ease-in-out;
}
</style>
