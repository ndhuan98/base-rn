import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import { AppColors, AppStyles, AppSizes } from '../../theme';
import { Actions } from 'react-native-router-flux';
import StatusBarTSD from '../../components/StatusBarTSD';
import { I18n } from '@constant';
import AppHeader from '../../components/AppHeader';
import EditLine from '../../image/svg/EditLine.svg';
import ActivePlus from '../../image/svg/soildPlus.svg';

import EditLineSoild from '../../image/svg/EditLineSoild.svg';
import FileLine from '../../image/svg/FileLine.svg';
import FileSoild from '../../image/svg/FileSoild.svg';
import ProducSoild from '../../image/svg/ProducSoild.svg';
import ProductLine from '../../image/svg/ProductLine.svg';
import Money from '../../image/svg/Money.svg';
import Account from '../../image/svg/Profile.svg';
import ActiveAccount from '../../image/svg/soildProfile.svg';
import Cancel from '../../image/svg/Cancel.svg';
import Back from '../../image/svg/Back.svg';
import { SUCCESS_CODE } from '../../ultil/NetworkHelper';
import DropUpSoild from '../../image/svg/DropUpSoild.svg';
import ReadingMoney from '../../image/svg/ReadingMoney.svg';

import DropDownLine from '../../image/svg/DropDownLine.svg';
import EnvoiceMenuText from '../../components/EnvoiceMenuText';
import DrawerAction from '../lightbox/DrawerAction';
import EnvoiceText from '../../components/EnvoiceText';
import ActionSheet from '../lightbox/ActionSheet';
import EnvoiceInputMenu from '../../components/EnvoiceInputMenu';
import SendInvoiceMail from '../lightbox/SendInvoiceMail';
import PreviewActionSheet from '../lightbox/PreviewActionSheet';
import { animate } from '../../ultil/AnimateHelper';
import _ from 'lodash';
import { danhSachNganHang } from './DataFake';
import { TextInput } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('window');
import { useKeyboard } from '@react-native-community/hooks';
import ButtonText from '../../components/ButtonText';
import { API } from '@network';
import Dlog from '../../components/Dlog';
import { useDispatch, useSelector } from 'react-redux';
import {
  GET_DATA_EINVOICE,
  CHANGE_MAUSO_HD,
  CHANGE_HinhThucTinhToan,
  UPDATE_BANK_NAME,
  UPDATE_BANK_STK,
  UPDATE_CUSTOMER_INFO,
  UPDATE_CUSTOMER_NAME,
  UPDATE_CUSTOMER_NAME_DV,
  UPDATE_CUSTOMER_SDT,
  UPDATE_CUSTOMER_EMAIL,
  UPDATE_CUSTOMER_MST,
  UPDATE_CUSTOMER_ADDRESS,
  ADD_DONGHANG,
  CHANGE_DONG_TIEN,
  UPDATE_SUM_MONEY,
  UPDATE_NOTE_INVOICE,
  UPDATE_MONEY_STRING,
  DELETE_PRODUCT,
  CLEAR_EINVOICE,
  UPDATE_BEN_MUA_MA,
  UPDATE_PRODUCT,
  UPDATE_TRIETKHAU_TONG,
} from '../../redux/actions/InvoiceAction';
import { InvoiceUtil, HinhThucTTHelper } from '@util';
import {
  TongVAT5,
  TongVAT10,
  TongThanhToan,
  TongTienVAT,
  CongTienHang,
  formatNumber,
  TinhVAT,
  GetActionName,
  InvoiceActions,
  InvoiceNameStatus,
  NumberInvoiceStarter,
} from '../../ultil/EinvoiceSupport';
import ButtonThree from '../../components/ButtonThree';
import CustomerList from '../lightbox/CustomerList';
import GroupButton from '../../components/GroupButton';
import DialogLoading from '../../container/lightbox/DialogLoading';
import { format_mst, validateEmail, validate_phone } from '@util/Validater';

const RowReadingMoney = props => {
  return (
    <View style={[styles.containerRow, { backgroundColor: AppColors.white }]}>
      <ReadingMoney style={styles.leftIcon} fill={AppColors.blue} />
      <View styles={AppStyles.flex1}>
        <Text
          style={{
            ...AppStyles.boldText,
            color: AppColors.black,
          }}>
          {props?.title}
        </Text>
        <Text style={{ ...AppStyles.baseText, color: AppColors.black }}>
          {props?.subOne}
        </Text>
      </View>
    </View>
  );
};

const RowInforEnvoice = props => {
  const selected = props.selected;
  const IconLeft = selected ? props.IconActive : props.IconLine;
  const IconRight = selected ? DropUpSoild : DropDownLine;
  const numberBorderTop = props.hasBorderTop ? 0.5 : 0;
  return (
    <TouchableOpacity
      onPress={() => props.onPressRow && props.onPressRow()}
      style={{
        ...styles.containerRow,
        borderTopWidth: numberBorderTop,
        backgroundColor: selected ? AppColors.backgroundGary : AppColors.white,
      }}>
      <IconLeft style={styles.leftIcon} fill={AppColors.blue} />
      <View style={AppStyles.flex1}>
        <View style={styles.flexRow}>
          <Text
            style={{
              ...AppStyles.boldText,
              color: selected ? AppColors.blue : AppColors.black,
            }}>
            {props.title}
          </Text>
          <View style={AppStyles.flex1} />
          <IconRight style={styles.rightIcon} fill={AppColors.blue} />
        </View>
        <View style={styles.flexRow}>
          <Text style={{ ...AppStyles.baseText, color: AppColors.black }}>
            {props.subOne}
          </Text>
          <Text style={{ ...AppStyles.hintText }}>{props.valueOne}</Text>
        </View>
        {props?.subTwo && (
          <View style={styles.flexRow}>
            <Text style={{ ...AppStyles.baseText, color: AppColors.black }}>
              {props.subTwo}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                ...AppStyles.hintText,
                flex: 1,
                paddingRight: AppSizes.paddingSml,
                color: props.colorValueTwo
                  ? props.colorValueTwo
                  : AppColors.textSecondary,
              }}>
              {props.valueTwo}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

// render chi tiết thông tin hoá đơn
const DetailBodyEnvoiceInfor = () => {
  // Danh sách các mẫu số hoá đơn
  const [mauSoHDs, setMauSoHDs] = React.useState([]);
  // Danh sách các đồng tiền
  const [currencys, setCurrencys] = React.useState({});
  // Danh sách hình thức thanh toán
  const [hinhThucTTs, setHinhThucTTs] = React.useState([]);

  // Chuyển hình thức mã hình thức thanh toán => tên hình thức thanh toán
  const getNameHTTT = React.useCallback(
    id => {
      const data = hinhThucTTs.find(item => {
        return item?.ma_hinh_thu_thanh_toan == id;
      });
      return data?.ten_hinh_thu_thanh_toan;
    },
    [hinhThucTTs],
  );

  // Call API lấy danh sách hình thứ thanh toán
  React.useEffect(() => {
    API.Payment().then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          setHinhThucTTs(res.data.data);
        }
      },
      err => {
        Dlog('Payment', err);
      },
    );
  }, []);

  // Call API  lấy danh sách mẫu số HD
  React.useEffect(() => {
    API.FromSerialByUser().then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          setMauSoHDs(res.data.data);
        }
      },
      err => {
        Dlog('error FromSerialByUser ', err);
      },
    );
  }, []);

  // Calll API lấy danh sách đồng tiền
  React.useEffect(() => {
    API.Currency().then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          setCurrencys(res.data.data);
          // setCurrencySelected(res.data.data[0]);
        }
      },
      err => {
        Dlog('errorCurrency ', err);
      },
    );
  }, []);
  // dphathanh_khoitaoid: 70002
  // ky_hieu: "AA/20E"
  // ma_loai_hoa_don: "01"
  // mau_so: "01GTKT0/001"
  // mau_so_ky_hieu: "01GTKT0/001-AA/20E"

  //Map tên thuộc tính danh sách mẫu hoá đơn tương ứng với thuộc tính trên store
  const mapMauHoaDonToStore = item => {
    const mauHoaDon = {
      ky_hieu: item.ky_hieu,
      ma_loai_hoa_don: item.ma_loai_hoa_don,
      mau_so: item.mau_so,
    };

    dispatch(CHANGE_MAUSO_HD(mauHoaDon));
  };
  // Param truyền vào màn hình DrawerAction -  (Mẫu số hoá đơn)
  const drawMauSoHD = {
    title: 'Mẫu số hoá đơn',
    typeScreen: InvoiceUtil.mauSoHD,
    dataList: mauSoHDs,
    actionSelected: item => {
      mapMauHoaDonToStore(item);
    },
  };

  // Param truyền vào màn hình ActionSheet - (Danh sách đồng tiền)
  const currencySheet = {
    title: 'Đồng tiền',
    typeScreen: InvoiceUtil.dongTien,
    dataList: currencys,
    onSelected: item => {
      dispatch(CHANGE_DONG_TIEN(item));
    },
  };

  // Param truyền vào màn hình ActionSheet - (Hình thức thanh toán)
  const hinhThucThanhToanSheet = {
    title: 'Hình thức thanh toán',
    typeScreen: InvoiceUtil.hinhThucThanhToan,
    dataList: hinhThucTTs,
    onSelected: item => {
      dispatch(CHANGE_HinhThucTinhToan(item.ma_hinh_thu_thanh_toan));
    },
  };
  // Redux
  const dispatch = useDispatch();
  const HoaDonGTGT = useSelector(state => state.EinvoiceReducer.HoaDonGTGT);
  const colorNumber =
    HoaDonGTGT.so_hoa_don == NumberInvoiceStarter
      ? AppColors.black
      : AppColors.red;
  return (
    <View style={styles.containerDetail}>
      <Text style={styles.titleRow}>{'Thông tin hóa đơn'}</Text>
      <EnvoiceText
        disabled
        require
        style={{ color: AppColors.red }}
        title={'Ngày hóa đơn'}
        value={HoaDonGTGT.ngay_tao}
      />
      <EnvoiceMenuText
        require
        title={'Mẫu số hóa đơn'}
        value={HoaDonGTGT.mau_so}
        onPress={() => DrawerAction.show(drawMauSoHD)}
      />
      <View style={styles.containerNumber}>
        <View style={styles.wrapNumber}>
          <Text style={{ ...AppStyles.baseText, color: AppColors.black }}>
            {'Ký hiệu: '}
          </Text>
          <Text style={{ ...AppStyles.secondaryText, color: AppColors.black }}>
            {HoaDonGTGT.ky_hieu}
          </Text>
        </View>
        <View style={styles.lineVertical} />
        <View style={styles.wrapNumber}>
          <Text style={{ ...AppStyles.baseText, color: AppColors.black }}>
            {'Số HĐ: '}
          </Text>
          <Text style={{ ...AppStyles.secondaryText, color: colorNumber }}>
            {HoaDonGTGT.so_hoa_don}
          </Text>
        </View>
      </View>
      <View style={styles.horizontalRow}>
        <View style={AppStyles.flex1}>
          <EnvoiceText
            title={'Đồng tiền'}
            value={HoaDonGTGT.ma_nt}
            drop
            onPress={() => {
              ActionSheet.show(currencySheet);
            }}
          />
        </View>
        <View style={styles.distance5} />
        <View style={AppStyles.flex1}>
          <EnvoiceText title={'Tỷ giá'} value={HoaDonGTGT.ty_gia} disabled />
        </View>
      </View>

      <EnvoiceText
        require
        title={'Hình thức thanh toán'}
        value={getNameHTTT(HoaDonGTGT.ma_hinhthuctt)}
        drop
        onPress={() => {
          ActionSheet.show(hinhThucThanhToanSheet);
        }}
      />
    </View>
  );
};

