import { StyleProp, StyleSheet, View, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import React from 'react';
import { AppText } from './AppText';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { appColors } from 'src/utils/theme';

type AppButtonProps = {
  title?: string | null;
  color?: keyof typeof appColors;
  wrapperStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  variant?: 'outline' | 'main';
  renderIcon?: () => React.ReactNode;
} & TouchableOpacityProps;

export const AppButton: React.FC<AppButtonProps> = React.memo(
  ({ title, wrapperStyle, color = 'main', buttonStyle, variant = 'main', renderIcon, ...props }) => {
    return (
      <View style={wrapperStyle}>
        <TouchableOpacity
          {...props}
          style={[
            styles.button,
            {
              backgroundColor: variant === 'outline' ? appColors.white : appColors[color],
            },
            props.disabled && { backgroundColor: appColors.gray1 },
            buttonStyle,
          ]}>
          {renderIcon && <View style={styles.icon}>{renderIcon()}</View>}
          <AppText fontSize="medium" color={variant === 'outline' ? 'main' : 'white'}>
            {title}
          </AppText>
        </TouchableOpacity>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    minHeight: (ScreenWidth * 0.4) / 3.5,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: appColors.main,
    flexDirection: 'row',
  },
  icon: { marginRight: 8 },
});
