<script setup>
const steps = [
  {
    number: 1,
    title: "Pengumpulan Data",
    description:
      "Masukkan informasi dasar tentang anak, termasuk usia, berat badan, tinggi badan, dan kebiasaan makan.",
  },
  {
    number: 2,
    title: "Analisis Risiko",
    description:
      "Algoritma kami menganalisis data untuk menentukan tingkat risiko anak terhadap stunting.",
  },
  {
    number: 3,
    title: "Rencana yang Dipersonalisasi",
    description:
      "Dapatkan rencana gizi dan perawatan yang disesuaikan berdasarkan kebutuhan spesifik anak.",
  },
  {
    number: 4,
    title: "Dukungan Berkelanjutan",
    description:
      "Lacak perkembangan dari waktu ke waktu dan dapatkan rekomendasi yang diperbarui seiring pertumbuhan anak.",
  },
];
</script>

<template>
  <section class="py-10 lg:py-20 px-8 md:px-14 lg:px-38">
    <div class="container mx-auto">
      <div class="text-center mb-12">
        <h1
          class="font-montserrat tracking-wider text-center font-bold mb-2 text-sm text-tertiary"
        >
          PROSES KAMI
        </h1>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Cara Kerja
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto text-base">
          Proses sederhana kami membantu mengidentifikasi anak-anak yang
          berisiko dan memberikan intervensi yang dipersonalisasi untuk mencegah
          stunting.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="step in steps"
          :key="step.number"
          class="bg-white rounded-lg text-center"
        >
          <div
            class="bg-linear-65 from-[#4ADE80] to-[#22C55E] shadow-xl text-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 inset-shadow-xs inset-shadow-gray-800"
          >
            <span class="font-bold text-lg">{{ step.number }}</span>
          </div>
          <h3 class="font-semibold text-lg mb-2">{{ step.title }}</h3>
          <p class="text-gray-600 text-base">{{ step.description }}</p>
        </div>
      </div>

      <div class="mt-6 text-center">
        <router-link
          to="/assessment"
          class="bg-linear-to-r from-[#4E586B] to-[#4ADE80] hover:opacity-85 text-white font-medium py-3 px-4 rounded-4xl transition duration-300 shadow-xl"
        >
          Mulai Penilaian Sekarang
        </router-link>
      </div>
    </div>
  </section>
</template>
