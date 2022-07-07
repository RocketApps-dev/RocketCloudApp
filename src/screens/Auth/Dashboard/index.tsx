import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  ScrollView,
  ToastAndroid,
  View,
} from 'react-native';

import variables from '../../../config/variables';

import {Header} from '../../../components/Header';
import {useDownloadFiles} from '../../../hooks/useDownloadFiles';
import CardDownloadInfo from './components/CardDownloadInfo';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cloudFileList]);

  function handleViewDownloadListByDevice() {
    return Platform.isTV ? (
      <S.Container isTV>
        <FlatList
          data={cloudFileList}
          style={S.FlatListStyle}
          numColumns={2}
          renderItem={({item: file}) => (
            <CardDownloadInfo
              isTv
              key={file.id}
              id={file.id}
              fileKey={file.key}
              fileName={file.presentationName}
              fileSize={`${file.fileSize.toPrecision(2)} Mb`}
              fileUrl={file.location}
              numberDownloads={2}
              iconFile={
                file.iconFile &&
                `${variables.API_URL.PROD}/public/${file.iconFile}`
              }
            />
          )}
        />
      </S.Container>
    ) : (
      <ScrollView>
        <S.Container>
          {cloudFileList.map(file => (
            <CardDownloadInfo
              key={file.id}
              id={file.id}
              fileKey={file.key}
              fileName={file.presentationName}
              fileSize={`${file.fileSize.toPrecision(2)} Mb`}
              fileUrl={file.location}
              numberDownloads={2}
              iconFile={
                file.iconFile &&
                `${variables.API_URL.PROD}/public/${file.iconFile}`
              }
            />
          ))}
        </S.Container>
      </ScrollView>
    );
  }

  return (
    <>
      <Header />

      {cloudFileList.length > 0 ? (
        handleViewDownloadListByDevice()
      ) : (
        <View style={S.ContainerActivityIndicatorStyle}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </>
  );
};
