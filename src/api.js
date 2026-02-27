import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach access token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("access");
  
  console.log("PROD API URL:", import.meta.env.VITE_API_URL);
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;