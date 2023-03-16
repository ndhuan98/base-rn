import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Alert,
  Keyboard,
  Platform,
  Dlog,
} from 'react-native';
import StatusBarTSD from '../../components/StatusBarTSD';
import {AppColors, AppStyles, AppSizes} from '../../theme';
import EnvoiceMenuText from '../../components/EnvoiceMenuText';
import EnvoiceText from '../../components/EnvoiceText';
import ButtonText from '../../components/ButtonText';
import AppHeader from '../../components/AppHeader';
import EnvoiceInputMenu from '../../components/EnvoiceInputMenu';
import Back from '../../image/svg/Back.svg';
import {I18n} from '@constant';
import {Actions} from 'react-native-router-flux';
import {danhSachNganHang} from '../invoiceCreate/DataFake';
import {InvoiceUtil} from '@util';
import DrawerAction from '../lightbox/DrawerAction';
import {API} from '@network';
import {SUCCESS_CODE} from '../../ultil/NetworkHelper';
import DialogLoading from '../../container/lightbox/DialogLoading';
import {format_mst, validateEmail, validate_phone} from '@util/Validater';
import {useKeyboard} from '@react-native-community/hooks';
import {animate} from '../../ultil/AnimateHelper';
import _ from 'lodash';
const Mode = {newMode: '1', editMode: '2'};

const onBackScreen = () => {
  return Actions.pop();
};
const _keyboardDidShow = () => {
  animate();
};

