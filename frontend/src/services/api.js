import axios from "axios";

const baseURL = import.meta.env.VITE_ENV === "dev" ?
  import.meta.env.VITE_API_BASE_URL
  : import.meta.env.VITE_PROD_API_URL
const api = axios.create({
  baseURL,
  withCredentials: true, // Include cookies with requests
});

export default api;