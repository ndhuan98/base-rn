import React from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from 'react-native';
import { AppColors, AppStyles, AppSizes, AppFonts } from '../../theme';
import AppHeader from '../../components/AppHeader';
import Menu from '../../image/svg/Back.svg';
import EnvoiceMenuText from '../../components/EnvoiceMenuText';
import EnvoiceInputMenu from '../../components/EnvoiceInputMenu';
import EnvoiceText from '../../components/EnvoiceText';
import ButtonText from '../../components/ButtonText';

import DialogLoading from '../../container/lightbox/DialogLoading';
import { format_mst, validateEmail, validate_phone } from '@util/Validater';
import PlusFull from '../../image/svg/PlusFull';
import { Actions } from 'react-native-router-flux';
import Search from '../../image/svg/Search.svg';
import { I18n } from '@constant';
import { SUCCESS_CODE } from '../../ultil/NetworkHelper';
import Spinner from 'react-native-spinkit';
import { API } from '@network';
import _ from 'lodash'
import { Dlog } from '../../components';
import { validate_CCDD, validate_CMT } from '../../ultil/Validater';

// const Customer = {
//     dien_thoai_lien_he: "",
//     ma_dv: "",
//     ma_so_thue: "",
//     nguoi_giao_dich: "",
//     ten_dv: "",
//     can_cuoc_cong_dan: "",
//     dia_chi: "",
//     id_doitac: '',
//     email: ''
// };

