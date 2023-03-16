import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
import { I18n } from '@constant';
import { AppStyles, AppSizes, AppColors } from '../../theme';
const { height } = Dimensions.get('window');
import { DeviceUtil, InvoiceUtil } from '@util';

const data = [
  {
    title: 'VNĐ',
    value: 'vnd',
  },
  {
    title: 'USD',
    value: 'usd',
  },
];

class ActionSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static hide() {
    Actions.pop();
  }

  static show(props) {
    Actions.actionSheet({ ...props });
  }

  closeModal = () => {
    this.refs.body.fadeOutDownBig(300).then(() => Actions.pop());
  };

  onSelectedItem = item => {
    return this.refs.body
      .fadeOutDownBig(300)
      .then(
        () => Actions.pop(),
        this.props.onSelected && this.props.onSelected(item),
      );
  };

  baseItem = item => {
    switch (this.props.typeScreen) {
      case InvoiceUtil.dongTien:
        return <Text style={AppStyles.semiboldText}>{item.ma_tien_te}</Text>;
      case InvoiceUtil.hinhThucThanhToan:
        return (
          <Text style={AppStyles.semiboldText}>
            {item.ten_hinh_thu_thanh_toan}
          </Text>
        );
      case InvoiceUtil.VAT:
        return <Text style={AppStyles.semiboldText}>{item.phan_tram_vat}</Text>;
      case InvoiceUtil.tinhChatHH:
        return <Text style={AppStyles.semiboldText}>{item.text}</Text>;
      case InvoiceUtil.lapHoaDon:
        return <Text style={AppStyles.semiboldText}>{item.text}</Text>;
      default:
        return <Text style={AppStyles.semiboldText}>{item.title}</Text>;
    }
  };

  render() {
    const Data = this.props.dataList ? this.props.dataList : data;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={AppStyles.flex1}
          onPress={() => this.closeModal()}
        />
        <Animatable.View
          ref={'body'}
          animation="fadeInUp"
          duration={300}
          style={styles.sheet}>
          <TouchableOpacity
            onPress={() => this.closeModal()}
            style={styles.topTouch}
          />
          <View style={styles.wrapHeader}>
            <Text
              style={{
                ...AppStyles.boldText,
                color: AppColors.blue,
                fontSize: 15,
                lineHeight: 18,
                marginLeft:AppSizes.marginXSml
              }}>
              {this.props.title || I18n.t('common.money')}
            </Text>
            <TouchableOpacity
              onPress={() => this.closeModal()}
              style={{
                padding: AppSizes.paddingXXSml,
                paddingHorizontal: AppSizes.paddingMedium,
                backgroundColor: AppColors.blueBackground,
                borderRadius: AppSizes.paddingMedium,
              }}>
              <Text style={{ ...AppStyles.baseText, color: AppColors.white }}>
                {I18n.t('common.skip')}
              </Text>
            </TouchableOpacity>
          </View>
          {Data.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => this.onSelectedItem(item)}
                key={index.toString()}
                style={{ width: '100%', padding: AppSizes.paddingSml }}>
                <Text
                  style={{
                    ...AppStyles.baseText,
                  }}>
                  {this.baseItem(item)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Animatable.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...AppStyles.baseDialog,
  },
  sheet: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: AppSizes.paddingSml * 1.5,
    paddingVertical: AppSizes.paddingSml * 1.5,
  },
  topTouch: {
    backgroundColor: '#A1A9D2',
    height: 4,
    width: '20%',
    borderRadius: 2,
  },
  wrapHeader: {
    flexDirection: 'row',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: AppSizes.paddingMedium,
    borderColor: AppColors.border,
    height: height * 0.1,
  },
});

export default ActionSheet;
