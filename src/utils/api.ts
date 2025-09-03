import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_API_BASE_URL, // Replace with your NestJS API base URL
});

export default api;
