import React, { useMemo } from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle, TextInputProps } from 'react-native';
import { appColors } from '../utils/theme';
import { useAppState } from 'src/hooks/useAppState';
import RNPickerSelect from 'react-native-picker-select';
import { useQuery } from '@tanstack/react-query';
import { getLaborLawTopic } from 'src/apis/advisoryTopic';
import { AdjustIcon } from 'src/assets/svg-icons';
import { AppText } from './AppText';

type Props = {
  wrapStyle?: StyleProp<ViewStyle>;
};

export function AppSortButtonTopic({ wrapStyle }: Props) {
  const { appSortType, onSetValueSortType } = useAppState();

  const { data } = useQuery(['LaborLawTopic'], () => getLaborLawTopic(), { refetchOnWindowFocus: false });

  const adviseTopicData = useMemo(
    () =>
      (data || []).map((item: any) => ({
        value: item?.id,
        label: item?.topic,
        key: item?.id,
      })),
    [data],
  );

  return (
    <View style={[styles.main, Platform.OS === 'ios' && { height: 40 }, wrapStyle]}>
      <RNPickerSelect
        items={adviseTopicData}
        value={appSortType}
        fixAndroidTouchableBug={true}
        useNativeAndroidPickerStyle={false}
        Icon={() => <AdjustIcon />}
        placeholder={{ label: 'Tìm kiếm theo chủ đề', value: '', key: 0 }}
        onValueChange={async value => await onSetValueSortType(value)}
        style={{
          placeholder: styles.inputContainer,
          iconContainer: Platform.OS === 'ios' ? styles.iconIOSContainer : styles.iconContainer,
          inputIOS: styles.inputIOSContainer,
          inputAndroid: styles.inputContainer,
        }}
        textInputProps={{ numberOfLines: 1 }}
        pickerProps={{ numberOfLines: 1 }}>
        {/* <AppText>{a</AppText> */}
      </RNPickerSelect>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    backgroundColor: appColors.orange2,
    width: 240,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  inputContainer: {
    color: appColors.appSecondary,
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: '500',
    width: 200,
  },
  inputIOSContainer: {
    color: appColors.appSecondary,
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: '500',
    width: 200,
  },
  iconContainer: {
    top: '35%',
    marginLeft: 6,
  },
  iconIOSContainer: {
    top: 1,
  },
});