// Render thông tin người mua hàng
const DetailInforCustomer = () => {
  // Lấy thông tin hoá đơn GTGT từ store
  const HoaDonGTGT = useSelector(state => state.EinvoiceReducer.HoaDonGTGT);
  const Customer = {
    dia_chi: HoaDonGTGT.ben_mua_dia_chi,
    dien_thoai: HoaDonGTGT.ben_mua_dien_thoai,
    dien_thoai_lien_he: HoaDonGTGT.ben_mua_dien_thoai,
    email: HoaDonGTGT.ben_mua_email,
    fax: HoaDonGTGT.ben_mua_fax,
    ghi_chu: HoaDonGTGT.ben_mua_ghi_chu,
    is_hienthi: HoaDonGTGT.is_hienthi,
    ma_dv: HoaDonGTGT.ben_mua_ma,
    ma_giao_dich: HoaDonGTGT.ben_mua_ma_giao_dich,
    ma_so_thue: HoaDonGTGT.ben_mua_ma_dv,
    nam_sinh: HoaDonGTGT.ben_mua_nam_sinh,
    ngan_hang_tai_khoan1: HoaDonGTGT.ben_mua_ngan_hang_tai_khoan,
    ngan_hang_ten1: HoaDonGTGT.ben_mua_ngan_hang_ten,
    nguoi_giao_dich: HoaDonGTGT.ben_mua_ho_ten,
    sdoitacid: HoaDonGTGT.sdoitacid,
    ten_dv: HoaDonGTGT.ben_mua_ten_dv,
  };
  const [benMua, setBenMua] = React.useState(Customer);

  const dispatch = useDispatch();
  // hàm khai báo config danh sách ngân hàng
  const drawBank = {
    title: 'Danh sách ngân hàng',
    dataList: danhSachNganHang,
    typeScreen: InvoiceUtil.danhSachNganHang,

    actionSelected: item => {
      setBenMua({ ...benMua, ngan_hang_ten1: item.value });
      dispatch(UPDATE_BANK_NAME(item.value));
    },
  };

  // hàm config dữ liệu đầu vào màn hình danh sách khách hàng
  const drawerKhachHang = {
    title: 'Danh sách khách hàng',
    actionSelected: item => {
      dispatch(UPDATE_CUSTOMER_INFO(item));
      setBenMua(item);
    },
  };
  const [loadingTax, setLoadingTax] = React.useState(false);
  const getInfoTax = React.useCallback(() => {
    if (!benMua.ma_so_thue) {
      return Alert.alert(
        I18n.t('common.notice'),
        I18n.t('createInvoiceScreen.mstNotBeEmpty'),
      );
    }

    if (!format_mst(benMua.ma_so_thue)) {
      return Alert.alert(
        I18n.t('common.notice'),
        I18n.t('createInvoiceScreen.formatFail'),
      );
    }
    setLoadingTax(true);
    DialogLoading.show();
    const params = {
      mst: benMua.ma_so_thue,
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
          // package data and push to redux
          const data = {
            ma_so_thue: res.data.data.maSoThue,
            ten_dv: res.data.data.tenChinhThuc,
            email: res.data.data.email,
            dia_chi: diaChiSub,
            dien_thoai: res.data.data.dtGiaoDich,
            nguoi_giao_dich: res.data.data.chuDoanhNghiep,
          };
          // display in from
          setBenMua({
            ...benMua,
            ma_so_thue: res.data.data.maSoThue,
            ten_dv: res.data.data.tenChinhThuc,
            email: res.data.data.email,
            dia_chi: diaChiSub,
            dien_thoai: res.data.data.dtGiaoDich,
            nguoi_giao_dich: res.data.data.chuDoanhNghiep,
          });
          // push data to redux
          dispatch(UPDATE_CUSTOMER_INFO(data));
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
  return (
    <View style={styles.containerDetail}>
      <Text style={styles.titleRow}>{'Thông tin người mua hàng'}</Text>
      <EnvoiceMenuText
        onChangeText={text => setBenMua({ ...benMua, ma_dv: text })}
        onPress={() => CustomerList.show(drawerKhachHang)}
        title={'Mã đơn vị'}
        maxLength={50}
        onEndEditing={() => dispatch(UPDATE_BEN_MUA_MA(benMua.ma_dv))}
        value={benMua.ma_dv}
      />

      <EnvoiceInputMenu
        isLoading={loadingTax}
        onClickRight={getInfoTax}
        title={'Mã số thuế'}
        titleRight={'Lấy thông tin'}
        value={benMua.ma_so_thue}
        onChangeText={text => setBenMua({ ...benMua, ma_so_thue: text })}
        onEndEditing={() => dispatch(UPDATE_CUSTOMER_MST(benMua.ma_so_thue))}
        onSubmitEditing={() => dispatch(UPDATE_CUSTOMER_MST(benMua.ma_so_thue))}
      />
      <EnvoiceText
        require
        title={'Tên đơn vị'}
        maxLength={400}
        onChangeText={text => setBenMua({ ...benMua, ten_dv: text })}
        onEndEditing={() => dispatch(UPDATE_CUSTOMER_NAME_DV(benMua.ten_dv))}
        onSubmitEditing={() => dispatch(UPDATE_CUSTOMER_NAME_DV(benMua.ten_dv))}
        value={benMua.ten_dv}
      />

      {/* Dia chi */}

      <EnvoiceText
        require
        title={'Địa chỉ'}
        maxLength={400}
        value={benMua.dia_chi}
        onChangeText={text => setBenMua({ ...benMua, dia_chi: text })}
        onEndEditing={() => dispatch(UPDATE_CUSTOMER_ADDRESS(benMua.dia_chi))}
        onSubmitEditing={() =>
          dispatch(UPDATE_CUSTOMER_ADDRESS(benMua.dia_chi))
        }
      />

      <EnvoiceText
        require
        title={'Người mua hàng'}
        maxLength={100}
        value={benMua.nguoi_giao_dich}
        onChangeText={text => {
          setBenMua({ ...benMua, nguoi_giao_dich: text });
        }}
        onSubmitEditing={() => {
          dispatch(UPDATE_CUSTOMER_NAME(benMua.nguoi_giao_dich));
        }}
        onEndEditing={() =>
          dispatch(UPDATE_CUSTOMER_NAME(benMua.nguoi_giao_dich))
        }
      />
      <EnvoiceText
        title={'Email'}
        value={benMua.email}
        onChangeText={text => setBenMua({ ...benMua, email: text })}
        onEndEditing={() => dispatch(UPDATE_CUSTOMER_EMAIL(benMua.email))}
        onSubmitEditing={() => dispatch(UPDATE_CUSTOMER_EMAIL(benMua.email))}
      />
      <EnvoiceText
        title={'Điện thoại'}
        maxLength={20}
        value={benMua.dien_thoai}
        keyboardType="numeric"
        onChangeText={text => setBenMua({ ...benMua, dien_thoai: text })}
        onEndEditing={() => dispatch(UPDATE_CUSTOMER_SDT(benMua.dien_thoai))}
        onSubmitEditing={() => dispatch(UPDATE_CUSTOMER_SDT(benMua.dien_thoai))}
      />
      <EnvoiceText
        maxLength={30}
        title={'Số tài khoản'}
        onChangeText={text => {
          setBenMua({ ...benMua, ngan_hang_tai_khoan1: text });
        }}
        onSubmitEditing={() =>
          dispatch(UPDATE_BANK_STK(benMua.ngan_hang_tai_khoan1))
        }
        onEndEditing={() =>
          dispatch(UPDATE_BANK_STK(benMua.ngan_hang_tai_khoan1))
        }
        value={benMua.ngan_hang_tai_khoan1}
      />
      <EnvoiceMenuText
        maxLength={400}
        title={'Ngân hàng'}
        onChangeText={text => setBenMua({ ...benMua, ngan_hang_ten1: text })}
        value={benMua.ngan_hang_ten1}
        onEndEditing={() => dispatch(UPDATE_BANK_NAME(benMua.ngan_hang_ten1))}
        onPress={() => DrawerAction.show(drawBank)}
      />
    </View>
  );
};

// Render chi tiết chiết khấu
const DetailBonus = () => {
  const HoaDonGTGT = useSelector(state => state.EinvoiceReducer.HoaDonGTGT);
  return (
    <View style={styles.containerDetail}>
      <View style={styles.horizontalRow}>
        <View style={AppStyles.flex1}>
          <EnvoiceText title={'Phần trăm chiết khấu'} value={''} />
        </View>
        <View style={styles.distance5} />
        <View style={AppStyles.flex1}>
          <EnvoiceText
            title={'Tiền chiết khấu'}
            value={HoaDonGTGT.tong_chiet_khau}
            disabled
          />
        </View>
      </View>
    </View>
  );
};

const ToMoney = props => {
  return (
    <View style={{ width: '100%' }}>
      <Text style={{ ...AppStyles.boldText, color: AppColors.black }}>
        {'Thanh toán'}
      </Text>
      <Text style={styles.wrapTongTien}>{formatNumber(props.money) || 0}</Text>
    </View>
  );
};

// render Chi tiết tổng tiền
// params={
//  vat5%:'',
//  vat10%:'',
//  tienNguyenTe:''
//  tienHang:''
// }

const DetailSumMoney = () => {
  const HoaDonGTGT = useSelector(state => state.EinvoiceReducer.HoaDonGTGT);
  const dispatch = useDispatch();
  const [bonus, setBonus] = React.useState(HoaDonGTGT.chiet_khau);

  const tong_tien_hang = HoaDonGTGT.tong_tien_hang;
  const danhSachHangHoa = HoaDonGTGT.danhsachhang;
  let isCanAddSumBonus = false;
  if (!_.isEmpty(danhSachHangHoa)) {
    const commonVat = danhSachHangHoa[0].vat;
    isCanAddSumBonus = _.every(danhSachHangHoa, ['vat', commonVat]);
  }
  const TongVat5 = HoaDonGTGT.tong_vat5;
  const TongVat10 = HoaDonGTGT.tong_vat;
  const TongVat8 = HoaDonGTGT.tong_vat8;

  React.useEffect(() => {
    if (bonus) {
      updateBonusToStore();
    }
  }, []);

  const updateBonusToStore = async () => {
    if (!isCanAddSumBonus) {
      return Alert.alert('Thông báo', 'Dòng hàng phải cùng loại thuế VAT');
    } else {
      // trick : add default bonus = 0
      // let bonusNew = bonus ? bonus : 0;
      // hàm tính tiền triết khấu trên tổng hàng tiền hàng
      const tong_chiet_khau = TinhVAT(bonus, tong_tien_hang);
      // lưu phần trăm chiết khấu
      const chiet_khau = bonus;
      // chỉ thực hiện được chiết khấu tổng với trường hợp có cùng 1 loại thuế vat
      let tong_vat_5 = 0;
      let tong_vat_10 = 0;
      let tong_vat_8 = 0;

      if (TongVat5 > 0) {
        // hàm tính tiền triết khấu trên thuế vat 5
        tong_vat_5 = (tong_tien_hang - tong_chiet_khau) * (5 / 100);
      }
      if (TongVat8 > 0) {
        // hàm tính tiên tổng vát 8
        tong_vat_8 = (tong_tien_hang - tong_chiet_khau) * (8 / 100);
      }
      if (TongVat10 > 0) {
        // hàm tính tiên tổng vát 10
        tong_vat_10 = (tong_tien_hang - tong_chiet_khau) * (10 / 100);
      }
      //  hàm tính tổng thuế

      const tong_thue = tong_vat_10 + tong_vat_8 + tong_vat_5;
      // tính tổng thanh toán
      const tong_thanh_toan = tong_tien_hang + tong_thue - tong_chiet_khau;

      const dataBonnus = {
        tong_chiet_khau,
        chiet_khau,
        tong_thue,
        tong_vat: tong_vat_10, // tong_vat
        tong_vat5: tong_vat_5,
        tong_vat8: tong_vat_8,
        tong_thanh_toan,
        chiet_khau: bonus,
      };

      await dispatch(UPDATE_TRIETKHAU_TONG(dataBonnus));
      // hàm dispatch lên lên store lưu lại
      const paramRealseMoneny = {
        tongtien: tong_thanh_toan,
      };

      await API.readMoney(paramRealseMoneny).then(
        res => {
          if (res) {
            dispatch(UPDATE_MONEY_STRING(res));
          }
        },
        err => { },
      );
    }
  };

  return (
    <View style={styles.containerDetail}>
      <EnvoiceText
        disabled
        title={'Cộng tiền hàng'}
        value={formatNumber(HoaDonGTGT.tong_tien_hang)}
      />
      <View style={styles.horizontalRow}>
        <View style={AppStyles.flex1}>
          <EnvoiceText
            keyboardType={'numeric'}
            title={'Phần trăm chiết khấu'}
            value={HoaDonGTGT.chiet_khau}
            onChangeText={text => setBonus(text)}
            onEndEditing={() => updateBonusToStore()}
          />
        </View>
        <View style={styles.distance5} />
        <View style={AppStyles.flex1}>
          <EnvoiceText
            title={'Tiền chiết khấu'}
            value={formatNumber(HoaDonGTGT.tong_chiet_khau)}
            disabled
          />
        </View>
      </View>
      <EnvoiceText
        title={'Tiền thuế VAT (5%)'}
        value={formatNumber(HoaDonGTGT.tong_vat5)}
        disabled
      />
      <EnvoiceText
        title={'Tiền thuế VAT (8%)'}
        value={formatNumber(HoaDonGTGT.tong_vat8)}
        disabled
      />
      <EnvoiceText
        title={'Tiền thuế VAT (10%)'}
        value={formatNumber(HoaDonGTGT.tong_vat)}
        disabled
      />
      <ToMoney money={HoaDonGTGT.tong_thanh_toan} />
    </View>
  );
};

// render ghi chú hoá đơn
// params={
//  ghiChu:'',
//  ghiChuNoiBo:''
// }

const DetailNote = () => {
  const dispatch = useDispatch();
  const HoaDonGTGT = useSelector(state => state.EinvoiceReducer.HoaDonGTGT);
  const [note, setNote] = React.useState({
    ghi_chu: HoaDonGTGT.ghi_chu,
    ghi_chu_nb: HoaDonGTGT.ghi_chu_nb,
  });
  return (
    <View style={{ backgroundColor: '#F1F1F1' }}>
      <Text style={styles.titleGhiChu}>{'Ghi chú trên hóa đơn'}</Text>
      <TextInput
        value={note.ghi_chu}
        onChangeText={text => setNote({ ...note, ghi_chu: text })}
        multiline={true}
        numberOfLines={4}
        style={styles.inputGhiChu}
        onEndEditing={() => dispatch(UPDATE_NOTE_INVOICE(note))}
      />
      <Text style={styles.titleGhiChu}>{'Ghi chú nội bộ'}</Text>
      <TextInput
        value={note.ghi_chu_nb}
        onChangeText={text => setNote({ ...note, ghi_chu_nb: text })}
        multiline={true}
        numberOfLines={4}
        style={styles.inputGhiChu}
        onEndEditing={() => dispatch(UPDATE_NOTE_INVOICE(note))}
      />
    </View>
  );
};

const ListProductAdded = () => {
  const HoaDonGTGT = useSelector(state => state.EinvoiceReducer.HoaDonGTGT);

  const ListProduct = HoaDonGTGT.danhsachhang ? HoaDonGTGT.danhsachhang : [];

  const dispatch = useDispatch();

  const isShowDelete = HoaDonGTGT.so_hoa_don == NumberInvoiceStarter;

  const onDeleteItem = item => {
    return dispatch(DELETE_PRODUCT(item));
  };

  const ProducRow = ({ data, index = 1, isShowDelete = false }) => {
    const Stt = index + 1;
    const donGia = _.parseInt(data.don_gia);
    const actionSheetEdit = {
      data: data,
      isCanUpdate: isShowDelete,
    };

    return (
      <View>
        <TouchableOpacity
          onPress={() => Actions.productEdit({ data: actionSheetEdit })}
          style={{
            width: '100%',
            backgroundColor: 'rgb(231, 234, 245)',
            padding: AppSizes.paddingXSml,
            borderBottomWidth: 1,
            borderColor: AppColors.border,
            flexDirection: 'row',
          }}>
          <Text style={{ ...AppStyles.baseText }}>{Stt + '.  '}</Text>
          <View style={{ width: '100%', flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ ...AppStyles.baseText, color: '#3F3D4B', flex: 1 }}>
                {data.ten_hang}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Dlog('Cancel selected product');
                }}
                style={{ paddingHorizontal: AppSizes.paddingXXSml }}>
                {isShowDelete && (
                  <TouchableOpacity
                    style={{ padding: AppSizes.paddingXSml }}
                    onPress={() => onDeleteItem(data)}>
                    <Cancel
                      fill={AppColors.gray}
                      style={{ width: 15, height: 15 }}
                    />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            </View>

            <Text style={{ ...AppStyles.hintText }}>{data.moTa}</Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  paddingVertical: AppSizes.paddingXXSml,
                  paddingHorizontal: AppSizes.paddingSml,
                  borderRadius: 4,
                  backgroundColor: AppColors.blue,
                }}>
                <Text style={{ ...AppStyles.baseText, color: AppColors.white }}>
                  {data.so_luong}
                </Text>
              </View>
              <Text style={{ ...AppStyles.baseText, color: AppColors.blue }}>
                {'  x'}
                {formatNumber(donGia)}
              </Text>
              <View style={AppStyles.flex1} />
              <Text style={{ ...AppStyles.boldText, color: AppColors.blue }}>
                {formatNumber(data.thanh_tien)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ width: '100%' }}>
      {ListProduct.map((item, index) => {
        return (
          <ProducRow
            key={index.toString()}
            data={item}
            index={index}
            isShowDelete={isShowDelete}
          />
        );
      })}
    </View>
  );
};

// Render body e-invoice
const Body = props => {
  // lấy thông tin hoá đơn điện tử  từ Store
  const HoaDonGTGT = useSelector(state => state.EinvoiceReducer.HoaDonGTGT);
  // Đẩy thông tin lên store
  const dispatch = useDispatch();
  const [expand, setExpand] = React.useState({
    isShowEnvoiceInfor: false,
    isShowCustomerInfor: false,
    isShowList: false,
    isShowBonus: false,
    isShowSumMoney: false,
    isshowNote: false,
  });

  //  thêm mới dòng hàng và đóng form nhập dòng hàng
  const pressDone = async product => {
    // Validate thông tin hàng hoá
    if (!product.ten_hang) {
      return Alert.alert(I18n.t('common.notice'), 'Vui lòng nhập tên hàng');
    }
    // Validate số lượng hàng hoá
    if (product.so_luong == 0) {
      return Alert.alert(
        I18n.t('common.notice'),
        'Vui lòng nhập số lượng hàng',
      );
    }

    let newProducts = [];
    if (HoaDonGTGT.danhsachhang) {
      newProducts = _.cloneDeep(HoaDonGTGT.danhsachhang);
    }
    newProducts.push(product);
    setExpand({ ...expand, isShowList: false });
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
      tong_vat10,
      tong_vat8,
    );
    // viết 1 hàm dispath  {
    //   tong_tien_hang,tong_vat5,tong_vat10,tong_thanh_toan
    // }
    const money = {
      tong_tien_hang: tong_tien_hang,
      tong_vat5: tong_vat5,
      tong_vat: tong_vat10,
      tong_vat8: tong_vat8,
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
      err => { },
    );
  };

  return (
    <View style={styles.bodyContainer}>
      <RowInforEnvoice
        title={'Thông tin hóa đơn'}
        subOne={'Ngày hóa đơn: '}
        valueOne={HoaDonGTGT.ngay_hoa_don}
        subTwo={'Số hóa đơn: '}
        valueTwo={HoaDonGTGT.so_hoa_don}
        colorValueTwo={
          HoaDonGTGT.so_hoa_don == NumberInvoiceStarter ? 'black' : 'red'
        }
        IconActive={FileSoild}
        IconLine={FileLine}
        hasBorderTop={true}
        selected={expand.isShowEnvoiceInfor}
        onPressRow={() => {
          const expandData = {
            isShowEnvoiceInfor: !expand.isShowEnvoiceInfor,
            isShowCustomerInfor: false,
            isShowList: false,
            isShowBonus: false,
            isShowSumMoney: false,
            isshowNote: false,
          };
          // animate();
          setExpand(expandData);
        }}
      />
      {expand.isShowEnvoiceInfor && <DetailBodyEnvoiceInfor />}

      <RowInforEnvoice
        title={'Thông tin chi tiết về người mua hàng'}
        subOne={'Mã đơn vị: '}
        valueOne={HoaDonGTGT.ben_mua_ma}
        subTwo={'Tên đơn vị: '}
        valueTwo={HoaDonGTGT.ben_mua_ten_dv}
        IconActive={ActiveAccount}
        IconLine={Account}
        selected={expand.isShowCustomerInfor}
        hasBorderTop={!expand.isShowEnvoiceInfor}
        onPressRow={() => {
          const expandData = {
            isShowCustomerInfor: !expand.isShowCustomerInfor,
            isShowEnvoiceInfor: false,
            isShowList: false,
            isShowBonus: false,
            isShowSumMoney: false,
            isshowNote: false,
          };
          // animate();
          setExpand(expandData);
        }}
      />
      {expand.isShowCustomerInfor && <DetailInforCustomer />}

      <RowInforEnvoice
        title={'Hàng hoá dịch vụ'}
        subOne={'Tổng số hàng hóa: '}
        valueOne={HoaDonGTGT.danhsachhang ? HoaDonGTGT.danhsachhang.length : 0}
        IconActive={ProducSoild}
        IconLine={ProductLine}
        selected={expand.isShowList}
        hasBorderTop={!expand.isShowCustomerInfor}
        onPressRow={() => {
          const expandData = {
            isShowList: !expand.isShowList,
            isShowEnvoiceInfor: false,
            isShowCustomerInfor: false,
            isShowBonus: false,
            isShowSumMoney: false,
            isshowNote: false,
          };
          // animate();
          setExpand(expandData);
        }}
      />
      {/* Danh sách dòng hàng */}

      {expand.isShowList && (
        // <AddProduct
        //   onPressDone={product => pressDone(product)}
        //   onPressAddNew={product => pressDone(product)}
        // />
        <DetailAddProduct />
      )}

      {/* <RowInforEnvoice
        title={'Chiết khấu'}
        subOne={'% Chiết khấu: '}
        valueOne={'0%'}
        subTwo={'Tiền chiết khấu: '}
        valueTwo={HoaDonGTGT.tong_chiet_khau}
        IconActive={GiftSoild}
        IconLine={GiftLine}
        selected={expand.isShowBonus}
        hasBorderTop={!expand.isShowList}
        onPressRow={() => {
          const expandData = {
            ...expand,
            isShowBonus: !expand.isShowBonus,
          };
          animate();
          setExpand(expandData);
        }}
      />
      {expand.isShowBonus && <DetailBonus />} */}

      <RowInforEnvoice
        title={'Tổng hợp'}
        subOne={'Tổng tiền VAT: '}
        // sum tong_vat + tong_vat5
        valueOne={formatNumber(
          TongTienVAT(
            HoaDonGTGT.tong_vat,
            HoaDonGTGT.tong_vat5,
            HoaDonGTGT.tong_vat8,
          ),
        )}
        subTwo={'Tổng thanh toán: '}
        valueTwo={formatNumber(HoaDonGTGT.tong_thanh_toan)}
        IconActive={Money}
        IconLine={Money}
        selected={expand.isShowSumMoney}
        hasBorderTop={!expand.isShowBonus}
        onPressRow={() => {
          const expandData = {
            isShowSumMoney: !expand.isShowSumMoney,
            isShowEnvoiceInfor: false,
            isShowCustomerInfor: false,
            isShowList: false,
            isShowBonus: false,
            isshowNote: false,
          };
          // animate();
          setExpand(expandData);
        }}
      />

      {expand.isShowSumMoney && <DetailSumMoney />}

      <RowInforEnvoice
        title={'Ghi chú trên hóa đơn'}
        subOne={'Ghi chú trên hóa đơn: '}
        valueOne={HoaDonGTGT.ghi_chu}
        subTwo={'Ghi chú nội bộ: '}
        valueTwo={HoaDonGTGT.ghi_chu_nb}
        IconActive={EditLineSoild}
        IconLine={EditLine}
        selected={expand.isshowNote}
        hasBorderTop={!expand.isShowSumMoney}
        onPressRow={() => {
          const expandData = {
            isshowNote: !expand.isshowNote,
            isShowEnvoiceInfor: false,
            isShowCustomerInfor: false,
            isShowList: false,
            isShowBonus: false,
            isShowSumMoney: false,
          };
          // animate();
          setExpand(expandData);
        }}
      />
      {expand.isshowNote && <DetailNote />}
      {HoaDonGTGT.tong_thanh_toan_bang_chu_nt && (
        <RowReadingMoney
          title={'Số tiền bằng chữ'}
          subOne={HoaDonGTGT?.tong_thanh_toan_bang_chu_nt}
        />
      )}
    </View>
  );
};

