import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {CloudProvider} from './src/contexts/CloudContext';
import {Routes} from './src/routes';

const App = () => {
  return (
    <NavigationContainer>
      <CloudProvider>
        <Routes />
      </CloudProvider>
    </NavigationContainer>
  );
};

export default App;
