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
import Dlog from '../components/Dlog';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');

// add animation when keyboard did show
const _keyboardDidShow = () => {
  animate();
};

// add animation when keyboard did hide
const _keyboardDidHide = () => {
  animate();
};

// hàm render chính màn hình
const ForgotScreen = (props) => {
  console.log('ForgotScreen---', props);
  // hàm lưu trữ thông tin nhập
  const [userInput, setUserInput] = React.useState({
    mst: '',
    userName: '',
    Email: '',
  });

  const [isLoading, setLoading] = React.useState(false);

  // hàm gửi thực hiện nhận mã OTP
  const getMaOTP = React.useCallback(() => {
    if (!userInput.mst) {
      return Alert.alert('Thông báo', 'Không được bỏ trống mã số thuế');
    }
    if (!userInput.userName) {
      return Alert.alert('Thông báo', 'Không được bỏ trống tên đang nhập');
    }
    if (!userInput.Email) {
      return Alert.alert('Thông báo', 'Không được bỏ trống email');
    }

    const params = {
      username: userInput.userName,
      madv: userInput.mst,
      email: userInput.Email,
    };
    setLoading(true);
    return API.getOTP(params).then(
      (res) => {
        setLoading(false);
        if (res.data && res.data.code == SUCCESS_CODE) {
          return Alert.alert(
            I18n.t('common.notice'),
            res.data.msg,
            [
              {
                text: I18n.t('common.yes'),
                onPress: () => Actions.resetPass({data: params}),
              },
            ],
            {cancelable: false},
          );
        } else {
          return Alert.alert(I18n.t('common.notice'), res.data.msg);
        }
      },
      (err) => {
        setLoading(false);
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
        title={I18n.t('forgotPassword.titleScreen')}
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
            marginTop: -keyboard.keyboardHeight / 5,
          }}>
          <Text style={styles.title}>{I18n.t('forgotPassword.title')}</Text>
          <Text style={styles.desc}>
            {I18n.t('forgotPassword.descreption')}
          </Text>
          <View style={styles.box}>
          <EnvoiceInput
            titleInput={I18n.t('forgotPassword.mst')}
            value={userInput.mst}
            placeholder={I18n.t('forgotPassword.nhapMST')}
            onChangeText={(text) => setUserInput({...userInput, mst: text})}
          />
          <EnvoiceInput
            titleInput={I18n.t('forgotPassword.tenDangNhap')}
            value={userInput.userName}
            placeholder={I18n.t('forgotPassword.nhapTenDangNhap')}
            onChangeText={(text) =>
              setUserInput({...userInput, userName: text})
            }
          />
          <EnvoiceInput
            titleInput={I18n.t('forgotPassword.email')}
            value={userInput.Email}
            placeholder={I18n.t('forgotPassword.nhapEmail')}
            onChangeText={(text) => setUserInput({...userInput, Email: text})}
          />
          </View>
          <View style={styles.marginButtomText} />
          <ButtonText
            isLoading={isLoading}
            title={I18n.t('forgotPassword.getOTP')}
            onCick={getMaOTP}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    flex: 1,
    backgroundColor: AppColors.background,
    paddingHorizontal: AppSizes.paddingSml,
    flexGrow: 1,
  },
  title: {
    ...AppStyles.boldText,
    marginVertical: height * 0.0282,
    color: AppColors.black,
  },
  desc: {
    ...AppStyles.baseText,
    marginBottom: height * 0.0363,
  },
  marginButtomText: {
    height: height * 0.041,
  },
  wrapContent: {
    flex: 1,
  },
  box: {
    paddingHorizontal:AppSizes.paddingSml
  }
});

export default ForgotScreen;
