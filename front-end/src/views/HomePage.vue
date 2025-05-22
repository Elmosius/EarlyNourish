<script setup>
import { useCounterStore } from "../stores/counter.js";
import HeroSection from "../components/home/HeroSection.vue";
import AboutSection from "../components/home/AboutSection.vue";
import FeatureSection from "../components/home/FeatureSection.vue";
import CaraKerjaSection from "../components/home/CaraKerjaSection.vue";
const counter = useCounterStore();
</script>

<template>
  <HeroSection />
  <AboutSection />
  <FeatureSection />
  <CaraKerjaSection />
</template>

<style scoped></style>
