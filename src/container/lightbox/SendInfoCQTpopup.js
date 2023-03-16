import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';
import {I18n} from '@constant';
import {AppStyles, AppSizes, AppColors} from '../../theme';

class SendInfoCQTpopup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static hide() {
    Actions.pop();
  }

  static show(props) {
    Actions.sentInfoCQTpopup({...props});
  }

  render() {
    const {infoSentCQT} = this.props;
    let colorStatus =
    infoSentCQT.trangThaiPhanHoi > 0
        ? AppColors.customSuccess
        : AppColors.customError;

    if (infoSentCQT.trangThaiGui == 0) colorStatus = AppColors.blueBackground;
    return (
      <Animatable.View style={styles.container}>
        <Animatable.View style={styles.dialog}>
          <View style={styles.content}>
            <Text style={styles.title}>{I18n.t('SendInfoCQTpopup.title')}</Text>
            <TouchableOpacity
              style={styles.btnDong}
              onPress={() => Actions.pop()}>
              <Text style={styles.txtDong}>{I18n.t('reportDetail.dong')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dialogItem}>
            <Text style={styles.tenThongDiep}>{infoSentCQT.tenThongDiep}</Text>
          </View>

          <View style={styles.dialogItem}>
            <Text style={styles.txtItem}>
              {I18n.t('SendInfoCQTpopup.trangThaiTruyenNhan')}
            </Text>
            <Text style={[styles.tongSoLuongHD, {color: colorStatus}]}>
              {infoSentCQT.trangThaiPhanHoiText}
            </Text>
          </View>
          <View style={styles.lineStraight} />

          <View style={styles.dialogItem}>
            <Text style={styles.txtItem}>
              {I18n.t('SendInfoCQTpopup.thoiGianGui')}
            </Text>
            <Text style={styles.txtItemTong}>
              {infoSentCQT.thoiGianGuiTextFull}
            </Text>
          </View>
          <View style={styles.lineStraight} />

          <View style={styles.dialogItem}>
            <Text style={styles.txtItem}>
              {I18n.t('SendInfoCQTpopup.soLuong')}
            </Text>
            <Text style={styles.txtItemTong}>{infoSentCQT.soLuong}</Text>
          </View>
          <View style={styles.lineStraight} />

          <View style={styles.dialogItem}>
            <Text style={styles.txtItem}>
              {I18n.t('SendInfoCQTpopup.dungLuong')}
            </Text>
            <Text style={styles.txtItemTong}>
              {infoSentCQT.dungLuongFormat}
            </Text>
          </View>
          <View style={styles.lineStraight} />

          <View style={styles.dialogItem}>
            <Text style={styles.txtItem}>
              {I18n.t('SendInfoCQTpopup.lyDo')}
            </Text>
            <Text style={styles.txtItemTong}>
              {infoSentCQT.thongBaoPhanHoi}
            </Text>
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
    paddingVertical: AppSizes.paddingXXSml,
    paddingHorizontal: AppSizes.margin,
  },
  txtItemTong: {
    ...AppStyles.boldText,
    color: AppColors.black,
    fontSize: AppSizes.fontSearch,
    lineHeight: 20,
  },
  tongSoLuongHD: {
    ...AppStyles.boldText,
    color: '#CC0000',
    fontSize: 14,
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
  tenThongDiep: {
    ...AppStyles.boldText,
    color: '#313131',
    fontSize: 12,
    lineHeight: 14,
  },
});

export default SendInfoCQTpopup;
