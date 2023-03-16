import React from 'react';
import {Text, View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {AppStyles, AppColors, AppSizes} from '../../theme';
import {Actions} from 'react-native-router-flux';
import AppHeader from '../../components/AppHeader';
import Back from '../../image/svg/Back.svg';
import StatusBarTSD from '../../components/StatusBarTSD';
import GroupButton from '../../components/GroupButton';
import EnvoiceText from '../../components/EnvoiceText';
import ActionSheet from '../lightbox/ActionSheet';
import DrawerAction from '../lightbox/DrawerAction';
import EnvoiceMenuText from '../../components/EnvoiceMenuText';
import DialogSuccess from '../lightbox/DialogSuccess';
import {I18n} from '@constant';

// Khởi tạo thông tin mẫu hoá đơn
const InvoiceTemplateInformation = () => {
  const [maMau, setMaMau] = React.useState('MHD_1_202003021624_141');
  const [loaiHoaDon, setLoaiHoaDon] = React.useState('Hoa Don GTGT');
  const [mauGoc, setMauGoc] = React.useState('0339');
  const [mauSo, setMauSo] = React.useState('AA');
  return (
    <View style={styles.wrapInfo}>
      <View style={styles.wrapTitle}>
        <Text style={styles.txtTitle}>{'Thông tin mẫu hóa đơn'}</Text>
        <Text style={AppStyles.baseText}>{'Trạng thái: Chưa khởi tạo'}</Text>
      </View>
      <EnvoiceText title={'Mã mẫu'} value={maMau} />
      <EnvoiceText
        drop
        onPress={() => ActionSheet.show()}
        title={'Loại hoá đơn'}
        value={loaiHoaDon}
      />

      <EnvoiceText
        drop
        onPress={() => ActionSheet.show()}
        title={'Chọn mẫu gốc'}
        value={mauGoc}
      />

      <EnvoiceText title={'Mẫu số'} value={mauSo} />
      <View
        style={{flexDirection: 'row', width: '100%', alignItems: 'flex-end'}}>
        <View style={{flex: 1}}>
          <EnvoiceMenuText
            menu
            onPress={() => DrawerAction.show()}
            title={'Ký hiệu'}
            value={''}
          />
        </View>
        <View style={{flex: 1, marginHorizontal: AppSizes.marginSml}}>
          <EnvoiceText title={''} value={mauGoc} />
        </View>
        <View style={{flex: 1}}>
          <EnvoiceText title={''} value={mauGoc} />
        </View>
      </View>
      <EnvoiceText title={'Ngày khởi tạo'} value={'20/20/2020'} />
      <EnvoiceText title={'Ghi chú'} value={''} />

      <Text
        style={{
          ...styles.txtTitle,
          marginVertical: AppSizes.marginSml,
        }}>
        {'Thông tin đơn vị khỏi tạo mẫu '}
      </Text>

      <EnvoiceText title={'Mã số thuế'} value={''} />
      <EnvoiceText title={'Tên đơn vị'} value={''} />
      <EnvoiceText title={'Địa chỉ'} value={''} />
      <View style={{flexDirection: 'row', width: '100%'}}>
        <View style={{flex: 1, marginRight: AppSizes.marginSml}}>
          <EnvoiceText title={'Điện thoại'} value={''} />
        </View>
        <View style={AppStyles.flex1}>
          <EnvoiceText title={'Fax'} value={''} />
        </View>
      </View>
      <EnvoiceText title={'Số tài khoản'} value={''} />
      <EnvoiceText title={'Tên ngân hàng'} value={''} />
    </View>
  );
};

// hàm render chính
const InforInvoiceCreate = () => {
  // Action  hiển thị thông báo  khởi tạo thành công
  const activeEnvoice = React.useCallback(() => {
    const dialog = {
      title: 'Khởi tạo mẫu hóa đơn thành công',
      message: 'Hãy thực hiện các bước tiếp theo',
      confirmText: I18n.t('common.yes'),
      confirmAction: () => {
        Actions.Home();
      },
    };
    DialogSuccess.show(dialog);
  }, []);

  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <View style={styles.container}>
        <AppHeader
          onPressMenu={() => Actions.pop()}
          Icon={Back}
          iconColor={AppColors.white}
          backgroundColor={AppColors.blue}
          title={'Thông tin mẫu hóa đơn'}
          titleColor={AppColors.white}
          RightText={I18n.t('common.clear')}
          onPressRight={() => {}}
        />
        <ScrollView style={AppStyles.flex1}>
          <InvoiceTemplateInformation />
        </ScrollView>
        <View
          style={{
            width: '100%',
            backgroundColor: AppColors.white,
            padding: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}>
          <GroupButton
            InactiveTitle={I18n.t('common.write')}
            ActiveTitle={'Thực hiện khởi tạo'}
            onClickActive={activeEnvoice}
            onClickInactive={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// Khởi tạo style css màn hình
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  txtTitle: {...AppStyles.boldText, color: '#3F3D4B'},
  wrapInfo: {width: '100%', paddingHorizontal: AppSizes.marginXSml},
  wrapTitle: {
    marginTop: AppSizes.marginXXSml,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default InforInvoiceCreate;
