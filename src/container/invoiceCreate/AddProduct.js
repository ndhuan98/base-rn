import React, {useCallback} from 'react';
import {View, StyleSheet, Alert, ScrollView} from 'react-native';
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import Dlog from '../../components/Dlog';
import {API} from '@network';
import EnvoiceMenuText from '../../components/EnvoiceMenuText';
import EnvoiceText from '../../components/EnvoiceText';
import ActionSheet from '../lightbox/ActionSheet';
import {InvoiceUtil} from '@util';
import {AppColors, AppStyles, AppSizes} from '../../theme';
import {SUCCESS_CODE} from '../../ultil/NetworkHelper';
import ProductListScreen from '../lightbox/ProductListScreen';
import UnitListScreen from '../lightbox/UnitListScreen';

import ButtonText from '../../components/ButtonText';
import {I18n} from '@constant';
import {
  TongVAT5,
  TongVAT10,
  TongVAT8,
  TongThanhToan,
  TongTienVAT,
  CongTienHang,
  ChuyenMaThanhTenVAT,
  ThanhTienDongHang,
  formatNumber,
  TinhVAT,
  NumberInvoiceStarter,
} from '../../ultil/EinvoiceSupport';
import {
  ADD_DONGHANG,
  UPDATE_PRODUCT,
  UPDATE_SUM_MONEY,
  UPDATE_MONEY_STRING,
} from '../../redux/actions/InvoiceAction';
import {danhSachTinhChatHH} from './DataFake';

