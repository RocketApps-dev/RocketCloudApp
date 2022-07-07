import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import {useAuth} from '../contexts/AuthContext';
import {AuthRoutes} from './auth.routes';
import {PublicRoutes} from './public.routes';

export const Routes: React.FC = () => {
  const {loading, user} = useAuth();

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return !user ? <PublicRoutes /> : <AuthRoutes />;
};
