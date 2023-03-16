import {
  GET_INFO_INVOICE,
  RESET_ACTION,
  GET_INFO_CUSTOMER,
} from '../actions/InvoiceAction';

const initialState = {
  Invoice: {
    thongTinHoaDon: {},
    thongNguoiMuaHang: {},
    danhSachHangHoa: {},
    chietKhau: {},
    tongTien: {},
    ghiChu: {},
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INFO_INVOICE:
      return {
        ...state,
        Invoice: {
          ...state.Invoice,
          thongTinHoaDon: action.payload,
        },
      };
    case GET_INFO_CUSTOMER:
      return {
        ...state,
        Invoice: {
          ...state.Invoice,
          thongNguoiMuaHang: action.payload,
        },
      };

    case RESET_ACTION:
      return initialState;

    default:
      return state;
  }
};
