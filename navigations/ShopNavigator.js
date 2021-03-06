import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { createDrawerNavigator } from "react-navigation-drawer";
// import { createDrawerNavigator } from '@react-navigation/drawer'

// screens
import ProductOverviewScreen from './../screens/shop/ProductsOverviewScreen'
import ProductDetailsScreen from './../screens/shop/ProductDetailsScreen'
import CartScreen from './../screens/shop/CartScreen'
import OrdersScreen from './../screens/shop/OrdersScreen'
import UserProductScreen from './../screens/user/UserProductScreen'
import EditProductsScreen from './../screens/user/EditProductScreen'
import AuthScreen from './../screens/user/AuthScreen'

//utils
import colors from './../utils/colors'
import { Ionicons } from '@expo/vector-icons';

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

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductScreen,
    EditProducts: EditProductsScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? colors.userColor : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
        headerTitleStyle: 'caviar_d_bold',
        headerBackTitleStyle: 'caviar_d_italic'
    },
})

const ShopNavigator = createDrawerNavigator({
    Products: { screen: ProductsNavigator },
    Orders: { screen: OrdersNavigator },
    Admin: { screen: AdminNavigator }
}, {
    contentOptions: {
        activeTintColor: colors.primary
    }
});

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, { defaultNavigationOptions: defaultNavOptions });

const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Shop: ShopNavigator
})


export default createAppContainer(MainNavigator)
