import React from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { AdjustIcon } from '../assets/svg-icons';
import { appColors } from '../utils/theme';
import { useAppState } from 'src/hooks/useAppState';
import { SortType } from 'src/utils/variables/form-validation';
import RNPickerSelect from 'react-native-picker-select';

type Props = {
  wrapStyle?: StyleProp<ViewStyle>;
};

export function AppSortButton({ wrapStyle }: Props) {
  const { appSortType, onSetValueSortType } = useAppState();
  const options = [
    { label: 'Lượt xem giảm dần', value: SortType.desc, key: 1 },
    { label: 'Lượt xem tăng dần', value: SortType.asc, key: 2 },
  ];

  return (
    <View style={[styles.main, Platform.OS === 'ios' && { height: 50 }, wrapStyle]}>
      <RNPickerSelect
        items={options}
        value={appSortType}
        fixAndroidTouchableBug={true}
        useNativeAndroidPickerStyle={false}
        placeholder={{ label: 'Sắp xếp mặc định', value: '', key: 0 }}
        onValueChange={async value => await onSetValueSortType(value)}
        Icon={() => <AdjustIcon />}
        style={{
          placeholder: styles.inputContainer,
          iconContainer: Platform.OS === 'ios' ? styles.iconIOSContainer : styles.iconContainer,
          inputIOS: styles.inputIOSContainer,
          inputAndroid: styles.inputContainer,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: appColors.orange3,
    width: 190,
    paddingHorizontal: 12,
    borderRadius: 8,
    // height: 30,
  },
  inputContainer: {
    color: appColors.appSecondary,
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
  },
  inputIOSContainer: {
    color: appColors.appSecondary,
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
  },
  iconContainer: {
    top: '30%',
    marginLeft: 6,
  },
  iconIOSContainer: {
    top: 1,
  },
});
