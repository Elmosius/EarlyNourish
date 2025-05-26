<script setup>
import { ref, computed, watch } from "vue";
import { Star, CheckCircle } from "lucide-vue-next";
import FormInput from "../components/ui/FormInput.vue";

const emit = defineEmits(["feedback-submitted"]);

const formData = ref({
  fullName: "",
  role: "",
  rating: 0,
  testimonial: "",
});

const isSubmitting = ref(false);
const showSuccessMessage = ref(false);

const isFormValid = computed(() => {
  return (
    formData.value.fullName.trim() !== "" &&
    formData.value.role !== "" &&
    formData.value.rating > 0 &&
    formData.value.testimonial.trim() !== "" &&
    formData.value.testimonial.length <= 500
  );
});

const getRatingText = (rating) => {
  const texts = {
    1: "Sangat Tidak Puas",
    2: "Tidak Puas",
    3: "Cukup Puas",
    4: "Puas",
    5: "Sangat Puas",
  };
  return texts[rating] || "";
};

// Watch testimonial length
watch(
  () => formData.value.testimonial,
  (newValue) => {
    if (newValue.length > 500) {
      formData.value.testimonial = newValue.substring(0, 500);
    }
  },
);

const submitFeedback = async () => {
  if (!isFormValid.value || isSubmitting.value) return;

  isSubmitting.value = true;

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Emit the feedback data
    emit("feedback-submitted", {
      ...formData.value,
      submittedAt: new Date().toISOString(),
    });

    // Show success message
    showSuccessMessage.value = true;

    // Reset form after 3 seconds
    setTimeout(() => {
      resetForm();
    }, 3000);
  } catch (error) {
    console.error("Error submitting feedback:", error);
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  formData.value = {
    fullName: "",
    role: "",
    rating: 0,
    testimonial: "",
  };
  showSuccessMessage.value = false;
};
</script>

<template>
  <section class="px-8 py-4 md:px-14 lg:px-38">
    <div
      class="container max-w-4xl mx-auto bg-[#EEF2FF] rounded-xl shadow-xl mb-4 p-6"
    >
      <h2 class="font-bold text-gray-800 mb-3">
        Bagikan Cerita Early Nourish Anda
      </h2>
      <p class="text-gray-600 text-base md:text-sm mb-6 leading-relaxed">
        Pengalaman Anda dapat menginspirasi dan membantu orang tua lain dalam
        perjalanan mereka memastikan nutrisi terbaik untuk anak-anak mereka.
      </p>

      <form @submit.prevent="submitFeedback" class="space-y-6">
        <FormInput
          label="Nama Lengkap"
          type="text"
          id="fullName"
          placeholder="Masukkan nama Anda"
          v-model="formData.fullName"
        />

        <div>
          <label
            for="role"
            class="block text-gray-700 mb-1 text-base font-semibold"
          >
            Peran
          </label>
          <select
            id="role"
            v-model="formData.role"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-tertiary text-base bg-white"
            required
          >
            <option value="" disabled>Pilih</option>
            <option value="parent">Orang Tua</option>
            <option value="guardian">Wali</option>
            <option value="caregiver">Pengasuh</option>
          </select>
        </div>

        <div>
          <label
            class="block text-gray-700 mb-3 text-base md:text-sm font-semibold"
          >
            Seberapa puas Anda dengan pengalaman Anda bersama Early Nourish?
          </label>
          <div class="flex justify-center md:justify-start gap-2">
            <button
              v-for="rating in 5"
              :key="rating"
              type="button"
              @click="formData.rating = rating"
              class="p-1 transition-colors focus:outline-none"
            >
              <Star
                :class="
                  formData.rating >= rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-700 fill-white'
                "
                class="h-6 w-6 transition-colors hover:text-yellow-400 cursor-pointer"
              />
            </button>
          </div>
          <p
            v-if="formData.rating > 0"
            class="text-center md:text-left text-xs md:text-base text-gray-600 mt-2"
          >
            {{ getRatingText(formData.rating) }}
          </p>
        </div>

        <div>
          <label
            for="testimonial"
            class="block text-gray-700 mb-2 text-base md:text-sm font-medium"
          >
            Testimoni
          </label>
          <textarea
            id="testimonial"
            v-model="formData.testimonial"
            rows="5"
            placeholder="Masukkan pengalaman Anda"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-tertiary text-base resize-none bg-white"
            required
          ></textarea>
          <p class="text-xs text-gray-500 mt-1">
            {{ formData.testimonial.length }}/500 karakter
          </p>
        </div>

        <div class="flex justify-center pt-4">
          <button
            type="submit"
            :disabled="!isFormValid || isSubmitting"
            :class="
              isFormValid && !isSubmitting
                ? 'bg-gray-800 hover:bg-gray-900'
                : 'bg-gray-400 cursor-not-allowed'
            "
            class="text-white font-medium py-2 px-8 md:px-12 rounded-lg transition-colors text-base md:text-sm"
          >
            {{ isSubmitting ? "Mengirim..." : "Kirim" }}
          </button>
        </div>
      </form>

      <!-- Success Message -->
      <div
        v-if="showSuccessMessage"
        class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
      >
        <div class="flex items-center">
          <CheckCircle class="h-5 w-5 text-tertiary mr-2" />
          <p class="text-tertiary text-sm md:text-base font-medium">
            Terima kasih! Testimoni Anda telah berhasil dikirim.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.star-hover:hover {
  transform: scale(1.1);
}

.transition-colors {
  transition:
    color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;
}
</style>
