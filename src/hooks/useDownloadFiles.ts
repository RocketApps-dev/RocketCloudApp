import RNFS from 'react-native-fs';
import variables from '../config/variables';
import RNFetchBlob from 'rn-fetch-blob';
import {useDispatch} from 'react-redux';

import {api} from '../services/api';
import {Platform} from 'react-native';
import {useGlobalFunctions} from './useGlobalFunctions';
import {useAuth, UserProps} from '../contexts/AuthContext';
import {setProgressDownload} from '../redux/modules/download/downloadServices';
import {useCallback, useState} from 'react';
import {
  DropdownAlertTypeMessage,
  useDropdownAlert,
} from '../contexts/DropdownAlertContext';

export type CloudFilesProps = {
  id: string;
  cloudKeyId: string;
  location: string;
  eTag: string;
  bucket: string;
  key: string;
  uploadedFileName: string;
  presentationName: string;
  fileSize: number;
  iconFile?: string;
};

export const useDownloadFiles = () => {
  const dispatch = useDispatch();

  //@ts-ignore
  const {ref} = useDropdownAlert();
  const {user} = useAuth();
  const {checkPermissionPhone} = useGlobalFunctions();

  const [loading, setLoading] = useState(false);
  const [cloudFileList, setCloudFileList] = useState<CloudFilesProps[]>([]);

  const {cloudKeyId, roles} = user as UserProps;

  const getCloudFileList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/cloud/files', {
        headers: {cloudKeyId},
      });

      const files = response.data.files as CloudFilesProps[];

      setCloudFileList(
        files.map(file => {
          const megaBytesBase = 1024 ** 2;

          return {
            ...file,
            fileSize: file.fileSize / megaBytesBase,
          };
        }),
      );
      setLoading(false);
    } catch (err) {
      setCloudFileList([]);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadFile = useCallback(
    async (fileId: string, fileName: string, fileKey: string) => {
      if (loading) {
        ref.current.alertWithType(
          DropdownAlertTypeMessage.Alert,
          'Ops !!!',
          'Já existe um download em andamento, por favor aguarde !!!',
        );
      }

      setLoading(true);

      if (await checkPermissionPhone()) {
        const path = RNFS.TemporaryDirectoryPath;

        RNFS.downloadFile({
          fromUrl: `${
            variables.AMBIENT === 'DEV'
              ? variables.API_URL.DEV
              : variables.API_URL.PROD
          }/cloud/download/aws-s3`,
          headers: {cloudKeyId, fileKey},
          toFile: `${path}/${fileName.replace(/\s/g, '')}.apk`,
          readTimeout: 500000,
          progress: progress => {
            const percentageValue = (
              (progress.bytesWritten / progress.contentLength) *
              100
            ).toFixed(1);

            if (
              percentageValue === '15.5' ||
              percentageValue === '45.5' ||
              percentageValue === '65.5' ||
              percentageValue === '85.5' ||
              percentageValue === '97.5'
            ) {
              dispatch(
                setProgressDownload({
                  fileId: fileId,
                  progress: progress.bytesWritten / progress.contentLength,
                }),
              );
            }
          },
        })
          .promise.then(result => {
            setLoading(false);

            if (result.statusCode !== 200 && Platform.OS === 'android') {
              ref.current.alertWithType(
                DropdownAlertTypeMessage.Error,
                'Erro!',
                'Erro ao baixar arquivo no servidor !!!',
              );

              setProgressDownload({fileId: fileId, progress: 0});
              return;
            }

            if (result.statusCode === 200 && Platform.OS === 'android') {
              ref.current.alertWithType(
                DropdownAlertTypeMessage.Success,
                'Baixado!',
                'O arquivo foi baixado com sucesso !!!',
              );

              dispatch(setProgressDownload({fileId: fileId, progress: 0}));

              if (roles !== 'GOOGLE_TEST') {
                RNFetchBlob.android.actionViewIntent(
                  `${path}/${fileName.replace(/\s/g, '')}.apk`,
                  'application/vnd.android.package-archive',
                );
              }

              return;
            }
          })
          .catch(err => {
            setLoading(false);
            dispatch(setProgressDownload({fileId: fileId, progress: 0}));

            ref.current.alertWithType(
              DropdownAlertTypeMessage.Error,
              'Erro!',
              `Não foi possivel iniciar o download... Erro: ${err.message}`,
            );
          });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    loading,
    cloudFileList,
    downloadFile,
    getCloudFileList,
  };
};
