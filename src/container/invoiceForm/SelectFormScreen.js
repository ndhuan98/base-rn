// Màn hình : Chọn mẫu hoá đơn
import React from 'react';
import {View, StyleSheet, SafeAreaView, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {AppStyles, AppColors, AppSizes} from '../../theme';
import AppHeader from '../../components/AppHeader';
import Back from '../../image/svg/Back.svg';
import Filter from '../../image/svg/Filter2.svg';
import StatusBarTSD from '../../components/StatusBarTSD';
import InvoiceLetter from '../../image/temp/InvoiceLetter.png';
import ViewPager from '@react-native-community/viewpager';
import ButtonText from '../../components/ButtonText';

// Hàm render chính
const SelectFormScreen = () => {
  const onClickFilter = () => {
    Actions.filterInvoice();
  };
  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <View style={styles.container}>
        <AppHeader
          Icon={Back}
          iconColor={AppColors.white}
          backgroundColor={AppColors.blue}
          title={'Chọn mẫu hoá đơn'}
          titleColor={AppColors.white}
          onPressMenu={() => Actions.pop()}
          subTitle={'(5 mẫu hóa đơn phù hợp)'}
          RightIcon={Filter}
          onPressRight={() => onClickFilter()}
        />
        <View style={styles.containerPager}>
          <ViewPager
            showPageIndicator={true}
            style={AppStyles.flex1}
            initialPage={0}
            pageMargin={10}>
            <View key="1">
              <Image
                resizeMode={'contain'}
                source={InvoiceLetter}
                style={styles.imgEnvoice}
              />
            </View>
            <View key="2">
              <Image
                resizeMode={'contain'}
                source={InvoiceLetter}
                style={styles.imgEnvoice}
              />
            </View>
            <View key="3">
              <Image
                resizeMode={'contain'}
                source={InvoiceLetter}
                style={styles.imgEnvoice}
              />
            </View>
          </ViewPager>
        </View>

        <View style={styles.wrapButton}>
          <ButtonText onCick={() => Actions.renameForm()} title={'Chọn mẫu'} />
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
  containerPager: {
    flex: 1,
    padding: 10,
    backgroundColor: AppColors.background,
  },
  imgEnvoice: {width: '100%', height: '100%'},
  wrapButton: {
    padding: AppSizes.paddingSml,
    width: '100%',
    backgroundColor: AppColors.white,
  },
});

export default SelectFormScreen;
