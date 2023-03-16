import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {AppStyles, AppColors, AppSizes} from '../theme';
import Menu from '../image/svg/Hamberger.svg';
import Filter from '../image/svg/Filter.svg';
import _ from 'lodash';
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: AppSizes.paddingXSml,
  },
  left: {
    position: 'absolute',
    left: 0,
    padding: AppSizes.margin,
  },
  iconLeft: {width: 25, height: 25},
  center: {justifyContent: 'center', alignItems: 'center'},
  right: {
    position: 'absolute',
    right: 0,
    padding: AppSizes.paddingSml,
  },
  wrapRightText: {
    position: 'absolute',
    right: 0,
    padding: AppSizes.margin,
  },
  subTitle: {
    ...AppStyles.hintText,
    color: 'white',
    fontSize: 14,
  },
});

const AppHeader = props => {
  const Icon = props.Icon ? props.Icon : Menu;
  const IconRight = props.IconRight ? props.IconRight : Filter;
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: props.backgroundColor && props.backgroundColor,
      }}>
      <TouchableOpacity
        onPress={() => props.onPressMenu && props.onPressMenu()}
        style={styles.left}>
        <Icon
          style={styles.iconLeft}
          fill={props.iconColor ? props.iconColor : AppColors.blue}
        />
      </TouchableOpacity>
      <View style={styles.center}>
        <Text
          style={{
            ...AppStyles.boldText,
            fontSize: 17,
            color: props.titleColor ? props.titleColor : AppColors.blue,
          }}>
          {props.title && props.title}
        </Text>
        {props.subTitle && (
          <Text style={styles.subTitle}>{props.subTitle}</Text>
        )}
      </View>
      {props.RightIcon && (
        <TouchableOpacity
          onPress={_.throttle(
            () => props.onPressRight && props.onPressRight(),
            1000,
            {
              trailing: false,
            },
          )}
          style={styles.right}>
          <IconRight
            style={styles.iconLeft}
            fill={props.iconColor ? props.iconColor : AppColors.blue}
          />
        </TouchableOpacity>
      )}
      {!_.isEmpty(props.RightText) && (
        <TouchableOpacity
          onPress={() => props.onPressRight && props.onPressRight()}
          style={styles.wrapRightText}>
          <Text style={{...AppStyles.baseText, color: AppColors.white}}>
            {props.RightText && props.RightText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default React.memo(AppHeader);
