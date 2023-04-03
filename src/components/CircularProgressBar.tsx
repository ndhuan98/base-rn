import Svg, { Circle, G } from 'react-native-svg';
import React from 'react';
import { Animated, Easing, StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native';
import { appColors } from 'src/utils/theme';
import { postServices } from 'src/helpers/postServices';

interface Props {
  percentage: number;
  wrapStyle?: StyleProp<ViewStyle>;
}
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const radius = 132;
const strokeWidth = 35;
const max = 100;

export const CircularProgressBar: React.FC<Props> = ({ percentage, wrapStyle }) => {
  const animated = React.useRef(new Animated.Value(0)).current;
  const circleRef: any = React.useRef();
  const inputRef: any = React.useRef();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const animation = (toValue: number) => {
    return Animated.timing(animated, {
      delay: 500,
      toValue,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  React.useEffect(() => {
    animation(percentage);
    animated.addListener(v => {
      const maxPer = (100 * v.value) / max;
      const strokeDashoffset = circumference - (circumference * maxPer) / 100;
      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          text: `${postServices.roundNumber(v.value)}%`,
        });
      }
      if (circleRef?.current) {
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      animated.removeAllListeners();
    };
  });

  return (
    <View style={[{ width: radius * 2, height: radius * 2 }, wrapStyle]}>
      <Svg height={radius * 2} width={radius * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle cx="50%" cy="50%" r={radius} fill="transparent" stroke={appColors.gray5} strokeWidth={strokeWidth} />
          <AnimatedCircle
            cx="50%"
            cy="50%"
            ref={circleRef}
            r={radius}
            fill="transparent"
            stroke={appColors.appSecondary}
            strokeWidth={strokeWidth}
            strokeDashoffset={circumference}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <AnimatedTextInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[StyleSheet.absoluteFillObject, styles.text]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'Cabin-Medium',
    color: appColors.gray1,
  },
});
