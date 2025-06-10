import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  storeTokens,
  removeTokens,
} from "./auth.js";

const api = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: api,
  timeout: 10000,
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

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        processQueue(error, null);
        isRefreshing = false;

        // Clear tokens dan redirect ke login
        removeTokens();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${api}/refresh`, {
          refreshToken: refreshToken,
        });

        const { accessToken } = response.data;

        // Simpan token baru
        storeTokens(accessToken);

        // Process queue
        processQueue(null, accessToken);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        processQueue(refreshError, null);

        // Clear semua token dan redirect
        removeTokens();
        window.location.href = "/login";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
