import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AsyncStorageKey, asyncStorageService } from './asyncStorageServices';
import { AuthAPI } from 'src/apis/api';
import { toastMessageService } from './toastMessageService';
import { TOAST_STATUS } from 'src/toastConfig';
import { Alert } from 'react-native';
import { AppRoutes } from 'src/navigator/types';
import { rootNavigate } from 'src/navigator/RootNavigation';
import { AppConfig } from 'src/utils/variables/appInfo';

// export const URL_HOST = 'http://192.168.2.12:5678';
export const URL_HOST = AppConfig.environmentUatAPI;

let configNetwork = {
  _retry: false,
};

let headers = {};

const axiosIns = axios.create({
  baseURL: URL_HOST,
  headers,
  timeout: 30 * 60 * 1000,
  withCredentials: true,
});

export const syncAuthToDevice = async (data: any) => {
  if (data) {
    await asyncStorageService.syncToDevice(AsyncStorageKey.USER, data?.user);
    await asyncStorageService.syncToDevice(AsyncStorageKey.ACCESS_TOKEN, `Bearer ${data?.accessToken}`);
    await asyncStorageService.syncToDevice(AsyncStorageKey.REFRESH_TOKEN, `${data?.refreshToken}`);
    // console.log(AsyncStorageKey.ACCESS_TOKEN, `Bearer ${data?.accessToken}`);
  }
};

export const logoutRequest = async () => {
  try {
    await axiosIns.post(AuthAPI.LOGOUT);
    await asyncStorageService.clearAll();
  } catch (e) {
    await asyncStorageService.clearAll();
    console.error('Lỗi logout', e);
  }
};

const refreshRequest = async (error: any) => {
  try {
    console.log('START REFRESH TOKEN!');
    const refreshToken = await asyncStorageService.getSyncedFromDevice(AsyncStorageKey.REFRESH_TOKEN);
    let response = await axiosIns.post(`${AuthAPI.REFRESH_TOKEN}`, { refreshToken });
    console.log('response token', response);
    if (response !== undefined) {
      await syncAuthToDevice(response?.data?.data);
      configNetwork = error.response.config;
      //@ts-ignore
      configNetwork.headers.Authorization = `Bearer ${response?.data?.data?.accessToken}`;
      //@ts-ignore
      const res = await axiosIns(configNetwork);
      // console.log(res);
      return res;
    } else {
      await asyncStorageService.clearAll();
      toastMessageService.show(TOAST_STATUS.ERROR, 'Thông báo', 'Hết phiên đăng nhập! Vui lòng đăng nhập lại');
      rootNavigate(AppRoutes.LOGOUT, {});
    }
  } catch (err) {
    console.log('REFRESH TOKEN FAILED. LOGOUT !! ', err);
    await asyncStorageService.clearAll();
    toastMessageService.show(TOAST_STATUS.ERROR, 'Thông báo', 'Hết phiên đăng nhập! Vui lòng đăng nhập lại');
    rootNavigate(AppRoutes.LOGOUT, {});
  }
};

const onRequest = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
  if (config.url !== AuthAPI.REFRESH_TOKEN) {
    const accessToken = await asyncStorageService.getSyncedFromDevice(AsyncStorageKey.ACCESS_TOKEN);
    // console.log(accessToken);
    config.headers = {
      Authorization: accessToken,
    };
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);

  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: any) => {
  console.log(error);
  if (
    error.message.includes('401') &&
    error.config.url !== AuthAPI.GET_SURVEY_HOME &&
    error.config.url !== AuthAPI.LOGOUT &&
    error.config.url !== AuthAPI.UNDEFINED &&
    error.config.url !== AuthAPI.REFRESH_TOKEN &&
    //@ts-ignore
    !configNetwork._retry
  ) {
    const res = await refreshRequest(error);
    // console.log(res);
    return res;
  }
  if (error.code?.includes('ERR_NETWORK')) {
    Alert.alert('Thông báo', 'Vui lòng kiểm tra kết nối mạng!');
    return Promise.reject(error);
  }
};

axiosIns.interceptors.request.use(onRequest, onRequestError);
axiosIns.interceptors.response.use(onResponse, onResponseError);

export default axiosIns;
