import { StyleSheet, View } from 'react-native';
import React from 'react';
import { AppText } from './AppText';

export const AppEmptyText: React.FC = React.memo(() => {
  return (
    <View style={styles.main}>
      <AppText color="gray3">Không có dữ liệu</AppText>
    </View>
  );
});

const styles = StyleSheet.create({
  main: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
