<script setup>
const testimonials = [
  {
    name: "Fatimah Salim",
    role: "Orang tua",
    content:
      '"Early Nourish telah mengubah cara kami menangani gizi anak. Analitik prediktifnya membantu kami mengidentifikasi anak-anak yang berisiko beberapa bulan lebih awal dibandingkan metode tradisional."',
    rating: 5,
  },
  {
    name: "Dewi Pramita",
    role: "Orang tua",
    content:
      '"Rencana nutrisi yang dipersonalisasi membantu putri saya mengejar pertumbuhannya. Aplikasi ini memudahkan saya untuk melacak perkembangan dan menyesuaikan pola makannya sesuai kebutuhan."',
    rating: 5,
  },
  {
    name: "Diana Permata",
    role: "Orang tua",
    content:
      '"Sangat mudah digunakan dan memberikan informasi yang jelas. Saya jadi lebih memahami pentingnya nutrisi untuk mencegah stunting"',
    rating: 4,
  },
];
</script>

<template>
  <section class="py-12 px-8 bg-gray-50">
    <div class="container mx-auto">
      <div class="text-center mb-12">
        <h1
          class="font-montserrat tracking-wider text-center font-bold mb-2 text-sm text-tertiary"
        >
          KISAH SUKSES
        </h1>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Apa Kata Mereka
        </h2>
        <p class="text-base text-gray-600 max-w-2xl mx-auto">
          Dengarkan dari orang tua yang telah menggunakan Early Nourish untuk
          meningkatkan hasil kesehatan dan tumbuh kembang anak.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="bg-white p-6 rounded-lg shadow-md"
        >
          <div class="flex mb-4">
            <span
              v-for="i in testimonial.rating"
              :key="i"
              class="text-yellow-400"
              >★</span
            >
            <span
              v-for="i in 5 - testimonial.rating"
              :key="i + testimonial.rating"
              class="text-gray-300"
              >★</span
            >
          </div>
          <p class="text-gray-600 mb-6 text-base italic leading-loose">
            {{ testimonial.content }}
          </p>
          <div class="flex items-center">
            <div
              class="bg-[#DCFCE7] inset-shadow-sm inset-shadow-gray-300 w-10 h-10 rounded-full flex items-center justify-center mr-3"
            >
              <span class="text-tertiary font-bold">{{
                testimonial.name.charAt(0)
              }}</span>
            </div>
            <div>
              <h4 class="font-semibold">{{ testimonial.name }}</h4>
              <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
