import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
  Dimensions,
} from 'react-native';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';
import {AppStyles, AppSizes, AppColors, AppFonts} from '../../theme';
import {I18n} from '@constant';
import {DeviceUtil, InvoiceUtil} from '@util';
const {height} = Dimensions.get('window');
import Search from '../../image/svg/Search.svg';

const KhachHangRow = ({data}) => {
  return (
    <View style={{width: '100%'}}>
      <Text style={{...AppStyles.boldText, fontSize: AppFonts.base.size}}>
        {data.ten_dv}
      </Text>
      <Text style={AppStyles.hintText}>{`MKH: ${data.ma_dv}`}</Text>
      <Text style={{...AppStyles.baseText, color: AppColors.blue}}>
        {`MST: ${data.ma_so_thue}`}
      </Text>
    </View>
  );
};

class DrawerAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSearch: false,
      typeScreen: props.typeScreen,
      searchText: '',
      dataList: props.dataList,
    };
  }
  // hàm thực hiện đóng drawer action
  static hide() {
    Actions.pop();
  }

  // hàm thực hiện show drawer action
  static show(props) {
    Actions.actionDrawer({...props});
  }

  // hàm đóng drawer action kèm theo animation
  closeModal = () => {
    this.refs.body.fadeOutRight(300).then(() => Actions.pop());
  };

  // Render các dòng của danh sách
  baseRow = item => {
    switch (this.state.typeScreen) {
      case InvoiceUtil.mauSoHD:
        return (
          <Text style={{...AppStyles.semiboldText}}>{item.mau_so_ky_hieu}</Text>
        );
      case InvoiceUtil.danhSachKhachHang:
        return <KhachHangRow data={item} />;
      default:
        return (
          <Text style={{...AppStyles.baseText, color: AppColors.black}}>
            {item.title}
          </Text>
        );
    }
  };

  onSearch = textSearch => {
    const {typeScreen} = this.state;
    const rawData = this.props.dataList;
    switch (typeScreen) {
      case InvoiceUtil.mauSoHD:
        const newData = rawData.filter(item => {
          return _.includes(item.ky_hieu, textSearch);
        });
        return this.setState({dataList: newData});

      case InvoiceUtil.danhSachNganHang:
        const newDataNganHang = rawData.filter(item => {
          return _.includes(_.lowerCase(item.title), _.lowerCase(textSearch));
        });
        return this.setState({dataList: newDataNganHang});
    }
  };

  // hàm render chính
  render() {
    const {isShowSearch, dataList} = this.state;
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
          <View style={styles.header}>
            <Text
              style={{
                ...AppStyles.boldText,
                color: AppColors.black,
                fontSize: 15,
              }}>
              {this.props.title || 'Danh sách ký hiệu'}
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
                placeholderTextColor={AppColors.black}
                placeholder={I18n.t('common.search')}
                autoFocus={true}
                style={styles.txtSearch}
                onChangeText={text => this.onSearch(text)}
              />
            </View>
          )}

          <View style={styles.wrapList}>
            <FlatList
              data={dataList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      Actions.pop();
                      this.props.actionSelected &&
                        this.props.actionSelected(item);
                    }}
                    style={styles.wrapItem}>
                    {this.baseRow(item)}
                  </TouchableOpacity>
                );
              }}
            />
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
    paddingHorizontal: AppSizes.paddingSml * 1.5,
    paddingVertical: DeviceUtil.isIPhoneX() ? height * 0.047 : height * 0.027,
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: AppSizes.marginSml,
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
    paddingVertical: AppSizes.margin,
    borderBottomWidth: 1,
    borderColor: AppColors.border,
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
  Skip: {
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
});

export default DrawerAction;
