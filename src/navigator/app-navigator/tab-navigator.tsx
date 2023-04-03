import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppTabs } from '../types';
import {  UserCircleIcon } from 'src/assets/svg-icons';
import { appColors } from 'src/utils/theme';
import { UserStackNavigator } from './app-stacks/user.stack';
import { StyleSheet } from 'react-native';
import { AppText } from 'src/components/AppText';
import { HomeScreen } from 'src/screens/home/Home.screen';

const Tab = createBottomTabNavigator();

const bottomBarMenus = [
  {
    title: 'Trang chủ',
    name: AppTabs.HOME_TAB,
    component: HomeScreen,
    icon: ({ color }: any) => <UserCircleIcon color={color} />,
  },

  {
    title: 'Cá nhân',
    name: AppTabs.USER_TAB,
    component: UserStackNavigator,
    icon: ({ color }: any) => <UserCircleIcon color={color} />,
  },
];

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: appColors.gray2,
        tabBarActiveTintColor: appColors.main,
        tabBarIconStyle: styles.icon,
        tabBarItemStyle: styles.tabItem,
      }}>
      {bottomBarMenus.map(item => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={() => {
            return {
              tabBarLabel: ({ color }) => (
                <AppText fontSize="extraSmall" style={[styles.label, { color }]}>
                  {item.title}
                </AppText>
              ),
              tabBarStyle: styles.tab,
              tabBarIcon: item.icon,
            };
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 0,
    height: 75,
    justifyContent: 'flex-start',
  },
  tabItem: {
    height: 75,
  },
  icon: {
    marginBottom: -5,
  },
  label: {
    textAlign: 'center',
    width: '80%',
    height: '50%',
  },
});
