import { IMessage } from 'src/models/chat';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { store } from 'src/stores/config-store';

const initialState = {
  appLaunched: false,
  appLoggedIn: false,
  currentUser: null,
  appSearchValue: '',
  appSortType: '',
  unseenNotifications: 0,
  appSortDKLV: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppLaunched: state => {
      state.appLaunched = true;
    },
    setAppLoggedIn: state => {
      state.appLoggedIn = true;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: state => {
      state.appLoggedIn = false;
      state.currentUser = null;
    },
    onSearch: (state, action) => {
      state.appSearchValue = action.payload;
    },
    onSetSortType: (state, action) => {
      state.appSortType = action.payload;
    },
    onSetUnseenNotification: (state, action) => {
      state.unseenNotifications = action.payload;
    },
    onSetSortDKLV: (state, action) => {
      state.appSortDKLV = action.payload;
    },
    // addMessage(state, action: PayloadAction<IMessage>) {
    //   let dataMessage = [...state.message, action.payload];
    //   let data = { ...state, message: dataMessage };
    //   return data;
    // },
    // addDataMessage(state, action) {
    //   state.dataMessage = action.payload;
    // },
  },
});

// export const addNewMessage = (message: IMessage) => {
//   store.dispatch(addMessage(message));
// };

// export const addQueryDataMessage = (data: any) => {
//   store.dispatch(addDataMessage(data));
// };

export const {
  setAppLaunched,
  setAppLoggedIn,
  logout,
  setCurrentUser,
  onSearch,
  onSetSortType,
  onSetUnseenNotification,
  onSetSortDKLV,
  // addMessage,
  // addDataMessage,
} = appSlice.actions;

export default appSlice.reducer;
