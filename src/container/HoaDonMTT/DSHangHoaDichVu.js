import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    Alert,
} from 'react-native';
import StatusBarTSD from '../../components/StatusBarTSD';
import { AppColors, AppStyles, AppSizes } from '../../theme';
import AppHeader from '../../components/AppHeader';
import Menu from '../../image/svg/Back.svg';
import PlusSolid from '../../image/svg/HoaDonMTT/PlusSolid.svg';
import MinusSolid from '../../image/svg/HoaDonMTT/MinusSolid.svg';

import Checked from '../../image/svg/HoaDonMTT/Checked.svg';
import Uncheck from '../../image/svg/HoaDonMTT/Uncheck.svg';

import PlusFull from '../../image/svg/PlusFull';
import { Actions } from 'react-native-router-flux';
import { formatNumber, TinhVAT } from '../../ultil/EinvoiceSupport';
import Search from '../../image/svg/Search.svg';
import { I18n } from '@constant';
import { API } from '@network';
import { SUCCESS_CODE } from '../../ultil/NetworkHelper';
import Spinner from 'react-native-spinkit';
import _ from 'lodash';
import ButtonText from '../../components/ButtonText';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EmptyInvoice = () => {
    return (
        <View
            style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: AppSizes.margin,
            }}>
            <Text style={AppStyles.baseText}>{'Danh sách trống'}</Text>
        </View>
    );
};
const invoiceGoods = (props) => {
    const defaultPage = 1;
    const [Goods, setGoods] = useState([]);
    const [selectedGoods, setSelectedGoods] = useState([])
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(defaultPage);
    const [totalPage, setTotalPage] = useState(1);
    const [searchText, setTextSearch] = useState('');
    const [totalGoods, setTotalGoods] = useState('0');
    const [isRefresh, setRefresh] = useState(false);

    useEffect(() => {
        setSelectedGoods(props)
    }, [props])

    useEffect(() => {
        setLoading(true);
        const params = {
            page,
            txtSearch: searchText,
        };
        API.getAllHangHoa(params).then(
            res => {
                if (res.data && res.data.code == SUCCESS_CODE) {
                    setGoods(Goods => [...Goods, ...res.data.data.map((item) => {
                        return {
                            ...item,
                            isChecked: false,
                            soLuong: 1,
                            thanhTien: 1 * item.gia_xuat
                        }
                    })]);
                    setTotalPage(res.data.totalPage);
                    setTotalGoods(res.data.totalCountData);
                    setLoading(false);
                    setRefreshing(false);
                } else {
                    setLoading(false);
                    setRefreshing(false);
                    Alert.alert(I18n.t('common.notice'), res.data.desc);
                }
            },
            err => {
                setLoading(false);
                setRefreshing(false);
            },
        );
    }, [page, isRefresh, searchText]);


    const onRefresh = async () => {
        await setGoods(Goods => []);
        if (page == defaultPage) {
            setRefresh(!isRefresh);
        } else {
            setPage(defaultPage);
        }
    };
    const loadMore = () => {
        if (page <= totalPage) {
            setPage(page + 1);
        }
        if (totalPage == defaultPage) {
            setPage(page);
        }
    };
    const onPressSearch = async textSearch => {
        await setPage(defaultPage);
        await setGoods(Goods => []);
        await setTextSearch(textSearch);
    };
    const onSelected = (item, index) => {
        let newGoods = _.cloneDeep(Goods)
        setGoods(_.filter(newGoods, (itemGoods) => {
            return item.idhanghoa != itemGoods.idhanghoa
        }))
        setSelectedGoods([...selectedGoods, item])
    }

    const onDeselected = (item, index) => {
        let newGoods = _.cloneDeep(selectedGoods)
        setSelectedGoods(_.filter(newGoods, (itemGoods) => {
            return item.idhanghoa != itemGoods.idhanghoa
        }))
        setGoods([item, ...Goods])
    }

    const onMinus = (index) => {
        const newGoods = _.cloneDeep(selectedGoods)
        newGoods[index].soLuong = newGoods[index].soLuong - 1
        newGoods[index].thanhTien = newGoods[index].gia_xuat * (newGoods[index].soLuong)
        setSelectedGoods(newGoods)
    }

    const onPlus = (index) => {
        const newGoods = _.cloneDeep(selectedGoods)
        newGoods[index].soLuong = newGoods[index].soLuong + 1
        newGoods[index].thanhTien = newGoods[index].gia_xuat * (newGoods[index].soLuong)
        setSelectedGoods(newGoods)
    }

    return {
        isRefresh,
        Goods,
        selectedGoods,
        loading,
        refreshing,
        totalGoods,
        loadMore,
        onRefresh,
        onPressSearch,
        onSelected,
        onDeselected,
        onPlus,
        onMinus
    };
};

