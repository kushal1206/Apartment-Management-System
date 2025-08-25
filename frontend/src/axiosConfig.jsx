import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001",   // your backend API
});

// Interceptor to log outgoing requests
api.interceptors.request.use((config) => {
  const url = (config.baseURL || "") + (config.url || "");
  console.log("[API]", (config.method || "GET").toUpperCase(), url);
  return config;
});

export default api;