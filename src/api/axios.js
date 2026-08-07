import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
//  baseURL: 'https://e-swathutest.karnataka.gov.in:8443/EswathiTestAPI/api/v1/',
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (res) => {
    if (res.data?.Table && Array.isArray(res.data.Table)) {
      res.data = res.data.Table;
    }
    return res;
  },
  (err) => Promise.reject(err)
);

export default axiosInstance;