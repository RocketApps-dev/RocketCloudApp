import React from 'react';

import * as S from './styles';

type Props = {
  text: string;
  onPress?: () => void;
};

export const LargeButton: React.FC<Props> = ({text, onPress}) => {
  return (
    <S.ContainerTouchable onPress={onPress}>
      <S.Container>
        <S.TextButton>{text}</S.TextButton>
      </S.Container>
    </S.ContainerTouchable>
  );
};
