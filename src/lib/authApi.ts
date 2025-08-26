import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const authApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000',
});

// Request interceptor to add auth token
authApi.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor for token refresh
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const { refreshToken, updateTokens, logout } = useAuthStore.getState();
      
      if (refreshToken) {
        try {
          const response = await authApi.post('/auth/user/refresh', { refreshToken });
          const { tokens } = response.data;
          
          updateTokens(tokens);
          originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
          
          return authApi(originalRequest);
        } catch (refreshError) {
          logout();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

export const sendOTP = async (phoneNumber: string) => {
  const { data } = await authApi.post('/auth/user/send-otp', { phoneNumber });
  return data;
};

export const verifyOTP = async (phoneNumber: string, otp: string) => {
  const { data } = await authApi.post('/auth/user/verify-otp', { phoneNumber, otp });
  return data;
};

export const refreshTokens = async (refreshToken: string) => {
  const { data } = await authApi.post('/auth/user/refresh', { refreshToken });
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await authApi.get('/auth/user/me');
  return data;
};

export const logout = async () => {
  const { data } = await authApi.post('/auth/user/logout');
  return data;
};

export const updateUserProfile = async (userData: any) => {
  const { data } = await authApi.put('/auth/user/update-profile', userData);
  return data;
};