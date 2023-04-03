import { combineReducers } from 'redux';
import authenticationReducer from 'src/features/authentication/slice';
import appReducer from 'src/features/app/slice';
import messageReducer from 'src/features/message/message';
export default combineReducers({
  app: appReducer,
  message: messageReducer,
  authentication: authenticationReducer,
});
