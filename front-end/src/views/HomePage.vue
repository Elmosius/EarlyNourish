<script setup>
import { useCounterStore } from "../stores/counter.js";
import HeroSection from "../components/home/HeroSection.vue";
import AboutSection from "../components/home/AboutSection.vue";
const counter = useCounterStore();
</script>

<template>
  <HeroSection />

  <AboutSection />
</template>

<style scoped></style>
