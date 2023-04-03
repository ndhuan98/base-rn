import Toast from 'react-native-toast-message';
import { TOAST_STATUS } from 'src/toastConfig';

class ToastMessageService {
  show = (status: TOAST_STATUS, title: string, message?: string) => {
    Toast.show({
      type: status,
      text1: title.toUpperCase(),
      text2: message || undefined,
      visibilityTime: 3000,
    });
  };
}

export const toastMessageService = new ToastMessageService();
