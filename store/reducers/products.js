import Product from '../../models/product';
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/products';
import PRODUCTS from './../../data/dummy-data'

const initialState = {
    // availableProducts: PRODUCTS,
    // userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
    availableProducts: [],
    userProducts: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.products.filter(prod => prod.ownerId === 'u1')
            }

        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.newProd.id,
                'u1',
                action.newProd.title,
                action.newProd.imageUrl,
                action.newProd.description,
                action.newProd.price);

            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }

        case UPDATE_PRODUCT:
            const prodIndex = state.userProducts.findIndex(prod => prod.id === action.prodId);
            const updatedProd = new Product(
                action.prodId,
                state.userProducts[prodIndex].ownerId,
                action.prodToUpdate.title,
                action.prodToUpdate.imageUrl,
                action.prodToUpdate.description,
                state.userProducts[prodIndex].price
            );
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[prodIndex] = updatedProd;
            const availableProdIndes = state.availableProducts.findIndex(prod => prod.id === action.prodId)
            const updatedAvaiProd = [...state.availableProducts];
            updatedAvaiProd[availableProdIndes] = updatedProd

            return {
                ...state,
                availableProducts: updatedAvaiProd,
                userProducts: updatedUserProducts
            }

        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id != action.prodId),
                availableProducts: state.availableProducts.filter(product => product.id != action.prodId)
            }
    }

    return state;
}