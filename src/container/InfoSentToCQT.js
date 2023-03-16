import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {AppColors, AppStyles, AppSizes} from '../theme';
import StatusBarTSD from '../components/StatusBarTSD';
import {AppHeader, Dlog} from '@components';
import Menu from '../image/svg/menu1.svg';
import {Actions} from 'react-native-router-flux';
import {API} from '@network';
import {SUCCESS_CODE} from '../ultil/NetworkHelper';
import Spinner from 'react-native-spinkit';
import FilterSendInvoiceCQT from './lightbox/FilterSendInvoiceCQT';
import moment from 'moment';
import Filter from '../image/svg/Filter.svg';
import {I18n} from '@constant';
import _ from 'lodash';

// Hàm render mẫu Item của danh sách hoá đơn
const EnvoiceItem = props => {
  const {onClickItem} = useSwapItem();
  const {item} = props;

  let colorStatus =
    item.item.trangThaiPhanHoi > 0
      ? AppColors.customSuccess
      : AppColors.customError;

  if (item.item.trangThaiGui == 0) colorStatus = AppColors.blueBackground;
  return (
    <TouchableOpacity
      onPress={() => onClickItem(item.item)}
      style={styles.wrapEnvoice}>
      <Text
        style={[
          AppStyles.boldText,
          {
            fontSize: 12,
            lineHeight: 14,
            color: '#313131',
            paddingHorizontal: AppSizes.paddingXXSml,
            paddingBottom: AppSizes.paddingXXSml,
          },
        ]}>
        {item.item.tenThongDiep}
      </Text>

      <View style={styles.horizontalItem}>
        <Text
          style={{
            ...AppStyles.baseText,
            color: AppColors.colorSiver,
            fontSize: 12,
            lineHeight: 14,
          }}>
          {'Số lượng: '}
          <Text style={{color: '#313131'}}>{item.item.soLuong}</Text>
        </Text>
        <Text style={styles.ngayHoaDon}>{item.item.thoiGianGuiTextFull}</Text>
      </View>

      <View style={styles.horizontalItem}>
        <Text
          style={{
            ...AppStyles.baseText,
            color: AppColors.colorSiver,
            fontSize: 12,
            lineHeight: 14,
          }}>
          {'Dung lượng: '}
          <Text style={{color: '#313131'}}>{item.item.dungLuongFormat}</Text>
        </Text>
        <Text style={[styles.statusTxt, {color: colorStatus}]}>
          {item.item.trangThaiPhanHoiText}
        </Text>
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
  const onClickItem = item => {
    Actions.sentInfoCQTpopup({infoSentCQT: item});
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
  const [Invoices, setInvoices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = React.useState(defaultPage);
  const [totalPage, setTotalPage] = React.useState(1);
  const [totalInvoice, setTotalInvoice] = React.useState('0');
  const [isRefresh, setRefresh] = React.useState(false);
  const [startDate, setStartDate] = React.useState(startDateDefaul);
  const [endDate, setEndDate] = React.useState(endDateDefauld);
  const [filterSelecled, setFilterSelected] = React.useState({});

  const [loaiTruyenNhan, setLoaiTruyenNhan] = React.useState([]);
  const [trangThaiTruyenNhan, setTrangThaiTruyenNhan] = React.useState([]);
  const [statusSelected, setStatusSelected] = React.useState();
  const [typeSelected, setTypeSelected] = React.useState();

  const onGetListLoaiTruyenNhan = () => {
    return API.getLoaiTruyenNhan().then(
      res => {
        if (res.data && res.data.code == 1) setLoaiTruyenNhan(res?.data?.data);
      },
      err => {
        Dlog('error onGetListLoaiTruyenNhan');
      },
    );
  };

  const onGetListTrangThaiTruyenNhan = () => {
    return API.getTrangThaiTruyenNhan().then(
      res => {
        if (res.data && res.data.code == 1)
          setTrangThaiTruyenNhan(res?.data?.data);
      },
      err => {
        Dlog('error onGetListTrangThaiTruyenNhan');
      },
    );
  };

  React.useEffect(() => {
    onGetListLoaiTruyenNhan();
    onGetListTrangThaiTruyenNhan();
  }, []);

  // Call API
  React.useEffect(() => {
    setLoading(true);
    const params = {
      curentPage: page,
      ids: null,
      tuNgay: startDate,
      denNgay: endDate,
      trangThaiPhanHoi: statusSelected?.value || '',
      loaiThongBao: typeSelected?.value || '',
    };
    API.listInfoSentToCQT(params).then(
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
          return Alert.alert(I18n.t('common.notice'), res.data.desc);
        }
      },
      err => {
        setLoading(false);
        setRefreshing(false);
      },
    );
  }, [page, isRefresh]);

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

  const onFilterTime = async dataFilter => {
    console.log(`dataFilter`, dataFilter);
    await setFilterSelected(dataFilter);
    await setStartDate(dataFilter.fromDate);
    await setEndDate(dataFilter.toDate);
    await setInvoices([]);
    await setStatusSelected(dataFilter.statusSelected);
    await setTypeSelected(dataFilter.typeSelected);

    if (page == defaultPage) {
      setRefresh(!isRefresh);
    } else {
      setPage(defaultPage);
    }
  };

  return {
    Invoices,
    loading,
    loadMore,
    refreshing,
    onRefresh,
    totalInvoice,
    onFilterTime,
    filterSelecled,
    loaiTruyenNhan,
    trangThaiTruyenNhan,
  };
};

// Hàm render chính màn hình
const InfoSentToCQT = () => {
  const {
    Invoices,
    loading,
    loadMore,
    onRefresh,
    refreshing,
    totalInvoice,
    onFilterTime,
    loaiTruyenNhan,
    trangThaiTruyenNhan,
    filterSelecled,
  } = useSwapiInvoice();

  const filterDraw = {
    onFilter: dataFilter => {
      onFilterTime(dataFilter);
    },
    filterSelecled,
    dataLoaiTruyenNhan: loaiTruyenNhan,
    dataTrangThaiTruyenNhan: trangThaiTruyenNhan,
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
          title={'Thông điệp gửi'}
          subTitle={`(${totalInvoice} dữ liệu)`}
          RightIcon
          IconRight={Filter}
          onPressMenu={() => Actions.drawerOpen()}
          onPressRight={() => {
            FilterSendInvoiceCQT.show(filterDraw);
          }}
        />

        <FlatList
          data={Invoices}
          renderItem={item => <EnvoiceItem item={item} />}
          refreshing={refreshing}
          onRefresh={() => onRefresh()}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={10}
          onEndReached={() => loadMore()}
          onEndReachedThreshold={0.5}
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
  statusTxt: {
    ...AppStyles.boldText,
    color: AppColors.colorSiver,
    fontSize: 12,
    lineHeight: 14,
    marginTop: AppSizes.marginXXSml,
  },

  ngayHoaDon: {
    ...AppStyles.lightText,
    marginLeft: AppSizes.textInputHeight,
    color: AppColors.colorSiver,
    fontSize: 12,
  },
});

export default InfoSentToCQT;
