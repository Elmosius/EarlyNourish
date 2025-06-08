import axios from "axios";
import { getAccessToken, getRefreshToken, storeTokens } from "./auth.js";

const api = import.meta.env.VITE_API_URL;

// Buat axios instance
const axiosInstance = axios.create({
  baseURL: api,
  timeout: 10000, // 10 detik timeout
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Request Interceptor - Auto attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor - Handle token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Kalau 401 dan belum coba refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Kalau sedang refresh, tunggu di queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        // Tidak ada refresh token, logout
        processQueue(error, null);
        isRefreshing = false;

        // Import dinamis untuk avoid circular dependency
        const { useAuthStore } = await import("../stores/index.js");
        const authStore = useAuthStore();
        authStore.logout();

        return Promise.reject(error);
      }

      try {
        // Coba refresh token
        const response = await axios.post(`${api}/refresh`, {
          refreshToken: refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        // Simpan token baru
        storeTokens(newAccessToken, newRefreshToken);

        // Update store
        const { useAuthStore } = await import("../stores/index.js");
        const authStore = useAuthStore();
        authStore.accessToken = newAccessToken;
        if (newRefreshToken) {
          authStore.refreshToken = newRefreshToken;
        }

        // Process semua request yang di-queue
        processQueue(null, newAccessToken);

        // Retry original request dengan token baru
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token juga expired, logout
        processQueue(refreshError, null);

        const { useAuthStore } = await import("../stores/index.js");
        const authStore = useAuthStore();
        authStore.logout();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