const ItemHangHoa = (props) => {
    const { item, index, onPlus, onMinus, onSelected, onDeselected, isChecked } = props
    const loaiHang = _.isEmpty(item.loai_hang) ? null : I18n.t('goodsScreen.loaiHang');
    const donViTinh = _.isEmpty(item.don_vi_tinh) ? null : I18n.t('goodsScreen.donVi');
    // type = isChecked = true : Remove item from selectedGoods
    // type = isChecked = false : Add item to selected Goods
    const onClickItem = (item, index) => {
        if (isChecked) {
            return onDeselected(item, index)
        }
        return onSelected(item, index)
    }
    return (
        <View style={styles.item}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => onClickItem(item, index)} style={{ paddingRight: AppSizes.paddingSml }}>
                    {isChecked ? <Checked /> : <Uncheck />}
                </TouchableOpacity>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <TouchableOpacity onPress={() => onClickItem(item, index)} >
                        <View style={styles.content}>
                            <Text style={styles.title}>{item?.ten_hang}</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', flex: 1, width: '100%' }}>
                        <TouchableOpacity onPress={() => onClickItem(item, index)} style={{ flex: 1 }}>
                            <Text style={styles.donVi}>
                                {donViTinh}{item.don_vi_tinh}
                            </Text>
                            <Text style={styles.giaTien}>{formatNumber(item.gia_xuat)}</Text>
                        </TouchableOpacity>

                        <View style={{ flex: 1, opacity: isChecked ? 1 : 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: AppSizes.padding }}>
                            <TouchableOpacity onPress={() => item?.soLuong > 0 ? onMinus?.(index) : {}}>
                                <MinusSolid />
                            </TouchableOpacity>
                            <Text style={{ ...AppStyles.boldText, marginHorizontal: AppSizes.margin }}>{item?.soLuong}</Text>
                            <TouchableOpacity onPress={() => onPlus?.(index)}>
                                <PlusSolid />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View >
    )
}

const SumView = (props) => {
    const { data, onSave, fromScreen } = props
    const selectedGoods = data
    const congTienHang = _.sumBy(data, 'thanhTien')
    const params = {
        dsHangHoa: selectedGoods.map((item, index) => {
            return {
                ...item,
                dhanghoaid: item.idhanghoa,
                stt: index,
                tenHang: item.ten_hang,
                maDvt: item.don_vi_tinh,
                soLuong: item.soLuong,
                donGia: item.gia_xuat,
                thanhTien: item.thanhTien,
                vatTien: fromScreen == 'BHMTT' ? 0 : TinhVAT(item.vat, item.thanhTien),
                vAT: fromScreen == 'BHMTT' ? 0 : item.vat

            }
        }),
        tongTienHangNt: congTienHang
    }
    const onConfirm = () => {
        onSave(params)
        Actions.pop()
    }

    return (
        <View style={{
            ...AppStyles.shadow,
            width: '100%',
            backgroundColor: AppColors.white,
            padding: AppSizes.paddingSml,
            flexDirection: 'row',
        }}>
            <View style={{ borderRightWidth: 1, paddingHorizontal: AppSizes.paddingSml, borderColor: AppColors.border }}>
                <Text style={{ ...AppStyles.baseText }}>Đã chọn:</Text>
                <Text style={{ ...AppStyles.boldText, color: AppColors.black }}>
                    {_.size(selectedGoods)}
                </Text>
            </View>

            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text style={{ ...AppStyles.baseText }}>Cộng tiền hàng</Text>
                <Text style={{ ...AppStyles.boldText, color: AppColors.blue }}>
                    {formatNumber(congTienHang)}
                </Text>
            </View>

            <View style={{ marginLeft: AppSizes.margin }}>
                <ButtonText onCick={() => onConfirm()} styleTitle={{
                    ...AppStyles.boldText, color: AppColors.white,
                }} title={"XÁC NHẬN"} />
            </View>
        </View>
    )
}


