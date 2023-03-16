import React, { useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { AppColors, AppStyles, AppSizes, AppFonts } from '../../theme';
import AppHeader from '../../components/AppHeader';
import Menu from '../../image/svg/Back.svg';
import { Actions } from 'react-native-router-flux';
import Search from '../../image/svg/Search.svg';
import { I18n } from '@constant';
import { SUCCESS_CODE } from '../../ultil/NetworkHelper';
import Spinner from 'react-native-spinkit';
import { API } from '@network';
import { typeHoaDonMTT } from './HelperMTT';
const { height, width } = Dimensions.get('window');

const mockData = [
    { title: '1C22TAA', subTitle: "Hóa đơn giá trị gia tăng có mã" },
    { title: '1C22MAA', subTitle: "Hóa đơn giá trị gia tăng có mã khởi tạo từ máy tính tiền" },
    { title: '2C22MAA', subTitle: "Hóa đơn bán hàng có mã khởi tạo từ máy tính tiền" }

]
const EmptyInvoice = () => {
    return (
        <View
            style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: AppSizes.margin,
            }}>
            <Text style={AppStyles.baseText}>{'Danh sách trống'}</Text>
        </View>
    );
};
const useKyHieuMauSo = (typeHD) => {
    const defaultPage = 1;
    const [Customer, setCustomer] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [page, setPage] = React.useState(defaultPage);
    const [totalPage, setTotalPage] = React.useState(1);
    const [searchText, setTextSearch] = React.useState('');
    const [totalCustomer, setTotalCustomer] = React.useState('0');
    const [isRefresh, setRefresh] = React.useState(false);
    const [maloaihoadon, setMaLoaiHoaDon] = React.useState(typeHD == typeHoaDonMTT.GTGT ? '01' : "02")

    React.useEffect(() => {
        setLoading(true);
        onFetchDataFromServe()

    }, [page, isRefresh, searchText, maloaihoadon]);

    const onFetchDataFromServe = () => {
        const params = {
            page,
            txtSearch: searchText,
            maloaihoadon: maloaihoadon
        };

        API.FromSerialByUserMTT(params).then(
            res => {
                if (res.data && res.data.code == SUCCESS_CODE) {
                    setCustomer(res.data.data);
                    setTotalPage(res.data.totalPage);
                    setTotalCustomer(res.data.totalCountData);

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
    }

    const onRefresh = async () => {
        await setCustomer(Customer => []);
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
            setPage(defaultPage);
        }
    };

    const onPressSearch = async textSearch => {
        await setPage(defaultPage);
        await setCustomer(Customer => []);
        await setTextSearch(textSearch);
    };


    return {
        isRefresh,
        Customer,
        loading,
        refreshing,
        totalCustomer,
        loadMore,
        onRefresh,
        onPressSearch,
        onFetchDataFromServe,
    };
};

const Item = ({ item, index, onSave, typeHD }) => {
    const data = {
        id: item.maDvtid,
    };

    const onChooseKyHieu = () => {
        Actions.pop()
        if (onSave) {
            onSave(item)
        }

    }

    return (
        <TouchableOpacity onPress={() => onChooseKyHieu(item)}>
            <View style={styles.item}>
                <Text style={styles.id}>{index + 1}</Text>
                <View style={styles.content}>
                    <Text numberOfLines={1} style={styles.title}>
                        {item.mau_so_ky_hieu}
                    </Text>
                    <Text numberOfLines={1} style={styles.name}>{`${typeHD == typeHoaDonMTT.GTGT ? "Hóa đơn giá trị gia tăng" : "Hóa đơn bán hàng"}  có mã khởi tạo từ máy tính tiền`}</Text>
                </View>
            </View>
            <View style={styles.line} />
        </TouchableOpacity>
    );
};
const KyHieuMauHoaDon = (props) => {
    const { onSave, typeHD } = props
    const {
        Customer,
        loading,
        loadMore,
        onRefresh,
        refreshing,
        onPressSearch,
        totalCustomer,
    } = useKyHieuMauSo(typeHD);
    return (
        <SafeAreaView style={AppStyles.styleSafeArea}>
            <View style={styles.container}>
                <AppHeader
                    Icon={Menu}
                    backgroundColor={AppColors.blue}
                    titleColor={AppColors.white}
                    iconColor={AppColors.white}
                    title={I18n.t('KyHieuMauSoHoaDon.title')}
                    subTitle={`(${totalCustomer} dữ liệu)`}
                    onPressMenu={() => Actions.pop()}

                />
                <View style={styles.warpSearch}>
                    <Search style={styles.iconSearch} fill={AppColors.textContent} />
                    <TextInput
                        onChangeText={text => onPressSearch(text)}
                        placeholder={I18n.t('KyHieuMauSoHoaDon.placeholder')}
                        placeholderTextColor={AppColors.colorSiver}
                        style={styles.inputSearch}
                    />
                </View>
                <FlatList
                    data={Customer}
                    renderItem={({ item, index }) => (
                        <Item typeHD={typeHD} item={item} index={index} onSave={onSave} />
                    )}
                    refreshing={refreshing}
                    onRefresh={() => onRefresh()}
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={10}
                    onEndReached={() => loadMore()}
                    onEndReachedThreshold={0.7}
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
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    item: {
        flexDirection: 'row',
        marginHorizontal: AppSizes.marginSml,
        marginTop: AppSizes.marginXSml,
        marginBottom: AppSizes.marginXSml,
        height: 44,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    content: {
        width: '100%',
    },
    id: {
        ...AppStyles.baseText,
        fontSize: AppSizes.fontSmall,
        width: width * 0.07,
        paddingHorizontal: AppSizes.paddingXXXSml,
    },
    title: {
        ...AppStyles.boldText,
        color: AppColors.black,
        textAlign: 'justify',
        fontSize: AppSizes.fontSmall,
        lineHeight: 18,
        width: '90%',
    },
    name: {
        ...AppStyles.baseText,
        lineHeight: 18,
        textAlign: 'justify',
        color: '#7A7B7F',
        width: '90%',
        fontSize: AppSizes.fontSmall,
        marginBottom: AppSizes.margin,
        marginTop: AppSizes.marginSml,
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: AppColors.lightgray,
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
        padding: AppSizes.paddingXSml,
        color: AppColors.black,
        flex: 1,
    },
    iconSearch: { marginLeft: AppSizes.margin, width: 19, height: 19 },
});
export default KyHieuMauHoaDon;
