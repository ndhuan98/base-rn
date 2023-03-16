/**
 * Global App Config
 */

/* global __DEV__ */
import {Platform} from 'react-native';

export default {
  // App Details
  appName: 'E-Invoice Hoá đơn điện tử',

  // Build Configuration - eg. Debug or Release?
  DEV: __DEV__,

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: __DEV__ ? 'UA-84284256-2' : 'UA-84284256-1',

  // platform type: 1: IOS 2: Android
  platformType: Platform.OS === 'ios' ? 1 : 2,

  // from now on Einvoice v2 will be rewritten using React Native
  platformVersion: '2.0',

  // https://api-mobile.einvoice.com.vn/
  // URLs
  API_BASE_URL: {
    prod: 'https://api-mobile.einvoice.com.vn/',
    dev: 'https://api-mobile-test.einvoice.com.vn/',
  },

  // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
  GCM_SENDER_ID: '',

  Design_HEIGHT: 743,
  DESIGN_WIDTH: 414,
};
