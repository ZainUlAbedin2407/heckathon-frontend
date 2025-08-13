import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://zainulabedin-heckathon-backend.vercel.app",
  // baseURL: "http://localhost:8000",
  withCredentials: true,
});

//Request interceptor: dynamically fetch token before each request
axiosInstance.interceptors.request.use(
  (config) => {
    // Check if the request is *not* to login or register
    if (!config.url.includes('/login') && !config.url.includes('/register')) {
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      const token = user?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default axiosInstance;
