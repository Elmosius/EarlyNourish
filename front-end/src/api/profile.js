import axios from "axios";

const api = import.meta.env.VITE_API_URL;

export const getProfile = async (userId) => {
  try {
    const response = await axios.get(`${api}/profile/${userId}`);

    if (!response.data.error) {
      return {
        data: {
          profile: response.data.profile,
        },
      };
    } else {
      throw {
        response: {
          data: { message: response.data.message || "Profile not found" },
          status: 404,
        },
      };
    }
  } catch (error) {
    if (error.response) {
      throw error;
    }
    throw {
      response: {
        data: { message: "Profile service currently unavailable." },
        status: 500,
      },
    };
  }
};

export const updateProfile = async (userId, profileData) => {
  try {
    const formData = new FormData();

    const response = await axios.put(`${api}/profile/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.data.error) {
      return {
        data: {
          profile: response.data.profile,
        },
      };
    } else {
      throw {
        response: {
          data: { message: response.data.message || "Update failed" },
          status: 400,
        },
      };
    }
  } catch (error) {
    if (error.response) {
      throw error;
    }
    throw {
      response: {
        data: { message: "Profile update service currently unavailable." },
        status: 500,
      },
    };
  }
};
