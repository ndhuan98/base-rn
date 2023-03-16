// Định nghĩa mã value các loại hình thức thanh toán
const HTTT_value = {
  tienMat: '01',
  chuyenKhoan: '02',
  theTinDung: '03',
  tmck: '04',
};

// Định nghĩa tên các loại hình thức thanh toán
const HTTT_name = {
  tienMat: 'Tiền mặt',
  chuyenKhoan: 'Chuyển khoản',
  theTinDung: 'Thẻ tín dụng',
  tmck: 'TM/CK',
};

// Hàm trả ra tên hình thức thanh toán khi truyền vào mã hình thức thanh toán
const HinhThucTTHelper = (maHinhThuc) => {
  switch (maHinhThuc) {
    case HTTT_value.tienMat:
      return HTTT_name.tienMat;
    case HTTT_value.chuyenKhoan:
      return HTTT_name.chuyenKhoan;
    case HTTT_value.theTinDung:
      return HTTT_name.theTinDung;
    case HTTT_value.tmck:
      return HTTT_name.tmck;
    default:
      return '';
  }
};

export default HinhThucTTHelper;
