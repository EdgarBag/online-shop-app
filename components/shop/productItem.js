import React, { useState } from 'react'
import {
    View, Text, Image,
    StyleSheet, Button,
    TouchableOpacity, TouchableNativeFeedback, Platform
} from 'react-native'

import TextBox from '../TextBox'
import Card from '../UI/Card'

import colors from '../../utils/colors'


const ProductItem = props => {
    const { imageUrl, title, price } = props.data,
        [showDone, setShowDone] = useState(false);

    let TouchBox = Platform.OS === 'android' && Platform.Version >= 21
        ? TouchableNativeFeedback : TouchableOpacity;

    const combinedAct = () => {
        props.onAddToCart()
        setShowDone(true)
        setTimeout(() => {
            setShowDone(false)
        }, 2000);
    }

    return <Card style={s.productBox}>
        <View style={s.touchableBox}>
            <TouchBox onPress={props.onSelect} useForeground>
                <View>
                    <View style={s.imgContainer}>
                        <Image style={s.imageStyle}
                            source={props.done ? require('./../../assets/img/done.png') : { uri: imageUrl }}
                        />
                    </View>
                    <View style={s.details}>
                        <TextBox style={s.title}>{title}</TextBox>
                        <TextBox style={s.price}>$ {price.toFixed(2)}</TextBox>
                    </View>
                    <View style={s.btnContainer}>
                        {props.children}
                    </View>
                </View>
            </TouchBox>
        </View>
    </Card>
}

const s = StyleSheet.create({
    productBox: {
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
        height: '17%',
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
        height: '23%',
        paddingHorizontal: 25
    }
})

export default ProductItem