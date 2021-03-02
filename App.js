import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import ShopNavigator from './navigations/ShopNavigator'
import AppLoading from 'expo-app-loading'
import loadFonts from './utils/fontSetup'

// reducers
import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/orders';

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartReducer,
  orders: orderReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  LogBox.ignoreAllLogs()

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
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
