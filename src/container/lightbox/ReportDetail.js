import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';
import {I18n} from '@constant';
import {AppStyles, AppSizes, AppColors} from '../../theme';
import {formatNumber} from '../../ultil/EinvoiceSupport';

class ReportDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static hide() {
    Actions.pop();
  }

  static show(props) {
    Actions.reportDetail({...props});
  }

  render() {
    const {dataReports} = this.props;
    const data = {
      tongSoLuongHD: formatNumber(dataReports.totalcount),
      tongCKTT: formatNumber(dataReports.tong_chiet_khau_tien),
      tongTienTT: formatNumber(dataReports.tong_tien_truoc_thue),
      tongTT: formatNumber(dataReports.tong_tien_thue),
      tongThanhToan: formatNumber(dataReports.tong_tien_thanh_toan),
      tongSoLuongDongHang: formatNumber(dataReports.tong_so_luong),
    };
    return (
      <Animatable.View style={styles.container}>
        <Animatable.View style={styles.dialog}>
          <View style={styles.content}>
            <Text style={styles.title}>{I18n.t('reportDetail.title')}</Text>
            <TouchableOpacity
              style={styles.btnDong}
              onPress={() => Actions.pop()}>
              <Text style={styles.txtDong}>{I18n.t('reportDetail.dong')}</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.dialogItem}>
            <Text style={styles.txtItem}>
              {I18n.t('reportDetail.tongSoLuongHD')}
            </Text>
            <Text style={styles.tongSoLuongHD}>{data.tongSoLuongHD}</Text>
          </View>
          <View style={styles.lineStraight} /> */}

          <View style={styles.dialogItem}>
            <Text style={styles.txtItem}>
              {I18n.t('reportDetail.tongSoLuongDongHang')}
            </Text>
            <Text style={styles.tongSoLuongHD}>{data.tongSoLuongDongHang}</Text>
          </View>
          <View style={styles.lineStraight} />

          <View style={styles.dialogItem}>
            <Text style={styles.txtItem}>
              {I18n.t('reportDetail.tongCKTT')}
            </Text>
            <Text style={styles.txtItemTong}>{data.tongCKTT}</Text>
          </View>
          <View style={styles.lineStraight} />

          <View style={styles.dialogItem}>
            <Text style={styles.txtItem}>
              {I18n.t('reportDetail.tongTienTT')}
            </Text>
            <Text style={styles.txtItemTong}>{data.tongTienTT}</Text>
          </View>
          <View style={styles.lineStraight} />

          <View style={styles.dialogItem}>
            <Text style={styles.txtItem}>{I18n.t('reportDetail.tongTT')}</Text>
            <Text style={styles.txtItemTong}>{data.tongTT}</Text>
          </View>
          <View style={styles.lineStraight} />

          <View style={styles.dialogItem}>
            <Text style={styles.txtItemTong}>
              {I18n.t('reportDetail.tongThanhToan')}
            </Text>
            <Text style={styles.txtItemTong}>{data.tongThanhToan}</Text>
          </View>
        </Animatable.View>
      </Animatable.View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...AppStyles.baseDialog,
  },
  dialog: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: AppSizes.paddingSml * 1.5,
  },
  title: {
    ...AppStyles.boldText,
    color: AppColors.blueBackground,
    fontSize: AppSizes.fontLarge,
  },
  lineStraight: {
    width: '85%',
    height: 1,
    backgroundColor: AppColors.lineGray,
  },
  dialogItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginTop: 20,
    marginBottom: 20,
  },
  txtItem: {
    ...AppStyles.baseText,
  },
  btnDong: {
    borderRadius: 16,
    backgroundColor: AppColors.blueBackground,
    paddingVertical:AppSizes.paddingXXSml,
    paddingHorizontal:AppSizes.margin
  },
  txtItemTong: {
    ...AppStyles.boldText,
    color: AppColors.black,
    fontSize: AppSizes.fontSearch,
    lineHeight: 20,
  },
  tongSoLuongHD: {
    ...AppStyles.boldText,
    color: AppColors.red,
    fontSize: AppSizes.fontSearch,
    lineHeight: 20,
  },
  txtDong: {
    ...AppStyles.baseText,
    color: AppColors.white,
    textAlign: 'center',
    justifyContent: 'center',
    paddingTop: 3,
  },
  content: {
    width: '87%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: AppSizes.marginXSml,
    marginBottom: AppSizes.margin,
  },
});

export default ReportDetail;
