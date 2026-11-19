import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://gst-invoice-application.onrender.com/api',
  timeout: 20000,
});

export default api;
