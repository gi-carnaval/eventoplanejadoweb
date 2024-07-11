import { getAccessToken, getRefreshToken, removeTokens, setAccessToken, setRefreshToken } from '@lib/tokenService';
import userRepository from '../repositories/userRepository';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { authRepository } from '../repositories/authRepository';

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

export interface AuthContextProps {
  user: User | null;
  loading: boolean,
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (accessToken: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  setUser: () => { },
  login: () => {},
  logout: () => { },
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true)
  
  
  const getUser = async (userId: string) => {
    try {
      const response = await userRepository.getUserById(userId)
      setUser({
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        picture: response.data.picture
      });
      setLoading(false)
    } catch (error) {
      console.log(loading)
      console.error('Failed to fetch user data', error);
    }
  }

  const login = async (accessToken: string ) => {
    const response = await authRepository.postAuthentication(accessToken)
    setAccessToken(response.data.token);
    setRefreshToken(response.data.refreshToken);
    getUser(response.data.refreshToken.userId)
  }

  useEffect(() => {
    const token = getAccessToken();
    const refreshToken = getRefreshToken()

    if (!refreshToken) {
      return
    }

    const userId = refreshToken.userId

    if (token && userId) {
      getUser(userId)
    }
  }, []);

  const logout = () => {
    setUser(null);
    removeTokens();
  };

  return (
    <AuthContext.Provider value={{ user, login, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};