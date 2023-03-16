import {
  USER_FAIL,
  USER_SUCCES,
  SET_VISIBILITY_FILTER,
  USER_LOGOUT,
} from '../actions/UserAction';

const initialState = {
  User: {
    success: false,
    isDone: false,
    payload: '',
  },
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SUCCES:
      return {
        ...state,
        User: {
          success: false,
          isDone: false,
          payload: action.payload,
        },
      };
    case USER_FAIL:
      return {...state, payload: action.payload};
      case USER_LOGOUT:
        return {initialState};
    case SET_VISIBILITY_FILTER:
      return {...state};
    default:
      return state;
  }
};

export default UserReducer;
