import axios from 'axios';

const request = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => {
    const res = response.data;
    return res;
  },

  (error) => {
    return Promise.reject(error);
  },
);

export default request;