const AddProduct = props => {
  const isEditMode = !_.isEmpty(props.data);
  const HoaDonGTGT = useSelector(state => state.EinvoiceReducer.HoaDonGTGT);
  const isCanUpdate = HoaDonGTGT.so_hoa_don == NumberInvoiceStarter;
  const dispatch = useDispatch();
  const sizeHang = HoaDonGTGT.danhsachhang
    ? HoaDonGTGT.danhsachhang.length + 1
    : 1;
  const DrapProduct = {
    dhoadon_hangid: !_.isEmpty(props.data) ? props.data.dhoadon_hangid : '0',
    dhoadonid: !_.isEmpty(props.data) ? props.data.dhoadonid : '0',
    dhanghoaid: !_.isEmpty(props.data) ? props.data.dhanghoaid : '0',
    stt: !_.isEmpty(props.data) ? props.data.stt : sizeHang,
    ten_hang: !_.isEmpty(props.data) ? props.data.ten_hang : '',
    ma_dvt: !_.isEmpty(props.data) ? props.data.ma_dvt : '',
    so_luong: !_.isEmpty(props.data) ? props.data.so_luong : '',
    don_gia: !_.isEmpty(props.data) ? props.data.don_gia : '',
    thanh_tien: !_.isEmpty(props.data) ? props.data.thanh_tien : '0',
    vat: !_.isEmpty(props.data) ? props.data.vat : '0',
    vat_tien: !_.isEmpty(props.data) ? props.data.vat_tien : '0',
    ma_hang: !_.isEmpty(props.data) ? props.data.ma_hang : '',
    don_gia_nt: !_.isEmpty(props.data) ? props.data.don_gia_nt : '0',
    thanh_tien_nt: !_.isEmpty(props.data) ? props.data.thanh_tien_nt : '0',
    thanh_tien_sau_thue: !_.isEmpty(props.data)
      ? props.data.thanh_tien_sau_thue
      : '',
    ma_dv: !_.isEmpty(props.data) ? props.data.ma_dv : '',
    tinh_chat: !_.isEmpty(props.data)
      ? props.data.tinh_chat
      : danhSachTinhChatHH[0].value,
  };

  const [product, setProduct] = React.useState(DrapProduct);
  // Khai báo Units
  const [units, setUnits] = React.useState([]);
  // Khai báo VATs
  const [vatHHs, setVatHHs] = React.useState([]);
  const [tinhChatHH, setTinhChatHH] = React.useState(danhSachTinhChatHH[0]);
  React.useEffect(() => {
    const tinhChatHH = danhSachTinhChatHH.find(item => {
      return item.value == props.data.tinh_chat;
    });
    if (tinhChatHH) {
      setTinhChatHH(tinhChatHH);
    }
  }, [props]);

  // Khai báo param chuyền vào màn hình action sheet - danh sách tính chất hàng hoá
  // Xét lại mặc định các thông số đơn giá, số lượng, thành tiền, dvt khi thay đổi tính chất hàng hoá
  const TinhChatHHsheet = {
    title: 'Tính chất',
    typeScreen: InvoiceUtil.tinhChatHH,
    dataList: danhSachTinhChatHH,
    onSelected: item => {
      setTinhChatHH(item);
      setProduct({
        ...product,
        tinh_chat: item.value,
        so_luong: 0,
        // don_gia: '0',
        // don_gia_nt: '0',
        thanh_tien: 0,
        thanh_tien_nt: 0,
        vat_tien: 0,
      });
    },
  };

  // Khai báo param chuyền vào màn hình action sheet - danh sách thuế VAT
  const VATsheet = {
    title: 'Thuế VAT',
    typeScreen: InvoiceUtil.VAT,
    dataList: vatHHs,
    onSelected: item => {
      setProduct({
        ...product,
        vat: _.parseInt(item.ma_vat),
        vat_tien: TinhVAT(item.ma_vat, product.thanh_tien),
      });
    },
  };
  // Khai báo param chuyền vào màn hình drawer - danh sách đơn vị tính
  const unitsDrawer = {
    title: 'Danh sách đơn vị tính',
    typeScreen: InvoiceUtil.donViTinh,
    dataList: units,
    actionSelected: item => {
      setProduct({...product, ma_dvt: item.ma_dvt});
    },
  };

  // Khai báo param chiền vào màn hình - danh sách khách hàng
  const drawKhachHang = {
    title: 'Danh sách hàng hoá',
    actionSelected: item => {
      setProduct({
        ...product,
        dhanghoaid: item.dhanghoaid,
        don_gia: item.gia_xuat,
        don_gia_nt: item.gia_xuat,
        ma_dvt: item.ma_dvt,
        vat: _.parseInt(item.vat),
        ma_hang: item.ma_hang,
        ten_hang: item.ten_hang,
        so_luong: '',
        thanh_tien: '',
        vat_tien: '',
        thanh_tien_nt: '',
      });
    },
  };

  // Lấy danh sách các loại VAT trên sever
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

  const pressDone = async product => {
    console.log('pressDone ---->', product);
    // Validate thông tin hàng hoá
    if (!product.ten_hang) {
      return Alert.alert(
        I18n.t('common.notice'),
        I18n.t('addGoods.validateTenHang'),
      );
    }
    // Validate với case tính chất hàng hoá dịch vụ
    if (tinhChatHH.value == '1') {
      // Validate số lượng hàng hoá
      if (product.so_luong == 0) {
        return Alert.alert(
          I18n.t('common.notice'),
          I18n.t('addGoods.validateSoLuong'),
        );
      }
      // // Validate đơn vị tính
      if (!product.ma_dvt) {
        return Alert.alert(
          I18n.t('common.notice'),
          I18n.t('addGoods.validateDVT'),
        );
      }
    }

    // Validate đơn giá
    if (!product.don_gia) {
      return Alert.alert(
        I18n.t('common.notice'),
        I18n.t('addGoods.validateDonGia'),
      );
    }

    let newProducts = [];
    if (HoaDonGTGT.danhsachhang) {
      newProducts = _.cloneDeep(HoaDonGTGT.danhsachhang);
    }

    newProducts.push(product);
    // dispatch thêm mới đơn hàng
    dispatch(ADD_DONGHANG(newProducts));
    // dispatch cộng tiền hàng
    const tong_tien_hang = CongTienHang(newProducts);
    // dispatch tổng tiền VAT 5
    const tong_vat5 = TongVAT5(newProducts);
    // dispatch tổng VAT 10
    const tong_vat10 = TongVAT10(newProducts);
    // dispatch tổng VAT 8
    const tong_vat8 = TongVAT8(newProducts);
    // dispatch tổng thanh toán   ==  (cộng tiền hàng) + (tổng VAT 5) + (tổng VAT 10)
    const tong_thanh_toan = TongThanhToan(
      tong_tien_hang,
      tong_vat5,
      tong_vat8,
      tong_vat10,
    );
    // viết 1 hàm dispath  {
    //   tong_tien_hang,tong_vat5,tong_vat10,tong_thanh_toan
    // }
    const money = {
      tong_tien_hang: tong_tien_hang,
      tong_vat5: tong_vat5,
      tong_vat8: tong_vat8,
      tong_vat: tong_vat10,
      tong_thanh_toan: tong_thanh_toan,
    };

    await dispatch(UPDATE_SUM_MONEY(money));

    const paramRealseMoneny = {
      tongtien: tong_thanh_toan,
    };

    await API.readMoney(paramRealseMoneny).then(
      res => {
        if (res) {
          dispatch(UPDATE_MONEY_STRING(res));
        }
      },
      err => {},
    );
    // Hàm back về màn hình trước đó
    props.onCallback && props.onCallback();
  };

  // Hàm update thông tin dòng hàng
  const onUpdate = product => {
    console.log('onUpdate--->', product);
    if (!product.ten_hang) {
      return Alert.alert(
        I18n.t('common.notice'),
        I18n.t('addGoods.validateTenHang'),
      );
    }

    // Validate với case tính chất hàng hoá dịch vụ
    if (tinhChatHH.value == '1') {
      // Validate số lượng hàng hoá
      if (product.so_luong == 0) {
        return Alert.alert(
          I18n.t('common.notice'),
          I18n.t('addGoods.validateSoLuong'),
        );
      }
      // // Validate đơn vị tính
      if (!product.ma_dvt) {
        return Alert.alert(
          I18n.t('common.notice'),
          I18n.t('addGoods.validateDVT'),
        );
      }
    }

    // Validate đơn giá
    if (!product.don_gia) {
      return Alert.alert(
        I18n.t('common.notice'),
        I18n.t('addGoods.validateDonGia'),
      );
    }
    dispatch(UPDATE_PRODUCT(product));
    props.onCallback && props.onCallback();
  };

  const donGia =
    formatNumber(product.don_gia) == 0 ? '' : formatNumber(product.don_gia);

  const onGetChangeDonGia = tinhChat => {
    switch (tinhChat) {
      case danhSachTinhChatHH[0].value:
        return false;
      case danhSachTinhChatHH[1].value:
        return false;
      case danhSachTinhChatHH[2].value:
        return false;
      case danhSachTinhChatHH[3].value:
        return true;
      default:
        return false;
    }
  };

  const onGetChangeThanhTien = tinhChat => {
    switch (tinhChat) {
      case danhSachTinhChatHH[0].value:
        return false;
      case danhSachTinhChatHH[1].value:
        return true;
      case danhSachTinhChatHH[2].value:
        return false;
      case danhSachTinhChatHH[3].value:
        return true;
      default:
        return false;
    }
  };

  const isHangKhuyenMai = product.tinh_chat == '2';

  const thanhTien = isHangKhuyenMai
    ? 0
    : ThanhTienDongHang(product.so_luong, product.don_gia);

  const onUpdateMoney = () => {
    setProduct({
      ...product,
      thanh_tien: onGetThanhTien(),
      thanh_tien_nt: onGetThanhTien(),
      vat_tien: onGetVATTien(),
    });
  };

  onGetVATTien = () => {
    let vatTien = 0;
    switch (tinhChatHH.value) {
      case danhSachTinhChatHH[2].value:
        return (vatTien = TinhVAT(product.vat, thanhTien) * -1);
      default:
        return (vatTien = TinhVAT(product.vat, thanhTien));
    }
  };

  onGetThanhTien = () => {
    let tongTien = 0;
    switch (tinhChatHH.value) {
      case danhSachTinhChatHH[0].value:
        return (tongTien = ThanhTienDongHang(
          product.so_luong,
          product.don_gia,
        ));
      case danhSachTinhChatHH[1].value:
        return (tongTien = 0);
      case danhSachTinhChatHH[2].value:
        return (tongTien =
          ThanhTienDongHang(product.so_luong, product.don_gia) * -1);
      case danhSachTinhChatHH[3].value:
        return (tongTien = 0);
      default:
        return tongTien;
    }
  };

  return (
    <View
      style={{
        ...AppStyles.flex1,
        backgroundColor: AppColors.background,
        paddingHorizontal: AppSizes.paddingSml,
      }}>
      <ScrollView showsVerticalScrollIndicator={false} style={AppStyles.flex1}>
        <View style={styles.container}>
          <View style={styles.content}>
            <EnvoiceMenuText
              title={'Mã hàng hóa'}
              value={product.ma_hang}
              maxLength={50}
              placeholder={''}
              onChangeText={text =>
                setProduct({
                  ...product,
                  ma_hang: text,
                })
              }
              onPress={() => ProductListScreen.show(drawKhachHang)}
            />
            <EnvoiceText
              require
              maxLength={500}
              onChangeText={text => setProduct({...product, ten_hang: text})}
              value={product.ten_hang}
              title={'Tên hàng hóa, dịch vụ'}
            />

            <EnvoiceText
              onPress={() => ActionSheet.show(TinhChatHHsheet)}
              require
              drop
              title={'Tính chất'}
              value={tinhChatHH.text}
            />
            <EnvoiceMenuText
              onPress={() => UnitListScreen.show(unitsDrawer)}
              title={'Đơn vị tính'}
              maxLength={50}
              disabled={onGetChangeDonGia(tinhChatHH.value)}
              require
              onChangeText={text =>
                setProduct({
                  ...product,
                  ma_dvt: text,
                })
              }
              value={product.ma_dvt}
            />
            <View style={styles.horizontalRow}>
              <View style={AppStyles.flex1}>
                <EnvoiceText
                  keyboardType={'numeric'}
                  onChangeText={text =>
                    setProduct({...product, so_luong: text})
                  }
                  title={'Số lượng hàng hóa'}
                  disabled={onGetChangeDonGia(tinhChatHH.value)}
                  require
                  placeholder={'0'}
                  value={product.so_luong}
                  onEndEditing={() => onUpdateMoney()}
                  onSubmitEditing={() => onUpdateMoney()}
                />
              </View>
              <View style={styles.distance5} />
              <View style={AppStyles.flex1}>
                <EnvoiceText
                  require
                  onChangeText={text =>
                    setProduct({...product, don_gia: text, don_gia_nt: text})
                  }
                  placeholder={'0'}
                  title={'Đơn giá'}
                  disabled={onGetChangeDonGia(tinhChatHH.value)}
                  keyboardType={'numeric'}
                  value={donGia}
                  onEndEditing={() => onUpdateMoney()}
                  onSubmitEditing={() => onUpdateMoney()}
                />
              </View>
            </View>
          </View>

          <EnvoiceText
            require
            disabled={onGetChangeThanhTien(tinhChatHH.value)}
            title={'Thành tiền'}
            value={formatNumber(product.thanh_tien)}
          />
          <EnvoiceText disabled title={'Chiết khấu'} value={''} />

          <EnvoiceText
            onPress={() => ActionSheet.show(VATsheet)}
            require
            disabled={onGetChangeDonGia(tinhChatHH.value)}
            drop
            title={'% VAT'}
            value={ChuyenMaThanhTenVAT(_.toString(product.vat))}
          />
          <EnvoiceText
            disabled
            title={'Thuế VAT'}
            value={formatNumber(product.vat_tien)}
          />
        </View>
      </ScrollView>
      <View style={styles.btnAddNew}>
        {isEditMode && (
          <ButtonText
            styleTitle={{...AppStyles.boldText, color: AppColors.white}}
            disabled={!isCanUpdate}
            onCick={() => onUpdate(product)}
            title={I18n.t('common.write')}
          />
        )}

        {!isEditMode && (
          <ButtonText
            styleTitle={{...AppStyles.boldText, color: AppColors.white}}
            disabled={!isCanUpdate}
            onCick={() => pressDone(product)}
            title={I18n.t('common.write')}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: AppSizes.margin,
  },
  btnAddNew: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 0,
    paddingVertical: AppSizes.paddingXSml,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: AppSizes.paddingSml,
  },
  iconAddNew: {width: 24, height: 24, marginRight: AppSizes.marginXSml},
  btnDone: {
    backgroundColor: '#EDF3ED',
    borderWidth: 1,
    borderRadius: AppSizes.borderRadius,
    borderColor: AppColors.green,
    padding: AppSizes.paddingXSml,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconDone: {width: 21, height: 21, marginRight: AppSizes.marginXSml},
  horizontalRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  distance5: {
    width: '5%',
  },
  titleRow: {...AppStyles.boldText, color: AppColors.black},
  containerDetail: {width: '100%', padding: AppSizes.paddingSml},
});

export default React.memo(AddProduct);
