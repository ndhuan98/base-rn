import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { logout } from 'src/features/app/slice';
import { useGetCompany } from 'src/hooks/useGetCompany';
import { AppFormSelectActionSheet } from './AppFormSelectActionSheet';
import { AppFormSelectCompanySheet } from './AppFormSelectCompanySheet';

interface Props {
  id?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
  required?: boolean;
  label?: string;
  placeHolder?: string;
  disabled?: boolean;
  onSelectedItem?: (item: any) => void;
  renderNoDataFound?: () => React.ReactElement;
}

export const CompanySelectActionSheet: React.FC<Props> = ({
  id,
  wrapperStyle,
  disabled,
  label,
  required,
  placeHolder,
  onSelectedItem,
  renderNoDataFound,
}) => {
  // console.log('companyOptions', companyOptions);

  return (
    <AppFormSelectCompanySheet
      disabled={disabled}
      required={required}
      wrapperStyle={wrapperStyle}
      label={label || 'Công ty làm việc'}
      name="company"
      placeHolder={placeHolder || 'Chọn công ty'}
      actionSheetProps={{
        id: id || 'company',
        data: [],
        searchField: 'name',
        label: 'Chọn công ty',
        onSelectedItem: item => {
          onSelectedItem?.(item);
        },
        renderNoDataFound,
      }}
    />
  );
};
