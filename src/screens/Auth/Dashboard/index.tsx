import React, {useEffect} from 'react';
import {ScrollView, ToastAndroid} from 'react-native';

import {Header} from '../../../components/Header';
import {useDownloadFiles} from '../../../hooks/useDownloadFiles';
import {CardDownloadInfo} from './components/CardDownloadInfo';

import * as S from './styles';

export const Dashboard: React.FC = () => {
  const {cloudFileList, getCloudFileList} = useDownloadFiles();

  useEffect(() => {
    async function handleGetCloudFiles() {
      await getCloudFileList().catch(err => {
        ToastAndroid.showWithGravity(
          err.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
    }

    if (cloudFileList.length === 0) {
      handleGetCloudFiles();
    }
  });

  return (
    <>
      <Header />
      <ScrollView>
        <S.Container>
          {cloudFileList.map(file => (
            <CardDownloadInfo
              key={file.id}
              id={file.id}
              fileKey={file.key}
              fileName={file.uploadedFileName}
              fileSize={'85Mb'}
              fileUrl={file.location}
              numberDownloads={2}
            />
          ))}
        </S.Container>
      </ScrollView>
    </>
  );
};
