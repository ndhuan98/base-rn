import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Keyboard,
  Alert,
} from 'react-native';
import { I18n, Env } from '@constant';
import { AppColors, AppStyles, AppSizes } from '../theme';
import EnvoiceInput from '../components/EnvoiceInput';
import logoEnvoice from '../image/logoEnvoice.png';
import { Actions } from 'react-native-router-flux';
import StatusBarTSD from '../components/StatusBarTSD';
import bgLogin from '../image/bgLogin.png';
import { useKeyboard } from '@react-native-community/hooks';
import { animate } from '../ultil/AnimateHelper';
import Dlog from '../components/Dlog';
import _ from 'lodash';
import ButtonText from '../components/ButtonText';
import { API } from '@network';
import { SUCCESS_CODE } from '../ultil/NetworkHelper';
import { AccessTokenManager } from '@data';
const { height, width } = Dimensions.get('window');
const KEY_INFO_LOGIN = 'KEY_INFO_LOGIN';
import TouchID from 'react-native-touch-id';
import Touch from './../image/svg/Touch.svg';
import LogoEIV from './../image/svg/LogoEIV.svg';

import Faceid from './../image/svg/Faceid.svg';
import { LocalStorage } from '@data';
import { ButtonGroup } from 'react-native-elements';

const optionalConfigObject = {
  title: 'Xác thực nhanh', // Android
  imageColor: AppColors.blue, // Android
  imageErrorColor: AppColors.red, // Android
  sensorDescription: 'Cảm biến vân tay', // Android
  sensorErrorDescription: 'Thất bại', // Android
  cancelText: 'Đóng', // Android
  // fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  // unifiedErrors: false, // use unified error messages (default false)
  // passcodeFallback: false, // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
};

// Hiện  thị View chuyển sever
const SeverSelect = () => {
  const [selectedServer, setSelectedServer] = React.useState();

  const onChaneSever = React.useCallback(index => {
    console.log('index -->>', index);
    if (API.allowChangeServer) {
      setSelectedServer(index);
      API.switchEnv(Env.all[index]);
    }
  });

  return (
    <ButtonGroup
      containerBorderRadius={4}
      textStyle={[
        {
          fontSize: AppSizes.fontXSmall,
          color: AppColors.darkgray,
        },
      ]}
      selectedTextStyle={{ color: AppColors.white }}
      containerStyle={{
        width: '90%',
        height: 35,
        backgroundColor: 'white',
        borderColor: AppColors.darkgray,
        borderRadius: 5,
        alignSelf: 'center',
      }}
      selectedBackgroundColor={AppColors.red}
      innerBorderStyle={{ width: 1, color: AppColors.darkgray }}
      buttons={_.map(Env.all, item => item.toUpperCase())}
      selectedIndex={selectedServer}
      onPress={onChaneSever}
    />
  );
};

