import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {AppColors, AppStyles, AppSizes} from '@theme';

const InfoLabel = ({Icon, LeftText, RightText, RightColor}) => {
  return (
    <View style={styles.container}>
      <Icon fill={AppColors.blue} style={styles.icon} />
      <Text style={AppStyles.baseText}> {LeftText}</Text>
      <View style={AppStyles.flex1} />
      <Text style={{...AppStyles.baseText, color: RightColor && RightColor}}>
        {RightText}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: AppSizes.paddingXXSml,
  },
  icon: {
    minHeight: 14,
    maxWidth: 14,
    width: 14,
    height: 14,
    marginRight: 10,
    marginVertical: 10,
  },
});

export default InfoLabel;
