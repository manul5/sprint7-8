import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { simulateLogin, decodeJwt } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('jwtToken');
    } catch (e) {
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    if (!token) return null;
    try {
      return decodeJwt(token);
    } catch (e) {
      return null;
    }
  });

  // Mantener user sincronizado con token
  useEffect(() => {
    if (token) {
      const decoded = decodeJwt(token);
      setUser(decoded);
    } else {
      setUser(null);
    }
  }, [token]);

  const login = useCallback(async (email, password) => {
    // Llamar al servicio simulado
    const res = await simulateLogin(email, password);
    const newToken = res.token;
    try {
      localStorage.setItem('jwtToken', newToken);
    } catch (e) {
      console.error('No se pudo guardar token en localStorage', e);
    }
    setToken(newToken);
    return decodeJwt(newToken);
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('jwtToken');
    } catch (e) {
      console.error('No se pudo remover token', e);
    }
    setToken(null);
  }, []);

  const isAuthenticated = !!token;

  const getAuthHeader = useCallback(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  const value = {
    token,
    user,
    login,
    logout,
    isAuthenticated,
    getAuthHeader,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