const DetailAddProduct = () => {
  const HoaDonGTGT = useSelector(state => state.EinvoiceReducer.HoaDonGTGT);
  const isShowButtonADD = HoaDonGTGT.so_hoa_don == NumberInvoiceStarter;
  return (
    <View style={{ width: '100%' }}>
      <ListProductAdded />
      {isShowButtonADD && (
        <View style={styles.btnAddNew}>
          <TouchableOpacity
            onPress={() => Actions.productEdit()}
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: AppColors.blue,
              padding: AppSizes.paddingXSml,
              margin: AppSizes.marginXSml,
              borderRadius: 5,
            }}>
            <ActivePlus style={styles.iconAddNew} fill={AppColors.blue} />
            <Text style={{ ...AppStyles.boldText, color: AppColors.blue }}>
              {'Thêm mới hàng hoá'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const HeaderTitle = () => {
  const HoaDonGTGT = useSelector(state => state.EinvoiceReducer.HoaDonGTGT);
  const colorNumber =
    HoaDonGTGT?.so_hoa_don == NumberInvoiceStarter
      ? AppColors.black
      : AppColors.red;
  const titleScreen =
    HoaDonGTGT?.hoaDonCoMa == 1
      ? I18n.t('createInvoiceScreen.hoaDonGiaTriGiaTangCoMa')
      : I18n.t('createInvoiceScreen.hoaDonGiaTriGiaTang');

  const colorStatus = HoaDonGTGT?.trang_thai_hoa_don == InvoiceNameStatus.DaXuatDaCapMa ? AppColors.green : AppColors.blue
  return (
    <View style={{ width: '100%', padding: AppSizes.paddingXSml }}>
      <View style={styles.wrapTitle}>
        <Text style={{ ...AppStyles.boldText, color: AppColors.black }}>
          {_.toUpper(titleScreen)}
        </Text>
      </View>

      {HoaDonGTGT?.so_xac_thuc && (
        <View style={styles.horizontalRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ ...AppStyles.hintText }}>
              {I18n.t('createInvoiceScreen.ma')}
            </Text>
            <Text style={{ ...AppStyles.hintText, color: colorNumber }}>
              {'  ' + HoaDonGTGT?.so_xac_thuc}
            </Text>
          </View>
        </View>
      )}
      {/* 25/03/2022 Mr Thuận (BA) comfirm clear "-" */}
      <View style={styles.horizontalRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ ...AppStyles.hintText }}>
            {I18n.t('createInvoiceScreen.mauSoHD')}
          </Text>
          <Text style={{ ...AppStyles.hintText, color: AppColors.black }}>
            {`${HoaDonGTGT?.mau_so}${HoaDonGTGT?.ky_hieu}`}
          </Text>
        </View>
      </View>

      <View style={styles.horizontalRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ ...AppStyles.hintText }}>
            {I18n.t('createInvoiceScreen.soHD')}
          </Text>
          <Text style={{ ...AppStyles.hintText, color: colorNumber }}>
            {'  ' + HoaDonGTGT?.so_hoa_don}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={AppStyles.hintText}>
          {I18n.t('createInvoiceScreen.ngayHD')}
        </Text>
        <Text style={AppStyles.hintText}>{' ' + HoaDonGTGT?.ngay_hoa_don}</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={AppStyles.hintText}>
          {I18n.t('createInvoiceScreen.trangThai')}
        </Text>
        <Text
          style={{
            ...AppStyles.boldText,
            fontSize: 12,
            color: colorStatus,
          }}>
          {HoaDonGTGT?.trang_thai_hoa_don}
        </Text>
      </View>

      {HoaDonGTGT?.trang_thai_dieu_chinh_text && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={AppStyles.hintText}>
            {I18n.t('createInvoiceScreen.trangThaiXuLy')}
          </Text>
          <Text
            style={{
              ...AppStyles.boldText,
              fontSize: 12,
              color: AppColors.blue,
            }}>
            {HoaDonGTGT?.trang_thai_dieu_chinh_text}
          </Text>
        </View>
      )}

      {!_.isEmpty(HoaDonGTGT?.thong_bao_truyen_nhan) && <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Text style={AppStyles.hintText}>
          {I18n.t('createInvoiceScreen.lyDoTuChoi')}
        </Text>
        <Text
          style={{
            ...AppStyles.baseText,
            fontSize: 12,
            color: AppColors.red,
            flex: 1,
          }}>
          {HoaDonGTGT?.thong_bao_truyen_nhan}
        </Text>
      </View>}
    </View>
  );
};

