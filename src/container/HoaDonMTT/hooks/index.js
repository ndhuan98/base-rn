import { Alert } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { I18n } from '@constant';
import _, { map } from 'lodash'
import API from '../../../network/API';
import { Dlog } from '../../../components';
import { SUCCESS_CODE } from '../../../ultil/NetworkHelper';
import { statusInvoiceMTT } from '../HelperMTT'
import PreviewActionSheet from '../../lightbox/PreviewActionSheet';
import ActionSheet from '../../lightbox/ActionSheet';
import SendInvoiceMail from '../../lightbox/SendInvoiceMail';


const useInvoiceMTTHooks = (Invoice) => {

    // Hàm xem trước thông tin hoá đơn
    const onReviewInvoice = () => {
        const sheet = {
            title: I18n.t('createInvoiceScreen.xemTruocHoaDon'),
            hoaDonId: Invoice.dhoadonid,
            confirmAction: () => {
                PreviewActionSheet.hide();
            },
            confirmText: I18n.t('createInvoiceScreen.xuatHoaDon'),
        };
        // ActionSheet.hide();
        PreviewActionSheet.show(sheet);
    };

    const onGetInfoHDMTT = async (hoadonId, maLoaiHoaDon) => {
        const params = { hoadonId, maLoaiHoaDon }
        try {
            const res = await API.getInfoHDMTT(params);
            if (res?.data?.code == SUCCESS_CODE) {
                return res.data.data
            }
        } catch (error) {
            Dlog('onGetInfoHDMTT error', error)
        }

    }

    // Hàm gửi hoá đơn
    const onSendInvoice = (Invoice) => {
        const params = {
            hoaDonId: Invoice.dhoadonid,
        };
        SendInvoiceMail.show(params);
    };

    const onReadingMoney = async (tong_thanh_toan) => {
        const params = {
            tongtien: tong_thanh_toan,
        };
        try {
            const res = await API.readMoney(params)
            return {
                tongThanhToanBangChu: res?.data?.convertTien
            }
        } catch (error) {

        }
    }

    const onBackScreen = async () => {
        return Actions.pop();
    };

    const AlertCommon = (mes) => {
        return Alert.alert(
            "Thông báo",
            mes,
            [{ text: "Đóng" }]
        );
    }


    return {
        onReviewInvoice,
        onGetInfoHDMTT,
        onSendInvoice,
        onReadingMoney,
        onBackScreen,
        AlertCommon
    }

}
export { useInvoiceMTTHooks }

