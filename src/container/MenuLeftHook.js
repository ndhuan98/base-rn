import React, { useCallback, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AppColors, AppStyles, AppSizes } from '../theme';
import LabelImage from '../components/LabelImage';
import List from '../image/svg/List.svg';
import DashBoard from '../image/svg/pieChart_Line.svg';
import Logout from '../image/svg/Logout.svg';
import Report_Line from '../image/svg/Report_Line.svg';
import { LocalStorage } from '@data';
import ProductLine from '../image/svg/ProductLine.svg';
import Setting_2 from '../image/svg/Setting_2.svg';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_SUCCESS } from '../redux/actions/UserAction';
import { API } from '@network';
import { SUCCESS_CODE } from '../ultil/NetworkHelper';
import Dlog from '../components/Dlog';
import { I18n } from '@constant';
import Avatar_default from '../image/svg/Avatar_default.svg';
import Account from '../image/svg/Profile.svg';
import { AccessTokenManager } from '@data';
import Home from '../image/svg/Home.svg';
import Help from '../image/svg/Help.svg';
import Email from '../image/svg/Email.svg';
import Plus from '../image/svg/CreateInvoice.svg';
import DotChildren from '../image/svg/DotChildren.svg';
import ArrowUp from '../image/svg/menuLeft/ArrowUp.svg';
import TransferFile from '../image/svg/menuLeft/TransferFile.svg';
import DanhMuc from '../image/svg/menuLeft/DanhMuc.svg';

import GuiHoaDon from '../image/svg/menuLeft/GuiHoaDon.svg';
import CoQuanThue from '../image/svg/menuLeft/CoQuanThue.svg';
import DonViTinh from '../image/svg/menuLeft/DonViTinh.svg';
import HangHoaDichVu from '../image/svg/menuLeft/HangHoaDichVu.svg';
import HinhThucThanhToan from '../image/svg/menuLeft/HinhThucThanhToan.svg';
import KhanhHangDoiTac from '../image/svg/menuLeft/KhanhHangDoiTac.svg';
import LoaiHangHoaDichVu from '../image/svg/menuLeft/LoaiHangHoaDichVu.svg';
import TienThanhToan from '../image/svg/menuLeft/TienThanhToan.svg';
import ThongDiepGui from '../image/svg/menuLeft/ThongDiepGui.svg';
import ThongDiepNhan from '../image/svg/menuLeft/ThongDiepNhan.svg';

import { TouchableOpacity } from 'react-native-gesture-handler';

const KEY_USED_TOUCHID_TO_LOGIN = 'USED_TOUCHID_TO_LOGIN';
const KEY_INFO_LOGIN = 'KEY_INFO_LOGIN';

const Profile = () => {
  const userInfo = useSelector(state => state?.UserReducer?.User?.payload);

  return (
    <View style={styles.warpProfile}>
      <View
        style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'center' }}>
        <Avatar_default fill={AppColors.blue} style={styles.iconAvatar} />
      </View>
      <View style={AppStyles.flex1}>
        <Text style={styles.name}>{userInfo ? userInfo?.data.ho_ten : ''}</Text>
        <Text numberOfLines={2} style={{ ...AppStyles.baseText, fontSize: 12 }}>
          {userInfo ? userInfo?.data?.ten_don_vi : ''}
        </Text>
        <Text style={{ ...AppStyles.baseText, fontSize: 12 }}>
          {`MST: ${userInfo ? userInfo?.data?.ma_so_thue : ''}`}
        </Text>
      </View>
    </View>
  );
};

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


