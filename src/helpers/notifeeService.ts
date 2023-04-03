import notifee, { AndroidImportance, AndroidStyle, AndroidVisibility } from '@notifee/react-native';
import { appColors } from 'src/utils/theme';
import { rootNavigate } from '../navigator/RootNavigation';
import { AppRoutes } from '../navigator/types';
import { isAndroid } from '../utils/common';

class NotifeeService {
  send = async (notify: any) => {
    // Required for iOS
    // See https://notifee.app/react-native/docs/ios/permissions
    await notifee.requestPermission();
    const { body, title, android } = notify.notification;

    // Create a channel required for Android Notifications
    const channelId = await notifee.createChannel({
      id: android?.channelId || 'default',
      name: 'WeCheck',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      badge: true,
    });

    //Press action
    let clickAction = isAndroid ? android?.clickAction : notify.category;

    let idAction = notify?.data?.conversation ? notify?.data?.conversation : '1';

    if (clickAction === 'FAST_SURVEY_PREVIEW') {
      clickAction += `&${notify.data?.surveyId}`;
    }

    // Display a notification
    await notifee.displayNotification({
      title: isAndroid ? `<p style="font-weight: 500"><b>${title}</span></p></b></p>` : title,
      // title: isAndroid ? 'Admin CDI đã gửi 1 tin nhắn' : 'Admin CDI đã gửi 1 tin nhắn',
      body,
      data: { [clickAction]: idAction },
      android: {
        channelId,
        color: appColors.main,
        largeIcon: require('../../android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png'),
        timestamp: Date.now(),
        showTimestamp: true,
        style: {
          type: AndroidStyle.BIGTEXT,
          text: body,
        },
        pressAction: {
          id: 'default',
          launchActivity: 'default',
        },
      },
      ios: {
        categoryId: '',
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
      },
    });
  };
  press = (actionPress: keyof typeof AppRoutes, param?: any) => {
    

    if (actionPress.length > 0) {
      rootNavigate(AppRoutes[actionPress], param);
    }
  };
}
export const notifeeService = new NotifeeService();
