// Khai báo tất cả các màn hình bên trong App

import React, { Component } from 'react';
import {
  Router,
  Stack,
  Drawer,
  Scene,
  Overlay,
  Lightbox,
  ActionConst,
  Tabs,
  Modal,
} from 'react-native-router-flux';

import Launch from '../container/LaunchScreen';
import LoginScreen from '../container/LoginScreen';
import ForgotScreen from '../container/ForgotScreen';
import NewPIN from '../container/NewPIN';

import HomeScreen from '../container/HomeScreen';
import DashboardScreen from '../container/DashboardScreen';
import AccountScreen from '../container/AccountScreen';
import InvoiceListScreen from '../container/InvoiceListScreen';
import SendCQT from '../container/SendCQT';

import MenuLeftHookScreen from '../container/MenuLeftHook';
import SelectFormScreen from '../container/invoiceForm/SelectFormScreen';
import CreateInvoiceScreen from '../container/invoiceCreate/CreateInvoiceScreen';

import HoaDonGTGT from '../container/HoaDonMTT/HoaDonGTGT';
import KyHieuMauHoaDon from '../container/HoaDonMTT/KyHieuMauHoaDon';
import DSKhachHangDoiTac from '../container/HoaDonMTT/DSKhachHangDoiTac';
import ThongTinNguoiMuaHang from '../container/HoaDonMTT/ThongTinNguoiMuaHang';
import DSHangHoaDichVu from '../container/HoaDonMTT/DSHangHoaDichVu';


import HoaDonBH from '../container/HoaDonMTT/HoaDonBH';
import RenameInvoiceScreen from '../container/invoiceForm/RenameInvoiceScreen';
import EditInvoiceScreen from '../container/invoiceForm/EditInvoiceSreen';
import Dialog from '../container/lightbox/Dialog';
import DialogSuccess from '../container/lightbox/DialogSuccess';
import InforInvoiceCreate from '../container/invoiceForm/InforInvoiceCreate';
import ActionSheet from '../container/lightbox/ActionSheet';
import DrawerAction from '../container/lightbox/DrawerAction';
import PreviewActionSheet from '../container/lightbox/PreviewActionSheet';
import ProductListScreen from '../container/lightbox/ProductListScreen';
import TutorialScreen from '../container/invoiceSteps/TutorialScreen';
import CreateReleaseScreen from '../container/invoiceRelease/CreateReleaseScreen';
import StartReleaseScreen from '../container/invoiceRelease/StartReleaseScreen';
import SubmitForAgency from '../container/invoiceRelease/SubmitForAgency';
import StartUsedEnvoiceSceen from '../container/invoiceRelease/StartUsedEnvoiceSceen';
import AroundNumberEnvoiceScreen from '../container/invoiceRelease/AroundNumberEnvoiceScreen';
import ChangePasswordScreen from '../container/ChangePasswordScreen';
import FilterInvoiceScreen from '../container/invoiceForm/FilterInvoiceScreen';
import NewPasswordScreen from '../container/NewPasswordScreen';
import CustomTabBar from './CustomTabBar';
import EditProduct from '../container/invoiceCreate/EditProduct';
import UnitListScreen from '../container/lightbox/UnitListScreen';
import CustomerList from '../container/lightbox/CustomerList';
import DrawerLoaHang from '../container/lightbox/DrawerLoaiHang';
import ReportScreen from '../container/ReportScreen';
import ProcessEinvoice from '../container/lightbox/ProcessEinvoiceSheet';

import FilterReport from '../container/lightbox/FilterReport';
import FilterSendInvoiceCQT from '../container/lightbox/FilterSendInvoiceCQT';
import FilterMoveInvoiceCQT from '../container/lightbox/FilterMoveInvoiceCQT';

