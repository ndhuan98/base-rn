import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = authenticationSlice.actions;

export default authenticationSlice.reducer;
