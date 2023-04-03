import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from 'src/navigator/root';
import { Provider } from 'react-redux';
import { store } from 'src/stores/config-store';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
// import { toastConfig } from 'src/toastConfig';
import { navigationRef } from 'src/navigator/RootNavigation';
import SplashScreen from 'react-native-splash-screen';
import notifee, { EventType } from '@notifee/react-native';
import StatusBarTSD from 'src/components/StatusBarTSD';

// const queryClient = new QueryClient();

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  });

  // React.useEffect(() => {
  //   return notifee.onForegroundEvent(({ type, detail }) => {
  //     switch (type) {
  //       case EventType.DISMISSED:
  //         console.log('User dismissed notification', detail.notification);
  //         break;
  //       case EventType.PRESS:
  //         console.log('User pressed notification', detail.notification);
  //         console.log('detail', detail);
  //         break;
  //     }
  //   });
  // }, []);

  return (
    <SafeAreaProvider>
      <StatusBarTSD />
      <NavigationContainer ref={navigationRef}>
        {/* <QueryClientProvider client={queryClient}> */}
          <Provider store={store}>
            <RootNavigator />
          </Provider>
        {/* </QueryClientProvider> */}
      </NavigationContainer>
      {/* <Toast config={toastConfig} /> */}
    </SafeAreaProvider>
  );
}
