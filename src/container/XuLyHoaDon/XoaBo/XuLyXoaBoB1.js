import { View, Text, SafeAreaView, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback, useState } from 'react'
import { AppStyles, AppSizes, AppColors } from "../../../theme";
import AppHeader from '../../../components/AppHeader'
import Back from '../../../image/svg/Back.svg';
import { Actions } from 'react-native-router-flux';
import ButtonText from '../../../components/ButtonText';
import _ from 'lodash'
import PickerInput from '../../../components/PickerInput';
import { I18n } from '@constant';
import moment from 'moment';
import EnvoiceText from '../../../components/EnvoiceText';
import EnvoiceInputMenuLarge from '../../../components/EnvoiceInputMenuLarge';
import API from '../../../network/API';
import { SUCCESS_CODE } from '../../../ultil/NetworkHelper';
import { Dlog } from '../../../components';
import DatePicker from 'react-native-date-picker'

const toDay = moment().format('DD/MM/YYYY');

const XuLyXoaBoB1 = (props) => {
    const { Dhoadonid } = props
    const [date, setDate] = useState(toDay)
    const [reason, setReason] = useState(null)
    const [isOpenDate, setOpenDate] = useState(false)

    const validateInfoInput = () => {
        let isValid = true
        if (_.isEmpty(reason)) {
            return Alert.alert('Thông báo', 'Vui lòng nhập lý do xoá bỏ')
        }
        if (_.isEmpty(date)) {
            return Alert.alert('Thông báo', 'Vui lòng nhập ngày xoá bỏ')
        }
        return isValid
    }
    const onConfirm = useCallback(() => {
        if (validateInfoInput()) {
            return Alert.alert('Thông báo',
                `Sau khi thực hiện hủy hóa đơn điện tử, bạn cần gửi thông báo sai sót tới CQT theo Mẫu số 04/SS-HĐĐT.\nBạn có chắc chắn muốn xử lý "Xóa bỏ" hóa đơn này không ?`,
                [
                    {
                        text: "Có",
                        onPress: () => xoaBoAndCreateThongBao(),
                        style: "cancel",
                    },
                    {
                        text: "Không",
                        onPress: () => { },
                        style: "cancel",
                    },
                ],)
        }

    }, [reason, date])

    const xoaBoAndCreateThongBao = async () => {
        try {
            const params = {
                Dhoadonid: Dhoadonid,
                LyDoXuLy: reason,
                NgayXuLy: date
            }
            const res = await API.XoaBoAndCreateThongBao(params)
            if (res?.data?.code == SUCCESS_CODE) {
                return Actions.XuLyXoaBoB2({
                    thongBao: res?.data?.data?.thongBao,
                    thongBaoChiTiet: res?.data?.data?.thongBaoChiTiet,
                })

            }
            return Alert.alert('Có lỗi', res?.data?.desc)

        } catch (error) {
            Dlog('error', error)
        }
    }

    const onPressDate = useCallback(() => {
        setOpenDate(true)
    }, [])


    return (
        <SafeAreaView style={styles.areaView}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
                <View style={styles.container}>
                    <AppHeader
                        Icon={Back}
                        backgroundColor={AppColors.blue}
                        titleColor={AppColors.white}
                        iconColor={AppColors.white}
                        title={'Xử lý hóa đơn'}
                        RightText={'Xử lý'}
                        onPressRight={onConfirm}
                        onPressMenu={() => Actions.pop()}

                    />
                    <View style={{ flex: 1, padding: AppSizes.paddingSml }}>
                        <PickerInput
                            require
                            title={'Ngày xóa bỏ:'}
                            value={date}
                            placeholder={'dd/mm/yyyy'}
                            onChangeText={text => setDate(text)}
                            onPress={onPressDate}
                        />
                        <EnvoiceText
                            disabled
                            drop
                            style={{ color: AppColors.red }}
                            title={'Hình thức xử lý:'}
                            value={'Xóa bỏ'}

                        />
                        <EnvoiceInputMenuLarge
                            title='Lý do xóa bỏ:'
                            require
                            value={reason}
                            multiline
                            placeholder={'Nhập lý do xoá bỏ'}
                            onChangeText={text => setReason(text)}
                        />

                        <Text style={{ ...AppStyles.baseText, color: AppColors.blue }}>
                            <Text style={{ ...AppStyles.italicText, color: AppColors.red }} >Lưu ý: </Text>
                            Theo Khoản 1 Điều 19 Nghị định 123/2020/NĐ-CP và Điểm b Khoản 1 Điều 7 Thông tư 78/2021/TT-BTC: Hóa đơn có sai sót được phép xử lý hủy (xóa bỏ) khi hóa đơn đã cấp mã của CQT và chưa gửi cho người mua.
                        </Text>
                    </View>
                    <View style={styles.wrapFooter}>
                        <ButtonText
                            styleTitle={styles.titleButton}
                            onCick={() => onConfirm?.()}
                            title={_.toUpper('Xử lý')}
                        />
                    </View>
                    <DatePicker
                        modal
                        mode="date"
                        title="Chọn ngày"
                        open={isOpenDate}
                        date={new Date()}
                        onConfirm={(date) => {
                            setOpenDate(false)
                            setDate(moment(date).format('DD/MM/YYYY'))
                        }}
                        onCancel={() => {
                            setOpenDate(false)
                        }}
                        confirmText="Đồng ý"
                        cancelText="Đóng"
                    />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background
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

export default XuLyXoaBoB1