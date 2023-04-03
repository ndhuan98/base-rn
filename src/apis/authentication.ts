import { AuthAPI } from 'src/apis/api';
import axiosIns, { syncAuthToDevice } from 'src/helpers/axiosInterceptor';
import {
  IChangePasswordFormFields,
  ILoginFormFields,
  IRegisterFormFields,
  IResetPasswordFormFields,
} from '../models/authentication';
import { Alert } from 'react-native';
import { toastMessageService } from '../helpers/toastMessageService';
import { TOAST_STATUS } from '../toastConfig';
import { fcmService } from 'src/helpers/fcmService';
import { combineUrlParams } from '../utils/common';

export default {
  async login({ phone, password }: ILoginFormFields) {
    try {
      const deviceToken = await fcmService.getToken();
      const response = await axiosIns.post(AuthAPI.LOGIN, { phone, password, deviceToken });
      if (response.data?.data) {
        await syncAuthToDevice(response.data.data);
        return response.data.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      Alert.alert('Thông báo', error?.message);
    }
  },

  async validatePhone(phone: string, type: string) {
    try {
      const response = await axiosIns.get(combineUrlParams(AuthAPI.VALIDATE_PHONE, { phone, type }));
      if (response.data.statusCode === 200) {
        return true;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error: any) {
      Alert.alert('Thông báo', error?.message);
      return false;
    }
  },

  requestOTP(phone: string, otpType: string) {
    return new Promise(async (resolve, reject) => {
      axiosIns
        .post(AuthAPI.REQUEST_OTP, { phone, otpType })
        .then(response => {
          if (response.data?.statusCode === 200) {
            resolve(true);
          } else {
            reject(response.data?.message);
          }
        })
        .catch(e => {
          reject(e.message);
        });
    });
  },

  verifyOTP(phone: string, otpCode: string) {
    return new Promise(async (resolve, reject) => {
      axiosIns
        .post(AuthAPI.VERIFY_OTP, { phone, otpCode })
        .then(response => {
          if (response.data?.statusCode === 200) {
            resolve(true);
          } else {
            reject(response.data?.message);
          }
        })
        .catch(e => {
          reject(e.message);
        });
    });
  },

  register(payload: IRegisterFormFields) {
    return new Promise(async (resolve, reject) => {
      axiosIns
        .post(AuthAPI.REGISTER, { ...payload })
        .then(response => {
          if (response.data?.statusCode === 201) {
            syncAuthToDevice(response.data?.data);
            resolve(true);
          } else {
            reject(response.data?.message);
          }
        })
        .catch(e => {
          reject(e.message);
        });
    });
  },

  resetPassword(payload: IResetPasswordFormFields) {
    return new Promise(async (resolve, reject) => {
      axiosIns
        .post(AuthAPI.RESET_PASSWORD, { ...payload })
        .then(response => {
          if (response.data?.statusCode === 200) {
            resolve(true);
          } else {
            reject(response.data?.message);
          }
        })
        .catch(e => {
          reject(e.message);
        });
    });
  },

  changePassword(payload: IChangePasswordFormFields) {
    return new Promise(async (resolve, reject) => {
      axiosIns
        .post(AuthAPI.CHANGE_PASSWORD, { ...payload })
        .then(response => {
          if (response.data?.statusCode === 200) {
            toastMessageService.show(TOAST_STATUS.SUCCESS_CUSTOM, 'Thông báo', 'Cập nhật mật khẩu thành công');
            resolve(true);
          } else {
            reject(response.data?.message);
          }
        })
        .catch(e => {
          reject(e.message);
        });
    });
  },
};
