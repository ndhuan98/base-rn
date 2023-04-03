import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import ChevronIconLeft from 'src/assets/svg-icons/chevron/ChevronIconLeft';
import { AppText } from 'src/components/AppText';
import { SearchIcon } from 'src/assets/svg-icons';
import { AppInput } from './AppInput';
import * as Animatable from 'react-native-animatable';
import { useAppState } from 'src/hooks/useAppState';
import { appColors } from 'src/utils/theme';

interface Props {
  title: string;
  isShowSearch?: boolean;
  titleColor?: keyof typeof appColors;
  wrapStyle?: StyleProp<ViewStyle>;
  handleGoBackCustom?: boolean;
  onGoBack?: () => void
}

export function AppScreenTitle({ title, isShowSearch, wrapStyle, titleColor = 'black',handleGoBackCustom,onGoBack }: Props) {
  const navigation = useNavigation();
  const [showSearch, setShowSearch] = useState(false);
  const { onSetValueSearch } = useAppState();
  const refTimeOut = useRef(0);

  const handleGoBack = async () => {
    if (showSearch) {
      setShowSearch(false);
      await onSetValueSearch('');
    } else {
      navigation.goBack();
    }
  };

  const onChangeText = async (value: string) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = 0;
    }
    refTimeOut.current = setTimeout(
      async stringValue => {
        await onSetValueSearch(stringValue);
      },
      200,
      value,
    );
  };

  return (
    <View style={[styles.main, wrapStyle]}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBackCustom ? onGoBack :handleGoBack}>
        <ChevronIconLeft width={7} height={12} color={appColors[titleColor]} />
      </TouchableOpacity>
      {showSearch ? (
        <Animatable.View useNativeDriver style={styles.animate} duration={600} animation="fadeInRight">
          <AppInput
            onChangeText={value => onChangeText(value)}
            renderIcon={() => <SearchIcon />}
            autoFocus
            placeHolder={'Tìm kiếm'}
          />
        </Animatable.View>
      ) : (
        <Animatable.View useNativeDriver style={styles.animateText} duration={600} animation="fadeInLeft">
          <AppText fontSize="xLarge" style={styles.title} color={titleColor}>
            {title}
          </AppText>
        </Animatable.View>
      )}
      {isShowSearch && !showSearch && (
        <TouchableOpacity onPress={() => setShowSearch(true)}>
          <SearchIcon />
        </TouchableOpacity>
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
  animate: { flex: 1, marginRight: 30, justifyContent: 'center' },
  animateText: { flex: 1, justifyContent: 'center' },
});
