import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Keyboard,

} from 'react-native';
import { I18n} from 'src/constant';
import { appColors} from 'src/utils/theme';
import _ from 'lodash';
// import { API } from 'src/network';
// import { SUCCESS_CODE } from 'src/ultil/NetworkHelper';
import { AccessTokenManager } from 'src/data';
const KEY_INFO_LOGIN = 'KEY_INFO_LOGIN';
import Faceid from 'src/assets/images/svg/Faceid.svg';
import { LocalStorage } from 'src/data';
import styles from './Style';
import TouchID from 'react-native-touch-id';
import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from 'src/navigator/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/navigator/root';
import { useKeyboard } from '@react-native-community/hooks';
import Dlog from 'src/components/Dlog';
import Touch from 'src/assets/images/svg/Touch.svg';
import { AppInput } from 'src/components/AppInput';
import { AppButton } from 'src/components/AppButton';


interface Props {
    supportTouchID:boolean;
     supportFaceID:boolean;
      nothingSupport:boolean 
  }

export const InputForm: React.FC<Props> = React.memo(({ supportTouchID, supportFaceID, nothingSupport }) => {
    const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [maDV, setMaDV] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
 
  // Điều hướng màn hình tới màn quên mật khẩu
  const navigateScreen = () => {
    // navigation.navigate(AppRoutes.FORGOT_PASSWORD);
  };

  // Hàm kiểm tra thông tin input
  const keyboard = useKeyboard();
  const validateLogin = (username:string, password:string, maDV:string) => {
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

  const login = (username:string, password:string, maDV:string) => {
    // setLoading(true);
    // // Redux
    // const parram = {
    //   userName: username,
    //   password: password,
    //   maDV: maDV,
    // };
    // return API.login(parram).then(
    //   res => {
    //     if (res.data && res.data.code == SUCCESS_CODE) {
    //       // tắt trạng thái loading button đăng nhập
    //       setLoading(false);
    //       // lưu token vào bộ nhớ máy
    //       AccessTokenManager.saveAccessToken(res.data.desc);
    //       // Lưu thông tin đăng nhập
    //       const loginStr = JSON.stringify(parram);
    //       LocalStorage.set(KEY_INFO_LOGIN, loginStr);
    //       // Navigate tới màn hình drawrer
    //     //   Actions.replace('drawer');
    //       // lấy thông tin người dùng
    //       Dlog('login success', res.data);
    //     } else {
    //       setLoading(false);
    //       Alert.alert(I18n.t('common.notice'), res.data.msg);
    //     }
    //   },
    //   err => {
    //     Dlog('err-->', err);
    //     setLoading(false);
    //   },
    // );
  };

  const onChangeUsername = React.useCallback((text :string) => {
    setUsername(text);
  },[]);

  const onTouch = React.useCallback(() => {
    // LocalStorage.get(KEY_INFO_LOGIN, (error, result) => {
    //   if (result) {
    //     const params = JSON.parse(result);
    //     TouchID.authenticate('Quét vân tay để tiếp tục', optionalConfigObject)
    //       .then(success => {
    //         setMaDV(params.maDV);
    //         setPassword(params.password);
    //         setUsername(params.userName);
    //         login(params.userName, params.password, params.maDV);
    //       })
    //       .catch(error => {
    //         Dlog('error', error);
    //         Alert.alert('Xác thực thất bại');
    //       });
    //   } else {
    //     Alert.alert(
    //       I18n.t('common.notice'),
    //       'Vui lòng đăng nhập để cài đặt tính năng này',
    //     );
    //   }
    // });
  },[]);

  return (
    <View style={styles.wrapInputForm}>
      <AppInput
        label={I18n.t('loginScreen.mst')}
        value={maDV}
        placeholder={I18n.t('loginScreen.nhapMST')}
        onChangeText={(text:string) => setMaDV(text)}
      />
      <AppInput
        label={I18n.t('loginScreen.tenDangNhap')}
        value={username}
        placeholder={I18n.t('loginScreen.nhapTenDangNhap')}
        onChangeText={(text:string) => onChangeUsername(text)}
      />
      <AppInput
        label={I18n.t('loginScreen.matKhau')}
        value={password}
        secureTextEntry={true}
        placeholder={I18n.t('loginScreen.nhapMatKhau')}
        onChangeText={(text:string) => setPassword(text)}
      />
      <View style={styles.wrapTxtQuenMatKhau}>
        <TouchableOpacity 
        // style={styles.underLine} 
        onPress={navigateScreen}>
          <Text style={styles.txtQuenMatKhau}>
            {I18n.t('loginScreen.nhanQuenMatKhau')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonLogin}>
        <View style={{ flex: 1 }}>
          <AppButton
            // l={loading}
            onPress={() => validateLogin(username, password, maDV)}
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
                <Faceid fill={appColors.blue} style={styles.icon} />
              </TouchableOpacity>
            )}

            {supportTouchID && (
              <TouchableOpacity onPress={onTouch}>
                <Touch fill={appColors.blue} style={styles.icon} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
  },
  )