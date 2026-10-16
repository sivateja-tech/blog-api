import React, { createContext, useContext, useState } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext();

// Simple JWT decoder helper to extract payload without libraries
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('blog_token') || null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('blog_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Login handler
  const login = async (email, password) => {
    const data = await authAPI.login(email, password);
    const token = data.token;

    // Decode token or use user object from response
    const decoded = parseJwt(token);
    const userData = data.user || {
      id: decoded?.userId,
      email: decoded?.email || email,
      name: decoded?.name || '',
    };

    setToken(token);
    setUser(userData);

    localStorage.setItem('blog_token', token);
    localStorage.setItem('blog_user', JSON.stringify(userData));
  };

  // Register handler
  const register = async (name, email, password) => {
    return await authAPI.register(name, email, password);
  };

  // Logout handler
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('blog_token');
    localStorage.removeItem('blog_user');
  };

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
