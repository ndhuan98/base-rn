import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
const {height} = Dimensions.get('window');
import {AppColors, AppStyles, AppSizes} from '../theme';
import DotMenu from '../image/svg/DotMenu.svg';

// Hướng dẫn sử dụng :
// <EnvoiceMenuText
// title={'Mẫu số hóa đơn'}
// value={'01GTKT0/001 - AA/19E'}
// onPress={() => DrawerAction.show(draw)}
// />

const EnvoiceMenuText = props => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapTitle}>
        <Text style={styles.title}>{props.title && props.title}</Text>
        {props.require && <Text style={styles.require}>{'*'}</Text>}
      </View>
      <View style={styles.wrapButton}>
        <TextInput
          style={styles.value}
          value={props.value}
          editable={!props.disabled}
          maxLength={props.maxLength}
          placeholder={props.placeholder && props.placeholder}
          onChangeText={text => props.onChangeText && props.onChangeText(text)}
          onEndEditing={() => props.onEndEditing && props.onEndEditing()}
          onBlur={() => props.onBlur && props.onBlur()}
          onChange={() => props.onChange && props.onChange()}
        />
        <TouchableOpacity
          disabled={!props.onPress || props.disabled}
          onPress={() => (props.onPress && props.onPress()) || undefined}
          style={styles.wrapIcon}>
          <DotMenu style={styles.iconDot} fill={AppColors.darkblue} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: AppSizes.borderRadius,
  },
  iconDot: {width: 24, height: 22},
  title: {
    ...AppStyles.baseText,
    color: AppColors.textGray,
    marginBottom:AppSizes.marginXXSml
  },
  wrapButton: {
    width: '100%',
    height: 50,
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
    borderLeftWidth: 1,
    borderColor: AppColors.border,
    padding: AppSizes.fontSmall,
    paddingHorizontal: 15,
    backgroundColor: '#F1F1F1',
    height: '100%',
    borderBottomRightRadius: AppSizes.borderRadius,
    borderTopRightRadius: AppSizes.borderRadius,
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

export default React.memo(EnvoiceMenuText);
