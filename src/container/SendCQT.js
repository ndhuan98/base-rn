import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import {AppColors, AppStyles, AppSizes} from '../theme';
import StatusBarTSD from '../components/StatusBarTSD';
import AppHeader from '../components/AppHeader';
import Menu from '../image/svg/menu1.svg';
import {Actions} from 'react-native-router-flux';
import {API} from '@network';
import {SUCCESS_CODE} from '../ultil/NetworkHelper';
import Spinner from 'react-native-spinkit';
import FilterMoveInvoiceCQT from './lightbox/FilterMoveInvoiceCQT';
import moment from 'moment';
import Filter from '../image/svg/Filter.svg';
import {I18n} from '@constant';
import _ from 'lodash';
import {format_mst} from '@util/Validater';
import {formatNumber, NumberInvoiceStarter} from '../ultil/EinvoiceSupport';

// Khởi tạo danh sách lựa chọn lọc hoá đơn
const Filters = [
  {
    title: 'CQT đã chấp nhận',
    value: '9',
  },
  {
    title: 'CQT từ chối',
    value: '-9',
  },
  {
    title: 'Chưa gửi',
    value: '0',
  },
  {
    title: 'Tất cả',
    value: '',
  },
];

// Hàm hiển thị các tuỳ chọn lọc dách sách hoá đơn
// param:{
//   datas: Filters,
//   onPressItem : CallBack(),
//   valueSelected :'01'
// }

