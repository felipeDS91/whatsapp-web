import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface User {
  id: string;
  name: string;
}

interface AuthState {
  token: string;
  user: User;
  expires: number;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  updateUser(user: User): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@Whatsapp:user');
    const token = localStorage.getItem('@Whatsapp:token');
    const expires = localStorage.getItem('@Whatsapp:expires');

    if (user && token && expires) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return {
        user: JSON.parse(user),
        token,
        expires: Number(expires),
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ username, password }: SignInCredentials) => {
      const response = await api.post('/sessions', {
        username,
        password,
      });

      const { user, token, expires } = response.data;

      localStorage.setItem('@Whatsapp:user', JSON.stringify(user));
      localStorage.setItem('@Whatsapp:token', token);
      localStorage.setItem('@Whatsapp:expires', expires);

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ user, token, expires });
    },
    [],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@Whatsapp:user');
    localStorage.removeItem('@Whatsapp:token');
    localStorage.removeItem('@Whatsapp:expires');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      localStorage.setItem('@Whatsapp:user', JSON.stringify(user));

      setData({
        ...data,
        user,
      });
    },
    [data],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        updateUser,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
