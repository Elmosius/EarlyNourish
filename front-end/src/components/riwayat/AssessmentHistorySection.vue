<script setup>
import { ref, computed, onMounted } from "vue";
import { FileText } from "lucide-vue-next";
import AssessmentTimelineCard from "../template/AssessmentCardTemplate.vue";

const emit = defineEmits(["view-details", "show-menu", "load-more"]);

const selectedFilter = ref("all");
const sortOrder = ref("newest");
const isLoading = ref(false);
const hasMoreData = ref(true);

const sampleAssessments = ref([
  {
    id: 1,
    ageLabel: "Usia 18 Bulan",
    date: "2025-05-05",
    height: 76.5,
    weight: 9.2,
    heightByAge: -2.1,
    weightByAge: -1.8,
    riskPercentage: 60,
    riskLevel: 60,
    bmi: 15.7,
  },
  {
    id: 2,
    ageLabel: "Usia 15 Bulan",
    date: "2025-02-15",
    height: 74.8,
    weight: 8.8,
    heightByAge: -2.0,
    weightByAge: -1.5,
    riskPercentage: 58,
    riskLevel: 58,
    bmi: 15.3,
  },
  {
    id: 3,
    ageLabel: "Usia 12 Bulan",
    date: "2024-11-12",
    height: 72.5,
    weight: 9.4,
    heightByAge: -1.8,
    weightByAge: -1.2,
    riskPercentage: 52,
    riskLevel: 52,
    bmi: 17.9,
  },
  {
    id: 4,
    ageLabel: "Usia 9 Bulan",
    date: "2024-08-17",
    height: 69.8,
    weight: 7.9,
    heightByAge: -1.6,
    weightByAge: -1.0,
    riskPercentage: 45,
    riskLevel: 45,
    bmi: 16.2,
  },
  {
    id: 5,
    ageLabel: "Usia 6 Bulan",
    date: "2024-05-13",
    height: 65.7,
    weight: 7.1,
    heightByAge: -1.2,
    weightByAge: -0.8,
    riskPercentage: 28,
    riskLevel: 28,
    bmi: 16.4,
  },
  {
    id: 6,
    ageLabel: "Usia 3 Bulan",
    date: "2024-02-15",
    height: 60.1,
    weight: 5.8,
    heightByAge: -0.8,
    weightByAge: -0.5,
    riskPercentage: 15,
    riskLevel: 15,
    bmi: 16.1,
  },
]);

const filteredAssessments = computed(() => {
  let filtered = [...sampleAssessments.value];

  // Apply filter
  switch (selectedFilter.value) {
    case "high-risk":
      filtered = filtered.filter((a) => a.riskLevel >= 70);
      break;
    case "medium-risk":
      filtered = filtered.filter((a) => a.riskLevel >= 30 && a.riskLevel < 70);
      break;
    case "low-risk":
      filtered = filtered.filter((a) => a.riskLevel < 30);
      break;
    case "recent":
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      filtered = filtered.filter((a) => new Date(a.date) >= threeMonthsAgo);
      break;
  }

  // Apply sorting
  switch (sortOrder.value) {
    case "newest":
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "oldest":
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "risk-high":
      filtered.sort((a, b) => b.riskLevel - a.riskLevel);
      break;
    case "risk-low":
      filtered.sort((a, b) => a.riskLevel - b.riskLevel);
      break;
  }

  return filtered;
});

const applyFilter = () => {
  console.log("Filter applied:", selectedFilter.value);
};

const applySorting = () => {
  console.log("Sorting applied:", sortOrder.value);
};

const handleViewDetails = (assessment) => {
  emit("view-details", assessment);
};

const handleShowMenu = (assessment) => {
  emit("show-menu", assessment);
};

const loadMore = () => {
  isLoading.value = true;
  // Simulate API call
  setTimeout(() => {
    isLoading.value = false;
    hasMoreData.value = false; // For demo purposes
    emit("load-more");
  }, 1000);
};

onMounted(() => {
  console.log("Assessment History Section mounted");
});
</script>

<template>
  <section class="px-8 py-8 md:px-14 lg:px-38">
    <div class="container max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6">
      <div class="flex justify-between items-center mb-8">
        <h2 class="font-bold text-gray-800">Riwayat Asesmen</h2>

        <div class="items-center gap-3">
          <select
            v-model="selectedFilter"
            @change="applyFilter"
            class="text-base md:text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tertiary bg-white my-2 mx-2"
          >
            <option value="all">Semua</option>
            <option value="high-risk">Risiko Tinggi</option>
            <option value="medium-risk">Risiko Sedang</option>
            <option value="low-risk">Risiko Rendah</option>
            <option value="recent">3 Bulan Terakhir</option>
          </select>
          <select
            v-model="sortOrder"
            @change="applySorting"
            class="text-base md:text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tertiary bg-white mx-2"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="risk-high">Risiko Tertinggi</option>
            <option value="risk-low">Risiko Terendah</option>
          </select>
        </div>
      </div>

      <div class="relative">
        <div
          v-if="filteredAssessments.length > 0"
          class="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200 z-0"
        ></div>

        <div class="space-y-6">
          <AssessmentTimelineCard
            v-for="assessment in filteredAssessments"
            :key="assessment.id"
            :assessment="assessment"
            @view-details="handleViewDetails"
            @show-menu="handleShowMenu"
          />
        </div>
      </div>

      <div v-if="filteredAssessments.length === 0" class="text-center py-16">
        <div class="text-gray-400 mb-4">
          <FileText class="h-20 w-20 mx-auto" />
        </div>
        <h3 class="font-medium text-gray-600 mb-2 text-lg">
          Tidak ada data asesmen
        </h3>
        <p class="text-gray-500">
          Belum ada riwayat asesmen yang tersedia untuk filter yang dipilih.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.transition-colors {
  transition:
    color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;
}
</style>
