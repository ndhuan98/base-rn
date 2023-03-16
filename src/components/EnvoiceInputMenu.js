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
import PropTypes from 'prop-types';

const EnvoiceInputMenu = props => {
  const {isLoading, disabled} = props;
  return (
    <View style={styles.container}>
      <View style={styles.wraptitle}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>{props.title && props.title}</Text>
          {props.require && <Text style={styles.require}>{'*'}</Text>}
        </View>
      </View>
      <TouchableOpacity
        disabled={!props.onPress}
        onPress={() => (props.onPress && props.onPress()) || undefined}
        style={{
          ...styles.wrapButton,
          backgroundColor: props.disabled
            ? AppColors.disable
            : AppColors.white,
        }}>
        {!props.disabled && (
          <View style={styles.box}>
          <TextInput
            style={styles.value}
            value={props.value}
            editable={!props.disabled}
            placeholder={props.placeholder && props.placeholder}
            onChangeText={text =>
              props.onChangeText && props.onChangeText(text)
            }
            onEndEditing={() => props.onEndEditing && props.onEndEditing()}
            onBlur={() => props.onBlur && props.onBlur()}
            onChange={() => props.onChange && props.onChange()}
          />
          </View>
        )}
        <TouchableOpacity
          disabled={isLoading || disabled}
          onPress={() => props.onClickRight && props.onClickRight()}
          style={{
            ...styles.containerRight,
          }}>
              <Text style={styles.txtTitleRight}>
                {props.titleRight && props.titleRight}
              </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

EnvoiceInputMenu.propTypes = {
    titleRight: PropTypes.string,
    onCick: PropTypes.func,
    isLoading: PropTypes.bool,
  };
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: AppSizes.borderRadius ,
  },
  require: {
    ...AppStyles.smallText,
    color: AppColors.red,
  },
  title: {
    ...AppStyles.baseText,
    color: AppColors.textGray,
    marginBottom:AppSizes.marginXXSml,
  },
  txtTitleRight: {
    ...AppStyles.boldText,
    color: AppColors.darkblue,
    fontSize:AppSizes.smallText,
    paddingHorizontal:AppSizes.paddingXSml,
    lineHeight:16,
    alignItems:'center'
  },
  containerRight: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width:'30%',
    backgroundColor:'#F1F1F1',
    height: height * 0.0672,
    borderTopRightRadius:5,
    borderWidth:1,
    borderColor: AppColors.border,
    borderBottomRightRadius:5,
  },
  value: {
    ...AppStyles.baseText,
    color: AppColors.textContent,
    flex: 1,
    paddingHorizontal: AppSizes.paddingXSml,
    fontSize: 15,
    borderRadius: AppSizes.borderRadius,
    borderWidth:1,
    borderColor: AppColors.border,
  },
  wrapButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    height: height * 0.0672,
  },
  box:{
    width:'67%',
  }
});
export default EnvoiceInputMenu;
