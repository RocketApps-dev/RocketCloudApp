import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;

  padding: ${RFValue(50)}px 0px 0px 0px;

  background-color: #f6fafd;
`;

export const ImageBackground = styled.Image`
  width: ${RFValue(200)}px;
  height: ${RFValue(200)}px;

  position: absolute;
  top: ${RFValue(50)}px;
`;

export const BoxBottom = styled.View`
  position: absolute;
  bottom: ${RFValue(15)}px;

  width: 100%;

  align-items: center;
`;

export const TextBottom = styled.Text`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(19)}px;
  text-align: center;
  letter-spacing: ${RFValue(-0.333333)}px;

  color: #7c82ba;

  margin: 7px;
`;
