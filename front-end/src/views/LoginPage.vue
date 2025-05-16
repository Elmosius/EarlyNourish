<script setup>
import WelcomeBanner from "../components/auth/WelcomeBanner.vue";
import LoginForm from "../components/auth/LoginForm.vue";
</script>

<template>
  <div
    class="w-full max-w-3xl h-[500px] bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row"
  >
    <WelcomeBanner />
    <LoginForm />
  </div>
</template>

<style scoped></style>
