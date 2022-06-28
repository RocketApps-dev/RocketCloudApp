import React from 'react';
import {ActivityIndicator} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import {MaterialIcons} from '../Icons';

import * as S from './styles';

type Props = {
  title: string;
  icon: string;
  onPress?: () => void;
  inProcessing?: boolean;
  color?: string;
};

export const MiniButton: React.FC<Props> = ({
  icon,
  title,
  inProcessing,
  onPress,
  color
}) => {
  return (
    <S.Container onPress={onPress} backgroundColor={color}>
      {!inProcessing ? (
        <>
          <S.TitleButton>{title}</S.TitleButton>
          <MaterialIcons name={icon} color={'#000'} size={RFValue(17)} />
        </>
      ) : (
        <ActivityIndicator color="#616161" size={'small'} />
      )}
    </S.Container>
  );
};
