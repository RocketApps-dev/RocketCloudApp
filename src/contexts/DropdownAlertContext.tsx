import React, {createContext, useContext, useRef} from 'react';
import DropdownAlert, {DropdownAlertType} from 'react-native-dropdownalert';

const DropdownAlertContext = createContext(null);

export type DropdownAlertTypeProps = {
  type: 'info' | 'warn' | 'error' | 'custom' | 'success';
  title: string;
  message: string;
};

export const DropdownAlertTypeMessage = {
  Error: 'error',
  Alert: 'warn',
  Information: 'info',
  Success: 'success',
} as const;

export const DropdownAlertProvider: React.FC = ({children}) => {
  const ref = useRef<DropdownAlertType>();

  return (
    <DropdownAlertContext.Provider
      //@ts-ignore
      value={{ref}}>
      {children}

      <DropdownAlert
        //@ts-ignore
        ref={ref}
      />
    </DropdownAlertContext.Provider>
  );
};

export const useDropdownAlert = () => useContext(DropdownAlertContext);
