import axiosInstance from "../utils/axios.js";

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (userInfo) => {
  try {
    const response = await axiosInstance.post("/register", userInfo);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axiosInstance.post("/refresh", {
      refreshToken: refreshToken,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
