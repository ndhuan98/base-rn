import { createSelector } from 'reselect';

const authSelector = (state: any) => state.authentication;

export const tokenSelector = createSelector(authSelector, authentication => authentication.accessToken);
