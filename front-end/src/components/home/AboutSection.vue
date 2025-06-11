<script setup>
import { ClipboardList, ShieldCheck, CircleAlert } from "lucide-vue-next";

const items = [
  {
    icon: ClipboardList,
    title: "Pemantauan Berkala Data",
    description:
      "Pantau pertumbuhan anak secara berkala dengan input data yang mudah dan visualisasi yang jelas.",
  },
  {
    icon: ShieldCheck,
    title: "Deteksi Risiko Stunting",
    description:
      "Algoritma kami membantu mendeteksi risiko stunting berdasarkan data pertumbuhan anak.",
  },
  {
    icon: CircleAlert,
    title: "Rekomendasi Personalisasi",
    description:
      "Dapatkan rekomendasi nutrisi dan aktivitas yang disesuaikan dengan kebutuhan anak Anda.",
  },
];
</script>

<template>
  <section class="py-12 px-8 md:px-14 lg:py-20 lg:pb-25 lg:px-38">
    <div class="container mx-auto">
      <div class="text-center mb-12">
        <h1
          class="font-montserrat tracking-wider font-bold mb-1 text-sm text-tertiary"
        >
          MISI KAMI
        </h1>
        <h2
          class="font-montserrat text-2xl md:text-3xl font-bold text-gray-800 mb-4"
        >
          Tentang Early Nourish
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto text-base md:text-sm">
          Kami berkomitmen untuk membantu orang tua memantau pertumbuhan anak
          dan mencegah stunting sejak dini.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div class="order-1 flex justify-center">
          <img
            src="../../assets/gambar-about-us.png"
            alt="Mother and Child"
            class="w-full max-w-md rounded-lg shadow-2xl drop-shadow-2xl drop-shadow-[#D1F1DB] shadow-[#D1F1DB] bg-[#D1F1DB] mb-10"
          />
        </div>

        <div class="order-2 md:order-1">
          <div class="space-y-6">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="flex items-center"
            >
              <div
                class="bg-linear-65 from-[#4ADE80] to-[#22C55E] p-3 rounded-lg mr-4 shadow-lg inset-shadow-xs inset-shadow-gray-800"
              >
                <component :is="item.icon" class="text-white font-bold" />
              </div>
              <div>
                <h3 class="font-semibold text-lg mb-2">
                  {{ item.title }}
                </h3>
                <p class="text-gray-600 text-base">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
