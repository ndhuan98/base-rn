import React from 'react';
import { AppRoutes, AppTabs } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import { MainTabNavigator } from './tab-navigator';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import MenuLeftHookScreen from 'src/container/MenuLeftHook';
import {LaunchScreen} from 'src/container/splash/LaunchScreen';
import EditProduct from 'src/container/invoiceCreate/EditProduct';
import AddGoods from 'src/container/invoiceGoods/AddGoods';
import AddCustomer from 'src/container/invoiceCustomer/AddCustomer';
import DetailCustomer from 'src/container/invoiceCustomer/DetailCustomer';
import DetailGoods from 'src/container/invoiceGoods/DetailGoods';
import LoginScreen from 'src/container/authentication/login/LoginScreen';
import ForgotScreen from 'src/container/authentication/forgotPassword/ForgotScreen';
import NewPasswordScreen from 'src/container/authentication/newPassword/NewPasswordScreen';
import InputOTPScreen from 'src/container/authentication/inputOtp/InputOTPScreen';


const { Navigator, Screen } = createStackNavigator();
const Drawer = createDrawerNavigator()
export default function AppNavigator() {
  console.log('appp')
  return (
    <Navigator screenOptions={{ headerShown: false }}>
        <Screen name={AppRoutes.LAUNCH} component={LaunchScreen} />
        {/* screens */}
        <Screen name = {AppRoutes.LOGIN} component={LoginScreen}/>
        <Screen name = {AppRoutes.FORGOT_PASSWORD} component={ForgotScreen}/>
        <Screen name = {AppRoutes.RESET_PASSWORD} component={NewPasswordScreen}/>
        <Screen name = {AppRoutes.PRODUCT_EDIT} component={EditProduct}/>
        <Screen name = {AppRoutes.ADD_GOODS} component={AddGoods}/>
        <Screen name = {AppRoutes.ADD_CUSTOMER} component={AddCustomer}/>
        <Screen name = {AppRoutes.DETAIL_CUSTOMER} component={DetailCustomer}/>
        <Screen name = {AppRoutes.DETAIL_GOODS} component={DetailGoods}/>
        <Screen name = {AppRoutes.XACNHAN_MAPIN} component={InputOTPScreen}/>

        <Screen name={AppRoutes.MAIN_TAB} component={MainTabNavigator} />
       
    </Navigator>
  );
}
