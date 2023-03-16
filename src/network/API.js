/**
 * Khai báo tất cả API của App
 */

import axios from 'axios';
import { AppConfig, Env } from '@constant';

import * as UnauthorizeInterceptor from './interceptors/unauthorize.js';
import * as LogInterceptor from './interceptors/log';
import * as AccessTokenInterceptor from './interceptors/accessToken';
import { LocalStorage } from '@data';

import _ from 'lodash';

const getInstance = env => {
  const instance = axios.create({
    baseURL: AppConfig.API_BASE_URL[env],
    timeout: 30000,
  });

  instance.interceptors.response.use(
    UnauthorizeInterceptor.onFullfilled,
    UnauthorizeInterceptor.onRejected,
  );

  instance.interceptors.request.use(
    LogInterceptor.requestLog,
    LogInterceptor.requestError,
  );

  instance.interceptors.response.use(
    LogInterceptor.responseLog,
    LogInterceptor.responseError,
  );

  instance.interceptors.request.use(
    AccessTokenInterceptor.addAccessToken,
    AccessTokenInterceptor.onRejected,
  );
  return instance;
};

const API = {
  env: Env.prod,
  instance: getInstance(Env.prod),
  allowChangeServer: false,
};

API.switchEnv = env => {
  API.env = env || Env.prod;
  API.instance = getInstance(API.env);
  LocalStorage.set('env', env);
};

LocalStorage.get('env', (error, result) => {
  if (!error) {
    API.env = result || Env.prod;
    API.instance = getInstance(API.env);
  }
});

// API đăng nhập người dùng
API.login = params => {
  return API.instance.post('/Login/Login', params);
};
// API lấy thông tin người dùng
API.getUserInfo = () => {
  return API.instance.get('/ThongTin/ThongTinTaiKhoan');
};
// API lấy tổng tiền sử dụng hoá đơn
API.TongTienHoaDon = () => {
  return API.instance.post('/BaoCao/TongTienHoaDon');
};
// API lấy thông tin trạng thái sử dụng hoá đơn
API.TrangThaiHoaDon = () => {
  return API.instance.post('/BaoCao/TrangThaiHoaDon');
};
// API lấy thông tin sử dụng hoá đơn
API.TinhHinhSuDungHoaDon = params => {
  return API.instance.post('/BaoCao/TinhHinhSuDungHoaDon', params);
};
// API lấy thông tin biểu đồ
API.HoaDonMauSoKyHieu = params => {
  return API.instance.get(
    `/BaoCao/HoaDonMauSoKyHieu?loaiBieuDo=${params.loaiBieuDo}&valueTime=${params.valueTime
    }`,
  );
};

// API lấy danh sách hoá đơn điện tử
API.DanhSachHDDT = params => {
  return API.instance.get(
    `/HoaDonGTGT/DanhSachHoaDonDienTu?curentPage=${params.page
    }&matrangthaihoadon=${params.matrangthaihoadon}&txtSearch=${params.txtSearch
    }&endDate=${params.endDate}&startDate=${params.startDate}&mauSo=${params.mauSo}&kyHieu=${params.kyHieu}`,
  );
};
// API lấy mã OTP
API.getOTP = params => {
  return API.instance.post('/Login/GetOTP', params);
};

// API thay đổi mã PIN xuất hoá đơn
API.updatePIN = params => {
  return API.instance.post('ThongTin/UpdatePin', params);
};

API.forgotPass = params => {
  return API.instance.post('/Login/ForgotPass', params);
};
// API đổi mật khẩu
API.changePass = params => {
  return API.instance.post('/Login/ChangePass', params);
};
// API lấy danh sách mã mẫu
API.FromSerialByUser = () => {
  return API.instance.get('/HoaDonGTGT/FromSerialByUser');
};

API.Payment = () => {
  return API.instance.get('/HoaDonGTGT/Payment');
};
// API lấy danh sách loại tiền tệ sử dụng
API.Currency = () => {
  return API.instance.get('/HoaDonGTGT/Currency');
};
// API lấy danh sách các loại thuế VAT
API.PercentVAT = () => {
  return API.instance.get('/HoaDonGTGT/PercentVAT');
};

// WTF end point API
API.ProductList = params => {
  return API.instance.get(
    `/HoaDonGTGT/Goods?curentPage=${params.currentPage} &txtSearch=${params.txtSearch
    }`,
  );
};

