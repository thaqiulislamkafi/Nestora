import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { auth } from '../Firebase/authentication';
import Loading from '../SharedElement/Loading';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
   
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <Loading />
  }

  const value = {
    currentUser,
    setCurrentUser,
    loading,
    isModalOpen, 
    setIsModalOpen

  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

