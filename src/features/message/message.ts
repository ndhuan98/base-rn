import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  dataConversationMessage: [],
  listLastViewer: [],
  currentConversationId: [],
  numberMessageUnseen: 0,
  lastMessage: 0,
};

const messageSlice: any = createSlice({
  name: 'message',
  initialState: initialState,
  reducers: {
    //@ts-ignore
    addMessage(state, action: PayloadAction<ListComment>) {
      const { conversationId, message } = action.payload;
      // console.log('conversationId', conversationId);
      // console.log('message', message);
      let _data = state.dataConversationMessage;

      if (conversationId === state.currentConversationId) {
        if (message?.isDeletedAllUser === true && message?.isDeletedOnlyMe === true) {
          // const messageWithIndex = _data.findIndex(item => item.id === message.id);

          // if (messageWithIndex > -1) {
          //   _data.splice(messageWithIndex, 1);
          //   return _data;
          // }

          _data.splice(
            _data.findIndex(function (i) {
              return i.id === message.id;
            }),
            1,
          );
          state.dataConversationMessage = [..._data];
        } else {
          _data.push(message);
          state.dataConversationMessage = [..._data];
        }
        // _data.push(message);
        // state.dataConversationMessage = [..._data];
      }
    },

    updateCurrentConversationId: (state, action) => {
      state.currentConversationId = action.payload;
    },

    addDataMessage(state, action) {
      state.dataConversationMessage = action.payload;
    },

    addNumberUnseenMessage(state, action: PayloadAction<number>) {
      state.numberMessageUnseen += action.payload;
    },
    // removeMessage(state, action: PayloadAction<{ id: number }>) {
    //   const _delete = state?.message.filter(x => x.id !== action.payload.id);
    //   let data = { ...state, message: _delete };
    //   return data;
    // },

    //   upadte(state, action: PayloadAction<{id: string}>) {
    //     console.log('id', action.payload.id);
    //     const cmtID = state?.message.filter(x => x.id === action.payload.id);
    //   },

    setListLastViewer(state, action) {
      state.listLastViewer = action.payload;
    },
    setLastMessage(state, action) {
      state.lastMessage = action.payload;
    },
  },
});

export const {
  addMessage,
  addDataMessage,
  setListLastViewer,
  updateCurrentConversationId,
  addNumberUnseenMessage,
  setLastMessage,
} = messageSlice.actions;

export default messageSlice.reducer;
