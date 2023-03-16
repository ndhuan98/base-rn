import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {AppSizes, AppColors, AppFonts, AppStyles} from '@theme';

import Spinner from 'react-native-spinkit';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    width: '88%',
    backgroundColor: AppColors.blue,
  },
  title: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  border: {
    backgroundColor: 'transparent',
    borderColor: AppColors.blue,
    borderWidth: 1,
  },
});

export default class LoadingButton extends Component {
  render() {
    const {
      small,
      round,
      title,
      loading,
      titleStyle,
      containerStyle,
      action,
      disabled,
      customTitle,
      border,
      image,
    } = this.props;
    const extraStyle = border ? styles.border : {};
    const extraTextStyle = border ? {color: AppColors.blue} : {};
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        hitSlop={AppStyles.increaseTouch}
        disabled={loading || disabled}
        style={[
          styles.container,
          extraStyle,
          {
            // opacity: disabled ? 0.8 : 1.0,
            borderRadius: round ? 25 : 5,
          },
          containerStyle,
        ]}
        onPress={() => {
          action && action();
        }}
      >
        {image && (
          <Image
            source={image}
            style={{position: 'absolute', left: 10, width: 26, height: 26}}
          />
        )}
        {!loading &&
          (customTitle && !_.isUndefined(customTitle) ? (
            customTitle()
          ) : (
            <Text style={[styles.title, extraTextStyle, titleStyle]}>
              {title}
            </Text>
          ))}
        {loading && (
          <Spinner
            style={
              Platform.OS === 'ios' ? {marginBottom: 6, marginRight: 5} : {}
            }
            size={20}
            type={'Circle'}
            color={AppColors.white}
          />
        )}
      </TouchableOpacity>
    );
  }
}
