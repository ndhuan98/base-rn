import { socket } from './../../helpers/socketHelper';
import { io } from 'socket.io-client';
import { SOCKETURL } from '../variables/socket';

export let socketClient: any;

export function initSocket(token: string) {
  console.log(token);
  if (!socketClient) {
    socketClient = io(SOCKETURL, {
      extraHeaders: {
        authorization: `${token}`,
      },
    });
  }
}

export function disconnect() {
  if (socket) {
    socket.disconnect();
    socket.close();
  }
  socketClient = null;
}
