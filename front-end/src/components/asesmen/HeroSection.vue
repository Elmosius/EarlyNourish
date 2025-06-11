<script setup>
import { CheckCircle } from "lucide-vue-next";
</script>

<template>
  <section class="px-8 py-10 bg-quaternary md:px-14 lg:px-38">
    <div class="container mx-auto">
      <div
        class="flex flex-col items-center mb-8 lg:flex-row lg:justify-between"
      >
        <div class="max-w-2xl">
          <h1 class="text-3xl font-montserrat font-bold text-gray-800 mb-2">
            Penilaian Pertumbuhan Anak
          </h1>
          <p class="text-gray-600 mb-4">
            Lengkapi asesmen ini untuk memperoleh rekomendasi nutrisi yang
            disesuaikan dan pemantauan pertumbuhan guna mencegah stunting pada
            anak.
          </p>
          <div class="flex mb-6 text-tertiary">
            <CheckCircle class="h-5 w-5 mr-2 text-tertiary" />
            <p class="text-sm">
              Hanya membutuhkan waktu 5 menit untuk menyelesaikannya.
            </p>
          </div>
        </div>

        <div
          class="bg-transparent border-2 border-tertiary p-4 rounded-lg shadow-xl inset-shadow-2xs inset-shadow-tertiary my-6"
        >
          <img
            src="../../assets/gambar-asesmen.png"
            alt="Doctor examining child"
            class="w-full max-w-sm md:max-w-[300px] lg:max-w-[450px] rounded-lg"
          />
        </div>
      </div>
    </div>
  </section>
</template>
