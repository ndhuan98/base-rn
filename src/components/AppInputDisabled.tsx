import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { appColors, appFonts } from 'src/utils/theme';
import { AppText } from './AppText';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

interface Props {
  name: string;
  label?: string;
  placeHolder?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
  renderIcon?: () => React.ReactNode;
  rules?: RegisterOptions;
  required?: boolean;
}

export const AppInputDisabled: React.FC<Props> = ({
  name,
  label,
  wrapperStyle,
  placeHolder,
  renderIcon,
  rules,
  required,
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
          render={({ field: { value } }) => (
            <View style={styles.textInput}>
              <AppText numberOfLines={1} color={value ? 'black' : 'gray3'}>
                {value ? value : placeHolder}
              </AppText>
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
  textInput: {
    height: 48,
    borderColor: appColors.gray4,
    borderWidth: 1,
    borderRadius: 7,
    justifyContent: 'center',
    paddingHorizontal: 16,
    ...appFonts.smallBase,
    backgroundColor: appColors.gray6,
  },
  label: { marginBottom: 8, marginRight: 5 },
  error: { marginTop: 8, marginLeft: 10 },
  backIcon: { position: 'absolute', right: 16, top: 0, bottom: 0, justifyContent: 'center' },
  labelWrapper: { flexDirection: 'row' },
});
