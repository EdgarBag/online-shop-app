import { ADD_ORDER, FETCH_ORDERS } from '../actions/orders'
import Order from './../../models/order'

const initialState = {
    orders: []
};

export default (state = initialState, action) => {
    switch (action.type) {

        case FETCH_ORDERS:
            return {
                orders: action.fetchedOrders
            }
        case ADD_ORDER:
            // console.log(action.type.orderData, ' action type order data');
            const newOrder = new Order(
                action.orderData.id,
                action.orderData.items,
                action.orderData.amount,
                action.orderData.itemDate)

            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
    }
    return state

}