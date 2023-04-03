/**
 * App Theme - Sizes
 */

import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

export default {
  // Window Dimensions
  screen: {
    height: screenHeight,
    width: screenWidth,
    widthHalf: screenWidth * 0.5,
    widthThird: screenWidth * 0.333,
    widthTwoThirds: screenWidth * 0.666,
    widthQuarter: screenWidth * 0.25,
    widthThreeQuarters: screenWidth * 0.75,
  },
  navbarHeight: Platform.OS === 'ios' ? 64 : 54,
  statusBarHeight: Platform.OS === 'ios' ? 16 : 0,
  tabbarHeight: 51,
  padding: 20,
  paddingMedium: 16,
  paddingSml: 10,
  paddingXSml: 8,
  paddingXXSml: 5,
  paddingXXXSml:2,
  margin: 16,
  marginSml: 10,
  marginXSml: 8,
  marginXXSml: 4,
  fontXXSmall: 8,
  fontXSmall: 10,
  fontSmall: 12,
  fontBase: 14,
  fontSearch: 15,
  fontMedium: 16,
  fontLarge: 18,
  imageSizeBase: 20,
  roundBorderRadius: 20,
  textInputWidth: '100%',
  textInputHeight: 40,
  borderWidth: 1,
  borderRadius: 6,
  borderSmall:4,
  listItemBaseHeight: 40,
  listItemMediumHeight: 50,
  buttonSizeBase: 40,
  buttonSizeSmall: 24,
  borderRadiusSmall: 12,
};
