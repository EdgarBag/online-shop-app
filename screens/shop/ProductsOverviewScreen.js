import React from 'react'
import { View, StyleSheet, FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

// navigations
import { HeaderButtons, Item } from "react-navigation-header-buttons";

// components
import TextBox from './../../components/TextBox'
import ProductItem from './../../components/shop/productItem'
import * as cartActions from './../../store/actions/cart'
import HeaderButton from './../../components/UI/HeaderButtom'




const ProductsOverviewScreen = props => {

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem data={itemData.item}
                onViewDetails={() => props.navigation.navigate({
                    routeName: 'ProductDetails', params: {
                        productId: itemData.item.id,
                        productTitle: itemData.item.title
                    }
                })}
                onAddToCart={() => { dispatch(cartActions.addToCart(itemData.item)) }}
            />}
        />)

}

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Cart'
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => navData.navigation.navigate('Cart')}
            />
        </HeaderButtons>
    }
}

const s = StyleSheet.create({});
export default ProductsOverviewScreen;