import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoutes } from '../types';
import AppNavigator from '../app-navigator';
import { RootStackParamList } from '../root';
import { SplashMainScreen } from 'src/screens/splash/SplashMain.screen';
import LoginScreen from 'src/screens/user/login/LoginScreen';

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export default function AuthenticationNavigator() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName={AppRoutes.LOGIN}>
      <Screen name={AppRoutes.SPLASH_MAIN} component={SplashMainScreen} />
      <Screen name={AppRoutes.LOGIN} component={LoginScreen} />
    </Navigator>
  );
}
