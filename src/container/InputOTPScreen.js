import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Alert } from 'react-native';
import StatusBarTSD from '../components/StatusBarTSD';
import AppHeader from '../components/AppHeader';
import { AppColors, AppStyles, AppSizes } from '../theme';
import { Actions } from 'react-native-router-flux';
import { I18n } from '@constant';
import Dlog from '../components/Dlog';
import Back from '../image/svg/Back.svg';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import ButtonText from '../components/ButtonText';

const InputOTPScreen = props => {
  const [pinCode, setPinCode] = useState();
  const onBackScreen = () => {
    return Actions.pop();
  };

  const onApprovePIN = props => {
    if (!pinCode) {
      return Alert.alert(
        I18n.t('common.notice'),
        I18n.t('XacNhanMaPin.vuiLongNhapMaPIN'),
        [
          {
            text: I18n.t('common.close'),
            onPress: () => { },
          },
        ],
        { cancelable: false },
      );
    }
    props?.callbackGetPin(pinCode);
    return Actions.pop();
  };

  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <View style={styles.container}>
        <AppHeader
          Icon={Back}
          onPressMenu={() => onBackScreen()}
          backgroundColor={AppColors.blue}
          titleColor={AppColors.white}
          iconColor={AppColors.white}
          title={I18n.t('XacNhanMaPin.title')}
        />

        <View style={styles.card}>
          <Text style={styles.decsription}>
            {props?.subTitle ? props?.subTitle : I18n.t('XacNhanMaPin.description')}
          </Text>
          <View>
            <OTPInputView
              style={styles.wrapOTP}
              pinCount={6}
              code={pinCode} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={setPinCode}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                // props?.callbackGetPin(code);
                // onBackScreen();
                console.log(`Code is ${code}, you are good to go!`);
              }}
            />
          </View>
        </View>
        <View style={styles.wrapButtonGroup}>
          <ButtonText
            styleTitle={{ ...AppStyles.boldText, color: AppColors.white }}
            onCick={() => onApprovePIN(props)}
            title={I18n.t('XacNhanMaPin.xacNhan')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F6',
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: AppColors.cardBackground,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingTop: 24,
    paddingHorizontal: 22,
  },
  decsription: {
    ...AppStyles.baseText,
    fontSize: 16,
    lineHeight: 21,
    textAlign: 'center',
  },
  wrapOTP: {
    width: '100%',
    height: 200,
  },
  underlineStyleBase: {
    ...AppStyles.semiboldText,
    fontSize: 24,
    borderWidth: 0,
    borderBottomWidth: 2,
    color: AppColors.blue,
  },
  underlineStyleHighLighted: {
    borderColor: AppColors.blue,
  },
  wrapButtonGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: AppSizes.paddingXSml,
    backgroundColor: AppColors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
});
export default InputOTPScreen;
