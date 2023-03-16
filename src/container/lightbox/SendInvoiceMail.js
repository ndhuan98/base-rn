import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';
import {AppStyles, AppSizes, AppColors} from '../../theme';
import {I18n} from '@constant';
import EnvoiceText from '../../components/EnvoiceText';
import ButtonText from '../../components/ButtonText';
import API from '../../network/API';
import {SUCCESS_CODE} from '../../ultil/NetworkHelper';
import Dlog from '../../components/Dlog';
import _ from 'lodash';
import moment from 'moment';
import {formatNumber, NumberInvoiceStarter} from '../../ultil/EinvoiceSupport';
import {email_multiple} from '../../ultil/Validater';

const defaulEmail = {
  dhoadonid: '',
  email_address: '',
  ky_hieu: '',
  mau_so: '',
  ngay_hoa_don: '2020-07-03T00:00:00',
  so_hoa_don: NumberInvoiceStarter,
  ten_don_vi: '',
};

class SendInvoiceMail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: defaulEmail,
      isLoading: false,
      inputEmail: '',
      titleScreen: 'Gửi hoá đơn bản nháp',
    };
  }

  static hide() {
    Actions.pop();
  }

  static show(props) {
    Actions.sendInvoiceMail({...props});
  }

  componentDidMount() {
    const {hoaDonId} = this.props;
    API.viewEmail(hoaDonId).then(
      res => {
        if (res.data && res.data.code == SUCCESS_CODE) {
          return this.setState({
            data: res.data.data,
            inputEmail: res.data.data.email_address,
          });
        }
        return Alert.alert(I18n.t('common.notice'), res.data.desc);
      },
      err => {
        Dlog('err viewEmail ->', err);
      },
    );
  }

  validateMail = () => {
    if (_.isEmpty(this.state.inputEmail)) {
      return Alert.alert(
        I18n.t('common.notice'),
        I18n.t('sendInvoiceMail.sendMail'),
      );
    }
    if (!email_multiple(this.state.inputEmail)) {
      return Alert.alert(
        I18n.t('common.notice'),
        I18n.t('sendInvoiceMail.formatFail'),
      );
    }
    return this.sendInvoiceToEmail();
  };

  sendInvoiceToEmail = () => {
    this.setState({isLoading: true});
    const {data, inputEmail} = this.state;
    const isSendMailDraft = data.so_hoa_don == NumberInvoiceStarter;
    const params = {
      dhoadonid: data.dhoadonid,
      listEmail: inputEmail,
      isSendMailDraft,
    };
    return API.SendEinvoice(params).then(
      res => {
        this.setState({isLoading: false});
        if (res.data && res.data.code == SUCCESS_CODE) {
          return Alert.alert(
            I18n.t('common.notice'),
            I18n.t('sendInvoiceMail.sendSuccess'),
            [{text: 'OK', onPress: () => Actions.pop()}],
            {cancelable: false},
          );
        }
        return Alert.alert(
          I18n.t('common.notice'),
          I18n.t('sendInvoiceMail.sendFail'),
        );
      },
      err => {
        this.setState({isLoading: false});
        Dlog('err SendEinvoice -->', err);
      },
    );
  };

  render() {
    const {data, isLoading, inputEmail} = this.state;
    const colorInvoiceNumber =
      data.so_hoa_don == NumberInvoiceStarter ? AppColors.black : AppColors.red;
    const titleScreen =
      data.so_hoa_don == NumberInvoiceStarter
        ? I18n.t('sendInvoiceMail.title')
        : I18n.t('sendInvoiceMail.toCustomer');
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Animatable.View style={styles.container}>
          <Animatable.View style={styles.dialog}>
            <View style={styles.content}>
              <Text style={styles.title}>{titleScreen}</Text>
              <TouchableOpacity
                style={styles.btnDong}
                onPress={() => Actions.pop()}>
                <Text style={styles.txtDong}>
                  {I18n.t('sendInvoiceMail.dong')}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dialogItem}>
              <Text style={styles.txtItem}>
                {I18n.t('sendInvoiceMail.soHoaDon')}
              </Text>
              <Text
                style={{
                  ...AppStyles.secondaryText,
                  fontSize: AppSizes.fontSearch,
                  lineHeight: 20,
                  color: colorInvoiceNumber,
                }}>
                {data.so_hoa_don}
              </Text>
            </View>
            <View style={styles.lineStraight} />

            <View style={styles.dialogItem}>
              <Text style={styles.txtItem}>
                {I18n.t('sendInvoiceMail.ngayHoaDon')}
              </Text>
              <Text style={styles.txtItemTong}>
                {moment(data.ngay_hoa_don).format('DD/MM/YYYY')}
              </Text>
            </View>
            <View style={styles.lineStraight} />
            <View style={styles.dialogItem}>
              <Text style={styles.txtItem}>
                {I18n.t('sendInvoiceMail.tongThanhToan')}
              </Text>
              <Text style={styles.txtItemTong}>
                {formatNumber(data.tong_thanh_toan)}
              </Text>
            </View>
            <View style={styles.lineStraight} />
            <View style={styles.dialogItem}>
              <Text style={styles.txtItem}>
                {I18n.t('sendInvoiceMail.khachHang')}
              </Text>
              <Text
                numberOfLines={2}
                style={{
                  ...styles.txtItemTong,
                  flex: 1,
                  marginLeft: 5,
                  textAlign: 'right',
                  alignSelf: 'stretch',
                }}>
                {data.ten_don_vi}
              </Text>
            </View>
            <View style={styles.lineStraight} />

            <View style={styles.contenInput}>
              <EnvoiceText
                value={inputEmail}
                require
                onChangeText={text => this.setState({inputEmail: text})}
                title={I18n.t('sendInvoiceMail.email')}
              />
              <Text style={styles.txtLuuY}>
                {I18n.t('sendInvoiceMail.txtLuuY')}
              </Text>
            </View>
            <View style={styles.box}>
              <ButtonText
                onCick={() => this.validateMail()}
                isLoading={isLoading}
                styleTitle={styles.btnGui}
                title={I18n.t('sendInvoiceMail.txtGui')}
              />
            </View>
          </Animatable.View>
        </Animatable.View>
      </TouchableWithoutFeedback>
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
    paddingVertical: AppSizes.paddingSml * 1.5,
  },
  title: {
    ...AppStyles.boldText,
    color: AppColors.blue,
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
    marginTop: 15,
    marginBottom: 15,
  },
  txtItem: {
    ...AppStyles.baseText,
    marginRight: AppSizes.margin,
  },
  btnDong: {
    borderRadius: 20,
    backgroundColor: AppColors.blueBackground,
    paddingVertical: AppSizes.paddingXXSml,
    paddingHorizontal: AppSizes.margin,
  },
  txtItemTong: {
    ...AppStyles.secondaryText,
    color: AppColors.black,
    fontSize: AppSizes.fontSearch,
    lineHeight: 20,
  },
  txtDong: {
    ...AppStyles.baseText,
    color: AppColors.white,
    textAlign: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '88%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: AppSizes.marginXSml,
    marginBottom: AppSizes.marginXSml,
  },
  contenInput: {
    paddingHorizontal: 25,
    marginTop: AppSizes.margin,
  },
  txtLuuY: {
    ...AppStyles.smallText,
    color: AppColors.blueBackground,
    marginBottom: AppSizes.buttonSizeBase,
    marginTop: AppSizes.marginSml,
  },
  btnGui: {
    ...AppStyles.semiboldText,
    color: AppColors.white,
    width: 300,
    textAlign: 'center',
  },
  box: {
    width: '100%',
    backgroundColor: '#F1F1F1',
    height: 87,
    marginBottom: -15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
});

export default SendInvoiceMail;
