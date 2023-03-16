import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import StatusBarTSD from '../components/StatusBarTSD';
import {AppColors, AppStyles, AppSizes, AppFonts} from '../theme';
import AppHeader from '../components/AppHeader';
import Menu from '../image/svg/menu1.svg';
import PlusFull from '../image/svg/PlusFull';
import {Actions} from 'react-native-router-flux';
import Search from '../image/svg/Search.svg';
import {I18n} from '@constant';
import {SUCCESS_CODE} from '../ultil/NetworkHelper';
import Spinner from 'react-native-spinkit';
import {API} from '@network';
const {height, width} = Dimensions.get('window');
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
const invoiceCustomer = () => {
  const defaultPage = 1;
  const [Customer, setCustomer] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = React.useState(defaultPage);
  const [totalPage, setTotalPage] = React.useState(1);
  const [searchText, setTextSearch] = React.useState('');
  const [totalCustomer, setTotalCustomer] = React.useState('0');
  const [isRefresh, setRefresh] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    const params = {
      page,
      txtSearch: searchText,
    };

    API.getAllDoiTac(params).then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          setCustomer(Customer => [...Customer, ...res.data.data]);
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
  }, [page, isRefresh, searchText]);
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
  };
};

const Item = ({item, index, onRefresh}) => {
  const data = {
    id: item.id_doitac,
    callbackref: ()=> onRefresh()
  };
  return (
    <TouchableOpacity onPress={() => Actions.detailCustomer(data)}>
      <View style={styles.item}>
        <Text style={styles.id}>{index + 1}</Text>
        <View style={styles.content}>
          <Text style={styles.title}>{item.ten_doi_tac}</Text>
          <Text style={styles.name}>{item.dia_chi}</Text>
          <View style={styles.row}>
            <Text style={styles.MST}>
              {I18n.t('invoiceCustomer.MST')} {item.ma_so_thue}
            </Text>
            <Text style={styles.maKH}>
              {I18n.t('invoiceCustomer.maKH')} {item.ma_doi_tac}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.line} />
    </TouchableOpacity>
  );
};
const InvoiceCustomer = () => {
  const {
    Customer,
    loading,
    loadMore,
    onRefresh,
    refreshing,
    onPressSearch,
    totalCustomer,
  } = invoiceCustomer();
  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <View style={styles.container}>
        <AppHeader
          Icon={Menu}
          backgroundColor={AppColors.blue}
          titleColor={AppColors.white}
          iconColor={AppColors.white}
          title={I18n.t('invoiceCustomer.title')}
          subTitle={`(${totalCustomer} Khách hàng)`}
          RightIcon
          IconRight={PlusFull}
          onPressMenu={() => Actions.drawerOpen()}
          onPressRight={() =>
            Actions.addCustomer({callbackref: () => onRefresh()})
          }
        />
        <View style={styles.warpSearch}>
          <Search style={styles.iconSearch} fill={AppColors.textContent} />
          <TextInput
            onChangeText={text => onPressSearch(text)}
            placeholder={I18n.t('invoiceCustomer.placeholder')}
            placeholderTextColor={AppColors.colorSiver}
            style={styles.inputSearch}
          />
        </View>
        <FlatList
          data={Customer}
          renderItem={({item, index}) => <Item item={item} index={index} onRefresh={onRefresh} />}
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
  item: {
    flexDirection: 'row',
    marginHorizontal: AppSizes.marginSml,
    marginTop: AppSizes.margin,
    marginBottom: AppSizes.marginXSml
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
    marginTop: AppSizes.marginSml
  },
  maKH: {
    ...AppStyles.baseText,
    lineHeight: 16,
    color: AppColors.black,
    fontSize: AppSizes.fontSmall,
  },
  MST: {
    ...AppStyles.baseText,
    color: AppColors.darkblue,
    lineHeight: 16,
    fontSize: AppSizes.fontSmall,
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
  iconSearch: {marginLeft: AppSizes.margin, width: 19, height: 19},
});
export default InvoiceCustomer;
