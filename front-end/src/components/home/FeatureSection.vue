<script setup>
import {
  BarChart2Icon,
  Zap,
  Ham,
  CalendarDays,
  Smartphone,
  MessagesSquare,
  ClipboardListIcon,
} from "lucide-vue-next";

const features = [
  {
    icon: BarChart2Icon,
    title: "Pemantauan Pertumbuhan",
    description:
      "Lacak dan visualisasikan pola pertumbuhan anak dari waktu ke waktu dengan grafik dan indikator yang mudah dipahami.",
  },
  {
    icon: Zap,
    title: "Peringatan Risiko",
    description:
      "Algoritma canggih menganalisis berbagai faktor untuk memprediksi risiko stunting sebelum gejala fisik muncul.",
  },
  {
    icon: Ham,
    title: "Pelacakan Gizi",
    description:
      "Dapatkan rekomendasi gizi yang disesuaikan berdasarkan kebutuhan individu dan ketersediaan pangan lokal.",
  },
  {
    icon: CalendarDays,
    title: "Pelacakan Perkembangan",
    description:
      "Pantau tonggak perkembangan anak dan terima peringatan jika anak tertinggal dari  kemajuan yang diharapkan.",
  },
  {
    icon: Smartphone,
    title: "Akses Mobile",
    description:
      "Akses semua fitur melalui platform ramah seluler, sehingga mudah digunakan bahkan di daerah terpencil.",
  },
  {
    icon: MessagesSquare,
    title: "Dukungan Komunitas",
    description:
      "Terhubung dengan orang tua lainnya untuk saling berbagi saran, dukungan, dan  pengalaman.",
  },
];
</script>

<template>
  <section class="py-12 md:px-14 bg-gray-50 px-8 lg:py-20 lg:px-38">
    <div class="container mx-auto">
      <div class="text-center mb-12">
        <h1
          class="font-montserrat tracking-wider font-bold mb-2 text-sm text-tertiary"
        >
          LAYANAN KAMI
        </h1>
        <h2
          class="font-montserrat text-2xl md:text-3xl font-bold text-gray-800 mb-4"
        >
          Fitur Utama
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto text-base md:text-sm">
          Platform kami menawarkan alat yang komprehensif untuk membantu tenaga
          kesehatan, orang tua, dan komunitas dalam mengatasi stunting pada anak
          secara efektif.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
        >
          <div class="h-3 bg-gradient-to-r from-[#4ADE80] to-[#22C55E]"></div>

          <div class="p-6 text-justify">
            <div
              class="bg-linear-65 from-[#4ADE80] to-[#22C55E] shadow-lg p-3 inline-block rounded-lg mb-4 inset-shadow-xs inset-shadow-gray-800"
            >
              <component :is="feature.icon" class="h-6 w-6 text-white" />
            </div>
            <h3 class="font-semibold text-lg mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 text-base">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
