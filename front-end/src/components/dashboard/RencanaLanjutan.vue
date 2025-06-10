<script setup>
import { Check } from "lucide-vue-next";
import { computed } from "vue";
import {
  transformRecommendations,
  calculateMilestones,
} from "../../utils/rekomendasi.js";

const props = defineProps({
  predictionData: {
    type: Object,
    default: null,
  },
  recommendedActions: {
    type: Array,
    default: () => [],
  },
  milestones: {
    type: Object,
    default: () => ({}),
  },
});

// Transform API data into recommended actions
const transformedActions = computed(() => {
  if (!props.predictionData) return props.recommendedActions;
  return transformRecommendations(
    props.predictionData.rekomendasi,
    props.recommendedActions,
  );
});

// Calculate milestone targets based on current measurements
const calculatedMilestones = computed(() => {
  return calculateMilestones(props.predictionData, props.milestones);
});
</script>

<template>
  <section class="px-8 py-3 md:px-14 lg:px-38">
    <div
      class="container mx-auto max-w-4xl bg-white rounded-xl shadow-xl mb-4 p-6"
    >
      <h2 class="font-bold text-gray-800 mb-6">Rencana Lanjutan</h2>

      <div class="flex flex-col lg:flex-row justify-between">
        <div class="w-full mb-8">
          <h3 class="font-bold text-gray-800 mb-4 text-base md:text-sm">
            Tindakan yang Disarankan
          </h3>

          <div class="space-y-4">
            <div
              v-for="action in transformedActions"
              :key="action.title"
              class="flex items-start gap-3"
            >
              <div class="flex-shrink-0 mt-0.5">
                <div
                  class="w-4 h-4 bg-tertiary rounded-full flex items-center justify-center"
                >
                  <Check class="h-2 w-2 text-white" />
                </div>
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-gray-800 text-base md:text-sm">
                  {{ action.title }}
                </h4>
                <p class="text-gray-600 text-xs md:text-base leading-relaxed">
                  {{ action.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full">
          <h3 class="font-bold text-gray-800 mb-4 text-base md:text-sm">
            Milestone Pertumbuhan
          </h3>

          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex justify-between items-center mb-6">
              <span class="font-medium text-gray-700 text-base md:text-sm">{{
                calculatedMilestones.period.label
              }}</span>
              <span class="text-tertiary font-medium text-base md:text-sm">{{
                calculatedMilestones.period.value
              }}</span>
            </div>

            <div class="space-y-6">
              <div
                v-for="milestone in calculatedMilestones.targets"
                :key="milestone.label"
                class="space-y-2"
              >
                <div class="flex justify-between items-center">
                  <span
                    class="font-medium text-gray-700 text-base md:text-sm"
                    >{{ milestone.label }}</span
                  >
                  <span
                    class="font-medium text-gray-800 text-base md:text-sm"
                    :class="milestone.targetColor"
                  >
                    {{ milestone.targetValue }}
                  </span>
                </div>

                <div
                  class="flex justify-between items-center text-xs md:text-sm text-gray-500"
                >
                  <span>Sekarang: {{ milestone.currentValue }}</span>
                  <span>Target: {{ milestone.targetChange }}</span>
                </div>

                <div class="mt-2">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-tertiary h-2 rounded-full transition-all duration-300"
                      :style="{ width: milestone.progressPercentage + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
