import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(87)}px;

  background: #4d5dfa;

  flex-direction: row;
  align-items: center;

  padding: 20px;

  elevation: 2;
`;

export const TitleHeader = styled.Text`
  font-family: 'Spartan';
  font-style: normal;
  font-weight: 600;
  font-size: ${RFValue(16)}px;
  line-height: ${RFValue(18)}px;

  color: #fff;

  padding-right: 40px;
`;

export const ButtonLogOff = styled.TouchableOpacity`
  position: absolute;
  top: ${RFValue(20)}px;
  right: ${RFValue(10)}px;

  width: ${RFValue(43)}px;
  height: ${RFValue(43)}px;

  background-color: #f5f5f5;
  border-radius: 5px;

  align-items: center;
  justify-content: center;

  elevation: 2;
`;
