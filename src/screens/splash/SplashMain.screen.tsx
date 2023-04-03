import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SplashRootStackParamList } from 'src/navigator/splash-navigator';
import { AppRoutes } from 'src/navigator/types';
import { RootStackParamList } from 'src/navigator/root';

export type NavigationSplashMainProps = NativeStackNavigationProp<RootStackParamList, AppRoutes.SPLASH_MAIN>;

export const SplashMainScreen = () => {

  const navigation = useNavigation<NavigationSplashMainProps>();

  useEffect(() => {
    SplashScreen.hide();
    setTimeout(() => {
      navigation.navigate(AppRoutes.LOGIN)
    },2000)
  },[])


  return <ImageBackground source={require('../../assets/images/bgSplash.png')} style={styles.container} />;


}
 
// Khởi tạo style css màn hình
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
