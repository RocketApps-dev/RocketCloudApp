import {PermissionsAndroid, Platform} from 'react-native';

export const useGlobalFunctions = () => {
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

    // const permissionPackageInstaller = await PermissionsAndroid.check(
    //   PermissionsAndroid.PERMISSIONS.REQUEST_INSTALL_PACKAGES,
    // );

    if (permissionRead && permissionWrite) {
      return true;
    }

    // const grantedPackageInstallerPermission = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.REQUEST_INSTALL_PACKAGES,
    //   {
    //     title: 'Permissão para instalação de aplicativos',
    //     message:
    //       'RocketCloud precisa de permissão para instalação de aplicativos',
    //     buttonNeutral: 'Perguntar depois',
    //     buttonNegative: 'Cancelar',
    //     buttonPositive: 'OK',
    //   },
    // );

    const grantedPermissionReadStorage = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Permissão de leitura do aplicativo RocketCloud',
        message:
          'RocketCloud precisa de acesso à pasta local para que você possa armazenar arquivos',
        buttonNeutral: 'Perguntar depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    );

    const grantedPermissionWriteStorage = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Permissão de escrita do aplicativo RocketCloud',
        message:
          'RocketCloud precisa de permissão de escrita para que possa armazenar arquivos em seu dispositivo.',
        buttonNeutral: 'Perguntar depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    );

    if (
      grantedPermissionReadStorage === PermissionsAndroid.RESULTS.GRANTED &&
      grantedPermissionWriteStorage === PermissionsAndroid.RESULTS.GRANTED
      // grantedPackageInstallerPermission === PermissionsAndroid.RESULTS.GRANTED
    ) {
      return true;
    }

    return false;
  };

  return {
    checkPermissionPhone,
  };
};
