import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {AppStyles, AppColors, AppSizes} from '../../theme';
import {Actions} from 'react-native-router-flux';
import AppHeader from '../../components/AppHeader';
import StatusBarTSD from '../../components/StatusBarTSD';
import EnvoiceStep from '../../components/EnvoiceStep';
import {I18n} from '@constant';
import Back from '../../image/svg/Back.svg';
import Step1 from '../../image/svg/steps/Step1.svg';
import Step2 from '../../image/svg/steps/Step2.svg';
import Step3 from '../../image/svg/steps/Step3.svg';
import Step4 from '../../image/svg/steps/Step4.svg';
import Step5 from '../../image/svg/steps/Step5.svg';
import Youtube from '../../image/svg/steps/Youtube.svg';
import Help from '../../image/svg/steps/Help.svg';

// Khởi tạo data danh sách các bước hướng dưỡng
// mẫu  STT: {
//   icon: Icon của bước hướng dẫn,
//   title: 'tên của bước  hướng dẫn',
//   descreption: 'mô tả từng bước hướng dẫn',
// },

const Steps = {
  one: {
    icon: Step1,
    title: '01',
    descreption: I18n.t('envoiceSteps.one'),
  },
  two: {
    icon: Step2,
    title: '02',
    descreption: I18n.t('envoiceSteps.two'),
  },
  three: {
    icon: Step3,
    title: '03',
    descreption: I18n.t('envoiceSteps.three'),
  },
  four: {
    icon: Step4,
    title: '04',
    descreption: I18n.t('envoiceSteps.four'),
  },
  five: {
    icon: Step5,
    title: '05',
    descreption: I18n.t('envoiceSteps.five'),
  },
};

// Hiển thị button hướng dẫn và hỗ trợ
// param = {
//  Icon : '',
//  title :''
// }

const ButtonImage = props => {
  const Icon = props.src;
  return (
    <TouchableOpacity style={styles.warpimgBt}>
      <Icon style={styles.iconSmall} />
      <Text style={styles.titleSml}>{props.title && props.title}</Text>
    </TouchableOpacity>
  );
};

// Hiểm dị  1 dòng line dọc  có thể thay đổi màu sắc
//  param ={
//  currentStep: '02',
//  numberStep: ''05
// }
const LineVertical = props => {
  const {currentStep, numberStep} = props;
  const isPass = currentStep > numberStep;
  return (
    <View
      style={{
        height: '5%',
        width: 2,
        backgroundColor: isPass ? AppColors.green : AppColors.border,
      }}
    />
  );
};

// Hàm render chính của màn hình
const TutorialScreen = () => {
  const [currentStep, setCurrentStep] = React.useState('03');
  return (
    <SafeAreaView style={AppStyles.styleSafeArea}>
      <StatusBarTSD />
      <View style={styles.container}>
        <AppHeader
          onPressMenu={() => Actions.pop()}
          Icon={Back}
          iconColor={AppColors.white}
          backgroundColor={AppColors.blue}
          title={I18n.t('tutorialScreen.titleScreen')}
          titleColor={AppColors.white}
        />
        <View style={styles.wrapTitle}>
          <Text style={styles.tileScreen}>
            {I18n.t('tutorialScreen.descreption')}
          </Text>
        </View>
        <ScrollView style={AppStyles.flex1}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={styles.topDistance} />
            <EnvoiceStep
              currentStep={currentStep}
              Icon={Steps.one.icon}
              title={Steps.one.descreption}
              numberStep={Steps.one.title}
              onPress={() => Actions.selectForm()}
            />
            <LineVertical
              currentStep={currentStep}
              numberStep={Steps.one.title}
            />
            <EnvoiceStep
              currentStep={currentStep}
              Icon={Steps.two.icon}
              title={Steps.two.descreption}
              numberStep={Steps.two.title}
              onPress={() => Actions.releaseEnvoice()}
            />
            <LineVertical
              currentStep={currentStep}
              numberStep={Steps.two.title}
            />
            <EnvoiceStep
              currentStep={currentStep}
              Icon={Steps.three.icon}
              title={Steps.three.descreption}
              numberStep={Steps.three.title}
              onPress={() => Actions.startReleaseEnvoice()}
            />
            <LineVertical
              currentStep={currentStep}
              numberStep={Steps.three.title}
            />
            <EnvoiceStep
              currentStep={currentStep}
              Icon={Steps.four.icon}
              title={Steps.four.descreption}
              numberStep={Steps.four.title}
              onPress={() => Actions.submitAgency()}
            />
            <LineVertical
              currentStep={currentStep}
              numberStep={Steps.four.title}
            />
            <EnvoiceStep
              currentStep={currentStep}
              Icon={Steps.five.icon}
              title={Steps.five.descreption}
              numberStep={Steps.five.title}
              onPress={() => Actions.startUse()}
            />
            <View style={styles.bottomDistance} />
          </View>
        </ScrollView>

        <View style={styles.wrapBottom}>
          <ButtonImage
            src={Help}
            title={I18n.t('tutorialScreen.commonQuestion')}
          />
          <ButtonImage
            src={Youtube}
            title={I18n.t('tutorialScreen.introVideo')}
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
  wrapBottom: {
    borderTopColor: AppColors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: AppSizes.marginSml,
  },
  tileScreen: {
    ...AppStyles.boldText,
    textAlign: 'center',
    color: AppColors.black,
  },
  wrapTitle: {
    width: '100%',
    paddingVertical: AppSizes.marginSml,
  },
  warpimgBt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: AppSizes.paddingMedium,
  },
  iconSmall: {width: 25, height: 25, marginRight: AppSizes.marginSml},
  titleSml: {...AppStyles.boldText, color: AppColors.black},
  topDistance: {width: '100%', height: 30},
  bottomDistance: {width: '100%', height: 200},
});

export default TutorialScreen;
