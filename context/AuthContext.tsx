import React, { createContext, useState, useEffect } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  setIsAdmin: (v: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  login: () => false,
  logout: () => {},
  setIsAdmin: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [isAdmin, setIsAdminState] = useState<boolean>(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', String(isAuthenticated));
    localStorage.setItem('isAdmin', String(isAdmin));
  }, [isAuthenticated, isAdmin]);

  const login = (username: string, password: string) => {
    // Simple hardcoded admin login; replace with real auth later
    if (username === 'admin' && password === 'admin123') {
      setAuthenticated(true);
      setIsAdminState(true);
      return true;
    }
    // optional: normal user credentials flow
    return false;
  };

  const logout = () => {
    setAuthenticated(false);
    setIsAdminState(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
  };

  const setIsAdmin = (v: boolean) => setIsAdminState(v);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
