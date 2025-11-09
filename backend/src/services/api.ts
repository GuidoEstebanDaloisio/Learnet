import axios from "axios";

const API_URL = "http://localhost:4000"; // tu backend

export const registerUser = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  } catch (error: any) {
    console.error("Error en registro:", error.response?.data || error.message);
    throw error;
  }
};
