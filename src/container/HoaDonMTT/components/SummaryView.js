import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddGoods from '../../../image/svg/HoaDonMTT/AddGoods.svg'
import { AppSizes, AppStyles, AppColors } from '../../../theme'
import { formatNumber, TinhVAT } from '../../../ultil/EinvoiceSupport'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_CHIET_KHAU_MTT_GTGT } from '../../../redux/actions/InvoiceMTTAction'
import _ from 'lodash'
import { validateIsNumber } from '../../../ultil/Validater'

const ButtonThemHangHoa = (props) => {
    const { onPress, disabled } = props
    return (
        <TouchableOpacity disabled={disabled} onPress={() => onPress?.()}>
            <View style={styles.buttonThemHangHoa}>
                <View style={styles.wrapIcon}>
                    <AddGoods />
                </View>
                <View style={styles.wrapPrimaryView}>
                    <Text style={styles.textPrimary}>
                        {'Thêm hàng hóa dịch vụ:'}
                    </Text>
                    <Text style={styles.requireText}>
                        *
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const RowTongThanhToan = (props) => {
    const { leftText, rightText } = props
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.titleLeft} >{leftText}</Text>
            <Text style={styles.money}>{rightText}</Text>
        </View>
    )
}


const DividerView = () => {
    return (
        <View style={{ width: '100%', height: 1, backgroundColor: '#F1F1F2', marginVertical: AppSizes.marginSml }} />
    )
}