// API get thông tin hoá đơn dùng cho việc tạo mới hoá đơn
API.HoaDonDienTu = () => {
  return API.instance.get('/HoaDonGTGT/GetHoaDonDienTu');
};

// API get thông tin hoá đơn dùng cho edit Einvoice
API.getHoaDonDienTu = params => {
  return API.instance.get(
    `/HoaDonGTGT/GetHoaDonDienTu?hoadonid=${params.hoadonid}`,
  );
};

// API lưu hoá đơn GTGT
API.saveHoaDonDienTu = params => {
  return API.instance.post('/HoaDonGTGT/SaveHoaDonDienTu', params);
};

// API lấy danh sách đơn vị đo hàng hoá
API.Units = params => {
  return API.instance.get(
    `/HoaDonGTGT/Units?curentPage=${params.currentPage}&pagecount=20&txtSearch=${params.txtSearch
    }`,
  );
};

// API xuất hoá đơn điện tử
API.exportInvoice = params => {
  return API.instance.get(
    `/HoaDonGTGT/ExportInvoice?dhoadonid=${params.dhoadonid}`,
  );
};

// API xem trước hoá đơn
API.viewInvoice = params => {
  return API.instance.get(`HoaDonGTGT/ViewHoaDon?idHoaDon=${params.idHoaDon}`);
};

// API delete hoá đơn
API.deleteInvoice = params => {
  return API.instance.post(
    `HoaDonGTGT/DeleteHoaDonDienTu?dhoadonid=${params.dhoadonid}`,
  );
};
// API đọc tiền
API.readMoney = params => {
  return API.instance.get(
    `HoaDonGTGT/DocTienVietNamDong?tongtien=${params.tongtien}`,
  );
};

// API danh sách báo cáo
API.getReports = params => {
  return API.instance.get(
    `BaoCao/BaoCaoBanHang?curentPage=${params.currentPage}&tenKhachHang=${params.tenKhachHang
    }&endDate=${params.endDate}&startDate=${params.startDate}`,
  );
};
// API danh sách email
API.DanhSachEmail = params => {
  return API.instance.get(
    `Email/DanhSachEmail?curentPage=${params.page}&statusEmail=${params.statusEmail
    }
    &startDate=${params.startDate}&endDate=${params.endDate}&txtSearch=${params.txtSearch
    }`,
  );
};

// API send email
API.SendEinvoice = params => {
  return API.instance.post(
    `Email/SendMail?idHoadon=${params.dhoadonid}&listEmail=${params.listEmail
    }&isSendMailDraft=${params.isSendMailDraft} `,
  );
};

// API view detail Email
API.viewEmail = hoaDonId => {
  return API.instance.get(`Email/ViewInfoEmail?idHoadon=${hoaDonId}`);
};
// API KeyEncryptInvoice
API.keyEncryptInvoice = params => {
  return API.instance.get(
    `HoaDonGTGT/KeyEncryptInvoice?idHoaDon=${params.idHoaDon}`,
  );
};

// get info MST from Tax
API.GetInformationByTaxcode = params => {
  return API.instance.get(
    `HoaDonGTGT/GetInformationByTaxcode?mstString=${params.mst}`,
  );
};

// API lấy danh sách khách hàng
API.Partner = params => {
  return API.instance.get(
    `/KhachHang/GetAllDoiTac?curentPage=${params.currentPage}&pagecount=20&txtSearch=${params.txtSearch
    }`,
  );
};

// get KhachHang
API.getAllDoiTac = params => {
  return API.instance.get(
    `/KhachHang/GetAllDoiTac?curentPage=${params.page}&pagecount=20&txtSearch=${params.txtSearch
    }`,
  );
};
API.detailDoiTac = params => {
  return API.instance.get(
    `/KhachHang/DetailDoiTac?iddoitac=${params.iddoitac}`,
  );
};
API.deleteDoitac = params => {
  return API.instance.get(
    `/KhachHang/DeleteDoitac?iddoitac=${params.iddoitac}`,
  );
};
API.getAllHangHoa = params => {
  return API.instance.get(
    `/HangHoa/GetAllHangHoa?curentPage=${params.page}&txtSearch=${params.txtSearch
    }`,
  );
};
API.saveDoiTac = params => {
  return API.instance.post(`/KhachHang/SaveDoiTac`, params);
};
API.loaiHang = params => {
  return API.instance.get(
    `/LoaiHang/GetAllLoaiHang?curentPage=${params.curentPage}&txtSearch=${params.txtSearch
    }`,
  );
};
API.saveHangHoa = params => {
  return API.instance.post(`/HangHoa/SaveHangHoa`, params);
};
API.detailHangHoa = params => {
  return API.instance.get(
    `/HangHoa/DetailHangHoa?idhanghoa=${params.idhanghoa}`,
  );
};
API.deleteHangHoa = params => {
  return API.instance.get(
    `/HangHoa/DeleteHangHoa?idhanghoa=${params.idhanghoa}`,
  );
};
API.saveDonViTinh = params => {
  return API.instance.post(`/DonViTinh/CreateorEdit`, params);
};
API.saveLoaihang = params => {
  return API.instance.post(`/LoaiHang/SaveLoaiHang`, params);
};

