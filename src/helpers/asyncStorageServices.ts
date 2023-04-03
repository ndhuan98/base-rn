import AsyncStorage from '@react-native-async-storage/async-storage';

export enum AsyncStorageKey {
  USER = 'user',
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  APP_LAUNCHED = 'appLaunched',
  STOP_SURVEY_SKNN = 'stopSurveySKNN',
  STOP_SURVEY_DKLV = 'stopSurveyDKLV'
}

class AsyncStorageService {
  getSyncedFromDevice = async (name: string) => {
    try {
      const object = await AsyncStorage.getItem(name);
      if (object !== null) {
        return JSON.parse(object);
      }
      return null;
    } catch (error) {
      console.log('getSyncedFromDevice::error' + error);
      return null;
    }
  };

  syncToDevice = async (name: string, object: any) => {
    try {
      const stringTodo = JSON.stringify(object);
      await AsyncStorage.setItem(name, stringTodo);
    } catch (e) {
      console.log('syncToDevice::error:' + e);
    }
  };

  clearAll = async () => {
    await AsyncStorage.multiRemove([AsyncStorageKey.ACCESS_TOKEN, AsyncStorageKey.REFRESH_TOKEN, AsyncStorageKey.USER]);
  };
}

export const asyncStorageService = new AsyncStorageService();
