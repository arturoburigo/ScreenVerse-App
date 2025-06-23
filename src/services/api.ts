import axios from 'axios';
import tokenCache from '@/app/storage/tokenCache';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  async (config) => {
    const token = await tokenCache.getToken(tokenCache.ACCESS_TOKEN_KEY);
    console.log('Interceptor - Token exists:', !!token);
    console.log('Interceptor - Token preview:', token ? `${token.substring(0, 20)}...` : 'No token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Interceptor - Authorization header set:', config.headers.Authorization);
    } else {
      console.log('Interceptor - No token found, request will be sent without Authorization');
    }
    
    console.log('Interceptor - Full headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('Interceptor - Request error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para renovar token automaticamente
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await tokenCache.getToken(tokenCache.REFRESH_TOKEN_KEY);
        
        if (refreshToken) {
          const response = await axios.post('http://localhost:8080/auth/refresh', {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data;
          
          await tokenCache.saveToken(tokenCache.ACCESS_TOKEN_KEY, accessToken);
          await tokenCache.saveToken(tokenCache.REFRESH_TOKEN_KEY, newRefreshToken);
          
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Se não conseguir renovar o token, limpar todos os tokens
        await tokenCache.clearAllTokens();
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

export default api; 