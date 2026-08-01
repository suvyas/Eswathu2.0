import axios from "axios";

const axiosInstance = axios.create({
 // baseURL: import.meta.env.VITE_API_BASE_URL,
 baseURL:'https://e-swathutest.karnataka.gov.in:8443/EswathiTestAPI/api/v1/',
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;