import React, { useEffect, useState } from 'react';
// import { useAppState } from 'src/hooks/useAppState';
import SplashNavigator from './splash-navigator';
import { AppRoutes } from './types';
// import { IRegisterFormFields } from 'src/models/authentication';
// import { AsyncStorageKey, asyncStorageService } from 'src/helpers/asyncStorageServices';
// import { fcmService } from 'src/helpers/fcmService';
// import { notifeeService } from 'src/helpers/notifeeService';
import AppNavigator from './app-navigator';
import AuthenticationNavigator from './authentication-navigator';

export type RootStackParamList = {
  [AppRoutes.LOGIN]: undefined;
  [AppRoutes.HOME]: undefined;
  [AppRoutes.LAUNCH]:undefined;
  [AppRoutes.FORGOT_PASSWORD]:undefined
  // [AppRoutes.SPLASH_MAIN]:undefined;
  // [AppRoutes.OTP]: { user: IRegisterFormFields; confirmType: string };
};
export default function RootNavigator() {
  return <AppNavigator />
}
// export default function RootNavigator() {
//   console.log('root')
//   // const {
//   //   appLaunched,
//   //   appLoggedIn,
//   //   onSetReduxAccessToken,
//   //   onSetAppLaunched,
//   //   onSetAppLoggedIn,
//   //   onSetCurrentUser,
//   //   onCountUnseenNotification,
//   // } = useAppState();
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   (async () => {
//   //     const appLaunchedStorageValue = await asyncStorageService.getSyncedFromDevice(AsyncStorageKey.APP_LAUNCHED);
//   //     if (appLaunchedStorageValue) {
//   //       await onSetAppLaunched();
//   //       let userFromStorage = await asyncStorageService.getSyncedFromDevice(AsyncStorageKey.USER);
//   //       let accessToken = await asyncStorageService.getSyncedFromDevice(AsyncStorageKey.ACCESS_TOKEN);
//   //       if (userFromStorage) {
//   //         await onSetAppLoggedIn();
//   //         await onSetReduxAccessToken(accessToken);
//   //         await onSetCurrentUser(userFromStorage);
//   //       }
//   //     }
//   //     setLoading(false);
//   //   })();
//   //   (async () => {
//   //     // await fcmService.register(onRegister, onNotification, onOpenNotification);
//   //   })();
//   //   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, []);

//   const onRegister = (token: string) => {
//     console.log('[App] Client ID: ', token);
//   };

//   const onNotification = async (notify: any) => {
//     console.log('[App] onNotification', notify);
//     // await notifeeService.send(notify);
//     // await onCountUnseenNotification();
//   };

//   const onOpenNotification = async (notify: { data: { type: string } }) => {
//     console.log('notify', notify);
//   };

//   if (loading) {
//     return null;
//   }

//   // if (!appLaunched) {
//   //   return <AppNavigator />;
//   // }

//   // return appLoggedIn ? <AppNavigator /> : <AuthenticationNavigator />;
//   return <AppNavigator />
// }
