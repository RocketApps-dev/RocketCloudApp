import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {useCloudAuth} from '../../contexts/CloudContext';

import {MaterialIcons} from '../Icons';

import * as S from './styles';

export const Header: React.FC = () => {
  const {signOut} = useCloudAuth();

  return (
    <S.Container>
      <S.TitleHeader>Bem vindo ao RocketCloud</S.TitleHeader>

      <S.ButtonLogOff onPress={() => signOut()}>
        <MaterialIcons name="logout" color={'#000'} size={RFValue(24)} />
      </S.ButtonLogOff>
    </S.Container>
  );
};
