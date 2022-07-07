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
  textColor?: string;
};

export const MiniButton: React.FC<Props> = ({
  icon,
  title,
  inProcessing,
  onPress,
  color,
  textColor,
}) => {
  return (
    <S.Container onPress={onPress} backgroundColor={color}>
      {!inProcessing ? (
        <>
          <S.TitleButton textColor={textColor}>{title}</S.TitleButton>
          <MaterialIcons
            name={icon}
            color={textColor ?? '#000'}
            size={RFValue(17)}
          />
        </>
      ) : (
        <ActivityIndicator color={textColor ?? '#000'} size={'small'} />
      )}
    </S.Container>
  );
};
