<script setup>
import WelcomeBanner from "../components/auth/WelcomeBanner.vue";
import RegisterForm from "../components/auth/RegisterForm.vue";
</script>

<template>
  <div
    class="md:w-[30rem] lg:w-full lg:max-w-3xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col lg:flex-row"
  >
    <WelcomeBanner class="hidden lg:block lg:w-1/2" />
    <RegisterForm class="p-6" />
  </div>
</template>

<style scoped></style>
