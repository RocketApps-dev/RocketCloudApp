import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
  width: 100%;
  height: 190px;

  background: #ffffff;
  border-radius: 20px;

  elevation: 2;
`;

export const BoxTop = styled.View`
  width: 100%;

  padding: 20px;

  flex-direction: row;
`;

export const FileIcon = styled.View`
  width: ${RFValue(50)}px;
  height: ${RFValue(50)}px;

  border-radius: ${RFValue(5)}px;

  background-color: white;

  align-items: center;
  justify-content: center;

  margin-right: ${RFValue(30)}px;

  elevation: 2;
`;

export const FileName = styled.Text`
  font-family: 'Spartan';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
  letter-spacing: -0.333333px;

  color: #616161;
`;

export const BoxFileDetails = styled.View`
  width: 75%;

  padding: ${RFValue(5)}px;
`;

export const BoxFileSize = styled.View`
  width: 70px;

  align-items: center;
  justify-content: center;

  align-items: center;
`;

export const FileSizeText = styled.Text`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;

  color: #4d5dfa;
`;

export const SubText = styled.Text`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #616161;
`;

export const BottomBox = styled.View`
  position: absolute;
  bottom: 0;

  width: 100%;
  height: ${RFValue(60)}px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
