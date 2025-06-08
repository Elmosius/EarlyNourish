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
    const response = await axiosInstance.put(
      `/profile/${userId}`,
      profileData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
