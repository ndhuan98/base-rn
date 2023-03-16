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
import DonViTinh from '../../../image/svg/menuLeft/DonViTinh.svg';
import {InfoLabel} from '@components';

import {I18n} from '@constant';
import {Actions} from 'react-native-router-flux';
import {API} from '@network';
import _, {fromPairs} from 'lodash';
import {SUCCESS_CODE} from '../../../ultil/NetworkHelper';
import GroupButton from '../../../components/GroupButton';
const {height, width} = Dimensions.get('window');

const DeleteDVT = (id, callbackref) => {
  const params = {
    id: id,
  };
  API.XoaDonViTinh(params).then(
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

const ThongTinDVT = props => {
  const [detailCustomer, setDetailCustomer] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    const params = {
      id: props.id,
    };
    API.ThongTinDonViTinh(params)
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
      I18n.t('DanhSachDonViTinh.banCoMuonXoaDonViTinh'),
      [
        {
          text: I18n.t('ScreenKhachHang.no'),
          onPress: () => {},
        },
        {
          text: I18n.t('ScreenKhachHang.yes'),
          onPress: () => DeleteDVT(detailCustomer.maDvtid, props.callbackref),
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
        title={I18n.t('DanhSachDonViTinh.thongTinDonViTinh')}
        RightText={I18n.t('ScreenKhachHang.sua')}
        onPressRight={() =>
          Actions.themSuaDonViTinh({
            thongTinDVT: detailCustomer,
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
            LeftText={I18n.t('DanhSachDonViTinh.maDonViTinh')}
            RightText={detailCustomer.maDvt}
          />
          <View style={styles.line} />
          <InfoLabel
            Icon={DonViTinh}
            LeftText={I18n.t('DanhSachDonViTinh.tenDonViTinh')}
            RightText={detailCustomer.tenDvt}
          />
          <View style={styles.line} />
        </View>
        <View style={styles.footer}>
          <GroupButton
            oneDisable={false}
            ActiveTitle={I18n.t('ScreenKhachHang.sua')}
            InactiveTitle={I18n.t('ScreenKhachHang.xoa')}
            onClickActive={() =>
              Actions.themSuaDonViTinh({
                thongTinDVT: detailCustomer,
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
export default ThongTinDVT;
