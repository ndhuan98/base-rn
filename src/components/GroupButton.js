import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity,Dimensions} from 'react-native';
import {AppStyles, AppColors, AppSizes} from '../theme';
const {width, height} = Dimensions.get('window');

// Cách khai báo GroupButton

/* <GroupButton
  InactiveTitle={'Ghi'}
  ActiveTitle={'Xem trước'}
  onClickInactive={() => console.log('onClickInactive')}
  onClickActive={() => console.log('onClickAcive')}
/>; */

const GroupButton = props => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapGroup}>
        <TouchableOpacity
          onPress={() =>
            (props.onClickActive && props.onClickActive()) || undefined
          }
          style={styles.activeButton}>
          <Text style={styles.txtActive}>
            {props.ActiveTitle || 'ActiveTitle'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            (props.onClickInactive && props.onClickInactive()) || undefined
          }
          style={styles.buttonInactive}>
          <Text style={styles.txtInActive}>
            {props.InactiveTitle || 'InactiveTitle'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    width: '100%',
    height: height * 0.0672,
    justifyContent: 'center',
    alignItems: 'center',
 
  },
  wrapGroup: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: AppColors.blue,
    borderRadius: AppSizes.borderRadius,
  },
  activeButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: AppSizes.paddingSml,
    backgroundColor: AppColors.blue,
  },
  buttonInactive: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: AppSizes.paddingSml,
  },
  txtActive: {
    ...AppStyles.baseText,
    color: AppColors.white,
  },
  txtInActive: {
    ...AppStyles.baseText,
    color: AppColors.blue,
  },
});

export default React.memo(GroupButton);
