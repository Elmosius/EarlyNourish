import axiosInstance from "../utils/axios.js";

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("/login", credentials);

    const loginResult = response.data.loginResult;

    if (loginResult) {
      return {
        data: {
          loginResult: {
            userId: loginResult.userId,
            name: loginResult.name,
            accessToken: loginResult.accessToken,
            refreshToken: loginResult.refreshToken,
          },
        },
      };
    } else {
      throw {
        response: {
          data: { message: "Invalid email or password" },
          status: 401,
        },
      };
    }
  } catch (error) {
    if (error.response) {
      throw error;
    }
    throw {
      response: {
        data: { message: "Login service currently unavailable." },
        status: 500,
      },
    };
  }
};

export const register = async (userInfo) => {
  try {
    const response = await axiosInstance.post("/register", userInfo);

    const loginResult = response.data.loginResult;

    if (loginResult) {
      return {
        data: {
          loginResult: {
            userId: loginResult.userId,
            name: loginResult.name,
            accessToken: loginResult.accessToken,
            refreshToken: loginResult.refreshToken,
          },
        },
      };
    } else {
      throw {
        response: {
          data: { message: "Registration failed" },
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
        data: { message: "Registration service currently unavailable." },
        status: 500,
      },
    };
  }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axiosInstance.post("/refresh", {
      refreshToken: refreshToken,
    });

    return {
      data: {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      },
    };
  } catch (error) {
    throw error;
  }
};
