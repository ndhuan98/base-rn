import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ErrorToast, InfoToast, SuccessToast } from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SuccessCircleIcon } from 'src/assets/svg-icons';
import { AppText } from './components/AppText';
import { appColors } from './utils/theme';

const renderTomatoToast = ({ text1, props }: any) => (
  <View style={styles.tomatoToast}>
    <Text>{text1}</Text>
    <Text>{props.uuid}</Text>
  </View>
);

const renderCustomSuccess = (props: any) => (
  <View style={styles.customToastContainer}>
    <SuccessCircleIcon />
    <View style={styles.alert}>
      <AppText fontWeight="600" fontSize="small">
        {props.text1}
      </AppText>
      <AppText color="gray1" fontSize="small">
        {props.text2}
      </AppText>
    </View>
  </View>
);

const renderCustomError = (props: any) => (
  <View style={styles.customSuccessToastContainer}>
    <Icon style={styles.icon} name="times-circle" size={20} color="#ff0000" />
    <Text style={styles.customSuccessText}>{props.text1}</Text>
  </View>
);

const renderCustomInfo = (props: any) => (
  <View style={styles.customSuccessToastContainer}>
    <Icon style={styles.icon} name="info-circle" size={20} color="#0037ff" />
    <Text style={styles.customSuccessText}>{props.text1}</Text>
  </View>
);

export enum TOAST_STATUS {
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error',
  TOMATO = 'tomato',
  SUCCESS_CUSTOM = 'successCustom',
  ERROR_CUSTOM = 'errorCustom',
  INFO_CUSTOM = 'infoCustom',
  SUCCESS_CUSTOM_SVG = 'successCustomSvg',
  SUCCESS_SAVE_DATA_SURVEY = 'successSaveDataSurvey',
}

export const toastConfig = {
  [TOAST_STATUS.SUCCESS]: (props: any) => (
    <SuccessToast
      {...props}
      style={styles.successToast}
      contentContainerStyle={styles.toastContainer}
      text1Style={styles.toastTitle}
    />
  ),
  [TOAST_STATUS.INFO]: (props: any) => (
    <InfoToast
      {...props}
      style={styles.infoToast}
      contentContainerStyle={styles.toastContainer}
      text1Style={styles.toastTitle}
      text2Style={styles.toastSubTitle}
    />
  ),
  [TOAST_STATUS.ERROR]: (props: any) => (
    <ErrorToast {...props} style={styles.errorToast} text1Style={styles.toastTitle} text2Style={styles.toastSubTitle} />
  ),
  [TOAST_STATUS.TOMATO]: renderTomatoToast,
  [TOAST_STATUS.SUCCESS_CUSTOM]: renderCustomSuccess,
  [TOAST_STATUS.INFO_CUSTOM]: renderCustomInfo,
  [TOAST_STATUS.ERROR_CUSTOM]: renderCustomError,
};

const styles = StyleSheet.create({
  alert: {
    marginLeft: 20,
  },
  customToastContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
    alignItems: 'center',
    borderRadius: 6,
    overflow: 'hidden',
    width: '95%',
    height: 80,
    backgroundColor: appColors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.22,
    elevation: 3,
  },
  toastContainer: {
    paddingHorizontal: 16,
  },
  toastTitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  toastSubTitle: {
    fontSize: 12,
  },
  successToast: {
    width: '95%',
    borderLeftColor: 'green',
    borderLeftWidth: 10,
  },
  infoToast: {
    width: '95%',
    borderLeftColor: 'blue',
    borderLeftWidth: 10,
  },
  errorToast: {
    width: '95%',
    borderLeftColor: 'red',
    borderLeftWidth: 10,
  },
  tomatoToast: {
    height: 60,
    width: '100%',
    backgroundColor: 'white',
  },
  customSuccessToastContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    overflow: 'hidden',
    width: '95%',
    height: 60,
  },
  customSuccessToast: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    width: '100%',
  },
  icon: {
    marginLeft: 20,
  },
  customSuccessText: {
    paddingLeft: 20,
    fontSize: 14,
    color: 'white',
    marginRight: 28,
  },
  customSuccessSvgToast: {
    height: 55,
    width: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
});
