import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

// screens
import ProductOverviewScreen from './../screens/shop/ProductsOverviewScreen'
import ProductDetailsScreen from './../screens/shop/ProductDetailsScreen'

//utils
import colors from './../utils/colors'
const ProductsNavigator = createStackNavigator({
    ProductOverview: ProductOverviewScreen,
    ProductDetails: ProductDetailsScreen,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary
    }
});


export default createAppContainer(ProductsNavigator)
