<script setup>
import { CheckCircle } from "lucide-vue-next";
</script>

<template>
  <section class="px-8 py-10 bg-quaternary">
    <div class="container mx-auto">
      <h1 class="text-3xl font-montserrat font-bold text-gray-800 mb-2">
        Penilaian Pertumbuhan Anak
      </h1>
      <p class="text-gray-600 mb-4">
        Lengkapi asesmen ini untuk memperoleh rekomendasi nutrisi yang
        disesuaikan dan pemantauan pertumbuhan guna mencegah stunting pada anak.
      </p>

      <div class="flex mb-6 text-tertiary">
        <CheckCircle class="h-5 w-5 mr-2 text-tertiary" />
        <p class="text-sm">
          Hanya membutuhkan waktu 5 menit untuk menyelesaikannya.
        </p>
      </div>

      <div
        class="bg-transparent border-2 border-tertiary p-4 rounded-lg shadow-xl inset-shadow-2xs inset-shadow-tertiary mb-6"
      >
        <img
          src="../../assets/gambar-asesmen.png"
          alt="Doctor examining child"
          class="w-full max-w-sm rounded-lg"
        />
      </div>
    </div>
  </section>
</template>
