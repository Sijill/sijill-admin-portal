import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
let authContextRef = null;


export const setupAxiosInterceptors = (getAuthContext) => {
  authContextRef = getAuthContext;
};


apiClient.interceptors.request.use(
  (config) => {
    if (authContextRef) {
      const auth = authContextRef();
      if (auth?.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/api/v1/auth/refresh`,
          { platform: 'web' },
          {
            withCredentials: true,
          }
        );

        const { accessToken } = refreshResponse.data;
        if (authContextRef) {
          const currentAuth = authContextRef();
          if (currentAuth) {
            console.log('Token refreshed successfully');
          }
        }
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed, redirecting to login');
        if (authContextRef) {
          const auth = authContextRef();
          if (auth?.logout) {
            auth.logout();
          }
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;