import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashMainScreen } from 'src/screens/splash/SplashMain.screen';
import { AppRoutes } from 'src/navigator/types';

export type SplashRootStackParamList = {
  [AppRoutes.SPLASH_MAIN]: undefined;
};

const { Navigator, Screen } = createStackNavigator<SplashRootStackParamList>();

export default function SplashNavigator() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName={AppRoutes.SPLASH_MAIN}>
      <Screen name={AppRoutes.SPLASH_MAIN} component={SplashMainScreen} />
    </Navigator>
  );
}
