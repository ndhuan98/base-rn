import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import StatusBarTSD from '../../../components/StatusBarTSD';
import {AppColors, AppStyles, AppSizes, AppFonts} from '@theme';
import AppHeader from '../../../components/AppHeader';
import Back from '../../../image/svg/Back.svg';
import CodeScan from '../../../image/svg/CodeScan.svg';
import TienThanhToan from '../../../image/svg/menuLeft/TienThanhToan.svg';
import HinhThucThanhToan from '../../../image/svg/menuLeft/HinhThucThanhToan.svg';
import TyGia from '../../../image/svg/menuLeft/TyGia.svg';
import DocPhanLe from '../../../image/svg/menuLeft/DocPhanLe.svg';
import {InfoLabel} from '@components';
import {I18n} from '@constant';
import {Actions} from 'react-native-router-flux';
import {API} from '@network';
import _, {fromPairs} from 'lodash';
import {SUCCESS_CODE} from '../../../ultil/NetworkHelper';
import GroupButton from '../../../components/GroupButton';
import {formatNumber} from '../../../ultil/EinvoiceSupport';
const {height, width} = Dimensions.get('window');

const DeleteCustomer = (id, callbackref) => {
  const params = {
    id: id,
  };
  API.XoaTienThanhToan(params).then(
    res => {
      if (res.data && res.data.code == SUCCESS_CODE) {
        return Alert.alert(
          I18n.t('common.notice'),
          res.data.desc,
          [
            {
              text: 'OK',
              onPress: () => {
                callbackref(), Actions.pop();
              },
            },
          ],
          {cancelable: false},
        );
      }
      return Alert.alert(I18n.t('common.notice'), res.data.desc);
    },
    err => {
      Dlog('err -->', err);
    },
  );
};

const ThongTinTienTT = props => {
  const [detailCustomer, setDetailCustomer] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    const params = {
      id: props.id,
    };
    API.ThongTinTienThanhToan(params)
      .then(res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          setDetailCustomer(res.data.data);
          setLoading(false);
          setRefreshing(false);
        } else {
          setLoading(false);
          setRefreshing(false);
          Alert.alert(I18n.t('common.notice'), res.data.desc);
        }
      })
      .catch(function(error) {
        setRefreshing(false);
        setLoading(false);
      });
  }, [refreshing, onRefresh]);

  const onBackScreen = async () => {
    props?.callbackref();
    return Actions.pop();
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  });

  const onClickInactive = React.useCallback(() => {
    return Alert.alert(
      I18n.t('common.notice'),
      I18n.t('DanhSachTienThanhToan.banCoMuonXoaTienThanhToan'),
      [
        {
          text: I18n.t('ScreenKhachHang.no'),
          onPress: () => {},
        },
        {
          text: I18n.t('ScreenKhachHang.yes'),
          onPress: () =>
            DeleteCustomer(detailCustomer.maNtid, props.callbackref),
        },
      ],
      {cancelable: false},
    );
  });

  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <AppHeader
        Icon={Back}
        onPressMenu={() => onBackScreen()}
        backgroundColor={AppColors.blue}
        titleColor={AppColors.white}
        iconColor={AppColors.white}
        title={I18n.t('DanhSachTienThanhToan.thongTinTienThanhToan')}
        RightText={I18n.t('ScreenKhachHang.sua')}
        onPressRight={() =>
          Actions.themSuaTienThanhToan({
            thongTinTienTT: detailCustomer,
            callbackref: () => onRefresh(),
          })
        }
      />
      <ScrollView
        contentContainerStyle={styles.contaier}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <InfoLabel
            Icon={CodeScan}
            LeftText={I18n.t('DanhSachTienThanhToan.maNguyenTe')}
            RightText={detailCustomer.maNt}
          />
          <View style={styles.line} />
          <InfoLabel
            Icon={TienThanhToan}
            LeftText={I18n.t('DanhSachTienThanhToan.tenNguyenTe')}
            RightText={detailCustomer.tenNt}
          />
          <View style={styles.line} />
          <InfoLabel
            Icon={TyGia}
            LeftText={I18n.t('DanhSachTienThanhToan.tyGia')}
            RightText={formatNumber(detailCustomer.tyGia)}
            RightColor={AppColors.red}
          />
          <View style={styles.line} />
          <InfoLabel
            Icon={DocPhanLe}
            LeftText={I18n.t('DanhSachTienThanhToan.docPhanLe')}
            RightText={detailCustomer.docPhanLe}
          />
          <View style={styles.line} />
          <InfoLabel
            Icon={DocPhanLe}
            LeftText={I18n.t('DanhSachTienThanhToan.docNoiPhanLe')}
            RightText={detailCustomer.docNoiPhanLe}
          />
          <View style={styles.line} />
        </View>
        <View style={styles.footer}>
          <GroupButton
            oneDisable={false}
            ActiveTitle={I18n.t('ScreenKhachHang.sua')}
            InactiveTitle={I18n.t('ScreenKhachHang.xoa')}
            onClickActive={() =>
              Actions.themSuaTienThanhToan({
                thongTinTienTT: detailCustomer,
                callbackref: () => onRefresh(),
              })
            }
            onClickInactive={() => onClickInactive()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  contaier: {
    flex: 1,
    backgroundColor: AppColors.white,
  },

  icon: {
    width: 20,
    height: 20,
  },

  footer: {
    borderTopWidth: 1,
    borderColor: AppColors.lightgray,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: height * 0.1,
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
  btnSua: {
    width: '50%',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.lightgray,
  },
});
export default ThongTinTienTT;
