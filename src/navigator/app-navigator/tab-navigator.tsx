import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppTabs } from '../types';
import { UserStackNavigator } from './app-stacks/user.stack';
import { StyleSheet } from 'react-native';
// import { AppText } from 'src/components/AppText';
import  HomeScreen  from 'src/container/HomeScreen';
import { AppColors } from 'src/theme';
import InvoiceListScreen from 'src/container/InvoiceListScreen';
import DashboardScreen from 'src/container/DashboardScreen';
import ReportScreen from 'src/container/ReportScreen';
import SendCQT from 'src/container/SendCQT';

const Tab = createBottomTabNavigator();
const ActiveHome = require('../../assets/images/svg/soildHome.svg')
const ActiveList = require('../../assets/images/svg/soildList.svg')
const bottomBarMenus = [
  {
    title: 'Trang chủ',
    name: AppTabs.HomeScreen,
    component: HomeScreen,
    icon: ({ color }: any) => <ActiveHome fill={color} />,
  },

  {
    title: 'Danh sách HĐ',
    name: AppTabs.listInvoice,
    component: InvoiceListScreen,
    icon: ({ color }: any) => <ActiveList fill={color} />,
  },
  {
    title: 'Thống kê',
    name: AppTabs.Statistic,
    component: DashboardScreen,
    icon: ({ color }: any) => <ActiveList fill={color} />,
  },
  {
    title: 'Báo cáo',
    name: AppTabs.Report,
    component: ReportScreen,
    icon: ({ color }: any) => <ActiveList fill={color} />,
  },
  {
    title: 'Chuyển cơ quan thuế',
    name: AppTabs.sendCQT,
    component: SendCQT,
    icon: ({ color }: any) => <ActiveList fill={color} />,
  },
];
const tabIndex = {
  Home: 0,
  ListInvoice: 1,
  Dashboard: 2,
  Account: 3,
};
export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: AppColors.iconGray,
        tabBarActiveTintColor: AppColors.blue,
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
              // tabBarLabel: ({ color }) => (
              //   <AppText fontSize="extraSmall" style={[styles.label, { color }]}>
              //     {item.title}
              //   </AppText>
              // ),
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
