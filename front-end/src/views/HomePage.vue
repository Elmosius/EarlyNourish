<script setup>
import { useCounterStore } from "../stores/counter.js";

const counter = useCounterStore();
</script>

<template>
  <h1>ini home</h1>
  <p>Counter: {{ counter.count }}</p>
</template>

<style scoped></style>
