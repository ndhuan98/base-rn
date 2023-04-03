import React, { useState } from 'react';
import DateTimePickerModal, { ReactNativeModalDateTimePickerProps } from 'react-native-modal-datetime-picker';
import moment from 'moment';

type Props = {
  value?: string;
  format?: string;
} & ReactNativeModalDateTimePickerProps;

export const AppDateTimePicker: React.FC<Props> = props => {
  const [date, setDate] = useState<any>(null);
  const defaultValue = props.value ? moment(props.value, props.format || 'DD/MM/YYYY').toDate() : null;
  const displayDate = date || defaultValue || moment().toDate();

  return (
    <DateTimePickerModal
      {...props}
      date={displayDate}
      onConfirm={(selectedDate: Date) => {
        props?.onConfirm?.(selectedDate);
        setDate(selectedDate);
      }}
    />
  );
};
