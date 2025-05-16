<script setup>
import { ref } from "vue";
import FeatureItem from "./FeatureItem.vue";

const title = ref("Selamat Datang Kembali!");
const description = ref(
  "Masukkan data pribadi Anda untuk menggunakan semua fitur dari website kami.",
);
const features = ref([
  "Data aman dan terenkripsi",
  "Dukungan pelanggan 24/7",
  "Fitur gratis",
]);
</script>

<template>
  <div class="bg-secondary text-white p-8 md:p-13 md:w-1/2">
    <h2 class="text-3xl font-bold mb-6 mt-5">{{ title }}</h2>
    <p class="mb-8 text-[0.9rem]">{{ description }}</p>

    <div class="space-y-2">
      <FeatureItem
        v-for="(feature, index) in features"
        :key="index"
        :text="feature"
      />
    </div>
  </div>
</template>

<style scoped></style>
