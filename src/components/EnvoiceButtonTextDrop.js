import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import {AppColors, AppStyles, AppSizes} from '../theme';
import Drop from '../image/svg/Drop.svg';
import Date from '../image/svg/Date.svg';

//Cách khai báo

/* <EnvoiceText
title={'Mã số thuế'}
value={mst}
onPress={text => onChangeMST(text)}
/> */

const EnvoiceButtonTextDrop = props => {
  return (
    <View style={styles.container}>
      <View style={styles.wraptitle}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>{props.title && props.title}</Text>
          {props.require && <Text style={styles.require}>{'*'}</Text>}
        </View>

        {props.subtitle && (
          <Text style={styles.title}>{props.subtitle && props.subtitle}</Text>
        )}
      </View>
      <TouchableOpacity
        disabled={!props.onPress}
        onPress={() => (props.onPress && props.onPress()) || undefined}
        style={{
          ...styles.wrapButton,
          backgroundColor: AppColors.white,
        }}>
        {/* available for input text */}
        {!props.disabled && (
          <TextInput
            autoCorrect={false}
            multiline
            onChangeText={text =>
              props.onChangeText && props.onChangeText(text)
            }
            secureTextEntry={props.secureTextEntry}
            editable={!props.drop}
            onSubmitEditing={text =>
              props.onSubmitEditing && props.onSubmitEditing(text)
            }
            onEndEditing={() => props.onEndEditing && props.onEndEditing()}
            onBlur={() => props.onBlur && props.onBlur()}
            onChange={() => props.onChange && props.onChange()}
            keyboardType={props.keyboardType && props.keyboardType}
            maxLength={props.maxLength}
            placeholder={props.placeholder && props.placeholder}
            style={styles.value}>
            {props.value}
          </TextInput>
        )}
        {/* unavailable for input text */}
        {props.disabled && <Text style={styles.value}>{props.value}</Text>}
        {/* available for icon Arrow */}
        {props.drop && <Drop style={styles.icon} fill={AppColors.blue} />}
        {/* available for icon Date */}
        {props.date && <Date style={styles.icon} fill={AppColors.gray} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...AppStyles.baseText,
    color: AppColors.textGray,
    marginBottom: AppSizes.marginXXSml,
  },
  wrapButton: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: AppSizes.borderRadius,
    borderWidth: 1,
    borderColor: AppColors.border,
    alignItems: 'center',
    height: 50,
  },
  value: {
    ...AppStyles.baseText,
    color: AppColors.textContent,
    flex: 1,
    paddingHorizontal: AppSizes.paddingXSml,
    fontSize: 15,
  },
  icon: {width: 12, height: 12, marginHorizontal: AppSizes.marginXSml},

  wraptitle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    width: '100%',
    marginVertical: AppSizes.borderRadius,
  },
  require: {
    ...AppStyles.smallText,
    color: AppColors.red,
  },
});

export default React.memo(EnvoiceButtonTextDrop);
