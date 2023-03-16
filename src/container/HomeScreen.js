import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Linking,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AppHeader from '../components/AppHeader';
import { AppStyles, AppColors, AppSizes } from '../theme';
import HomeBg from '../image/Home/BgHome.png';

import ThaiSon from '../image/svg/ThaiSon.svg';
import Twitter from '../image/svg/Twitter.svg';
import Facebook from '../image/svg/Facebook.svg';
import Gmail from '../image/svg/Gmail.svg';
import Menu from '../image/svg/menu1.svg';
import EnvoiceLogo from '../image/svg/invoiceLogo.svg';
import StatusBarTSD from '../components/StatusBarTSD';
import LaberColor from '../components/LaberColor';
import API from '../network/API';
import Dlog from '../components/Dlog';
import { I18n } from '@constant';

// Hàm hiển thị thông tin công ty
const Footer = () => {
  // Hàm thục hiện action gọi điện
  const callSupport = () => { };
  // Hàm xử lý liên kết mạng xã hội
  return (
    <View style={styles.wrapFooter}>
      <ThaiSon style={styles.iconLogo} />
      <View style={styles.wrapTxtSupport}>
        <Text style={{ ...AppStyles.semiboldText, color: '#0A6499' }}>
          {'TỔNG ĐÀI HỖ TRỢ 24/7'}
        </Text>
        <LaberColor
          title={'Miền Bắc '}
          valueCall={'19004767'}
          value={'1900 4767'}
        />
        <LaberColor
          title={'Miền Nam '}
          valueCall={'19004768'}
          value={'1900 4768'}
        />
      </View>
      <View style={AppStyles.flex1} />
      <View style={{ alignItems: 'flex-end', justifyContent: 'space-around' }}>
        <EnvoiceLogo style={styles.iconE} />
        {/* <Text style={AppStyles.baseText}> {'www.einvoice.vn'}</Text> */}
        <TouchableOpacity onPress={() => { }} style={styles.wrapIcon}>
          <Gmail fill={AppColors.red} style={styles.iconS} />
          <Facebook fill={AppColors.blue} style={styles.iconS} />
          <Twitter fill={AppColors.blue} style={styles.iconS} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Thông báo mã PIN kich hoạt đã được gửi

const InfoPIN = props => {
  const { userInfo, onPressYes, onPressNo, onPessOut } = props;
  return (
    <View style={styles.containerAlert}>
      <TouchableOpacity onPress={() => onPessOut()} style={AppStyles.flex1} />
      <View style={styles.wrapInfoAlert}>
        <Text style={styles.titleAlert}>{'Thông báo'}</Text>
        <Text style={AppStyles.baseText}>
          Tài khoản Mã số thuế{' '}
          <Text style={AppStyles.boldText}>{userInfo?.mst} </Text>
          đã được khởi tạo mã PIN áp dụng ký số tự động trên App Einvoice Mobile
        </Text>
        <Text style={AppStyles.baseText}>{'Mã PIN đã được gửi tới email'}</Text>
        <Text style={[AppStyles.baseText, { color: AppColors.blue }]}>
          {`${userInfo?.email}`}
        </Text>
        <Text style={AppStyles.baseText}>
          {'Vui lòng kiểm tra email và xác nhận!'}
        </Text>
        <View style={styles.bottomAlert}>
          <TouchableOpacity onPress={() => onPressNo()}>
            <Text style={[AppStyles.boldText, { color: AppColors.black }]}>
              {'Không'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPressYes()}
            style={{ marginHorizontal: AppSizes.margin }}>
            <Text style={[AppStyles.boldText, { color: AppColors.black }]}>
              {'Có'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => onPessOut()} style={AppStyles.flex1} />
    </View>
  );
};

// Hàm render chính
const HomeScreen = () => {
  const [infoPIN, setInfoPIN] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const getInfoPin = () => {
    return API.getInfoPIN().then(
      res => {
        if (res.data && res.data.data) {
          setModalVisible(res?.data?.msg);
          setInfoPIN(res?.data?.data);
        } else {
          return Alert.alert(I18n.t('common.notice'), res?.data?.msg);
        }
      },
      err => {
        Dlog('getInfoPin', err);
      },
    );
  };

  const onUpdateReadedPIN = () => {
    return API.updateReceivePIN().then(
      res => {
        Dlog('onUpdateReadedPIN Success', res);
      },
      err => {
        Dlog('onUpdateReadedPIN Error', err);
      },
    );
  };

  useEffect(() => {
    getInfoPin();
  }, []);

  const onPressYes = () => {
    setModalVisible(false);
    onUpdateReadedPIN();
    Actions.changePIN();
  };
  const onPressNo = () => {
    onUpdateReadedPIN();
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={{ ...AppStyles.styleSafeArea }}>
      <View style={AppStyles.flex1}>
        <StatusBarTSD />
        <ImageBackground source={HomeBg} resizeMode='contain' style={styles.container}>
          <AppHeader
            Icon={Menu}
            backgroundColor={AppColors.white}
            title={'Hóa đơn điện tử - Einvoice Thái Sơn'}
            onPressMenu={() => Actions.drawerOpen()}
          />
          <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <InfoPIN
              userInfo={infoPIN}
              onPressYes={onPressYes}
              onPressNo={onPressNo}
              onPessOut={onPressNo}
            />
          </Modal>
          <Footer />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

// Khởi tạo style css màn hình
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FCFBFF'
  },
  containerAlert: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)' },
  wrapInfoAlert: {
    width: '90%',
    padding: AppSizes.padding,
    backgroundColor: AppColors.white,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  titleAlert: {
    ...AppStyles.boldText,
    color: AppColors.black,
    paddingBottom: AppSizes.paddingXXSml,
  },
  bottomAlert: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: AppSizes.marginSml,
  },

  wrapFooter: {
    width: '100%',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 1,
    padding: AppSizes.paddingSml,
  },
  iconLogo: { width: 55, height: 55 },
  iconE: { width: 75, height: 12 },
  iconS: {
    width: 21,
    height: 21,
    marginHorizontal: AppSizes.paddingXXSml,
  },
  wrapIcon: { flexDirection: 'row', justifyContent: 'flex-end' },
  wrapTxtSupport: { marginLeft: AppSizes.marginSml },
});

export default React.memo(HomeScreen);
