import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {api} from '../services/api';
import {useDropdownAlert} from './DropdownAlertContext';

interface AuthState {
  cloudKeyId: string;
}

export interface ValidationCloudAccessProps {
  cloudKeyId: string;
}

interface CloudContextProps {
  cloudKeyId: string;
  loading: boolean;
  signIn(credentials: ValidationCloudAccessProps): Promise<void>;
  signOut(): void;
}

const CloudContext = createContext<CloudContextProps>({} as CloudContextProps);

export const CloudProvider: React.FC = ({children}) => {
  //@ts-ignore
  const {ref} = useDropdownAlert();

  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const cloudKeyId = await AsyncStorage.getItem('@rocketcloud:cloudKeyId');

      if (cloudKeyId) {
        setData({cloudKeyId});
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(
    async ({cloudKeyId}: ValidationCloudAccessProps) => {
      try {
        setLoading(true);
        await api.get('/cloud/access/', {
          headers: {cloudkeyId: cloudKeyId},
        });
        //3e8522f6-7f96-42e0-b1a4-89c82f801fa6

        await AsyncStorage.setItem('@rocketcloud:cloudKeyId', cloudKeyId);

        ref.current.alertWithType('success', 'Login realizado com sucesso...');

        setData({cloudKeyId});

        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@rocketcloud:cloudKeyId');

    setData({} as AuthState);
  }, []);

  return (
    <CloudContext.Provider
      value={{cloudKeyId: data.cloudKeyId, loading, signIn, signOut}}>
      {children}
    </CloudContext.Provider>
  );
};

export function useCloudAuth(): CloudContextProps {
  const context = useContext(CloudContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
