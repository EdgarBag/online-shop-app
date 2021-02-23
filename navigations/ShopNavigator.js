import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { createDrawerNavigator } from "react-navigation-drawer";

// screens
import ProductOverviewScreen from './../screens/shop/ProductsOverviewScreen'
import ProductDetailsScreen from './../screens/shop/ProductDetailsScreen'
import CartScreen from './../screens/shop/CartScreen'
import OrdersScreen from './../screens/shop/OrdersScreen'

//utils
import colors from './../utils/colors'
import { Ionicons } from '@expo/vector-icons';
import { Item } from 'react-navigation-header-buttons';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? colors.primary : 'white'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
    headerTitleStyle: 'caviar_d_bold',
    headerBackTitleStyle: 'caviar_d_italic'
};

const ProductsNavigator = createStackNavigator({
    ProductOverview: ProductOverviewScreen,
    ProductDetails: ProductDetailsScreen,
    Cart: CartScreen,
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
})

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator
}, {
    contentOptions: {
        activeTintColor: colors.primary
    }
})

export default createAppContainer(ShopNavigator)
