import axios from 'axios';
import { BASE_URL } from './apiEndpoints';

export const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})

const excludeEndpoints = ["/profile/login", "/profile/register","/status","/health","/profile/activate"]

axiosConfig.interceptors.request.use((config) => {
    const isExcluded = excludeEndpoints.some((endpoint) => {
        return config.url?.includes(endpoint)
    });
    if (!isExcluded) {
        const accessToken = localStorage.getItem("token")
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      
      // 🔥 JWT expired or invalid
      if (error.response.status === 401) {
        console.log("JWT expired. Logging out...");

        localStorage.removeItem("token");

        // Optional: clear everything
        localStorage.clear();

        // Redirect to login
        window.location.href = "/login";
      }

      else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }

    } else if (error.code === "ECONNABORTED") {
      console.error("Request timed out.");
    }

    return Promise.reject(error);
  }
);