import React from 'react'
import { View, StyleSheet, FlatList, Platform, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux'

// utils
import colors from './../../utils/colors'

// components
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
                        <OrderItem
                            data={itemData.item}
                            items={itemData.item.items}
                            navigation={props.navigation} />
                    }
                /> :
                <View style={s.emptyBoxCont}>
                    <View style={s.sentBox}>
                        <TextBox style={s.sent} numberOfLines={4}>There is now Orders. <TextBox style={s.clickHere}
                            onPress={() =>
                                props.navigation.navigate('Products')
                            }>Click here</TextBox> to start buy!!!</TextBox>
                    </View>
                    <View >
                        <Image style={s.emptybox} source={require('./../../assets/img/emptybox.png')} />
                    </View>
                </View>
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
    },
    emptybox: {
        width: 300,
        height: 300
    },
    emptyBoxCont: {
        height: '90%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    clickHere: {
        fontSize: 20,
        color: colors.primary,
        fontWeight: 'bold'
    },
    sent: {
        fontSize: 18,
        textAlign: 'center',
    },
    sentBox: {
        width: '60%',
        justifyContent: 'space-evenly'
    }

});
export default OrdersScreen;