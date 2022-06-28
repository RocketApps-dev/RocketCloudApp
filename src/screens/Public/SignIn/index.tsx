import React from 'react';
import {useForm} from 'react-hook-form';
import {KeyboardAvoidingView, Platform, ToastAndroid} from 'react-native';

import {logos} from '../../../assets';
import {Input} from '../../../components/Input';
import {LargeButton} from '../../../components/LargeButton';
import {useCloudAuth} from '../../../contexts/CloudContext';

import * as S from './styles';

type SignInProps = {
  cloudKeyId: string;
};

export const SignIn: React.FC = () => {
  const {control, handleSubmit} = useForm();
  const {signIn} = useCloudAuth();

  const handleSignInAccount = async (data: any) => {
    const {cloudKeyId} = data as SignInProps;

    if (!cloudKeyId) {
      ToastAndroid.showWithGravity(
        'Por favor digite um ID valido',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );

      return;
    }

    //3e8522f6-7f96-42e0-b1a4-89c82f801fa6

    signIn({cloudKeyId}).catch(err => {
      ToastAndroid.showWithGravity(
        err.message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    });
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <S.Container>
        <S.ImageBackground source={logos.cloudLogo} resizeMode="cover" />
        <Input
          text="Your Cloud ID"
          placeholder="@usertest"
          name="cloudKeyId"
          control={control}
        />

        <S.BoxBottom>
          <LargeButton
            text="Acessar"
            onPress={handleSubmit(handleSignInAccount)}
          />

          <S.TextBottom>Seus arquivos estão seguros conosco</S.TextBottom>
          <S.TextBottom>
            Read our Privacy Policy and Terms and {'\n'}Conditions
          </S.TextBottom>
        </S.BoxBottom>
      </S.Container>
    </KeyboardAvoidingView>
  );
};
