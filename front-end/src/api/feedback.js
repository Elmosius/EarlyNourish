import axios from "axios";

const FEEDBACKS_DATA_URL = "/src/api/dummy-data/feedbacks.json";

export const getFeedbacks = async (/* token is no longer passed */) => {
  try {
    const response = await axios.get(FEEDBACKS_DATA_URL);
    const feedbacks = response.data; // Axios wraps JSON array in `data`
    return { data: { feedbacks } }; // Mimic API response structure
  } catch (error) {
    // For getFeedbacks, if the file is missing or malformed, it's a server-side issue.
    console.error("Error fetching feedbacks:", error);
    throw {
      response: {
        data: { message: "Could not load feedbacks." },
        status: error.response?.status || 500,
      },
    };
  }
};

export const postFeedback = async (
  userId,
  feedbackData /* token is no longer passed */,
) => {
  try {
    // In a real scenario, we might GET current feedbacks to check something or just POST.
    // For dummy, we don't need to fetch first unless we want to check for duplicates or something.
    // Here, we'll just simulate creating new feedback.

    // The task asks to fetch from JSON, but for POST, this is usually not done.
    // However, to adhere, we can fetch, but it won't be modified.
    // await axios.get(FEEDBACKS_DATA_URL); // Removed as it's not typical for POST

    if (!userId) {
      // Ensure userId is provided, as it was part of the original signature
      throw {
        response: {
          data: { message: "User ID is required to post feedback." },
          status: 400, // Bad Request
        },
      };
    }

    const newFeedback = {
      id: `fb${Date.now()}`, // Simple unique ID
      userId: userId,
      ...feedbackData, // e.g., comment, rating
      timestamp: new Date().toISOString(),
    };

    // Log for simulation purposes, data isn't actually saved to JSON
    console.log("Simulated new feedback post:", newFeedback);

    return { data: { newFeedback } }; // Return the newly created feedback object, nested in 'newFeedback'
  } catch (error) {
    if (error.response) {
      throw error;
    }
    console.error("Error posting feedback:", error);
    throw {
      response: {
        data: { message: "Could not submit feedback." },
        status: 500,
      },
    };
  }
};