const Footer = props => {
  const {
    onSaveInvoice,
    onReviewInvoice,
    onExportInvoice,
    onSendInvoice,
    onShowMenuAction,
    onSignInvoice,
    onProgressInvoice,
    onViewHdInMenu,
    isShowSaveButton,
    isShowViewButton,
    isShowGroupButton,
    isShowMenuButton,
    isHoaDonDaXuatDaCapMa,
    isHoaDonDaXuatChoCapMa,

  } = props;
  const HoaDonGTGT = useSelector(state => state.EinvoiceReducer.HoaDonGTGT);

  return (
    <View style={styles.wrapButtonGroup}>
      {isShowSaveButton && (
        <ButtonText
          styleTitle={{ ...AppStyles.boldText, color: AppColors.white }}
          onCick={() => onSaveInvoice()}
          title={_.toUpper(I18n.t('common.write'))}
        />
      )}

      {isShowViewButton && (
        <GroupButton
          InactiveTitle={'Xem hoá đơn'}
          ActiveTitle={'Ký số hoá đơn'}
          onClickInactive={() => onReviewInvoice()}
          onClickActive={() => onSignInvoice()}
        />
      )}

      {isShowMenuButton && (
        <ButtonThree
          oneDisable={true}
          oneText={'Xem hoá đơn'}
          twoText={'Xuất hoá đơn'}
          threeText={'Ghi'}
          indexActive={1}
          onClickOne={() => onReviewInvoice()}
          onClickTwo={() => onExportInvoice()}
          onClickThree={() => onSaveInvoice()}
          onClickMenu={() => onShowMenuAction()}
        />
      )}
      {isHoaDonDaXuatDaCapMa && HoaDonGTGT?.trang_thai_dieu_chinh != 1 && (
        <GroupButton
          InactiveTitle={'Xem hoá đơn'}
          ActiveTitle={'Gửi Email HĐ'}
          onClickInactive={() => onReviewInvoice()}
          onClickActive={() => onSendInvoice()}
        />
      )}

      {isHoaDonDaXuatDaCapMa && HoaDonGTGT?.trang_thai_dieu_chinh == 1 && (

        <ButtonThree
          oneDisable={true}
          oneText={'GỬI Email HĐ'}
          twoText={'XỬ LÝ HOÁ ĐƠN'}
          threeText={'Ghi'}
          indexActive={0}
          onClickOne={() => onSendInvoice()}
          onClickTwo={() => onProgressInvoice()}
          onClickThree={() => onSaveInvoice()}
          onClickMenu={() => onViewHdInMenu()}
        />
      )}

      {isHoaDonDaXuatChoCapMa && (
        <ButtonText
          styleTitle={{ ...AppStyles.semiboldText, color: AppColors.white }}
          onCick={() => onReviewInvoice()}
          title={'XEM HOÁ ĐƠN'}
        />
      )}

      {isShowGroupButton && (
        <GroupButton
          InactiveTitle={'Xem hoá đơn'}
          ActiveTitle={'Gửi hoá đơn'}
          onClickInactive={() => onReviewInvoice()}
          onClickActive={() => onSendInvoice()}
        />
      )}
    </View>
  );
};

