import React, {PureComponent} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import bgSplash from '../image/bgSplash.png';
import SplashScreen from 'react-native-splash-screen';
import {AccessTokenManager} from '@data';
export default class LaunchScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // hàm thực hiên  kiểm tra token
  componentDidMount() {
    SplashScreen.hide();
    this.verifyToken();
  }

  // Kiểm tra token đã có trong bộ nhớ máy chưa
  // result => Navigate tới màn hình Drawer
  // reject => Navigate tới màn hình Login
  verifyToken = () => {
    return AccessTokenManager.initialize().then(
      (res) => {
        if (res) {
          Actions.replace('drawer');
        } else {
          Actions.replace('login');
        }
      },
      (err) => {
        Actions.replace('login');
      },
    );
  };

  // hàm render chính
  render() {
    return <ImageBackground source={bgSplash} style={styles.container} />;
  }
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
