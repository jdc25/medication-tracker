// src/components/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebaseConfig'; // Firebase configuration

const AuthContext = createContext(); // Context creation

export const useAuth = () => useContext(AuthContext); // Custom hook to use the auth context

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only if not loading */}
    </AuthContext.Provider>
  );
}