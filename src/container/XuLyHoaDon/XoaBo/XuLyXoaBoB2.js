import { View, SafeAreaView, StyleSheet, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppStyles, AppSizes, AppColors } from "../../../theme";
import AppHeader from '../../../components/AppHeader'
import Back from '../../../image/svg/Back.svg';
import { Actions } from 'react-native-router-flux';
import PhieuThongBao from '../component/PhieuThongBao';
import ButtonText from '../../../components/ButtonText';
import _ from 'lodash'
import API from '../../../network/API';
import { SUCCESS_CODE } from '../../../ultil/NetworkHelper';
import { Dlog } from '../../../components';
import XemThongBaoActionSheet from '../../lightbox/XemThongBaoActionSheet';
import DialogLoading from '../../lightbox/DialogLoading';
import GroupButton from '../../../components/GroupButton';
import Reload from '../../../image/svg/Reload.svg';


//Refresh
const XuLyXoaBoB2 = (props) => {
    const { title, formList } = props
    const [thongBao, setThongBao] = useState(null)
    const [thongBaoChiTiet, setThongBaoChiTiet] = useState(null)
    const iShowViewButton = thongBao?.trangThaiTruyenNhan != "0"

    const onGoBack = () => {
        if (formList) {
            return Actions.pop()
        }
        return Actions.listInvoice()
    }

    useEffect(() => {
        if (formList?.dthongbaoSaiSotid) {
            onFetchData(formList?.dthongbaoSaiSotid)
        }
        if (props?.thongBao && props?.thongBaoChiTiet) {
            setThongBao(props?.thongBao)
            setThongBaoChiTiet(props?.thongBaoChiTiet)
        }

    }, [])


    const onFetchData = async (dthongbaoSaiSotid) => {
        try {
            const params = {
                id: thongBao?.dthongbaoSaiSotid || dthongbaoSaiSotid
            }
            const res = await API.ChiTietThongBaoSS(params)
            if (res?.data?.code == SUCCESS_CODE) {
                setThongBao(res?.data?.data?.thongBao)
                setThongBaoChiTiet(res?.data?.data?.thongBaoChiTiet)
                return
            }
            return Alert.alert('Thông báo', res?.data?.desc)
        } catch (error) {
            Alert.alert('Thông báo', 'Không thể kết nối đến hệ thống')
        }
    }

    const onViewTBSaiSot = async () => {
        DialogLoading.show();
        try {
            const params = {
                id: thongBao.dthongbaoSaiSotid
            }
            const res = await API.ViewThongBaoSaiSot(params)
            DialogLoading.hide();
            if (res.data.code == SUCCESS_CODE) {
                const sheet = {
                    title: 'Xem thông báo',
                    hoaDonId: formList?.dthongbaoSaiSotid,
                    imageHoaDon: res?.data?.data,
                    confirmAction: () => {
                        XemThongBaoActionSheet.hide();
                    },
                };
                return XemThongBaoActionSheet.show(sheet)

            }
            return Alert.alert('Thông báo', res?.data?.desc)
        } catch (error) {
            Dlog('error onViewTBSaiSot', error)
            DialogLoading.hide();
        }
    }

    const onViewTbCQT = async () => {
        DialogLoading.show();
        try {
            const params = {
                id: thongBao.dthongbaoSaiSotid
            }
            const res = await API.ViewThongBaoSaiSotByCQT(params)
            DialogLoading.hide();
            if (res.data.code == SUCCESS_CODE) {
                const sheet = {
                    title: 'Xem thông báo',
                    hoaDonId: thongBao.dthongbaoSaiSotid,
                    imageHoaDon: res?.data?.data,
                    confirmAction: () => {
                        XemThongBaoActionSheet.hide();
                    },
                };
                return XemThongBaoActionSheet.show(sheet)

            }
            return Alert.alert('Thông báo', res?.data?.desc)

        } catch (error) {
            DialogLoading.hide();
            Dlog('error onViewTbCQT', error)
        }
    }

    const onSign = () => {
        const data = {
            callbackGetPin: pin => SendThongBaoToCqt(pin),
            subTitle: 'Mật khẩu bảo mật chữ ký số thực hiện xác nhận giao dịch ký số tự động và gửi thông báo sai sót lên Cơ quan thuế.'
        };
        Actions.xacNhanMaPin(data)
    }

    const SendThongBaoToCqt = async (pin) => {
        DialogLoading.show()
        try {
            const params = {
                id: thongBao?.dthongbaoSaiSotid,
                pinXacNhan: pin
            }
            const res = await API.SendThongBaoToCqt(params)
            DialogLoading.hide()
            if (res.data.code == SUCCESS_CODE) {
                return Alert.alert('Thành công', res?.data?.desc, [
                    { text: "Đóng", onPress: () => { onFetchData() } }
                ])
            }
            return Alert.alert('Thông báo', res?.data?.desc)

        } catch (error) {
            DialogLoading.hide()
            Dlog('SendThongBaoToCqt', error)
        }
    }

    const onFetchNoticeCQT = async () => {
        DialogLoading.show();
        try {
            const params = {
                id: thongBao?.dthongbaoSaiSotid,
            }
            const res = await API.NhanThongBaoToCqt(params)
            DialogLoading.hide();
            if (res.data.code == SUCCESS_CODE) {
                return Alert.alert('Thành công', res?.data?.desc, [
                    { text: "Đóng", onPress: () => onFetchData(thongBao?.dthongbaoSaiSotid) }
                ])
            }
            return Alert.alert('Thông báo', res?.data?.desc)

        } catch (error) {
            DialogLoading.hide();
            Dlog('onFetchNoticeCQT', error)
        }
    }

    return (
        <SafeAreaView style={styles.areaView}>
            <View style={styles.container}>
                <AppHeader
                    Icon={Back}
                    backgroundColor={AppColors.blue}
                    titleColor={AppColors.white}
                    iconColor={AppColors.white}
                    title={title || 'Xử lý hóa đơn'}
                    onPressMenu={() => onGoBack()}
                    RightIcon={thongBao?.trangThaiTruyenNhan == 1}
                    IconRight={Reload}
                    onPressRight={() => onFetchNoticeCQT()}

                />

                <View style={{ flex: 1, paddingTop: 10 }}>
                    <PhieuThongBao thongBao={thongBao} thongBaoChiTiet={thongBaoChiTiet} />
                </View>
                <View style={styles.wrapFooter}>
                    {!iShowViewButton && <ButtonText
                        styleTitle={styles.titleButton}
                        onCick={() => onSign?.()}
                        title={_.toUpper('Ký và gửi thông báo sai sót')}
                    />}

                    {iShowViewButton && thongBao?.trangThaiTruyenNhan == 1 && <GroupButton
                        InactiveTitle={'Xem TB sai sót'}
                        ActiveTitle={'Nhận phản hồi CQT'}
                        onClickInactive={() => onViewTBSaiSot()}
                        onClickActive={() => onFetchNoticeCQT()}
                    />}
                    {iShowViewButton && thongBao?.trangThaiTruyenNhan != 1 && <GroupButton
                        InactiveTitle={'Xem TB sai sót'}
                        ActiveTitle={'Xem TB của CQT'}
                        onClickInactive={() => onViewTBSaiSot()}
                        onClickActive={() => onViewTbCQT()}
                    />}
                </View>
            </View>

        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.white
    },
    areaView: {
        ...AppStyles.styleSafeArea
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

});

export default XuLyXoaBoB2