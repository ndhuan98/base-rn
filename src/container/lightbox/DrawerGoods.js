import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  Keyboard,
} from 'react-native';
import _ from 'lodash';
import * as Animatable from 'react-native-animatable';
import {Actions} from 'react-native-router-flux';
import {AppStyles, AppSizes, AppColors, AppFonts} from '../../theme';
import {I18n} from '@constant';
const {height, width} = Dimensions.get('window');
import EnvoiceText from '../../components/EnvoiceText';
import ButtonText from '../../components/ButtonText';
import {API} from '@network';
import {SUCCESS_CODE} from '../../ultil/NetworkHelper';
import {animate} from '../../ultil/AnimateHelper';
import {useKeyboard} from '@react-native-community/hooks';

const onUpdateLoaiHang = async goods => {
  if (!goods.InputTitle) {
    return Alert.alert(I18n.t('common.notice'), I18n.t('drawerGoods.loaiHang'));
  }
  const params = {
    idloaihang: 0,
    ten_loai_hang: goods.InputTitle,
    ghi_chu: goods.InputContent,
  };
  await API.saveLoaihang(params).then(
    res => {
      if (res.data && res.data.code == SUCCESS_CODE) {
        Actions.pop();
        return Alert.alert(I18n.t('common.notice'), res.data.desc);
      } else {
        return Alert.alert(I18n.t('common.notice'), res.data.desc);
      }
    },
    err => {
      Dlog('saveLoaiHangs', err);
    },
  );
};

const onUpdateDonVT = async goods => {
  if (!goods.InputTitle) {
    return Alert.alert(I18n.t('common.notice'), I18n.t('drawerGoods.maDonVT'));
  }
  if (!goods.InputContent) {
    return Alert.alert(I18n.t('common.notice'), I18n.t('drawerGoods.donVT'));
  }
  const params = {
    maDvtid: 0,
    maDvt: goods.InputTitle,
    tenDvt: goods.InputContent,
  };
  await API.saveDonViTinh(params).then(
    res => {
      if (res.data && res.data.code == SUCCESS_CODE) {
        Actions.pop();
        return Alert.alert(
          I18n.t('common.notice'),
          'Lưu đơn vị tính thành công',
        );
      } else {
        return Alert.alert(I18n.t('common.notice'), res.data.desc);
      }
    },
    err => {
      Dlog('saveDonViTinh', err);
    },
  );
};
const DrawerGoods = props => {
  const [goods, setGoods] = useState({
    InputTitle: '',
    InputContent: '',
  });
  const getAddGoods = React.useCallback(() => {
    if (props.data == 1) {
      onUpdateLoaiHang(goods);
    } else {
      onUpdateDonVT(goods);
    }
  });
  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    animate();
  };

  const _keyboardDidHide = () => {
    animate();
  };
  const keyboard = useKeyboard();
  return (
    <Animatable.View
      style={{
        ...AppStyles.baseDialog,
        marginTop:
          Platform.OS === 'ios'
            ? keyboard.keyboardShown
              ? -keyboard.keyboardHeight / 4
              : 0
            : 0,
      }}>
      <Animatable.View style={styles.dialog}>
        <View style={styles.content}>
          <Text style={styles.title}>{props.title}</Text>
          <TouchableOpacity
            style={styles.btnDong}
            onPress={() => Actions.pop()}>
            <Text style={styles.txtDong}>{I18n.t('sendInvoiceMail.dong')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content1}>
          <EnvoiceText
            require
            title={props.titleText}
            onChangeText={text => setGoods({...goods, InputTitle: text})}
          />
          <View style={{flexDirection: 'row', marginTop: AppSizes.marginSml}}>
            <Text style={styles.textGhiChu}>{props.TitleInput}</Text>
            {props.data == 2 ? <Text style={styles.require}>{'*'}</Text> : null}
          </View>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={text => setGoods({...goods, InputContent: text})}
            />
          </View>
          <ButtonText
            styleTitle={{...AppStyles.boldText, color: AppColors.white}}
            title="Ghi"
            onCick={getAddGoods}
          />
        </View>
      </Animatable.View>
    </Animatable.View>
  );
};
const styles = StyleSheet.create({
  dialog: {
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: AppSizes.paddingSml * 1.5,
  },
  content: {
    width: '88%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: AppSizes.marginXSml,
    marginBottom: AppSizes.margin,
  },
  content1: {
    width: '88%',
    marginTop: AppSizes.marginXSml,
    marginBottom: AppSizes.marginXSml,
  },
  title: {
    ...AppStyles.boldText,
    color: AppColors.blue,
    fontSize: AppSizes.fontLarge,
  },
  btnDong: {
    borderRadius: 20,
    backgroundColor: AppColors.blueBackground,
    paddingVertical: AppSizes.paddingXXSml,
    paddingHorizontal: AppSizes.margin,
  },
  txtDong: {
    ...AppStyles.baseText,
    color: AppColors.white,
    textAlign: 'center',
    justifyContent: 'center',
  },
  textGhiChu: {
    ...AppStyles.baseText,
    lineHeight: 16,
    color: AppColors.textGray,
    alignItems: 'flex-start',
  },
  textAreaContainer: {
    borderColor: AppColors.border,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    width: width * 0.82,
    textAlignVertical: 'top',
  },
  require: {
    ...AppStyles.smallText,
    color: AppColors.red,
  },
});

export default DrawerGoods;