import ReportDetail from '../container/lightbox/ReportDetail';
import InvoiceHelpScreen from '../container/InvoiceHelpScreen';
import MailListScreen from '../container/MailListScreen';
import SendInvoiceMail from '../container/lightbox/SendInvoiceMail';
import InvoiceSetting from '../container/InvoiceSetting';
import InvoiceCusmer from '../container/InvoiceCustomer';
import GoodsScreen from '../container/GoodsScreen';
import AddGoods from '../container/invoiceGoods/AddGoods';
import DrawerGoods from '../container/lightbox/DrawerGoods';
import AddCustomer from '../container/invoiceCustomer/AddCustomer';
import ConfirmPass from '../container/lightbox/ConfirmPass';
import DialogLoading from '../container/lightbox/DialogLoading';
import DetailCustomer from '../container/invoiceCustomer/DetailCustomer';
import DetailGoods from '../container/invoiceGoods/DetailGoods';
import DanhSachDVT from '../container/Category/DonViTinh/DanhSachDVT';
import ThongTinDVT from '../container/Category/DonViTinh/ThongTinDVT';
import ThemSuaDVT from '../container/Category/DonViTinh/ThemSuaDVT';

import DanhSachHTTT from '../container/Category/HinhThucThanhToan/DanhSachHTTT';
import ThongTinHTTT from '../container/Category/HinhThucThanhToan/ThongTinHTTT';
import ThemSuaHTTT from '../container/Category/HinhThucThanhToan/ThemSuaHTTT';

import DanhSachTienTT from '../container/Category/TienThanhToan/DanhSachTienTT';
import ThongTinTienTT from '../container/Category/TienThanhToan/ThongTinTienTT';
import ThemSuaTienTT from '../container/Category/TienThanhToan/ThemSuaTienTT';

import DanhSachLHH from '../container/Category/LoaiHangHoa/DanhSachLHH';
import ThongTinLHH from '../container/Category/LoaiHangHoa/ThongTinLHH';
import ThemSuaLHH from '../container/Category/LoaiHangHoa/ThemSuaLHH';

import XacNhanMaPin from '../container/InputOTPScreen';
import InfoSentToCQT from '../container/InfoSentToCQT';
import InfoReceiveToCQT from '../container/InfoReceiveToCQT';

import SendInfoCQTpopup from '../container/lightbox/SendInfoCQTpopup';
import XuLyXoaBoB1 from '../container/XuLyHoaDon/XoaBo/XuLyXoaBoB1';
import XuLyXoaBoB2 from '../container/XuLyHoaDon/XoaBo/XuLyXoaBoB2';
import ThongBaoSaiSot from '../container/XuLyHoaDon/ThongBaoSaiSot';
import DanhSachHoaDonSaiSot from '../container/XuLyHoaDon/ThongBaoSaiSot/DanhSachHoaDonSaiSot';
import DanhSachThongBaoSaiSot from '../container/XuLyHoaDon/ThongBaoSaiSot/DanhSachThongBaoSaiSot';
import LapThongBaoSaiSot from '../container/XuLyHoaDon/ThongBaoSaiSot/LapThongBaoSaiSot';
import XemThongBaoActionSheet from '../container/lightbox/XemThongBaoActionSheet';



// định nghĩa tên các tab menu
const tabName = {
  Home: 'Trang chủ',
  Dashboard: 'Thống kê',
  CreateInvoice: 'Lập HD',
  ListInvoice: 'Danh sách',
  Report: 'Báo cáo',
};

