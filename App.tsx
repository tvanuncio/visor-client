/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './AppNavigator';
import { Provider } from 'react-redux';
import { store } from './store/store'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    accent: 'yellow',
  },
};

function App(): React.JSX.Element {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
       <PaperProvider theme={theme}>
          <Provider store={store}>
                <AppNavigator />
          </Provider>
        </PaperProvider>
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(appName, () => App);

export default App;
