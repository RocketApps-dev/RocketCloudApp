import styled, {css} from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

type ContainerProps = {
  isTV?: boolean;
};

export const Container = styled.View<ContainerProps>`
  ${({isTV}) =>
    isTV
      ? css`
          width: 47.5%;
        `
      : css`
          width: 100%;
        `}

  height: ${RFValue(160)}px;

  background: #ffffff;
  border-radius: 10px;

  margin: ${RFValue(5)}px;

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

export const IconFile = styled.Image`
  width: 100%;
  height: 100%;

  border-radius: ${RFValue(5)}px;
`;

export const FileName = styled.Text`
  font-family: 'Spartan';
  font-style: normal;
  font-weight: 700;
  font-size: ${RFValue(20)}px;
  line-height: ${RFValue(22)}px;
  letter-spacing: ${RFValue(-0.333333)}px;

  color: #616161;
`;

export const BoxFileDetails = styled.View`
  width: 75%;

  padding: ${RFValue(5)}px;
`;

export const BoxFileSize = styled.View`
  width: 70px;

  margin-top: ${RFValue(5)}px;

  align-items: center;
  justify-content: center;
`;

export const FileSizeText = styled.Text`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: ${RFValue(15)}px;
  line-height: ${RFValue(19)}px;

  color: #4d5dfa;
`;

export const ProgressBox = styled.View`
  width: 200px;
  height: 10px;

  justify-content: center;

  margin: ${RFValue(5)}px;
`;

export const SubText = styled.Text`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: ${RFValue(10)}px;
  line-height: ${RFValue(14)}px;

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
