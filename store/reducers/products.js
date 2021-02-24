import { DELETE_PRODUCT } from '../actions/products';
import PRODUCTS from './../../data/dummy-data'

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id != action.prodId),
                availableProducts: state.availableProducts.filter(product => product.id != action.prodId)
            }
    }

    return state;
}