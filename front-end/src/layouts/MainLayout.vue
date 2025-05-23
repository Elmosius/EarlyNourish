<script setup>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <Navbar />

  <main class="mx-auto">
    <slot></slot>
  </main>

  <Footer />
</template>

<style scoped></style>
