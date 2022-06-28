import React, {useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

import {RFValue} from 'react-native-responsive-fontsize';
import {Controller, Control} from 'react-hook-form';

import {MaterialIcons} from '../Icons';

import * as S from './styles';
import {ToastAndroid, TouchableOpacity} from 'react-native';

type Props = {
  name: string;
  text: string;
  value?: string;
  control: Control;
  isSecure?: boolean;
  placeholder: string;
  noneReactHookForm?: boolean;
};

export const Input: React.FC<Props> = ({
  name,
  text,
  control,
  placeholder,
  isSecure,
  noneReactHookForm,
}) => {
  const [valueField, setValueField] = useState('');

  const copyToClipboard = () => {
    Clipboard.setString(valueField);
  };

  const fetchCopiedText = async () => {
    try {
      const textClipboard = await Clipboard.getString();
      setValueField(textClipboard);
    } catch (err) {
      ToastAndroid.showWithGravity(
        err.message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  return noneReactHookForm ? (
    <S.Container>
      <S.TitleTextArea>{text}</S.TitleTextArea>
      <S.Input
        value={valueField}
        placeholder={placeholder}
        onChangeText={value => setValueField(value)}
        secureTextEntry={isSecure}
      />
      <TouchableOpacity
        onPress={() => {
          if (!valueField) {
            fetchCopiedText();
            return;
          }
          copyToClipboard();
        }}>
        <MaterialIcons
          name="content-copy"
          color={'#616161'}
          size={RFValue(24)}
        />
      </TouchableOpacity>
    </S.Container>
  ) : (
    <Controller
      name={name}
      control={control}
      render={({field: {value, onChange}}) => (
        <S.Container>
          <S.TitleTextArea>{text}</S.TitleTextArea>
          <S.Input
            value={value}
            placeholder={placeholder}
            onChangeText={onChange}
            secureTextEntry={isSecure}
          />
        </S.Container>
      )}
    />
  );
};
