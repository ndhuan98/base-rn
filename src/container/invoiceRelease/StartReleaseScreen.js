import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {AppStyles, AppColors, AppSizes} from '../../theme';
import {Actions} from 'react-native-router-flux';
import AppHeader from '../../components/AppHeader';
import {I18n} from '@constant';
import Back from '../../image/svg/Back.svg';
import StatusBarTSD from '../../components/StatusBarTSD';
import EnvoiceText from '../../components/EnvoiceText';
import ActionSheet from '../lightbox/ActionSheet';
import DrawerAction from '../lightbox/DrawerAction';
import DialogSuccess from '../lightbox/DialogSuccess';
import EnvoiceMenuText from '../../components/EnvoiceMenuText';
import ButtonText from '../../components/ButtonText';

// Hàm render chính màn hình
const StartReleaseScreen = () => {
  // Action  hiển thị thông báo  kết quả lập hoá đơn
  const createRelease = React.useCallback(() => {
    const dialog = {
      title: 'Lập thông báo phát hành hóa đơn thành công',
      confirmText: 'Đồng ý',
      confirmAction: () => {
        Actions.pop();
      },
    };
    DialogSuccess.show(dialog);
  });

  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <View style={styles.container}>
        <AppHeader
          onPressMenu={() => Actions.pop()}
          Icon={Back}
          iconColor={AppColors.white}
          backgroundColor={AppColors.blue}
          title={I18n.t('startReleaseScreen.titleScreen')}
          titleColor={AppColors.white}
        />
        <ScrollView style={styles.scroll}>
          <View style={styles.horizontal}>
            <Text style={styles.title}>
              {I18n.t('startReleaseScreen.inforRelase')}
            </Text>
            <Text style={AppStyles.baseText}>{'Trạng thái: Nhập mới'}</Text>
          </View>
          <EnvoiceText
            drop
            onPress={() => ActionSheet.show()}
            title={'Mã mẫu hóa đơn'}
            value={'MHD_1_202003021624_141'}
          />
          <EnvoiceText title={'Loại hóa đơn'} value={'Hóa đơn GTGT'} />

          <View style={styles.horizontal}>
            <View style={AppStyles.flex1}>
              <EnvoiceMenuText
                title={'Ký hiệu'}
                value={'AA'}
                onPress={() => DrawerAction.show()}
              />
            </View>
            <View style={styles.distanceRow} />
            <View style={AppStyles.flex1}>
              <EnvoiceText title={''} value={'20'} />
            </View>
          </View>
          <EnvoiceText title={'Số lượng'} value={'20'} />
          <View style={styles.containerNumber}>
            <View style={styles.wrapNumber}>
              <Text style={AppStyles.baseText}>{'Từ số:'}</Text>
              <Text style={AppStyles.secondaryText}>{'0000001'}</Text>
            </View>
            <View style={styles.lineVertical} />
            <View style={styles.wrapNumber}>
              <Text style={AppStyles.baseText}>{'Đến số:'}</Text>
              <Text style={AppStyles.secondaryText}>{'00000020'}</Text>
            </View>
          </View>
          <EnvoiceText
            title={'Ngày bắt đầu sử dụng'}
            value={'03/03/2020'}
            onPress={() => {}}
            date
          />

          <Text style={styles.title}>{'Thông tin đơn vị phát hành'}</Text>
          <EnvoiceText
            disabled
            title={'Mã số thuế:'}
            value={'0101300666-666'}
          />
          <EnvoiceText
            disabled
            title={'Tên đơn vị'}
            value={'CÔNG TY THÁI SON TEST'}
          />
          <EnvoiceText disabled title={'Địa chỉ'} value={'15 đặng thùy trâm'} />
          <View style={styles.horizontal}>
            <View style={AppStyles.flex1}>
              <EnvoiceText disabled title={'Điện thoại'} value={''} />
            </View>
            <View style={styles.distanceRow} />
            <View style={AppStyles.flex1}>
              <EnvoiceText disabled title={'Fax'} value={''} />
            </View>
          </View>

          <Text style={styles.title}>{'Đơn vị chủ quản'}</Text>
          <EnvoiceText title={'Tên đơn vị chủ quản'} value={''} />
          <EnvoiceText title={'Mã số thuế đơn vị chủ quản'} value={''} />
          <EnvoiceText
            title={'Mã số thuế đơn vị chủ quản'}
            value={'10100 I  Chi cục Thuế quận Thanh Xuân'}
            drop
            onPress={() => ActionSheet.show()}
          />

          <EnvoiceText title={'Người đại diện pháp luật'} value={''} />
          <View style={styles.horizontal}>
            <View style={AppStyles.flex1}>
              <EnvoiceText date title={'Ngày lập phiếu'} value={'03/03/2020'} />
            </View>
            <View style={styles.distanceRow} />
            <View style={AppStyles.flex1}>
              <EnvoiceText date title={'Ngày ký'} value={'03/03/2020'} />
            </View>
          </View>
          <EnvoiceText
            title={'Chi nhánh'}
            value={''}
            drop
            onPress={() => ActionSheet.show()}
          />
          <EnvoiceText title={'Ghi chú'} value={''} />
          <View style={styles.distanceBottom} />
        </ScrollView>
        <View style={styles.wrapButton}>
          <ButtonText
            onCick={() => createRelease()}
            title={I18n.t('common.write')}
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
  scroll: {
    flex: 1,
    paddingHorizontal: AppSizes.paddingXSml,
  },
  title: {...AppStyles.boldText, color: '#3F3D4B'},
  horizontal: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  wrapNumber: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: AppSizes.paddingSml,
  },
  lineVertical: {
    height: '100%',
    width: 1,
    backgroundColor: AppColors.gray,
  },
  containerNumber: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: AppColors.border,
    borderRadius: AppSizes.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: AppSizes.marginSml,
  },
  distanceRow: {
    width: '5%',
  },
  distanceBottom: {
    height: 100,
    width: '100%',
  },
  wrapButton: {
    width: '100%',
    padding: AppSizes.paddingXSml,
    backgroundColor: AppColors.white,
  },
});

export default StartReleaseScreen;
