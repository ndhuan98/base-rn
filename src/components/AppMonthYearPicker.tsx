import moment from 'moment';
import React, { useState } from 'react';
import MonthPicker, { MonthPickerProps } from 'react-native-month-year-picker';

type Props = {
  value?: Date;
  visible: boolean;
  onClosePicker: () => void;
  onSelect: (value: Date) => void;
} & Omit<MonthPickerProps, 'value'>;

export const AppMonthYearPicker: React.FC<Props> = props => {
  const { visible, onClosePicker, onSelect } = props;
  const defaultValue = props.value ? moment(props.value, 'MM/YYYY').toDate() : new Date();
  const [value, setValue] = useState(defaultValue);

  const onValueChange = (_: any, newDate: Date) => {
    const selectedDate = newDate || value;
    onClosePicker();

    setValue(selectedDate);
    onSelect(selectedDate);
  };

  if (!visible) {
    return null;
  }

  return (
    <MonthPicker {...props} value={value} locale="vi" okButton={'Lưu'} cancelButton={'Huỷ'} onChange={onValueChange} />
  );
};
