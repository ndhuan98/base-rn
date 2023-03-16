import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import {AppColors, AppStyles, AppSizes, AppFonts} from '../theme';
import StatusBarTSD from '../components/StatusBarTSD';
import AppHeader from '../components/AppHeader';
import {Actions} from 'react-native-router-flux';
import Search from '../image/svg/Search.svg';
import * as Animatable from 'react-native-animatable';
import {API} from '@network';
import {SUCCESS_CODE} from '../ultil/NetworkHelper';
import Spinner from 'react-native-spinkit';
import moment from 'moment';
import Menu from '../image/svg/menu1.svg';
import SendInvoiceMail from '../container/lightbox/SendInvoiceMail';
import _ from 'lodash';
import { NumberInvoiceStarter } from '../ultil/EinvoiceSupport';
// Khởi tạo danh sách lựa chọn lọc hoá đơn
const Filters = [
  {
    title: 'Đã gửi',
    value: '2',
  },
  {
    title: 'Chưa gửi',
    value: '1',
  },
  {
    title: 'Gửi email lỗi',
    value: '3',
  },
  {
    title: 'Tất cả',
    value: '0',
  },
];

//  hàm render chính của màn hình
const EnvoiceSearch = props => {
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

const FilterMailEnvoice = props => {
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
const EnvoiceMailItem = props => {
  const {item} = props;
  const colorInvoiceNumber =
    item.item.so_hoa_don == NumberInvoiceStarter ? AppColors.black : AppColors.red;
  const ngay_hoa_don = moment(item.item.ngay_hoa_don).format('DD/MM/YYYY');
  const email_sendtime = item.item.email_sendtime
    ? moment(item.item.email_sendtime).format('DD/MM/YYYY')
    : '';
  const params = {
    hoaDonId: item.item.dhoadonid,
  };
  return (
    <TouchableOpacity
      onPress={() => SendInvoiceMail.show(params)}
      style={styles.wrapEnvoice}>
      <View style={styles.horizontalItem}>
        <Text
          style={{
            ...AppStyles.semiboldText,
            color: '#313131',
            flex: 1,
            marginRight:60,
          }}>
          {item.item.ten_don_vi}
        </Text>
        <Text style={styles.ngayHoaDon}>{email_sendtime}</Text>
      </View>

      <View style={styles.horizontalItem}>
        <Text style={{...AppStyles.baseText, color: colorInvoiceNumber}}>
          {item.item.so_hoa_don}
        </Text>
        <View style={styles.wrapStatus}>
          <Text style={styles.statusTxt}>
            {item.item.trang_thai_email || 'status'}
          </Text>
        </View>
      </View>
      <Text style={styles.ngayHoaDon2}>{ngay_hoa_don}</Text>
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

// Customer hook
const useSwapiInvoice = () => {
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
  // Call API
  React.useEffect(() => {
    setLoading(true);
    const params = {
      page,
      statusEmail: filterSelectd.value,
      txtSearch: searchText,
      startDate: moment()
        .subtract(6, 'months')
        .format('DD/MM/YYYY'),
      endDate: moment().format('DD/MM/YYYY'),
    };
    API.DanhSachEmail(params).then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          setInvoices(Invoices => [...Invoices, ...res.data.data]);
          setTotalInvoice(res.data.totalCountData);
          setTotalPage(res.data.totalPage);
          setLoading(false);
          setRefreshing(false);
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
    if (!_.isEqual(item, filterSelectd)) {
      setFilter(item);
      setInvoices(Invoices => []);
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
  };
};

// Hàm render chính màn hình
const MailListScreen = () => {
  const {
    Invoices,
    loading,
    loadMore,
    filterSelectd,
    onFilter,
    isShowSearch,
    setShowSearch,
    onRefresh,
    refreshing,
    totalInvoice,
    onPressSearch,
  } = useSwapiInvoice();
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
            title={'Quản lý gửi email'}
            RightIcon
            IconRight={Search}
            onPressMenu={() => Actions.drawerOpen()}
            onPressRight={() => setShowSearch(true)}
          />
        )}
        {isShowSearch && (
          <EnvoiceSearch
            onPressSkip={() => setShowSearch(false)}
            onChangeText={text => onPressSearch(text)}
          />
        )}
        <FilterMailEnvoice
          itemSelected={filterSelectd}
          onPressItem={item => (loading ? {} : onFilter(item))}
        />
        <FlatList
          data={Invoices}
          renderItem={item => <EnvoiceMailItem item={item} />}
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
    paddingHorizontal: AppSizes.paddingXSml,
  },
  horizontalItem: {flexDirection: 'row', justifyContent: 'space-between'},
  statusTxt: {
    ...AppStyles.semiboldText,
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
    color: AppColors.colorSiver,
    fontSize: 12,
    marginLeft: AppSizes.textInputHeight
  },
  ngayHoaDon2: {
    ...AppStyles.baseText,
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

export default MailListScreen;
