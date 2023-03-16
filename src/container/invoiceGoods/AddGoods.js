import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
  Keyboard,
} from 'react-native';
import {AppColors, AppStyles, AppSizes} from '../../theme';
import EnvoiceMenuText from '../../components/EnvoiceMenuText';
import EnvoiceText from '../../components/EnvoiceText';
import ButtonText from '../../components/ButtonText';
import AppHeader from '../../components/AppHeader';
import Back from '../../image/svg/Back.svg';
import {I18n} from '@constant';
import PlusFull from '../../image/svg/PlusFull';
import {Actions} from 'react-native-router-flux';
import StatusBarTSD from '../../components/StatusBarTSD';
import UnitListScreen from '../lightbox/UnitListScreen';
import DrawerLoaiHang from '../lightbox/DrawerLoaiHang';
import ActionSheet from '../lightbox/ActionSheet';
import {API} from '@network';
import _ from 'lodash';
import {InvoiceUtil} from '@util';
import {SUCCESS_CODE} from '../../ultil/NetworkHelper';
import {formatNumber, ChuyenMaThanhTenVAT} from '../../ultil/EinvoiceSupport';
import {useKeyboard} from '@react-native-community/hooks';
import {animate} from '../../ultil/AnimateHelper';
import { danhSachTinhChatHH } from '../invoiceCreate/DataFake';

const Mode = {newMode: '1', editMode: '2'};

const {height, width} = Dimensions.get('window');

const onBackScreen = async () => {
  return Actions.pop();
};
// add animation when keyboard did show
const _keyboardDidShow = () => {
  animate();
};

// add animation when keyboard did hide
const _keyboardDidHide = () => {
  animate();
};

const drawerGoods = {
  data: 1,
  title: I18n.t('addGoods.title'),
  titleText: I18n.t('addGoods.loaiHang'),
  TitleInput: I18n.t('addGoods.ghiChu'),
};
const drawerDvTinh = {
  data: 2,
  title: I18n.t('addGoods.drawerDvTinh'),
  titleText: I18n.t('addGoods.maDV'),
  TitleInput: I18n.t('addGoods.tenDV'),
};
const onUpdateGoods = (goods, callbackref) => {
  if (!goods.ma_hang) {
    return Alert.alert(
      I18n.t('common.notice'),
      I18n.t('ScreenKhachHang.ma_hang'),
    );
  }
  if (!goods.ten_hang) {
    return Alert.alert(
      I18n.t('common.notice'),
      I18n.t('ScreenKhachHang.ten_hang'),
    );
  }

  const params = {
    idhanghoa: goods.idhanghoa,
    ma_hang: goods.ma_hang,
    ten_hang: goods.ten_hang,
    don_vi_tinh: goods.don_vi_tinh,
    gia_xuat: goods.gia_xuat,
    gia_nhap: goods.gia_nhap,
    ghi_chu: goods.ghi_chu,
    ma_vat: goods.ma_vat,
    ten_vat: goods.ten_vat,
    idloaihang: goods.id_loai_hang,
    loai_hang: goods.loai_hang,
  };
  API.saveHangHoa(params).then(
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
      Dlog('saveHoaDonDienTu', err);
    },
  );
};

