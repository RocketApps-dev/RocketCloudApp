import React, {memo} from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import {useSelector} from 'react-redux';

import {RootState} from '../../../../../redux/store';
import {MiniButton} from '../../../../../components/MiniButton';
import {MaterialIcons} from '../../../../../components/Icons';
import {useDownloadFiles} from '../../../../../hooks/useDownloadFiles';
import {
  DropdownAlertTypeMessage,
  useDropdownAlert,
} from '../../../../../contexts/DropdownAlertContext';

import * as S from './styles';

type Props = {
  id: string;
  fileKey: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  numberDownloads: number;
  iconFile?: string;
  isTv?: boolean;
};

const CardDownloadInfo: React.FC<Props> = ({
  id,
  isTv,
  fileKey,
  fileName,
  fileSize,
  iconFile,
}) => {
  //@ts-ignore
  const {ref} = useDropdownAlert();
  const {loading: loadingDownload, downloadFile} = useDownloadFiles();
  const progressDownload = useSelector((state: RootState) => state.download);

  async function handleDownloadFile() {
    if (loadingDownload || progressDownload.progress > 0) {
      ref.current.alertWithType(
        DropdownAlertTypeMessage.Alert,
        'Ops !!!',
        'Já existe um download em andamento, por favor aguarde...',
      );

      return;
    }

    downloadFile(id, fileName, fileKey).catch(err => console.log(err));
  }

  return (
    <S.Container isTV={isTv}>
      <S.BoxTop>
        <S.FileIcon>
          {!iconFile ? (
            <MaterialIcons name="android" size={RFValue(35)} color="#000" />
          ) : (
            <S.IconFile source={{uri: iconFile}} />
          )}
        </S.FileIcon>

        <S.BoxFileDetails>
          <S.FileName>{fileName}</S.FileName>

          <S.BoxFileSize>
            <S.FileSizeText>{fileSize}</S.FileSizeText>
            <S.SubText>File size</S.SubText>
          </S.BoxFileSize>

          <S.ProgressBox>
            <ProgressBar
              styleAttr="Horizontal"
              progress={
                id === progressDownload.fileId ? progressDownload.progress : 0
              }
              indeterminate={false}
            />
          </S.ProgressBox>
        </S.BoxFileDetails>
      </S.BoxTop>
      <S.BottomBox>
        <MiniButton
          title="Download"
          icon="file-download"
          onPress={() => handleDownloadFile()}
          inProcessing={loadingDownload}
          color={'#4d5dfa'}
          textColor={'#FFF'}
        />
        <MiniButton title="Share" icon="share" />
      </S.BottomBox>
    </S.Container>
  );
};

export default memo(CardDownloadInfo);
