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

const CREATE_SCREEN = I18n.t('DanhSachTienThanhToan.themMoiTienThanhToan');
const EDIT_SCREEN = I18n.t('DanhSachTienThanhToan.suaHTienThanhToan');

const ThemSuaTienTT = props => {
  const [modeScreen, setModeScreen] = useState(CREATE_MODE);
  const [maNguyenTe, setMaNguyenTe] = useState('');
  const [tenNguyenTe, setTenNguyenTe] = useState('');
  const [tyGia, setTyGia] = useState('');
  const [idTienThanhToan, setIdTienThanhToan] = useState(0);
  const [docPhanLe, setDocPhanLe] = useState('');
  const [docNoiPhanLe, setDocNoiPhanLe] = useState('');

  useEffect(() => {
    if (props.thongTinTienTT) {
      const {thongTinTienTT} = props;
      setModeScreen(EDIT_MODE);
      setMaNguyenTe(thongTinTienTT.maNt);
      setTenNguyenTe(thongTinTienTT.tenNt);
      setTyGia(thongTinTienTT.tyGia);
      setIdTienThanhToan(thongTinTienTT.maNtid);
      setDocNoiPhanLe(thongTinTienTT.docNoiPhanLe);
      setDocPhanLe(thongTinTienTT.docPhanLe);
    }
  }, [props]);

  const onBackScreen = () => {
    return Actions.pop();
  };

  const onSaveDVT = () => {
    if (_.size(_.trim(maNguyenTe)) != 3)
      return Alert.alert(
        I18n.t('common.notice'),
        'Mã nguyên tệ bắt buộc 3 ký tự, in hoa.',
      );
    const params = {
      maNtid: idTienThanhToan,
      maNt: maNguyenTe,
      tenNt: tenNguyenTe,
      tyGia: tyGia,
      docPhanLe: docPhanLe,
      docNoiPhanLe: docNoiPhanLe,
    };

    API.luuTienThanhToan(params).then(
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
            title={I18n.t('DanhSachTienThanhToan.maNguyenTe')}
            require
            disabled={modeScreen == EDIT_MODE}
            value={maNguyenTe}
            onChangeText={text => setMaNguyenTe(_.toUpper(text))}
          />

          <EnvoiceText
            title={I18n.t('DanhSachTienThanhToan.tenNguyenTe')}
            require
            value={tenNguyenTe}
            onChangeText={setTenNguyenTe}
          />

          <EnvoiceText
            title={I18n.t('DanhSachTienThanhToan.tyGia')}
            require
            value={tyGia}
            onChangeText={setTyGia}
          />

          <EnvoiceText
            title={I18n.t('DanhSachTienThanhToan.docPhanLe')}
            value={docPhanLe}
            onChangeText={setDocPhanLe}
          />

          <EnvoiceText
            title={I18n.t('DanhSachTienThanhToan.docNoiPhanLe')}
            value={docNoiPhanLe}
            onChangeText={setDocNoiPhanLe}
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

export default ThemSuaTienTT;
