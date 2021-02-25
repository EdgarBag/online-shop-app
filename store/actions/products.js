export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = id => {
    return { type: DELETE_PRODUCT, prodId: id }
}

export const createProduct = (title, description, imageUrl, price) => {
    return {
        type: CREATE_PRODUCT,
        newProd: {
            title,
            description,
            imageUrl,
            price
        }
    }
}

export const updateProduct = (id, title, description, imageUrl) => {
    return {
        type: UPDATE_PRODUCT,
        prodId: id,
        prodToUpdate: {
            title,
            description,
            imageUrl
        }
    }
}
