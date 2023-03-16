/**
 * Khởi tạo các bước hướng dẫn sử dụng hoá đơn điện tử
 */

import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Check from '../image/svg/Check.svg';
import {AppColors, AppStyles, AppSizes} from '../theme';
import Step1 from '../image/svg/steps/Step1.svg';

// Hưỡng dẫn sử dụng :
// <EnvoiceStep
// currentStep={currentStep}
// Icon={Steps.one.icon}
// title={Steps.one.descreption}
// numberStep={Steps.one.title}
// onPress={() => Actions.selectForm()}
// />

const EnvoiceStep = props => {
  const {currentStep, numberStep, icon} = props;
  const Icon = icon ? icon : Step1;
  const isCurrent = currentStep === numberStep;
  const isPass = currentStep > numberStep;
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => props.onPress && props.onPress()}
      style={{
        ...styles.container,
        borderColor: isPass ? AppColors.green : AppColors.border,
        backgroundColor: isCurrent ? AppColors.white : AppColors.background,
      }}>
      {!isPass && (
        <View
          style={{
            ...styles.wrapNumber,
            backgroundColor: isCurrent
              ? AppColors.darkblue
              : AppColors.blueBackground,
          }}>
          <Text style={{...AppStyles.baseText, color: AppColors.white}}>
            {props.numberStep}
          </Text>
        </View>
      )}
      {isPass && (
        <View style={styles.wrapCheck}>
          <Check style={styles.checkIcon} fill={AppColors.green} />
        </View>
      )}
      <Icon style={styles.iconLarge} />
      <Text style={styles.title}>{props.title && props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    paddingVertical: 20,
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: AppSizes.borderRadius,
    alignItems: 'center',
    width: '50%',
  },
  checkIcon: {width: 40, height: 40},
  title: {
    ...AppStyles.baseText,
    color: AppColors.black,
    textAlign: 'center',
  },
  iconLarge: {width: 50, height: 50, margin: AppSizes.marginSml},
  wrapNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: -40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapCheck: {marginTop: -40, backgroundColor: AppColors.white},
});

export default React.memo(EnvoiceStep);
