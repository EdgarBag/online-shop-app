import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { LogBox } from 'react-native';
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
import authReducer from './store/reducers/auth'

const rootReducer = combineReducers({
  products: productsReducer,
  carts: cartReducer,
  orders: orderReducer,
  auth: authReducer
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
