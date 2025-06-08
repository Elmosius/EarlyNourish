import { defineStore } from "pinia";
import { getProfile, updateProfile } from "../api/profile.js";

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

      try {
        const response = await getProfile(userId);
        this.profile = response.data.profile;
        this.error = null;
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          "An unexpected error occurred while fetching profile.";
        this.profile = null;
      } finally {
        this.loading = false;
      }
    },

    async updateUserProfile(userId, profileData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await updateProfile(userId, profileData);
        this.profile = response.data.profile;
        this.error = null;

        console.log("Profile updated successfully!");

        return response.data.profile;
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          "An unexpected error occurred while updating profile.";
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
