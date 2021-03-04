import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER'
export const FETCH_ORDERS = 'FETCH_ORDERS'

export const fetchOrders = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://online-shop-app-97090-default-rtdb.firebaseio.com/orders/u1.json');
            console.log(response, ' response');
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
            console.log(loadedOrders, ' orders');
            dispatch({ type: FETCH_ORDERS, fetchedOrders: loadedOrders })

        } catch (error) {
            throw error
        }
    }
}



export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        try {
            const date = new Date();
            const response = await fetch('https://online-shop-app-97090-default-rtdb.firebaseio.com/orders/u1.json', {
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