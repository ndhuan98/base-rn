import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  Platform,
  Share,
} from 'react-native';
import StatusBarTSD from '../components/StatusBarTSD';
import AppHeader from '../components/AppHeader';
import Menu from '../image/svg/menu1.svg';
import {AppColors, AppStyles, AppSizes} from '../theme';
import {Actions} from 'react-native-router-flux';
import Touch from '../image/svg/Touch.svg';
import {I18n} from '@constant';
import Faceid from '../image/svg/Faceid.svg';
import Share_icon from '../image/svg/Share.svg';
import ProtectOTP from '../image/svg/ProtectOTP.svg';
import LockPIN from '../image/svg/LockPIN.svg';

import TouchID from 'react-native-touch-id';
import Dlog from '../components/Dlog';
import {LocalStorage} from '@data';
import ConfirmPass from '../container/lightbox/ConfirmPass';
const KEY_INFO_LOGIN = 'KEY_INFO_LOGIN';
const KEY_USED_TOUCHID_TO_LOGIN = 'USED_TOUCHID_TO_LOGIN';

const optionalConfigObject = {
  unifiedErrors: false,
  passcodeFallback: false,
};

const onShare = async () => {
  let platform;
  if (Platform.OS === 'ios') {
    platform = 'https://apps.apple.com/us/app/id1481798379';
  } else {
    platform =
      'https://play.google.com/store/apps/details?id=com.thaisonapp.einvoice2';
  }
  try {
    const result = await Share.share({
      title: 'E-Invoice',
      message: platform,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};
const InvoiceSetting = () => {
  const [isFace, setIsFace] = useState(false);
  const [isSupportFaceID, setSupportFaceID] = useState(false);
  const [isSupportTouchID, setSupportTouchID] = useState(false);
  const [isNotingSupport, setNothingSupport] = useState(false);
  const [loginInfo, setLoginInfo] = useState({});

  useEffect(() => {
    // get status user use TouchId
    LocalStorage.get(KEY_USED_TOUCHID_TO_LOGIN, (error, result) => {
      if (result) {
        const params = JSON.parse(result);
        setIsFace(params.usedFaceId);
      }
    });

    // get Info login user
    LocalStorage.get(KEY_INFO_LOGIN, (error, result) => {
      if (result) {
        const params = JSON.parse(result);
        setLoginInfo(params);
      }
    });

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
  }, []);

  const toggleFace_id = async () => {
    if (isFace) {
      Alert.alert(
        I18n.t('common.notice'),
        isSupportFaceID
          ? I18n.t('invoiceSetting.close_face_id')
          : I18n.t('invoiceSetting.close_touch_id'),
        [
          {
            text: I18n.t('invoiceSetting.dong'),
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: I18n.t('invoiceSetting.dongY'),
            onPress: () => {
              setIsFace(false);
              const params = {
                usedFaceId: !isFace,
              };
              LocalStorage.set(
                KEY_USED_TOUCHID_TO_LOGIN,
                JSON.stringify(params),
              );
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      const dialog = {
        onSubmit: text => {
          // check password true/fase
          if (loginInfo.password == text) {
            setIsFace(true);
            const params = {
              usedFaceId: !isFace,
            };
            LocalStorage.set(KEY_USED_TOUCHID_TO_LOGIN, JSON.stringify(params));
          } else {
            Alert.alert(
              I18n.t('common.notice'),
              I18n.t('changePasswordScreen.nhapSai'),
            );
          }
        },
      };
      ConfirmPass.show(dialog);
    }
  };

  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <View style={styles.container}>
        <AppHeader
          Icon={Menu}
          backgroundColor={AppColors.blue}
          titleColor={AppColors.white}
          iconColor={AppColors.white}
          title={I18n.t('invoiceSetting.title')}
          onPressMenu={() => Actions.drawerOpen()}
        />
        {isSupportFaceID && (
          <View style={styles.content}>
            <Faceid style={styles.touch_id} fill={AppColors.darkblue} />
            <Text style={styles.txt_setting}>
              {I18n.t('invoiceSetting.face_id')}
            </Text>
            <View style={styles.box}>
              <Switch
                trackColor={{false: '#767577', true: '#35C759'}}
                thumbColor={isFace ? 'white' : 'white'}
                ios_backgroundColor="#CFD4D0"
                onValueChange={toggleFace_id}
                value={isFace}
              />
            </View>
          </View>
        )}
        {isSupportTouchID && (
          <View style={styles.content}>
            <Touch style={styles.touch_id} fill={AppColors.darkblue} />
            <Text style={styles.txt_setting}>
              {I18n.t('invoiceSetting.touch_id')}
            </Text>
            <View style={styles.box}>
              <Switch
                trackColor={{false: '#767577', true: '#35C759'}}
                thumbColor={isFace ? 'white' : 'white'}
                ios_backgroundColor="#CFD4D0"
                onValueChange={toggleFace_id}
                value={isFace}
              />
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.content}
          onPress={() => Actions.changePIN()}>
          <LockPIN style={styles.touch_id} fill={AppColors.darkblue} />
          <Text style={styles.txt_setting}>
            {I18n.t('invoiceSetting.changePIN')}
          </Text>
          <View style={styles.box} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.content}
          onPress={() => {
            Alert.alert(
              '',
              I18n.t('invoiceSetting.shareScreen'),
              [
                {
                  text: I18n.t('invoiceSetting.dong'),
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: I18n.t('invoiceSetting.chiaSe'),
                  onPress: () => onShare(),
                },
              ],
              {cancelable: false},
            );
          }}>
          <Share_icon style={styles.touch_id} fill={AppColors.darkblue} />
          <Text style={styles.txt_setting}>
            {I18n.t('invoiceSetting.chiaSe')}
          </Text>
          <View style={styles.box} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  touch_id: {
    flex: 1,
    width: 37,
    height: 37,
    marginHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    marginVertical: AppSizes.marginSml,
    backgroundColor: AppColors.lightgray,
    height: 50,
    alignItems: 'center',
  },
  txt_setting: {
    flex: 2,
    ...AppStyles.baseText,
    fontSize: AppSizes.fontMedium,
    lineHeight: 20,
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default InvoiceSetting;
