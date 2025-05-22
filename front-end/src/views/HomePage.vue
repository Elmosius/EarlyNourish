<script setup>
import { useCounterStore } from "../stores/counter.js";
import HeroSection from "../components/home/HeroSection.vue";
import AboutSection from "../components/home/AboutSection.vue";
import FeatureSection from "../components/home/FeatureSection.vue";
import CaraKerjaSection from "../components/home/CaraKerjaSection.vue";
import TestimoniSection from "../components/home/TestimoniSection.vue";

const counter = useCounterStore();
</script>

<template>
  <HeroSection />
  <AboutSection />
  <FeatureSection />
  <CaraKerjaSection />
  <TestimoniSection />
</template>

<style scoped></style>
