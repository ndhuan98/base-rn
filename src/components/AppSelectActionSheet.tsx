import React, { useMemo, useState } from 'react';
import { Picker } from 'react-native-actions-sheet-picker';
import { appColors } from 'src/utils/theme';

interface Props<T> {
  id: string;
  label: string;
  data: T[];
  searchField?: string;
  onSelectedItem: (value: T) => void;
  onSearch?: (keyword: string) => void;
  renderNoDataFound?: () => React.ReactElement;
}

export const AppSelectActionSheet = <T extends object>({
  id,
  data,
  label,
  searchField,
  onSelectedItem,
  onSearch,
  renderNoDataFound,
}: Props<T>) => {
  const [keyword, setKeyword] = useState('');

  const onHandleSearch = (text: string) => {
    setKeyword(text);
    onSearch && onSearch(text);
  };

  const filteredData = useMemo(() => {
    if (data?.length > 0 && searchField && !onSearch) {
      return data.filter((item: any) => {
        if (!keyword) {
          return true;
        }

        return item.name.toLocaleLowerCase('en').includes(keyword.toLocaleLowerCase('en'));
      });
    }

    return data;
  }, [data, keyword, onSearch, searchField]);

  const actionSheetProps = {
    onClose: () => {
      setKeyword('');
    },
  };

  return (
    <Picker<any>
      id={id}
      data={filteredData}
      inputValue={keyword}
      searchable={true}
      label={filteredData?.length === 0 ? '' : label}
      closeText="Đóng"
      placeholderText="Nhập từ khoá"
      placeholderTextColor={appColors.gray3}
      setSelected={onSelectedItem}
      onSearch={onHandleSearch}
      renderNoDataFound={renderNoDataFound}
      actionsSheetProps={actionSheetProps as any}
    />
  );
};
