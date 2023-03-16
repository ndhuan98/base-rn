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
import { AppColors, AppStyles, AppSizes, AppFonts } from '../theme';
import StatusBarTSD from '../components/StatusBarTSD';
import AppHeader from '../components/AppHeader';
import Menu from '../image/svg/menu1.svg';
import { Actions } from 'react-native-router-flux';
import Search from '../image/svg/Search.svg';
import * as Animatable from 'react-native-animatable';
import { API } from '@network';
import { SUCCESS_CODE } from '../ultil/NetworkHelper';
import Spinner from 'react-native-spinkit';
import FilterReport from '../container/lightbox/FilterReport';
import FilterMoveInvoiceCQT from '../container/lightbox/FilterMoveInvoiceCQT';
import moment from 'moment';
import Filter from '../image/svg/Filter.svg';
import { I18n } from '@constant';
import _ from 'lodash';
import { format_mst } from '@util/Validater';
import { formatNumber, NumberInvoiceStarter, StatusInvoiceSortName } from '../ultil/EinvoiceSupport';



// Khởi tạo danh sách lựa chọn lọc hoá đơn
const Filters = [
  {
    title: 'Chờ xuất',
    value: '1',
  },
  {
    title: 'Đã xuất (Chưa ký số)',
    value: '2',
  },
  {
    title: 'Đã xuất (Đã ký số)',
    value: '3',
  },
  {
    title: 'Tất cả',
    value: '0',
  },
];

//  hàm render chính của màn hình
const EnvoiceSearch = props => {
  const [search, setSearch] = React.useState('');
  const searchRef = React.useRef(null);
  const onPress = React.useCallback(() => {
    searchRef.current.fadeOutLeftBig(200).then(endState => props.onPressSkip());
  });
  return (
    <Animatable.View
      duration={300}
      animation="fadeInLeftBig"
      ref={searchRef}
      style={styles.containerSeach}>
      <View style={styles.warpSearch}>
        <TextInput
          placeholder={'Tìm kiếm'}
          style={styles.inputSearch}
          onChangeText={value =>
            props.onChangeText && props.onChangeText(value)
          }
        />
        <Search style={styles.iconSearch} fill={AppColors.white} />
      </View>
      <TouchableOpacity onPress={() => onPress()} style={styles.wrapSkip}>
        <Text style={styles.txtSkip}>{'Bỏ qua'}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

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
                flex: item.value == '2' || item.value == '3' ? 2 : 1,
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
  const { onClickItem } = useSwapItem();
  const { item } = props;
  const colorInvoiceNumber =
    item.item.soHoaDon == NumberInvoiceStarter
      ? AppColors.black
      : AppColors.red;

  const colorStatus = item.item.maTrangThaiHoaDon == 3 ? AppColors.green : AppColors.colorSiver
  return (
    <TouchableOpacity
      onPress={() => onClickItem(item.item)}
      style={styles.wrapEnvoice}>
      <View style={styles.horizontalItem}>
        <Text
          style={{
            ...AppStyles.boldText,
            color: AppColors.black,
            fontSize: 12,
            lineHeight: 15,
            flex: 1,
          }}>
          {item?.item?.tenCongTy}
        </Text>
        {/* <Text style={styles.kyHieu}>{item.item.kyHieu}</Text> */}
        <Text style={{ ...AppStyles.boldText, textAlign: 'right', color: colorInvoiceNumber, fontSize: 14, lineHeight: 17, width: '20%' }}>
          {item?.item?.soHoaDon || ''}
        </Text>
      </View>

      <View style={styles.horizontalItem}>
        <Text style={{ ...AppStyles.baseText, color: AppColors.black }}>
          {"MST:" + (item?.item?.maSoThue || '')}
        </Text>
        <View style={styles.wrapStatus}>
          <Text style={AppStyles.lightText}>
            {item?.item?.ngayHoaDon || ''}
          </Text>
        </View>
      </View>

      <View style={styles.horizontalItem}>
        <Text style={{ ...AppStyles.lightText }}>
          {StatusInvoiceSortName[item?.item?.trangThaiDieuChinh] + " | "}<Text style={{ ...AppStyles.baseText, color: colorStatus }}>
            {item?.item?.trangThaiHoaDon}
          </Text>
        </Text>

        <Text style={{ ...AppStyles.boldText, color: AppColors.blue, fontSize: 14, lineHeight: 17 }}>
          {formatNumber(item?.item?.tongThanhToan) || 0}
        </Text>
      </View>

      {/* <Text style={styles.moneyTxt}>{item.item.tongThanhToanDisplay}</Text> */}
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
    const isHoaDonMTT = item?.typeOrther == "MTT"

    if (isHoaDonMTT && item.maLoaiHoaDon == "01") {
      // loại hoá đơn = 01 (Hoá đơn MTT GTGT)
      return Actions.hoaDonGTGTMTT({ hoaDonId: item.hoaDonId });
    }
    // loại hoá đơn = 02 (Hoá đơn MTT BH)
    if (isHoaDonMTT && item.maLoaiHoaDon == "02") {
      return Actions.hoaDonBHMTT({ hoaDonId: item.hoaDonId });
    }

    return Actions.createInvoice({ hoaDonId: item.hoaDonId });
  };
  return { onClickItem };
};

// Customer hook
const useSwapiInvoice = () => {
  const endDateDefauld = moment().format('DD/MM/YYYY');
  const startDateDefaul = moment()
    .subtract(1, 'months')
    .format('DD/MM/YYYY');
  const defaultPage = 1;
  const [filterSelectd, setFilter] = React.useState(Filters[3]);
  const [isShowSearch, setShowSearch] = React.useState(false);
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
  const [kyHieu, setKyHieu] = React.useState([]);
  const [mauSo, setMauSo] = React.useState([]);
  const [denominatorSelected, setDenominatorSelected] = React.useState({});
  const [symbolSelected, setSymbolSelected] = React.useState({});

  // Call API
  React.useEffect(() => {
    setLoading(true);
    const params = {
      page: page,
      matrangthaihoadon: filterSelectd.value,
      txtSearch: searchText || "",
      startDate: startDate,
      endDate: endDate,
      mauSo: denominatorSelected.value || '',
      kyHieu: symbolSelected.value || '',
    };
    API.DanhSachHDDT(params).then(
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

  const onGetKyHieu = () => {
    return API.getListKyHieu().then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          let kyHieuMix = res?.data?.data.map((item, index) => {
            return {
              text: item,
              value: item
            }
          })
          setKyHieu(kyHieuMix);
        }
      },
      err => {
        Dlog('error onGetKyHieu');
      },
    );
  };

  const onGetMauSo = () => {
    return API.getListMauSo().then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          let mauSoMix = res?.data?.data.map((item, index) => {
            return {
              text: item,
              value: item
            }
          })
          setMauSo(mauSoMix);
        }
      },
      err => {
        Dlog('error onGetMauSo');
      },
    );
  };

  React.useEffect(() => {
    onGetKyHieu();
    onGetMauSo();
  }, []);



  const onFilter = item => {
    setFilter(item);
    setInvoices(Invoices => []);
    setPage(defaultPage);
  };

  const onFilterTime = async dataFilter => {
    await setFilterSelected(dataFilter);
    await setStartDate(dataFilter.fromDate);
    await setEndDate(dataFilter.toDate);
    await setTextSearch(dataFilter.nameCustomer);
    await setInvoices(Invoices => []);
    await setSymbolSelected(dataFilter.symbolSelected);
    await setDenominatorSelected(dataFilter.denominatorSelected);
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
    isShowSearch,
    setShowSearch,
    refreshing,
    onRefresh,
    totalInvoice,
    onPressSearch,
    onFilterTime,
    filterSelecled,
    kyHieu,
    mauSo
  };
};

