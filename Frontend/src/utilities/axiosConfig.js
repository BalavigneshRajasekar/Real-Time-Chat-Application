import axios from "axios";

// Set up axios instance with base URL

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true, // Include cookies in requests
});

export default axiosInstance;
