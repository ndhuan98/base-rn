import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Keyboard,
  Alert,
} from 'react-native';
import {AppColors, AppStyles, AppSizes} from '../theme';
import StatusBarTSD from '../components/StatusBarTSD';
import AppHeader from '../components/AppHeader';
import Back from '../image/svg/Back.svg';
import EnvoiceInput from '../components/EnvoiceInput';
import ButtonText from '../components/ButtonText';
import {Actions} from 'react-native-router-flux';
import {I18n} from '@constant';
import {animate} from '../ultil/AnimateHelper';
import {useKeyboard} from '@react-native-community/hooks';
import {API} from '@network';
import {SUCCESS_CODE} from '../ultil/NetworkHelper';

const {width, height} = Dimensions.get('window');
// add animation when keyboard did show
const _keyboardDidShow = () => {
  animate();
};

// add animation when keyboard did hide
const _keyboardDidHide = () => {
  animate();
};

const NewPasswordScreen = (props) => {
  const [isLoading,setIsloading] = React.useState(false)
  // hàm lưu trữ thông tin nhập
  const [userInput, setUserInput] = React.useState({
    mst: props.data.madv,
    userName: props.data.username,
    email: props.data.email,
    password: '',
    passwordconfirm: '',
    maotp: '',
  });

  // hàm gửi thực hiện nhận mã OTP
  const resetPassword = React.useCallback(() => {
    if (!userInput.maotp) {
      return Alert.alert(I18n.t('changePasswordScreen.notification'),I18n.t('newPasswordScreen.boMaXN'));
    }
    if (!userInput.password) {
      return Alert.alert(I18n.t('changePasswordScreen.notification'), I18n.t('newPasswordScreen.boMatKhau'));
    }
    if (!userInput.passwordconfirm) {
      return Alert.alert(
        I18n.t('changePasswordScreen.notification'),
        I18n.t('newPasswordScreen.boNhapMatKhau'),
      );
    }
    if(userInput.password !== userInput.passwordconfirm){
      return Alert.alert(I18n.t('changePasswordScreen.notification'),I18n.t('changePasswordScreen.nhapSai'))
    }
    if(keyboard.keyboardShown){
      Keyboard.dismiss();
    }
    setIsloading(true);
    const params = {
      username: userInput.userName,
      password: userInput.password,
      passwordconfirm: userInput.passwordconfirm,
      madv: userInput.mst,
      email: userInput.email,
      isactive: '1',
      maotp: userInput.maotp,
    };
    API.forgotPass(params).then(
      (res) => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          return Alert.alert(
            I18n.t('common.notice'),
            res.data.msg,
            [
              {
                text: I18n.t('common.yes'),
                onPress: () => Actions.replace('login'),
              },
            ],
            {cancelable: false},
          );
        }
        else {
          setIsloading(false);
          return Alert.alert(I18n.t('common.notice'), res.data.msg);
        }
      },
      (err) => {
        setIsloading(true);
        Dlog('err getOTP', err);
      },
    );
    // Actions.pop();
  });

  // Thực hiện hiệu ứng khi bàn phím hiện lên
  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  // Lấy thông tin bàn phía thông qua Hook - useKeyboard
  const keyboard = useKeyboard();
  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <AppHeader
        Icon={Back}
        title={I18n.t('newPasswordScreen.title')}
        iconColor={AppColors.white}
        titleColor={AppColors.white}
        onPressMenu={Actions.pop}
      />
      <ScrollView
        contentContainerStyle={styles.containerScroll}
        style={AppStyles.flex1}>
        <View
          style={{
            ...styles.wrapContent,
            marginTop: keyboard.isKeyboardShow
              ? -keyboard.keyboardHeight / 5
              : 0,
          }}>
          <View style={styles.row}></View>
          <EnvoiceInput
            titleInput={I18n.t('newPasswordScreen.maXacNhan')}
            value={userInput.maotp}
            placeholder={I18n.t('newPasswordScreen.nhapMaXacNhan')}
            onChangeText={(text) => setUserInput({...userInput, maotp: text})}
          />
           <View style={styles.row}></View>
          <EnvoiceInput
            titleInput={I18n.t('newPasswordScreen.matKhauMoi')}
            value={userInput.password}
            secureTextEntry={true}
            placeholder={I18n.t('newPasswordScreen.nhapMatKhauMoi')}
            onChangeText={(text) =>
              setUserInput({...userInput, password: text})
            }
          />
           <View style={styles.row}></View>
          <EnvoiceInput
            titleInput={I18n.t('newPasswordScreen.nhapLaiMatKhauMoi')}
            value={userInput.passwordconfirm}
            secureTextEntry={true}
            placeholder={I18n.t('newPasswordScreen.nhapLaiMatKhauMoi')}
            onChangeText={(text) =>
              setUserInput({...userInput, passwordconfirm: text})
            }
          />
          <View style={styles.marginButtomText} />
          <ButtonText title={'Đổi mật khẩu'} onCick={resetPassword} isLoading={isLoading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contaier: {
    flex: 1,
  },
  containerScroll: {
    flex: 1,
    backgroundColor: AppColors.background,
    paddingHorizontal: AppSizes.paddingSml,
    flexGrow: 1,
  },
  marginButtomText: {
    height: height * 0.041,
  },
  wrapContent:{
    paddingHorizontal:AppSizes.paddingSml
  },
  row:{
    marginVertical:AppSizes.marginXXSml
  }
});
export default NewPasswordScreen;
