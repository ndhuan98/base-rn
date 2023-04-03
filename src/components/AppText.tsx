import React from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { appColors, appFonts } from 'src/utils/theme';

export type AppTextProps = {
  fontSize?: string;
  color?: keyof typeof appColors;
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;
} & TextProps;

export const AppText: React.FC<AppTextProps> = ({
  // fontSize = 'medium',
  color = 'gray1',
  fontWeight = '400',
  children,
  
  ...props
}) => {
  // const lineHeight = appFontSize[fontSize] + 6;
  const customStyle = {
    color: appColors[color],
    fontWeight,
    marginBottom: 4,
    ...appFonts.base,

  };
  const style = StyleSheet.flatten([customStyle as StyleProp<TextStyle>, props.style]);

  return (
    <Text {...props} style={style}>
      {children}
    </Text>
  );
};
