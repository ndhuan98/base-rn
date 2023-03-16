import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {AppStyles, AppColors, AppSizes} from '../theme';

// Khai báo
//<LaberColor title={'Miền Bắc '} value={'19004767'} />

const LaberColor = ({title, value, color, valueCall}) => {
  const colors = color ? color : styles.colorTitle;
  const handlePress = React.useCallback(async () => {
    const url = `tel:${valueCall}`;
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text style={colors}>{title}</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text style={{...AppStyles.boldText, color: AppColors.orange}}>
          {value}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  colorTitle: {
    ...AppStyles.baseText,
    paddingTop: AppSizes.marginXXSml,
    color: AppColors.gray,
  },
});

export default LaberColor;
