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
import {
  DropdownAlertTypeMessage,
  useDropdownAlert,
} from './DropdownAlertContext';

export type UserAuthProps = {
  name: string;
  email: string;
};

interface AuthState {
  token: string;
  user: object;
}

export interface SignInCredentials {
  username: string;
  password: string;
}

export type UserProps = {
  name: string;
  email: string;
  roles: string;
  cloudKeyId: string;
};

interface AuthContextProps {
  user: object;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({children}) => {
  //@ts-ignore
  const {ref} = useDropdownAlert();

  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@rocketcloud:token',
        '@rocketcloud:user',
      ]);

      if (token[1] && user[1]) {
        setData({token: token[1], user: JSON.parse(user[1])});
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(
    async ({username, password}: SignInCredentials) => {
      try {
        setLoading(true);

        const credentials = Buffer.from(`${username}:${password}`).toString(
          'base64',
        );

        const response = await api.post('/users/auth', null, {
          headers: {Authorization: `Basic ${credentials}`},
        });

        const {token, user} = response.data;

        await AsyncStorage.multiSet([
          ['@rocketcloud:token', token],
          ['@rocketcloud:user', JSON.stringify(user)],
        ]);

        setData({token, user});
        setLoading(false);
      } catch (err) {
        ref.current.alertWithType(
          DropdownAlertTypeMessage.Error,
          'Error!!!',
          `Erro ao efetuar login Erro: ${err.message}`,
        );

        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@rocketcloud:token', '@rocketcloud:user']);

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

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
