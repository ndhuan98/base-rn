import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
  Keyboard,
  Text,
} from 'react-native';
import {AppColors, AppStyles, AppSizes} from '../theme';
import {Actions} from 'react-native-router-flux';
import StatusBarTSD from '../components/StatusBarTSD';
import AppHeader from '../components/AppHeader';
import EnvoiceText from '../components/EnvoiceText';
import Back from '../image/svg/Back.svg';
import ButtonText from '../components/ButtonText';
import {I18n} from '@constant';
import {API} from '@network';
import {SUCCESS_CODE} from '../ultil/NetworkHelper';
import Dlog from '../components/Dlog';
import {useKeyboard} from '@react-native-community/hooks';
import {animate} from '../ultil/AnimateHelper';
import _ from 'lodash';

// Hàm render chính
const NewPIN = () => {
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

  const [accountInfo, setAccountInfo] = React.useState({
    password_old: '',
    password_new: '',
    password_confirm: '',
  });
  const keyboard = useKeyboard();

  const onBack = () => {
    setAccountInfo({
      password_old: '',
      password_new: '',
      password_confirm: '',
    });
    return Actions.pop();
  };

  const changePassword = React.useCallback(() => {
    if (
      !accountInfo.password_old ||
      !accountInfo.password_new ||
      !accountInfo.password_confirm
    ) {
      return Alert.alert(
        I18n.t('NewPIN.notification'),
        I18n.t('NewPIN.boTrong'),
      );
    }
    if (accountInfo.password_new !== accountInfo.password_confirm) {
      return Alert.alert(
        I18n.t('NewPIN.notification'),
        I18n.t('NewPIN.nhapSai'),
      );
    }
    if (accountInfo.password_new == accountInfo.password_old) {
      return Alert.alert(
        I18n.t('NewPIN.notification'),
        I18n.t('NewPIN.nhapGiong'),
      );
    }
    if (_.size(accountInfo.password_new) != 6) {
      return Alert.alert(
        I18n.t('NewPIN.notification'),
        I18n.t('NewPIN.doDaiPIN'),
      );
    }
    if (keyboard.keyboardShown) {
      Keyboard.dismiss();
    }
    const parram = {
      pin_code_old: accountInfo.password_old,
      pin_code_new: accountInfo.password_new,
      password_confirm: accountInfo.password_confirm,
    };
    API.updatePIN(parram).then(
      res => {
        if (res.data.code == SUCCESS_CODE) {
          return Alert.alert(
            I18n.t('common.notice'),
            res.data.msg,
            [
              {
                text: I18n.t('common.yes'),
                onPress: () => onBack(),
              },
            ],
            {cancelable: false},
          );
        } else {
          return Alert.alert(I18n.t('common.notice'), res.data.msg);
        }
      },
      err => {
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
          title={I18n.t('NewPIN.title')}
          onPressMenu={() => Actions.pop()}
        />
        <ScrollView style={styles.containerScroll}>
          <View style={styles.row} />
          <EnvoiceText
            require
            title={I18n.t('NewPIN.maPinCu')}
            value={accountInfo.password_old}
            secureTextEntry
            onChangeText={text =>
              setAccountInfo({...accountInfo, password_old: text})
            }
          />
          <View style={styles.row} />
          <EnvoiceText
            require
            title={I18n.t('NewPIN.maPinMoi')}
            value={accountInfo.password_new}
            secureTextEntry
            onChangeText={text =>
              setAccountInfo({...accountInfo, password_new: text})
            }
          />
          <View style={styles.row} />
          <EnvoiceText
            require
            title={I18n.t('NewPIN.nhapLaiMaPinMoi')}
            value={accountInfo.password_confirm}
            secureTextEntry
            onChangeText={text =>
              setAccountInfo({...accountInfo, password_confirm: text})
            }
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textNote}>
              <Text style={{color: '#CC0000'}}>Lưu ý:</Text> Mã PIN mới có độ
              dài 6 ký tự số và không được trùng với mã PIN cũ đang sử dụng
            </Text>
          </View>
        </ScrollView>
        <View style={styles.bottomButton}>
          <ButtonText
            onCick={changePassword}
            title={I18n.t('NewPIN.xacNhan')}
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
  row: {
    marginVertical: AppSizes.marginXXSml,
  },
  textNote: {
    ...AppStyles.baseText,
  },
});

export default NewPIN;
