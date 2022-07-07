import React, {useEffect} from 'react';
import {Routes} from './src/routes';

import variables from './src/config/variables';

import {NavigationContainer} from '@react-navigation/native';
import {DropdownAlertProvider} from './src/contexts/DropdownAlertContext';
import {Provider as ReduxProvider} from 'react-redux';

import {store as storeRedux} from './src/redux/store';
import {AuthProvider} from './src/contexts/AuthContext';

const App = () => {
  return (
    <NavigationContainer theme={{colors: {background: '#DCDCDC'}}}>
      <ReduxProvider store={storeRedux}>
        <DropdownAlertProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </DropdownAlertProvider>
      </ReduxProvider>
    </NavigationContainer>
  );
};

export default App;
