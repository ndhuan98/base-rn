import React from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { AdjustIcon } from '../assets/svg-icons';
import { appColors } from '../utils/theme';
import { useAppState } from 'src/hooks/useAppState';
import RNPickerSelect from 'react-native-picker-select';

type Props = {
  wrapStyle?: StyleProp<ViewStyle>;
  title: string;
  options: any[];
};

export function AppFilterButton({ wrapStyle, title, options }: Props) {
  const { appSortType } = useAppState();

  return (
    <View style={[styles.main, Platform.OS === 'ios' && { height: 50 }, wrapStyle]}>
      <RNPickerSelect
        items={options}
        value={appSortType}
        fixAndroidTouchableBug={true}
        useNativeAndroidPickerStyle={false}
        placeholder={{ label: title, value: '', key: 0 }}
        onValueChange={async value => {}}
        // Icon={() => <AdjustIcon color={appColors.main} />}
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
    backgroundColor: appColors.white,
    width: 160,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  inputContainer: {
    color: appColors.main,
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
  },
  inputIOSContainer: {
    color: appColors.main,
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
