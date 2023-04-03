import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { appColors } from 'src/utils/theme';
import { AppText } from './AppText';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { postServices } from '../helpers/postServices';

interface Props {
  percentage: number;
  wrapStyle?: StyleProp<ViewStyle>;
}

export const LineProgressBar: React.FC<Props> = ({ percentage, wrapStyle }) => {
  const barWidth = useRef(new Animated.Value(0)).current;
  const finalWidth = (percentage * (ScreenWidth - 64)) / 100;

  useEffect(() => {
    Animated.timing(barWidth, {
      delay: 200,
      toValue: finalWidth,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
    }).start();
  });

  return (
    <View style={[styles.container, wrapStyle]}>
      {percentage > 0 ? (
        <Animated.View
          style={{
            width: barWidth,
            height: '100%',
            backgroundColor: appColors.main,
            borderRadius: 60,
            justifyContent: 'center',
          }}>
          <AppText style={{ textAlign: 'right', marginRight: 7 }} color="white">
            {postServices.roundNumber(percentage)}%
          </AppText>
        </Animated.View>
      ) : (
        <AppText style={{ textAlign: 'center', marginRight: 7 }} color="white">
          {postServices.roundNumber(percentage)}%
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 30,
    backgroundColor: appColors.gray5,
    borderRadius: 60,
  },
});
