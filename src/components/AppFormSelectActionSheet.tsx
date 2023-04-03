import React from 'react';
import { AppSelectActionSheet } from './AppSelectActionSheet';
import { ChevronIconDown } from 'src/assets/svg-icons';
import { onOpen } from 'react-native-actions-sheet-picker';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { appColors, appFonts } from 'src/utils/theme';
import { AppText } from './AppText';
import { Controller, useFormContext } from 'react-hook-form';
import { AppEmptyText } from './AppEmptyText';

interface Props<T> {
  label?: string;
  name: string;
  placeHolder?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
  required?: boolean;
  disabled?: boolean;
  actionSheetProps: {
    id: string;
    label: string;
    data: T[];
    searchField?: string;
    onSelectedItem?: (value: T) => void;
    onSearch?: (keyword: string) => void;
    renderNoDataFound?: () => React.ReactElement;
  };
}

export const AppFormSelectActionSheet = <T extends object>({
  label,
  name,
  placeHolder,
  wrapperStyle,
  required,
  disabled,
  actionSheetProps,
}: Props<T>) => {
  const inputName = `${name}Name`;
  const { control, formState, setValue, watch } = useFormContext();
  const inputValue = watch(inputName);
  const inlineStyles = { color: inputValue ? appColors.black : appColors.gray3, paddingRight: 15 };

  return (
    <>
      <View style={wrapperStyle}>
        <View style={styles.labelWrapper}>
          {label && (
            <>
              <AppText numberOfLines={1} fontSize="small" color="gray2" style={styles.label}>
                {label}
              </AppText>
              {required && (
                <AppText color="red" fontSize="small">
                  *
                </AppText>
              )}
            </>
          )}
        </View>
        <TouchableOpacity disabled={disabled} onPress={() => onOpen(actionSheetProps.id)}>
          <View style={[styles.textInput, disabled ? styles.disabled : {}]}>
            <AppText style={inlineStyles} numberOfLines={1}>
              {inputValue ? inputValue : placeHolder}
            </AppText>
            <ChevronIconDown style={styles.backIcon} />
          </View>
        </TouchableOpacity>
        {formState.errors[name] && (
          <AppText color="red" fontSize="extraSmall" style={styles.error}>
            {formState.errors[name]?.message?.toString()}
          </AppText>
        )}
      </View>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <AppSelectActionSheet
            renderNoDataFound={() => <AppEmptyText />}
            {...actionSheetProps}
            onSelectedItem={(selectedItem: any) => {
              onChange(selectedItem?.code);
              setValue(inputName, selectedItem?.name);
              !!actionSheetProps.onSelectedItem && actionSheetProps.onSelectedItem(selectedItem);
            }}
          />
        )}
      />
    </>
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
    ...appFonts.smallBase,
    backgroundColor: appColors.white,
    width: '100%',
  },
  label: { marginBottom: 8, marginRight: 5 },
  labelWrapper: { flexDirection: 'row' },
  backIcon: { position: 'absolute', right: 16, top: '50%' },
  error: { marginTop: 5, marginLeft: 10 },
  disabled: { backgroundColor: appColors.gray6 },
});
