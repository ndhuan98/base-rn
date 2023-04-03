import React from 'react';
import { AppText } from './AppText';
import { Linking, StyleSheet, View } from 'react-native';

export const AppHotlineText: React.FC = React.memo(() => {
  const onCallSupport = async () => {
    await Linking.openURL('tel: 0977651884');
  };

  return (
    <View style={styles.contactInfo}>
      <AppText fontSize="medium" style={{ textAlign: 'center' }}>
        Bạn cũng có thể liên hệ ngay với chúng tôi thông qua {'\n'}hotline:
        <AppText color="main" fontSize="large" onPress={onCallSupport}>
          {' '}
          097 765 1884
        </AppText>
      </AppText>
    </View>
  );
});

const styles = StyleSheet.create({
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
});
