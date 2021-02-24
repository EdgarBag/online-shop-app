import React from 'react'
import { View, StyleSheet, FlatList, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as productActions from './../../store/actions/products'

import TextBox from './../../components/TextBox'
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from './../../components/shop/ProductItem'
import HeaderButton from './../../components/UI/HeaderButtom'
import colors from '../../utils/colors'

const UserProductScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProducts', { productId: id })
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    data={itemData.item}
                    onSelect={() => { }}
                >
                    <Button
                        color={colors.primary}
                        title='Edit'
                        onPress={() => editProductHandler(itemData.item.id)} />
                    <Button
                        color={colors.primary}
                        title='Delete'
                        onPress={() => { dispatch(productActions.deleteProduct(itemData.item.id)) }}
                    />
                </ProductItem>}
        />
    )
};


UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: 'User Products',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Orders'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => navData.navigation.toggleDrawer()}
            />
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Orders'
                iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                onPress={() => navData.navigation.navigate('EditProducts')}
            />
        </HeaderButtons>
    }
}


const s = StyleSheet.create({

});
export default UserProductScreen