const AddGoods = props => {
  const [modeScreen, setModeScreen] = useState(Mode.newMode);
  React.useEffect(() => {
    if (props.detailGoods) {
      setModeScreen(Mode.editMode);
      const data = {
        idhanghoa: props.detailGoods.idhanghoa,
        ma_hang: props.detailGoods.ma_hang,
        ten_hang: props.detailGoods.ten_hang,
        loai_hang: props.detailGoods.loai_hang,
        id_loai_hang: props.detailGoods.idloaihang,
        don_vi_tinh: props.detailGoods.don_vi_tinh,
        ma_vat: props.detailGoods.ma_vat,
        gia_nhap: props.detailGoods.gia_nhap,
        gia_xuat: props.detailGoods.gia_xuat,
        ghi_chu: props.detailGoods.ghi_chu,
        ten_vat: props.detailGoods.ten_vat,
      };
      setGoods(data);
    }
  }, []);

  const [goods, setGoods] = useState({
    ma_hang: '',
    ten_hang: '',
    don_vi_tinh: '',
    ma_vat: 0,
    loai_hang: '',
    id_loai_hang: '',
    gia_nhap: '',
    gia_xuat: '',
    ghi_chu: '',
    ten_vat: '',
    idhanghoa: 0,
  });

  React.useEffect(() => {
    API.PercentVAT().then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          setVatHHs(res.data.data);
        }
      },
      err => {
        Dlog('PercentVAT', err);
      },
    );
  }, []);

  const [units, setUnits] = React.useState([]);
  const [loaiHang, setLoaiHang] = React.useState([]);
  const [vatHHs, setVatHHs] = React.useState([]);
  const [tinhChatHH, setTinhChatHH] = React.useState(danhSachTinhChatHH[0]);

  const unitsDrawer = {
    title: 'Danh sách đơn vị tính',
    dataList: units,
    actionSelected: item => {
      setGoods({...goods, don_vi_tinh: item.ma_dvt});
    },
  };

  const drawerLoaiHang = {
    title: 'Danh sách loại hàng',
    dataList: loaiHang,
    actionSelected: item => {
      setGoods({
        ...goods,
        loai_hang: item.ten_loai_hang,
        id_loai_hang: item.idloaihang,
      });
    },
  };
  const VATsheet = {
    title: 'Thuế suất',
    dataList: vatHHs,
    typeScreen: InvoiceUtil.VAT,
    onSelected: item => {
      setGoods({
        ...goods,
        ten_vat: item.phan_tram_vat,
        ma_vat: _.parseInt(item.ma_vat),
      });
    },
  };

  const TinhChatHHsheet = {
    title: 'Tính chất',
    typeScreen: InvoiceUtil.tinhChatHH,
    dataList: danhSachTinhChatHH,
    onSelected: item => {
      setTinhChatHH(item);
      setGoods({
        ...goods,
        tinh_chat: item.value,
      });
    },
  };


  const giaNhap =
    formatNumber(goods.gia_nhap) == '0' ? '' : formatNumber(goods.gia_nhap);
  const giaXuat =
    formatNumber(goods.gia_xuat) == '0' ? '' : formatNumber(goods.gia_xuat);

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
              ? I18n.t('addGoods.title')
              : I18n.t('addGoods.titleTow')
          }
          RightText={I18n.t('addGoods.ghi')}
          onPressRight={() => onUpdateGoods(goods, props.callbackref)}
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
            {modeScreen == Mode.newMode ? (
              <EnvoiceText
                require
                title={I18n.t('addGoods.maHangHoa')}
                onChangeText={text => setGoods({...goods, ma_hang: text})}
                value={goods.ma_hang}
              />
            ) : (
              <EnvoiceText
                require
                disabled
                title={I18n.t('addGoods.maHangHoa')}
                onChangeText={text => setGoods({...goods, ma_hang: text})}
                value={goods.ma_hang}
              />
            )}
            <EnvoiceText
              require
              title={I18n.t('addGoods.ten')}
              onChangeText={text => setGoods({...goods, ten_hang: text})}
              value={goods.ten_hang}
            />

            {/* Thêm mới tính chất */}
            <EnvoiceText
              onPress={() => ActionSheet.show(TinhChatHHsheet)}
              require
              drop
              title={'Tính chất'}
              value={tinhChatHH.text}
            />

            
            <View style={styles.row}>
              <View style={styles.menuText}>
                <EnvoiceMenuText
                  title={I18n.t('addGoods.loaiHang')}
                  value={goods.loai_hang}
                  // disabled
                  onChangeText={text => setGoods({...goods, loai_hang: text})}
                  onPress={() => DrawerLoaiHang.show(drawerLoaiHang)}
                />
              </View>
              <TouchableOpacity
                style={styles.box}
                onPress={() => Actions.drawerGoods(drawerGoods)}>
                <PlusFull style={styles.icons} fill={AppColors.white} />
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <View style={styles.menuText}>
                <EnvoiceMenuText
                  title={I18n.t('addGoods.donVT')}
                  value={goods.don_vi_tinh}
                  // disabled
                  onChangeText={text => setGoods({...goods, don_vi_tinh: text})}
                  onPress={() => UnitListScreen.show(unitsDrawer)}
                />
              </View>
              <TouchableOpacity
                style={styles.box}
                onPress={() => Actions.drawerGoods(drawerDvTinh)}>
                <PlusFull style={styles.icons} fill={AppColors.white} />
              </TouchableOpacity>
            </View>
            <EnvoiceText
              drop
              require
              title={I18n.t('addGoods.thue')}
              value={ChuyenMaThanhTenVAT(_.toString(goods.ma_vat))}
              onPress={() => ActionSheet.show(VATsheet)}
            />
            <EnvoiceText
              keyboardType="numeric"
              title={I18n.t('addGoods.giaNhap')}
              onChangeText={text => setGoods({...goods, gia_nhap: text})}
              value={giaNhap}
            />
            <EnvoiceText
              keyboardType="numeric"
              title={I18n.t('addGoods.giaXuat')}
              value={giaXuat}
              onChangeText={text => setGoods({...goods, gia_xuat: text})}
            />
            <EnvoiceText
              title={I18n.t('addGoods.ghiChu')}
              onChangeText={text => setGoods({...goods, ghi_chu: text})}
              value={goods.ghi_chu}
            />
          </View>
        </ScrollView>
        <View style={styles.btnAddNew}>
          <ButtonText
            onCick={() => onUpdateGoods(goods, props.callbackref)}
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
    marginVertical: AppSizes.marginSml,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuText: {
    width: '83%',
  },
  box: {
    width: 50,
    backgroundColor: AppColors.darkblue,
    marginTop: 21,
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    width: 25,
    height: 25,
  },
});
export default AddGoods;
