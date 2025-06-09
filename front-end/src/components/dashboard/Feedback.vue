<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { Star, CheckCircle } from "lucide-vue-next";
import { storeToRefs } from "pinia";

import { getUserFeedback, postFeedback } from "../../api/feedback.js";
import { useAuthStore } from "../../stores/auth.js";

import FormTextArea from "../ui/FormTextArea.vue";
import FormInput from "../ui/FormInput.vue";
import ErrorMessage from "../ui/ErrorMessage.vue";
import LoadingSpinner2 from "../ui/LoadingSpinner2.vue";

const emit = defineEmits(["feedback-submitted"]);
const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const formData = ref({
  namaLengkap: "",
  rating: 0,
  testimonial: "",
});

const isSubmitting = ref(false);
const feedbackSubmitted = ref(false);
const errorMessage = ref("");
const isLoading = ref(true);

const checkExistingFeedback = async () => {
  if (!authUser.value?.userId) {
    isLoading.value = false;
    return;
  }

  try {
    const response = await getUserFeedback(authUser.value.userId);
    if (response !== null) feedbackSubmitted.value = true;
    console.log("user belum mengisi feedback ini pada dashboard ini");
  } catch (error) {
    console.error("Error checking existing feedback:", error);
    feedbackSubmitted.value = false;
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  if (authUser.value && authUser.value.userId) {
    formData.value.namaLengkap = authUser.value.name;
    await checkExistingFeedback();
  } else {
    isLoading.value = false;
  }
});

const isFormValid = computed(() => {
  return (
    formData.value.namaLengkap.trim() !== "" &&
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
  errorMessage.value = "";

  try {
    const feedbackData = {
      rating: formData.value.rating,
      description: formData.value.testimonial,
    };

    const userId = authUser.value.userId;
    const response = await postFeedback(userId, feedbackData);

    console.log("Feedback berhasil dikirim:", response);

    emit("feedback-submitted", {
      ...formData.value,
      userId: userId,
      feedbackId: response.data?.newFeedback?.id,
    });

    feedbackSubmitted.value = true;
  } catch (error) {
    console.error("Error submitting feedback:", error);

    if (error.response?.data?.Message) {
      errorMessage.value = error.response.data.Message;
    } else {
      errorMessage.value =
        "Terjadi kesalahan saat mengirim feedback. Silakan coba lagi.";
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section class="px-8 py-4 pb-10 md:px-14 lg:px-38">
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

      <div v-if="isLoading" class="text-center py-8">
        <LoadingSpinner />
      </div>

      <div v-else-if="!feedbackSubmitted">
        <form @submit.prevent="submitFeedback" class="space-y-6">
          <FormInput
            label="Nama Lengkap"
            type="text"
            id="namaLengkap"
            placeholder="Masukkan nama Anda"
            v-model="formData.namaLengkap"
            :autofocus="false"
            :readonly="true"
          />

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
                  class="h-6 w-6 hover:text-yellow-400 cursor-pointer transition-colors hover:scale-110"
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
            <FormTextArea
              id="testimonial"
              v-model="formData.testimonial"
              placeholder="Masukkan pengalaman Anda"
              :rows="5"
              :max-length="500"
            />

            <p class="text-xs text-gray-500 mt-1">
              {{ formData.testimonial.length }}/500 karakter
            </p>
          </div>

          <ErrorMessage v-if="errorMessage" :message="errorMessage" />

          <div class="flex justify-center pt-4">
            <button
              type="submit"
              :disabled="!isFormValid || isSubmitting"
              :class="
                isFormValid && !isSubmitting
                  ? 'bg-gray-800 hover:bg-gray-600'
                  : 'bg-gray-400 cursor-not-allowed'
              "
              class="text-white font-medium py-2 px-6 rounded-full transition-colors text-base md:text-sm"
            >
              <LoadingSpinner2 v-if="isSubmitting" />
              <span v-else>Kirim</span>
            </button>
          </div>
        </form>
      </div>

      <div v-else class="text-center py-8">
        <div class="flex justify-center mb-4">
          <CheckCircle class="h-8 w-8 text-tertiary" />
        </div>
        <h3 class="font-bold text-gray-800 mb-3">
          Terima Kasih atas Feedback Anda!
        </h3>
        <p class="text-gray-600 text-base leading-relaxed max-w-md mx-auto">
          Testimoni Anda sangat berharga bagi kami dan akan membantu orang tua
          lain dalam perjalanan mereka bersama Early Nourish.
        </p>
      </div>
    </div>
  </section>
</template>