const DSHangHoaDichVu = (props) => {
    const { onSave, fromScreen, dHoaDonHangs } = props

    const {
        Goods,
        selectedGoods,
        loading,
        loadMore,
        onRefresh,
        refreshing,
        onPressSearch,
        totalGoods,
        onSelected,
        onDeselected,
        onMinus,
        onPlus
    } = invoiceGoods(dHoaDonHangs);

    return (
        <SafeAreaView style={AppStyles.styleSafeArea}>
            <StatusBarTSD />
            <View style={styles.container}>
                <AppHeader
                    Icon={Menu}
                    backgroundColor={AppColors.blue}
                    titleColor={AppColors.white}
                    iconColor={AppColors.white}
                    title={I18n.t('goodsScreen.title')}
                    subTitle={`(${totalGoods} mặt hàng)`}
                    RightIcon
                    IconRight={PlusFull}
                    onPressMenu={() => Actions.pop()}
                    onPressRight={() => Actions.addGoods({ callbackref: () => onRefresh() })}
                />
                <View style={styles.warpSearch}>
                    <Search style={styles.iconSearch} fill={AppColors.textContent} />
                    <TextInput
                        onChangeText={text => onPressSearch(text)}
                        placeholder={I18n.t('goodsScreen.placeholder')}
                        placeholderTextColor={AppColors.colorSiver}
                        style={styles.inputSearch}
                    />
                </View>

                <FlatList
                    data={Goods}
                    refreshing={refreshing}
                    ListHeaderComponent={
                        <View>
                            {selectedGoods.map((item, index) => {
                                return <ItemHangHoa key={index.toString()} isChecked={true} item={item} index={index} onPlus={onPlus} onMinus={onMinus} onDeselected={onDeselected} onSelected={onSelected} />
                            })}
                        </View>
                    }
                    // onRefresh={() => onRefresh()}
                    renderItem={({ item, index }) => <ItemHangHoa isChecked={false} item={item} index={index} onPlus={onPlus} onMinus={onMinus} onSelected={onSelected} />}
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={10}
                    onEndReached={() => loadMore()}
                    onEndReachedThreshold={1}
                    ListFooterComponent={
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Spinner
                                isVisible={loading}
                                size={25}
                                type={'ThreeBounce'}
                                color={AppColors.blue}
                            />
                        </View>
                    }
                    ListEmptyComponent={<EmptyInvoice />}
                />
                <SumView data={selectedGoods} onSave={onSave} fromScreen={fromScreen} />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: AppSizes.marginSml
    },
    content1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    id: {
        ...AppStyles.baseText,
        fontSize: AppSizes.fontSmall,
        width: '6%'
    },
    item: {
        marginHorizontal: AppSizes.marginSml,
        marginTop: AppSizes.margin,
        paddingBottom: AppSizes.marginXSml,
        borderBottomWidth: 1,
        borderColor: AppColors.lightgray
    },
    title: {
        ...AppStyles.boldText,
        fontSize: AppSizes.fontBase,
        color: AppColors.black,
        lineHeight: 16,
    },
    maHang: {
        ...AppStyles.baseText,
        lineHeight: 16,
        fontSize: AppSizes.fontSmall,
    },
    loaiHang: {
        ...AppStyles.lightText,
        lineHeight: 16,
        width: '45%',
        textAlign: 'right',
        color: AppColors.black,
        fontSize: AppSizes.fontSmall,
    },
    giaTien: {
        ...AppStyles.baseText,
        lineHeight: 20,
        color: AppColors.black,
        fontSize: AppSizes.fontBase,
        marginTop: AppSizes.marginXXSml
    },
    donVi: {
        ...AppStyles.baseText,
        lineHeight: 20,
        color: '#7E7E7E',
        fontSize: AppSizes.fontBase,
    },
    warpSearch: {
        flexDirection: 'row',
        backgroundColor: AppColors.backgroundGary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: AppSizes.paddingXSml,
        marginHorizontal: AppSizes.marginSml,
        marginVertical: AppSizes.marginSml,
        borderRadius: AppSizes.borderRadius,
    },
    inputSearch: {
        flex: 1,
        padding: AppSizes.paddingXSml,
        color: AppColors.black,
    },
    iconSearch: { marginLeft: AppSizes.margin, width: 19, height: 19 },
});
export default DSHangHoaDichVu;
