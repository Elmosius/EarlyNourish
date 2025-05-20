<script setup>
import { ref } from "vue";
import { MenuIcon, XIcon } from "lucide-vue-next";
const isMenuOpen = ref(false);
</script>

<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <div
      class="container mx-auto py-3 flex items-center lg:gap-4 px-4 justify-between lg:justify-evenly"
    >
      <div class="flex items-center">
        <img src="/logo.png" alt="Early Nourish" class="h-8 w-8" />
        <span class="ml-2 font-semibold text-gray-800">Early Nourish</span>
      </div>

      <div class="flex items-center">
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="lg:hidden p-2 rounded-full hover:bg-gray-100"
        >
          <MenuIcon v-if="!isMenuOpen" class="h-6 w-6 text-gray-700" />
          <XIcon v-else class="h-6 w-6 text-gray-700" />
        </button>

        <nav class="hidden lg:flex items-center">
          <a href="#" class="text-gray-700 hover:text-tertiary font-medium px-6"
            >Beranda</a
          >
          <a href="#" class="text-gray-700 hover:text-tertiary font-medium px-6"
            >Tentang Kami</a
          >
          <a href="#" class="text-gray-700 hover:text-tertiary font-medium px-6"
            >Layanan</a
          >
          <a href="#" class="text-gray-700 hover:text-tertiary font-medium px-6"
            >Cara Kerja</a
          >
          <a href="#" class="text-gray-700 hover:text-tertiary font-medium px-6"
            >Testimoni</a
          >
          <div class="ml-6">
            <button
              class="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-medium transition-colors"
            >
              <div
                class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"
              >
                <span class="text-sm">El</span>
              </div>
              <span>Elmosius Suli</span>
            </button>
          </div>
        </nav>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="lg:hidden bg-white border-t border-gray-200">
      <div class="container mx-auto px-4 py-3">
        <nav class="flex flex-col space-y-3">
          <a href="#" class="text-gray-700 hover:text-tertiary font-medium py-2"
            >Beranda</a
          >
          <a href="#" class="text-gray-700 hover:text-tertiary font-medium py-2"
            >Tentang Kami</a
          >
          <a href="#" class="text-gray-700 hover:text-tertiary font-medium py-2"
            >Layanan</a
          >
          <a href="#" class="text-gray-700 hover:text-tertiary font-medium py-2"
            >Cara Kerja</a
          >
          <a href="#" class="text-gray-700 hover:text-tertiary font-medium py-2"
            >Testimoni</a
          >
          <div class="py-2">
            <button
              class="flex items-center space-x-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-medium transition-colors"
            >
              <div
                class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"
              >
                <span class="text-sm">ES</span>
              </div>
              <span>Elmosius Suli</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
