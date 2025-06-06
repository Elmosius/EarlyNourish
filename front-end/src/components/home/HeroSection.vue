<script setup></script>

<template>
  <section class="py-12 px-8 md:px-14 lg:px-38 z-10 bg-gray-50">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
        <div class="order-2 md:order-1">
          <h1
            class="text-4xl lg:text-4xl xl:text-5xl font font-bold text-gray-800 mb-4 font-montserrat"
          >
            Deteksi Dini <span class="text-secondary">Risiko Stunting</span>
          </h1>
          <p class="text-gray-600 mb-8 text-base md:text-sm">
            Tumbuh sehat dimulai dari sekarang! Dengan analisis data pintar dan
            nutrisi yang disesuaikan, kami bantu si Kecil berkembang optimal!
          </p>
          <div class="flex flex-row gap-4">
            <router-link
              to="/assessment"
              class="text-base md:text-sm bg-linear-to-r from-[#4E586B] to-[#4ADE80] hover:opacity-85 text-white font-medium px-4 py-2 rounded-4xl transition duration-300 shadow-lg"
            >
              Mulai Penilaian
            </router-link>
            <router-link
              :to="{ path: '/', hash: '#carakerja-home' }"
              class="text-base md:text-sm border border-tertiary text-tertiary hover:bg-green-50 font-medium px-4 py-2 rounded-4xl transition duration-300 shadow-lg"
            >
              Selengkapnya
            </router-link>
          </div>
          <div class="mt-8 flex items-center">
            <div class="flex -space-x-2">
              <img
                src="/logo.png"
                alt="User"
                class="w-9 h-9 rounded-full border-2 border-white"
              />
              <img
                src="/logo.png"
                alt="User"
                class="w-9 h-9 rounded-full border-2 border-white"
              />
              <img
                src="/logo.png"
                alt="User"
                class="w-9 h-9 rounded-full border-2 border-white"
              />
            </div>
            <div class="ml-4">
              <p class="text-base">Telah dipercaya 500+ orangtua</p>
              <div class="flex items-center">
                <div class="flex">
                  <span v-for="i in 5" :key="i" class="text-yellow-400">★</span>
                </div>
                <span class="text-base ml-2 text-gray-600">4.9/5.0</span>
              </div>
            </div>
          </div>
        </div>

        <div class="order-2 lg:order-2 flex justify-center relative">
          <div class="absolute oval-shadow"></div>
          <img
            src="../../assets/card-home-tab-desktop.png"
            alt="App Preview"
            class="w-20xl md:max-w-xl lg:max-w-md xl:max-w-xl relative z-10 hidden md:block"
          />
          <img
            src="../../assets/card-home-mobile.png"
            alt="App Preview"
            class="w-full max-w-sm md:max-w-md relative z-10 md:hidden"
          />
        </div>
      </div>
      <div class="mt-2 lg:mt-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="p-4">
            <p class="text-xl font-bold text-tertiary mb-2">30%</p>
            <p class="text-gray-600 text-sm">Pengurangan Stunting</p>
          </div>

          <div class="p-4">
            <p class="text-xl font-bold text-tertiary mb-2">10+</p>
            <p class="text-gray-600 text-sm">Rekomendasi Nutrisi</p>
          </div>

          <div class="p-4">
            <p class="text-xl font-bold text-tertiary mb-2">15K+</p>
            <p class="text-gray-600 text-sm">Anak-Anak Dipantau</p>
          </div>

          <div class="p-4">
            <p class="text-xl font-bold text-tertiary mb-2">X%</p>
            <p class="text-gray-600 text-sm">Ketepatan Prediksi</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.oval-shadow {
  border-left: 1px solid black;
  width: 100%;
  height: 90%;
  background: rgba(167, 243, 208, 0.5);
  border-radius: 50% / 80%;
  filter: blur(40px);
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
