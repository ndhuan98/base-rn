import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Alert} from 'react-native';
import StatusBarTSD from '../../../components/StatusBarTSD';
import {AppColors, AppStyles, AppSizes} from '@theme';
import Back from '../../../image/svg/Back.svg';
import {I18n} from '@constant';
import {Actions} from 'react-native-router-flux';
import {API} from '@network';
import _ from 'lodash';
import EnvoiceText from '../../../components/EnvoiceText';
import ButtonText from '../../../components/ButtonText';
import {AppHeader, Dlog} from '@components';
import {SUCCESS_CODE} from '../../../ultil/NetworkHelper';
const CREATE_MODE = 0;
const EDIT_MODE = 1;

const CREATE_SCREEN = I18n.t('DanhSachLoaiHangHoa.themMoiLoaiHangHoa');
const EDIT_SCREEN = I18n.t('DanhSachLoaiHangHoa.suaLoaiHangHoa');

const ThemSuaLHH = props => {
  const [modeScreen, setModeScreen] = useState(CREATE_MODE);
  const [ghiChuLoaiHang, setGhiChuLoaiHang] = useState('');
  const [tenLoaiHangHoa, setTenLoaiHangHoa] = useState('');
  const [idLoaiHang, setIdLoaiHang] = useState(0);

  useEffect(() => {
    if (props.thongTinLHH) {
      const {thongTinLHH} = props;
      setModeScreen(EDIT_MODE);
      setIdLoaiHang(thongTinLHH.dloaiHangid);
      setTenLoaiHangHoa(thongTinLHH.ten);
      setGhiChuLoaiHang(thongTinLHH.ghiChu);
    }
  }, [props]);

  const onBackScreen = () => {
    return Actions.pop();
  };

  const onSaveDVT = () => {
    const params = {
      dloaiHangid: idLoaiHang,
      ghiChu: ghiChuLoaiHang,
      ten: tenLoaiHangHoa,
    };

    API.luuLoaiHangHoa(params).then(
      res => {
        if (res?.data?.code == SUCCESS_CODE) {
          return Alert.alert(
            I18n.t('common.notice'),
            res.data.desc,
            [
              {
                text: 'OK',
                onPress: () => {
                  props?.callbackref(), Actions.pop();
                },
              },
            ],
            {cancelable: false},
          );
        }
        return Alert.alert(I18n.t('common.notice'), res.data.desc);
      },
      err => {
        Dlog('err -->', err);
      },
    );
  };

  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <AppHeader
        Icon={Back}
        onPressMenu={() => onBackScreen()}
        backgroundColor={AppColors.blue}
        titleColor={AppColors.white}
        iconColor={AppColors.white}
        title={modeScreen == CREATE_MODE ? CREATE_SCREEN : EDIT_SCREEN}
        RightText={I18n.t('common.write')}
        onPressRight={() =>
          // Actions.addCustomer({detailCustomer, callbackref: () => onRefresh()})
          onSaveDVT()
        }
      />
      <View style={styles.container}>
        <View style={styles.wrapBody}>
          <EnvoiceText
            require
            title={I18n.t('DanhSachLoaiHangHoa.tenLoaiHangHoaDichVu')}
            require
            value={tenLoaiHangHoa}
            onChangeText={setTenLoaiHangHoa}
          />

          <EnvoiceText
            require
            title={I18n.t('DanhSachLoaiHangHoa.ghiChu')}
            require
            value={ghiChuLoaiHang}
            onChangeText={setGhiChuLoaiHang}
          />
        </View>

        <View style={{flex: 1}} />
        <View style={styles.wrapButton}>
          <ButtonText
            styleTitle={{...AppStyles.boldText, color: AppColors.white}}
            onCick={() => onSaveDVT()}
            title={_.toUpper(I18n.t('common.write'))}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  wrapBody: {
    paddingTop: AppSizes.padding,
    padding: AppSizes.paddingSml,
  },

  wrapButton: {
    backgroundColor: AppColors.cardBackground,
    padding: AppSizes.paddingSml,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ThemSuaLHH;
