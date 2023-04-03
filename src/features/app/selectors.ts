import { createSelector } from 'reselect';

const appSelector = (state: any) => state.app;

export const appLaunchedSelector = createSelector(appSelector, app => app.appLaunched);
export const appLoggedInSelector = createSelector(appSelector, app => app.appLoggedIn);
export const appCurrentUserSelector = createSelector(appSelector, app => app.currentUser);
export const appSearchSelector = createSelector(appSelector, app => app.appSearchValue);
export const appSortTypeSelector = createSelector(appSelector, app => app.appSortType);
export const appUnseenNotifications = createSelector(appSelector, app => app.unseenNotifications);
export const appSortDKLVType = createSelector(appSelector, app => app.appSortDKLV);
