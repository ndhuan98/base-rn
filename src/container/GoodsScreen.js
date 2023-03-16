import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import StatusBarTSD from '../components/StatusBarTSD';
import {AppColors, AppStyles, AppSizes} from '../theme';
import AppHeader from '../components/AppHeader';
import Menu from '../image/svg/menu1.svg';
import PlusFull from '../image/svg/PlusFull';
import {Actions} from 'react-native-router-flux';
import {formatNumber} from '../ultil/EinvoiceSupport';
import Search from '../image/svg/Search.svg';
import {I18n} from '@constant';
import {API} from '@network';
import {SUCCESS_CODE} from '../ultil/NetworkHelper';
import Spinner from 'react-native-spinkit';
import _ from 'lodash';

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
const invoiceGoods = () => {
  const defaultPage = 1;
  const [Goods, setGoods] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = React.useState(defaultPage);
  const [totalPage, setTotalPage] = React.useState(1);
  const [searchText, setTextSearch] = React.useState('');
  const [totalGoods, setTotalGoods] = React.useState('0');
  const [isRefresh, setRefresh] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    const params = {
      page,
      txtSearch: searchText,
    };
    API.getAllHangHoa(params).then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          setGoods(Goods => [...Goods, ...res.data.data]);
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
  return {
    isRefresh,
    Goods,
    loading,
    refreshing,
    totalGoods,
    loadMore,
    onRefresh,
    onPressSearch,
  };
};
const Item = ({item, index, onRefresh}) => {
  const data = {
    id: item.idhanghoa,
    callbackref: ()=> onRefresh()
  };
  const loaiHang = _.isEmpty(item.loai_hang) ? null : I18n.t('goodsScreen.loaiHang');
  const donViTinh = _.isEmpty(item.don_vi_tinh) ? null : I18n.t('goodsScreen.donVi');
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => Actions.detailGoods(data)}>    
      <View style={{flexDirection: 'row'}}>
          <Text style={styles.id}>{index + 1}</Text>
          <View style={{flexDirection:'column', flex:1}}>
          <View style={styles.content}>
            <Text style={styles.title}>{item.ten_hang}</Text>
            </View>
          <View style={styles.content}>
            <Text style={styles.maHang}>
              {I18n.t('goodsScreen.maHang')}
              {item.ma_hang}
            </Text>
            <Text numberOfLines={1} style={styles.loaiHang}>
                {loaiHang}{item.loai_hang}
            </Text>
          </View>
          <View style={styles.content1}>
            <Text style={styles.giaTien}>{formatNumber(item.gia_xuat)}</Text>
            <Text style={styles.donVi}>
             {donViTinh}{item.don_vi_tinh}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const GoodsScreen = () => {
  const {
    Goods,
    loading,
    loadMore,
    onRefresh,
    refreshing,
    onPressSearch,
    totalGoods,
  } = invoiceGoods();
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
          onPressMenu={() => Actions.drawerOpen()}
          onPressRight={() => Actions.addGoods({callbackref: () => onRefresh()})}
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
          onRefresh={() => onRefresh()}
          renderItem={({item, index}) => <Item item={item} index={index} onRefresh={onRefresh}/>}
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
    borderBottomWidth:1,
    borderColor:AppColors.lightgray
  },
  title: {
    ...AppStyles.boldText,
    fontSize: AppSizes.fontSmall,
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
    lineHeight: 16,
    color: AppColors.blue,
    fontSize: AppSizes.fontSmall,
  },
  donVi: {
    ...AppStyles.lightText,
    lineHeight: 16,
    width: '45%',
    color: AppColors.black,
    textAlign: 'right',
    fontSize: AppSizes.fontSmall,
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
  iconSearch: {marginLeft: AppSizes.margin, width: 19, height: 19},
});
export default GoodsScreen;
