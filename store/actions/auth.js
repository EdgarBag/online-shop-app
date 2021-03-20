import AsyncStorage from '@react-native-community/async-storage'
// export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';

export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = (userId, token) => {
    return { type: AUTHENTICATE, userId: userId, token: token }
}


export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAuHFEvPafYO-mk0eN2krNaNyHfPEbVgVg',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            const errResponse = await response.json();
            const errorId = errResponse.error.message;
            let msg = 'Something went wrong!'

            if (errorId === 'EMAIL_EXISTS') {
                msg = 'This email exist already'
            }
            throw new Error(msg)
        }

        const resData = await response.json();
        // console.log(resData);
        dispatch(authenticate(resData.localId, resData.idToken));
        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        )
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    };
};

export const logIn = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAuHFEvPafYO-mk0eN2krNaNyHfPEbVgVg',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            const errResponse = await response.json();
            const errorId = errResponse.error.message;
            let msg = 'Something went wrong!'

            if (errorId === 'EMAIL_NOT_FOUND') {
                msg = 'This email could not be found!'
            } else if (errorId === 'INVALID_PASSWORD') {
                msg = 'This password is not valid!'
            }
            throw new Error(msg)
        }

        const resData = await response.json();
        // console.log(resData);
        dispatch(authenticate(resData.localId, resData.idToken))
        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        )
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    };
};

export const logOut = () => {
    return { type: LOGOUT }
}


const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString()
        })
    )
}
