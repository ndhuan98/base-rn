import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppColors, AppSizes, AppStyles } from '../../../theme';
import InvoiceMTT from '../../../image/svg/HoaDonMTT/InvoiceMTT.svg'
import ArrowRight from '../../../image/svg/HoaDonMTT/ArrowRight.svg'
import _ from 'lodash'


const RowInfoMTT = (props) => {
    const { containerStyle, isRequire, title, subTitle, IconLeft, onPress, statusColor } = props
    const Left = IconLeft && IconLeft || InvoiceMTT
    return (
        <TouchableOpacity onPress={() => onPress?.()}>
            <View style={{ ...styles.container, ...containerStyle }}>
                <View style={styles.buttonLeft}>
                    <Left />
                </View>
                <View style={{ flex: 1, paddingLeft: AppSizes.paddingXXSml }}>
                    <View style={styles.wrapPrimaryView}>
                        <Text style={styles.textPrimary}>
                            {title}
                        </Text>
                        {isRequire && <Text style={styles.requireText}>
                            *
                        </Text>}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={{ ...AppStyles.baseText, marginRight: AppSizes.marginSml }}>{'Mẫu số HĐ:'}</Text>
                        <Text style={styles.textSecondary}>
                            {subTitle}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={{ ...AppStyles.baseText, marginRight: AppSizes.marginSml }}>{'Số HĐ:'}</Text>
                        <Text style={{ ...AppStyles.baseText, color: AppColors.red }}>{props?.invoiceHD}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={{ ...AppStyles.baseText, marginRight: AppSizes.marginSml }}>{'Mã CQT:'}</Text>
                        <Text style={{ ...AppStyles.baseText, color: AppColors.red }}>{props?.codeCQT}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={{ ...AppStyles.baseText, marginRight: AppSizes.marginSml }}>{'Ngày HĐ:'}</Text>
                        <Text style={styles.textSecondary}>
                            {props?.date}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={{ ...AppStyles.baseText, marginRight: AppSizes.marginSml }}>{'Trạng thái xử lý:'}</Text>
                        <Text style={styles.textSecondary}>
                            {props?.statusProcess}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={{ ...AppStyles.baseText, marginRight: AppSizes.marginSml }}>{'Trạng thái:'}</Text>
                        <Text style={{ ...AppStyles.boldText, color: statusColor ? statusColor : AppColors.blue, fontSize: 14 }}>{props?.status}</Text>
                    </View>


                </View>

                {/* <View style={styles.buttonRight}>
                    <ArrowRight />
                </View> */}

            </View>

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: AppSizes.borderSmall,
        backgroundColor: AppColors.white,
        flexDirection: 'row',
        borderColor: "#E9EDF0",
        borderWidth: 1,
        alignItems: 'flex-start',
        paddingVertical: AppSizes.paddingSml

    },
    buttonLeft: { marginHorizontal: AppSizes.marginSml, marginTop: AppSizes.marginSml },
    buttonRight: { marginHorizontal: AppSizes.marginSml },
    requireText: {
        ...AppStyles.baseText,
        color: AppColors.red
    },
    wrapPrimaryView: { flexDirection: 'row' },

    textPrimary: {
        ...AppStyles.boldText,
        color: AppColors.blue
    },
    textSecondary: {
        ...AppStyles.baseText,
        color: AppColors.black
    }
});

export default RowInfoMTT