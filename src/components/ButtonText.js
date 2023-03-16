import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import {AppColors, AppSizes, AppStyles} from '@theme';
const {width, height} = Dimensions.get('window');
import Spinner from 'react-native-spinkit';
import _ from 'lodash';
import PropTypes from 'prop-types';

const ButtonText = props => {
  const {isLoading, loadingColor, disabled, styleTitle} = props;
  const title = styleTitle ? styleTitle : styles.txtTitle;
  return (
    <TouchableOpacity
      disabled={isLoading || disabled}
      onPress={_.throttle(() => props.onCick && props.onCick(), 1000, {
        trailing: false,
      })}
      style={{
        ...styles.container,
        backgroundColor: disabled ? AppColors.gray : AppColors.blue,
      }}>
      {isLoading && (
        <Spinner
          size={24}
          type={'ThreeBounce'}
          color={loadingColor || AppColors.white}
        />
      )}

      {!isLoading && <Text style={title}>{props?.title}</Text>}
    </TouchableOpacity>
  );
};

ButtonText.propTypes = {
  title: PropTypes.string,
  onCick: PropTypes.func,
  isLoading: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: AppSizes.paddingSml,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.darkblue,
    borderRadius: 5,
    height: height * 0.0672,
  },
  txtTitle: {
    ...AppStyles.baseText,
    color: AppColors.white,
  },
});

export default React.memo(ButtonText);
