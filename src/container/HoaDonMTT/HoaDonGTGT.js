import { View, SafeAreaView, StyleSheet, ScrollView, Alert, FlatList } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { AppColors, AppStyles, AppSizes } from '../../theme';
import { Actions } from 'react-native-router-flux';
import StatusBarTSD from '../../components/StatusBarTSD'
import { I18n } from '@constant';
import AppHeader from '../../components/AppHeader';
import Back from '../../image/svg/Back.svg';
import ButtonText from '../../components/ButtonText';
import _ from 'lodash'
import RowMTT from './components/RowMTT';
import User from '../../image/svg/HoaDonMTT/User.svg'
import RowHangHoaMTT from './components/RowHangHoaMTT';
import SummaryView from './components/SummaryView';
import API from '../../network/API';
import { Dlog } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { SUCCESS_CODE } from '../../ultil/NetworkHelper';
import {
    INFO_INVOICE_MTT_GTGT,
    CLEAR_INFO_INVOICE_MTT_GTGT,
    UPDATE_INFO_CUSTOMER_MTT_GTGT,
    UPDATE_TEMPLATE_CODE_MTT_GTGT,
    ADD_HANGHANG_MTT_GTGT,
    DOC_TIEN_MTT_GTGT,
    DELETE_DONG_HANG_MTT_GTGT
} from '../../redux/actions/InvoiceMTTAction';
import { formatNumber } from '../../ultil/EinvoiceSupport';
import { statusInvoiceMTT, typeHoaDonMTT, typeMaLoaiHoaDonMTT } from './HelperMTT'
import ButtonThree from '../../components/ButtonThree';
import PreviewActionSheet from '../lightbox/PreviewActionSheet';
import ActionSheet from '../lightbox/ActionSheet';
import { useInvoiceMTTHooks } from './hooks'
import GroupButton from '../../components/GroupButton';
import RowInfoMTT from './components/RowInfoMTT';



