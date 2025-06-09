import axiosInstance from "../utils/axios.js";

export async function createPrediction(data) {
  try {
    const response = await axiosInstance.post("/prediction", {
      jk: data.jenisKelamin,
      bbLahir: data.bbLahir,
      tbLahir: data.tbLahir,
      umur: data.umur,
      bb: data.bb,
      tb: data.tb,
    });
    return response.data;
  } catch (error) {
    console.error("Error during prediction creation:", error);
    throw (
      error.response?.data || "An unexpected error occurred during prediction."
    );
  }
}

export async function getPrediction(idUser, idPredict) {
  try {
    const response = await axiosInstance.get(
      `/prediction/${idUser}/${idPredict}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching prediction:", error);
    throw (
      error.response?.data ||
      "An unexpected error occurred while fetching prediction."
    );
  }
}

export async function getUserHistory(idUser) {
  try {
    const response = await axiosInstance.get(`/history/${idUser}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user history:", error);
    throw (
      error.response?.data ||
      "An unexpected error occurred while fetching history."
    );
  }
}

export async function getUserPredictions(idUser) {
  console.warn(
    "getUserPredictions() is deprecated, use getUserHistory() instead",
  );
  return getUserHistory(idUser);
}

export async function predict(data) {
  console.warn("predict() is deprecated, use createPrediction() instead");
  return createPrediction(data);
}