// add animation when keyboard did show
const _keyboardDidShow = () => {
  animate();
};

// add animation when keyboard did hide
const _keyboardDidHide = () => {
  animate();
};

// Customer Invoice Hook
const InvoiceSwapHook = () => {
  // Khai báo hoá đơn ID
  const [hoaDonID, setHoaDonID] = React.useState('0');
  // khai báo thông tin trong hoá đơn
  const [hoadonRaw, setHoaDonRaw] = React.useState({});
  //Redux
  const dispatch = useDispatch();
  // Hàm clear store
  const onBackScreen = async () => {
    // await dispatch(CLEAR_EINVOICE());
    return Actions.pop();
  };
  // Lấy thông tin hoá đơn trên Store
  const HoaDonGTGT = useSelector(state => state.EinvoiceReducer.HoaDonGTGT);
  // Hàm lấy thông tin hoá đơn mới
  const onGetInfoInvoice = paramID => {
    let hoadonid = hoaDonID;
    if (paramID) {
      hoadonid = paramID;
    }
    const params = {
      hoadonid,
    };

    API.getHoaDonDienTu(params).then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          // checking  trang thái hoá đơn == DaXuatChuaKy
          const HoaDonData = res.data.data;
          if (HoaDonData.trang_thai_hoa_don == InvoiceNameStatus.ChoXuat) {
            setHoaDonRaw(HoaDonData);
          }
          dispatch(GET_DATA_EINVOICE(HoaDonData));
        } else {
          return Alert.alert(I18n.t('common.notice'), res.data.desc);
        }
      },
      err => {
        Dlog('error', err);
      },
    );
  };

  // Hàm lưu thông tin Hoá đơn
  const onSaveInvoice = async () => {
    // Validate  các thông tin trước khi nhấn lưu hoá đơn
    if (HoaDonGTGT.so_hoa_don != NumberInvoiceStarter) {
      return Alert.alert('Thông báo', 'Hoá đơn đã xuất số không thể chỉnh sửa');
    }
    //Validate thông tin người mua hàng
    if (!HoaDonGTGT.ben_mua_ho_ten && !HoaDonGTGT.ben_mua_ten_dv) {
      return Alert.alert('Thông báo', 'Vui lòng nhập thông tin người mua hàng');
    }
    if (_.isEmpty(HoaDonGTGT.danhsachhang)) {
      return Alert.alert('Thông báo', 'Vui lòng nhập thông tin hàng hoá');
    }
    if (!HoaDonGTGT.ma_hinhthuctt) {
      return Alert.alert('Thông báo', 'Vui lòng chọn hình thức thanh toán');
    }
    if (!HoaDonGTGT.ben_mua_dia_chi) {
      return Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ người mua hàng');
    }
    if (!_.isEmpty(HoaDonGTGT.ben_mua_email)) {
      if (!validateEmail(HoaDonGTGT.ben_mua_email)) {
        return Alert.alert(
          I18n.t('common.notice'),
          I18n.t('createInvoiceScreen.formatEmail'),
        );
      }
    }
    // if (_.isEmpty(HoaDonGTGT.ben_mua_dien_thoai)) {
    //   return Alert.alert(
    //     I18n.t('common.notice'),
    //     I18n.t('createInvoiceScreen.formatPhone'),
    //   );
    // }
    // nếu user nhập mã số thuế thì bắt buộc phải nhập tên đơn vị
    if (!_.isEmpty(HoaDonGTGT.ben_mua_ma_dv)) {
      if (!format_mst(HoaDonGTGT.ben_mua_ma_dv)) {
        return Alert.alert('Thông báo', 'Mã số thuế sai định dạng');
      }
      if (!HoaDonGTGT.ben_mua_ten_dv) {
        return Alert.alert('Thông báo', 'Vui lòng nhập tên đơn vị');
      }
    }

    const params = {
      dhoadonid: HoaDonGTGT.dhoadonid,
      so_hoa_don: HoaDonGTGT.so_hoa_don,
      ngay_hoa_don: HoaDonGTGT.ngay_hoa_don,
      ngay_tao: HoaDonGTGT.ngay_tao,
      ngay_sua: HoaDonGTGT.ngay_sua,
      trang_thai_hoa_don: HoaDonGTGT.trang_thai_hoa_don,
      ben_ban_ma_dv: HoaDonGTGT.ben_ban_ma_dv,
      ma_loai_hoa_don: HoaDonGTGT.ma_loai_hoa_don,
      trang_thai_dieu_chinh: HoaDonGTGT.trang_thai_dieu_chinh,
      trang_thai_dieu_chinh_text: HoaDonGTGT.trang_thai_dieu_chinh_text,
      ma_nt: HoaDonGTGT.ma_nt,
      ty_gia: HoaDonGTGT.ty_gia,
      mau_so: HoaDonGTGT.mau_so,
      ky_hieu: HoaDonGTGT.ky_hieu,
      ma_hinhthuctt: HoaDonGTGT.ma_hinhthuctt,
      danhsachhang: HoaDonGTGT.danhsachhang,
      ben_mua_dia_chi: HoaDonGTGT.ben_mua_dia_chi,
      ben_mua_dien_thoai: HoaDonGTGT.ben_mua_dien_thoai,
      ben_mua_email: HoaDonGTGT.ben_mua_email,
      ben_mua_fax: HoaDonGTGT.ben_mua_fax,
      ben_mua_ho_ten: HoaDonGTGT.ben_mua_ho_ten,
      ben_mua_ma: HoaDonGTGT.ben_mua_ma,
      ben_mua_ma_dv: HoaDonGTGT.ben_mua_ma_dv,
      ben_mua_ngan_hang_tai_khoan: HoaDonGTGT.ben_mua_ngan_hang_tai_khoan,
      ben_mua_ngan_hang_ten: HoaDonGTGT.ben_mua_ngan_hang_ten,
      ben_mua_ten_dv: HoaDonGTGT.ben_mua_ten_dv,
      dien_thoai_gui_hoa_don: HoaDonGTGT.dien_thoai_gui_hoa_don,
      tong_chiet_khau: HoaDonGTGT.tong_chiet_khau,
      tong_chiet_khau_nt: HoaDonGTGT.tong_chiet_khau_nt,
      tong_thanh_toan: HoaDonGTGT.tong_thanh_toan,
      tong_thanh_toan_nt: HoaDonGTGT.tong_thanh_toan_nt,
      tong_thanh_toan_bang_chu: HoaDonGTGT.tong_thanh_toan_bang_chu,
      tong_thanh_toan_bang_chu_nt: HoaDonGTGT.tong_thanh_toan_bang_chu_nt,
      tong_tien_hang: HoaDonGTGT.tong_tien_hang,
      tong_tien_hang_nt: HoaDonGTGT.tong_tien_hang_nt,
      tong_vat: HoaDonGTGT.tong_vat,
      tong_vat5: HoaDonGTGT.tong_vat5,
      tong_vat8: HoaDonGTGT.tong_vat8,
      ghi_chu: HoaDonGTGT.ghi_chu,
      ghi_chu_nb: HoaDonGTGT.ghi_chu_nb,
      chiet_khau: HoaDonGTGT.chiet_khau,
    };

    await API.saveHoaDonDienTu(params).then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          // Lấy AI hoá đơn gắn vào Id globle
          setHoaDonID(res.data.data);
          // Lấy thông tin hoá đơn mới nhất
          onGetInfoInvoice(res.data.data);
          // Thông báo cho người dùng Lưu hoá đơn thành công
          return Alert.alert(I18n.t('common.notice'), 'Lưu hoá đơn thành công');
        } else {
          // Thông báo cho người dùng Lưu hoá đơn thất bại
          return Alert.alert(I18n.t('common.notice'), res.data.msg);
        }
      },
      err => {
        Dlog('saveHoaDonDienTu', err);
      },
    );
  };
  // Hàm xem trước thông tin hoá đơn
  const onReviewInvoice = () => {
    const sheet = {
      title: I18n.t('createInvoiceScreen.xemTruocHoaDon'),
      hoaDonId: HoaDonGTGT.dhoadonid,
      confirmAction: () => {
        PreviewActionSheet.hide();
      },
      confirmText: I18n.t('createInvoiceScreen.xuatHoaDon'),
    };
    PreviewActionSheet.show(sheet);
  };

  // Hàm gửi hoá đơn
  const onSendInvoice = (fromMenu) => {
    const params = {
      hoaDonId: HoaDonGTGT.dhoadonid,
    };
    if (fromMenu) {
      ActionSheet.hide();
    }
    SendInvoiceMail.show(params);
  };


  const onProgressInvoice = () => {
    console.log('onProgressInvoice')
    Actions.XuLyXoaBoB1({
      Dhoadonid: HoaDonGTGT.dhoadonid
    })
  }

  // Hàm xoá hoá đơn
  const onDeleteInvoice = () => {
    const params = {
      dhoadonid: HoaDonGTGT.dhoadonid,
    };
    API.deleteInvoice(params).then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          // action refresh list einvoice
          return Alert.alert(
            I18n.t('common.notice'),
            res.data.desc,
            [{ text: 'OK', onPress: () => Actions.pop() }],
            { cancelable: false },
          );
        }
        return Alert.alert(I18n.t('common.notice'), res.data.desc);
      },
      err => {
        Dlog('err -->', err);
      },
    );
  };

  const onViewHdInMenu = () => {
    const data = [
      {
        title: 'Xem hoá đơn',
        value: 'Xem hoá đơn',
      },
    ];
    const sheet = {
      title: 'Tùy chọn khác',
      dataList: data,
      onSelected: item => {
        switch (item.title) {
          case 'Xem hoá đơn':
            return onReviewInvoice()
        }
      },
    };
    ActionSheet.show(sheet);
  }

  const onShowMenuAction = () => {
    const data = [
      {
        title: 'Ghi',
        value: 'Ghi',
      },
      {
        title: 'Gửi hóa đơn nháp',
        value: 'Gửi hóa đơn nháp',
      },
      {
        title: 'Xóa',
        value: 'Xóa',
      },
    ];

    const sheet = {
      title: 'Tùy chọn khác',
      dataList: data,
      onSelected: item => {
        switch (item.title) {
          case 'Ghi':
            return onSaveInvoice();
          case 'Gửi hóa đơn nháp':
            return onSendInvoice(true);
          case 'Xóa':
            return MessageCofirmRemove();
        }
      },
    };
    ActionSheet.show(sheet);
  };

  const MessageCofirmRemove = React.useCallback(() => {
    return Alert.alert(
      I18n.t('common.notice'),
      I18n.t('createInvoiceScreen.confirmRemove'),
      [
        {
          text: I18n.t('common.yes'),
          onPress: () => onDeleteInvoice(),
        },
        {
          text: I18n.t('common.canel'),
          onPress: () => { },
          style: 'cancel',
        },
      ],
    );
  });

  const MessageExportInvoice = React.useCallback(params => {
    return Alert.alert(
      I18n.t('common.notice'),
      I18n.t('createInvoiceScreen.confirmExport'),
      [
        {
          text: I18n.t('common.thucHien'),
          onPress: () => ExportEnvoice(params),
        },
        {
          text: I18n.t('common.skip'),
          onPress: () => { },
          style: 'cancel',
        },
      ],
    );
  });

  // Gọi API để xuất hoá đơn
  const ExportEnvoice = React.useCallback(params => {
    return API.exportInvoice(params).then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          // Lấy lại thông tin hoá đơn
          onGetInfoInvoice(params.dhoadonid);
          // hiển thị thông báo xuất hoá đơn thành công
          return Alert.alert(I18n.t('common.notice'), res.data.desc);
        } else {
          // hiển thị thông báo xuất hoá đơn lỗi
          return Alert.alert(I18n.t('common.notice'), res.data.desc);
        }
      },
      err => {
        Dlog('exportInvoice--->', err);
      },
    );
  }, []);

  // Gọi API để ký số hoá đơn
  const SignInvoice = React.useCallback(params => {
    const onGetPin = pin => {
      const data = {
        dhoadonid: params.dhoadonid,
        pinXacNhan: pin,
      };
      return API.signInvoice(data).then(
        res => {
          if (res.data && res.data.code == SUCCESS_CODE) {
            // Lấy lại thông tin hoá đơn
            onGetInfoInvoice(data.dhoadonid);
            // hiển thị thông báo xuất hoá đơn thành công
            return Alert.alert(I18n.t('common.notice'), res.data.desc);
          } else {
            // hiển thị thông báo xuất hoá đơn lỗi
            return Alert.alert(I18n.t('common.notice'), res.data.desc);
          }
        },
        err => {
          Dlog('exportInvoice--->', err);
        },
      );
    };
    // Process passing data from Pin screen to current screen
    const data = {
      callbackGetPin: pin => onGetPin(pin),
    };
    return Actions.xacNhanMaPin(data);
  }, []);

  // Hiển thị Alert thông báo có sự thay đổi data trước khi xuất
  const AlertChanged = React.useCallback(() => {
    return Alert.alert(
      I18n.t('common.notice'),
      I18n.t('createInvoiceScreen.coThongTinThayDoi'),
      [
        {
          text: I18n.t('common.skip'),
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: I18n.t('common.apply'),
          onPress: () => onSaveInvoice(),
        },
      ],
      { cancelable: false },
    );
  });

  // Hàm xuất hoá hoá đơn
  const onExportInvoice = async () => {
    if (HoaDonGTGT.so_hoa_don != NumberInvoiceStarter) {
      return Alert.alert('Thông báo', 'Hoá đơn đã được xuất trước đó');
    }
    const params = {
      dhoadonid: HoaDonGTGT.dhoadonid,
    };
    const isNotChanged = _.isEqual(HoaDonGTGT, hoadonRaw);
  
    if (isNotChanged) {
      // Xuất hoá đơn
      MessageExportInvoice(params);
    } else {
      // Hiển thị thông báo có sự thay đổi
      AlertChanged();
    }
  };

  // Hàm ký hoá đơn
  const onSignInvoice = () => {
    const params = {
      dhoadonid: HoaDonGTGT.dhoadonid,
    };
    return Alert.alert(
      'Thông báo',
      'Hóa đơn sau khi được ký số thành công sẽ được tự động gửi Cơ quan thuế để cấp mã.',
      [
        {
          text: 'Đóng',
          onPress: () => SignInvoice(params),
          style: 'cancel',
        },
      ],
    );
  };

  return {
    onGetInfoInvoice,
    onSaveInvoice,
    onReviewInvoice,
    onExportInvoice,
    onBackScreen,
    onSendInvoice,
    onShowMenuAction,
    onSignInvoice,
    onProgressInvoice,
    onViewHdInMenu
  };
};

