import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import CartItem from './CartItem'
import TextBox from './../TextBox';
import Card from '../UI/Card'
import colors from './../../utils/colors'

const OrderItem = props => {
    const { totalAmount, readableDate } = props.data,
        { items } = props,
        [showDetails, setShowDetails] = useState(false);

    return <Card style={s.orderItem}>
        <View style={s.summary}>
            <TextBox style={s.totalAmount}>${totalAmount.toFixed(2)}</TextBox>
            <TextBox style={s.date}>{readableDate}</TextBox>
        </View>

        <Button
            color={showDetails ? colors.accent : colors.primary}
            title={showDetails ? 'Hide details' : "Show Details"}
            onPress={() => setShowDetails(prevState => !prevState)}
            style={s.detailsBtn} />
        {showDetails ?
            <View style={s.detailsItem}>{items.map(cartItem =>
                <CartItem
                    key={cartItem.productId}
                    item={cartItem}
                    deletable={false}
                    navigation={props.navigation} />
            )}</View> : null}
    </Card>
}
const s = StyleSheet.create({
    orderItem: {
        margin: 15,
        padding: 5,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    date: {
        fontSize: 14,
        color: '#888'
    },
    detaidetailsBtnlsBtn: {
        paddingVertical: 40
    },
    detailsItem: {
        width: '100%',
    }
});

export default OrderItem