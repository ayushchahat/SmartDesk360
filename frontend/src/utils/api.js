import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // Adjust based on your backend

export const login = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
  return response.data;
};

export const register = async (userDetails) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, userDetails);
  return response.data;
};
