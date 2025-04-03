import axios from "axios";

// Set up axios instance with base URL

const axiosInstance = axios.create({
  baseURL: "https://real-time-chat-application-ttav.onrender.com",
  withCredentials: true, // Include cookies in requests
});

export default axiosInstance;
