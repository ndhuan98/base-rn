import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {AppStyles, AppColors, AppSizes} from '../../theme';
import {Actions} from 'react-native-router-flux';
import AppHeader from '../../components/AppHeader';
import {I18n} from '@constant';
import Back from '../../image/svg/Back.svg';
import StatusBarTSD from '../../components/StatusBarTSD';
import GroupButton from '../../components/GroupButton';
import EnvoiceText from '../../components/EnvoiceText';
import ActionSheet from '../lightbox/ActionSheet';
import DrawerAction from '../lightbox/DrawerAction';
import DialogSuccess from '../lightbox/DialogSuccess';
import Plus from '../../image/svg/Plus.svg';
import PreviewActionSheet from '../lightbox/PreviewActionSheet';

const CreateReleaseScreen = () => {
  const onInActive = React.useCallback(() => {
    const sheet = {
      title: 'Xem trước hóa đơn',
      confirmAction: () => {
        PreviewActionSheet.hide();
        onActive();
      },
      confirmText: I18n.t('common.write'),
    };
    PreviewActionSheet.show(sheet);
  }, []);

  const onActive = React.useCallback(() => {
    const dialog = {
      title: 'Lập quyết định áp dung HĐĐT thành công',
      message:
        'Hãy tiếp tục thực hiện bước Lập thông báo phát hành ở màn hình `Hướng dẫn sử dung hóa đơn`',
      confirmText: 'Đồng ý',
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
          title={I18n.t('createReleaseScreen.titleScreen')}
          titleColor={AppColors.white}
        />
        <ScrollView style={{flex: 1, paddingHorizontal: AppSizes.paddingXSml}}>
          <Text style={styles.topic}>{'Công ty Thai Sơn test'}</Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'flex-end',
            }}>
            <View style={{flex: 1}}>
              <EnvoiceText
                onPress={() => DrawerAction.show()}
                title={'Số'}
                value={'123'}
              />
            </View>
            <View style={{flex: 1, marginHorizontal: AppSizes.marginSml}}>
              <EnvoiceText title={''} value={'Hà Nội'} />
            </View>
            <View style={{flex: 1}}>
              <EnvoiceText title={''} value={'27/02/2020'} />
            </View>
          </View>
          <EnvoiceText title={'Giấy đăng ký kinh doanh số'} value={'0339'} />
          <EnvoiceText title={'Họ và tên'} value={'Nguyễn Văn A'} />
          <Text style={styles.topic}>{'1. Tên hệ thống thiết bị'}</Text>
          <EnvoiceText
            title={'Tên máy tính'}
            value={'MHD_1_202003021624_141'}
          />
          <EnvoiceText title={'Tên máy in'} value={'MHD_1_202003021624_141'} />
          <Text style={styles.topic}>
            {'2.Phần mềm ứng dụng và biện pháp hỗ trợ triển khai'}
          </Text>
          <Text style={AppStyles.baseText}>
            {'a. Phần mềm quản lý, phát hành, in ấn hóa đơn'}
          </Text>
          <View style={{width: '100%', flexDirection: 'row'}}>
            <Text style={AppStyles.baseText}>
              {'b. Phần mềm kế toán, bán hang  '}
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Plus style={{width: 24, height: 24}} fill={AppColors.blue} />
            </TouchableOpacity>
          </View>
          <Text style={AppStyles.baseText}>{'c. Hỗ trợ - triển khai'}</Text>

          <Text style={styles.topic}>
            {
              '2. Mẫu các loại hoá đơn điện tử và mục đích sử dụng của mỗi loại hoá đơn'
            }
          </Text>
          <EnvoiceText
            onPress={() => {}}
            title={'Loại hóa đơn'}
            drop
            value={'MHD_1_202003021624_141'}
          />
          <EnvoiceText title={'Mẫu số'} value={'Hóa đơn GTGT'} />

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'flex-end',
            }}>
            <View style={AppStyles.flex1}>
              <EnvoiceText
                drop
                onPress={() => ActionSheet.show()}
                title={'Ký hiệu'}
                value={'AA'}
              />
            </View>
            <View style={{flex: 1, marginHorizontal: AppSizes.marginSml}}>
              <EnvoiceText title={''} value={'20'} />
            </View>
            <View style={AppStyles.flex1}>
              <EnvoiceText title={''} value={'AA/20E'} />
            </View>
          </View>
          <EnvoiceText title={'Mục đích'} value={''} />
          <EnvoiceText title={'Thông tin hóa đơn'} value={''} />
          <View style={styles.bottomDistance} />
        </ScrollView>
        <GroupButton
          InactiveTitle={I18n.t('common.preview')}
          ActiveTitle={I18n.t('common.write')}
          onClickActive={() => onActive()}
          onClickInactive={() => onInActive()}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  topic: {...AppStyles.boldText, color: '#3F3D4B'},
  bottomDistance: {
    width: '100%',
    height: 50,
  },
});

export default CreateReleaseScreen;
