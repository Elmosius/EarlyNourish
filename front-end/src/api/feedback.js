import axiosInstance from "../utils/axios.js";

export const getFeedbacks = async () => {
  try {
    const response = await axiosInstance.get("/feedback");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postFeedback = async (feedbackData) => {
  try {
    const response = await axiosInstance.post("/feedback", feedbackData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