// API Danh sách đơn vị tính
API.DanhSachDonViTinh = params => {
  return API.instance.get(
    `DonViTinh/GetALL?curentPage=${params.page}&txtSearch=${params.txtSearch}`,
  );
};

// API xoá đơn vị tính
API.XoaDonViTinh = params => {
  return API.instance.get(`DonViTinh/Delete?id=${params.id}`);
};

// API Thông tin đơn vị tính
API.ThongTinDonViTinh = params => {
  return API.instance.get(`DonViTinh/GetDetail?id=${params.id}`);
};

// API Lưu thông tin đơn vị tính
API.luuDonViTinh = params => {
  return API.instance.post('DonViTinh/CreateorEdit', params);
};

// API Danh sách hình thức thanh toán
API.DanhSachHinhThucThanhToan = params => {
  return API.instance.get(
    `HinhThucThanhToan/GetALL?curentPage=${params.page}&txtSearch=${params.txtSearch
    }`,
  );
};
// API Xoá hình thức thanh toán
API.XoaHinhThucThanhToan = params => {
  return API.instance.get(`HinhThucThanhToan/Delete?id=${params.id}`);
};

// API Thông tin hình thức thanh toán
API.ThongTinHinhThucThanhToan = params => {
  return API.instance.get(`HinhThucThanhToan/GetDetail?id=${params.id}`);
};

// API Lưu hình thức thanh toán
API.luuHinhThucThanhToan = params => {
  return API.instance.post('HinhThucThanhToan/CreateorEdit', params);
};

// API Danh sách tiền thanh toán
API.DanhSachTienThanhToan = params => {
  return API.instance.get(
    `TienThanhToan/GetALL?curentPage=${params.page}&txtSearch=${params.txtSearch
    }`,
  );
};

// API Xoá tiền thanh toán
API.XoaTienThanhToan = params => {
  return API.instance.get(`TienThanhToan/Delete?id=${params.id}`);
};

// API Thông tin tiền thanh toán
API.ThongTinTienThanhToan = params => {
  return API.instance.get(`TienThanhToan/GetDetail?id=${params.id}`);
};

// API Lưu tiền thanh toán
API.luuTienThanhToan = params => {
  return API.instance.post('TienThanhToan/CreateorEdit', params);
};

// API Danh sách loại hàng hoá
API.DanhSachLoaiHangHoa = params => {
  return API.instance.get(
    `LoaiHangHoa/GetALL?curentPage=${params.page}&txtSearch=${params.txtSearch
    }`,
  );
};

// API Xoá loại hoàng hoá
API.XoaLoaiHangHoa = params => {
  return API.instance.get(`LoaiHangHoa/Delete?id=${params.id}`);
};

// API Thông tin loại hàng hoá
API.ThongTinLoaiHangHoa = params => {
  return API.instance.get(`LoaiHangHoa/GetDetail?id=${params.id}`);
};

// API Lưu loại hoàng hoá
API.luuLoaiHangHoa = params => {
  return API.instance.post('LoaiHangHoa/CreateorEdit', params);
};

// API lấy thông tin PIN và email được gửi về đâu
API.getInfoPIN = () => {
  return API.instance.get('ThongTin/GetLogFirstPin');
};

// API cập nhật thông tin đã nhận PIN
API.updateReceivePIN = () => {
  return API.instance.get('ThongTin/UpdateLogFirstPin');
};

// API ký số hoá đơn
API.signInvoice = params => {
  return API.instance.get(
    `/KySoHoaDon/SignHoaDon?dhoadonid=${params.dhoadonid}&pinXacNhan=${params.pinXacNhan
    }`,
  );
};

// API danh sách thông điệp gửi CQT
API.listInfoSentToCQT = params => {
  return API.instance.post('/TruyenNhanTVan/DanhSachThongDiepGui', params);
};

