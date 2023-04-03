import React from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  Keyboard,
} from 'react-native';
import { appColors, appStyles, } from 'src/utils/theme';
import bgLogin from 'src/assets/images/bgLogin.png';
import { useKeyboard } from '@react-native-community/hooks';
import { animate } from 'src/utils/variables/AnimateHelper';
import Dlog from 'src/components/Dlog';
import _ from 'lodash';
const { height, width } = Dimensions.get('window');
import TouchID from 'react-native-touch-id';
import LogoEIV from 'src/assets/images/svg/LogoEIV.svg';
import styles from './Style';
import { InputForm } from './component/Input';
// import { SeverSelect } from './component/SeverSelect';

const optionalConfigObject = {
  title: 'Xác thực nhanh', // Android
  imageColor: appColors.blue, // Android
  imageErrorColor: appColors.red, // Android
  sensorDescription: 'Cảm biến vân tay', // Android
  sensorErrorDescription: 'Thất bại', // Android
  cancelText: 'Đóng', // Android
  // fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  // unifiedErrors: false, // use unified error messages (default false)
  // passcodeFallback: false, // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
};



// add animation when keyboard did show
const _keyboardDidShow = () => {
  animate();
};

// add animation when keyboard did hide
const _keyboardDidHide = () => {
  animate();
};

// Hàm render chính
const LoginScreen = () => {
  const [isSupportFaceID, setSupportFaceID] = React.useState(false);
  const [isSupportTouchID, setSupportTouchID] = React.useState(false);
  const [isNotingSupport, setNothingSupport] = React.useState(false);

  React.useEffect(() => {
    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        if (biometryType === 'FaceID') {
          setSupportFaceID(true);
        } else {
          setSupportTouchID(true);
        }
      })
      .catch(error => {
        // Failure code
        setNothingSupport(true);
        Dlog(error);
      });

      const keyShow = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
      const keyHide = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
       return () => {
         keyShow.remove()
         keyHide.remove()
       };
  }, []);
 
  const keyboard = useKeyboard();
  return (
    <View style={appStyles.styleSafeArea}>
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground source={bgLogin} style={styles.bgContainer}>
          <View
            style={{
              ...styles.wrapContent,
              marginTop: keyboard.keyboardShown
                ? -keyboard.keyboardHeight / 5
                : 0,
            }}>
            {/* <Image
              source={logoEnvoice}
              style={styles.imgLogo}
              resizeMode={'contain'}
            /> */}

            <LogoEIV marginBottom={height * 0.043} marginTop={height * 0.1} width={width * 0.44} height={height * 0.073} />
            <InputForm
              nothingSupport={isNotingSupport}
              supportFaceID={isSupportFaceID}
              supportTouchID={isSupportTouchID}
            />
            {/* {API.allowChangeServer && <SeverSelect />} */}
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

// Khởi tạo style css màn hình


export default LoginScreen;
