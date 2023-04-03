import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleProp, StyleSheet, TextInput, View, ViewStyle, KeyboardType, TouchableOpacity } from 'react-native';
import { appColors, appFonts } from 'src/utils/theme';
import { AppText } from './AppText';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import EyeIcon from 'src/assets/svg-icons/EyeIcon';
import EyeIconOff from '../assets/svg-icons/EyeIconOff';

interface Props {
  name: string;
  label?: string;
  placeHolder?: string;
  keyboardType?: KeyboardType;
  wrapperStyle?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  rules?: RegisterOptions;
  required?: boolean;
}

export const AppFormPasswordInput: React.FC<Props> = ({ name, label, wrapperStyle, placeHolder, rules, required }) => {
  const { control, formState } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

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
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={onChange}
              maxLength={255}
              value={value}
              placeholder={placeHolder}
              placeholderTextColor={appColors.gray3}
              secureTextEntry={!showPassword}
            />
          )}
          name={name}
        />
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => {
            setShowPassword(!showPassword);
          }}>
          {showPassword ? <EyeIcon /> : <EyeIconOff />}
        </TouchableOpacity>
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
    paddingHorizontal: 16,
    ...appFonts.smallBase,
  },
  label: { marginBottom: 8, marginRight: 5 },
  error: { marginTop: 8, marginLeft: 10 },
  backIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 100,
    width: '12%',
    alignItems: 'center',
  },
  labelWrapper: { flexDirection: 'row' },
});
