import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

// screens
import ProductOverviewScreen from './../screens/shop/ProductsOverviewScreen'
import ProductDetailsScreen from './../screens/shop/ProductDetailsScreen'
import CartScreen from './../screens/shop/CartScreen'

//utils
import colors from './../utils/colors'
const ProductsNavigator = createStackNavigator({
    ProductOverview: ProductOverviewScreen,
    ProductDetails: ProductDetailsScreen,
    Cart: CartScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
        headerTitleStyle: 'caviar_d_bold',
        headerBackTitleStyle: 'caviar_d_italic'
    }
});


export default createAppContainer(ProductsNavigator)
