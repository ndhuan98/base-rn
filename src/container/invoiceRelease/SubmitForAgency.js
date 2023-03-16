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
import StatusBarTSD from '../../components/StatusBarTSD';
import {Actions} from 'react-native-router-flux';
import AppHeader from '../../components/AppHeader';
import TextWthRadio from '../../components/TextWthRadio';

import {I18n} from '@constant';
import Back from '../../image/svg/Back.svg';
import ButtonText from '../../components/ButtonText';
import DialogSuccess from '../lightbox/DialogSuccess';

const stepSubmit =
  'Bước 1: Tải bộ hồ sơ trên phần mềm \nBước 2: In ra giấy, ký và đóng dấu của doanh nghiệp\nBước 3: Sau khi hoàn thiện thì mang bộ hồ sơ nộp cho Cơ quan Thuế quản lý trực tiếp';

const des =
  'Nghị định 119/2018/NĐ- CP ban hành quy định các doanh nghiệp bắt buộc phải chuyển đổi sang sử dụng hóa đơn điện tử trước ngày 1/11/2020. Doanh nghiệp cần nộp hồ sơ đăng ký sử dụng Hóa đơn điện tử Einvoice.vn bằng 2 cách: văn bản giấy hoặc văn bản điện tử.Trong trường hợp doanh nghiệp đã nộp hồ sơ lên cơ quan Thuế, bạn vui lòng nhấn nút "Xác nhận nộp hồ sơ" để hoàn thành bước 4.';

const TextWthLink = props => {
  return (
    <View style={styles.horizontal}>
      <Text style={styles.desStyle}>{props.title && props.title}</Text>
      <TouchableOpacity onPress={() => props.onPress && props.onPress()}>
        <Text style={styles.linkText}>{'(Tham khảo)'}</Text>
      </TouchableOpacity>
    </View>
  );
};
const SubmitForAgency = ({params}) => {
  const createRelease = React.useCallback(() => {
    const dialog = {
      title: 'Bạn đã xác nhận nộp hồ sơ thành công',
      message: 'Bạn có thể bắt đầu sử dụng hóa đơn',
      confirmText: 'Đồng ý',
      confirmAction: () => {
        Actions.pop();
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
          title={'Nộp bộ hồ sơ cho cơ quan thuế'}
          titleColor={AppColors.white}
        />
        <ScrollView style={{flex: 1, paddingHorizontal: AppSizes.paddingXSml}}>
          <Text style={styles.titleScreen}>
            {'HƯỚNG DẪN ĐĂNG KÝ SỬ DỤNG HÓA ĐƠN ĐIỆN TỬ CHO DOANH NGHIỆP'}
          </Text>
          <Text style={styles.desStyle}>{des}</Text>
          <Text style={styles.titleBold}>
            {'1. Hồ sơ đăng ký sử dụng hóa đơn điện tử'}
          </Text>
          <Text style={styles.desStyle}>
            {
              'Để sử dụng hóa đơn điện tử, đơn vị phải chuẩn bị hồ sơ thông báo phát hành hóa đơn điện tử.'
            }
          </Text>
          <Text style={styles.titleBold}>{'Hồ sơ bao gồm:'}</Text>
          <TextWthLink title={' ●  Mẫu hóa đơn điện tử '} />
          <TextWthLink title={' ●  Quyết định áp dụng hóa đơn điện tử '} />
          <TextWthLink title={' ●  Thông báo phát hành hóa đơn điện tử '} />

          <Text style={styles.titleBold}>
            {
              '2. Hồ sơ thông báo phát hành hóa đơn điện tử sẽ được gửi cho cơ quan Thuế quản lý trực tiếp bằng 2 cách (Chọn 1 trong 2 cách)'
            }
          </Text>

          <TextWthRadio
            ischecked={true}
            title={
              'Nộp hồ sơ đăng ký sử dụng hóa đơn điện tử bằng văn bản giấy'
            }
          />
          <TextWthRadio
            ischecked={false}
            title={
              'Nộp hồ sơ đăng ký sử dụng hóa đơn điện tử bằng văn bản điện tử'
            }
          />
          <Text style={styles.desStyle}>{stepSubmit}</Text>
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
  titleBold: {
    ...AppStyles.boldText,
    fontSize: 14,
    color: AppColors.black,
  },
  desStyle: {...AppStyles.baseText, color: AppColors.black},
  titleScreen: {
    ...AppStyles.boldText,
    textAlign: 'center',
    color: AppColors.black,
  },
  wrapRadio: {width: '100%', flexDirection: 'row', alignItems: 'center'},
  imgRadio: {width: 21, height: 21, margin: AppSizes.marginSml},
  linkText: {...AppStyles.baseText, color: AppColors.blue},
  horizontal: {width: '100%', flexDirection: 'row'},
});

export default SubmitForAgency;
