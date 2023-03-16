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
import AppHeader from '../components/AppHeader';
import Menu from '../image/svg/menu1.svg';
import {Actions} from 'react-native-router-flux';
import Filter from '../image/svg/Filter.svg';
import {API} from '@network';
import {SUCCESS_CODE} from '../ultil/NetworkHelper';
import Spinner from 'react-native-spinkit';
import {formatNumber} from '../ultil/EinvoiceSupport';
import FilterReport from '../container/lightbox/FilterReport';
import {I18n} from '@constant';
import ButtonText from '../components/ButtonText';
import ReportDetail from '../container/lightbox/ReportDetail';
import ProcessEinvoiceSheet from '../container/lightbox/ProcessEinvoiceSheet';
import moment from 'moment';
import Dlog from '../components/Dlog';
import PreviewActionSheet from '../container/lightbox/PreviewActionSheet';
import _ from 'lodash';
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

const ReportHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerID}>{I18n.t('reportScreen.stt')}</Text>
      <Text style={styles.headerSoHD}>{I18n.t('reportScreen.soHoaDon')}</Text>
      <Text style={styles.headerTenKH}>
        {I18n.t('reportScreen.tenKhachHang')}
      </Text>
      <Text numberOfLines={1} style={styles.headerTongTien}>
        {I18n.t('reportScreen.tongTien')}
      </Text>
    </View>
  );
};

const Item = ({id, tenKhachHang, date, tongTien, soHoaDon, dhoadonid}) => {
  const tongSoTien = new Number(tongTien);

  let colors = ['white', '#F1F1F2'];
  const dateTime = moment(date).format('DD/MM/yyyy');

  const sheet = {
    title: I18n.t('reportScreen.xemHoaDon'),
    hoaDonId: dhoadonid,
    confirmAction: () => {
      PreviewActionSheet.hide();
    },
  };

  return (
    <TouchableOpacity
      onPress={() => {
        PreviewActionSheet.show(sheet);
      }}
      style={{
        ...styles.content,
        backgroundColor: colors[id % colors.length],
      }}>
      <Text style={styles.id}>{id + 1}</Text>
      <View style={styles.box}>
        <Text style={styles.soHoaDon}>{soHoaDon}</Text>
        <Text style={styles.date}>{dateTime}</Text>
      </View>
      <Text numberOfLines={2} style={styles.tenKhachHang}>
        {tenKhachHang}
      </Text>
      <Text style={styles.tongTien}>{formatNumber(tongSoTien)}</Text>
    </TouchableOpacity>
  );
};
const Footer = ({total}) => {
  const params = {
    dataReports: total,
  };
  return (
    <TouchableOpacity
      onPress={() => {
        // ReportDetail.show(params);
        ProcessEinvoiceSheet.show(params)
      }}
      style={styles.footer}>
      <Text style={styles.tongThanhToan}>
        {I18n.t('reportScreen.tongGiaTri')}
      </Text>
      <Text style={styles.thanhTien}>
        {formatNumber(total.tong_tien_thanh_toan)}
      </Text>
    </TouchableOpacity>
  );
};

const useSwapReport = () => {
  const endDateDefauld = moment().format('DD/MM/YYYY');
  const startDateDefaul = moment()
    .subtract(1, 'months')
    .format('DD/MM/YYYY');

  const defaultPage = 1;
  const [Reports, setReports] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = React.useState(defaultPage);
  const [totalPage, setTotalPage] = React.useState(1);
  const [totalReport, setTotalReport] = React.useState('0');
  const [isRefresh, setRefresh] = React.useState(false);
  const [startDate, setStartDate] = React.useState(startDateDefaul);
  const [endDate, setEndDate] = React.useState(endDateDefauld);
  const [total, setTotal] = React.useState({});
  const [nameCustomer, setNameCustomer] = React.useState('');
  const [filterSelecled, setFilterSelected] = React.useState({});

  React.useEffect(() => {
    setLoading(true);
    const params = {
      currentPage: page,
      endDate: endDate,
      startDate: startDate,
      tenKhachHang: nameCustomer,
    };

    API.getReports(params).then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          setReports(Reports => [...Reports, ...res.data.data.dataBaoCao]);
          setTotalPage(res.data.totalPage);
          setTotalReport(res.data.totalCountData);
          setTotal(res.data.data.total);
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
            return Alert.alert(I18n.t('common.notice'), res.data.msg);
          }
        }
      },
      err => {
        setLoading(false);
        setRefreshing(false);
      },
    );
  }, [page, isRefresh]);

  const onRefresh = async () => {
    await setStartDate(startDateDefaul);
    await setEndDate(endDateDefauld);
    await setNameCustomer('');
    await setReports(Reports => []);
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
  };

  const onFilter = async dataFilter => {
    await setFilterSelected(dataFilter);
    await setStartDate(dataFilter.fromDate);
    await setEndDate(dataFilter.toDate);
    await setNameCustomer(dataFilter.nameCustomer);
    await setReports(Reports => []);

    if (page == defaultPage) {
      setRefresh(!isRefresh);
    } else {
      setPage(defaultPage);
    }
  };

  return {
    isRefresh,
    Reports,
    loading,
    refreshing,
    totalReport,
    total,
    loadMore,
    onRefresh,
    onFilter,
    filterSelecled,
  };
};

