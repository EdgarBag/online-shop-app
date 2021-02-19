import React from 'react'
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'


import TextBox from './../TextBox'

const CartItem = props => {
    const { productId, productTitle, productPrice, productQuantity, productSum } = props.item

    return (
        <View style={s.cartItem}>
            <View style={s.itemData}>
                <TextBox style={s.qty}>{productQuantity}{' '}</TextBox>
                <TextBox style={s.title}>{productTitle}</TextBox>
            </View>
            <View style={s.itemData}>
                <TextBox style={s.amount}> ${productSum}</TextBox>
                <TouchableOpacity onPress={props.onRemove} style={s.deleteBtn}>
                    <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color='red'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
};


const s = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qty: {
        color: '#888',
        fontSize: 16
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16
    },
    amount: {
        fontWeight: 'bold',
        fontSize: 16
    },
    deleteBtn: {
        marginLeft: 12
    }
});

export default CartItem