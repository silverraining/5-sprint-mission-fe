import axios from "axios";
const API_URL = "https://sprint-mission08-be.onrender.com";
const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
