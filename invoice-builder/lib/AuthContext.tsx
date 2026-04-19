'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AppView } from '@/types';

interface AuthContextValue {
  isLoggedIn: boolean;
  userEmail: string;
  view: AppView;
  darkMode: boolean;
  login: (email: string) => void;
  logout: () => void;
  goTo: (view: AppView) => void;
  toggleDark: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [view, setView] = useState<AppView>('home');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail') ?? '';
    setIsLoggedIn(loggedIn);
    setUserEmail(email);
    setView(loggedIn ? 'dashboard' : 'home');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const login = (email: string) => {
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    setIsLoggedIn(true);
    setUserEmail(email);
    setView('dashboard');
  };

  const logout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    setUserEmail('');
    setView('login');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userEmail,
        view,
        darkMode,
        login,
        logout,
        goTo: setView,
        toggleDark: () => setDarkMode(d => !d),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
