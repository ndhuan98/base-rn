import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Alert,
  ScrollView,
  RefreshControl
} from 'react-native';
import Account from '../../image/svg/Profile.svg';
import Fax from '../../image/svg/fAX.svg';
import Email from '../../image/svg/Email.svg';
import Phone from '../../image/svg/Phone.svg';
import Money from '../../image/svg/Money.svg';
import Bank from '../../image/svg/Bank.svg';
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
const {height, width} = Dimensions.get('window');
const onBackScreen = async () => {
  return Actions.pop();
};
const DeleteCustomer = (id,callbackref) => {
  const params = {
    iddoitac: id,
  };
   API.deleteDoitac(params).then(
    res => {
      if (res.data && res.data.code == SUCCESS_CODE) {
        return Alert.alert(
          I18n.t('common.notice'),
          res.data.desc,
          [{text: 'OK', onPress: () => {callbackref(),Actions.pop()}}],
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
const DetailCustomer = props => {
  const [detailCustomer, setDetailCustomer] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  React.useEffect(() => {
    const params = {
      iddoitac: props.id,
    };
    API.detailDoiTac(params)
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
  }, [refreshing,onRefresh]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  });
  const ten_doi_tac = detailCustomer.ten_doi_tac || '';
  const email = detailCustomer.email || '';
  const so_dien_thoai = detailCustomer.so_dien_thoai || '';
  const so_fax = detailCustomer.fax || '';
  const ten_ngan_hang = detailCustomer.ten_ngan_hang || '';
  const tai_khoan_ngan_hang = detailCustomer.tai_khoan_ngan_hang || '';
  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <AppHeader
        Icon={Back}
        onPressMenu={() => onBackScreen()}
        backgroundColor={AppColors.blue}
        titleColor={AppColors.white}
        iconColor={AppColors.white}
        title={I18n.t('ScreenKhachHang.title')}
        RightText={I18n.t('ScreenKhachHang.sua')}
        onPressRight={() => Actions.addCustomer({detailCustomer,callbackref: ()=> onRefresh()})}
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
              <Text style={styles.tenDoiTac}>{detailCustomer.ten_doi_tac}</Text>
              <Text style={styles.tenDiaChi}>{detailCustomer.dia_chi}</Text>
              <Text style={styles.maDoiTac}>
                {I18n.t('ScreenKhachHang.maKH')} {detailCustomer.ma_doi_tac}
              </Text>
              <Text style={styles.maSoThue}>
                {I18n.t('ScreenKhachHang.MST')}
                {detailCustomer.ma_so_thue}
              </Text>
            </View>
            <View style={styles.body}>
              <Account style={styles.icon} fill={AppColors.blue} />
              <Text style={styles.title}>
                {I18n.t('ScreenKhachHang.nguoiMuaHang')}
              </Text>
              <Text numberOfLines={1} style={styles.customer}>
                {ten_doi_tac}
              </Text>
            </View>

            <View style={styles.body}>
              <Email style={styles.icon} fill={AppColors.blue} />
              <Text style={styles.title}>
                {I18n.t('ScreenKhachHang.email')}
              </Text>
              <Text numberOfLines={1} style={styles.customer}>
                {email}
              </Text>
            </View>

            <View style={styles.body}>
              <Phone style={styles.icon} fill={AppColors.blue} />
              <Text style={styles.title}>
                {I18n.t('ScreenKhachHang.phone')}
              </Text>
              <Text numberOfLines={1} style={styles.customer}>
                {so_dien_thoai}
              </Text>
            </View>

            <View style={styles.body}>
              <Fax style={styles.icon} fill={AppColors.blue} />
              <Text style={styles.title}>{I18n.t('ScreenKhachHang.fax')}</Text>
              <Text numberOfLines={1} style={styles.customer}>
                {so_fax}
              </Text>
            </View>

            <View style={styles.body}>
              <Bank style={styles.icon} fill={AppColors.blue}/>
              <Text style={styles.title}>{I18n.t('ScreenKhachHang.bank')}</Text>
              <Text numberOfLines={1} style={styles.customer}>
                {ten_ngan_hang}
              </Text>
            </View>

            <View style={styles.body}>
              <Money style={styles.icon} fill={AppColors.blue} />
              <Text style={styles.title}>{I18n.t('ScreenKhachHang.soTK')}</Text>
              <Text numberOfLines={1} style={styles.customer}>
                {tai_khoan_ngan_hang}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.footer}>
          <GroupButton
            oneDisable={false}
            ActiveTitle={I18n.t('ScreenKhachHang.sua')}
            InactiveTitle={I18n.t('ScreenKhachHang.xoa')}
            onClickActive={() => Actions.addCustomer({detailCustomer,callbackref: ()=> onRefresh()})}
            onClickInactive={() => {
              Alert.alert(
                I18n.t('common.notice'),
                I18n.t('ScreenKhachHang.dialog'),
                [
                  {
                    text: I18n.t('ScreenKhachHang.no'),
                    onPress: () => {},
                  },
                  {
                    text: I18n.t('ScreenKhachHang.yes'),
                    onPress: () => DeleteCustomer(detailCustomer.id_doitac,props.callbackref),
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
  tenDoiTac: {
    ...AppStyles.boldText,
    fontSize: AppSizes.fontMedium,
    lineHeight: 23,
    color: AppColors.black,
    textAlign: 'center',
    marginBottom: AppSizes.marginSml,
  },
  tenDiaChi: {
    ...AppStyles.baseText,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: AppSizes.marginSml,
    paddingHorizontal: AppSizes.padding,
  },
  maDoiTac: {
    ...AppStyles.baseText,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: AppSizes.marginSml,
  },
  maSoThue: {
    ...AppStyles.semiboldText,
    fontSize: AppSizes.fontSmall,
    lineHeight: 16,
    textAlign: 'center',
    color: AppColors.darkblue,
    marginBottom: AppSizes.marginSml,
  },
  title: {
    ...AppStyles.baseText,
    lineHeight: 16,
    marginLeft: AppSizes.marginXSml,
  },
  customer: {
    ...AppStyles.baseText,
    fontSize: AppSizes.fontMedium,
    color: AppColors.black,
    width:'50%',
    textAlign:'right',
    lineHeight: 20,
    position: 'absolute',
    right: AppSizes.marginXXSml,
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
});
export default DetailCustomer;
