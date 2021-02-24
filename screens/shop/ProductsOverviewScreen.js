import React, { useState } from 'react'
import { View, StyleSheet, FlatList, Platform, Button } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

// navigations
import { HeaderButtons, Item } from "react-navigation-header-buttons";

// components
import TextBox from './../../components/TextBox'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from './../../store/actions/cart'
import HeaderButton from './../../components/UI/HeaderButtom'

import colors from '../../utils/colors'


const ProductsOverviewScreen = props => {

    const products = useSelector(state => state.products.availableProducts),
        // const orders = useSelector(state => state.orders.orders)
        dispatch = useDispatch(),
        [showDone, setShowDone] = useState(false)

    const selectItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetails', params: {
                productId: id,
                productTitle: title
            }
        })
    }

    const addItemHandler = (item) => {
        dispatch(cartActions.addToCart(item))
        setShowDone(true);
        setTimeout(() => {
            setShowDone(false)
        }, 2000);
    }

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem
                data={itemData.item}
                onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}
            // done={showDone}
            >
                <Button
                    color={colors.primary}
                    title='View Details'
                    onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)} />
                <Button
                    color={colors.primary}
                    title='Add to Cart'
                    onPress={() => addItemHandler(itemData.item)}
                />
            </ProductItem>}
        />)
}

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Orders'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => navData.navigation.toggleDrawer()}
            />
        </HeaderButtons>,
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