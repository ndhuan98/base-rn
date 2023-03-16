import { Actions } from 'react-native-router-flux';
const UnauthorizeStatusCode = 401;
const LoginScene = 'login';

export function onFullfilled(response) {
  return Promise.resolve(response);
}

export function onRejected(error) {
  if (error) {
    const response = error.response;
    if (
      response &&
      Actions.currentScene !== LoginScene &&
      UnauthorizeStatusCode == response.status
    ) {
      //call action logout to clear all data
      // store.dispatch({type: 'USER_LOGOUT'});
      Actions.replace(LoginScene);
    }
    return Promise.reject(error);
  }
}
