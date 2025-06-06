import { defineStore } from "pinia";
import { getProfile, updateProfile } from "../api/profile.js";
import { useAuthStore } from "./auth"; // Assuming auth store holds the token

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchProfile(userId) {
      this.loading = true;
      this.error = null;
      // const authStore = useAuthStore(); // Token no longer needed for dummy API call
      try {
        // Token was removed from getProfile signature in API layer
        const response = await getProfile(userId); // response is { data: { profile: ... } }
        this.profile = response.data.profile;
        this.error = null; // Clear error on success
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          "An unexpected error occurred while fetching profile.";
        // Potentially clear this.profile on fetch error if desired
        // this.profile = null;
      } finally {
        this.loading = false;
      }
    },
    async updateUserProfile(userId, profileData) {
      this.loading = true;
      this.error = null;
      // const authStore = useAuthStore(); // Token no longer needed for dummy API call
      try {
        // Token was removed from updateProfile signature in API layer
        const response = await updateProfile(userId, profileData); // response is { data: { profile: ... } }
        this.profile = response.data.profile;
        this.error = null; // Clear error on success
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          "An unexpected error occurred while updating profile.";
      } finally {
        this.loading = false;
      }
    },
  },
});
