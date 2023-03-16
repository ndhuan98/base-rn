import { AccessTokenManager } from '@data';

export function addAccessToken(config) {
  const accessToken = AccessTokenManager.getAccessToken();
  if (accessToken) {
    const headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
    config.headers = headers;
  }
  return config;
}

export function onRejected(error) {
  return Promise.reject(error);
}
