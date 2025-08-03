import axios from "axios";

// Set up axios instance with base URL

const axiosInstance = axios.create({
  baseURL: "https://chathub-three-flax.vercel.app/api/",
  withCredentials: true, // Include cookies in requests
});

export default axiosInstance;
