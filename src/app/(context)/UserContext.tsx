"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthServiceProvider } from "../../services/auth/authserviceProvider";


type User = {
  id: string;
  username: string;
  email: string;
  country: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  phonenumberCode: string;
  password: string;
  consent: boolean;
};

type UserContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {

  const {getToken,loggedIn } = AuthServiceProvider();


  const [user, setUser] = useState<User | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
       setIsLoggedIn(loggedIn())
  }, [isLoggedIn]);

  const login = (userData: User) => {
    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };



  const contextValue = {
    user,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
