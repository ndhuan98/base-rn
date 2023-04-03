import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { appColors, appFonts } from 'src/utils/theme';
import { AppText } from './AppText';
import { Controller, useFormContext } from 'react-hook-form';
import ChevronIconDown from 'src/assets/svg-icons/chevron/ChevronIconDown';

interface AppSelectProps {
  label?: string;
  defaultValue?: any;
  name: string;
  items: Item[];
  placeholder?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
  required?: boolean;
  numberOfLines?: number;
}

export const AppFormSelect: React.FC<AppSelectProps> = ({
  name,
  label,
  items,
  wrapperStyle,
  placeholder,
  required,
  defaultValue,
  numberOfLines,
}) => {
  const { control, formState } = useFormContext();

  return (
    <View style={wrapperStyle}>
      <View style={styles.labelWrapper}>
        <AppText fontSize="small" color="gray2" style={styles.label}>
          {label}
        </AppText>
        {required && (
          <AppText color="red" fontSize="small">
            *
          </AppText>
        )}
      </View>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <RNPickerSelect
            doneText={'Lưu'}
            items={items}
            value={value}
            fixAndroidTouchableBug={true}
            useNativeAndroidPickerStyle={false}
            placeholder={{ label: placeholder, value: defaultValue || null }}
            onValueChange={onChange}
            // Icon={() => <ChevronIconDown />}
            style={{
              viewContainer: styles.viewContainer,
              placeholder: styles.placeholder,
              iconContainer: styles.iconContainer,
              inputIOSContainer: styles.inputContainer,
              inputIOS: styles.inputTextIOS,
              inputAndroid: {
                color: 'black',
                borderWidth: 1,
                borderColor: appColors.gray4,
                borderRadius: 7,
                paddingHorizontal: 16,
                height: 48,
                fontFamily: 'Cabin-Medium',
              },
            }}
          />
        )}
      />
      {formState.errors[name] && (
        <AppText color="red" fontSize="extraSmall" style={styles.error} numberOfLines={numberOfLines}>
          {formState.errors[name]?.message?.toString()}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    borderColor: appColors.gray4,
    height: 48,
    borderWidth: 1,
    width: '100%',
    borderRadius: 7,
    ...appFonts.smallBase,
    justifyContent: 'center',
  },
  placeholder: {
    color: appColors.gray3,
  },
  inputContainer: {
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: appColors.white,
    borderColor: appColors.gray4,
    borderRadius: 5,
    borderWidth: 0.2,
  },
  iconContainer: {
    marginRight: 16,
    top: '50%',
  },
  inputTextIOS: {
    ...appFonts.base,
    color: 'black',
  },
  label: { marginBottom: 8, marginRight: 5 },
  labelWrapper: { flexDirection: 'row' },
  error: { marginTop: 5, marginLeft: 10 },
});
