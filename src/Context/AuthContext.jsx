import { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setupAxiosInterceptors } from '../services/apiClient';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshPromiseRef = useRef(null);
  const authRef = useRef(null);
  const logoutRef = useRef(null);

  
  const attemptTokenRefresh = useCallback(async () => {
    if (refreshPromiseRef.current) {
      return refreshPromiseRef.current;
    }

    setIsRefreshing(true);
    
    const refreshPromise = (async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/v1/auth/refresh`,
          { platform: 'web' },
          {
            withCredentials: true,
          }
        );

        const { accessToken, userId, email, role } = response.data;

        const authData = {
          accessToken,
          userId,
          email,
          role,
        };

        setAuth(authData);
        return authData;
      } catch (error) {
        console.error('Token refresh failed:', error);
        setAuth(null);
        return null;
      } finally {
        setIsRefreshing(false);
        refreshPromiseRef.current = null;
      }
    })();

    refreshPromiseRef.current = refreshPromise;
    return refreshPromise;
  }, []);

  
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      await attemptTokenRefresh();
      setIsLoading(false);
    };

    initAuth();
  }, [attemptTokenRefresh]);

  
  const requestLogin = useCallback(async (credentials) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/auth/login`,
      credentials
    );
    return response.data;
  }, []);

  
  const resendLoginOtp = useCallback(async (data) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/auth/login/resend-otp`,
      data
    );
    return response.data;
  }, []);

  
  const verifyLoginOtp = useCallback(async (data) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/auth/login/verify-otp`,
      { ...data, platform: 'web' },
      {
        withCredentials: true,
      }
    );

    const { accessToken, userId, email, role } = response.data;

    const authData = {
      accessToken,
      userId,
      email,
      role,
    };

    setAuth(authData);
    return authData;
  }, []);

  
  const logout = useCallback(async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/v1/auth/logout`,
        { platform: 'web' },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuth(null);
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    authRef.current = auth;
  }, [auth]);

  useEffect(() => {
    logoutRef.current = logout;
  }, [logout]);

  useEffect(() => {
    setupAxiosInterceptors(() => ({
      accessToken: authRef.current?.accessToken,
      logout: logoutRef.current,
    }));
  }, []);

  
  const forceRefresh = useCallback(async () => {
    return await attemptTokenRefresh();
  }, [attemptTokenRefresh]);

  const value = {
    auth,
    isAuthenticated: !!auth?.accessToken,
    isLoading,
    isRefreshing,
    requestLogin,
    resendLoginOtp,
    verifyLoginOtp,
    logout,
    forceRefresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
