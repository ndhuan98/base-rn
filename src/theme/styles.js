/**
 * App Styles
 */
import Colors from './colors';
import Fonts from './fonts';
import Sizes from './sizes';

const appStylesBase = {
  // Give me padding
  marginSml: {
    margin: Sizes.marginSml,
  },
  marginHorizontalSml: {
    marginLeft: Sizes.marginSml,
    marginRight: Sizes.marginSml,
  },
  marginLeftSml: {
    marginLeft: Sizes.marginSml,
  },
  marginRightSml: {
    marginRight: Sizes.marginSml,
  },
  marginVerticalSml: {
    marginTop: Sizes.marginSml,
    marginBottom: Sizes.marginSml,
  },
  marginTopSml: {
    marginTop: Sizes.marginSml,
  },
  marginBottomSml: {
    marginBottom: Sizes.marginSml,
  },
  borderBase: {
    borderColor: Colors.border,
    borderWidth: Sizes.borderWidth,
    borderRadius: Sizes.borderRadius,
  },
};

export default {
  // Import app styles base
  ...appStylesBase,
  appContainer: {
    backgroundColor: '#fff',
    height: '100%',
  },
  // Default
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.background,
  },

  // Text Styles
  baseText: {
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size,
    lineHeight: Fonts.base.lineHeight,
    color: Colors.textPrimary,
  },
  smallText: {
    fontFamily: Fonts.smallBase.family,
    fontSize: Fonts.smallBase.size,
    lineHeight: Fonts.smallBase.lineHeight,
    color: Colors.textPrimary,
  },

  boldItalicText: {
    fontFamily: Fonts.boldItalic.family,
    fontSize: Fonts.base.size,
    lineHeight: Fonts.base.lineHeight,
    color: Colors.textPrimary,
  },

  italicText: {
    fontFamily: Fonts.italic.family,
    fontSize: Fonts.base.size,
    lineHeight: Fonts.base.lineHeight,
    color: Colors.textPrimary,
  },

  semiboldText: {
    fontFamily: Fonts.semibold.family,
    fontSize: Fonts.semibold.size,
    lineHeight: Fonts.semibold.lineHeight,
    color: Colors.textPrimary,
  },

  boldText: {
    fontSize: Fonts.bold.size,
    lineHeight: Fonts.bold.lineHeight,
    color: Colors.textPrimary,
    fontFamily: Fonts.bold.family,
  },

  hintText: {
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size,
    lineHeight: Fonts.base.lineHeight,
    color: Colors.textSecondary,
  },
  secondaryText: {
    fontFamily: Fonts.base.family,
    fontSize: Fonts.base.size,
    lineHeight: Fonts.base.lineHeight,
    color: Colors.gray,
  },
  lightText: {
    fontFamily: Fonts.light.family,
    fontSize: Fonts.light.size,
    lineHeight: Fonts.light.lineHeight,
    color: Colors.gray,
  },
  strong: {
    fontWeight: '900',
  },
  flex1: {
    flex: 1,
  },
  styleSafeArea: {
    flex: 1,
    backgroundColor: Colors.blue,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
    elevation: 1
  },
  baseDialog: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.backgroundDialog,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