// hàm render chính màn hình
const CreateInvoiceScreen = props => {
  // Lấy thông tin hoá đơn trên Store
  const {
    onGetInfoInvoice,
    onBackScreen,
    onSaveInvoice,
    onReviewInvoice,
    onExportInvoice,
    onSendInvoice,
    onShowMenuAction,
    onSignInvoice,
    onProgressInvoice,
    onViewHdInMenu
  } = InvoiceSwapHook();

  const HoaDonGTGT = useSelector(state => state.EinvoiceReducer.HoaDonGTGT);

  const dispatch = useDispatch();
  // Lẵng nghe sự kiện bàn phím lên xuống
  React.useEffect(() => {
    onGetInfoInvoice(props.hoaDonId);
  }, []);

  React.useEffect(() => {
    if (!HoaDonGTGT.tong_thanh_toan) {
      return;
    }
    const paramRealseMoneny = {
      tongtien: HoaDonGTGT.tong_thanh_toan,
    };

    API.readMoney(paramRealseMoneny).then(
      res => {
        if (res) {
          dispatch(UPDATE_MONEY_STRING(res));
        }
      },
      err => { },
    );
  }, [HoaDonGTGT.tong_thanh_toan]);

  const scrollInvoice = React.useRef(null);
  const keyboard = useKeyboard();
  const titleRightText = GetActionName(HoaDonGTGT.trang_thai_hoa_don);

  const isShowSaveButton =
    HoaDonGTGT.trang_thai_hoa_don == InvoiceNameStatus.NhapMoi;

  const isShowViewButton =
    HoaDonGTGT.trang_thai_hoa_don == InvoiceNameStatus.DaXuatChuaKy;

  const isShowGroupButton =
    HoaDonGTGT.trang_thai_hoa_don == InvoiceNameStatus.DaXuatDaKy;

  const isHoaDonDaXuatDaCapMa =
    HoaDonGTGT.trang_thai_hoa_don == InvoiceNameStatus.DaXuatDaCapMa;

  const isShowMenuButton =
    HoaDonGTGT.trang_thai_hoa_don == InvoiceNameStatus.ChoXuat;

  const isHoaDonDaXuatChoCapMa =
    HoaDonGTGT.trang_thai_hoa_don == InvoiceNameStatus.DaXuatChoCapMa;

  function actionRight() {
    switch (HoaDonGTGT.trang_thai_hoa_don) {
      case InvoiceNameStatus.NhapMoi:
        return onSaveInvoice();
      case InvoiceNameStatus.DaXuatChuaKy:
        return onReviewInvoice();
      case InvoiceNameStatus.ChoXuat:
        return onExportInvoice();
      case InvoiceNameStatus.DaXuatDaKy:
        return onSendInvoice();
      case InvoiceNameStatus.DaXuatDaCapMa:
        return onSendInvoice();
      case InvoiceNameStatus.DaXuatChoCapMa:
        return onReviewInvoice();
      default:
        return Alert.alert('Thông báo', 'Hoá đơn không rõ trạng thái');
    }
  }

  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <View
        style={{
          backgroundColor: '#F5F5F6',
          flex: 1,
          ...Platform.select({
            ios: {
              marginBottom: keyboard.keyboardShown
                ? keyboard.keyboardHeight / 3
                : 0,
            },
          }),
        }}>
        {/*  Hiện thị header với action ghi */}
        <AppHeader
          Icon={Back}
          onPressMenu={() => onBackScreen()}
          backgroundColor={AppColors.blue}
          titleColor={AppColors.white}
          iconColor={AppColors.white}
          title={I18n.t('createInvoiceScreen.hoaDonGiaTriGiaTang')}
          RightText={titleRightText}
          onPressRight={() => actionRight()}
        />

        <View style={styles.wrapContainer}>
          <ScrollView
            ref={scrollInvoice}
            showsVerticalScrollIndicator={false}
            style={styles.scrollContainer}>
            <HeaderTitle />
            <Body />
            <Footer
              onSaveInvoice={onSaveInvoice}
              onReviewInvoice={onReviewInvoice}
              onExportInvoice={onExportInvoice}
              onSendInvoice={onSendInvoice}
              onSignInvoice={onSignInvoice}
              onProgressInvoice={onProgressInvoice}
              isShowSaveButton={isShowSaveButton}
              isShowViewButton={isShowViewButton}
              isShowGroupButton={isShowGroupButton}
              isShowMenuButton={isShowMenuButton}
              onShowMenuAction={onShowMenuAction}
              onViewHdInMenu={onViewHdInMenu}
              isHoaDonDaXuatDaCapMa={isHoaDonDaXuatDaCapMa}
              isHoaDonDaXuatChoCapMa={isHoaDonDaXuatChoCapMa}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Khởi tạo style css màn hình
const styles = StyleSheet.create({
  wrapContainer: { flex: 1, padding: AppSizes.paddingSml },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F6',
  },
  scrollContainer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: AppColors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 6.68,
    elevation: 5,
    borderRadius: AppSizes.borderRadius,
  },
  wrapTitle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: AppSizes.marginSml,
  },
  horizontalRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  leftIcon: {
    width: 24,
    height: 24,
    marginHorizontal: AppSizes.marginSml,
    marginTop: AppSizes.marginXSml,
  },
  rightIcon: {
    width: 20,
    height: 20,
    marginTop: AppSizes.marginXSml,
    marginHorizontal: AppSizes.marginSml,
  },
  flexRow: {
    flexDirection: 'row',
  },
  containerRow: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: AppSizes.paddingXSml,
    borderTopWidth: 0.5,
    borderColor: AppColors.border,
  },
  lineVertical: {
    height: '80%',
    width: 1,
    backgroundColor: AppColors.border,
  },
  containerNumber: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: AppColors.lightgray,
    borderRadius: AppSizes.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: AppSizes.marginSml,
  },
  wrapNumber: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: AppSizes.paddingSml,
  },
  distance5: {
    width: '5%',
  },
  titleRow: { ...AppStyles.boldText, color: AppColors.black },
  containerDetail: { width: '100%', padding: AppSizes.paddingSml },

  wrapButtonGroup: {
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
  wrapTongTien: {
    ...AppStyles.boldText,
    width: '100%',
    padding: 14,
    backgroundColor: '#E7EAF5',
    borderColor: '#5B5B80',
    borderRadius: AppSizes.borderRadius,
    borderStyle: 'dotted',
    borderWidth: 1,
  },
  inputGhiChu: {
    ...AppStyles.baseText,
    width: '100%',
    backgroundColor: AppColors.white,
    height: height * 0.1,
    paddingHorizontal: AppSizes.paddingXSml,
    textAlign: 'justify',
  },
  titleGhiChu: {
    ...AppStyles.baseText,
    color: AppColors.textGray,
    paddingTop: AppSizes.paddingSml,
    marginLeft: AppSizes.marginXSml,
  },
  btnAddNew: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: AppSizes.paddingXSml,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: AppSizes.paddingSml,
  },
  iconAddNew: { width: 24, height: 24, marginRight: AppSizes.marginXSml },
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
  iconDone: { width: 21, height: 21, marginRight: AppSizes.marginXSml },
  bodyContainer: {
    width: '100%',
    backgroundColor: AppColors.colorGray,
  },
});

export default CreateInvoiceScreen;
