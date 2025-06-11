<script setup>
import { computed } from "vue";
import { Utensils } from "lucide-vue-next";
import {
  getRecommendedFoods,
  getNutritionRecommendations,
  getMealPlan,
  getColorClasses,
  getMealTypeLabel,
} from "../../utils/nutrisi.js";

const props = defineProps({
  predictionData: {
    type: Object,
    required: true,
  },
});

const nutritionRecommendations = computed(() => {
  if (!props.predictionData?.nutrisi) return [];
  return getNutritionRecommendations(props.predictionData.nutrisi);
});

const recommendedFoods = computed(() => {
  if (!props.predictionData?.nutrisi) return [];
  return getRecommendedFoods(props.predictionData.nutrisi);
});

const mealPlan = computed(() => {
  if (!props.predictionData?.nutrisi)
    return { breakfast: [], lunch: [], dinnerSnacks: [] };
  return getMealPlan(props.predictionData.nutrisi);
});

const getRecommendationClass = (color) => getColorClasses(color).recommendation;
const getIconBgClass = (color) => getColorClasses(color).iconBg;
const getIconColorClass = (color) => getColorClasses(color).iconColor;
const getTitleClass = (color) => getColorClasses(color).title;
const getDescriptionClass = (color) => getColorClasses(color).description;
</script>

<template>
  <section class="px-8 py-3 md:px-14 lg:px-38">
    <div
      class="container mx-auto max-w-4xl bg-white rounded-xl shadow-xl mb-4 p-6"
    >
      <h2 class="font-bold text-gray-800 mb-4">
        Rekomendasi Nutrisi yang Dipersonalisasi
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div
          v-for="recommendation in nutritionRecommendations"
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

      <div
        v-if="
          mealPlan.breakfast.length ||
          mealPlan.lunch.length ||
          mealPlan.dinnerSnacks.length
        "
      >
        <h3 class="font-bold text-gray-800 mb-4">Contoh Menu Harian</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="(meals, mealType) in mealPlan"
            :key="mealType"
            class="bg-gray-50 rounded-xl p-5"
          >
            <h4 class="font-bold text-gray-800 mb-3 flex items-center">
              <Utensils class="w-4 h-4 mr-2 text-gray-600" />
              {{ getMealTypeLabel(mealType) }}
            </h4>
            <ul v-if="meals.length" class="space-y-2">
              <li
                v-for="(meal, index) in meals"
                :key="index"
                class="text-sm text-gray-700 flex"
              >
                <span class="mr-2">•</span>
                <span>{{ meal }}</span>
              </li>
            </ul>
            <p v-else class="text-sm text-gray-500 italic">
              Tidak ada rekomendasi spesifik
            </p>
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
