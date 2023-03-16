import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppColors, AppSizes, AppStyles } from '../../../theme';
import CloseRed from '../../../image/svg/HoaDonMTT/CloseRed.svg'
import { formatNumber } from '../../../ultil/EinvoiceSupport';

const RowHangHoaMTT = (props) => {
    const { onClose, tenHang, soLuongDonGia, vAT, tongTien, stt, isShowClose, vatTien } = props
    return (
        <View style={styles.container}>
            <View style={styles.wrapStt}>
                <Text style={styles.sttText}>{stt + 1}</Text>
            </View>
            <View style={styles.wrapCenter}>
                <Text numberOfLines={1} style={styles.titleText} >{tenHang}</Text>
                <Text numberOfLines={1} style={styles.soLuongDonGiaText}>{soLuongDonGia}</Text>
                {vAT > 0 && <View style={styles.wrapVat}>
                    <Text style={styles.vAt}>{`Vat ${vAT}%`}</Text>
                    <Text style={styles.titleText} >{formatNumber(vatTien)}</Text>

                </View>}
            </View>
            <View style={styles.wrapRight}>
                {isShowClose && <TouchableOpacity onPress={() => onClose?.()} style={{ padding: AppSizes.paddingXXXSml }}>
                    <CloseRed />
                </TouchableOpacity>}
                <Text style={styles.priceText} >{tongTien}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 84,
        borderWidth: 1,
        borderRadius: AppSizes.borderRadiusSmall,
        borderColor: '#E9EDF0',
        padding: AppSizes.paddingSml,
        flexDirection: 'row',
        marginTop: AppSizes.marginSml
    },
    wrapStt: {
        marginHorizontal: AppSizes.marginSml,
        width: '5%'
    },
    sttText: {
        ...AppStyles.baseText,
        color: AppColors.black
    },
    wrapCenter: {
        width: '60%',
    },
    wrapRight: {
        width: '30%',
        alignItems: 'flex-end',
    },
    priceText: {
        ...AppStyles.boldText,
        color: AppColors.black,
        lineHeight: 20
    },
    titleText: {
        ...AppStyles.baseText,
        color: AppColors.black,
        lineHeight: 20,
    },
    soLuongDonGiaText: {
        ...AppStyles.baseText,
        lineHeight: 20
    },
    wrapVat: {
        flexDirection: 'row'
    },
    vAt: {
        ...AppStyles.baseText,
        fontSize: 12,
        color: AppColors.blueBackground,
        borderWidth: 1,
        borderColor: AppColors.blueBackground,
        borderRadius: 4,
        marginRight: 5,
        lineHeight: 18,
        paddingHorizontal: 2

    }

});

export default RowHangHoaMTT