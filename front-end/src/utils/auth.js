export const storeTokens = (accessToken, refreshToken) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  } else {
    console.warn("localStorage is not available. Tokens not stored.");
  }
};

export const getAccessToken = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("accessToken");
  } else {
    console.warn(
      "localStorage is not available. Cannot retrieve access token.",
    );
    return null;
  }
};

export const getRefreshToken = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("refreshToken");
  } else {
    console.warn(
      "localStorage is not available. Cannot retrieve refresh token.",
    );
    return null;
  }
};

export const removeTokens = () => {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  } else {
    console.warn("localStorage is not available. Tokens not removed.");
  }
};

export const storeToken = (token) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("authToken", token);
  } else {
    console.warn("localStorage is not available. Token not stored.");
  }
};

export const getToken = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("authToken");
  } else {
    console.warn("localStorage is not available. Cannot retrieve token.");
    return null;
  }
};

export const removeToken = () => {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("authToken");
  } else {
    console.warn("localStorage is not available. Token not removed.");
  }
};

export const storeUserData = (userData) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("userData", JSON.stringify(userData));
  } else {
    console.warn("localStorage is not available. User data not stored.");
  }
};

export const getUserData = () => {
  if (typeof localStorage !== "undefined") {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  } else {
    console.warn("localStorage is not available. Cannot retrieve user data.");
    return null;
  }
};

export const removeUserData = () => {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("userData");
  } else {
    console.warn("localStorage is not available. User data not removed.");
  }
};

export const storeCredentials = (email, password) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("rememberedEmail", email);
  }
};

export const getRememberedCredentials = () => {
  if (typeof localStorage !== "undefined") {
    return {
      email: localStorage.getItem("rememberedEmail"),
    };
  }
  return { email: null };
};

export const removeRememberedCredentials = () => {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("rememberedEmail");
  }
};
