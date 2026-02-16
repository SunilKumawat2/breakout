import axios from "axios";

const api = axios.create({
  baseURL: "https://breakout.bvmwebsolutions.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
