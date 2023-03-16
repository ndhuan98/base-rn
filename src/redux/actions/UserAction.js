import {API} from '@network';
import Dlog from '../../components/Dlog';
export const USER_SUCCES = 'USER_SUCCES';
export const USER_FAIL = 'USER_FAIL';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const USER_LOGOUT = 'USER_LOGOUT';

export function GET_USER_SUCCESS(data) {
  return {type: USER_SUCCES, payload: data};
}
export function GET_USER_FAIL(data) {
  return {type: USER_FAIL, payload: data};
}
export function GET_USER_LOGOUT(){
  return {type: USER_LOGOUT,payload:{}}
}

export function GET_USER_INFO() {
  return API.getUserInfo().then(
    (res) => {
      dispatch(GET_USER_SUCCESS(res.data));
    },
    (err) => {
      dispatch(GET_USER_FAIL(res.data));
    },
  );
}
