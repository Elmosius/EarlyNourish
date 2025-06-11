import axiosInstance from "../utils/axios.js";

export const getProfile = async (userId) => {
  try {
    const response = await axiosInstance.get(`/profile/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (userId, profileData) => {
  try {
    const formData = new FormData();

    Object.keys(profileData).forEach((key) => {
      const value = profileData[key];
      if (value !== null && value !== undefined && value !== "") {
        if (key === "fotoProfil" && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      }
    });

    const response = await axiosInstance.put(`/profile/${userId}`, formData);

    return response.data;
  } catch (error) {
    throw error;
  }
};