const FilterEnvoice = props => {
  const valueSelected = props.itemSelected.value;

  return (
    <View style={styles.wrapItem}>
      <View style={styles.itemFillter}>
        {Filters.map(item => {
          const titleStyle =
            item.value == valueSelected
              ? styles.titleSelected
              : styles.titleNomal;
          return (
            <TouchableOpacity
              onPress={() => props.onPressItem(item)}
              key={item.value}
              style={{
                flex: item.value == '9' || item.value == '-9' ? 2 : 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: AppSizes.paddingXXSml,
                paddingVertical: AppSizes.paddingXXSml,
                backgroundColor:
                  item.value == valueSelected
                    ? AppColors.blue
                    : AppColors.white,
              }}>
              <Text style={titleStyle}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// Hàm render mẫu Item của danh sách hoá đơn
const EnvoiceItem = props => {
  const {onClickItem} = useSwapItem();
  const {item} = props;
  const colorInvoiceNumber =
    item.item.soHoaDon == NumberInvoiceStarter
      ? AppColors.black
      : AppColors.red;
  return (
    <TouchableOpacity
      onPress={() => onClickItem(item.item)}
      style={styles.wrapEnvoice}>
      <View style={styles.horizontalItem}>
        <Text
          style={{
            ...AppStyles.baseText,
            color: AppColors.colorSiver,
            fontSize: 12,
            lineHeight: 15,
            flex: 1,
          }}>
          {item.item.benMuaTenDv}
        </Text>
        <Text style={styles.ngayHoaDon}>
          {item.item.thoiGianTruyenNhanText || ''}
        </Text>
      </View>

      <View style={styles.horizontalItem}>
        <Text style={{...AppStyles.baseText, color: colorInvoiceNumber}}>
          {item.item.soHoaDon}
        </Text>
        <View style={styles.wrapStatus}>
          <Text style={styles.statusTxt}>
            {item.item.trangThaiPhanHoiText || ''}
          </Text>
        </View>
      </View>
      <View style={[styles.horizontalItem]}>
        <View style={{flex: 1}}>
          <Text style={styles.moneyTxt}>
            {formatNumber(item.item.tongThanhToan)}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text
            numberOfLines={2}
            style={{
              ...AppStyles.smallText,
              color: AppColors.red,
              textAlign: 'right',
            }}>
            {item.item.thongBaoTruyenNhan}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Hàm render danh sách
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

const useSwapItem = () => {
  const onClickItem = async item => {
    Actions.createInvoice({hoaDonId: item.dhoadonid});
  };
  return {onClickItem};
};

// Customer hook
const useSwapiInvoice = () => {
  const endDateDefauld = moment().format('DD/MM/YYYY');
  const startDateDefaul = moment()
    .subtract(1, 'months')
    .format('DD/MM/YYYY');
  const defaultPage = 1;
  const [filterSelectd, setFilter] = React.useState(Filters[3]);
  const [Invoices, setInvoices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = React.useState(defaultPage);
  const [totalPage, setTotalPage] = React.useState(1);
  const [totalInvoice, setTotalInvoice] = React.useState('0');
  const [searchText, setTextSearch] = React.useState('');
  const [isRefresh, setRefresh] = React.useState(false);
  const [startDate, setStartDate] = React.useState(startDateDefaul);
  const [endDate, setEndDate] = React.useState(endDateDefauld);
  const [filterSelecled, setFilterSelected] = React.useState({});
  const [LoaiHoaDon, setLoaiHoaDon] = React.useState([]);
  const [kyHieu, setKyHieu] = React.useState([]);
  const [mauSo, setMauSo] = React.useState([]);
  const [denominatorSelected, setDenominatorSelected] = React.useState({});
  const [symbolSelected, setSymbolSelected] = React.useState({});

  const onGetLoaiHoaDon = () => {
    return API.getTrangThaiTruyenNhan().then(
      res => {
        if (res.data && res.data.code == 1) setLoaiHoaDon(res?.data?.data);
      },
      err => {
        Dlog('error onGetListTrangThaiTruyenNhan');
      },
    );
  };

  const onGetKyHieu = () => {
    return API.getListKyHieu().then(
      res => {
        if (res.data && res.data.code == 1) setKyHieu(res?.data?.data);
      },
      err => {
        Dlog('error onGetKyHieu');
      },
    );
  };

  const onGetMauSo = () => {
    return API.getListMauSo().then(
      res => {
        if (res.data && res.data.code == 1) setMauSo(res?.data?.data);
      },
      err => {
        Dlog('error onGetMauSo');
      },
    );
  };

  React.useEffect(() => {
    onGetLoaiHoaDon();
    onGetKyHieu();
    onGetMauSo();
  }, []);

  // Call API
  React.useEffect(() => {
    setLoading(true);
    const params = {
      page: page,
      startDate: startDate,
      loaiDanhSach: filterSelectd.value,
      endDate: endDate,
      mauSo: denominatorSelected.value || '',
      kyHieu: symbolSelected.value || '',
    };
    API.getDanhSachChuyenLenCQT(params).then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          setInvoices(Invoices => [...Invoices, ...res.data.data]);
          setTotalInvoice(res.data.totalCountData);
          setTotalPage(res.data.totalPage);
          setLoading(false);
          setRefreshing(false);
        } else {
          setLoading(false);
          setRefreshing(false);
          const isErrorFomat = _.includes(
            res.data.desc,
            'The DateTime represented by the string',
          );
          if (isErrorFomat) {
            return Alert.alert(
              I18n.t('common.notice'),
              'Từ ngày hoặc Đến ngày không đúng định dạng',
            );
          } else {
            return Alert.alert(I18n.t('common.notice'), res.data.desc);
          }
        }
      },
      err => {
        setLoading(false);
        setRefreshing(false);
      },
    );
  }, [page, filterSelectd, isRefresh, searchText]);

  const loadMore = () => {
    if (page <= totalPage) {
      setPage(page + 1);
    }
  };

  const onRefresh = async () => {
    await setInvoices(Invoices => []);
    if (page == defaultPage) {
      setRefresh(!isRefresh);
    } else {
      setPage(defaultPage);
    }
  };

  const onFilter = item => {
    setFilter(item);
    // setFilter(dataFilter.statusSelected);
    setInvoices(Invoices => []);
    setPage(defaultPage);
  };

  const onFilterTime = async dataFilter => {
    console.log('dataFilter', dataFilter);
    await setFilter(dataFilter.statusSelected);
    await setFilterSelected(dataFilter);
    await setStartDate(dataFilter.fromDate);
    await setEndDate(dataFilter.toDate);
    await setTextSearch(dataFilter.nameCustomer);
    await setSymbolSelected(dataFilter.symbolSelected);
    await setDenominatorSelected(dataFilter.denominatorSelected);

    await setInvoices(Invoices => []);
    if (page == defaultPage) {
      setRefresh(!isRefresh);
    } else {
      setPage(defaultPage);
    }
  };

  const onPressSearch = async textSearch => {
    await setPage(defaultPage);
    await setInvoices(Invoices => []);
    await setTextSearch(textSearch);
  };

  return {
    Invoices,
    loading,
    loadMore,
    filterSelectd,
    onFilter,
    refreshing,
    onRefresh,
    totalInvoice,
    onPressSearch,
    onFilterTime,
    filterSelecled,
    LoaiHoaDon,
    kyHieu,
    mauSo,
  };
};

// Hàm render chính màn hình
const SendCQT = () => {
  const {
    Invoices,
    loading,
    loadMore,
    filterSelectd,
    onFilter,
    onRefresh,
    refreshing,
    totalInvoice,
    onFilterTime,
    filterSelecled,
    LoaiHoaDon,
    kyHieu,
    mauSo,
  } = useSwapiInvoice();

  const filterDraw = {
    onFilter: dataFilter => {
      onFilterTime(dataFilter);
    },
    filterSelecled: filterSelecled,
    dataLoaiHoaDon: LoaiHoaDon,
    dataKyHieu: kyHieu,
    dataMauSo: mauSo,
  };

  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <View style={styles.container}>
        <AppHeader
          Icon={Menu}
          backgroundColor={AppColors.blue}
          titleColor={AppColors.white}
          iconColor={AppColors.white}
          title={'Chuyển hóa đơn lên CQT'}
          subTitle={`(${totalInvoice} dữ liệu)`}
          RightIcon
          IconRight={Filter}
          onPressMenu={() => Actions.drawerOpen()}
          onPressRight={() => {
            FilterMoveInvoiceCQT.show(filterDraw);
          }}
        />
        <FilterEnvoice
          itemSelected={filterSelectd}
          onPressItem={item => (loading ? {} : onFilter(item))}
        />
        <FlatList
          data={Invoices}
          renderItem={item => <EnvoiceItem item={item} />}
          refreshing={refreshing}
          onRefresh={() => onRefresh()}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={10}
          onEndReached={() => loadMore()}
          onEndReachedThreshold={1}
          ListFooterComponent={
            <View style={{width: '100%', alignItems: 'center'}}>
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
  wrapItem: {
    width: '100%',
    backgroundColor: AppColors.white,
    padding: AppSizes.paddingXXSml,
    marginBottom: AppSizes.marginSml,
  },
  itemFillter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: AppColors.blue,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: AppColors.white,
    height: 35,
  },
  wrapEnvoice: {
    width: '100%',
    padding: AppSizes.paddingXXSml,
    borderBottomWidth: 1,
    borderColor: AppColors.border,
    paddingVertical: AppSizes.paddingSml,
  },
  horizontalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: AppSizes.paddingXXSml,
  },
  moneyTxt: {
    ...AppStyles.boldText,
    color: AppColors.black,
    fontSize: 16,
  },
  statusTxt: {
    ...AppStyles.smallText,
    color: AppColors.black,
    lineHeight: 15,
    marginTop: AppSizes.marginXXSml,
  },
  warpSearch: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#C2C7E2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: AppSizes.paddingXSml,
    borderRadius: AppSizes.borderRadius,
  },
  inputSearch: {
    flex: 1,
    padding: AppSizes.paddingXSml,
    color: AppColors.black,
  },
  iconSearch: {width: 19, height: 19},
  wrapSkip: {
    paddingHorizontal: AppSizes.paddingMedium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSeach: {
    backgroundColor: AppColors.blue,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: AppSizes.paddingXXSml,
    paddingVertical: AppSizes.paddingSml,
  },
  txtSkip: {...AppStyles.baseText, color: AppColors.white},
  ngayHoaDon: {
    ...AppStyles.lightText,
    marginLeft: AppSizes.textInputHeight,
    color: AppColors.colorSiver,
    fontSize: 12,
  },
  titleNomal: {
    ...AppStyles.baseText,
    lineHeight: 15,
    fontSize: 12,
    color: AppColors.blue,
    textAlign: 'center',
  },
  titleSelected: {
    ...AppStyles.boldText,
    lineHeight: 15,
    fontSize: 12,
    color: AppColors.white,
    textAlign: 'center',
  },
});

export default SendCQT;