// Init Menu Left Screen
const MenuLeftHookScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [isShowDanhMuc, setShowDanhMuc] = useState(false);
  const [isShowGuiHoaDon, setShowGuiHoaDon] = useState(false);
  const [isShowXuLyHoaDon, setShowXuLyHoaDon] = useState(false);

  const [isShowTruyenNhan, setShowTruyenNhan] = useState(false);
  const [isShowLapHoaDon, setShowLapHoaDon] = useState(false);
  const accountInfo = useSelector((state => state?.UserReducer?.User?.payload?.data))

  // lấy thông tin người dùng
  React.useEffect(() => {
    API.getUserInfo().then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          dispatch(GET_USER_SUCCESS(res.data));
        }
      },
      err => {
        Dlog('err -> userInfo', err);
      },
    );
  }, []);

  React.useEffect(() => {
    return () => {
      const { isDrawerOpen: wasDrawerOpen } = navigation.state;
      if (wasDrawerOpen == true) {
        Actions.drawerClose();
      } else {
        Keyboard.dismiss();
      }
    };
  }, [navigation]);

  const developmentFunt = useCallback(() => {
    Alert.alert(I18n.t('common.notice'), I18n.t('common.developing'))
  }, [])


  return (
    <SafeAreaView style={AppStyles.flex1}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Profile />
          <LabelImage
            Icon={Home}
            label={I18n.t('menuLeftScreen.trangChu')}
            onPress={() => Actions.jump('HomeScreen')}
          />

          <TouchableOpacity
            onPress={() => setShowLapHoaDon(!isShowLapHoaDon)}
            style={styles.wrapCategory}>
            <LabelImage
              Icon={Plus}
              label={I18n.t('menuLeftScreen.lapHoaDon')}
            />
            <ArrowUp
              style={[
                styles.iconArrow,
                !isShowLapHoaDon && { transform: [{ rotate: '180deg' }] },
              ]}
              fill={AppColors.gray}
            />
          </TouchableOpacity>

          {isShowLapHoaDon && (
            <View style={styles.wrapChildMenu}>
              <LabelImage
                iconStyle={styles.dotIcon}
                Icon={DotChildren}
                contentStyles={AppStyles.baseText}
                label={I18n.t('menuLeftScreen.lapHoaDonGTGT')}
                onPress={() => Actions.jump('createInvoice')}
              />

              {accountInfo.isHoaDonBH && <LabelImage
                iconStyle={styles.dotIcon}
                Icon={DotChildren}
                contentStyles={AppStyles.baseText}
                label={I18n.t('menuLeftScreen.lapHoaDonBanHang')}
                onPress={developmentFunt}
              />}
              {accountInfo.isHoadonGTGT_MTT && <LabelImage
                iconStyle={styles.dotIcon}
                Icon={DotChildren}
                contentStyles={AppStyles.baseText}
                label={I18n.t('menuLeftScreen.lapHoaDonGTGTMTT')}
                onPress={() => Actions.jump('hoaDonGTGTMTT')}
              />}
              {accountInfo.isHoaDonBH_MTT && <LabelImage
                iconStyle={styles.dotIcon}
                Icon={DotChildren}
                contentStyles={AppStyles.baseText}
                label={I18n.t('menuLeftScreen.lapHoaDonBGMTT')}
                onPress={() => Actions.jump('hoaDonBHMTT')}
              />}
              {accountInfo.isHoaDonPXK && <LabelImage
                iconStyle={styles.dotIcon}
                Icon={DotChildren}
                contentStyles={AppStyles.baseText}
                label={I18n.t('menuLeftScreen.lapPhieuXuatKho')}
                onPress={developmentFunt}
              />}

            </View>
          )}
          <LabelImage
            Icon={List}
            label={I18n.t('menuLeftScreen.danhSachHoaDonDienTu')}
            onPress={() => Actions.jump('listInvoice')}
          />
          <TouchableOpacity
            onPress={() => setShowGuiHoaDon(!isShowGuiHoaDon)}
            style={styles.wrapCategory}>
            <LabelImage
              Icon={GuiHoaDon}
              label={I18n.t('menuLeftScreen.guiHoaDon')}
            />
            <ArrowUp
              style={[
                styles.iconArrow,
                !isShowGuiHoaDon && { transform: [{ rotate: '180deg' }] },
              ]}
              fill={AppColors.gray}
            />
          </TouchableOpacity>
          {isShowGuiHoaDon && (
            <View style={styles.wrapChildMenu}>
              <LabelImage
                iconStyle={styles.dotIcon}
                Icon={DotChildren}
                contentStyles={AppStyles.baseText}
                label={I18n.t('menuLeftScreen.mailList')}
                onPress={() => Actions.jump('mailListScreen')}
              />
              <LabelImage
                contentStyles={AppStyles.baseText}
                iconStyle={styles.dotIcon}
                Icon={DotChildren}
                label={I18n.t('menuLeftScreen.chuyenHoaDon')}
                onPress={() => Actions.jump('sendCQT')}
              />
            </View>
          )}
          <TouchableOpacity
            onPress={() => setShowXuLyHoaDon(!isShowXuLyHoaDon)}
            style={styles.wrapCategory}>
            <LabelImage
              Icon={GuiHoaDon}
              label={I18n.t('menuLeftScreen.xuLyHoaDon')}
            />
            <ArrowUp
              style={[
                styles.iconArrow,
                !isShowXuLyHoaDon && { transform: [{ rotate: '180deg' }] },
              ]}
              fill={AppColors.gray}
            />
          </TouchableOpacity>
          {isShowXuLyHoaDon && (
            <View style={styles.wrapChildMenu}>
              {/* <LabelImage
                iconStyle={styles.dotIcon}
                Icon={DotChildren}
                contentStyles={AppStyles.baseText}
                label={I18n.t('menuLeftScreen.xuLyXoaBo')}
                onPress={() => Actions.jump('XuLyXoaBoB1')}
              /> */}
              <LabelImage
                contentStyles={AppStyles.baseText}
                iconStyle={styles.dotIcon}
                Icon={DotChildren}
                label={I18n.t('menuLeftScreen.thongBaoSaiSot')}
                onPress={() => Actions.jump('thongBaoSaiSot')}
              />
               {/* <LabelImage
                contentStyles={AppStyles.baseText}
                iconStyle={styles.dotIcon}
                Icon={DotChildren}
                label={'Danh sách hoá đơn sai sót'}
                onPress={() => Actions.jump('dsHoaDonSaiSot')}
              />
               <LabelImage
                contentStyles={AppStyles.baseText}
                iconStyle={styles.dotIcon}
                Icon={DotChildren}
                label={'Danh sách thông báo sai sót'}
                onPress={() => Actions.jump('dsThongBaoSaiSot')}
              /> */}
            </View>
          )}

          <TouchableOpacity
            onPress={() => setShowTruyenNhan(!isShowTruyenNhan)}
            style={styles.wrapCategory}>
            <LabelImage
              Icon={TransferFile}
              label={I18n.t('menuLeftScreen.quanLyTruyenNhanDuLieu')}
            />
            <ArrowUp
              style={[
                styles.iconArrow,
                !isShowGuiHoaDon && { transform: [{ rotate: '180deg' }] },
              ]}
              fill={AppColors.gray}
            />
          </TouchableOpacity>

          {isShowTruyenNhan && (
            <View style={styles.wrapChildMenu}>
              <LabelImage
                iconStyle={styles.dotIcon}
                Icon={DotChildren}
                contentStyles={AppStyles.baseText}
                label={I18n.t('menuLeftScreen.thongDiepGui')}
                onPress={() => Actions.jump('thongDiepGui')}
              />
              <LabelImage
                contentStyles={AppStyles.baseText}
                iconStyle={styles.dotIcon}
                Icon={DotChildren}
                label={I18n.t('menuLeftScreen.thongDiepNhan')}
                onPress={() => Actions.jump('thongDiepNhan')}
              />
            </View>
          )}
          <View style={styles.line} />
          <LabelImage
            Icon={DashBoard}
            label={I18n.t('menuLeftScreen.thongKe')}
            onPress={() => {
              Actions.jump('DashboardSceen');
            }}
          />
          <LabelImage
            Icon={Report_Line}
            label={I18n.t('menuLeftScreen.danhSachBaoCao')}
            onPress={() => {
              Actions.jump('reportScreen');
            }}
          />
          <View style={styles.line} />
          <TouchableOpacity
            onPress={() => setShowDanhMuc(!isShowDanhMuc)}
            style={styles.wrapCategory}>
            <LabelImage
              Icon={DanhMuc}
              label={I18n.t('menuLeftScreen.danhMuc')}
            />
            <ArrowUp
              style={[
                styles.iconArrow,
                !isShowDanhMuc && { transform: [{ rotate: '180deg' }] },
              ]}
              fill={AppColors.gray}
            />
          </TouchableOpacity>

          {isShowDanhMuc && (
            <View style={styles.wrapChildMenu}>
              <LabelImage
                contentStyles={AppStyles.baseText}
                iconStyle={styles.dotIcon}
                Icon={DotChildren}
                label={I18n.t('menuLeftScreen.khachHangDoiTac')}
                onPress={() => {
                  Actions.jump('invoiceCusmer');
                }}
              />
              <LabelImage
                contentStyles={AppStyles.baseText}
                iconStyle={styles.dotIcon}
                Icon={DotChildren}
                label={I18n.t('menuLeftScreen.hangHoaDichVu')}
                onPress={() => {
                  Actions.jump('goodsScreen');
                }}
              />
              <LabelImage
                contentStyles={AppStyles.baseText}
                iconStyle={styles.dotIcon}
                Icon={DotChildren}
                label={I18n.t('menuLeftScreen.loaiHangHoaDichVu')}
                onPress={() => Actions.jump('loaiHangHoa')}
              />
              <LabelImage
                contentStyles={AppStyles.baseText}
                iconStyle={styles.dotIcon}
                Icon={DotChildren}
                label={I18n.t('menuLeftScreen.tienThanhToan')}
                onPress={() => Actions.jump('tienThanhToan')}
              />
              <LabelImage
                contentStyles={AppStyles.baseText}
                iconStyle={styles.dotIcon}
                Icon={DotChildren}
                label={I18n.t('menuLeftScreen.hinhThucThanhToan')}
                onPress={() => Actions.jump('hinhThucThanhToan')}
              />
              <LabelImage
                contentStyles={AppStyles.baseText}
                iconStyle={styles.dotIcon}
                Icon={DotChildren}
                label={I18n.t('menuLeftScreen.donViTinh')}
                onPress={() => Actions.jump('donViTinh')}
              />
            </View>
          )}

          <View style={styles.line} />
          <LabelImage
            Icon={Help}
            label={I18n.t('menuLeftScreen.help')}
            onPress={() => Actions.jump('invoiceHelpScreen')}
          />
          <View style={styles.line} />
          <LabelImage
            Icon={Setting_2}
            label={I18n.t('menuLeftScreen.invoiceSetting')}
            onPress={() => {
              Actions.jump('invoiceSetting');
            }}
          />
          <LabelImage
            Icon={Account}
            label={I18n.t('menuLeftScreen.thongTinTaiKhoan')}
            onPress={() => {
              Actions.accountSceen();
            }}
          />
          <LabelImage
            Icon={Logout}
            label={I18n.t('menuLeftScreen.dangXuat')}
            onPress={() => {
              Alert.alert(
                I18n.t('common.notice'),
                I18n.t('menuLeftScreen.logout'),
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
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Innit style screen
const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    marginBottom: 30,
  },
  warpProfile: {
    borderBottomWidth: 1,
    borderColor: '#E4E4E4',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: AppSizes.marginSml,
    paddingVertical: 20,
  },
  imgAvatar: { flex: 1 / 2, width: 50, height: 50 },
  wrapVersion: {
    width: '100%',
    padding: AppSizes.paddingMedium,
    backgroundColor: '#F1F1F1',
    position: 'absolute',
    bottom: 1,
  },
  wrapExpand: { flexDirection: 'column', marginLeft: 20 },
  iconAvatar: {
    width: 68,
    height: 68,
    borderRadius: 5,
    marginRight: AppSizes.marginSml,
  },
  name: {
    ...AppStyles.boldText,
    fontSize: 16,
    lineHeight: 19,
  },
  line: {
    width: '100%',
    backgroundColor: '#E4E4E4',
    height: 1,
    marginVertical: AppSizes.marginXSml,
  },
  wrapCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
  },

  iconArrow: {
    width: 16,
    height: 16,
  },
  dotIcon: {
    minWidth: 8,
    minHeight: 8
  },
  wrapChildMenu: {
    marginLeft: AppSizes.margin,
  }
});

export default MenuLeftHookScreen;
