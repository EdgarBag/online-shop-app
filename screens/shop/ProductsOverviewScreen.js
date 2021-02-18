import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from "react-redux";

// components
import TextBox from './../../components/TextBox'
import ProductItem from './../../components/shop/productItem'




const ProductsOverviewScreen = props => {

    const products = useSelector(state => state.products.availableProducts)
    // console.log(props.navigation);

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
                onAddToCart={() => console.log('added to cart')}
            />}
        />)

}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products'
}

const s = StyleSheet.create({});
export default ProductsOverviewScreen;