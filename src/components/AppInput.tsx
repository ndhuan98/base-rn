import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  KeyboardType,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { appColors, appFonts } from 'src/utils/theme';
import { AppText } from './AppText';

type Props = {
  value?: string;
  label?: string;
  placeHolder?: string;
  keyboardType?: KeyboardType;
  wrapperStyle?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  renderIcon?: () => React.ReactNode;
  labelUnit?:string;
  disabled?: boolean;
  required?: boolean;
  onChangeText?: (text: string) => void;
  inputStyle?: StyleProp<TextStyle>;
  autoFocus?: boolean;
} & TextInputProps;

export const AppInput: React.FC<Props> = ({
  value,
  label,
  wrapperStyle,
  inputStyle,
  placeHolder,
  keyboardType,
  secureTextEntry,
  renderIcon,
  labelUnit,
  disabled,
  required,
  onChangeText,
  autoFocus,
  ...props
}) => {
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
        <TextInput
          {...props}
          style={[styles.textInput, inputStyle]}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeHolder}
          keyboardType={keyboardType}
          placeholderTextColor={appColors.gray3}
          secureTextEntry={secureTextEntry}
          editable={!disabled}
          autoFocus={autoFocus}
        >
        </TextInput>
        
        {renderIcon && <View style={styles.backIcon}>{renderIcon()}</View>}
        {labelUnit && <View style={styles.backIcon}><AppText fontSize='small'>{labelUnit}</AppText></View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    ...appFonts.smallBase,
    height: 48,
    borderColor: appColors.gray4,
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: { marginBottom: 8, marginRight: 5 },
  error: { marginTop: 8, marginLeft: 10 },
  backIcon: { position: 'absolute', right: 16, top: 0, bottom: 0, justifyContent: 'center' },
  labelWrapper: { flexDirection: 'row' },
});