// add animation when keyboard did hide
const _keyboardDidHide = () => {
  animate();
};
const onUpdateCustomer = (customer, callbackref) => {
  if (!_.isEmpty(customer.ma_so_thue)) {
    if (!format_mst(customer.ma_so_thue)) {
      return Alert.alert(
        I18n.t('common.notice'),
        I18n.t('createInvoiceScreen.formatFail'),
      );
    }
  }
  if (!customer.ma_doi_tac) {
    return Alert.alert(
      I18n.t('common.notice'),
      I18n.t('addCustomer.ma_doi_tac'),
    );
  }
  if (!_.isEmpty(customer.email)) {
    if (!validateEmail(customer.email)) {
      return Alert.alert(
        I18n.t('common.notice'),
        I18n.t('createInvoiceScreen.formatEmail'),
      );
    }
  }

  if (!_.isEmpty(customer.so_dien_thoai))
    if (!validate_phone(customer.so_dien_thoai)) {
      return Alert.alert(
        I18n.t('common.notice'),
        I18n.t('createInvoiceScreen.formatPhone'),
      );
    }
  if (!customer.ten_doi_tac) {
    return Alert.alert(
      I18n.t('common.notice'),
      I18n.t('addCustomer.ten_doi_tac'),
    );
  }
  if (!customer.dia_chi) {
    return Alert.alert(I18n.t('common.notice'), I18n.t('addCustomer.dia_chi'));
  }
  const params = {
    id_doitac: customer.id_doitac,
    ten_ngan_hang: customer.ten_ngan_hang,
    ma_so_thue: customer.ma_so_thue,
    ma_doi_tac: customer.ma_doi_tac,
    ten_doi_tac: customer.ten_doi_tac,
    dia_chi: customer.dia_chi,
    email: customer.email,
    nguoi_giao_dich: customer.nguoi_giao_dich,
    so_dien_thoai: customer.so_dien_thoai,
    fax: customer.fax,
    tai_khoan_ngan_hang: customer.tai_khoan_ngan_hang,
  };
  API.saveDoiTac(params).then(
    res => {
      if (res.data && res.data.code == SUCCESS_CODE) {
        if (callbackref) {
          callbackref();
        }
        Alert.alert(
          I18n.t('common.notice'),
          res.data.desc,
          [{text: I18n.t('common.close'), onPress: () => Actions.pop()}],
          {cancelable: false},
        );
      } else {
        return Alert.alert(I18n.t('common.notice'), res.data.desc);
      }
    },
    err => {
      Dlog('saveCustomer', err);
    },
  );
};
const AddCustomer = props => {
  const [modeScreen, setModeScreen] = useState(Mode.newMode);
  React.useEffect(() => {
    if (props.detailCustomer) {
      setModeScreen(Mode.editMode);
      const data = {
        id_doitac: props.detailCustomer.id_doitac,
        ma_so_thue: props.detailCustomer.ma_so_thue,
        ma_doi_tac: props.detailCustomer.ma_doi_tac,
        ten_doi_tac: props.detailCustomer.ten_doi_tac,
        dia_chi: props.detailCustomer.dia_chi,
        email: props.detailCustomer.email,
        so_dien_thoai: props.detailCustomer.so_dien_thoai,
        fax: props.detailCustomer.fax,
        nguoi_giao_dich: props.detailCustomer.nguoi_giao_dich,
        ten_ngan_hang: props.detailCustomer.ten_ngan_hang,
        tai_khoan_ngan_hang: props.detailCustomer.tai_khoan_ngan_hang,
      };
      setCustomer(data);
    }
  }, []);
  const [customer, setCustomer] = useState({
    ma_so_thue: '',
    ma_doi_tac: '',
    ten_doi_tac: '',
    dia_chi: '',
    email: '',
    so_dien_thoai: '',
    fax: '',
    nguoi_giao_dich: '',
    ten_ngan_hang: '',
    tai_khoan_ngan_hang: '',
    id_doitac: 0,
  });
  const [loadingTax, setLoadingTax] = React.useState(false);
  const getInfoTax = React.useCallback(() => {
    if (!customer.ma_so_thue) {
      return Alert.alert(
        I18n.t('common.notice'),
        I18n.t('createInvoiceScreen.mstNotBeEmpty'),
      );
    }
    if (!format_mst(customer.ma_so_thue)) {
      return Alert.alert(
        I18n.t('common.notice'),
        I18n.t('createInvoiceScreen.formatFail'),
      );
    }
    if (!_.isEmpty(customer.email)) {
      if (!validateEmail(customer.email)) {
        return Alert.alert(
          I18n.t('common.notice'),
          I18n.t('createInvoiceScreen.formatEmail'),
        );
      }
    }
    if (!_.isEmpty(customer.so_dien_thoai))
      if (!validate_phone(customer.so_dien_thoai)) {
        return Alert.alert(
          I18n.t('common.notice'),
          I18n.t('createInvoiceScreen.formatPhone'),
        );
      }
    setLoadingTax(true);
    DialogLoading.show();
    const params = {
      mst: customer.ma_so_thue,
    };
    API.GetInformationByTaxcode(params).then(
      res => {
        setLoadingTax(false);
        DialogLoading.hide();
        if (res.data && res.data.code == SUCCESS_CODE) {
          const diaChiSub = _.join(
            _.concat(
              res.data.data.diaChiGiaoDich,
              res.data.data.tenQuanHuyen,
              res.data.data.tenTinh,
            ),
          );

          setCustomer({
            ...customer,
            ma_so_thue: res.data.data.maSoThue,
            ten_doi_tac: res.data.data.tenChinhThuc,
            dia_chi: diaChiSub,
            email: res.data.data.email,
            fax: res.data.data.fax,
          });
          setLoadingTax(false);
        } else {
          return Alert.alert(I18n.t('common.notice'), res.data.msg);
        }
      },
      err => {
        setLoadingTax(false);
        DialogLoading.hide();
        Dlog('err GetInformationByTaxcode ', err);
      },
    );
  });
  const drawBank = {
    title: 'Danh sách ngân hàng',
    dataList: danhSachNganHang,
    typeScreen: InvoiceUtil.danhSachNganHang,
    actionSelected: item => {
      setCustomer({...customer, ten_ngan_hang: item.value});
    },
  };
  const keyboard = useKeyboard();
  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);
  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <View
        style={{
          ...AppStyles.flex1,
          backgroundColor: AppColors.white,
        }}>
        <AppHeader
          Icon={Back}
          onPressMenu={() => onBackScreen()}
          backgroundColor={AppColors.blue}
          titleColor={AppColors.white}
          iconColor={AppColors.white}
          title={
            modeScreen == Mode.newMode
              ? I18n.t('addCustomer.title')
              : I18n.t('addCustomer.titleTow')
          }
          RightText={I18n.t('addCustomer.ghi')}
          onPressRight={() => onUpdateCustomer(customer, props.callbackref)}
        />
        <ScrollView>
          <View
            style={{
              ...Platform.select({
                ios: {
                  ...styles.container,
                  marginBottom: keyboard.keyboardShown
                    ? keyboard.keyboardHeight
                    : 0,
                },
                android: {
                  ...styles.container,
                },
              }),
            }}>
            <EnvoiceInputMenu
              onClickRight={getInfoTax}
              isLoading={loadingTax}
              onChangeText={text =>
                setCustomer({...customer, ma_so_thue: text})
              }
              value={customer.ma_so_thue}
              title={I18n.t('addCustomer.maSoThue')}
              titleRight={'Lấy thông tin'}
            />
            {modeScreen == Mode.newMode ? (
              <EnvoiceText
                require
                maxLength={12}
                title={I18n.t('addCustomer.maKH')}
                value={customer.ma_doi_tac}
                onChangeText={text =>
                  setCustomer({...customer, ma_doi_tac: text})
                }
              />
            ) : (
              <EnvoiceText
                require
                disabled
                title={I18n.t('addCustomer.maKH')}
                value={customer.ma_doi_tac}
                onChangeText={text =>
                  setCustomer({...customer, ma_doi_tac: text})
                }
              />
            )}
            <EnvoiceText
              require
              title={I18n.t('addCustomer.ten_khach_hang')}
              maxLength={400}
              value={customer.ten_doi_tac}
              onChangeText={text =>
                setCustomer({...customer, ten_doi_tac: text})
              }
            />
            <EnvoiceText
              maxLength={100}
              title={I18n.t('addCustomer.nguoiMuaHang')}
              value={customer.nguoi_giao_dich}
              onChangeText={text =>
                setCustomer({...customer, nguoi_giao_dich: text})
              }
            />
            <EnvoiceText
              require
              maxLength={400}
              title={I18n.t('addCustomer.diaChi')}
              value={customer.dia_chi}
              onChangeText={text => setCustomer({...customer, dia_chi: text})}
            />
            <EnvoiceText
              title={I18n.t('addCustomer.email')}
              value={customer.email}
              onChangeText={text => setCustomer({...customer, email: text})}
            />
            <EnvoiceText
              title={I18n.t('addCustomer.phone')}
              keyboardType="numeric"
              maxLength={20}
              value={customer.so_dien_thoai}
              onChangeText={text =>
                setCustomer({...customer, so_dien_thoai: text})
              }
            />
            <EnvoiceText
              title={I18n.t('addCustomer.fax')}
              value={customer.fax}
              maxLength={20}
              onChangeText={text => setCustomer({...customer, fax: text})}
            />
            <EnvoiceMenuText
              maxLength={400}
              title={I18n.t('addCustomer.bank')}
              onChangeText={text =>
                setCustomer({...customer, ten_ngan_hang: text})
              }
              value={customer.ten_ngan_hang}
              onPress={() => DrawerAction.show(drawBank)}
            />
            <EnvoiceText
              maxLength={30}
              title={I18n.t('addCustomer.soTK')}
              value={customer.tai_khoan_ngan_hang}
              onChangeText={text =>
                setCustomer({...customer, tai_khoan_ngan_hang: text})
              }
            />
          </View>
        </ScrollView>
        <View style={styles.btnAddNew}>
          <ButtonText
            onCick={() => onUpdateCustomer(customer, props.callbackref)}
            styleTitle={{...AppStyles.boldText, color: AppColors.white}}
            title={I18n.t('common.write')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
    paddingHorizontal: AppSizes.paddingSml,
    paddingVertical: AppSizes.paddingXSml,
  },
  btnAddNew: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
export default AddCustomer;
