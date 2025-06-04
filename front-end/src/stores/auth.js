import { defineStore } from "pinia";
import { login as apiLogin, register as apiRegister } from "../api/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    loading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token,
  },
  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiLogin(credentials); // response is now { data: { user: ..., token: ... } }
        this.user = response.data.user;
        this.token = response.data.token;
        this.error = null; // Clear error on success
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          "An unexpected login error occurred.";
        this.user = null; // Clear user on error
        this.token = null; // Clear token on error
      } finally {
        this.loading = false;
      }
    },
    async register(userInfo) {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiRegister(userInfo); // response is now { data: { user: ..., token: ... } }
        this.user = response.data.user;
        this.token = response.data.token;
        this.error = null; // Clear error on success
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          "An unexpected registration error occurred.";
        this.user = null; // Clear user on error
        this.token = null; // Clear token on error
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      this.error = null; // Clear error on logout
    },
  },
});
