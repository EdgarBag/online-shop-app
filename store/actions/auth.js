import AsyncStorage from '@react-native-community/async-storage'
// export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';

export const AUTHENTICATE = 'AUTHENTICATE';

let timer;
export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime))
        dispatch({ type: AUTHENTICATE, userId: userId, token: token })

    }
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
        dispatch(
            authenticate(
                resData.localId,
                resData.idToken,
                parseInt(resData.expiresIn) * 1000
            ));
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
        dispatch(
            authenticate(
                resData.localId,
                resData.idToken,
                parseInt(resData.expiresIn) * 1000
            )
        )
        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        )
        saveDataToStorage(resData.idToken, resData.localId, expirationDate)
    };
};

export const logOut = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData')
    return { type: LOGOUT }
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}

const setLogoutTimer = expirationDate => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logOut())
        }, expirationDate);
    }
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
