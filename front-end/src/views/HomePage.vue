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
  <HeroSection id="home-hero" />
  <AboutSection id="about-home" />
  <FeatureSection id="feature-home" />
  <CaraKerjaSection id="carakerja-home" />
  <TestimoniSection id="testimoni-home" />
</template>

<style scoped></style>