// Hàm hiển thị text input
const InputForm = ({ supportTouchID, supportFaceID, nothingSupport }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [maDV, setMaDV] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Điều hướng màn hình tới màn quên mật khẩu
  const navigateScreen = () => {
    Actions.forgotPassword();
  };

  // Hàm kiểm tra thông tin input
  const keyboard = useKeyboard();
  const validateLogin = (username, password, maDV) => {
    if (!maDV) {
      return Alert.alert('Thông báo', 'Không được bỏ trống mã số thuế');
    }
    if (!username) {
      return Alert.alert('Thông báo', 'Không được bỏ trống tên đăng nhập');
    }
    if (!password) {
      return Alert.alert('Thông báo', 'Không được bỏ trống mật khẩu');
    }
    if (keyboard.keyboardShown) {
      Keyboard.dismiss();
    }
    login(username, password, maDV);
  };

  const login = (username, password, maDV) => {
    setLoading(true);
    // Redux
    const parram = {
      userName: username,
      password: password,
      maDV: maDV,
    };
    return API.login(parram).then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          // tắt trạng thái loading button đăng nhập
          setLoading(false);
          // lưu token vào bộ nhớ máy
          AccessTokenManager.saveAccessToken(res.data.desc);
          // Lưu thông tin đăng nhập
          const loginStr = JSON.stringify(parram);
          LocalStorage.set(KEY_INFO_LOGIN, loginStr);
          // Navigate tới màn hình drawrer
          Actions.replace('drawer');
          // lấy thông tin người dùng
          Dlog('login success', res.data);
        } else {
          setLoading(false);
          Alert.alert(I18n.t('common.notice'), res.data.msg);
        }
      },
      err => {
        Dlog('err-->', err);
        setLoading(false);
      },
    );
  };

  const onChangeUsername = React.useCallback(text => {
    setUsername(text);
  });

  const onTouch = React.useCallback(() => {
    LocalStorage.get(KEY_INFO_LOGIN, (error, result) => {
      if (result) {
        const params = JSON.parse(result);
        TouchID.authenticate('Quét vân tay để tiếp tục', optionalConfigObject)
          .then(success => {
            setMaDV(params.maDV);
            setPassword(params.password);
            setUsername(params.userName);
            login(params.userName, params.password, params.maDV);
          })
          .catch(error => {
            Dlog('error', error);
            Alert.alert('Xác thực thất bại');
          });
      } else {
        Alert.alert(
          I18n.t('common.notice'),
          'Vui lòng đăng nhập để cài đặt tính năng này',
        );
      }
    });
  });



  return (
    <View style={styles.wrapInputForm}>
      <EnvoiceInput
        titleInput={I18n.t('loginScreen.mst')}
        value={maDV}
        placeholder={I18n.t('loginScreen.nhapMST')}
        onChangeText={text => setMaDV(text)}
      />
      <EnvoiceInput
        titleInput={I18n.t('loginScreen.tenDangNhap')}
        value={username}
        placeholder={I18n.t('loginScreen.nhapTenDangNhap')}
        onChangeText={text => onChangeUsername(text)}
      />
      <EnvoiceInput
        titleInput={I18n.t('loginScreen.matKhau')}
        value={password}
        secureTextEntry={true}
        placeholder={I18n.t('loginScreen.nhapMatKhau')}
        onChangeText={text => setPassword(text)}
      />
      <View style={styles.wrapTxtQuenMatKhau}>
        <TouchableOpacity style={styles.underLine} onPress={navigateScreen}>
          <Text style={styles.txtQuenMatKhau}>
            {I18n.t('loginScreen.nhanQuenMatKhau')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonLogin}>
        <View style={{ flex: 1 }}>
          <ButtonText
            isLoading={loading}
            onCick={() => validateLogin(username, password, maDV)}
            title={I18n.t('loginScreen.dangNhap')}
          />
        </View>

        {!nothingSupport && (
          <View
            style={{
              width: 65,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            {supportFaceID && (
              <TouchableOpacity onPress={onTouch}>
                <Faceid fill={AppColors.blue} style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
            )}

            {supportTouchID && (
              <TouchableOpacity onPress={onTouch}>
                <Touch fill={AppColors.blue} style={{ width: 50, height: 50 }} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
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

    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);
  const keyboard = useKeyboard();
  return (
    <View style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
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

            <LogoEIV  marginBottom={height * 0.043} marginTop={height * 0.1} width={width * 0.44} height={height * 0.073} />
            <InputForm
              nothingSupport={isNotingSupport}
              supportFaceID={isSupportFaceID}
              supportTouchID={isSupportTouchID}
            />
            {API.allowChangeServer && <SeverSelect />}
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

// Khởi tạo style css màn hình
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtLogin: {
    ...AppStyles.baseText,
    color: AppColors.white,
    fontSize: 15,
  },
  content: {
    flex: 1,
    backgroundColor: AppColors.blue,
  },
  wrapInputForm: {
    width: width * 0.93,
    alignContent: 'center',
    backgroundColor: AppColors.white,
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    paddingTop: height * 0.032,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: AppColors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgLogo: {
    width: width * 0.54,
    height: height * 0.073,
    marginBottom: height * 0.043,
    marginTop: height * 0.1,
  },
  wrapContent: {
    flex: 1,
    alignItems: 'center',
  },
  bgContainer: { flex: 1, width: '100%', height: '100%' },

  buttonLogin: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.025,
    flexDirection: 'row',
  },
  txtQuenMatKhau: {
    ...AppStyles.baseText,
    color: '#8C9498',
    marginTop: height * 0.017,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  wrapTxtQuenMatKhau: { width: '100%', flexDirection: 'row' },
});

export default LoginScreen;
