import React from 'react'
import { View, StyleSheet, FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux'

import TextBox from './../../components/TextBox'
import HeaderButton from './../../components/UI/HeaderButtom'
import OrderItem from './../../components/shop/OrderItem'

const OrdersScreen = props => {
    const order = useSelector(state => state.orders.orders)
    return (
        <View>
            {order.length ?
                <FlatList
                    style={s.itemsList}
                    data={order}
                    keyExtractor={item => item.id}
                    renderItem={itemData =>
                        // console.log(itemData.item, 'itemData item');
                        <OrderItem
                            data={itemData.item}
                            items={itemData.item.items}
                            navigation={props.navigation} />
                    }
                /> :
                <TextBox>There is now  Orders</TextBox>
            }
        </View>
    )
}

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        // headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        //     <Item
        //         title='Menu'
        //         iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        //         onPress={() => navData.navigation.toggleDrawer()}
        //     />
        // </HeaderButtons>
        // ,
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Orders'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => navData.navigation.toggleDrawer()}
            />
        </HeaderButtons>,
    }
}

const s = StyleSheet.create({
    itemsList: {
        height: '90%'
    }

});
export default OrdersScreen;