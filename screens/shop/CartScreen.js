import React from 'react'
import { View, StyleSheet, FlatList, Button } from 'react-native';

// redux
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from './../../store/actions/cart'
import * as orderActions from './../../store/actions/orders'

import TextBox from './../../components/TextBox'
import CartItem from './../../components/shop/CartItem'
import colors from './../../utils/colors'

const CartScreen = props => {
    const cart = useSelector(state => state.carts);

    const cartItems = useSelector(state => {
        const transformeredItems = [];
        for (const key in state.carts.items) {
            transformeredItems.push({
                productId: key,
                productTitle: state.carts.items[key].productTitle,
                productQuantity: state.carts.items[key].quantity,
                productPrice: state.carts.items[key].productPrice,
                productSum: state.carts.items[key].sum,
                imageUrl: state.carts.items[key].imageUrl
            })
        } return transformeredItems.sort((a, b) => a.productId > b.productId ? 1 : -1)
    });

    const dispatch = useDispatch();

    return (
        <View style={s.screen}>
            <View style={s.totalContent}>
                <TextBox style={s.summaryText}>Total:<TextBox style={s.amount}> ${cart.totalAmount.toFixed(2)}</TextBox></TextBox>
                <Button title='Order Now'
                    color={colors.accent}
                    onPress={() => dispatch(orderActions.addOrder(cartItems, cart.totalAmount))}
                    disabled={cartItems.length === 0}
                />
            </View>
            <FlatList
                style={s.flatList}
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData =>
                    <CartItem
                        key={itemData.item.productId}
                        item={itemData.item}
                        onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId));
                        }}
                        deletable={true}
                        navigation={props.navigation}
                    />}
            />
        </View>)
}

CartScreen.navigationsOprions = {
    headerTitle: 'Your Cart'
}

const s = StyleSheet.create({
    screen: {
        margin: 20
    },
    totalContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        padding: 5,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'caviar_d_bold'
    },
    amount: {
        color: colors.primary
    },
    flatList: {
        // borderWidth: 'black', borderWidth: 1,
        height: '80%'

    }

});
export default CartScreen;