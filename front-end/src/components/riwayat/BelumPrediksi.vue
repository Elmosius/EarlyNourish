<script setup></script>

<template>
  <section class="px-8 md:px-14 lg:px-38 py-10">
    <div class="container mx-auto max-w-4xl">
      <div class="bg-white rounded-xl shadow-xl p-6 text-center">
        <h3 class="font-bold text-gray-800 mb-3">Belum Ada Data Prediksi</h3>
        <p class="text-gray-600 mb-6 text-base">
          Anda belum pernah melakukan prediksi stunting. Silakan lakukan
          prediksi terlebih dahulu.
        </p>
        <router-link
          to="/assessment"
          class="bg-secondary hover:bg-secondary/90 text-white py-2 px-6 rounded-lg transition-colors text-base md:text-sm"
        >
          Lakukan Prediksi
        </router-link>
      </div>
    </div>
  </section>
</template>
