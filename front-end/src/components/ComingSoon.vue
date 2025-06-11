<script setup>
import { House, Undo2 } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <section class="px-8 md:px-14 lg:px-38">
    <div class="container mx-auto max-w-4xl">
      <div class="flex flex-col lg:flex-row">
        <img
          src="../assets/gambar-notfound.png"
          alt="Not Found"
          class="w-max max-w-64 mx-auto md:max-w-96"
        />

        <div class="flex flex-col gap-2 p-6">
          <h1 class="font-bold text-2xl lg:text-4xl">Coming Soon</h1>
          <h2 class="font-semibold text-xl lg:text-2xl">
            Halaman Sedang Dalam Pengembangan
          </h2>
          <p class="text-base text-gray-600 text-justify md:text-sm">
            Kami sedang mengembangkan halaman ini. Mohon bersabar, kami akan
            segera hadir dengan konten yang menarik dan bermanfaat.
          </p>

          <div class="flex flex-row justify-between font-semibold mt-5">
            <router-link
              to="/"
              class="text-base flex flex-col hover:text-tertiary"
            >
              <House class="text-black w-5 h-5" />
              <p class="mt-1">Kembali ke Beranda</p>
            </router-link>

            <button
              @click="() => router.go(-1)"
              class="text-base flex flex-col hover:text-tertiary"
            >
              <Undo2 class="text-black w-5 h-5" />
              <p class="mt-1">Kembali</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
