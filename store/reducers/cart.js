import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart"
import CartItem from './../../models/cart'

const initialState = {
    items: {},
    totalAmount: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            let updatedOrNewCartItem;
            if (state.items[addedProduct.id]) {
                // already have the item in the cart
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    addedProduct.price,
                    addedProduct.title,
                    state.items[addedProduct.id].sum + addedProduct.price);
            }
            else {
                // need to create new cart item
                updatedOrNewCartItem = new CartItem(1, addedProduct.price, addedProduct.title, addedProduct.price)
            }
            return {
                ...state, items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + addedProduct.price
            }
        case REMOVE_FROM_CART:
            // console.log('777777');
            const selectedCartItem = state.items[action.id];
            let updatedCartItems;
            if (selectedCartItem.quantity > 1) {
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.prodictTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice);
                updatedCartItems = { ...state.items, [action.id]: updatedCartItem }
            } else {
                updatedCartItems = { ...state.items }
                delete updatedCartItems[action.id]
            }
            return {
                ...state, items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            }
    }
    return state;
}