import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { asyncStorageService } from './asyncStorageServices';

class FCMService {
  register = async (onRegister: any, onNotification: any, onOpenNotification: any) => {
    await this.checkPermission(onRegister);
    await this.createNotificationListeners(onRegister, onNotification, onOpenNotification);
  };

  checkPermission = async (onRegister: any) => {
    console.log('%c Line:19 🍊 onRegister', 'color:#93c0a4', onRegister);
    try {
      let enabled = await messaging().hasPermission();
      console.log('%c Line:21 🥔 enabled', 'color:#4fff4B', enabled);
      if (enabled !== -1) {
        // User has permission
        await this.getToken(onRegister);
      } else {
        // User don't have permission
        await this.requestPermission(onRegister);
      }
    } catch (e) {
      console.error('[FCMService] Permission Rejected', e);
    }
  };

  getToken = async (onRegister?: (arg0: string) => void) => {
    try {
      const fcmToken = await messaging().getToken();
      console.log('%c Line:38 🍫 fcmToken', 'color:#b03734', fcmToken);
      if (fcmToken) {
        if (onRegister) {
          onRegister(fcmToken);
        }
        await asyncStorageService.syncToDevice('clientId', fcmToken);
        return fcmToken;
      } else {
        console.log('[FCMService] User does not have a devices token');
      }
    } catch (e) {
      console.error('[FCMService] getToken Rejected', e);
    }
  };

  requestPermission = async (onRegister: any) => {
    try {
      await messaging().requestPermission({ providesAppNotificationSettings: true });
      await this.getToken(onRegister);
    } catch (e) {
      console.log('[FCMService] Request Permission Rejected', e);
    }
  };

  deleteToken = () => {
    console.log('[FCMService] Delete Token');
    messaging()
      .deleteToken()
      .catch(error => {
        console.error('[FCMService] Delete Token Error', error);
      });
  };

  createNotificationListeners = async (
    onRegister: (arg0: string) => void,
    onNotification: (arg0: FirebaseMessagingTypes.RemoteMessage | { [key: string]: string } | undefined) => void,
    onOpenNotification: (arg0: FirebaseMessagingTypes.RemoteMessage) => void,
  ) => {
    // When Application Running on Background
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('[FCMService] OnNotificationOpenedApp getInitialNotification', remoteMessage);
      if (remoteMessage) {
        onOpenNotification(remoteMessage);
      }
    });

    // When Application open from quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('[FCMService] getInitialNotification getInitialNotification', remoteMessage);
        if (remoteMessage) {
          // localNotificationService.cancelAllLocalNotifications();
          onOpenNotification(remoteMessage);
        }
      })
      .catch(e => {
        console.log('%c Line:93 🥐 e', 'color:#e41a6a', e);
      });

    // Foreground state message
    messaging().onMessage(async remoteMessage => {
      console.log('[FCMService] A new FCM message arrived', remoteMessage);
      if (remoteMessage) {
        onNotification(remoteMessage);
      }
    });

    // Register background handler
    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //   console.log('[FCMService] A new FCM background handler', remoteMessage);
    //   if (remoteMessage) {
    //     onNotification(remoteMessage);
    //   }
    // });

    // Triggered when have new Token
    messaging().onTokenRefresh(fcmToken => {
      console.log('[FCMService] New token refresh', fcmToken);
      onRegister(fcmToken);
    });
  };
}

export const fcmService = new FCMService();
