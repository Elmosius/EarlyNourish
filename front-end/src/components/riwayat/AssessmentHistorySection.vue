<script setup>
import { ref, computed, onMounted } from "vue";
import { FileText } from "lucide-vue-next";
import AssessmentTimelineCard from "../template/AssessmentCardTemplate.vue";

import {
  getFilteredAssessments,
  FILTER_OPTIONS,
  SORT_OPTIONS,
} from "../../utils/assessment";
import LoadingSpinner2 from "../ui/LoadingSpinner2.vue";

const props = defineProps({
  historyData: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["view-details", "show-menu", "load-more"]);

const selectedFilter = ref("all");
const sortOrder = ref("newest");
const isLoading = ref(false);
const hasMoreData = ref(true);

const processedAssessments = computed(() => {
  return getFilteredAssessments(
    props.historyData,
    selectedFilter.value,
    sortOrder.value,
  );
});

const hasAssessments = computed(() => {
  return props.historyData && props.historyData.length > 0;
});

const hasValidAssessments = computed(() => {
  return processedAssessments.value.length > 0;
});

const applyFilter = () => {
  // Computed will automatically recalculate
};

const applySorting = () => {
  // Computed will automatically recalculate
};

const handleViewDetails = (assessment) => {
  emit("view-details", assessment);
};

const handleShowMenu = (assessment) => {
  emit("show-menu", assessment);
};

const loadMore = () => {
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    hasMoreData.value = false;
    emit("load-more");
  }, 1000);
};

const debugData = () => {
  if (props.historyData && props.historyData.length > 0) {
    console.log("Sample data structure:", props.historyData[0]);
    console.log("Available fields:", Object.keys(props.historyData[0]));
  }
};

onMounted(() => {
  // debugData();
});
</script>

<template>
  <section class="px-8 py-8 md:px-14 lg:px-38">
    <div class="container max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6">
      <div class="flex justify-between items-center mb-8">
        <h2 class="font-bold text-gray-800">Riwayat Asesmen</h2>

        <div class="items-center gap-3" v-if="hasAssessments">
          <select
            v-model="selectedFilter"
            @change="applyFilter"
            class="text-base md:text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tertiary bg-white my-2 mx-2"
          >
            <option
              v-for="option in FILTER_OPTIONS"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>

          <select
            v-model="sortOrder"
            @change="applySorting"
            class="text-base md:text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tertiary bg-white mx-2"
          >
            <option
              v-for="option in SORT_OPTIONS"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="relative" v-if="hasValidAssessments">
        <div class="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>

        <div class="space-y-6">
          <AssessmentTimelineCard
            v-for="assessment in processedAssessments"
            :key="assessment.id"
            :assessment="assessment"
            @view-details="handleViewDetails"
            @show-menu="handleShowMenu"
          />
        </div>

        <div
          v-if="hasMoreData && processedAssessments.length >= 10"
          class="text-center mt-8"
        >
          <button
            @click="loadMore"
            :disabled="isLoading"
            class="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <LoadingSpinner2 v-if="isLoading" />
            <span class="text-base">Memuat lebih banyak</span>
          </button>
        </div>
      </div>

      <div v-else class="text-center py-16">
        <div class="text-gray-400 mb-4">
          <FileText class="h-20 w-20 mx-auto" />
        </div>

        <div v-if="!hasAssessments">
          <h3 class="font-medium text-gray-600 mb-2 text-lg">
            Belum Ada Riwayat Asesmen
          </h3>
          <p class="text-gray-500">
            Lakukan asesmen pertama untuk melihat riwayat perkembangan anak
            Anda.
          </p>
        </div>

        <div v-else>
          <h3 class="font-medium text-gray-800 mb-2">Tidak Ada Data Asesmen</h3>
          <p class="text-gray-500 text-base">
            Belum ada riwayat asesmen yang tersedia untuk filter yang dipilih.
          </p>
          <button
            @click="
              selectedFilter = 'all';
              sortOrder = 'newest';
            "
            class="mt-4 text-secondary hover:text-secondary/80 underline text-sm"
          >
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.transition-colors {
  transition:
    background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
}
</style>
