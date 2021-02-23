import React from 'react'
import { View, StyleSheet, TouchableOpacity, Platform, Image, TouchableNativeFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import TextBox from './../TextBox'
import colors from '../../utils/colors';

const CartItem = props => {
    const { productId, productTitle, productQuantity, productSum, imageUrl } = props.item

    // let TouchBox;
    // if (Platform.OS === 'android' && Platform.Version >= 21) {
    //     TouchBox = TouchableNativeFeedback;
    // }

    return (

        <View style={s.touchBox}>
            <TouchableOpacity onPress={() => props.navigation.navigate({
                routeName: 'ProductDetails', params: {
                    productId: productId,
                    productTitle: productTitle
                }
            })}
                useForeground>
                <View style={s.cartItem}>
                    <View style={s.summaryBox}>
                        <View style={s.itemData}>
                            <TextBox style={s.qty}>{productQuantity}{' '}</TextBox>
                            <TextBox style={s.title} numberOfLines={1}>{productTitle}</TextBox>
                        </View>
                        <View style={s.itemData}>
                            <TextBox style={s.amount}> ${productSum.toFixed(2)}</TextBox>
                            {props.deletable ?
                                <TouchableOpacity onPress={props.onRemove} style={s.deleteBtn}>
                                    <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                                        size={23}
                                        color='red'
                                    />
                                </TouchableOpacity> :
                                null}
                        </View>
                    </View>
                    <View style={s.image}>
                        <Image style={s.itemImage} source={{ uri: imageUrl }} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
};


const s = StyleSheet.create({
    cartItem: {
        shadowColor: colors.primary,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        // backgroundColor: 'white',
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        // borderColor: 'red', borderWidth: 1
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
    },
    itemImage: {
        width: 60,
        height: 60,
        // borderColor: 'red', borderWidth: 1
    },
    touchBox: {
        overflow: 'hidden'
    },
    summaryBox: {
        justifyContent: 'space-between',
        width: '65%'
    }

});

export default CartItem