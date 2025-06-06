import { defineStore } from "pinia";
import { login as apiLogin, register as apiRegister } from "../api/auth";
import { storeToken, getToken, removeToken } from "../utils/auth.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: getToken(),
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
        const response = await apiLogin(credentials);
        this.user = response.data.user;
        this.token = response.data.token;
        storeToken(this.token); // Store the token
        this.error = null;
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          "An unexpected login error occurred.";
        this.user = null;
        this.token = null;
      } finally {
        this.loading = false;
      }
    },

    async register(userInfo) {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiRegister(userInfo);
        this.user = response.data.user;
        this.token = response.data.token;
        storeToken(this.token); // Store the token
        this.error = null;
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          "An unexpected registration error occurred.";
        this.user = null;
        this.token = null;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      removeToken();
      this.error = null;
    },
  },
});
