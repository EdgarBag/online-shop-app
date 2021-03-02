import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, FlatList, Platform, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch, } from "react-redux";

// navigations
import { HeaderButtons, Item } from "react-navigation-header-buttons";

// components
import TextBox from './../../components/TextBox'
import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from './../../store/actions/cart'
import * as productAction from './../../store/actions/products'
import HeaderButton from './../../components/UI/HeaderButtom'

import colors from '../../utils/colors'
import { Colors } from 'react-native/Libraries/NewAppScreen';


const ProductsOverviewScreen = ({ navigation }) => {
    console.log('loaded products page');
    const products = useSelector(state => state.products.availableProducts),
        // const orders = useSelector(state => state.orders.orders)
        dispatch = useDispatch(),
        [isLoading, setIsloading] = useState(false),
        [err, setErr] = useState('')

    const selectItemHandler = (id, title) => {
        navigation.navigate({
            routeName: 'ProductDetails', params: {
                productId: id,
                productTitle: title
            }
        })
    }

    const addItemHandler = (item) => {
        dispatch(cartActions.addToCart(item))
    }

    const loadProds = useCallback(async () => {
        setIsloading(true)
        try {
            await dispatch(productAction.fetchProducts())
        } catch (error) {
            setErr(error.message)
        }
        setIsloading(false)
    }, [dispatch, setIsloading, setErr]);

    useEffect(() => {
        loadProds();
    }, [dispatch, loadProds]);

    useEffect(() => {
        const willFocusSub = navigation.addListener('willFocus', loadProds)
        return () => {
            willFocusSub.remove();
        }
    }, [loadProds])

    if (err) {
        return <View style={s.centered}>
            <TextBox>{err}</TextBox>
            <Button title='Try again' color={colors.primary} onPress={loadProds} />
        </View>
    }

    if (isLoading) {
        return <View style={s.centered}>
            <ActivityIndicator
                style={s.centered}
                size='large'
                color={colors.userColor} />
        </View>
    }

    if (!isLoading && products.length === 0) {
        return <View style={s.centered}>
            <TextBox>No products</TextBox>

        </View>
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

const s = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default ProductsOverviewScreen;