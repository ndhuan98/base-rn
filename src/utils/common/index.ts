import { Platform } from 'react-native';

export const combineUrlParams = (url = '', params: any = {}) => {
  const keys = Object.keys(params);
  const paramUrl = keys
    .filter(key => ![undefined, null, ''].includes(params[key]))
    .map(key => `${key}=${params[key]}`)
    .join('&');
  return `${url}?${paramUrl}`;
};

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
