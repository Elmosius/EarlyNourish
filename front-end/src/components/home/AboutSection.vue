<script setup>
import { ClipboardList, ShieldCheck, CircleAlert } from "lucide-vue-next";
</script>

<template>
  <section class="py-5">
    <div class="container mx-auto px-8">
      <div class="text-center mb-12">
        <h1
          class="font-montserrat tracking-wider font-bold mb-1 text-sm text-tertiary"
        >
          MISI KAMI
        </h1>
        <h2
          class="font-montserrat text-2xl md:text-3xl font-bold text-gray-800 mb-4"
        >
          Tentang Early Nourkids
        </h2>
        <p class="text-gray-600 text-base max-w-2xl mx-auto text-base">
          Kami berkomitmen untuk membantu orang tua memantau pertumbuhan anak
          dan mencegah stunting sejak dini.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div class="order-2 md:order-1">
          <div class="space-y-6">
            <div class="flex items-center">
              <div
                class="bg-linear-65 from-[#4ADE80] to-[#22C55E] p-3 rounded-lg mr-4 shadow-lg"
              >
                <ClipboardList class="text-white font-bold" />
              </div>
              <div>
                <h3 class="font-semibold text-lg mb-2">
                  Pemantauan Berkala Data
                </h3>
                <p class="text-gray-600 text-base">
                  Pantau pertumbuhan anak secara berkala dengan input data yang
                  mudah dan visualisasi yang jelas.
                </p>
              </div>
            </div>

            <div class="flex items-center">
              <div
                class="bg-linear-65 from-[#4ADE80] to-[#22C55E] p-3 rounded-lg mr-4 shadow-lg"
              >
                <ShieldCheck class="text-white font-bold" />
              </div>
              <div>
                <h3 class="font-semibold text-lg mb-2">
                  Deteksi Risiko Stunting
                </h3>
                <p class="text-gray-600 text-base">
                  Algoritma kami membantu mendeteksi risiko stunting berdasarkan
                  data pertumbuhan anak.
                </p>
              </div>
            </div>

            <div class="flex items-center">
              <div
                class="bg-linear-65 from-[#4ADE80] to-[#22C55E] p-3 rounded-lg mr-4 shadow-lg"
              >
                <CircleAlert class="text-white font-bold" />
              </div>
              <div>
                <h3 class="font-semibold text-lg mb-2">
                  Rekomendasi Personalisasi
                </h3>
                <p class="text-gray-600 text-base">
                  Dapatkan rekomendasi nutrisi dan aktivitas yang disesuaikan
                  dengan kebutuhan anak Anda.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="order-1 md:order-2 flex justify-center">
          <img
            src="../../assets/gambar-about-us.png"
            alt="Mother and Child"
            class="w-full max-w-sm rounded-lg shadow-lg bg-[#D1F1DB]"
          />
        </div>
      </div>
    </div>
  </section>
</template>
