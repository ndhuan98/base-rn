// Action get Info Invoice
export const GET_INFO_INVOICE = 'GET_INFO_INVOICE';
// Action get Info Customer
export const CUSTOMER_DETAIL = 'CUSTOMER_DETAIL';
// Action get Production list
export const PRODUCTION_LIST = 'PRODUCTION_LIST';
// Type Bonus
export const BONUS = 'BONUS';
// Type Sum Money
export const SUM_MONEY = 'SUM_MONEY';
// Type add Note
export const NOTE_ACTION = 'NOTE_ACTION';
// Type reset store Invoice
export const RESET_ACTION = 'RESET_ACTION';
// Type add customer
export const GET_INFO_CUSTOMER = 'GET_INFO_CUSTOMER';
// ----------------------------------------//
// Type get data Einvoice
export const TYPE_GET_DATA_EINVOICE = 'TYPE_GET_DATA_EINVOICE';
// Type clear Einvoice
export const TYPE_CLEAR_DATA_EINVOICE = 'TYPE_CLEAR_DATA_EINVOICE';
// Type change mẫu số Einvoice
export const TYPE_CHANGE_MAUSO_EINVOICE = 'TYPE_CHANGE_MAUSO_EINVOICE';
// Type change hình thức thanh toán
export const TYPE_CHANGE_HTTT_EINVOICE = 'TYPE_CHANGE_HTTT_EINVOICE';
// Type update Tên  ngân hàng bên mua
export const TYPE_UPDATE_BANK_NAME = 'TYPE_UPDATE_BANK_NAME';
//  Type update STK ngân hàng bên mua
export const TYPE_UPDATE_BANK_STK = 'TYPE_UPDATE_BANK_STK';
// Type update thông tin khach hàng từ danh sách khách hàng
export const TYPE_UPDATE_CUSTOMER_INFO = 'TYPE_UPDATE_CUSTOMER_INFO';
// Type update họ tên người mua hàng
export const TYPE_UPDATE_CUSTOMER_NAME = 'TYPE_UPDATE_CUSTOMER_NAME';
// Type update mã số thuế người mua hàng
export const TYPE_UPDATE_CUSTOMER_MST = 'TYPE_UPDATE_CUSTOMER_MST';
// Type update tên đơn vị người mua hàng
export const TYPE_UPDATE_CUSTOMER_NAME_DV = 'TYPE_UPDATE_CUSTOMER_NAME_DV';
// Type update điện thoại người mua hàng
export const TYPE_UPDATE_CUSTOMER_SDT = 'TYPE_UPDATE_CUSTOMER_SDT';
// Type update email người mua hàng
export const TYPE_UPDATE_CUSTOMER_EMAIL = 'TYPE_UPDATE_CUSTOMER_EMAIL';
// Type update  địa chỉ người mua hàng
export const TYPE_UPDATE_CUSTOMER_ADDRESS = 'TYPE_UPDATE_CUSTOMER_ADDRESS';
// TYPE add dòng hàng hoá đơn GTGT
export const TYPE_ADD_DONGHANG = 'TYPE_ADD_DONGHANG';
// Type add  đầy đủ thông tin hoá đơn
export const TYPE_ADD_INFO_INVOICE = 'TYPE_ADD_INFO_INVOICE';
// Type change tiền tệ
export const TYPE_CHANGE_TIENTE = 'TYPE_CHANGE_TIENTE';
// Type update tổng tiền trên hoá đơn
export const TYPE_SUM_MONEY = 'TYPE_SUM_MONEY';
// Type update ghi chu hoa don
export const TYPE_UPDATE_NOTE_INVOICE = 'TYPE_UPDATE_NOTE_INVOICE';
// Type update string tổng tiền
export const TYPE_UPDATE_MONEY_STRING = 'TYPE_UPDATE_MONEY_STRING';
// Type delete dòng hàng
export const TYPE_DELETE_DONG_HANG = 'TYPE_DELETE_DONG_HANG';
// Type update bên mua mã
export const TYPE_UPDATE_BEN_MUA_MA = 'TYPE_UPDATE_BEN_MUA_MA';
// Type update dòng hàng
export const TYPE_UPDATE_PRODUCT = 'TYPE_UPDATE_PRODUCT';
//Type update triết khấu tổng hoá đơn 
export const TYPE_UPDATE_TRIETKHAU_TONG = 'TYPE_UPDATE_TRIETKHAU_TONG';

// Action Get INFO_INVOICE
export function INFO_INVOICE(data) {
  return {type: GET_INFO_INVOICE, payload: data};
}
// Action Clear INVOICE STORE
export function CLEAR_INVOICE() {
  return {type: RESET_ACTION};
}

