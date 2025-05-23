<script setup>
import { BarChart2Icon, ClipboardListIcon, CircleAlert } from "lucide-vue-next";

const benefits = [
  {
    icon: BarChart2Icon,
    title: "Pantau Pertumbuhan",
    description:
      "Pantau pertumbuhan anak sesuai standar WHO dan terima notifikasi jika ada tanda-tanda yang mengkhawatirkan.",
  },
  {
    icon: ClipboardListIcon,
    title: "Nutrisi Sesuai Kebutuhan",
    description:
      "Dapatkan rekomendasi nutrisi dan diet menu yang disesuaikan dengan kebutuhan spesifik anak Anda.",
  },
  {
    icon: CircleAlert,
    title: "Intervensi Dini",
    description:
      "Identifikasi masalah pertumbuhan sejak dini dan dapatkan panduan untuk menanganinya secara efektif.",
  },
];
</script>

<template>
  <section class="px-8 bg-quaternary py-12">
    <div class="container mx-auto">
      <h2
        class="text-2xl font-montserrat text-center font-bold text-gray-800 mb-4"
      >
        Mengapa Perlu Mengisi Asesmen Ini?
      </h2>
      <p class="text-gray-600 mb-8 text-center text-base">
        Asesmen lengkap ini membantu Anda memahami pertumbuhan anak, mencegah
        stunting, dan memberikan panduan nutrisi yang sesuai dengan kebutuhannya
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(benefit, index) in benefits"
          :key="index"
          :class="[
            'shadow-xl p-6 border-b-gray-50 rounded-lg bg-white font-montserrat text-justify',
            {
              'md:col-span-2 md:mx-auto md:max-w-sm lg:col-span-1 lg:mx-0 lg:max-w-none':
                index === benefits.length - 1 && benefits.length % 2 !== 0,
            },
          ]"
        >
          <div
            class="bg-linear-65 from-[#4ADE80] to-[#22C55E] shadow-lg p-3 inline-block rounded-4xl mb-4 inset-shadow-xs inset-shadow-gray-800"
          >
            <component :is="benefit.icon" class="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 class="font-semibold text-base mb-3">{{ benefit.title }}</h3>
            <p class="text-base">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
