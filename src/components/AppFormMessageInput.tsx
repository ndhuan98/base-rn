import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleProp, StyleSheet, TextInput, View, ViewStyle, KeyboardType, TextStyle } from 'react-native';
import { appColors, appFonts } from 'src/utils/theme';
import { AppText } from './AppText';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

interface Props {
  name: string;
  label?: string;
  placeHolder?: string;
  keyboardType?: KeyboardType;
  wrapperStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  secureTextEntry?: boolean;
  renderIcon?: () => React.ReactNode;
  rules?: RegisterOptions;
  disabled?: boolean;
  required?: boolean;
  multiLine?: boolean;
}

export const AppFormMessageInput: React.FC<Props> = ({
  name,
  label,
  wrapperStyle,
  placeHolder,
  keyboardType,
  secureTextEntry,
  renderIcon,
  disabled,
  rules,
  required,
  inputStyle,
  multiLine,
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
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.textInput, inputStyle]}
              // style={[styles.textInput, formState.errors[name] && { borderColor: appColors.red }]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeHolder}
              keyboardType={keyboardType}
              placeholderTextColor={appColors.gray3}
              secureTextEntry={secureTextEntry}
              editable={!disabled}
              multiline={multiLine}
            />
          )}
          name={name}
        />
        {renderIcon && <View style={styles.backIcon}>{renderIcon()}</View>}
      </View>
      {/* {formState.errors[name] && (
        <AppText color="red" fontSize="small" style={styles.error}>
          {formState.errors[name]?.message?.toString().trim()}
        </AppText>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 48,
    ...appFonts.smallBase,
    marginLeft: 10,
    justifyContent: 'center',
  },
  label: {
    marginBottom: 8,
    marginRight: 5,
  },
  error: {
    marginTop: 8,
    marginLeft: 10,
  },
  backIcon: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  labelWrapper: {
    flexDirection: 'row',
  },
});
