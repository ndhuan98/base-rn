import { io } from 'socket.io-client';
import { AsyncStorageKey, asyncStorageService } from './asyncStorageServices';

export const socket: any = async () => {
  const accessToken = await asyncStorageService.getSyncedFromDevice(AsyncStorageKey.ACCESS_TOKEN);
  return io('https://socket.apiwecheck.click/', {
    forceNew: true,
    auth: {
      accessToken,
    },
  });
};
