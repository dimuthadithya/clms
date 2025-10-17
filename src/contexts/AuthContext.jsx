import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import {
  createUserAccount,
  signInUser,
  signInWithGoogle,
  signOutUser,
} from '../utils/firebaseFunctions';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password, firstName, lastName, additionalData = {}) {
    return createUserAccount(
      email,
      password,
      firstName,
      lastName,
      additionalData
    );
  }

  function login(email, password) {
    return signInUser(email, password);
  }

  function loginWithGoogle() {
    return signInWithGoogle();
  }

  function logout() {
    return signOutUser();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
