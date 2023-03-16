import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {AppStyles, AppColors, AppSizes} from '../theme';
const {width, height} = Dimensions.get('window');
import DotMenu from '../image/svg/DotMenu.svg';

const ButtonThree = props => {
  const styleButtonOne =
    props.indexActive == 0 ? styles.activeButton : styles.buttonInactive;
  const styleTextOne =
    props.indexActive == 0 ? styles.txtActive : styles.txtInActive;
  const styleButtonTwo =
    props.indexActive == 1 ? styles.activeButton : styles.buttonInactive;
  const styleTextTwo =
    props.indexActive == 1 ? styles.txtActive : styles.txtInActive;
  const styleButtonThree =
    props.indexActive == 2 ? styles.activeButton : styles.buttonInactive;
  const styleTextThree =
    props.indexActive == 2 ? styles.txtActive : styles.txtInActive;

  return (
    <View style={styles.container}>
      <View style={styles.wrapGroup}>
        <TouchableOpacity
          onPress={() => (props.onClickOne && props.onClickOne()) || undefined}
          style={styleButtonOne}>
          <Text style={styleTextOne}>{props.oneText || 'oneText'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => (props.onClickTwo && props.onClickTwo()) || undefined}
          style={{
            ...styleButtonTwo,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: AppColors.blue,
          }}>
          <Text style={styleTextTwo}>{props.twoText || 'twoText'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            (props.onClickMenu && props.onClickMenu()) || undefined
          }
          style={{
            width: 35,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <DotMenu style={{width: 25, height: 16}} fill={AppColors.darkblue} />
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
    ...AppStyles.boldText,
    color: AppColors.white,
  },
  txtInActive: {
    ...AppStyles.boldText,
    color: AppColors.blue,
  },
});

export default React.memo(ButtonThree);
