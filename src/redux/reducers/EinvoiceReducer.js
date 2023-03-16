import {
  TYPE_GET_DATA_EINVOICE,
  TYPE_CLEAR_DATA_EINVOICE,
  TYPE_CHANGE_MAUSO_EINVOICE,
  TYPE_CHANGE_HTTT_EINVOICE,
  TYPE_UPDATE_BANK_STK,
  TYPE_UPDATE_BANK_NAME,
  TYPE_UPDATE_CUSTOMER_INFO,
  TYPE_UPDATE_CUSTOMER_ADDRESS,
  TYPE_UPDATE_CUSTOMER_NAME,
  TYPE_UPDATE_CUSTOMER_MST,
  TYPE_UPDATE_CUSTOMER_NAME_DV,
  TYPE_UPDATE_CUSTOMER_SDT,
  TYPE_UPDATE_CUSTOMER_EMAIL,
  TYPE_ADD_DONGHANG,
  TYPE_ADD_INFO_INVOICE,
  TYPE_CHANGE_TIENTE,
  TYPE_SUM_MONEY,
  TYPE_UPDATE_NOTE_INVOICE,
  TYPE_UPDATE_MONEY_STRING,
  TYPE_DELETE_DONG_HANG,
  TYPE_UPDATE_BEN_MUA_MA,
  TYPE_UPDATE_PRODUCT,
  TYPE_UPDATE_TRIETKHAU_TONG,
} from '../actions/InvoiceAction';

import {
  TongVAT5,
  TongVAT10,
  TongThanhToan,
  TongTienVAT,
  CongTienHang,
  TongVAT8,
} from '../../ultil/EinvoiceSupport';

const initialState = {
  HoaDonGTGT: {},
};
import _ from 'lodash';

