import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppColors, AppSizes, AppStyles } from '../../../theme';
import InvoiceMTT from '../../../image/svg/HoaDonMTT/InvoiceMTT.svg'
import ArrowRight from '../../../image/svg/HoaDonMTT/ArrowRight.svg'
import _ from 'lodash'


const RowMTT = (props) => {
    const { containerStyle, isRequire, title, subTitle, IconLeft, onPress, disabled, preTitle } = props
    const Left = IconLeft && IconLeft || InvoiceMTT
    return (
        <TouchableOpacity disabled={disabled} onPress={() => onPress?.()}>
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
                    {!_.isEmpty(subTitle) && <Text numberOfLines={1} style={styles.textSecondary}>
                        {subTitle}
                    </Text>}
                    {!_.isEmpty(preTitle) && <Text numberOfLines={1} style={styles.textSecondary}>
                        {preTitle}
                    </Text>}
                </View>

                <View style={styles.buttonRight}>
                    <ArrowRight />
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 72,
        borderRadius: AppSizes.borderSmall,
        backgroundColor: AppColors.white,
        flexDirection: 'row',
        borderColor: "#E9EDF0",
        borderWidth: 1,
        alignItems: 'center'
    },
    buttonLeft: { marginHorizontal: AppSizes.marginSml },
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

export default RowMTT