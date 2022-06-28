import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';

import {MiniButton} from '../../../../../components/MiniButton';
import {MaterialIcons} from '../../../../../components/Icons';

import * as S from './styles';
import {useDownloadFiles} from '../../../../../hooks/useDownloadFiles';
import {ToastAndroid} from 'react-native';

type Props = {
  id: string;
  fileKey: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  numberDownloads: number;
};

export const CardDownloadInfo: React.FC<Props> = ({
  id,
  fileKey,
  fileName,
  numberDownloads,
  fileSize,
}) => {
  const {loading: loadingDownload, downloadFile} = useDownloadFiles();

  async function handleDownloadFile() {
    if (loadingDownload) {
      ToastAndroid.showWithGravity(
        'Download está em processo !!!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );

      return;
    }

    downloadFile(fileName, fileKey).catch(err => console.log(err));
  }

  return (
    <S.Container>
      <S.BoxTop>
        <S.FileIcon>
          <MaterialIcons name="android" size={RFValue(35)} color="#000" />
        </S.FileIcon>

        <S.BoxFileDetails>
          <S.FileName>{fileName}</S.FileName>

          <S.BoxFileSize>
            <S.FileSizeText>{fileSize}</S.FileSizeText>
            <S.SubText>File size</S.SubText>
          </S.BoxFileSize>
        </S.BoxFileDetails>
      </S.BoxTop>
      <S.BottomBox>
        <MiniButton
          title="Download"
          icon="file-download"
          onPress={() => handleDownloadFile()}
          inProcessing={loadingDownload}
        />
        <MiniButton title="Share" icon="share" />
      </S.BottomBox>
    </S.Container>
  );
};
