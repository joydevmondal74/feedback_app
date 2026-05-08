import axios from 'axios';

const API = axios.create({
  baseURL: "https://feedback-backend-x0b8.onrender.com"
});

export default API;