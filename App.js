import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import ShopNavigator from './navigations/ShopNavigator'
import AppLoading from 'expo-app-loading'
import loadFonts from './utils/fontSetup'
import { composeWithDevTools } from 'redux-devtools-extension'

// reducers
import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/orders';

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartReducer,
  orders: orderReducer
});

const store = createStore(rootReducer, composeWithDevTools())

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (<AppLoading
      startAsync={loadFonts}
      onFinish={() => setFontLoaded(true)}
      onError={() => console.log('App Loading error!')}
    />)
  }

  return (
    <Provider store={store}>
      <ShopNavigator />

      {/* <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
