<script setup>
import { HelpCircleIcon, ChevronRightIcon } from "lucide-vue-next";
</script>

<template>
  <section class="px-8">
    <div
      class="container mx-auto p-6 rounded-lg shadow-sm mb-8 border border-gray-100 px-8"
    >
      <div class="flex items-start">
        <div class="bg-green-100 p-2 rounded-full mr-4">
          <HelpCircleIcon class="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h3 class="font-montserrat text-sm font-medium mb-2">
            Butuh Bantuan?
          </h3>
          <p class="text-gray-600 text-sm mb-3 font-light text-justify">
            Jika Anda memiliki pertanyaan atau ingin bantuan dalam mengisi
            formulir, tim kami siap membantu.
          </p>
          <a
            href="#"
            class="text-green-600 font-medium flex items-center text-sm"
          >
            Contact Support
            <ChevronRightIcon class="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
