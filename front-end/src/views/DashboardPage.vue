<script setup>
import ProfileSection from "../components/dashboard/ProfileSection.vue";
import InfoSection from "../components/dashboard/InfoSection.vue";
import StatusPertumbuhan from "../components/dashboard/StatusPertumbuhan.vue";
import Trajektori from "../components/dashboard/Trajektori.vue";
import Riseko from "../components/dashboard/Riseko.vue";
import Rekomendasi from "../components/dashboard/Rekomendasi.vue";
import LangkahSelanjutnya from "../components/dashboard/LangkahSelanjutnya.vue";
import RencanaLanjutan from "../components/dashboard/RencanaLanjutan.vue";
import Feedback from "../components/dashboard/Feedback.vue";

import LoadingSpinner from "../components/ui/LoadingSpinner.vue";

import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { storeToRefs } from "pinia";
import { useAuthStore, useProfileStore } from "../stores/index.js";
import { getPrediction } from "../api/predict.js";
import ErrorMessage from "../components/ui/ErrorMessage.vue";

const route = useRoute();
const profileStore = useProfileStore();
const authStore = useAuthStore();
const { profile } = storeToRefs(profileStore);
const { user: authUser } = storeToRefs(authStore);

const predictionData = ref(null);
const isLoading = ref(true);
const error = ref(null);

const fetchPredictionData = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const userId = authUser.value?.userId;
    const predictionId = route.params.id;

    if (userId && predictionId) {
      const response = await getPrediction(userId, predictionId);
      predictionData.value = response.Result;
    }
  } catch (err) {
    error.value = "Gagal mengambil data prediksi";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (authUser.value) {
    fetchPredictionData();
  }
});
</script>

<template>
  <div class="bg-quaternary">
    <LoadingSpinner v-if="isLoading" />

    <ErrorMessage :message="error" v-else-if="error" />

    <div v-else>
      <ProfileSection :predictionData="predictionData" />
      <InfoSection :predictionData="predictionData" :profile="profile" />
      <StatusPertumbuhan :predictionData="predictionData" />
      <Trajektori :predictionData="predictionData" />
      <Riseko :predictionData="predictionData" />
      <Rekomendasi />
      <RencanaLanjutan />
      <LangkahSelanjutnya />
      <Feedback />
    </div>
  </div>
</template>

<style scoped></style>
