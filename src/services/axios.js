import axios from "axios";
import { getToken } from "../utils/customFn";
 
let ReactAppUrl;

if (import.meta.env.VITE_ENV === "production") {
  ReactAppUrl = import.meta.env.VITE_PRODUCTION_API_URL;
} else {
  ReactAppUrl = import.meta.env.VITE_API_URL;
}
 
// Create axios instance with the dynamic base URL
const instance = axios.create({
    baseURL: ReactAppUrl,
});
 
 
instance.defaults.headers.common["Content-Type"] = "application/json";
 
 
instance.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers["content-type"] = "multipart/form-data";
    } else {
        config.headers["Content-Type"] = "application/json";
    }
    const accessToken = getToken();
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
 
    return config;
});
 
 
 
export default instance;
