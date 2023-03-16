import React from 'react';
import {Text, View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {AppStyles, AppColors, AppSizes} from '../../theme';
import StatusBarTSD from '../../components/StatusBarTSD';
import {Actions} from 'react-native-router-flux';
import AppHeader from '../../components/AppHeader';
import {I18n} from '@constant';
import Back from '../../image/svg/Back.svg';
import ButtonText from '../../components/ButtonText';
import TextWthRadio from '../../components/TextWthRadio';
import EnvoiceText from '../../components/EnvoiceText';

const des =
  'Theo quy định, sau khi doanh nghiệp nộp hồ sơ phát hành hóa đơn liên quan thuế thì sẽ có 2 trường hợp:\n1. Cơ quan thuế sẽ có công văn trả lời đồng ý phát hành của doanh nghiệp.\n2. Sau 2 ngày cơ quan thuế không trả lời thì hồ sơ phát hành hóa đơn của doanh nghiệp mặc định có hiệu lực.';

const StartUsedEnvoiceSceen = ({params}) => {
  const ActionContinue = React.useCallback(() => {
    Actions.aroundNumber();
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
        />
        <ScrollView style={{flex: 1, paddingHorizontal: AppSizes.paddingXSml}}>
          <Text style={styles.titleScreen}>
            {
              'ĐỂ BẮT ĐẦU SỬ DỤNG HÓA ĐƠN, BẠN CẦN XÁC NHẬN MỘT SỐ THÔNG TIN SAU'
            }
          </Text>
          <Text style={styles.titleBold}>
            {
              '1. Bạn có chắc chắn được Cơ quan thuế chấp nhận phát hành hóa đơn mẫu 01GTKT0/004 ký hiệu AA/20E từ số 0000007 tới số 0000009?'
            }
          </Text>
          <Text style={styles.desStyle}>{des}</Text>
          <TextWthRadio
            ischecked={true}
            title={'Số công văn trả lời của cơ quan thế'}
          />
          <TextWthRadio
            ischecked={false}
            title={'Trường hợp cơ quan thuế không trả lời sau 2 ngày'}
          />
          <EnvoiceText title={''} value={''} />
          <Text style={styles.titleBold}>
            {
              '2. Hiện tại hệ thống đang tự động ký số ngay sau khi xuất hóa đơn, bạn có muốn thay đổi không?'
            }
          </Text>
          <TextWthRadio
            ischecked={false}
            title={'Ký số ngay sau khi xuất hóa đơn'}
          />
          <Text style={styles.titleBold}>
            {
              '3.Bạn có muốn sử dụng ngoại tệ trong quá trình lập hóa đơn không?'
            }
          </Text>
          <TextWthRadio ischecked={false} title={'Có sử dung ngoại tệ'} />
          <TextWthRadio ischecked={true} title={'Không sử dung ngoại tệ'} />
          <Text style={styles.titleBold}>
            {
              '4. Trong trường hợp bạn sử dụng ngoại tệ, bạn vui lòng chọn hình thức mà bạn muốn sử dụng để thanh toán'
            }
          </Text>

          <TextWthRadio
            ischecked={false}
            title={'Sử dung đơn giá, thành tiền, tổng thanh toán bằng tiền tệ'}
          />
          <TextWthRadio
            ischecked={true}
            title={
              'Sử dung đơn giá, thành tiền nguyên tệ, tuy nhiên tổng thanh toán sẽ được quy đổi sang VNĐ'
            }
          />
        </ScrollView>
        <View style={styles.wrapButton}>
          <ButtonText
            onCick={() => ActionContinue()}
            title={I18n.t('common.continue')}
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
});

export default StartUsedEnvoiceSceen;
