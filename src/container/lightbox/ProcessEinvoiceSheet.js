import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
import { I18n } from '@constant';
import { AppStyles, AppSizes, AppColors } from '../../theme';
import DateIcon from '../../image/svg/DatePicker.svg';
import { TextInputMask } from 'react-native-masked-text';
import moment from 'moment'
import EnvoiceInputMenuLarge from '../../components/EnvoiceInputMenuLarge';
const toDay = moment().format('DD/MM/YYYY');

class ProcessEinvoiceSheet extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: toDay,
      reason: ''
    };
  }

  static hide() {
    Actions.pop();
  }

  static show(props) {
    Actions.processEnivoice({ ...props });
  }

  render() {
    const { dataNotice } = this.props;
    return (
      <Animatable.View style={styles.container}>
        <Animatable.View style={styles.dialog}>
          <View style={styles.content}>
            <Text style={styles.title}>{'Xử lý hóa đơn'}</Text>
            <TouchableOpacity
              style={styles.btnDong}
              onPress={() => Actions.pop()}>
              <Text style={styles.txtDong}>{I18n.t('reportDetail.dong')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dialogItem}>
            <Text style={styles.txtItem}>
              {'Ngày xóa bỏ:'}<Text style={{ ...styles.txtItem, color: 'red' }}>{'*'}</Text>
            </Text>
            <View style={styles.wrapDate}>
              <TextInputMask
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY',
                }}
                value={this.state.date}
                onChangeText={(text) => this.setState({ date: text })}
                placeholder={'DD/MM/YYYY'}
              />
              <DateIcon
                style={styles.iconDot}
                fill={AppColors.gray}
              />
            </View>
          </View>
          <View style={styles.lineStraight} />

          <View style={styles.dialogItem}>
            <Text style={styles.txtItem}>
              {'Hình thức xử lý:'}
            </Text>
            <Text style={styles.txtItemTong}>{'Xóa bỏ'}</Text>
          </View>
          <View style={styles.lineStraight} />
          <View style={styles.dialogItem}>
            <EnvoiceInputMenuLarge
              title='Lý do xóa bỏ:'
              require
              value={this.state.reason}
              multiline
              placeholder={'Nhập lý do xoá bỏ'}
              onChangeText={text => this.setState({ reason: text })}
            />
          </View>
          <View style={{ ...styles.dialogItem, marginTop: 0 }}>
            <Text style={{ ...AppStyles.baseText, color: AppColors.blue }}>
              <Text style={{ ...AppStyles.italicText, color: AppColors.red }} >Lưu ý:</Text>
              Theo Khoản 1 Điều 19 Nghị định 123/2020/NĐ-CP: hóa đơn có sai sót được phép xử lý hủy (xóa bỏ) khi hóa đơn đã cấp mã của CQT và chưa gửi cho người mua.
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
    width: '95%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: AppSizes.paddingSml,
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
    alignItems: 'center'
  },
  txtItem: {
    ...AppStyles.baseText,
  },
  btnDong: {
    borderRadius: 16,
    backgroundColor: AppColors.blueBackground,
    paddingVertical: AppSizes.paddingXXSml,
    paddingHorizontal: AppSizes.margin
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
  iconDot: { width: 20, height: 20 },
  wrapDate: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '50%',
    borderWidth: 1,
    height: 48,
    borderColor: AppColors.border,
    borderRadius: 5
  }

});

export default ProcessEinvoiceSheet;
