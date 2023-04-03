import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleProp, StyleSheet, TextInput, View, ViewStyle, KeyboardType, TouchableOpacity } from 'react-native';
import { appColors, appFonts } from 'src/utils/theme';
import { AppText } from './AppText';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import moment from 'moment/moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface Props {
  name: string;
  label?: string;
  placeHolder?: string;
  keyboardType?: KeyboardType;
  wrapperStyle?: StyleProp<ViewStyle>;
  secureTextEntry?: boolean;
  renderIcon?: () => React.ReactNode;
  rules?: RegisterOptions;
  disabled?: boolean;
  required?: boolean;
}

export const AppFormInputDatePicker: React.FC<Props> = ({
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
}) => {
  const { control, formState } = useFormContext();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
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
            <>
              <TextInput
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={placeHolder}
                keyboardType={keyboardType}
                placeholderTextColor={appColors.gray3}
                secureTextEntry={secureTextEntry}
                editable={!disabled}
              />
              <DateTimePickerModal
                locale={'vi-VN'}
                confirmTextIOS={'Lưu'}
                cancelTextIOS={'Huỷ'}
                isVisible={modalVisible}
                date={value !== '' ? moment(value, 'DD/MM/YYYY').toDate() : moment().toDate()}
                onConfirm={(selectedDate: Date) => {
                  onChange(moment(selectedDate).format('DD/MM/YYYY'));
                  setModalVisible(false);
                }}
                onCancel={() => setModalVisible(false)}
              />
            </>
          )}
          name={name}
        />
        {renderIcon && (
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.backIcon}>
            {renderIcon()}
          </TouchableOpacity>
        )}
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
    ...appFonts.smallBase,
    height: 48,
    borderColor: appColors.gray4,
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 16,
  },
  label: { marginBottom: 8, marginRight: 5 },
  error: { marginTop: 8, marginLeft: 10 },
  backIcon: { position: 'absolute', right: 16, top: 0, bottom: 0, justifyContent: 'center' },
  labelWrapper: { flexDirection: 'row' },
});
