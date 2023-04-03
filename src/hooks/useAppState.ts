import {
  appCurrentUserSelector,
  appLaunchedSelector,
  appLoggedInSelector,
  appSearchSelector,
  appSortDKLVType,
  appSortTypeSelector,
  appUnseenNotifications,
} from 'src/features/app/selectors';
import {
  logout,
  onSearch,
  onSetSortDKLV,
  onSetSortType,
  onSetUnseenNotification,
  setAppLaunched,
  setAppLoggedIn,
  setCurrentUser,
} from 'src/features/app/slice';
import { useAppDispatch, useAppSelector } from 'src/stores/hook';
import { logoutRequest } from 'src/helpers/axiosInterceptor';
import { AsyncStorageKey, asyncStorageService } from 'src/helpers/asyncStorageServices';
// import { getNotificationCount, getUserProfile } from 'src/apis/queries';
import { tokenSelector } from '../features/authentication/selectors';
import { setAccessToken } from '../features/authentication/slice';

export const useAppState = () => {
  const dispatch = useAppDispatch();
  const appLaunched = useAppSelector(appLaunchedSelector);
  const appLoggedIn = useAppSelector(appLoggedInSelector);
  const currentUser = useAppSelector(appCurrentUserSelector);
  const appSearchValue = useAppSelector(appSearchSelector);
  const appSortType = useAppSelector(appSortTypeSelector);
  const appCountNotifications = useAppSelector(appUnseenNotifications);
  const appAccessToken = useAppSelector(tokenSelector);

  const onLogout = async () => {
    await logoutRequest();
    dispatch(logout());
  };

  const onSetReduxAccessToken = async (token: string) => {
    dispatch(setAccessToken(token));
  };

  const onSetAppLoggedIn = async () => {
    dispatch(setAppLoggedIn());
    await onCountUnseenNotification();
  };

  const onSetAppLaunched = async () => {
    dispatch(setAppLaunched());
    await asyncStorageService.syncToDevice(AsyncStorageKey.APP_LAUNCHED, 'true');
  };

  const onSetCurrentUser = async (user: any) => {
    dispatch(setCurrentUser(user));
    await asyncStorageService.syncToDevice(AsyncStorageKey.USER, user);
  };

  const onSetValueSearch = async (value: string) => {
    dispatch(onSearch(value));
  };

  const onSetValueSortType = async (value: string) => {
    dispatch(onSetSortType(value));
  };

  const onGetAPICurrentUser = async () => {
    const userStorage = await asyncStorageService.getSyncedFromDevice(AsyncStorageKey.USER);
    const userAPI = await getUserProfile(userStorage?.id);
    return userAPI;
  };

  const onUpdateCurrentUserFromAPI = async (fieldChanged: string = '') => {
    const userStorage = await asyncStorageService.getSyncedFromDevice(AsyncStorageKey.USER);
    const userAPI = await getUserProfile(userStorage?.id);
    if (fieldChanged === '') {
      userStorage.point = userAPI.point;
      userStorage.avatar = userAPI.avatar;
    } else {
      userStorage[fieldChanged] = userAPI[fieldChanged];
    }
    await onSetCurrentUser(userStorage);
  };

  const onSetUnseenNotifications = async () => {
    dispatch(onSetUnseenNotification(0));
  };

  const onCountUnseenNotification = async () => {
    const count = await getNotificationCount();
    dispatch(onSetUnseenNotification(count));
  };

  return {
    currentUser,
    appLoggedIn,
    appLaunched,
    appSearchValue,
    appSortType,
    appCountNotifications,
    appAccessToken,
    onSetReduxAccessToken,
    onLogout,
    onSetAppLaunched,
    onSetAppLoggedIn,
    onSetCurrentUser,
    onSetValueSearch,
    onSetValueSortType,
    onUpdateCurrentUserFromAPI,
    onSetUnseenNotifications,
    onCountUnseenNotification,
    onGetAPICurrentUser,
  };
};
