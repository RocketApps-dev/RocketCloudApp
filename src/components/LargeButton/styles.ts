import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const ContainerTouchable = styled.TouchableOpacity`
  background: #4d5dfa;

  box-sizing: border-box;

  border-radius: ${RFValue(20)}px;
  border: ${RFValue(1)}px solid #4d5dfa;

  elevation: 2;
`;

export const Container = styled.View`
  width: ${RFValue(304)}px;
  height: 50px;

  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  font-family: 'Spartan';
  font-style: normal;
  font-weight: 700;
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(17)}px;
  text-align: center;
  letter-spacing: ${RFValue(-0.333333)}px;

  color: #ffffff;
`;
