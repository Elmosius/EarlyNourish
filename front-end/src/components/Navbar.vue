<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import {
  MenuIcon,
  XIcon,
  UserIcon,
  History,
  LogOutIcon,
  ChevronDownIcon,
  LogInIcon,
} from "lucide-vue-next";
import { useAuthStore, useProfileStore } from "../stores/index.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const profileStore = useProfileStore();

const { profile } = storeToRefs(profileStore);
const { isAuthenticated, user } = storeToRefs(authStore);
const router = useRouter();

const isMenuOpen = ref(false);
const isProfileModalOpen = ref(false);
const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

const toggleProfileModal = () => {
  isProfileModalOpen.value = !isProfileModalOpen.value;
};

const closeProfileModal = () => {
  isProfileModalOpen.value = false;
};

const handleClickOutside = (event) => {
  if (
    isProfileModalOpen.value &&
    !event.target.closest(".profile-menu-container")
  ) {
    closeProfileModal();
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  document.addEventListener("click", handleClickOutside);

  if (user.value && user.value.userId) {
    profileStore.fetchProfile(user.value.userId);
  }
});

watch(user, (newUser) => {
  if (newUser && newUser.userId) {
    profileStore.fetchProfile(newUser.userId);
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("click", handleClickOutside);
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const handleLogout = () => {
  authStore.logout();
  closeProfileModal();
  isMenuOpen.value = false;
  router.push("/login");
};

const profileMenuItems = computed(() => [
  {
    icon: UserIcon,
    label: "Informasi Pribadi",
    to: "/profile",
    action: closeProfileModal,
  },
  {
    icon: History,
    label: "Riwayat Asesmen",
    to: "/history",
    action: closeProfileModal,
  },
  { icon: LogOutIcon, label: "Keluar", action: handleLogout, isLogout: true },
]);

const userInitials = computed(() => {
  if (user.value && user.value.name) {
    return user.value.name.substring(0, 2).toUpperCase();
  }
  return "GU";
});

const userDisplayName = computed(() => {
  return user.value?.name || "Guest User";
});

const userProfilePhoto = computed(() => {
  if (profile.value && profile.value.fotoProfil) {
    return `${import.meta.env.VITE_API_URL}/${profile.value.fotoProfil}`;
  }
  return null;
});
</script>

<template>
  <header
    class="bg-gray-50 sticky top-0 z-50 duration-500 transition-all md:px-8 lg:px-35"
    :class="{ 'shadow-sm bg-white': scrolled }"
  >
    <div
      class="container mx-auto py-3 flex items-center px-6 lg:px-0 justify-between"
    >
      <router-link
        :to="{ path: $route.path }"
        @click="scrollToTop"
        class="flex items-center"
      >
        <img src="/logo.png" alt="Early Nourish" class="h-8 w-8" />
        <span class="ml-2 font-semibold text-gray-800">Early Nourish</span>
      </router-link>

      <div class="flex items-center">
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-transform duration-300 ease-in-out"
          :class="{ 'rotate-90': isMenuOpen }"
        >
          <XIcon v-if="isMenuOpen" class="h-6 w-6 text-gray-700" />
          <MenuIcon v-else class="h-6 w-6 text-gray-700" />
        </button>

        <nav class="hidden lg:flex items-center">
          <router-link
            to="/"
            class="text-gray-700 hover:text-tertiary font-medium px-6"
            >Beranda</router-link
          >
          <router-link
            :to="{ path: '/', hash: '#about-home' }"
            class="text-gray-700 hover:text-tertiary font-medium px-6"
            >Tentang Kami</router-link
          >
          <router-link
            :to="{ path: '/', hash: '#feature-home' }"
            class="text-gray-700 hover:text-tertiary font-medium px-6"
            >Layanan</router-link
          >
          <router-link
            :to="{ path: '/', hash: '#carakerja-home' }"
            class="text-gray-700 hover:text-tertiary font-medium px-6"
            >Cara Kerja</router-link
          >
          <router-link
            :to="{ path: '/', hash: '#testimoni-home' }"
            class="text-gray-700 hover:text-tertiary font-medium px-6"
            >Testimoni</router-link
          >
          <div
            v-if="isAuthenticated"
            class="ml-6 relative profile-menu-container"
          >
            <button
              @click="toggleProfileModal"
              class="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-medium transition-colors"
            >
              <div
                class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden"
              >
                <img
                  v-if="userProfilePhoto"
                  :src="userProfilePhoto"
                  alt="Profile Photo"
                  class="w-full h-full object-cover rounded-full"
                  @error="userProfilePhoto = null"
                />
                <span v-else class="text-sm">{{ userInitials }}</span>
              </div>

              <span>{{ userDisplayName }}</span>
              <ChevronDownIcon
                class="h-4 w-4 transition-transform duration-300"
                :class="{ 'rotate-180': isProfileModalOpen }"
              />
            </button>

            <!-- Desktop Profile Dropdown -->
            <transition name="fade">
              <div
                v-if="isProfileModalOpen"
                class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
              >
                <div class="px-4 py-3 border-b border-gray-100">
                  <p class="text-sm font-medium text-gray-900">
                    {{ userDisplayName }}
                  </p>
                  <p class="text-sm text-gray-500">{{ user?.email }}</p>
                </div>
                <div class="py-1">
                  <component
                    v-for="item in profileMenuItems"
                    :key="item.label"
                    :to="item.to"
                    :is="item.to ? 'router-link' : 'button'"
                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    :class="{
                      'text-red-600 hover:bg-red-50 w-full': item.isLogout,
                    }"
                    @click="item.action"
                  >
                    <component :is="item.icon" class="h-4 w-4 mr-3" />
                    {{ item.label }}
                  </component>
                </div>
              </div>
            </transition>
          </div>
          <div v-else class="ml-6 relative profile-menu-container">
            <router-link
              to="/login"
              class="block text-gray-700 hover:text-tertiary font-medium py-2 px-2 rounded-md transition-colors"
              @click="isMenuOpen = false"
            >
              Masuk
              <LogInIcon class="h-4 w-4 inline-block ml-2" />
            </router-link>
          </div>
        </nav>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-fade">
      <div
        v-if="isMenuOpen"
        class="lg:hidden border-t border-gray-200 px-4 overflow-hidden"
      >
        <div class="container mx-auto px-4 py-3">
          <nav class="flex flex-col space-y-3">
            <router-link
              to="/"
              class="text-gray-700 hover:text-tertiary font-medium py-2"
              @click="isMenuOpen = false"
              >Beranda</router-link
            >
            <router-link
              :to="{ path: '/', hash: '#about-home' }"
              class="text-gray-700 hover:text-tertiary font-medium py-2"
              @click="isMenuOpen = false"
              >Tentang Kami</router-link
            >
            <router-link
              :to="{ path: '/', hash: '#feature-home' }"
              class="text-gray-700 hover:text-tertiary font-medium py-2"
              @click="isMenuOpen = false"
              >Layanan</router-link
            >
            <router-link
              :to="{ path: '/', hash: '#carakerja-home' }"
              class="text-gray-700 hover:text-tertiary font-medium py-2"
              @click="isMenuOpen = false"
              >Cara Kerja</router-link
            >
            <router-link
              :to="{ path: '/', hash: '#testimoni-home' }"
              class="text-gray-700 hover:text-tertiary font-medium py-2"
              @click="isMenuOpen = false"
              >Testimoni</router-link
            >

            <!-- Mobile Profile Section -->
            <div
              v-if="isAuthenticated"
              class="py-2 border-t border-gray-200 mt-2"
            >
              <div class="flex items-center space-x-3 px-2 py-3">
                <div
                  class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden"
                >
                  <img
                    v-if="userProfilePhoto"
                    :src="userProfilePhoto"
                    alt="Profile Photo"
                    class="w-full h-full object-cover rounded-full"
                    @error="userProfilePhoto = null"
                  />
                  <span v-else class="text-sm font-medium">{{
                    userInitials
                  }}</span>
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-900">
                    {{ userDisplayName }}
                  </p>
                  <p class="text-xs text-gray-500">{{ user?.email }}</p>
                </div>
              </div>

              <!-- Mobile Profile Menu Items -->
              <div class="space-y-1 mt-2">
                <component
                  v-for="item in profileMenuItems"
                  :key="item.label"
                  :to="item.to"
                  :is="item.to ? 'router-link' : 'button'"
                  class="flex items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  :class="{
                    'text-red-600 hover:bg-red-50 w-full': item.isLogout,
                  }"
                  @click="
                    () => {
                      item.action();
                      isMenuOpen = false;
                    }
                  "
                >
                  <component :is="item.icon" class="h-4 w-4 mr-3" />
                  {{ item.label }}
                </component>
              </div>
            </div>
            <div v-else class="py-2 border-t border-gray-200 mt-2">
              <router-link
                to="/login"
                class="block text-gray-700 hover:text-tertiary font-medium py-2 px-2 rounded-md transition-colors"
                @click="isMenuOpen = false"
              >
                Masuk
                <LogInIcon class="h-4 w-4 inline-block ml-2" />
              </router-link>
            </div>
          </nav>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
/* Transisi for mobile menu */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* Transition for profile dropdown */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