const HoaDonGTGT = (props) => {
    const dispatch = useDispatch()
    const Invoice = useSelector(state => state?.EinvoiceMTTReducer?.HoaDonGTGTMTT)
    const dsHangHoa = Invoice?.dHoaDonHangs || []
    const {
        onGetInfoHDMTT,
        onReadingMoney,
        onSendInvoice,
        onBackScreen,
        AlertCommon
    } = useInvoiceMTTHooks()

    useEffect(() => {
        const hoadonId = props?.hoaDonId || "0"
        fetchInvoice(hoadonId)
        return () => {
            dispatch(CLEAR_INFO_INVOICE_MTT_GTGT())
        }
    }, [])


    useEffect(() => {
        if (Invoice.tongThanhToan) {
            fetchMoneyString(Invoice.tongThanhToan)
        }

    }, [Invoice.tongThanhToan])


    const fetchInvoice = useCallback(async (hoadonId) => {
        try {
            const data = await onGetInfoHDMTT(hoadonId, typeMaLoaiHoaDonMTT.GTGT)
            dispatch(INFO_INVOICE_MTT_GTGT(data))

        } catch (error) {

        }
    }, [props?.hoaDonId])

    const fetchMoneyString = useCallback(async (tongTienHangNt) => {
        try {
            const data = await onReadingMoney(tongTienHangNt)
            dispatch(DOC_TIEN_MTT_GTGT(data))
        } catch (error) {

        }
    }, [Invoice.tongTienHangNt])


    const checkInputMTT = () => {
        if (_.isEmpty(Invoice.kyHieu) || _.isEmpty(Invoice.mauSo)) {
            return AlertCommon('ký hiệu mẫu hoá đơn không thể bỏ trống')
        }

        // if (_.isEmpty(Invoice.benMuaHoTen)) {
        //     return AlertCommon('Vui lòng nhập thông tin người mua hàng')
        // }

        if (_.isEmpty(Invoice.dHoaDonHangs)) {
            return AlertCommon('Vui lòng nhập thông tin hàng hoá dịch vụ')
        }
        if (Invoice.tongThanhToan < 0) {
            return AlertCommon('Tiền thanh toán là số âm')
        }

        return true
    }



    const onSaveInvoice = async () => {
        const isValidateMTT = checkInputMTT()
        if (isValidateMTT) {
            try {
                const res = await API.createHoaDonMTT(Invoice)
                if (res?.data?.code == SUCCESS_CODE) {
                    const hoadonId = res?.data?.data?.result?.dhoadonid;
                    fetchInvoice(hoadonId)
                    return Alert.alert('Thông báo', res?.data?.desc)
                }
                return Alert.alert('Có lỗi', 'Khởi tạo hoá đơn không thành công')
            } catch (error) {
                Dlog('onSaveInvoice error', error)
            }
        }

    }

    const onPressKyHieu = () => {
        Actions.kyHieuMauHoaDon({
            onSave: (data) => {
                dispatch(UPDATE_TEMPLATE_CODE_MTT_GTGT(data))
            },
            typeHD: typeHoaDonMTT.GTGT
        })
    }

    const onPressThongTin = () => {
        const Customer = {
            dien_thoai_lien_he: Invoice?.benMuaDienThoai,
            ma_dv: Invoice?.benMuaMaDv,
            ma_so_thue: Invoice?.benMuaMa,
            nguoi_giao_dich: Invoice?.benMuaHoTen,
            ten_dv: Invoice?.benMuaTenDv,
            can_cuoc_cong_dan: Invoice?.benMuaSoCmt,
            dia_chi: Invoice?.benMuaDiaChi,
            id_doitac: '',
            email: Invoice?.benMuaEmail
        };

        Actions.thongTinNguoiMuaHang({
            onSave: (data) => {
                dispatch(UPDATE_INFO_CUSTOMER_MTT_GTGT(data))
            },
            Customer: Customer
        })
    }

    const onAddHangHoaDV = () => {
        Actions.DShangHoaDichVu({
            onSave: (data) => {
                dispatch(ADD_HANGHANG_MTT_GTGT(data))
            },
            dHoaDonHangs: Invoice.dHoaDonHangs
        })
    }

    const onDeleteHangHoa = (itemSelected) => {
        return dispatch(DELETE_DONG_HANG_MTT_GTGT(itemSelected))
    }

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
        // ActionSheet.hide()
        PreviewActionSheet.show(sheet);
    };

    const onShowMenuAction = () => {
        const data = [

            {
                title: 'Gửi hóa đơn nháp',
                value: 'Gửi hóa đơn',
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
                    case 'Xem':
                        return onReviewInvoice();
                    case 'Gửi hóa đơn nháp':
                        return onSendInvoice(Invoice);
                    case 'Xóa':
                        return MessageCofirmRemove();
                }
            },
        };
        ActionSheet.show(sheet);
    };

    const onShowMenuExportAction = () => {
        const data = [
            {
                title: 'Gửi hóa đơn',
                value: 'Gửi hóa đơn',
            },
        ];

        const sheet = {
            title: 'Tùy chọn khác',
            dataList: data,
            onSelected: item => {
                switch (item.title) {
                    case 'Xem':
                        return onReviewInvoice();
                    case 'Gửi hóa đơn':
                        return onSendInvoice(Invoice);
                    case 'Xóa':
                        return MessageCofirmRemove();
                }
            },
        };
        ActionSheet.show(sheet);
    };

    const onShowMenuViewAction = () => {
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
                        return onReviewInvoice();
                }
            },
        };
        ActionSheet.show(sheet);
    }


    const onProgressInvoice = () => {
        console.log('onProgressInvoice')
        Actions.XuLyXoaBoB1({
            Dhoadonid: Invoice.dhoadonid
        })
    }

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

    // Hàm xoá hoá đơn
    const onDeleteInvoice = () => {
        const params = {
            dhoadonid: Invoice.dhoadonid,
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

    // Xác nhận xuất hoá đơn
    const onMessageExportInvoice = useCallback(() => {
        return Alert.alert(
            I18n.t('common.notice'),
            I18n.t('createInvoiceScreen.confirmExport'),
            [
                {
                    text: I18n.t('common.thucHien'),
                    onPress: () => onExportInvoice(),
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
    const onExportInvoice = useCallback(() => {
        const params = {
            dhoadonid: Invoice.dhoadonid
        }
        return API.exportInvoiceMTT(params).then(
            res => {
                if (res.data && res.data.code == SUCCESS_CODE) {
                    // Lấy lại thông tin hoá đơn
                    fetchInvoice(params.dhoadonid);
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
    }, [Invoice.dhoadonid]);

    // Xác nhận ký số 
    const onMessageSignInvoice = useCallback(() => {
        return Alert.alert(
            I18n.t('common.notice'),
            I18n.t('createInvoiceScreen.confirmSign'),
            [
                {
                    text: I18n.t('common.thucHien'),
                    onPress: () => SignInvoice(),
                },
                {
                    text: I18n.t('common.skip'),
                    onPress: () => { },
                    style: 'cancel',
                },
            ],
        );
    });

    // Gọi API để ký số hoá đơn
    const SignInvoice = React.useCallback(params => {
        const onGetPin = pin => {
            const data = {
                dhoadonid: Invoice.dhoadonid,
                pinXacNhan: pin,
            };
            return API.signInvoiceMTT(data).then(
                res => {
                    if (res.data && res.data.code == SUCCESS_CODE) {
                        // Lấy lại thông tin hoá đơn
                        fetchInvoice(data.dhoadonid);
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
    }, [Invoice.dhoadonid]);

    const isShowClose = Invoice.trangThaiHoaDon == statusInvoiceMTT.new || Invoice.trangThaiHoaDon == statusInvoiceMTT.saved

    return (
        <SafeAreaView style={AppStyles.styleSafeArea}>
            <StatusBarTSD />
            <AppHeader
                Icon={Back}
                onPressMenu={() => onBackScreen()}
                backgroundColor={AppColors.blue}
                titleColor={AppColors.white}
                iconColor={AppColors.white}
                title={I18n.t('menuLeftScreen.lapHoaDonGTGTMTT')}
                RightText={isShowClose ? 'Ghi' : ''}
                onPressRight={() => onSaveInvoice()}
            />

            <View style={styles.container}>
                <View style={styles.wrapContent}>
                    <View style={styles.wrapKyHieu}>

                        {isShowClose && <RowMTT padding={styles.rowKyHieu}
                            title="Ký hiệu mẫu hóa đơn:"
                            subTitle={`${Invoice?.mauSo}${Invoice?.kyHieu}`}
                            onPress={() => onPressKyHieu?.()}
                        />}
                        {!isShowClose && <RowInfoMTT
                            title="Thông tin hóa đơn:"
                            subTitle={`${Invoice?.mauSo}${Invoice?.kyHieu}`}
                            invoiceHD={Invoice?.soHoaDon}
                            codeCQT={Invoice?.soXacThuc}
                            date={Invoice?.ngayTaoStr}
                            statusProcess={Invoice?.trangThaiDieuChinhStr}
                            statusColor={Invoice?.trangThaiHoaDon == 3 ? AppColors.green : AppColors.blue}
                            status={Invoice?.trangThaiHoaDonString}
                        />}
                        <RowMTT
                            disabled={!isShowClose}
                            title="Thông tin người mua hàng:"
                            subTitle={Invoice?.benMuaHoTen}
                            preTitle={Invoice?.benMuaMa ? Invoice?.benMuaMa : Invoice?.benMuaSoCmt}
                            IconLeft={User}
                            containerStyle={styles.rowTTMH}
                            isRequire={false}
                            onPress={() => onPressThongTin?.()}
                        />
                    </View>
                    <FlatList
                        data={dsHangHoa}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return <RowHangHoaMTT
                                tenHang={item.tenHang}
                                soLuongDonGia={`${item.soLuong} (${item.maDvt}) x ${formatNumber(item.donGia)}`}  //"2 (Hộp) x 240.000"
                                vAT={item?.vat}
                                vatTien={item?.vatTien}
                                tongTien={formatNumber(item.thanhTien)}
                                onClose={() => onDeleteHangHoa(item)}
                                stt={index}
                                isShowClose={isShowClose}
                            />
                        }}
                        ListFooterComponent={() => {
                            return (
                                <View style={{ paddingHorizontal: AppSizes.paddingSml }}>
                                    <SummaryView data={Invoice} onPress={() => onAddHangHoaDV?.()} disabled={!isShowClose} />
                                </View>
                            )
                        }}
                    />

                </View>

                <View style={styles.wrapFooter}>
                    {Invoice.trangThaiHoaDon == statusInvoiceMTT.new && <ButtonText
                        styleTitle={styles.titleButton}
                        onCick={() => onSaveInvoice?.()}
                        title={_.toUpper(I18n.t('common.write'))}
                    />}
                    {Invoice.trangThaiHoaDon == statusInvoiceMTT.saved && <ButtonThree
                        oneDisable={true}
                        oneText="Xuất hoá đơn"
                        twoText="Xem hoá đơn"
                        threeText={'Ghi'}
                        indexActive={0}
                        onClickOne={() => onMessageExportInvoice?.()}
                        onClickTwo={() => onReviewInvoice?.()}
                        onClickThree={() => onSaveInvoice?.()}
                        onClickMenu={() => onShowMenuAction?.()}
                    />}
                    {Invoice.trangThaiHoaDon == statusInvoiceMTT.exported && <ButtonThree
                        oneDisable={true}
                        oneText={'Ký và gửi lên CQT'}
                        twoText={'Xem hoá đơn'}
                        threeText={'Ghi'}
                        indexActive={0}
                        onClickOne={() => onMessageSignInvoice?.()}
                        onClickTwo={() => onReviewInvoice?.()}
                        onClickThree={() => onSaveInvoice?.()}
                        onClickMenu={() => onShowMenuExportAction?.()}
                    />}
                    {Invoice.trangThaiHoaDon == statusInvoiceMTT.signed && <GroupButton
                        InactiveTitle={'Xem hoá đơn'}
                        ActiveTitle={'Gửi hoá đơn'}
                        onClickInactive={() => onReviewInvoice?.()}
                        onClickActive={() => onSendInvoice?.(Invoice)}
                    />}
                    {Invoice.trangThaiHoaDon == statusInvoiceMTT.exportedEndSendCQT && Invoice?.trangThaiDieuChinh == 1 && <ButtonThree
                        oneDisable={true}
                        oneText={'Gửi email HĐ'}
                        twoText={'Xử lý hoá đơn'}
                        threeText={'Ghi'}
                        indexActive={0}
                        onClickOne={() => onSendInvoice?.(Invoice)?.()}
                        onClickTwo={() => onProgressInvoice?.()}
                        onClickThree={() => onSaveInvoice?.()}
                        onClickMenu={() => onShowMenuViewAction?.()}
                    />}
                     {Invoice.trangThaiHoaDon == statusInvoiceMTT.exportedEndSendCQT && Invoice?.trangThaiDieuChinh != 1 && <GroupButton
                        InactiveTitle={'Xem hoá đơn'}
                        ActiveTitle={'Gửi hoá đơn'}
                        onClickInactive={() => onReviewInvoice?.()}
                        onClickActive={() => onSendInvoice?.(Invoice)}
                    />}

                </View>
            </View>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    rowKyHieu: {
        backgroundColor: '#F1F1F1'
    },
    rowTTMH: {
        marginTop: AppSizes.marginSml,
    },
    wrapContent: {
        flex: 1,
    },
    titleButton: {
        ...AppStyles.boldText,
        color: AppColors.white
    },
    wrapFooter: {
        ...AppStyles.shadow,
        backgroundColor: '#FFFFFF',
        padding: AppSizes.paddingSml,
    },
    wrapKyHieu: {
        ...AppStyles.shadow,
        backgroundColor: AppColors.white,
        padding: AppSizes.paddingSml,
        marginTop: AppSizes.marginSml
    },
    wrapHangHoa: {
        flex: 1,
        backgroundColor: AppColors.white,
        marginVertical: AppSizes.marginXXSml,
        paddingHorizontal: AppSizes.paddingSml,
        paddingBottom: 50
    }
});

export default HoaDonGTGT