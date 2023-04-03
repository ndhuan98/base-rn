import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AppRoutes } from '../../types';
// import { MenuScreen } from '../../../screens/authentication/menu/Menu.screen';
import { RootStackParamList } from '../../root';

const UserStack = createNativeStackNavigator<RootStackParamList>();
const { Screen } = UserStack;

export const UserStackNavigator = () => (
  <UserStack.Navigator screenOptions={{ headerShown: false }}
  //  initialRouteName={AppRoutes.MENU}
   >
    {/* <Screen name={AppRoutes.MENU} component={MenuScreen} /> */}
  </UserStack.Navigator>
);
