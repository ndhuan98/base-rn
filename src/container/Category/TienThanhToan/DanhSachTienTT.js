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
  Alert,
} from 'react-native';
import {AppColors, AppStyles, AppSizes} from '@theme';
import AppHeader from '../../../components/AppHeader';
import Menu from '../../../image/svg/menu1.svg';
import PlusFull from '../../../image/svg/PlusFull';
import {Actions} from 'react-native-router-flux';
import Search from '../../../image/svg/Search.svg';
import {I18n} from '@constant';
import {SUCCESS_CODE} from '../../../ultil/NetworkHelper';
import Spinner from 'react-native-spinkit';
import {API} from '@network';
import {formatNumber} from '../../../ultil/EinvoiceSupport';
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
const useDonViTinh = () => {
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

    API.DanhSachTienThanhToan(params).then(
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
    id: item.maNtid,
    callbackref: () => onRefresh(),
  };
  return (
    <TouchableOpacity onPress={() => Actions.thongTinTienThanhToan(data)}>
      <View style={styles.item}>
        <Text style={styles.id}>{index + 1}</Text>
        <View style={styles.content}>
          <Text style={styles.title}>{item.tenNt}</Text>
          <Text style={styles.name}>{item.maNt}</Text>
        </View>
        <View style={styles.wrapTyGia}>
          <Text style={styles.titleTyGia}>
            {I18n.t('DanhSachTienThanhToan.tyGia')}
          </Text>
          <Text style={styles.txtTyGia}>{formatNumber(item.tyGia)}</Text>
        </View>
      </View>
      <View style={styles.line} />
    </TouchableOpacity>
  );
};
const DanhSachTienTT = () => {
  const {
    Customer,
    loading,
    loadMore,
    onRefresh,
    refreshing,
    onPressSearch,
    totalCustomer,
  } = useDonViTinh();
  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <View style={styles.container}>
        <AppHeader
          Icon={Menu}
          backgroundColor={AppColors.blue}
          titleColor={AppColors.white}
          iconColor={AppColors.white}
          title={I18n.t('DanhSachTienThanhToan.title')}
          subTitle={`(${totalCustomer} dữ liệu)`}
          RightIcon
          IconRight={PlusFull}
          onPressMenu={() => Actions.drawerOpen()}
          onPressRight={() =>
            Actions.themSuaTienThanhToan({callbackref: () => onRefresh()})
          }
        />
        <View style={styles.warpSearch}>
          <Search style={styles.iconSearch} fill={AppColors.textContent} />
          <TextInput
            onChangeText={text => onPressSearch(text)}
            placeholder={I18n.t('DanhSachTienThanhToan.placeholder')}
            placeholderTextColor={AppColors.colorSiver}
            style={styles.inputSearch}
          />
        </View>
        <FlatList
          data={Customer}
          renderItem={({item, index}) => (
            <Item item={item} index={index} onRefresh={onRefresh} />
          )}
          refreshing={refreshing}
          onRefresh={() => onRefresh()}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={10}
          onEndReached={() => loadMore()}
          onEndReachedThreshold={0.7}
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
    marginVertical: AppSizes.marginXXSml,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  content: {
    flex: 1,
  },
  id: {
    ...AppStyles.baseText,
    fontSize: AppSizes.fontBase,
    width: width * 0.07,
    paddingHorizontal: AppSizes.paddingXXXSml,
  },
  title: {
    ...AppStyles.boldText,
    color: AppColors.black,
    textAlign: 'justify',
    fontSize: AppSizes.fontBase,
    lineHeight: 18,
    width: '90%',
  },
  name: {
    ...AppStyles.baseText,
    lineHeight: 18,
    textAlign: 'justify',
    color: '#7A7B7F',
    width: '90%',
    fontSize: AppSizes.fontBase,
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
  txtTyGia: {
    ...AppStyles.baseText,
    fontSize: AppSizes.fontMedium,
    lineHeight: 19,
    color: AppColors.red,
    marginBottom: 4,
  },
  titleTyGia: {...AppStyles.baseText, color: '#7A7B7F'},
  wrapTyGia: {flex: 1, alignItems: 'flex-end'},
});
export default DanhSachTienTT;
