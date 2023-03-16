import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
const {height} = Dimensions.get('window');
import {AppColors, AppStyles, AppSizes} from '../theme';
import DateIcon from '../image/svg/DatePicker.svg';
import {TextInputMask} from 'react-native-masked-text';

// Hướng dẫn sử dụng :
// <EnvoiceMenuText
// title={'Mẫu số hóa đơn'}
// value={'01GTKT0/001 - AA/19E'}
// onPress={() => DrawerAction.show(draw)}
// />

const PickerInput = props => {
  const IconRight = props.IconRight ? props.IconRight : DateIcon;
  return (
    <View style={styles.container}>
      <View style={styles.wrapTitle}>
        <Text style={styles.title}>{props.title && props.title}</Text>
        {props.require && <Text style={styles.require}>{'*'}</Text>}
      </View>
      <View style={styles.wrapButton}>
        <TextInputMask
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY',
          }}
          style={styles.value}
          value={props.value}
          editable={!props.disabled}
          placeholder={props.placeholder && props.placeholder}
          onChangeText={text => props.onChangeText && props.onChangeText(text)}
          onEndEditing={() => props.onEndEditing && props.onEndEditing()}
          onBlur={() => props.onBlur && props.onBlur()}
          onChange={() => props.onChange && props.onChange()}
        />
        <TouchableOpacity
          disabled={!props.onPress}
          onPress={() => (props.onPress && props.onPress()) || undefined}
          style={styles.wrapIcon}>
          <IconRight
            style={styles.iconDot}
            fill={props.iconColor ? props.iconColor : AppColors.gray}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: AppSizes.marginXXSml,
  },
  iconDot: {width: 20, height: 20},
  title: {
    ...AppStyles.baseText,
    color: AppColors.textGray,
  },
  wrapButton: {
    width: '100%',
    height: height * 0.067,
    flexDirection: 'row',
    borderRadius: AppSizes.borderRadius,
    borderWidth: 1,
    borderColor: AppColors.border,
    alignItems: 'center',
  },
  value: {
    ...AppStyles.baseText,
    color: AppColors.textContent,
    flex: 1,
    paddingHorizontal: AppSizes.paddingXSml,
    textAlignVertical: 'center',
    fontSize: 15,
  },
  wrapIcon: {
    padding: AppSizes.fontSmall,
    paddingHorizontal: 15,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapTitle: {
    flexDirection: 'row',
  },
  require: {
    ...AppStyles.smallText,
    color: AppColors.red,
  },
});

export default React.memo(PickerInput);
