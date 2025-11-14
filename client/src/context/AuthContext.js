import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { decodeJwt } from '../services/authService';

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
    
    const apiUrl = process.env.REACT_APP_API_URL;

    const res = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const data = await res.json();
    const newToken = data.token;

    localStorage.setItem("jwtToken", newToken);
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
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
