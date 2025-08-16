import axios from "axios";

const baseURL = (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:8000/api";
console.log("API base URL:", baseURL);

const API = axios.create({ baseURL });

// Add request/response interceptors for debugging
API.interceptors.request.use((config) => {
  console.log("API request:", config.method?.toUpperCase(), config.url, config.data);
  return config;
});

API.interceptors.response.use(
  (response) => {
    console.log("API response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("API error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// attach token for every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

export default API;