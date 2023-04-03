import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useGetProvince } from 'src/hooks/useGetProvinces';
import { AppFormSelectActionSheet } from './AppFormSelectActionSheet';

interface Props {
  wrapperStyle?: StyleProp<ViewStyle>;
  required?: boolean;
  label?: string;
  name?: string;
  onSelectedItem?: (item: any) => void;
}

export const ProvinceSelectActionSheet: React.FC<Props> = ({ name, wrapperStyle, required, label, onSelectedItem }) => {
  const { provinces } = useGetProvince();

  return (
    <AppFormSelectActionSheet
      required={required}
      wrapperStyle={wrapperStyle}
      label={label}
      name={name || 'hometown'}
      placeHolder="Chọn tỉnh/thành phố"
      actionSheetProps={{
        id: name || 'hometown',
        data: provinces,
        searchField: 'name',
        label: 'Chọn tỉnh/thành phố',
        onSelectedItem: item => {
          onSelectedItem?.(item);
        },
      }}
    />
  );
};
