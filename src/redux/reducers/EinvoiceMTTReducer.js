import {
    TYPE_CLEAR_DATA_EINVOICE_MTT_GTGT,
    TYPE_GET_DATA_EINVOICE_MTT_GTGT,
    TYPE_UPDATE_CUSTOMER_MTT_GTGT,
    TYPE_UPDATE_TEMPLATE_CODE_MTT_GTGT,
    TYPE_ADD_HANGHANG_MTT_GTGT,
    TYPE_DOC_TIEN_MTT_GTGT,
    TYPE_DELETE_DONG_HANG_MTT_GTGT,
    TYPE_UPDATE_CHIET_KHAU_MTT_GTGT
} from '../actions/InvoiceMTTAction';

const initialState = {
    HoaDonGTGTMTT: {},
};
import _ from 'lodash';
import { MttCongTienHang, MttTongThanhToan, MttTongVAT10, MttTongVAT5, MttTongVAT8 } from '../../container/HoaDonMTT/HelperMTT';


export default (state = initialState, action) => {
    switch (action.type) {
        case TYPE_GET_DATA_EINVOICE_MTT_GTGT:
            return {
                ...state,
                HoaDonGTGTMTT: {
                    ...action.payload,
                },
            };
        case TYPE_UPDATE_CUSTOMER_MTT_GTGT:
            return {
                ...state,
                HoaDonGTGTMTT: {
                    ...state.HoaDonGTGTMTT,
                    benMuaHoTen: action?.payload?.nguoi_giao_dich,
                    benMuaTenDv: action?.payload?.ten_dv,
                    benMuaMaDv: action?.payload?.ma_dv,
                    benMuaMa: action?.payload?.ma_so_thue,
                    benMuaDienThoai: action?.payload?.dien_thoai,
                    benMuaSoCmt: action?.payload?.can_cuoc_cong_dan,
                    benMuaDiaChi: action?.payload?.dia_chi,
                    benMuaEmail: action?.payload?.email
                }
            }
        case TYPE_UPDATE_TEMPLATE_CODE_MTT_GTGT:
            return {
                ...state,
                HoaDonGTGTMTT: {
                    ...state.HoaDonGTGTMTT,
                    kyHieu: action?.payload?.ky_hieu,
                    isTt68: action?.payload?.is_tt68,
                    maLoaiHoaDon: action?.payload?.ma_loai_hoa_don,
                    mauSo: action?.payload?.mau_so,
                    dphathanhKhoitaoid: action?.payload?.dphathanh_khoitaoid,
                }
            }
        case TYPE_DELETE_DONG_HANG_MTT_GTGT: {
            const nextHoaDonHangs = state.HoaDonGTGTMTT.dHoaDonHangs.filter(item => {
                return !_.isEqual(item, action.payload);
            });
            const tongTienHangNt = _.sumBy(nextHoaDonHangs, 'thanhTien');
            const tongVat5 = MttTongVAT5(nextHoaDonHangs);
            const tongVat8 = MttTongVAT8(nextHoaDonHangs);
            const tongVAT10 = MttTongVAT10(nextHoaDonHangs);
            const tongTienHang = MttCongTienHang(nextHoaDonHangs);
            const tongThanhToan = MttTongThanhToan(tongTienHang, tongVat5, tongVAT10, tongVat8) - state?.HoaDonGTGTMTT?.tongChietKhau || 0

            return {
                ...state,
                HoaDonGTGTMTT: {
                    ...state.HoaDonGTGTMTT,
                    dHoaDonHangs: nextHoaDonHangs,
                    tongTienHangNt: tongTienHangNt,
                    tongThanhToan: action?.payload?.tongTienHangNt,
                    tongVat5,
                    tongVat8,
                    tongVat: tongVAT10,
                    tongTienHang,
                    tongThanhToan
                }
            }
        }
        case TYPE_ADD_HANGHANG_MTT_GTGT: {
            const tongVat5 = MttTongVAT5(action?.payload?.dsHangHoa);
            const tongVat8 = MttTongVAT8(action?.payload?.dsHangHoa);
            const tongVAT10 = MttTongVAT10(action?.payload?.dsHangHoa);
            const tongTienHang = MttCongTienHang(action?.payload?.dsHangHoa);
            const tongThanhToan = MttTongThanhToan(tongTienHang, tongVat5, tongVAT10, tongVat8) - state?.HoaDonGTGTMTT?.tongChietKhau || 0

            return {
                ...state,
                HoaDonGTGTMTT: {
                    ...state.HoaDonGTGTMTT,
                    dHoaDonHangs: action?.payload?.dsHangHoa,
                    tongTienHangNt: action?.payload?.tongTienHangNt,
                    tongThanhToan: action?.payload?.tongTienHangNt,
                    tongVat5,
                    tongVat8,
                    tongVat: tongVAT10,
                    tongTienHang,
                    tongThanhToan,
                    tongChietKhau: 0,
                    soChietKhau: 0,
                }
            }
        }
        case TYPE_UPDATE_CHIET_KHAU_MTT_GTGT: {
            //tongChietKhau
            //chietKhau
            // const tongThanhToan = MttTongThanhToan(action?.payload?.tongTienHang, state.HoaDonGTGTMTT.tongVat5, state.HoaDonGTGTMTT.tongVat, state.HoaDonGTGTMTT.tongVat8) - action?.payload?.tongChietKhau
            return {
                ...state,
                HoaDonGTGTMTT: {
                    ...state.HoaDonGTGTMTT,
                    tongChietKhau: action?.payload?.tongChietKhau,
                    soChietKhau: action?.payload?.soChietKhau,
                    tongThanhToan: action?.payload?.tongThanhToan,
                    tongVat5: action?.payload?.tongVat5,
                    tongVat8: action?.payload?.tongVat8,
                    tongVat: action?.payload?.tongVat
                }
            }
        }

        case TYPE_DOC_TIEN_MTT_GTGT:
            return {
                ...state,
                HoaDonGTGTMTT: {
                    ...state.HoaDonGTGTMTT,
                    tongThanhToanBangChu: action?.payload?.tongThanhToanBangChu
                }
            }
        // Xử lý dọn dẹp Eivnoice trên store
        case TYPE_CLEAR_DATA_EINVOICE_MTT_GTGT:
            return {
                ...state, HoaDonGTGTMTT: {}
            };
        default:
            return state;
    }

}