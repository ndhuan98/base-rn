import { View, Text, SafeAreaView, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { AppStyles, AppSizes, AppColors } from "../../../theme";
import AppHeader from '../../../components/AppHeader'
import Back from '../../../image/svg/Back.svg';
import { Actions } from 'react-native-router-flux';
import PhieuThongBao from '../component/PhieuThongBao';
import ButtonText from '../../../components/ButtonText';
import _ from 'lodash'
import ButtonThree from '../../../components/ButtonThree';
import ActionSheet from '../../lightbox/ActionSheet';

const LapThongBaoSaiSot = (props) => {
    const { title, formList } = props
    const iShowViewButton = !_.isEmpty(formList)
    const onSave = () => {
        return console.log('onSave')
    }

    const onShowMenuAction = () => {
        const data = [

            {
                title: 'Xem thông báo',
                value: 'Xem thông báo',
            },
        ];

        const sheet = {
            title: 'Tùy chọn khác',
            dataList: data,
            onSelected: item => {
                switch (item.title) {
                    case 'Xem thông báo':
                        return onReviewInvoice?.();

                }
            },
        };
        ActionSheet.show(sheet);
    };

    const onReviewInvoice = () => {
        return
    }

    return (
        <SafeAreaView style={styles.areaView}>
            <View style={styles.container}>
                <AppHeader
                    Icon={Back}
                    backgroundColor={AppColors.blue}
                    titleColor={AppColors.white}
                    iconColor={AppColors.white}
                    title={'Lập thông báo'}
                    onPressMenu={() => Actions.pop()}
                    RightText="Ghi"
                    onPressRight={() => onSave?.()}
                />
                <View style={{ flex: 1 }}>
                    <PhieuThongBao />
                </View>
                <View style={styles.wrapFooter}>
                    <ButtonText
                        styleTitle={styles.titleButton}
                        onCick={() => onSave?.()}
                        title={_.toUpper('Ghi')}
                    />
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

export default LapThongBaoSaiSot