// Action get Info Customer
export function INFO_CUSTOMER(data) {
  return {type: GET_INFO_CUSTOMER, payload: data};
}

// Action get date Einvoice
export function GET_DATA_EINVOICE(data) {
  return {
    type: TYPE_GET_DATA_EINVOICE,
    payload: data,
  };
}

// Action Clear EINVOICE STORE
export function CLEAR_EINVOICE() {
  return {type: TYPE_CLEAR_DATA_EINVOICE};
}

// Action modify mẫu hoá đơn trên store
export function CHANGE_MAUSO_HD(data) {
  return {type: TYPE_CHANGE_MAUSO_EINVOICE, payload: data};
}
// Action update hình thức thanh toán
export function CHANGE_HinhThucTinhToan(data) {
  return {
    type: TYPE_CHANGE_HTTT_EINVOICE,
    payload: data,
  };
}
// Action update tên ngân hàng bên mua
export function UPDATE_BANK_NAME(data) {
  return {
    type: TYPE_UPDATE_BANK_NAME,
    payload: data,
  };
}

// Action update số tai khoản ngân hàng bên mua
export function UPDATE_BANK_STK(data) {
  return {
    type: TYPE_UPDATE_BANK_STK,
    payload: data,
  };
}

// Action update thông tin khách hàng lên store
export function UPDATE_CUSTOMER_INFO(data) {
  return {
    type: TYPE_UPDATE_CUSTOMER_INFO,
    payload: data,
  };
}

// Action update họ và tên người mua hàng
export function UPDATE_CUSTOMER_NAME(data) {
  return {
    type: TYPE_UPDATE_CUSTOMER_NAME,
    payload: data,
  };
}
// Action update mã số thuế người mua hàng
export function UPDATE_CUSTOMER_MST(data) {
  return {
    type: TYPE_UPDATE_CUSTOMER_MST,
    payload: data,
  };
}

// Action update tên đơn đơn vị người mua hàng
export function UPDATE_CUSTOMER_NAME_DV(data) {
  return {
    type: TYPE_UPDATE_CUSTOMER_NAME_DV,
    payload: data,
  };
}
// Action update Số ĐT  người mua hàng
export function UPDATE_CUSTOMER_SDT(data) {
  return {
    type: TYPE_UPDATE_CUSTOMER_SDT,
    payload: data,
  };
}
// Action update Email người mua hàng
export function UPDATE_CUSTOMER_EMAIL(data) {
  return {
    type: TYPE_UPDATE_CUSTOMER_EMAIL,
    payload: data,
  };
}

// Action update mã đơn vị của bên mua
export function UPDATE_BEN_MUA_MA(data) {
  return {
    type: TYPE_UPDATE_BEN_MUA_MA,
    payload: data,
  };
}

// Action update Địa chỉ người mua hàng
export function UPDATE_CUSTOMER_ADDRESS(data) {
  return {
    type: TYPE_UPDATE_CUSTOMER_ADDRESS,
    payload: data,
  };
}

// Action add dòng hàng hoá đơn GTGT
export function ADD_DONGHANG(data) {
  return {
    type: TYPE_ADD_DONGHANG,
    payload: data,
  };
}

// Action add thông tin hoá đơn
export function ADD_INFOR_INVOICE(data) {
  return {
    type: TYPE_ADD_INFO_INVOICE,
    payload: data,
  };
}
// Action change tiền tệ
export function CHANGE_DONG_TIEN(data) {
  return {
    type: TYPE_CHANGE_TIENTE,
    payload: data,
  };
}

// Action caculate "tổng tiền, vat 5, vat 10,cộng tiền hàng"
export function UPDATE_SUM_MONEY(data) {
  return {
    type: TYPE_SUM_MONEY,
    payload: data,
  };
}

// Action update ghi chú
export function UPDATE_NOTE_INVOICE(data) {
  return {
    type: TYPE_UPDATE_NOTE_INVOICE,
    payload: data,
  };
}

// Action đọc tổng tiền
export function UPDATE_MONEY_STRING(data) {
  return {
    type: TYPE_UPDATE_MONEY_STRING,
    payload: data,
  };
}

// Action delete dòng hàng
export function DELETE_PRODUCT(data) {
  return {
    type: TYPE_DELETE_DONG_HANG,
    payload: data,
  };
}

// Action update dòng hàng
export function UPDATE_PRODUCT(data) {
  return {
    type: TYPE_UPDATE_PRODUCT,
    payload: data,
  };
}

// Action thêm triết khấu tổng
 export function UPDATE_TRIETKHAU_TONG(data){
   return{
     type:TYPE_UPDATE_TRIETKHAU_TONG,
     payload:data
   }
 }
