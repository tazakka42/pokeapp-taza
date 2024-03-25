import * as React from 'react';
import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import App from './App';
import {NativeBaseProvider} from 'native-base';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Main() {
  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
