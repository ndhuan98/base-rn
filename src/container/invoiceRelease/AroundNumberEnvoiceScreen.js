import React from 'react';
import {Text, View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {AppStyles, AppColors, AppSizes} from '../../theme';
import StatusBarTSD from '../../components/StatusBarTSD';
import {Actions} from 'react-native-router-flux';
import AppHeader from '../../components/AppHeader';
import {I18n} from '@constant';
import Back from '../../image/svg/Back.svg';
import DialogSuccess from '../lightbox/DialogSuccess';
import EnvoiceText from '../../components/EnvoiceText';
import GroupButton from '../../components/GroupButton';
import Help from '../../image/svg/steps/Help.svg';

const descriptions =
  'Hiện tại hệ thống đang để mặc định làm tròn 0 chữ số thập phân với tiền VNĐ và 2 chữ số thập phân với tiền ngoại tệ.Trong trường hợp muốn thay đổi, bạn có thể nhập số chữ số thập phân bạn muốn làm tròn vào các tham số dưới đây:';

// Hàm render chính của màn hình
const AroundNumberEnvoiceScreen = () => {
  // thực hiện việc xác nhận hoá đơn
  const commitAction = React.useCallback(() => {
    const dialog = {
      title: 'Hoàn thành',
      message: 'Bạn đủ điều kiện để chính thức sử dụng hóa đơn điện tử.',
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
          title={'Bắt đầu sử dụng hóa đơn'}
          titleColor={AppColors.white}
          iconColor={AppColors.white}
          RightIcon
          IconRight={Help}
          onPressRight={() => console.log('onPressRight')}
        />
        <ScrollView
          style={{...AppStyles.flex1, paddingHorizontal: AppSizes.paddingXSml}}>
          <Text style={styles.titleScreen}>{'XÁC NHẬN THAM SỐ LÀM TRÒN'}</Text>
          <Text style={styles.desStyle}>{descriptions}</Text>
          <Text style={styles.titleBold}>{'1. Số lượng, tỷ giá'}</Text>
          <EnvoiceText
            title={'Làm tròn số lượng'}
            value={'0'}
            subtitle={'(Ngầm định: 0)'}
          />
          <EnvoiceText
            title={'Tỷ giá'}
            value={'0'}
            subtitle={'(Ngầm định: 0)'}
          />
          <Text style={styles.titleBold}>
            {'2. Làm tròn trên chi tiết đơn hàng'}
          </Text>
          <View style={styles.horizontalBetween}>
            <Text style={styles.titleMoney}>{'Tiền VNĐ'}</Text>
            <Text style={styles.titleMoney}>{'Tiền nguyên tệ'}</Text>
          </View>
          <View style={styles.horizontalBetween}>
            <View style={AppStyles.flex1}>
              <EnvoiceText
                title={'Làm tròn đơn giá'}
                value={'0'}
                subtitle={'(Ngầm định: 0)'}
              />
            </View>
            <View style={{width: '5%'}} />
            <View style={AppStyles.flex1}>
              <EnvoiceText title={''} value={'0'} subtitle={'(Ngầm định: 0)'} />
            </View>
          </View>
          <View style={styles.horizontalBetween}>
            <View style={AppStyles.flex1}>
              <EnvoiceText
                title={'Làm tròn thành tiền'}
                value={'0'}
                subtitle={'(Ngầm định: 0)'}
              />
            </View>
            <View style={{width: '5%'}} />
            <View style={AppStyles.flex1}>
              <EnvoiceText title={''} value={'0'} subtitle={'(Ngầm định: 0)'} />
            </View>
          </View>
          <View style={styles.horizontalBetween}>
            <View style={AppStyles.flex1}>
              <EnvoiceText
                title={'Làm tròn thuế'}
                value={'0'}
                subtitle={'(Ngầm định: 0)'}
              />
            </View>
            <View style={{width: '5%'}} />
            <View style={AppStyles.flex1}>
              <EnvoiceText title={''} value={'0'} subtitle={'(Ngầm định: 2)'} />
            </View>
          </View>

          <Text style={styles.titleBold}>{'3. Làm tròn trên hóa đơn'}</Text>
          <View style={styles.horizontalBetween}>
            <Text style={styles.titleMoney}>{'Tiền VNĐ'}</Text>
            <Text style={styles.titleMoney}>{'Tiền nguyên tệ'}</Text>
          </View>

          <View style={styles.horizontalBetween}>
            <View style={AppStyles.flex1}>
              <EnvoiceText
                title={'Cộng tiền hàng'}
                value={'0'}
                subtitle={'(Ngầm định: 0)'}
              />
            </View>
            <View style={{width: '5%'}} />
            <View style={AppStyles.flex1}>
              <EnvoiceText title={''} value={'0'} subtitle={'(Ngầm định: 2)'} />
            </View>
          </View>

          <View style={styles.horizontalBetween}>
            <View style={AppStyles.flex1}>
              <EnvoiceText
                title={'Tiền chiết khấu'}
                value={'0'}
                subtitle={'(Ngầm định: 0)'}
              />
            </View>
            <View style={{width: '5%'}} />
            <View style={AppStyles.flex1}>
              <EnvoiceText title={''} value={'0'} subtitle={'(Ngầm định: 2)'} />
            </View>
          </View>

          <View style={styles.horizontalBetween}>
            <View style={AppStyles.flex1}>
              <EnvoiceText
                title={'Tiền thuế GTGT (5%)'}
                value={'0'}
                subtitle={'(Ngầm định: 0)'}
              />
            </View>
            <View style={{width: '5%'}} />
            <View style={AppStyles.flex1}>
              <EnvoiceText title={''} value={'0'} subtitle={'(Ngầm định: 2)'} />
            </View>
          </View>

          <View style={styles.horizontalBetween}>
            <View style={AppStyles.flex1}>
              <EnvoiceText
                title={'Tiền thuế GTGT (10%)'}
                value={'0'}
                subtitle={'(Ngầm định: 0)'}
              />
            </View>
            <View style={{width: '5%'}} />
            <View style={AppStyles.flex1}>
              <EnvoiceText title={''} value={'0'} subtitle={'(Ngầm định: 2)'} />
            </View>
          </View>

          <View style={styles.horizontalBetween}>
            <View style={AppStyles.flex1}>
              <EnvoiceText
                title={'Tổng thanh toán'}
                value={'0'}
                subtitle={'(Ngầm định: 0)'}
              />
            </View>
            <View style={{width: '5%'}} />
            <View style={AppStyles.flex1}>
              <EnvoiceText title={''} value={'0'} subtitle={'(Ngầm định: 2)'} />
            </View>
          </View>
          <View style={styles.distanceBottom} />
        </ScrollView>
        <View style={styles.wrapButton}>
          <GroupButton
            InactiveTitle={'Khôi phục cài đặt ngầm định'}
            ActiveTitle={'Hoàn thành thiết lập'}
            onClickInactive={() => console.log('onClickInactive')}
            onClickActive={commitAction}
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
  wrapButton: {
    width: '100%',
    padding: AppSizes.paddingXSml,
    backgroundColor: AppColors.white,
  },
  titleScreen: {
    ...AppStyles.boldText,
    textAlign: 'center',
    color: AppColors.black,
  },
  titleBold: {
    ...AppStyles.boldText,
    fontSize: 14,
    color: AppColors.black,
  },
  desStyle: {...AppStyles.baseText, color: AppColors.black},
  titleMoney: {
    ...AppStyles.boldText,
    fontSize: 15,
    color: AppColors.darkblue,
  },
  horizontalBetween: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  distanceBottom: {
    width: '100%',
    height: 100,
  },
});

export default AroundNumberEnvoiceScreen;
