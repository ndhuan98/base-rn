import _ from 'lodash';

const MaVAT = {
  nam: '5',
  muoi: '10',
  tam: '8',
  khong: '0',
  khongChiuThue: '-1',
  khongKeKhaiThue: '-2',
};

const TenVAT = {
  nam: '5%',
  muoi: '10%',
  tam: '8%',
  khong: '0%',
  khongChiuThue: 'Không chịu thuế',
  khongKeKhaiThue: 'Không kê khai thuế',
};

const InvoiceActions = {
  Ghi: 'Ghi',
  XemHD: 'Xem HĐ',
  XuatHD: 'Xuất HĐ',
  GuiHD: 'Gửi HĐ',
};

const InvoiceNameStatus = {
  NhapMoi: 'Nhập mới',
  ChoXuat: 'Chờ xuất',
  DaXuatChuaKy: 'Đã xuất (Chưa ký số)',
  DaXuatDaKy: 'Đã xuất (Đã ký số)',
  DaXuatChoCapMa: 'Đã xuất (Chờ cấp mã)',
  DaXuatDaCapMa: 'Đã xuất (Đã cấp mã)', //Đã xuất (Đã cấp mã) . //Hóa đơn đã xuất (Đã cấp mã)
};

// Số hoá đơn mặc định theo TT78
const NumberInvoiceStarter = 0;

// Tính tổng tiền dòng hàng
function ThanhTienDongHang(soLuong, donGia) {
  if (!soLuong) {
    return 0;
  }
  if (!donGia) {
    return 0;
  }
  return soLuong * donGia;
}

//Tính tiền VAT theo số VAT
function TinhVAT(VAT, tongTien) {
  if (!VAT) return 0;
  let Vat = Number.parseInt(VAT);
  if (Vat < 0) {
    return 0;
  }
  if (!tongTien) {
    return 0;
  }
  return tongTien * (Vat / 100);
}

// Hiển thị tên các thế VAT thông qua mã VAT
function ChuyenMaThanhTenVAT(maVAT) {
  switch (maVAT) {
    case MaVAT.nam:
      return TenVAT.nam;
    case MaVAT.tam:
      return TenVAT.tam;
    case MaVAT.muoi:
      return TenVAT.muoi;
    case MaVAT.khong:
      return TenVAT.khong;
    case MaVAT.khongChiuThue:
      return TenVAT.khongChiuThue;
    case MaVAT.khongKeKhaiThue:
      return TenVAT.khongKeKhaiThue;
    default:
      return;
  }
}

// Hàm tính tồng tiền VAT 5%
function TongVAT5(products) {
  let tongVAT5 = 0;
  let productsWithVat5 = [];
  if (_.isEmpty(products)) {
    return tongVAT5;
  }
  productsWithVat5 = _.filter(products, item => {
    return item.vat == 5;
  });
  tongVAT5 = _.sumBy(productsWithVat5, item => {
    return item.vatTien;
  });
  return tongVAT5;
}

//Hàm tính tổng vat VAT 8%
function TongVAT8(products) {
  let tongVAT8 = 0;
  let productsWithVat8 = [];
  if (_.isEmpty(products)) {
    return tongVAT8;
  }
  productsWithVat8 = _.filter(products, item => {
    return item.vat == 8;
  });
  tongVAT8 = _.sumBy(productsWithVat8, item => {
    return item.vatTien;
  });
  return tongVAT8;
}

// Hàm tính tổng tiền VAT 10%
function TongVAT10(products) {
  let tongVAT10 = 0;
  let productsWithVat10 = [];
  if (_.isEmpty(products)) {
    return tongVAT10;
  }
  productsWithVat10 = _.filter(products, item => {
    return item.vat == 10;
  });
  tongVAT10 = _.sumBy(productsWithVat10, item => {
    return item.vat_tien;
  });
  return tongVAT10;
}

// Hàm cộng tiền hàng
function CongTienHang(products) {
  let congTienHang = 0;
  if (_.isEmpty(products)) {
    return congTienHang;
  }
  congTienHang = _.sumBy(products, item => {
    return item.thanh_tien;
  });
  return congTienHang;
}

// Hàm tính tổng thanh toán
function TongThanhToan(congTienHang, vat5, vat10, vat8) {
  return congTienHang + vat5 + vat10 + vat8;
}

// Hàm tính tổng tiền VAT
function TongTienVAT(vat5, vat10, vat8) {
  let VAT5 = 0;
  let VAT10 = 0;
  let VAT8 = 0;
  if (!vat5) {
    vat5 = VAT5;
  }
  if (!vat10) {
    vat10 = VAT10;
  }
  if (!vat8) {
    vat8 = VAT8;
  }
  return vat5 + vat10 + vat8;
}
// Format number
function formatNumber(n) {
  if (_.isNumber(n)) {
    if (n < 0) {
      let m = n * -1;
      return (
        '-' +
        m.toFixed(0).replace(/./g, function (c, i, a) {
          return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
        })
      );
    }
    return n.toFixed(0).replace(/./g, function (c, i, a) {
      return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c;
    });
  } else {
    return 0;
  }
}

// Hàm render name of  button right on header screen
function GetActionName(type) {
  switch (type) {
    case InvoiceNameStatus.NhapMoi:
      return InvoiceActions.Ghi;
    case InvoiceNameStatus.ChoXuat:
      return InvoiceActions.XuatHD;
    case InvoiceNameStatus.DaXuatDaKy:
      return InvoiceActions.GuiHD;
    case InvoiceNameStatus.DaXuatChuaKy:
      return InvoiceActions.XemHD;
    case InvoiceNameStatus.DaXuatDaCapMa:
      return InvoiceActions.GuiHD;
    case InvoiceNameStatus.DaXuatChoCapMa:
      return InvoiceActions.XemHD;
    default:
      return InvoiceActions.Ghi;
  }
}

const StatusInvoiceSortName = {
  1: "HĐ gốc",
  2: "HĐ bị thay thế",
  3: "HĐ thay thế",
  4: "HĐ bị điều chỉnh",
  5: "HĐ điều chỉnh",
  6: "HĐ bị xóa bỏ",
  9: "HĐ ĐC chiết khấu",
  99: "HĐ bị từ chối"
}

export {
  ThanhTienDongHang,
  TinhVAT,
  ChuyenMaThanhTenVAT,
  TongVAT5,
  TongVAT10,
  TongVAT8,
  CongTienHang,
  TongThanhToan,
  TongTienVAT,
  formatNumber,
  GetActionName,
  InvoiceActions,
  InvoiceNameStatus,
  NumberInvoiceStarter,
  StatusInvoiceSortName
};
