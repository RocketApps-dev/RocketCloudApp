import React from 'react';

import {Dashboard} from '../screens/Auth/Dashboard';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const AuthRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={Dashboard} />
    </Stack.Navigator>
  );
};
