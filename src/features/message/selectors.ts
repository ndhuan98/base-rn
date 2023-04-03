import { createSelector } from 'reselect';

const messageSelector = (state: any) => state.message;

export const appDataMessages = createSelector(messageSelector, mess => mess.dataConversationMessage);

export const appDataLastView = createSelector(messageSelector, mess => mess.listLastViewer);

export const numberUnseen = createSelector(messageSelector, mess => mess.numberMessageUnseen);

export const lastMessage = createSelector(messageSelector, mess => mess.lastMessage);
