import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, FlatListProps, StyleProp, View, ViewStyle } from 'react-native';
import axiosIns from 'src/helpers/axiosInterceptor';
import { ActivityIndicator } from 'react-native-paper';
import { appColors } from 'src/utils/theme';
import { combineUrlParams } from 'src/utils/common';
import { AppEmptyText } from './AppEmptyText';
import { debounce } from 'lodash';

type Props = {
  wrapStyle?: StyleProp<ViewStyle>;
  total: number | 0;
  onSetList: (arr: any[]) => void;
  endPointAPI: string;
  params?: any;
  showsVerticalScrollIndicator?: boolean;
} & FlatListProps<any>;

export function AppFlatList(props: Props) {
  const limit = 10;
  const [page, setPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const ListFooterComponent = () => {
    return (loadingMore && <ActivityIndicator color={appColors.main} size={'small'} />) || <View />;
  };

  const onEndReached = async () => {
    if (props.data?.length && props.data.length < props.total) {
      setLoadingMore(false);
      const response: any = await axiosIns.get(
        combineUrlParams(props.endPointAPI, {
          limit,
          page,
          ...props.params,
        }),
      );

      setLoadingMore(false);
      if (response.data.data?.result) {
        let newArr = props.data.concat(response.data.data?.result);

        props.onSetList([...newArr]);
        setPage(page + 1);
      }
      setLoadingMore(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOnEndReached = useCallback(
    debounce(() => onEndReached(), 500),
    [],
  );

  return (
    <FlatList
      {...props}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={onEndReached}
      ListFooterComponent={ListFooterComponent}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={props.showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={() => <AppEmptyText />}
    />
  );
}
