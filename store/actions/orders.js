import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER'
export const FETCH_ORDERS = 'FETCH_ORDERS'

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        try {
            const userId = getState().auth.userId;
            const response = await fetch(
                `https://online-shop-app-97090-default-rtdb.firebaseio.com/orders/${userId}.json`);
            if (!response.ok) {
                throw new Error('Somethig went wrong!')
            }
            const resData = await response.json();
            const loadedOrders = [];
            for (const key in resData) {
                loadedOrders.push(new Order(key,
                    resData[key].cartItems,
                    resData[key].totalAmount,
                    new Date(resData[key].date)))
            }
            dispatch({ type: FETCH_ORDERS, fetchedOrders: loadedOrders })
        } catch (error) {
            throw error
        }
    }
}


export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        try {
            const date = new Date();
            const token = getState().auth.token;
            const userId = getState().auth.userId;
            const response = await fetch(
                `https://online-shop-app-97090-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'applictions/json'
                },
                body: JSON.stringify({
                    cartItems,
                    totalAmount,
                    date: date.toISOString()
                })
            });

            if (!response.ok) {
                throw new Error('Somethig went wrong!')
            }

            const resData = await response.json();
            dispatch(
                {
                    type: ADD_ORDER,
                    orderData: {
                        items: cartItems,
                        amount: totalAmount,
                        itemDate: date,
                        id: resData.name
                    }
                }
            )
        } catch (err) {
            throw err
        }
    }
}