const SummaryView = (props) => {
    const { onPress, disabled } = props
    const Invoice = useSelector(state => state?.EinvoiceMTTReducer?.HoaDonGTGTMTT)
    const [soChietKhau, setSoChietKhau] = useState(Invoice.soChietKhau || 0)
    const [tienChietKhau, setTienChietKhau] = useState(Invoice.tongChietKhau || 0)
    const data = Invoice
    let isCanAddSumBonus = false;
    let tong_vat_5 = 0;
    let tong_vat_10 = 0;
    let tong_vat_8 = 0;
    const TongVat5 = Invoice.tongVat5;
    const TongVat10 = Invoice.tongVat;
    const TongVat8 = Invoice.tongVat8;
    const tong_tien_hang = Invoice.tongTienHang;
    const dispatch = useDispatch()

    const onPushMoneyToRedux = (value, soChietKhau, tongVat5, tongVat8, tongVat, tongThanhToan) => {
        dispatch(UPDATE_CHIET_KHAU_MTT_GTGT({
            tongChietKhau: value,
            soChietKhau: soChietKhau,
            tongVat5,
            tongVat8,
            tongVat,
            tongThanhToan
        }))
    }

    useEffect(() => {
        console.log('change Invoice', Invoice)
    }, [Invoice])


    if (!_.isEmpty(Invoice.dHoaDonHangs)) {
        const commonVat = Invoice.dHoaDonHangs[0].vat;
        isCanAddSumBonus = _.every(Invoice.dHoaDonHangs, ['vat', commonVat]);
    }

    const onTinhTienChietKhau = (soChietKhau) => {
        if (!validateIsNumber(soChietKhau) || soChietKhau < 0 || soChietKhau > 100) {
            return Alert.alert('Thông báo', "Vui lòng nhập đúng số chiết khấu")
        }
        if (_.isEmpty(Invoice.dHoaDonHangs)) {
            return Alert.alert('Thông báo', 'Vui lòng thêm hàng hoá dịch vụ! ')
        }

        if (!isCanAddSumBonus) {
            return Alert.alert('Thông báo', 'Hóa đơn chỉ được phép chiết khấu khi tất cả các mặt hàng có cùng một loại thuế suất! Vui lòng kiểm tra và thử lại!')
        }
        const tienChietKhauDr = TinhVAT(soChietKhau, data.tongTienHang);
        if (TongVat5 > 0) {
            // hàm tính tiền triết khấu trên thuế vat 5
            tong_vat_5 = (tong_tien_hang - tienChietKhauDr) * (5 / 100);
        }
        if (TongVat8 > 0) {
            // hàm tính tiên tổng vát 8
            tong_vat_8 = (tong_tien_hang - tienChietKhauDr) * (8 / 100);
        }
        if (TongVat10 > 0) {
            // hàm tính tiên tổng vát 10
            tong_vat_10 = (tong_tien_hang - tienChietKhauDr) * (10 / 100);
        }
        const tong_thue = tong_vat_10 + tong_vat_8 + tong_vat_5;
        // tính tổng thanh toán
        const tongThanhToan = tong_tien_hang + tong_thue - tienChietKhauDr;
        setTienChietKhau(tienChietKhauDr)

        setTimeout(() => { onPushMoneyToRedux(tienChietKhauDr, soChietKhau, tong_vat_5, tong_vat_8, tong_vat_10, tongThanhToan) }, 1000)

    }
    const onEndingSoChietKhau = (value) => {
        onTinhTienChietKhau(value)
    }

    const onEndingTienChietKhau = (value) => {
        if (validateIsNumber(value) && value > 0) {
            if (TongVat5 > 0) {
                // hàm tính tiền triết khấu trên thuế vat 5
                tong_vat_5 = (tong_tien_hang - value) * (5 / 100);
            }
            if (TongVat8 > 0) {
                // hàm tính tiên tổng vát 8
                tong_vat_8 = (tong_tien_hang - value) * (8 / 100);
            }
            if (TongVat10 > 0) {
                // hàm tính tiên tổng vát 10
                tong_vat_10 = (tong_tien_hang - value) * (10 / 100);
            }
            const tong_thue = tong_vat_10 + tong_vat_8 + tong_vat_5;
            // tính tổng thanh toán
            const tongThanhToan = tong_tien_hang + tong_thue - value;
            return setTimeout(() => { onPushMoneyToRedux(value, 0, tong_vat_5, tong_vat_8, tong_vat_10, tongThanhToan) }, 1000)
        }
        return Alert.alert('Thông báo', "Vui lòng nhập đúng số chiết khấu")
    }


    return (
        <View style={styles.container}>
            {!disabled && <ButtonThemHangHoa disabled={disabled} onPress={() => onPress?.()} />}
            <View style={styles.congTienHang}>
                <RowTongThanhToan
                    leftText="Cộng tiền hàng: "
                    rightText={formatNumber(data?.tongTienHang)}
                />
                {/* <RowChietKhau leftText="Chiết khấu: " /> */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: AppSizes.marginXXSml }}>
                    <Text style={styles.titleLeft} >{'Chiết khấu:'}</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: AppColors.backgroundGary }}>
                        <TextInput
                            value={soChietKhau.toString()}
                            onChangeText={setSoChietKhau}
                            placeholder='0'
                            style={{ width: 20 }}
                            onEndEditing={(event) => onEndingSoChietKhau(event.nativeEvent.text)}
                        />
                        <Text style={styles.titleLeft}>{'%'}</Text>
                    </View>
                    <TextInput
                        value={tienChietKhau.toString()}
                        onChangeText={setTienChietKhau}
                        placeholder='0'
                        style={[styles.money, {
                            minWidth: 20,
                            textAlign: 'right',
                            borderBottomWidth: 1,
                            borderColor: AppColors.backgroundGary
                        }]}
                        onEndEditing={(event) => onEndingTienChietKhau(event.nativeEvent.text)}

                    />
                </View>

                {data?.tongVat > 0 && <RowTongThanhToan leftText="Tổng tiền VAT (10%) : " rightText={formatNumber(data?.tongVat)} />}
                {data?.tongVat8 > 0 && <RowTongThanhToan leftText="Tổng tiền VAT (8%) : " rightText={formatNumber(data?.tongVat8)} />}
                {data?.tongVat5 > 0 && <RowTongThanhToan leftText="Tổng tiền VAT (5%) : " rightText={formatNumber(data?.tongVat5)} />}
                <DividerView />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.titleSum}>Tổng thanh toán:</Text>
                    <Text style={{
                        ...AppStyles.boldText,
                        fontSize: 16,
                        lineHeight: 18,
                        color: AppColors.blue
                    }}>{formatNumber(data?.tongThanhToan) || '0'}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.titleSum}>Số tiền bằng chữ: </Text>
                    <Text style={styles.titleLeft} numberOfLines={2}> {data?.tongThanhToanBangChu || 'Không đồng'}</Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: AppSizes.marginSml
    },
    buttonThemHangHoa: {
        width: '100%',
        height: 40,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#E9EDF0',
        flexDirection: 'row',
        alignItems: 'center',
        padding: AppSizes.paddingSml,
        alignItems: 'center'
    },
    wrapTitle: {
        flexDirection: 'row'
    },
    wrapPrimaryView: { flexDirection: 'row' },

    textPrimary: {
        ...AppStyles.boldText,
        color: AppColors.blue,
        lineHeight: 20
    },
    requireText: {
        ...AppStyles.baseText,
        color: AppColors.red
    },
    wrapIcon: {
        padding: AppSizes.paddingXXXSml,
        paddingRight: AppSizes.paddingSml
    },
    congTienHang: {
        width: '100%',
        paddingLeft: 40,
        marginTop: AppSizes.marginSml
    },
    titleLeft: {
        ...AppStyles.baseText,
        color: AppColors.black,
        lineHeight: 20,
        flexShrink: 1
    },

    money: {
        ...AppStyles.boldText,
        color: AppColors.black,
        lineHeight: 20
    },
    titleSum: {
        ...AppStyles.boldText,
        fontSize: 15,
        lineHeight: 18,
        color: AppColors.black
    }

});

export default SummaryView