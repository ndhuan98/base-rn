/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import AppRouter from '@navigation';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn:
    'https://750b760f958246c7ae87e973e8f89963@o1144384.ingest.sentry.io/6270243',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default Sentry.wrap(App);
