import React from 'react';
import { AppRoutes, AppTabs } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import { MainTabNavigator } from './tab-navigator';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MenuLeftHookScreen from 'src/container/MenuLeftHook';
// import { LaunchScreen } from 'src/container/LaunchScreen';
import LoginScreen from 'src/container/LoginScreen';
import ForgotScreen from 'src/container/ForgotScreen';


const { Navigator, Screen } = createStackNavigator();
const Drawer = createDrawerNavigator()
export default function DrawerNavigator() {
    console.log('appp')
    return (
        <Drawer.Navigator initialRouteName={AppRoutes.DRAWER} drawerContent={(props) => <MenuLeftHookScreen {...props} />}>
            <Screen name={AppRoutes.FORGOT_PASSWORD} component={ForgotScreen} />

        </Drawer.Navigator>
    );
}
