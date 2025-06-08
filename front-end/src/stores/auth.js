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
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    loading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user && !!state.accessToken,
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
        this.accessToken = loginResult.accessToken;
        this.refreshToken = loginResult.refreshToken;

        storeTokens(this.accessToken, this.refreshToken);
        storeUserData(this.user);

        this.error = null;
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          "An unexpected login error occurred.";
        this.user = null;
        this.accessToken = null;
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
        const loginResult = response.loginResult;

        this.user = {
          userId: loginResult.userId,
          name: loginResult.name,
        };
        this.accessToken = loginResult.accessToken;
        this.refreshToken = loginResult.refreshToken;

        storeTokens(this.accessToken, this.refreshToken);
        storeUserData(this.user);

        this.error = null;
      } catch (error) {
        this.error =
          error.response?.data?.message ||
          "An unexpected registration error occurred.";
        this.user = null;
        this.accessToken = null;
        this.refreshToken = null;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
      removeTokens();
      removeUserData();
      this.error = null;
    },
  },
});
