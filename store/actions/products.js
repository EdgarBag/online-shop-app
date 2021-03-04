import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => {
        // any async code
        try {
            const response = await fetch('https://online-shop-app-97090-default-rtdb.firebaseio.com/products.json');

            if (!response.ok) {
                throw new Error('Somethig went wrong!')
            }
            const resData = await response.json();
            const loadedProds = [];
            for (const key in resData) {
                loadedProds.push(new Product(key,
                    'u1',
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price))
            }

            dispatch({ type: SET_PRODUCTS, products: loadedProds })
        } catch (err) {
            throw err
        }
    }
}

export const deleteProduct = id => {
    return async dispatch => {
        const res = await fetch(`https://online-shop-app-97090-default-rtdb.firebaseio.com/products/${id}.json`,
            {
                method: 'DELETE'
            });
        if (!res.ok) {
            throw new Error('Something went wrong!')
        };
        dispatch({ type: DELETE_PRODUCT, prodId: id })

    }
}

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        // any async code

        const response = await fetch('https://online-shop-app-97090-default-rtdb.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'applictions/json'
            },
            body: JSON.stringify({
                title, description, imageUrl, price
            })
        });

        const resData = await response.json();
        dispatch({
            type: CREATE_PRODUCT,
            newProd: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price
            }
        })
    }
}

export const updateProduct = (id, title, description, imageUrl) => {
    return async dispatch => {
        // any async code

        const response = await fetch(`https://online-shop-app-97090-default-rtdb.firebaseio.com/products/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title, description, imageUrl,
            })
        });

        if (!response.ok) {
            console.log('into throw something went wrong');
            throw new Error('Something went wrong!')
        }
        // const resData = await response.json();
        dispatch({
            type: UPDATE_PRODUCT,
            prodId: id,
            prodToUpdate: {
                title,
                description,
                imageUrl
            }
        })
    }
}
