import {ViewStyle} from 'react-native';
import styled, {css} from 'styled-components/native';

type ContainerProps = {
  isTV?: boolean;
};

export const Container = styled.View<ContainerProps>`
  width: 100%;

  background-color: #dcdcdc;

  align-items: center;

  padding: 10px;
  margin-bottom: 100px;

  ${({isTV}) =>
    isTV &&
    css`
      margin-bottom: 120px;
    `}
`;

export const FlatListStyle: ViewStyle = {
  width: '100%',
  paddingTop: 10,
  marginHorizontal: 10,
};

export const ContainerActivityIndicatorStyle: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
};
