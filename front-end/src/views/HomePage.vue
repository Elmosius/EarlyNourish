<script setup>
import { useCounterStore } from "../stores/counter.js";
import HeroSection from "../components/home/HeroSection.vue";
const counter = useCounterStore();
</script>

<template>
  <HeroSection />
</template>

<style scoped></style>
