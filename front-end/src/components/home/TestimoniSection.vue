<script setup>
import { Quote } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import LoadingSpinner from "../ui/LoadingSpinner.vue";
import { getFeedbacks } from "../../api/feedback.js";

const allFeedbacks = ref([]);
const isLoading = ref(false);
const error = ref(null);

const fetchAllFeedbacks = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await getFeedbacks();
    allFeedbacks.value = response.feedback || [];
  } catch (err) {
    console.error("Gagal mengambil testimoni:", err);
    error.value =
      err.response?.data?.Message || "Tidak dapat memuat testimoni.";
    allFeedbacks.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchAllFeedbacks();
});

const topThreeFeedbacks = computed(() => {
  return [...allFeedbacks.value]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3);
});
</script>

<template>
  <section class="py-12 md:px-14 px-8 bg-gray-50 lg:py-20 lg:px-38">
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
        <p class="text-base md:text-sm text-gray-600 max-w-2xl mx-auto">
          Dengarkan dari orang tua yang telah menggunakan Early Nourish untuk
          meningkatkan hasil kesehatan dan tumbuh kembang anak.
        </p>
      </div>

      <LoadingSpinner v-if="isLoading" />
      <div v-if="error" class="error-message">
        <p>{{ error }}</p>
        <button @click="fetchAllFeedbacks">Coba Lagi</button>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(testimonial, index) in topThreeFeedbacks"
          :key="testimonial.Id"
          class="bg-white p-6 rounded-lg shadow-md"
        >
          <div class="flex justify-between mb-4">
            <div>
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
            <Quote class="text-secondary opacity-60" />
          </div>
          <p class="text-gray-600 mb-6 text-base italic leading-loose">
            {{ testimonial.description }}
          </p>
          <div class="flex">
            <div
              class="bg-[#DCFCE7] inset-shadow-sm inset-shadow-gray-300 w-10 h-10 rounded-full flex items-center justify-center mr-3"
            >
              <span class="text-tertiary font-bold">{{
                testimonial.userId.charAt(0)
              }}</span>
            </div>
            <div>
              <h4 class="font-semibold">{{ testimonial.userId }}</h4>
              <p class="text-sm text-gray-500">Orang tua</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
