import axios from "axios";

const PROFILES_DATA_URL = "/src/api/dummy/users.json";

export const getProfile = async (
  userId /* token is no longer passed as it's not used for dummy fetch */,
) => {
  try {
    const response = await axios.get(PROFILES_DATA_URL);
    const profiles = response.data;
    const profile = profiles.find((p) => p.id === userId);
    if (profile) {
      return { data: { profile } }; // Mimic API response structure
    } else {
      throw {
        response: {
          data: { message: "Profile not found" },
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

export const updateProfile = async (
  userId,
  profileData /* token is no longer passed */,
) => {
  try {
    const response = await axios.get(PROFILES_DATA_URL);
    const profiles = response.data;
    const existingProfileIndex = profiles.findIndex((p) => p.id === userId);

    if (existingProfileIndex !== -1) {
      const existingProfile = profiles[existingProfileIndex];
      // Simulate update - in a real API, this would persist
      const updatedProfile = { ...existingProfile, ...profileData };

      // Log for simulation purposes, data isn't actually saved to JSON
      console.log(
        `Simulated update for profile userId: ${userId}`,
        updatedProfile,
      );

      return { data: { profile: updatedProfile } };
    } else {
      throw {
        response: {
          data: { message: "Profile not found for update" },
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
        data: { message: "Profile update service currently unavailable." },
        status: 500,
      },
    };
  }
};
