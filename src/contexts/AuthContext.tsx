import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Buffer} from 'buffer';
import {api} from '../services/api';

export type UserAuthProps = {
  name: string;
  email: string;
};

interface AuthState {
  token: string;
  user: object;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export type UserProps = {
  id: string;
  isAdmin: boolean;
  name: string;
  email: string;
};

interface AuthContextProps {
  user: object;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@filedownload:token',
        '@filedownload:user',
      ]);

      if (token[1] && user[1])
        setData({token: token[1], user: JSON.parse(user[1])});
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({email, password}: SignInCredentials) => {
    const credentials = Buffer.from(`${email}:${password}`).toString('base64');

    const response = await api.post('/users/singin', null, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });

    const {token, user} = response.data;

    await AsyncStorage.multiSet([
      ['@filedownload:token', token],
      ['@filedownload:user', JSON.stringify(user)],
    ]);

    setData({token, user});
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@filedownload:token',
      '@filedownload:user',
    ]);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{user: data.user, loading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}
