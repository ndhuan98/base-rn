/**
 * App Theme - Fonts
 */
import {Platform, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

function lineHeight(fontSize) {
  const multiplier = fontSize > 20 ? 0.1 : 0.33;
  return parseInt(fontSize + fontSize * multiplier, 10);
}

const base = {
  size: 14,
  lineHeight: lineHeight(14),
  ...Platform.select({
    ios: {
      family: 'SanFranciscoDisplay-Regular',
    },
    android: {
      family: 'Roboto-Regular',
    },
  }),
};

const smallBase = {
  size: 12,
  lineHeight: lineHeight(15),
  ...Platform.select({
    ios: {
      family: 'SanFranciscoDisplay-Regular',
    },
    android: {
      family: 'Roboto-Regular',
    },
  }),
};

const semibold = {
  size: 14,
  lineHeight: lineHeight(14),
  ...Platform.select({
    ios: {
      family: 'SanFranciscoDisplay-Bold',
    },
    android: {
      family: 'Roboto-Bold',
    },
  }),
};

const boldItalic = {
  size: 14,
  lineHeight: lineHeight(14),
  ...Platform.select({
    ios: {
      family: 'SanFranciscoDisplay-Bold',
    },
    android: {
      family: 'Roboto-Bold',
    },
  }),
};

const italic = {
  size: 14,
  lineHeight: lineHeight(14),
  ...Platform.select({
    ios: {
      family: 'SanFranciscoDisplay-Semibold',
    },
    android: {
      family: 'Roboto-Italic',
    },
  }),
};

const bold = {
  size: 16,
  lineHeight: lineHeight(19),
  ...Platform.select({
    ios: {
      family: 'SanFranciscoDisplay-Bold',
    },
    android: {
      family: 'Roboto-Bold',
    },
  }),
};

const black = {
  size: 14,
  lineHeight: lineHeight(14),
  ...Platform.select({
    ios: {
      family: 'SanFranciscoDisplay-Black',
    },
    android: {
      family: 'Roboto-Black',
    },
  }),
};

const light = {
  size: 14,
  lineHeight: lineHeight(14),
  ...Platform.select({
    ios: {
      family: 'SanFranciscoDisplay-Light',
    },
    android: {
      family: 'Roboto-Light',
    },
  }),
};

export default {
  base: {...base},
  bold: {...bold},
  semibold: {...semibold},
  italic: {...italic},
  boldItalic: {...boldItalic},
  black: {...black},
  light: {...light},
  smallBase: {...smallBase},
  h1: {
    ...bold,
    size: base.size * 1.75,
    lineHeight: lineHeight(base.size * 2),
  },
  h2: {
    ...bold,
    size: base.size * 1.5,
    lineHeight: lineHeight(base.size * 1.75),
  },
  h3: {
    ...semibold,
    size: base.size * 1.25,
    lineHeight: lineHeight(base.size * 1.5),
  },
  h4: {
    ...base,
    size: base.size * 1.1,
    lineHeight: lineHeight(base.size * 1.25),
  },
  h5: {...base},
  lineHeight: fontSize => lineHeight(fontSize),
};
