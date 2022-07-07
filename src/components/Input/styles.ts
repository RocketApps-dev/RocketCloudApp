import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: ${RFValue(304)}px;
  height: 45px;

  background: #edefff;

  border-radius: 15px;

  elevation: 2;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin: ${RFValue(10)}px;
`;

export const TitleTextArea = styled.Text`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(17)}px;
  text-align: center;
  letter-spacing: ${RFValue(-0.333333)}px;

  color: #616161;

  margin-right: ${RFValue(10)}px;
`;

export const Input = styled.TextInput`
  width: 55%;
  height: 100%;

  text-align: center;
`;
