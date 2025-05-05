import axios from 'axios'
console.log('API URL:'); 
const api = axios.create({
  baseURL: 'http://localhost:5000/bookingBE-MNC/api/v1', 
})
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('Interceptor error:', error);
    return Promise.reject(error);
  }
);


export default api
