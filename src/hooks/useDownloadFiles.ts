import variables from '../config/variables';
import RNFS from 'react-native-fs';
import {api} from '../services/api';
import {useCloudAuth} from '../contexts/CloudContext';
import {useCallback, useState} from 'react';
import {PermissionsAndroid, Platform, ToastAndroid} from 'react-native';

export type CloudFilesProps = {
  id: string;
  cloudKeyId: string;
  location: string;
  eTag: string;
  bucket: string;
  key: string;
  uploadedFileName: string;
};

export const useDownloadFiles = () => {
  const {cloudKeyId} = useCloudAuth();

  const [cloudFileList, setCloudFileList] = useState<CloudFilesProps[]>([]);
  const [loading, setLoading] = useState(false);

  const checkPermissionPhone = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
      return true;
    }

    const permissionRead = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );

    const permissionWrite = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (permissionRead && permissionWrite) {
      return true;
    }

    const grantedPermissionReadStorage = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Permissão de leitura do aplicativo Meu Lugar',
        message:
          'Meu Lugar precisa de acesso à pasta local para que você possa armazenar arquivos',
        buttonNeutral: 'Perguntar depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    );

    const grantedPermissionWriteStorage = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Permissão de escrita do aplicativo Meu Lugar',
        message:
          'Meu Lugar precisa de permissão de escrita para que possa armazenar arquivos em seu dispositivo.',
        buttonNeutral: 'Perguntar depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    );

    if (
      grantedPermissionReadStorage === PermissionsAndroid.RESULTS.GRANTED &&
      grantedPermissionWriteStorage === PermissionsAndroid.RESULTS.GRANTED
    ) {
      return true;
    }

    return false;
  };

  const getCloudFileList = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/cloud/files', {
        headers: {cloudKeyId},
      });

      const files = response.data.files as CloudFilesProps[];

      setCloudFileList(files);
      setLoading(false);
    } catch (err) {
      setCloudFileList([]);
      setLoading(false);
    }
  }, []);

  const downloadFile = useCallback(
    async (fileName: string, fileKey: string) => {
      try {
        setLoading(true);

        if (await checkPermissionPhone()) {
          RNFS.downloadFile({
            fromUrl: `${
              variables.AMBIENT === 'DEV'
                ? variables.API_URL.DEV
                : variables.API_URL.PROD
            }/cloud/download/aws-s3`,
            headers: {cloudKeyId, fileKey},
            toFile: `${RNFS.DownloadDirectoryPath}/${fileName.replace(
              /\s/g,
              '',
            )}.apk`,
          })
            .promise.then(result => {
              setLoading(false);

              console.log(result);

              if (result.statusCode !== 200 && Platform.OS === 'android') {
                ToastAndroid.showWithGravityAndOffset(
                  'Erro ao baixar arquivo no servidor !!!',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );

                return;
              }

              if (result.statusCode === 200 && Platform.OS === 'android') {
                ToastAndroid.showWithGravityAndOffset(
                  'Arquivo baixado com sucesso !!!',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );

                return;
              }
            })
            .catch(err => {
              setLoading(false);

              if (Platform.OS === 'android') {
                ToastAndroid.showWithGravityAndOffset(
                  `Não foi possivel iniciar o download... Err: ${err.message}`,
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                  25,
                  50,
                );
              }
            });
        }
      } catch (err) {
        setLoading(false);
      }
    },
    [],
  );

  return {loading, cloudFileList, downloadFile, getCloudFileList};
};