// API lấy chi tiết thông điệp gửi CQT
API.detailInfoSentToCQT = params => {
  return API.instance.post(
    `TruyenNhanTVan/ThongDiepGuiThueChiTiet?id=${params.id}`,
  );
};

// API lấy danh sách loại truyền nhận
API.getLoaiTruyenNhan = () => {
  return API.instance.get('/TruyenNhanTVan/GetLoaiTruyenNhan');
};

// API lấy danh sách trạng thái truyền nhận
API.getTrangThaiTruyenNhan = () => {
  return API.instance.get('TruyenNhanTVan/GetTrangThaiTruyenNhan');
};

// API lấy danh sách chuyển lên CQT
API.getDanhSachChuyenLenCQT = params => {
  return API.instance.get(
    `/TruyenNhanTVan/DanhSachChuyenLenCQT?curentPage=${params.page}&endDate=${params.endDate
    }&startDate=${params.startDate}&loaiDanhSach=${params.loaiDanhSach}&mauSo=${params.mauSo
    }&kyHieu=${params.kyHieu}`,
  );
};

// API lấy danh sách mẫu số truyền lên CQT
API.getListMauSo = () => {
  return API.instance.get('/HoaDonGTGT/ListMauSo');
};

// API lấy danh sách ký hiệu truyền lên CQT
API.getListKyHieu = () => {
  return API.instance.get('/HoaDonGTGT/ListKyHieu');
};

// API Lấy thông tin hoá đơn MTT 
API.getInfoHDMTT = (params) => {
  return API.instance.get(`/HoaDonMayTinhTien/CreateOrEdit?idHoaDon=${params.hoadonId}&maLoaiHoaDon=${params.maLoaiHoaDon}`)
}

// API lấy danh sách mã mẫu
API.FromSerialByUserMTT = (params) => {
  return API.instance.get(`/HoaDonGTGT/FromSerialByUser?isMayTT=1&maloaihoadon=${params.maloaihoadon}`);
};

// API tạo hoá đơn MTT
API.createHoaDonMTT = (params) => {
  return API.instance.post('HoaDonMayTinhTien/CreateOrEdit', params)
}
// API xuất hoá đơn MTT
API.exportInvoiceMTT = (params) => {
  return API.instance.get(`HoaDonMayTinhTien/XuatHoaDonMTT?dhoadonid=${params.dhoadonid}`)
}
// API ký số MTT 
API.signInvoiceMTT = (params) => {
  return API.instance.get(`HoaDonMayTinhTien/SignHoaDon?dhoadonid=${params.dhoadonid}&pinXacNhan=${params.pinXacNhan}`)
}
// Danh sách thông báo sai sót
API.DanhSachThongBaoSaiSot = (params) => {
  return API.instance.get(`HoaDonEinvoice/DanhSachThongBao?startDate=${params.startDate}&endDate=${params.endDate}&curentPage=${params.curentPage}&pagecount=${params.pagecount}`)
}

// Xem Thông báo sai sót
API.ViewThongBaoSaiSot = (params) => {
  return API.instance.get(`HoaDonEinvoice/ViewThongBaoSaiSot?id=${params.id}`)
}

// Xem Thông báo sai sót CQT
API.ViewThongBaoSaiSotByCQT = (params) => {
  return API.instance.get(`HoaDonEinvoice/ViewThongBaoSaiSotByCQT?id=${params.id}`)
}

// Xem chi tiết thông báo sai sót
API.ChiTietThongBaoSS = (params) => {
  return API.instance.get(`HoaDonEinvoice/ChiTietThongBaoSS?id=${params.id}`)
}

// Xoá bỏ và tạo thông báo sai sót
API.XoaBoAndCreateThongBao = (params) => {
  return API.instance.post('HoaDonEinvoice/XoaBoAndCreateThongBao', params)
}

// Gửi thông báo sai sót
API.SendThongBaoToCqt = (params) => {
  return API.instance.get(`HoaDonEinvoice/SendThongBaoToCqt?id=${params.id}&pinXacNhan=${params.pinXacNhan}`)
}

// Nhận thông báo từ CQT
API.NhanThongBaoToCqt = (params) => {
  return API.instance.get(`HoaDonEinvoice/NhanThongBaoToCqt?id=${params.id}`)
}

// Fake xoá account
API.xoaAccount = (params) => {
  return API.instance.get('ThongTin/LoadDeleteAccount')
}


/* Export Component ==================================================================== */
export default API;