const AppRouter = () => {
  return (
    <Router>
      <Overlay key="overlay">
        <Modal key="modal" hideNavBar>
          <Lightbox key="lightbox">
            <Stack key="root" titleStyle={{ alignSelf: 'center' }} hideNavBar>
              <Scene
                key="launch"
                component={Launch}
                title="Launch"
                initial
                type={ActionConst.RESET}
              />
              <Scene key="login" component={LoginScreen} title="Login" />
              <Scene
                key="forgotPassword"
                component={ForgotScreen}
                title="Forgot Password"
              />
              <Scene
                key="resetPass"
                component={NewPasswordScreen}
                title="Đặt lại mật khẩu"
              />
              <Drawer
                // initial
                type="overlay"
                key="drawer"
                hideNavBar={true}
                drawerPosition="left"
                contentComponent={MenuLeftHookScreen}
                drawerWidth={'75%'}>
                <Stack hideNavBar panHandlers={null}>
                  <Tabs
                    tabBarComponent={CustomTabBar}
                    showLabel={false}
                    key="rootTab"
                    initial
                    backToInitial>
                    <Stack key="Home" hideNavBar title={tabName.Home}>
                      <Scene
                        key="HomeScreen"
                        component={HomeScreen}
                        title="Trang chủ"
                      />
                    </Stack>
                    <Stack
                      key="listInvoice"
                      hideNavBar
                      title={tabName.ListInvoice}>
                      <Scene
                        key="list"
                        component={InvoiceListScreen}
                        title="Danh sách HĐ"
                      />
                    </Stack>
                    <Stack key="Statistic" hideNavBar title={tabName.Dashboard}>
                      <Scene
                        key="DashboardSceen"
                        component={DashboardScreen}
                        title="Thống kê"
                      />
                    </Stack>
                    <Stack key="Report" title={tabName.Report}>
                      <Scene
                        hideNavBar
                        key="reportScreen"
                        component={ReportScreen}
                        title="Báo cáo"
                      />
                    </Stack>
                    <Scene
                      hideNavBar
                      key="sendCQT"
                      component={SendCQT}
                      title="Chuyển cơ quan thuế"
                    />
                  </Tabs>
                  <Scene
                    hideNavBar
                    key="createInvoice"
                    component={CreateInvoiceScreen}
                    title="Lập hoá đơn"
                  />
                  <Scene
                    hideNavBar
                    key="hoaDonGTGTMTT"
                    component={HoaDonGTGT}
                    title="Lập hoá đơn GTGT từ máy tính tiền (có mã)"
                  />

                  <Scene
                    hideNavBar
                    key="hoaDonBHMTT"
                    component={HoaDonBH}
                    title="Lập hoá đơn BH từ máy tính tiền (có mã)"
                  />
                  <Scene
                    hideNavBar
                    key="kyHieuMauHoaDon"
                    component={KyHieuMauHoaDon}
                    title="Ký hiệu mẫu hóa đơn"
                  />
                  <Scene
                    hideNavBar
                    key="DSkhachHangDoiTac"
                    component={DSKhachHangDoiTac}
                    title="DS khách hàng đối tác"
                  />
                  <Scene
                    hideNavBar
                    key="DShangHoaDichVu"
                    component={DSHangHoaDichVu}
                    title="DS hàng hoá dịch vụ"
                  />
                  <Scene
                    hideNavBar
                    key="thongTinNguoiMuaHang"
                    component={ThongTinNguoiMuaHang}
                    title="Thông tin người mua hàng"
                  />
                  <Scene
                    hideNavBar
                    key="thongBaoSaiSot"
                    component={ThongBaoSaiSot}
                    title="Danh sách thông báo sai sót"
                  />
                  <Scene
                    hideNavBar
                    key="XuLyXoaBoB1"
                    component={XuLyXoaBoB1}
                    title="Xử lý hóa đơn"
                  />
                  <Scene
                    hideNavBar
                    key="XuLyXoaBoB2"
                    component={XuLyXoaBoB2}
                    title="Xử lý hóa đơn"
                  />

                  <Scene
                    hideNavBar
                    key="dsHoaDonSaiSot"
                    component={DanhSachHoaDonSaiSot}
                    title="Danh sách hoá đơn sai sót"
                  />
                  <Scene
                    hideNavBar
                    key="dsThongBaoSaiSot"
                    component={DanhSachThongBaoSaiSot}
                    title="Danh sách thông báo sai sót"
                  />
                  <Scene
                    hideNavBar
                    key="lapThongBaoSaiSot"
                    component={LapThongBaoSaiSot}
                    title="Lập thông báo sai sót"
                  />

                  <Scene
                    hideNavBar
                    key="accountSceen"
                    component={AccountScreen}
                    title="Tài khoản"
                  />
                  {/* Màn Hình Quản lý email và help*/}
                  <Scene
                    hideNavBars
                    key="mailListScreen"
                    component={MailListScreen}
                    title="Quản lý gửi email"
                  />
                  <Scene
                    hideNavBar
                    key="invoiceHelpScreen"
                    component={InvoiceHelpScreen}
                    title="Câu hỏi thường gặp"
                  />
                  {/*Màn hình cài đặt */}
                  <Scene
                    hideNavBar
                    key="invoiceSetting"
                    component={InvoiceSetting}
                    title="Cài đặt"
                  />
                  <Scene
                    hideNavBar
                    key="changePIN"
                    component={NewPIN}
                    title="Đổi ma"
                  />
                  {/*Các màn hình danh mục*/}
                  <Scene
                    hideNavBar
                    key="invoiceCusmer"
                    component={InvoiceCusmer}
                    title="Danh mục khách hàng,đối tác"
                  />
                  <Scene
                    hideNavBar
                    key="goodsScreen"
                    component={GoodsScreen}
                    title="Danh mục hàng hóa dịch vụ"
                  />
                  {/* Đơn vị tính */}
                  <Scene
                    hideNavBar
                    key="donViTinh"
                    component={DanhSachDVT}
                    title="Đơn vị tính"
                  />
                  <Scene
                    hideNavBar
                    key="thongTinDonViTinh"
                    component={ThongTinDVT}
                    title="Thông tin đơn vị tính"
                  />
                  <Scene
                    hideNavBar
                    key="themSuaDonViTinh"
                    component={ThemSuaDVT}
                    title="Thêm sửa đơn vị tính"
                  />
                  {/* hình thức thanh toán */}
                  <Scene
                    hideNavBar
                    key="hinhThucThanhToan"
                    component={DanhSachHTTT}
                    title="Hình thức thanh toán"
                  />
                  <Scene
                    hideNavBar
                    key="thongTinHinhThucThanhToan"
                    component={ThongTinHTTT}
                    title="Thông tin hình thức thanh toán"
                  />
                  <Scene
                    hideNavBar
                    key="themSuaHinhThucThanhToan"
                    component={ThemSuaHTTT}
                    title="Thêm sửa hình thưc thanh toán"
                  />
                  {/* Tiền thanh toán */}
                  <Scene
                    hideNavBar
                    key="tienThanhToan"
                    component={DanhSachTienTT}
                    title="Tiền thanh toán"
                  />
                  <Scene
                    hideNavBar
                    key="thongTinTienThanhToan"
                    component={ThongTinTienTT}
                    title="Thông tin tiền thanh toán"
                  />
                  <Scene
                    hideNavBar
                    key="themSuaTienThanhToan"
                    component={ThemSuaTienTT}
                    title="Thêm sửa tiền thanh toán"
                  />
                  {/* Loại hàng hoá */}
                  <Scene
                    hideNavBar
                    key="loaiHangHoa"
                    component={DanhSachLHH}
                    title="Loại hàng hoá"
                  />
                  <Scene
                    hideNavBar
                    key="thongTinLoaiHangHoa"
                    component={ThongTinLHH}
                    title="Thông tin loại hàng hoá"
                  />
                  <Scene
                    hideNavBar
                    key="themSuaLoaiHangHoa"
                    component={ThemSuaLHH}
                    title="Thêm sửa loại hàng hoá"
                  />

                  {/* Danh sách thông điệp gửi */}
                  <Scene
                    hideNavBar
                    key="thongDiepGui"
                    component={InfoSentToCQT}
                    title="Thông điệp gửi"
                  />
                  {/* Danh sách thông điệp nhận */}
                  <Scene
                    hideNavBar
                    key="thongDiepNhan"
                    component={InfoReceiveToCQT}
                    title="Thông điệp nhận"
                  />
                </Stack>

                <Scene
                  hideNavBar
                  key="selectForm"
                  component={SelectFormScreen}
                  title="Khởi tạo mẫu hoá đơn"
                />
                <Scene
                  hideNavBar
                  key="renameForm"
                  component={RenameInvoiceScreen}
                  title="Đặt tên hoá đơn"
                />
                <Scene
                  hideNavBar
                  key="editForm"
                  component={EditInvoiceScreen}
                  title="Tuỳ chỉnh hoá đơn"
                />
                <Scene
                  hideNavBar
                  key="inforForm"
                  component={InforInvoiceCreate}
                  title="Thông tin hoá đơn"
                />
                <Scene
                  hideNavBar
                  key="steps"
                  component={TutorialScreen}
                  title="Hướng dẫn sử dụng"
                />
                <Scene
                  hideNavBar
                  key="releaseEnvoice"
                  component={CreateReleaseScreen}
                  title="Lập quyết định áp dụng"
                />
                <Scene
                  hideNavBar
                  key="startReleaseEnvoice"
                  component={StartReleaseScreen}
                  title="Tạo mới lần phát hành"
                />
                <Scene
                  hideNavBar
                  key="submitAgency"
                  component={SubmitForAgency}
                  title="Nộp bộ hồ sơ cho cơ quan thuế"
                />
                <Scene
                  hideNavBar
                  key="startUse"
                  component={StartUsedEnvoiceSceen}
                  title="Bắt đầu sử dụng hoá đơn"
                />
                <Scene
                  hideNavBar
                  key="aroundNumber"
                  component={AroundNumberEnvoiceScreen}
                  title="Bắt đầu sử dụng hoá đơn"
                />
                <Scene
                  hideNavBar
                  key="changePassword"
                  component={ChangePasswordScreen}
                  title="Đổi mật khẩu"
                />
                <Scene
                  hideNavBar
                  key="filterInvoice"
                  component={FilterInvoiceScreen}
                  title="Lọc mẫu hoá đơn"
                />
              </Drawer>
              <Scene key="productEdit" component={EditProduct} />
              <Scene key="addGoods" component={AddGoods} />
              <Scene key="addCustomer" component={AddCustomer} />
              <Scene key="detailCustomer" component={DetailCustomer} />
              <Scene key="detailGoods" component={DetailGoods} />
              <Scene key="xacNhanMaPin" component={XacNhanMaPin} />
            </Stack>
            <Scene key="dialog" component={Dialog} />
            <Scene key="dialogSuccess" component={DialogSuccess} />
            <Scene key="actionSheet" component={ActionSheet} />
            <Scene key="confirmPass" component={ConfirmPass} />
            <Scene key="dialogLoading" component={DialogLoading} />
            <Scene key="actionDrawer" component={DrawerAction} />
            <Scene key="productList" component={ProductListScreen} />
            <Scene key="unitList" component={UnitListScreen} />
            <Scene key="customerList" component={CustomerList} />
            <Scene key="loaiHang" component={DrawerLoaHang} />
            <Scene key="drawerGoods" component={DrawerGoods} />
            <Scene key="actionPreview" component={PreviewActionSheet} />
            <Scene key="xemThongBaoPreview" component={XemThongBaoActionSheet} />

            <Scene key="filterReport" component={FilterReport} />
            <Scene
              key="filterSendInvoiceCQT"
              component={FilterSendInvoiceCQT}
            />
            <Scene
              key="filterMoveInvoiceCQT"
              component={FilterMoveInvoiceCQT}
            />
            <Scene key="reportDetail" component={ReportDetail} />
            <Scene key="sentInfoCQTpopup" component={SendInfoCQTpopup} />
            <Scene key="sendInvoiceMail" component={SendInvoiceMail} />
            <Scene key="processEnivoice" component={ProcessEinvoice} />

          </Lightbox>
        </Modal>
      </Overlay>
    </Router>
  );
};

export default AppRouter;
