<script setup>
import ProfileSection from "../components/dashboard/ProfileSection.vue";
import InfoSection from "../components/dashboard/InfoSection.vue";
import StatusPertumbuhan from "../components/dashboard/StatusPertumbuhan.vue";
import Trajektori from "../components/dashboard/Trajektori.vue";
import Riseko from "../components/dashboard/Riseko.vue";
import Rekomendasi from "../components/dashboard/Rekomendasi.vue";
import LangkahSelanjutnya from "../components/dashboard/LangkahSelanjutnya.vue";
import RencanaLanjutan from "../components/dashboard/RencanaLanjutan.vue";
import Feedback from "./Feedback.vue";
</script>

<template>
  <div class="bg-quaternary">
    <ProfileSection />
    <InfoSection />
    <StatusPertumbuhan />
    <Trajektori />
    <Riseko />
    <Rekomendasi />
    <RencanaLanjutan />
    <LangkahSelanjutnya />
    <Feedback />
  </div>
</template>

<style scoped></style>
