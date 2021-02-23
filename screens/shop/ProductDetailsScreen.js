import React, { useState } from 'react'
import { View, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import TextBox from './../../components/TextBox'
import colors from './../../utils/colors'
import * as cartActions from './../../store/actions/cart'

const ProductsDetailsScreen = props => {
    const productId = props.navigation.getParam('productId')
    const prodForDisplay = useSelector(state =>
        state.products.availableProducts.find(item => item.id === productId))
    const dispatch = useDispatch(),
        [showDone, setShowDone] = useState(false);


    return (
        <ScrollView>
            <Image style={s.imageStyle}
                source={showDone ? require('./../../assets/img/done.png') : { uri: prodForDisplay.imageUrl }} />
            <View style={s.btnContainer}>
                <Button
                    color={colors.primary}
                    title='Add To Cart'
                    onPress={() => {
                        setShowDone(true)
                        setTimeout(() => {
                            setShowDone(false)
                        }, 2000)
                        dispatch(cartActions.addToCart(prodForDisplay))
                    }} />
            </View>
            <TextBox style={s.price}>${prodForDisplay.price}</TextBox>
            <TextBox style={s.description}>{prodForDisplay.description}</TextBox>
        </ScrollView>)
}

ProductsDetailsScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const s = StyleSheet.create({
    imageStyle: {
        width: '95%',
        height: 290,
        margin: 10,
        borderRadius: 10
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        textAlign: 'center',
        fontSize: 16,
        marginHorizontal: 12
        // borderColor: 'red', borderWidth: 1
    },
    btnContainer: {
        marginVertical: 10,
        alignItems: 'center'
    }
});
export default ProductsDetailsScreen;