import axiosInstance from "../utils/axios.js";

export const getFeedbacks = async () => {
  try {
    const response = await axiosInstance.get("/feedback");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postFeedback = async (userId, feedbackData) => {
  try {
    const response = await axiosInstance.post(
      `/feedback/${userId}`,
      feedbackData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserFeedback = async (userId) => {
  try {
    const response = await axiosInstance.get(`/feedback/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return 0;
    }
    throw error;
  }
};
