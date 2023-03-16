import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppSizes, AppStyles, AppColors } from '../theme';

// Cách khai báo
//<LabelImage
//  Icon={Plus}
//  label={'Lập hoá đơn'}
//  onPress={() => Actions.jump('createInvoice')}
///>;

const LabelImage = ({ Icon, label, onPress, contentStyles, iconStyle }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress && onPress()}>
      <Icon fill={AppColors.blue} style={[styles.icon, { ...iconStyle }]} />
      <Text style={[styles.title, { ...contentStyles }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:AppSizes.marginXSml
  },
  icon: { minWidth: 24, width: 24, minHeight: 24, height: 24, margin: 10 },
  title: {
    ...AppStyles.baseText,
    color: AppColors.black,
  },
});

export default LabelImage;
