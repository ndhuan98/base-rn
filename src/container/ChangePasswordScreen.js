import React from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView, Alert, Keyboard} from 'react-native';
import {AppColors, AppStyles, AppSizes} from '../theme';
import {Actions} from 'react-native-router-flux';
import StatusBarTSD from '../components/StatusBarTSD';
import AppHeader from '../components/AppHeader';
import EnvoiceText from '../components/EnvoiceText';
import Back from '../image/svg/Back.svg';
import ButtonText from '../components/ButtonText';
import {I18n} from '@constant';
import {API} from '@network';
import {useDispatch, useSelector} from 'react-redux';
import {SUCCESS_CODE} from '../ultil/NetworkHelper';
import Dlog from '../components/Dlog';
import {useKeyboard} from '@react-native-community/hooks';
import {animate} from '../ultil/AnimateHelper';

// Hàm render chính

const ChangePasswordScreen = () => {
  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);
  const _keyboardDidShow = () => {
    animate();
  };
  
  // add animation when keyboard did hide
  const _keyboardDidHide = () => {
    animate();
  };
  const userInfo = useSelector((state) => state.UserReducer.User.payload);

  const [accountInfo, setAccountInfo] = React.useState({
    password_old: '',
    password_new: '',
    password_confirm: '',
  });
  const keyboard = useKeyboard();
  const changePassword = React.useCallback(() => {
    if(!accountInfo.password_old || !accountInfo.password_new || !accountInfo.password_confirm ){
      return Alert.alert(I18n.t('changePasswordScreen.notification'),I18n.t('changePasswordScreen.boTrong'))
    }
    if(accountInfo.password_new !== accountInfo.password_confirm){
      return Alert.alert(I18n.t('changePasswordScreen.notification'),I18n.t('changePasswordScreen.nhapSai'))
    }
    if(accountInfo.password_new == accountInfo.password_old){
      return Alert.alert(I18n.t('changePasswordScreen.notification'),I18n.t('changePasswordScreen.nhapGiong'))
    }
    if(keyboard.keyboardShown){
      Keyboard.dismiss();
    }
    const parram = {
      madv: userInfo.data.ma_so_thue,
      username: userInfo.data.ten_dang_nhap,
      password_old: accountInfo.password_old,
      password_new: accountInfo.password_new,
      password_confirm: accountInfo.password_confirm,
    };
    API.changePass(parram).then(
      (res) => {
        if (res.data.code == SUCCESS_CODE) {
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
        } else {
          return Alert.alert(I18n.t('common.notice'), res.data.msg);
        }
      },
      (err) => {
        Dlog('res -->', res);
      },
    );
  });

  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <View style={styles.container}>
        <AppHeader
          Icon={Back}
          backgroundColor={AppColors.blue}
          titleColor={AppColors.white}
          iconColor={AppColors.white}
          title={I18n.t('changePasswordScreen.doiMatKhau')}
          onPressMenu={() => Actions.pop()}
        />
        <ScrollView style={styles.containerScroll}>
        <View style={styles.row}></View>
          <EnvoiceText
            title={I18n.t('changePasswordScreen.matKhauHienTai')}
            value={accountInfo.password_old}
            secureTextEntry
            onChangeText={(text) =>
              setAccountInfo({...accountInfo, password_old: text})
            }
          />
          <View style={styles.row}></View>
          <EnvoiceText
            title={I18n.t('changePasswordScreen.matKhauMoi')}
            value={accountInfo.password_new}
            secureTextEntry
            onChangeText={(text) =>
              setAccountInfo({...accountInfo, password_new: text})
            }
          />
          <View style={styles.row}></View>
          <EnvoiceText
            title={I18n.t('changePasswordScreen.nhapLaiMatKhauMoi')}
            value={accountInfo.password_confirm}
            secureTextEntry
            onChangeText={(text) =>
              setAccountInfo({...accountInfo, password_confirm: text})
            }
          />
        </ScrollView>
        <View style={styles.bottomButton}>
          <ButtonText
            onCick={changePassword}
            title={I18n.t('changePasswordScreen.luuThayDoi')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// Khởi tạo style css màn hình
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  bottomButton: {
    width: '100%',
    padding: AppSizes.paddingXSml,
    backgroundColor: AppColors.white,
  },
  containerScroll: {flex: 1, padding: AppSizes.paddingXSml},
  row:{
    marginVertical:AppSizes.marginXXSml
  }
});

export default ChangePasswordScreen;
