import React from 'react'
import {
    View, Text, Image,
    StyleSheet, Button,
    TouchableOpacity, TouchableNativeFeedback, Platform
} from 'react-native'
import TextBox from './../TextBox'

import colors from './../../utils/colors'


const ProductItem = props => {
    const { imageUrl, title, price } = props.data;
    let TouchBox = Platform.OS === 'android' && Platform.Version >= 21
        ? TouchableNativeFeedback : TouchableOpacity;

    return <View style={s.productBox}>
        <View style={s.touchableBox}>
            <TouchBox onPress={props.onViewDetails} useForeground>
                <View>
                    <View style={s.imgContainer}>
                        <Image style={s.imageStyle} source={{ uri: imageUrl }} />
                    </View>
                    <View style={s.details}>
                        <TextBox style={s.title}>{title}</TextBox>
                        <TextBox style={s.price}>${price.toFixed(2)}</TextBox>
                    </View>
                    <View style={s.btnContainer}>
                        <Button color={colors.primary} title='View Details' onPress={props.onViewDetails} />
                        <Button color={colors.primary} title='Add to Cart' onPress={props.onAddToCart} />
                    </View>
                </View>
            </TouchBox>
        </View>
    </View>
}

const s = StyleSheet.create({
    productBox: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
        overflow: 'hidden'
    },
    touchableBox: {
        overflow: 'hidden',
        borderRadius: 10,
    },
    imgContainer: {
        height: '60%',
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    imageStyle: {
        height: '100%',
        width: '100%',

    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontWeight: 'bold'
    },
    price: {
        fontSize: 14,
        color: "#888"
    },
    btnContainer: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 25
    }
})

export default ProductItem