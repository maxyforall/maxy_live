'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user type
type User = {
  firstName: string;
  lastName: string;
  maxy_id: string;
  emailId: string;
  avatar?: string;
} | null;

// Create context
interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  refreshUserState: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Function to refresh user state from localStorage
  const refreshUserState = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, refreshUserState }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook for using the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};