const ThongTinNguoiMuaHang = (props) => {
    const { onSave, Customer } = props

    const [benMua, setBenMua] = React.useState(Customer);
    const [loadingTax, setLoadingTax] = React.useState(false);

    const onValidInfo = () => {
        let isVal = true
        if (benMua?.can_cuoc_cong_dan) {
            if (!validate_CCDD(benMua?.can_cuoc_cong_dan) && !validate_CMT(benMua?.can_cuoc_cong_dan)) {
                return Alert.alert('Thông báo', 'Sai định dạng CCCD/CMT')
            }
        }

        return isVal
    }


    const onSaveCustomer = () => {
        const checkValid = onValidInfo()
        if (checkValid) {
            Actions.pop()
            if (onSave) {
                onSave(benMua)
            }
        }

    }

    const goToList = () => {
        return Actions.DSkhachHangDoiTac({
            onChoose: (data) =>
                setBenMua({
                    ...benMua,
                    ma_so_thue: data?.ma_so_thue,
                    ten_dv: data?.ten_doi_tac,
                    dia_chi: data?.dia_chi,
                    nguoi_giao_dich: data.ten_doi_tac,
                })
        })
    }

    const getInfoTax = React.useCallback(() => {
        if (!benMua.ma_so_thue) {
            return Alert.alert(
                I18n.t('common.notice'),
                I18n.t('createInvoiceScreen.mstNotBeEmpty'),
            );
        }

        if (!format_mst(benMua.ma_so_thue)) {
            return Alert.alert(
                I18n.t('common.notice'),
                I18n.t('createInvoiceScreen.formatFail'),
            );
        }
        setLoadingTax(true);
        DialogLoading.show();
        const params = {
            mst: benMua.ma_so_thue,
        };
        API.GetInformationByTaxcode(params).then(
            res => {
                setLoadingTax(false);
                DialogLoading.hide();
                if (res.data && res.data.code == SUCCESS_CODE) {
                    const diaChiSub = _.join(
                        _.concat(
                            res.data.data.diaChiGiaoDich,
                            res.data.data.tenQuanHuyen,
                            res.data.data.tenTinh,
                        ),
                    );
                    // package data and push to redux
                    const data = {
                        ma_so_thue: res.data.data.maSoThue,
                        ten_dv: res.data.data.tenChinhThuc,
                        email: res.data.data.email,
                        dia_chi: diaChiSub,
                        dien_thoai: res.data.data.dtGiaoDich,
                        nguoi_giao_dich: res.data.data.chuDoanhNghiep,
                    };
                    // display in from
                    setBenMua({
                        ...benMua,
                        ma_so_thue: res.data.data.maSoThue,
                        ten_dv: res.data.data.tenChinhThuc,
                        email: res.data.data.email,
                        dia_chi: diaChiSub,
                        dien_thoai: res.data.data.dtGiaoDich,
                        nguoi_giao_dich: res.data.data.chuDoanhNghiep,
                    });
                    // push data to redux
                    // dispatch(UPDATE_CUSTOMER_INFO(data));
                } else {
                    return Alert.alert(I18n.t('common.notice'), res.data.msg);
                }
            },
            err => {
                setLoadingTax(false);
                DialogLoading.hide();
                Dlog('err GetInformationByTaxcode ', err);
            },
        );
    });

    return (
        <SafeAreaView style={AppStyles.styleSafeArea}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        <AppHeader
                            Icon={Menu}
                            backgroundColor={AppColors.blue}
                            titleColor={AppColors.white}
                            iconColor={AppColors.white}
                            title={'Thông tin người mua hàng'}
                            onPressMenu={() => Actions.pop()}
                        />
                        <View style={styles.wrapContent}>
                            <EnvoiceMenuText
                                onChangeText={text => setBenMua({ ...benMua, ma_dv: text.trim() })}
                                onPress={() => goToList?.()}
                                title={'Mã đơn vị'}
                                maxLength={50}
                                value={benMua.ma_dv}
                            />
                            <EnvoiceInputMenu
                                isLoading={loadingTax}
                                onClickRight={getInfoTax}
                                title={'Mã số thuế'}
                                titleRight={'Lấy thông tin'}
                                value={benMua.ma_so_thue}
                                onChangeText={text => setBenMua({ ...benMua, ma_so_thue: text.trim() })}
                            />
                            <EnvoiceText
                                title={'Người mua hàng'}
                                maxLength={100}
                                value={benMua.nguoi_giao_dich}
                                onChangeText={text => {
                                    setBenMua({ ...benMua, nguoi_giao_dich: text.trim() });
                                }}
                            />

                            <EnvoiceText
                                title={'Địa chỉ'}
                                value={benMua.dia_chi}
                                onChangeText={text => {
                                    setBenMua({ ...benMua, dia_chi: text.trim() });
                                }}
                            />
                            <EnvoiceText
                                title={'Căn cước công dân'}
                                maxLength={12}
                                keyboardType="numeric"
                                value={benMua.can_cuoc_cong_dan}
                                onChangeText={text => {
                                    setBenMua({ ...benMua, can_cuoc_cong_dan: text.trim() });
                                }}
                            />
                            <EnvoiceText
                                title={'Điện thoại'}
                                maxLength={20}
                                value={benMua.dien_thoai}
                                keyboardType="numeric"
                                onChangeText={text => setBenMua({ ...benMua, dien_thoai: text })}
                            />

                            <EnvoiceText
                                title={'Email'}
                                maxLength={255}
                                value={benMua.email}
                                onChangeText={text => {
                                    setBenMua({ ...benMua, email: text.trim() });
                                }}
                            />

                        </View>
                        <View style={styles.wrapFooter}>
                            <ButtonText
                                styleTitle={styles.titleButton}
                                onCick={() => onSaveCustomer?.()}
                                title={_.toUpper(I18n.t('common.write'))}
                            />
                        </View>

                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    wrapContent: {
        flex: 1,
        paddingHorizontal: AppSizes.paddingSml
    },
    wrapFooter: {
        ...AppStyles.shadow,
        backgroundColor: '#FFFFFF',
        padding: AppSizes.paddingSml,
    },
    titleButton: {
        ...AppStyles.boldText,
        color: AppColors.white
    },
});

export default ThongTinNguoiMuaHang