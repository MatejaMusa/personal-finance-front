import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

const backendHost = import.meta.env.BACKEND_HOST

export const axiosInstance = axios.create({
  baseURL: `http://${backendHost}:8080`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export const setupGlobalExceptionHandler = (navigate) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.data) {
        const { developerMessage } = error.response.data;
        if (developerMessage.includes('JWT')) {
          navigate('/auth');
        }
      }
      return Promise.reject(error);
    }
  );
};


export const queryClient = new QueryClient();