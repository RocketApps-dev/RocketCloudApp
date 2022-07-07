import React from 'react';
import {useForm} from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {logos} from '../../../assets';
import {Input} from '../../../components/Input';
import {useAuth} from '../../../contexts/AuthContext';
import {LargeButton} from '../../../components/LargeButton';
import {
  DropdownAlertTypeMessage,
  useDropdownAlert,
} from '../../../contexts/DropdownAlertContext';

import * as S from './styles';

type SignInProps = {
  username: string;
  password: string;
};

export const SignIn: React.FC = () => {
  //@ts-ignore
  const {ref} = useDropdownAlert();
  const {control, handleSubmit} = useForm();
  const {signIn} = useAuth();

  const handleSignInAccount = async (data: any) => {
    const {username, password} = data as SignInProps;

    if (!username) {
      ref.current.alertWithType(
        DropdownAlertTypeMessage.Alert,
        'Ops !!!',
        'Por favor insira um usuario valido !!!',
      );

      return;
    }

    if (!password) {
      ref.current.alertWithType(
        DropdownAlertTypeMessage.Alert,
        'Ops !!!',
        'O campo senha não pode estar vazio !!!',
      );

      return;
    }

    signIn({username, password});
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.ImageBackground source={logos.cloudLogo} resizeMode="cover" />
          <S.FormBox>
            <Input
              text="Username"
              placeholder="@usertest"
              name="username"
              control={control}
            />
            <Input
              text="Password"
              placeholder=""
              name="password"
              control={control}
              isSecure
            />

            <View style={{height: 20}} />

            <LargeButton
              text="Acessar"
              onPress={handleSubmit(handleSignInAccount)}
            />

            <View style={{height: 20}} />

            <S.TextBottom>Seus arquivos estão seguros conosco</S.TextBottom>

            {/* <S.BoxBottom>
              <View style={{height: 20}} />
              <S.TextBottom>
                Read our Privacy Policy and Terms and {'\n'}Conditions
              </S.TextBottom>
            </S.BoxBottom> */}
          </S.FormBox>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