export default (state = initialState, action) => {
  switch (action.type) {
    // Xử lý update mẫu số hoá đơn
    case TYPE_CHANGE_MAUSO_EINVOICE:
      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          ky_hieu: action.payload.ky_hieu,
          ma_loai_hoa_don: action.payload.ma_loai_hoa_don,
          mau_so: action.payload.mau_so,
        },
      };
    // Xử ký uodate tên ngân hàng bên mua
    case TYPE_UPDATE_BANK_NAME:
      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          ben_mua_ngan_hang_ten: action.payload,
        },
      };
    // Xử lý update STK ngân hàng bên mua
    case TYPE_UPDATE_BANK_STK:
      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          ben_mua_ngan_hang_tai_khoan: action.payload,
        },
      };
    // Xử lý add toàn bộ thông tin hoá đơn lên store
    case TYPE_GET_DATA_EINVOICE:
      return {
        ...state,
        HoaDonGTGT: {
          ...action.payload,
        },
      };
    // Xử lý update loại hình thức thanh toán
    case TYPE_CHANGE_HTTT_EINVOICE:
      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          ma_hinhthuctt: action.payload,
        },
      };
    // Xử lý update đầy đủ thông tin hoá đơn
    case TYPE_ADD_INFO_INVOICE:
      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          so_bien_lai: action.payload.so_bien_lai,
          ma_nt: action.payload.ma_nt,
          ma_hinhthuctt: action.payload.ma_hinhthuctt,
          ty_gia: action.payload.ty_gia,
        },
      };

    // Xử lý update thông tin khác hàng
    case TYPE_UPDATE_CUSTOMER_INFO:
      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          ben_mua_dia_chi: action.payload.dia_chi,
          ben_mua_dien_thoai: action.payload.dien_thoai,
          ben_mua_email: action.payload.email,
          ben_mua_fax: action.payload.fax,
          ben_mua_ho_ten: action.payload.nguoi_giao_dich,
          ben_mua_ma: action.payload.ma_dv,
          ben_mua_ma_dv: action.payload.ma_so_thue,
          ben_mua_ngan_hang_tai_khoan: action.payload.ngan_hang_tai_khoan1,
          ben_mua_ngan_hang_ten: action.payload.ngan_hang_ten1,
          ben_mua_ten_dv: action.payload.ten_dv,
        },
      };
    // Xử lý update họ tên bên mua
    case TYPE_UPDATE_CUSTOMER_NAME:
      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          ben_mua_ho_ten: action.payload,
        },
      };
    // Xử lý update mã số thuế bên mua
    case TYPE_UPDATE_CUSTOMER_MST:
      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          ben_mua_ma_dv: action.payload,
        },
      };
    // Xử lý update tên đơn vị bên mua
    case TYPE_UPDATE_CUSTOMER_NAME_DV:
      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          ben_mua_ten_dv: action.payload,
        },
      };
    case TYPE_UPDATE_BEN_MUA_MA:
      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          ben_mua_ma: action.payload,
        },
      };
    // Xử lý update điện thoại bên mua
    case TYPE_UPDATE_CUSTOMER_SDT:
      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          ben_mua_dien_thoai: action.payload,
        },
      };
    // Xử lý update email bên mua
    case TYPE_UPDATE_CUSTOMER_EMAIL:
      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          ben_mua_email: action.payload,
        },
      };
    // Xử lý update địa chỉ bên mua
    case TYPE_UPDATE_CUSTOMER_ADDRESS:
      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          ben_mua_dia_chi: action.payload,
        },
      };
    // Xử lú add thêm dòng hàng trên hoá đơn GTGT
    case TYPE_ADD_DONGHANG:
      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          danhsachhang: action.payload,
        },
      };
    case TYPE_CHANGE_TIENTE:
      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          ma_nt: action.payload.ma_tien_te,
          ty_gia: action.payload.ty_gia,
        },
      };
    case TYPE_SUM_MONEY:
      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          tong_vat5: action.payload.tong_vat5,
          tong_vat8: action.payload.tong_vat8,
          tong_vat: action.payload.tong_vat,
          tong_tien_hang: action.payload.tong_tien_hang,
          tong_thanh_toan: action.payload.tong_thanh_toan,
        },
      };
    //case add ghi chu
    case TYPE_UPDATE_NOTE_INVOICE:
      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          ghi_chu: action.payload.ghi_chu,
          ghi_chu_nb: action.payload.ghi_chu_nb,
        },
      };
    // Xu ly doc tien
    case TYPE_UPDATE_MONEY_STRING:
      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          tong_thanh_toan_bang_chu: action.payload.data.convertTien,
          tong_thanh_toan_bang_chu_nt: action.payload.data.convertTien,
        },
      };
    // Xử lý delete dòng hàng
    case TYPE_DELETE_DONG_HANG:
      const newInvoice = state.HoaDonGTGT.danhsachhang.filter(item => {
        return !_.isEqual(item, action.payload);
      });

      const tong_tien_hang = CongTienHang(newInvoice);
      // dispatch tổng tiền VAT 5
      const tong_vat5 = TongVAT5(newInvoice);
      // dispatch tổng VAT 10
      const tong_vat10 = TongVAT10(newInvoice);
      // dispatch tong VAT 8
      const tong_vat8 = TongVAT8(newInvoice);

      // dispatch tổng thanh toán   ==  (cộng tiền hàng) + (tổng VAT 5) + (tổng VAT 10)
      const tong_thanh_toan = TongThanhToan(
        tong_tien_hang,
        tong_vat5,
        tong_vat8,
        tong_vat10,
      );
      const money = {
        tong_tien_hang: tong_tien_hang,
        tong_vat5: tong_vat5,
        tong_vat8: tong_vat8,
        tong_vat: tong_vat10,
        tong_thanh_toan: tong_thanh_toan,
      };

      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          danhsachhang: newInvoice,
          tong_vat5: money.tong_vat5,
          tong_vat: money.tong_vat,
          tong_vat8: money.tong_vat8,
          tong_tien_hang: money.tong_tien_hang,
          tong_thanh_toan: money.tong_thanh_toan,
        },
      };

    // Xử lý update triết khấu tổng

    case TYPE_UPDATE_TRIETKHAU_TONG:
      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          tong_chiet_khau: action.payload.tong_chiet_khau,
          tong_vat5: action.payload.tong_vat5,
          tong_vat: action.payload.tong_vat,
          tong_vat8: action.payload.tong_vat8,
          tong_thanh_toan: action.payload.tong_thanh_toan,
          chiet_khau: action.payload.chiet_khau,
        },
      };

    // Xử lý update dòng hàng
    case TYPE_UPDATE_PRODUCT: {
      const item = action.payload;
      let items = state.HoaDonGTGT.danhsachhang;
      const foundIndex = items.findIndex(element => element.stt === item.stt);
      items[foundIndex] = item;

      const tong_tien_hang = CongTienHang(items);
      // dispatch tổng tiền VAT 5
      const tong_vat5 = TongVAT5(items);
      // dispatch tổng VAT 10
      const tong_vat10 = TongVAT10(items);
      // dispatch tong VAT 8
      const tong_vat8 = TongVAT8(items);

      // dispatch tổng thanh toán   ==  (cộng tiền hàng) + (tổng VAT 5) + (tổng VAT 10)
      const tong_thanh_toan = TongThanhToan(
        tong_tien_hang,
        tong_vat5,
        tong_vat8,
        tong_vat10,
      );
      const money = {
        tong_tien_hang: tong_tien_hang,
        tong_vat5: tong_vat5,
        tong_vat8: tong_vat8,
        tong_vat: tong_vat10,
        tong_thanh_toan: tong_thanh_toan,
      };

      return {
        ...state,
        HoaDonGTGT: {
          ...state.HoaDonGTGT,
          danhsachhang: items,
          tong_vat8: money.tong_vat8,
          tong_vat5: money.tong_vat5,
          tong_vat: money.tong_vat,
          tong_tien_hang: money.tong_tien_hang,
          tong_thanh_toan: money.tong_thanh_toan,
        },
      };
    }

    // Xử lý dọn dẹp Eivnoice trên store
    case TYPE_CLEAR_DATA_EINVOICE:
      return initialState;
    default:
      return state;
  }
};
