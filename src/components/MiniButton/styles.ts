import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

type ContainerProps = {
  backgroundColor?: string;
};

export const Container = styled.TouchableOpacity<ContainerProps>`
  width: ${RFValue(100)}px;
  height: ${RFValue(35)}px;

  background: ${({backgroundColor}) => backgroundColor ?? '#edefff'};

  elevation: 2;

  border-radius: 8px;

  margin: ${RFValue(5)}px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TitleButton = styled.Text`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 600;
  font-size: ${RFValue(11)}px;
  line-height: ${RFValue(15)}px;
  text-align: center;
  letter-spacing: ${RFValue(-0.333333)}px;

  color: #616161;

  margin-right: 10px;
`;
