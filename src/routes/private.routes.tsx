import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const PrivateRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={<></>} />
    </Stack.Navigator>
  );
};
