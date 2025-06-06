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
