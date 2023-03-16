import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
  Dimensions
} from 'react-native';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';
import {AppStyles, AppSizes, AppColors} from '../../theme';
import {I18n} from '@constant';
import {API} from '@network';
import Dlog from '../../components/Dlog';
import {SUCCESS_CODE} from '../../ultil/NetworkHelper';
import Search from '../../image/svg/Search.svg';
import {formatNumber} from '../../ultil/EinvoiceSupport';
import {DeviceUtil, InvoiceUtil} from '@util';
const {height} = Dimensions.get('window');
class ProductListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSearch: false,
      products: [],
      currentPage: 1,
      txtSearch: '',
      totalPage: 1,
    };
  }
  // hàm thực hiện đóng drawer action
  static hide() {
    Actions.pop();
  }

  // hàm thực hiện show drawer action
  static show(props) {
    Actions.productList({...props});
  }

  // hàm đóng drawer action kèm theo animation
  closeModal = () => {
    this.refs.body.fadeOutRight(300).then(() => Actions.pop());
  };

  // Hàm lựa chọn hàng hoá
  onSelectedItem = item => {
    this.props.actionSelected && this.props.actionSelected(item);
    this.refs.body.fadeOutRight(300).then(() => Actions.pop());
  };

  // Gọi API lần đầu mở compnent
  componentDidMount() {
    this.requestDataFormSever();
  }

  // Gọi API lấy danh sách hàng hoá
  requestDataFormSever = () => {
    const {currentPage, txtSearch} = this.state;
    const params = {
      currentPage,
      txtSearch,
    };
    return API.ProductList(params).then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          const Product =
            currentPage == 1
              ? res.data.data
              : [...this.state.products, ...res.data.data];

          this.setState({
            products: Product,
            totalPage: res.data.totalPage,
          });
        }
      },
      err => {
        Dlog('ProductList err', err);
      },
    );
  };

  onLoadMore = () => {
    const {currentPage, totalPage} = this.state;
    if (currentPage <= totalPage) {
      this.setState({currentPage: currentPage + 1}, () => {
        this.requestDataFormSever();
      });
    }
  };

  onSearch = text => {
    this.setState({txtSearch: text, currentPage: 1}, () =>
      this.requestDataFormSever(),
    );
  };

  // Render Item Product
  ItemProduct = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.onSelectedItem(item)}>
        <View style={styles.wrapItem}>
          <Text style={{...AppStyles.boldText,color:AppColors.black}}>{item.ten_hang}</Text>
          <View style={styles.flexRow}>
            <View style={AppStyles.flex1}>
              <Text style={AppStyles.smallText}>{item.ma_hang}</Text>
              <Text style={{...AppStyles.smallText, color: AppColors.blue}}>
                {formatNumber(item.gia_xuat)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  // hàm render chính
  render() {
    const {title} = this.props;
    const {loading} = this.state;
    const { isShowSearch } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={AppStyles.flex1}
          onPress={() => this.closeModal()}
        />
        <Animatable.View
          ref={'body'}
          animation="slideInRight"
          duration={300}
          style={styles.draw}>
          <View style={styles.wrapContent}>
            <View style={styles.header}>
              <Text style={styles.textListDS}>
                {title || 'Danh sách hàng hoá'}
              </Text>
              <TouchableOpacity style={styles.box} onPress={() => this.closeModal()}>
                <Text style={styles.Skip}>
                  {I18n.t('common.skip')}
                </Text>
              </TouchableOpacity>
            </View>
            {!isShowSearch && (
            <TouchableOpacity
              onPress={() => this.setState({ isShowSearch: true })}
              style={styles.containerSearch}>
              <Search fill={AppColors.black} style={styles.iconSearch} />
              <Text
                style={{
                  ...AppStyles.baseText,
                  color: AppColors.black,
                  paddingVertical: AppSizes.paddingXSml,
                }}>
                {I18n.t('common.search')}
              </Text>
            </TouchableOpacity>
          )}
          {isShowSearch && (
            <View style={styles.wrapSearch}>
              <TextInput
                onChangeText={text => this.onSearch(text)}
                placeholderTextColor={AppColors.black}
                autoFocus={true}
                placeholder={I18n.t('common.search')}
                style={styles.txtSearch}
              />
            </View>
          )}
            <View style={styles.wrapList}>
              <FlatList
                data={this.state.products}
                keyExtractor={(item, index) => index.toString()}
                renderItem={item => this.ItemProduct(item)}
                onEndReached={() => this.onLoadMore()}
                onEndReachedThreshold={1}
                ListFooterComponent={
                  loading ? <ActivityIndicator /> : undefined
                }
              />
            </View>
          </View>
        </Animatable.View>
      </View>
    );
  }
}

// styles của drawer
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    flexDirection: 'row',
    backgroundColor: AppColors.backgroundDialog,
  },

  draw: {
    backgroundColor: 'white',
    width: '70%',
    height: '100%',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: DeviceUtil.isIPhoneX() ? height * 0.047 : height * 0.027,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:AppSizes.marginXSml
  },
  wrapSearch: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C2C7E2',
    borderWidth: 1,
    borderColor: AppColors.blue,
    borderRadius: AppSizes.borderRadius,
  },
  txtSearch: {
    ...AppStyles.baseText,
    width: '100%',
    paddingHorizontal: AppSizes.paddingXSml,
    color: AppColors.blue,
    marginVertical: Platform.OS === 'ios' ? AppSizes.paddingSml : undefined,
  },
  wrapList: {flex: 1, width: '100%'},
  wrapItem: {
    width: '100%',
    paddingVertical: AppSizes.paddingSml,
    borderBottomWidth: 1,
    borderColor: AppColors.border,
  },
  wrapBottom: {
    padding: AppSizes.paddingXXSml,
    width: '100%',
    backgroundColor: AppColors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  wrapContent: {
    width: '100%',
    height: '100%',
    flex: 1,
    paddingHorizontal: AppSizes.paddingSml * 1.5,
  },
  wrapItem: {
    width: '100%',
    paddingVertical: AppSizes.paddingXSml,
    borderBottomWidth: 1,
    borderColor: AppColors.border,
  },
  wrapRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {width: 24, height: 24},
  flexRow: {flexDirection: 'row'},
  textListDS:{
    ...AppStyles.boldText,
     color: AppColors.black,
  },
  Skip:{
    ...AppStyles.baseText,
    lineHeight: 18,
    fontSize: 15,
    color: AppColors.white,
    textAlign: 'center',
  },
  box: {
    borderRadius: 20,
    backgroundColor: '#4D5EAB',
    paddingVertical: AppSizes.paddingXXSml,
    paddingHorizontal: AppSizes.margin,
  },
  iconSearch: {
    width: 18,
    height: 18,
    marginHorizontal: AppSizes.paddingXXSml,
    marginVertical: AppSizes.paddingSml,
  },
  containerSearch: {
    width: '100%',
    backgroundColor: '#E7E7E9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: AppSizes.borderRadius,
  },
});

export default ProductListScreen;
