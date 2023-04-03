import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import ChevronIconLeft from 'src/assets/svg-icons/chevron/ChevronIconLeft';
import { AppText } from 'src/components/AppText';
import { MessageIcon, SearchIcon } from 'src/assets/svg-icons';
import { AppInput } from './AppInput';
import * as Animatable from 'react-native-animatable';
import { useAppState } from 'src/hooks/useAppState';
import { appColors } from 'src/utils/theme';
import { useMessageState } from 'src/hooks/useMessageState';

interface Props {
  title: string;
  titleColor?: keyof typeof appColors;
  wrapStyle?: StyleProp<ViewStyle>;
  isShowMessage?: boolean;
}

export function AppScreenTitleChat({ title, isShowMessage, wrapStyle, titleColor = 'black' }: Props) {
  const navigation = useNavigation();
  const { onAddInitDataMessage } = useMessageState();
  const { onSetValueSortType } = useAppState();

  const handleGoBack = async () => {
    await onAddInitDataMessage([]);
    await onSetValueSortType('');
    navigation.goBack();
  };

  return (
    <View style={[styles.main, wrapStyle]}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <ChevronIconLeft width={7} height={12} color={appColors[titleColor]} />
      </TouchableOpacity>

      <Animatable.View useNativeDriver style={styles.animateText} duration={600} animation="fadeInLeft">
        <AppText fontSize="xLarge" style={styles.title} color={titleColor}>
          {title}
        </AppText>
      </Animatable.View>
      {isShowMessage ? (
        <TouchableOpacity onPress={handleGoBack}>
          <MessageIcon />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: appColors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    marginLeft: 0,
    paddingLeft: 10,
    zIndex: 50,
    width: '10%',
    height: 30,
    justifyContent: 'center',
  },
  title: { fontWeight: '500', width: '90%' },
  animateText: { flex: 1, justifyContent: 'center' },
});
