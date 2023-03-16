import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { AppColors, AppStyles, AppSizes } from '../theme';
import { Actions } from 'react-native-router-flux';
import StatusBarTSD from '../components/StatusBarTSD';
import AppHeader from '../components/AppHeader';
import Back from '../image/svg/Back.svg';
import Userpic from '../image/temp/Userpic.png';
import EnvoiceText from '../components/EnvoiceText';
import { I18n } from '@constant';
import { useDispatch, useSelector } from 'react-redux';
import Avatar_default from '../image/svg/Avatar_default.svg';
import API from '../network/API';
import { Dlog } from '../components';
import { SUCCESS_CODE } from '../ultil/NetworkHelper';
import { LocalStorage } from '@data';
import { AccessTokenManager } from '@data';

const KEY_USED_TOUCHID_TO_LOGIN = 'USED_TOUCHID_TO_LOGIN';
const KEY_INFO_LOGIN = 'KEY_INFO_LOGIN';

const ProfileUser = () => {
  const userInfo = useSelector(state => state.UserReducer.User.payload);
  return (
    <View style={styles.wrapProfile}>
      <Avatar_default style={styles.imgUser} fill={AppColors.white} />
      <Text style={styles.nameUser}>{userInfo.data.ho_ten}</Text>
      <TouchableOpacity onPress={() => Actions.changePassword()}>
        <Text style={styles.txtChangePass}>
          {I18n.t('accountScreen.doiMatKhau')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Hiển thị thông tin đăng nhập
// params  = {
//  TenDangNhap :'Admin'
//  HoVaTen:'Nguyễn Văn Vinh',
//  MaSoThue :'12222',
//  TenDonVi: 'Công ty Thai Sơn Test',
//  SoHoaDonConLai:'222',
//  SoSMSConLai :'2222'
// }

const InforLogin = () => {
  const userInfo = useSelector(state => state.UserReducer.User.payload);
  return (
    <View style={styles.containerInfor}>
      <Text style={styles.titleBold}>
        {I18n.t('accountScreen.thongTinDangNhap')}
      </Text>
      <EnvoiceText
        title={I18n.t('accountScreen.tenDangNhap')}
        value={userInfo.data.ten_dang_nhap}
        disabled
      />
      <EnvoiceText
        title={I18n.t('accountScreen.hoVaTen')}
        value={userInfo.data.ho_ten}
        disabled
      />
      <Text style={styles.titleBold}>
        {I18n.t('accountScreen.thongTinTaiKhoan')}
      </Text>
      <EnvoiceText
        title={I18n.t('accountScreen.maSoThue')}
        value={userInfo.data.ma_so_thue}
        disabled
      />
      <EnvoiceText
        title={I18n.t('accountScreen.tenDonVi')}
        value={userInfo.data.ten_don_vi}
        disabled
      />
      <EnvoiceText
        title={I18n.t('accountScreen.soHoaDonConLai')}
        value={userInfo.data.so_hoa_don_con_lai || 0}
        disabled
      />
      <EnvoiceText
        title={I18n.t('accountScreen.soSmsConLai')}
        value={userInfo.data.so_tin_nhan_sms_con_lai || 0}
        disabled
      />
      <EnvoiceText
        title={I18n.t('accountScreen.thoiHanThueBao')}
        value={userInfo?.data?.thoi_han_thue_bao}
        disabled
      />

      <EnvoiceText
        title={I18n.t('accountScreen.soETVANconLai')}
        value={userInfo?.data?.so_tvan}
        disabled
      />

      <EnvoiceText
        title={I18n.t('accountScreen.thoiHanETVAN')}
        value={userInfo?.data?.thoi_han_tvan}
        disabled
      />
    </View>
  );
};

// Hàm render chính màn hình
const AccountScreen = () => {

  const [isShowDelete, setDelete] = useState(false)

  useEffect(() => { fetchConfig() }, [])

  const fetchConfig = async () => {
    try {
      const response = await API.xoaAccount()
      if (response?.data?.code == SUCCESS_CODE) {
        console.log('esponse.data.msg', response.data.msg === 'true')
        return setDelete(response.data.msg === 'true')
      }
    } catch (error) {
      Dlog('fetchConfig', error)
    }
  }
  const logout = () => {
    LocalStorage.get(KEY_USED_TOUCHID_TO_LOGIN, (error, result) => {
      if (result) {
        const params = JSON.parse(result);
        if (!params.usedFaceId) {
          LocalStorage.remove(KEY_INFO_LOGIN);
        }
      }
    });
    Actions.replace('login');
    AccessTokenManager.clear();
    return {
      type: 'USER_LOGOUT',
    };
  };

  const onDelete = () => {
    return Alert.alert(
      I18n.t('common.notice'),
      'Bạn chắc chắn muốn xoá tài khoản?',
      [
        {
          text: I18n.t('menuLeftScreen.no'),
          onPress: () => { },
          style: 'cancel',
        },
        { text: I18n.t('menuLeftScreen.yes'), onPress: () => logout() },
      ],
      { cancelable: false },
    );
  }
  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <View style={styles.container}>
        <AppHeader
          Icon={Back}
          backgroundColor={AppColors.blue}
          titleColor={AppColors.white}
          iconColor={AppColors.white}
          title={I18n.t('accountScreen.thongTinTaiKhoan')}
          onPressMenu={() => Actions.drawerOpen()}
        />
        <ScrollView style={{ backgroundColor: AppColors.blue, flex: 1 }}>
          <ProfileUser />
          <InforLogin />
        </ScrollView>
        {isShowDelete && <TouchableOpacity
          onPress={onDelete}
          style={{
            position: 'absolute',
            justifyContent: 'center',
            zIndex: 1,
            alignItems: 'center',
            bottom: 1, height: 50,
            backgroundColor: 'red',
            width: '100%'
          }}>
          <Text style={{ ...AppStyles.boldText, color: AppColors.white }}>{'Xoá tài khoản'}</Text>
        </TouchableOpacity>}
      </View>
    </SafeAreaView>
  );
};

// Khởi tạo style css màn hình
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  titleBold: {
    ...AppStyles.boldText,
    fontSize: 15,
    lineHeight: 18,
    marginTop: AppSizes.margin,
  },
  wrapProfile: {
    width: '100%',
    backgroundColor: AppColors.blue,
    alignItems: 'center',
    paddingVertical: AppSizes.paddingSml,
  },
  imgUser: { width: 78, height: 78, marginBottom: AppSizes.marginSml },
  nameUser: {
    ...AppStyles.baseText,
    fontSize: AppSizes.fontLarge,
    color: AppColors.white,
    lineHeight: 25,
  },
  txtChangePass: {
    ...AppStyles.boldText,
    color: AppColors.white,
    fontSize: 13,
    lineHeight: 15,
    textDecorationLine: 'underline',
    paddingVertical: AppSizes.paddingSml,
  },
  containerInfor: {
    width: '100%',
    padding: AppSizes.paddingSml,
    backgroundColor: AppColors.background,
  },
});

export default AccountScreen;
