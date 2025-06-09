import { defineStore } from "pinia";
import { login as apiLogin, register as apiRegister } from "../api/auth";
import {
  storeTokens,
  getAccessToken,
  getRefreshToken,
  removeTokens,
  getUserData,
  removeUserData,
  storeUserData,
} from "../utils/auth.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: getUserData(),
    token: getAccessToken(),
    refreshToken: getRefreshToken(),
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
        const loginResult = response.loginResult;

        this.user = {
          userId: loginResult.userId,
          name: loginResult.name,
        };
        this.token = loginResult.token;
        this.refreshToken = loginResult.refreshToken;

        storeTokens(this.token, this.refreshToken);
        storeUserData(this.user);

        this.error = null;
      } catch (error) {
        this.error =
          error.response?.data?.Message ||
          "An unexpected login error occurred.";
        this.user = null;
        this.token = null;
        this.refreshToken = null;
      } finally {
        this.loading = false;
      }
    },

    async register(userInfo) {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiRegister(userInfo);

        this.error = null;
      } catch (error) {
        this.error =
          error.response?.data?.Message ||
          "An unexpected registration error occurred.";
        this.user = null;
        this.token = null;
        this.refreshToken = null;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.refreshToken = null;
      removeTokens();
      removeUserData();
      this.error = null;
    },
  },
});
