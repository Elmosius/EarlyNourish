<script setup>
import ProfileSection from "../components/riwayat/ProfileSection.vue";
import InfoSection from "../components/dashboard/InfoSection.vue";
import ChartSection from "../components/riwayat/ChartSection.vue";
import AssessmentHistorySection from "../components/riwayat/AssessmentHistorySection.vue";
import LoadingSpinner from "../components/ui/LoadingSpinner.vue";

import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { storeToRefs } from "pinia";
import { useAuthStore, useProfileStore } from "../stores/index.js";
import { getUserHistory } from "../api/predict.js";
import ErrorMessage from "../components/ui/ErrorMessage.vue";
import BelumPrediksi from "../components/riwayat/BelumPrediksi.vue";

const route = useRoute();
const profileStore = useProfileStore();
const authStore = useAuthStore();
const { profile } = storeToRefs(profileStore);
const { user: authUser } = storeToRefs(authStore);

const historyData = ref(null);
const isLoading = ref(true);
const error = ref(null);

const fetchHistoryData = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const userId = authUser.value?.userId;
    if (userId) {
      const response = await getUserHistory(userId);
      historyData.value = response.Result;
    }
  } catch (err) {
    error.value = "Gagal mengambil data riwayat";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (authUser.value) {
    fetchHistoryData();
  }
});

const latestPrediction = computed(() => {
  if (!historyData.value || historyData.value.length === 0) {
    return {};
  }

  const validEntries = historyData.value
    .filter((entry) => entry.predictionId !== null)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (validEntries.length === 0) return {};

  return validEntries[0];
});

const hasValidPrediction = computed(() => {
  if (!historyData.value || historyData.value.length === 0) return false;
  return historyData.value.some((entry) => entry.predictionId !== null);
});
</script>

<template>
  <div class="bg-quaternary">
    <LoadingSpinner v-if="isLoading" />

    <ErrorMessage :message="error" v-else-if="error" />

    <div v-else>
      <ProfileSection />

      <BelumPrediksi v-if="!hasValidPrediction" />

      <div v-else>
        <InfoSection :predictionData="latestPrediction" :profile="profile" />
        <ChartSection :historyData="historyData" />
        <AssessmentHistorySection />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
