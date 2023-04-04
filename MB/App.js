import React from 'react';
import {StyleSheet} from 'react-native';

import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PersistGate} from 'redux-persist/integration/react';

import {persistor, store} from '@src/redux/store';
import Main from '@src/navigatons/Main';
import {
  BookAudioContainerScreen,
  BookDetailScreen,
  BookPlayAudioScreen,
  BookReaderScreen,
  BooksCategoryScreen,
} from '@src/screens/Book';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
const Stack = createNativeStackNavigator();

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: '#32cb00'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 18,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: 'bold',
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 18,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: 'bold',
      }}
    />
  ),
};
const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Tabs"
                component={Main}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Book Detail"
                component={BookDetailScreen}
              />
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Book Reader"
                component={BookReaderScreen}
              />

              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Books Category"
                component={BooksCategoryScreen}
              />

              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Book Audio"
                component={BookAudioContainerScreen}
              />

              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="Book Play"
                component={BookPlayAudioScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
      <Toast config={toastConfig} />
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
