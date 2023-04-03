import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleProp, StyleSheet, View, ViewStyle, KeyboardType, TouchableOpacity } from 'react-native';
import { appColors, appFonts } from 'src/utils/theme';
import { AppText } from './AppText';

interface Props {
  name: string;
  label: string;
  disabled?: boolean;
  placeHolder?: string;
  keyboardType?: KeyboardType;
  wrapperStyle?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  required?: boolean;
  onPress: () => void;
  renderIcon?: () => React.ReactNode;
}

export const AppFormTouchableOpacityInput: React.FC<Props> = ({
  name,
  label,
  disabled,
  placeHolder,
  wrapperStyle,
  required,
  onPress,
  renderIcon,
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
      <TouchableOpacity disabled={disabled} onPress={onPress}>
        <Controller
          control={control}
          render={({ field: { value } }) => (
            <View style={[styles.textInput, disabled ? styles.disabled : {}]}>
              <AppText style={{ color: value ? appColors.black : appColors.gray3 }}>
                {value ? value : placeHolder}
              </AppText>
            </View>
          )}
          name={name}
        />
        {renderIcon && <View style={styles.backIcon}>{renderIcon()}</View>}
      </TouchableOpacity>
      {formState.errors[name] && (
        <AppText color="red" fontSize="extraSmall" style={styles.error}>
          {formState.errors[name]?.message?.toString()}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 48,
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: appColors.gray4,
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 16,
    ...appFonts.smallBase
  },
  label: { marginBottom: 8, marginRight: 5 },
  error: { marginTop: 5, marginLeft: 10 },
  backIcon: { position: 'absolute', right: 16, top: 0, bottom: 0, justifyContent: 'center' },
  labelWrapper: { flexDirection: 'row' },
  disabled: { backgroundColor: appColors.gray6 },
});