// Hàm render chính màn hình
const InvoiceListScreen = () => {
  const {
    Invoices,
    loading,
    loadMore,
    filterSelectd,
    onFilter,
    isShowSearch,
    onRefresh,
    refreshing,
    totalInvoice,
    onFilterTime,
    filterSelecled,
    kyHieu,
    mauSo
  } = useSwapiInvoice();

  const filterDraw = {
    onFilter: dataFilter => {
      onFilterTime(dataFilter);
    },
    filterSelecled: filterSelecled,
    dataKyHieu: kyHieu,
    dataMauSo: mauSo,
    dataLoaiHoaDon: []
  };

  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <View style={styles.container}>
        {!isShowSearch && (
          <AppHeader
            Icon={Menu}
            backgroundColor={AppColors.blue}
            titleColor={AppColors.white}
            iconColor={AppColors.white}
            title={'Danh sách hóa đơn điện tử'}
            subTitle={`(${totalInvoice} HĐ điện tử)`}
            RightIcon
            IconRight={Filter}
            onPressMenu={() => Actions.drawerOpen()}
            onPressRight={() => {
              FilterMoveInvoiceCQT.show(filterDraw);
            }}
          />
        )}
        {/* {isShowSearch && (
          <EnvoiceSearch
            onPressSkip={() => setShowSearch(false)}
            onChangeText={text => onPressSearch(text)}
          />
        )} */}
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
    paddingHorizontal: AppSizes.paddingXXSml,
    color: AppColors.black,
    fontSize: 16,
    textAlign: 'right'
  },
  statusTxt: {
    ...AppStyles.smallText,
    color: AppColors.colorSiver,
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
  iconSearch: { width: 19, height: 19 },
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
  txtSkip: { ...AppStyles.baseText, color: AppColors.white },
  kyHieu: {
    ...AppStyles.baseText,
    marginLeft: AppSizes.textInputHeight,
    color: AppColors.black,
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

export default InvoiceListScreen;
