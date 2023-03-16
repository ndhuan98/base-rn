import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Alert,
  RefreshControl,
  ScrollView,
} from 'react-native';
import Account from '../../image/svg/Profile.svg';
import ProductLine from '../../image/svg/ProductLine.svg';
import DonVT from '../../image/svg/DonVT.svg';
import TAX from '../../image/svg/TAX.svg';
import Price1 from '../../image/svg/Price1.svg';
import EditLine from '../../image/svg/EditLine.svg';
import StatusBarTSD from '../../components/StatusBarTSD';
import {AppColors, AppStyles, AppSizes, AppFonts} from '../../theme';
import AppHeader from '../../components/AppHeader';
import Back from '../../image/svg/Back.svg';
import {I18n} from '@constant';
import {Actions} from 'react-native-router-flux';
import {API} from '@network';
import _ from 'lodash';
import {SUCCESS_CODE} from '../../ultil/NetworkHelper';
import GroupButton from '../../components/GroupButton';
import Spinner from 'react-native-spinkit';
import {formatNumber} from '../../ultil/EinvoiceSupport';
const {height, width} = Dimensions.get('window');
const onBackScreen = () => {
  return Actions.pop();
};

const DeleteGoods = (id, callbackref) => {
  const params = {
    idhanghoa: id,
  };
  API.deleteHangHoa(params).then(
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

const DetailGoods = props => {
  const [detailGoods, setDetailGoods] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  React.useEffect(() => {
    const params = {
      idhanghoa: props.id,
    };
    API.detailHangHoa(params)
      .then(res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          setDetailGoods(res.data.data);
          setLoading(false);
          setRefreshing(false);
        } else {
          setLoading(false);
          setRefreshing(false);
          Alert.alert(I18n.t('common.notice'), res.data.desc);
        }
      })
      .catch(function(error) {
        setLoading(false);
        setRefreshing(false);
      });
  }, [refreshing, onRefresh]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  });
  const loai_hang = detailGoods.loai_hang || '';
  const don_vi_tinh = detailGoods.don_vi_tinh || '';
  const ten_vat = detailGoods.ten_vat || '';
  const gia_nhap = detailGoods.gia_nhap || '';
  const ghi_chu = detailGoods.ghi_chu || '';
  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <AppHeader
        Icon={Back}
        onPressMenu={() => onBackScreen()}
        backgroundColor={AppColors.blue}
        titleColor={AppColors.white}
        iconColor={AppColors.white}
        title={I18n.t('detailGoods.title')}
        RightText={I18n.t('detailGoods.sua')}
        onPressRight={() =>
          Actions.addGoods({detailGoods, callbackref: () => onRefresh()})
        }
      />
      <ScrollView
        contentContainerStyle={styles.contaier}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading ? (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: AppSizes.margin,
            }}>
            <Spinner
              isVisible={loading}
              size={25}
              type={'FadingCircleAlt'}
              color={AppColors.blue}
            />
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.ten_hang}>{detailGoods.ten_hang}</Text>
              <Text styles={styles.ma_hang}>
                {I18n.t('detailGoods.maHang')} {detailGoods.ma_hang}
              </Text>
              <Text style={styles.gia_xuat}>
                {I18n.t('detailGoods.giaXuat')}{' '}
                {formatNumber(detailGoods.gia_xuat)}
              </Text>
            </View>
            <View style={styles.body}>
              <ProductLine style={styles.icon} fill={AppColors.blue} />
              <Text style={styles.title}>{I18n.t('detailGoods.loaiHang')}</Text>
              <Text numberOfLines={1} style={styles.goods}>
                {loai_hang}
              </Text>
            </View>

            <View style={styles.body}>
              <DonVT style={styles.icon} fill={AppColors.blue} />
              <Text style={styles.title}>
                {I18n.t('detailGoods.donViTinh')}
              </Text>
              <Text numberOfLines={1} style={styles.goods}>
                {don_vi_tinh}
              </Text>
            </View>

            <View style={styles.body}>
              <TAX style={styles.icon} fill={AppColors.blue} />
              <Text style={styles.title}>{I18n.t('detailGoods.thueSuat')}</Text>
              <Text numberOfLines={1} style={styles.goods}>
                {ten_vat}
              </Text>
            </View>

            <View style={styles.body}>
              <Price1 style={styles.icon} fill={AppColors.blue} />
              <Text style={styles.title}>{I18n.t('detailGoods.giaNhap')}</Text>
              <Text style={styles.goods}>{formatNumber(gia_nhap)}</Text>
            </View>

            <View style={styles.body}>
              <EditLine style={styles.icon} fill={AppColors.blue} />
              <Text style={styles.title}>{I18n.t('detailGoods.ghiChu')}</Text>
              <Text numberOfLines={1} style={styles.goods}>
                {ghi_chu}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.footer}>
          <GroupButton
            oneDisable={false}
            ActiveTitle={I18n.t('detailGoods.sua')}
            InactiveTitle={I18n.t('detailGoods.xoa')}
            onClickActive={() =>
              Actions.addGoods({detailGoods, callbackref: () => onRefresh()})
            }
            onClickInactive={() => {
              Alert.alert(
                I18n.t('common.notice'),
                I18n.t('detailGoods.titleAlert'),
                [
                  {
                    text: I18n.t('detailGoods.khong'),
                    onPress: () => {},
                  },
                  {
                    text: I18n.t('detailGoods.co'),
                    onPress: () =>
                      DeleteGoods(detailGoods.idhanghoa, props.callbackref),
                  },
                ],
                {cancelable: false},
              );
            }}
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
  content: {
    paddingHorizontal: AppSizes.padding,
    paddingVertical: AppSizes.padding,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: AppSizes.marginSml,
  },
  body: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 50,
    borderColor: AppColors.border,
  },
  icon: {
    width: 20,
    height: 20,
  },
  title: {
    ...AppStyles.baseText,
    lineHeight: 16,
    marginLeft: AppSizes.marginXSml,
  },
  goods: {
    ...AppStyles.baseText,
    fontSize: AppSizes.fontMedium,
    color: AppColors.black,
    textAlign: 'right',
    lineHeight: 20,
    width: '50%',
    position: 'absolute',
    right: AppSizes.marginXXSml,
  },
  ten_hang: {
    ...AppStyles.boldText,
    fontSize: AppSizes.fontMedium,
    lineHeight: 23,
    color: AppColors.black,
    textAlign: 'center',
    marginBottom: AppSizes.marginSml,
  },
  ma_hang: {
    ...AppStyles.baseText,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: AppSizes.marginSml,
    paddingHorizontal: AppSizes.padding,
  },
  gia_xuat: {
    ...AppStyles.baseText,
    lineHeight: 20,
    color: AppColors.darkblue,
    textAlign: 'center',
    marginBottom: AppSizes.marginSml,
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
});
export default DetailGoods;
