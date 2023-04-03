import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleProp, StyleSheet, View, ViewStyle, Text, Platform } from 'react-native';
import { appColors, appFonts } from 'src/utils/theme';
import { AppText } from './AppText';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import CheckBox from '@react-native-community/checkbox';

interface Props {
  name: string;
  label?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
  renderIcon?: () => React.ReactNode;
  rules?: RegisterOptions;
  required?: boolean;
  disable?: boolean;
  title?: string;
  onStateChange?: (value: boolean) => void;
}

export const AppFormCheckBox: React.FC<Props> = ({
  name,
  label,
  wrapperStyle,
  renderIcon,
  rules,
  required,
  disable,
  title,
  onStateChange,
}) => {
  const { control, formState } = useFormContext();

  return (
    <View style={wrapperStyle}>
      {label && (
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
      )}
      <View>
        <Controller
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <View style={styles.row}>
              {Platform.OS == 'ios' ? (
                <View style={[styles.viewCheckbox, value ? styles.bgChecked : {}]}>
                  <CheckBox
                    value={value}
                    disabled={disable}
                    onValueChange={val => {
                      onChange(val);
                      if (onStateChange) {
                        onStateChange(val);
                      }
                    }}
                    boxType={'square'}
                    hideBox
                    style={[styles.checkbox]}
                    onCheckColor={appColors.white}
                  />
                </View>
              ) : (
                <CheckBox
                  onValueChange={val => {
                    onChange(val);
                    if (onStateChange) {
                      onStateChange(val);
                    }
                  }}
                  value={value}
                  disabled={disable}
                  tintColors={{ true: appColors.main, false: appColors.main }}
                  tintColor={appColors.main}
                  onCheckColor={appColors.main}
                  hideBox={true}
                  boxType="square"
                  // style={Platform.OS === 'ios' && { width: 40 }}
                />
              )}
              <Text style={styles.textStyle}>{title}</Text>
            </View>
          )}
          name={name}
        />
        {renderIcon && <View style={styles.backIcon}>{renderIcon()}</View>}
      </View>
      {formState.errors[name] && (
        <AppText color="red" fontSize="small" style={styles.error}>
          {formState.errors[name]?.message?.toString()}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    ...appFonts.smallBase,
    color: appColors.gray1,
    marginLeft: Platform.OS === 'ios' ? 10 : 0,
  },
  label: { marginBottom: 8 },
  labelWrapper: { flexDirection: 'row' },
  error: { marginTop: 8, marginLeft: 10 },
  backIcon: { position: 'absolute', right: 16, top: 0, bottom: 0, justifyContent: 'center' },
  viewCheckbox: {
    borderWidth: 1,
    height: 18,
    width: 18,
    borderRadius: 3,
    borderColor: appColors.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: { height: 16, width: 16 },
  bgChecked: { backgroundColor: appColors.main },
});