const ReportScreen = ({params}) => {
  const {
    totalReport,
    Reports,
    loading,
    loadMore,
    refreshing,
    onRefresh,
    onFilter,
    total,
    filterSelecled,
  } = useSwapReport();

  const filter = {
    onFilter: dataFilter => {
      onFilter(dataFilter);
    },
    filterSelecled: filterSelecled,
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
          title={'Báo cáo bán hàng'}
          subTitle={`(${totalReport} dòng hàng)`}
          RightIcon
          IconRight={Filter}
          onPressMenu={() => Actions.drawerOpen()}
          onPressRight={() => {
            FilterReport.show(filter);
          }}
        />
        <ReportHeader />
        <FlatList
          data={Reports}
          refreshing={refreshing}
          onRefresh={() => onRefresh()}
          renderItem={({item, index}) => (
            <Item
              id={index}
              dhoadonid={item.dhoadonid}
              soHoaDon={item.so_hoa_don}
              tenKhachHang={item.ten_khach_hang}
              tongTien={item.tong_thanh_toan}
              date={item.ngay_hoa_don}
            />
          )}
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
        <Footer total={total} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  header: {
    ...AppStyles.baseText,
    backgroundColor: AppColors.siver,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  headerID: {
    ...AppStyles.baseText,
    color: AppColors.black,
    width: '10%',
    textAlign: 'center',
  },
  headerSoHD: {
    ...AppStyles.baseText,
    color: AppColors.black,
    width: '25%',
  },
  headerTenKH: {
    ...AppStyles.baseText,
    color: AppColors.black,
    width: '35%',
  },
  headerTongTien: {
    ...AppStyles.baseText,
    color: AppColors.black,
    width: '30%',
    textAlign: 'right',
    alignItems: 'center',
    paddingRight: AppSizes.paddingSml,
  },
  content: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: AppSizes.paddingXXSml,
    paddingHorizontal: AppSizes.paddingXXSml,
  },
  id: {
    ...AppStyles.baseText,
    width: '10%',
    textAlign: 'center',
    color: AppColors.gray,
  },
  box: {
    width: '25%',
    flexDirection: 'column',
  },
  soHoaDon: {
    ...AppStyles.baseText,
    color: AppColors.red,
  },
  date: {
    ...AppStyles.baseText,
    color: AppColors.colorSiver,
  },
  tenKhachHang: {
    ...AppStyles.baseText,
    width: '40%',
    textAlign: 'left',
    color: AppColors.black,
  },
  tongTien: {
    ...AppStyles.boldText,
    color: AppColors.black,
    fontSize: 14,
    width: '25%',
    textAlign: 'right',
    paddingRight: AppSizes.paddingSml,
  },
  footer: {
    backgroundColor: AppColors.siver,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tongThanhToan: {
    ...AppStyles.boldText,
    color: AppColors.black,
    fontSize: AppSizes.fontBase,
    marginLeft: AppSizes.listItemBaseHeight,
  },
  thanhTien: {
    ...AppStyles.boldText,
    color: AppColors.blue,
    marginRight: AppSizes.marginSml,
  },
});

export default ReportScreen;
