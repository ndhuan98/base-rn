import React from 'react';
import { AppRoutes, AppTabs } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import { MainTabNavigator } from './tab-navigator';


const { Navigator, Screen } = createStackNavigator();

export default function AppNavigator() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name={AppTabs.HOME_TAB} component={MainTabNavigator} />
    </Navigator>
  );
}
