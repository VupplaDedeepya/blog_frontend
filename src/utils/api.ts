import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3005/api", // Replace with your NestJS API base URL
});

export default api;
