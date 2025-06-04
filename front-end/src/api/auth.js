import axios from "axios";

const USERS_DATA_URL = "/src/api/dummy/users.json";

export const login = async (credentials) => {
  try {
    const response = await axios.get(USERS_DATA_URL);
    const users = response.data;
    const user = users.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password,
    );

    if (user) {
      return {
        data: {
          user: { id: user.id, email: user.email, name: user.name }, // ensure username is returned as API might expect it
          token: `dummy-auth-token-for-${user.id}`,
        },
      };
    } else {
      throw {
        response: {
          data: { message: "Invalid username or password" },
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
    const response = await axios.get(USERS_DATA_URL);
    const users = response.data;
    const existingUser = users.find((u) => u.username === userInfo.username);

    if (existingUser) {
      throw {
        response: {
          data: { message: "User already exists with this username/email" },
          status: 409, // Conflict
        },
      };
    }

    const newUser = {
      id: `user${Date.now()}`,
      email: userInfo.email,
      password: userInfo.password,
      fullName: userInfo.fullName,
    };

    console.log("Simulated new user registration:", newUser);

    return {
      data: {
        user: {
          id: newUser.id,
          fullName: userInfo.fullName,
          email: userInfo.email,
        },
        token: `dummy-auth-token-for-${newUser.id}`,
      },
    };
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
