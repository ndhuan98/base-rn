import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {AppStyles, AppSizes, AppColors} from '../../theme';
import {I18n} from '@constant';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import {API} from '@network';
import Dlog from '../../components/Dlog';
import {SUCCESS_CODE} from '../../ultil/NetworkHelper';
import Search from '../../image/svg/Search.svg';
import {DeviceUtil} from '@util';

class DrawerLoaiHang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSearch: false,
      loaiHang: [],
      curentPage: 1,
      txtSearch: '',
      totalPage: 1,
    };
  }
  static hide() {
    Actions.pop();
  }
  static show(props) {
    Actions.loaiHang({...props});
  }
  closeModal = () => {
    this.refs.body.fadeOutRight(300).then(() => Actions.pop());
  };
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
    const {curentPage, txtSearch} = this.state;
    const params = {
      curentPage,
      txtSearch,
    };
    return API.loaiHang(params).then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          const LoaiHang =
            curentPage == 1
              ? res.data.data
              : [...this.state.loaiHang, ...res.data.data];

          this.setState({
            loaiHang: LoaiHang,
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
    const {curentPage, totalPage} = this.state;
    if (curentPage <= totalPage) {
      this.setState({curentPage: curentPage + 1}, () => {
        this.requestDataFormSever();
      });
    }
  };

  onSearch = text => {
    this.setState({txtSearch: text, curentPage: 1}, () =>
      this.requestDataFormSever(),
    );
  };
  ItemProduct = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.onSelectedItem(item)}>
        <View style={styles.wrapItem}>
          <Text style={AppStyles.semiboldText}>{item.ten_loai_hang}</Text>
          <Text style={{...AppStyles.baseText}}>Ghi Chú: {item.ghi_chu}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {title} = this.props;
    const {loading} = this.state;
    const {isShowSearch} = this.state;
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
              <TouchableOpacity
                style={styles.box}
                onPress={() => this.closeModal()}>
                <Text style={styles.Skip}>{I18n.t('common.skip')}</Text>
              </TouchableOpacity>
            </View>
            {!isShowSearch && (
              <TouchableOpacity
                onPress={() => this.setState({isShowSearch: true})}
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
                data={this.state.loaiHang}
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
    ...Platform.select({
      ios: {
        paddingVertical: DeviceUtil.isIPhoneX()
          ? AppSizes.paddingSml * 3.5
          : AppSizes.padding,
      },
      android: {
        paddingVertical: AppSizes.paddingXSml,
      },
    }),
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: AppSizes.marginXSml,
  },
  wrapSearch: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C2C7E2',
    borderWidth: 1,
    borderColor: AppColors.blue,
    borderRadius: AppSizes.borderRadius,
    marginBottom: AppSizes.marginXSml,
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
    borderBottomWidth: 1,
    borderColor: AppColors.border,
    paddingVertical: AppSizes.margin,
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
  wrapRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {width: 24, height: 24},
  flexRow: {flexDirection: 'row'},
  textListDS: {
    ...AppStyles.boldText,
    color: AppColors.black,
  },
  Skip: {
    ...AppStyles.baseText,
    color: AppColors.white,
    textAlign: 'center',
  },
  box: {
    backgroundColor: '#4D5EAB',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 16,
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
    marginBottom: AppSizes.marginSml,
  },
});
export default DrawerLoaiHang;
