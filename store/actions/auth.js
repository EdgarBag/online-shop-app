export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';


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
            console.log(errorId, ' error Id');
            let msg = 'Something went wrong!'

            if (errorId === 'EMAIL_EXISTS') {
                msg = 'This email exist already'
            }
            throw new Error(msg)
        }

        const resData = await response.json();
        console.log(resData);
        dispatch({ type: SIGNUP });
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
            console.log(errorId, ' error Id');
            let msg = 'Something went wrong!'

            if (errorId === 'EMAIL_NOT_FOUND') {
                msg = 'This email could not be found!'
            } else if (errorId === 'INVALID_PASSWORD') {
                msg = 'This password is not valid!'
            }
            throw new Error(msg)
        }

        const resData = await response.json();
        console.log(resData);
        dispatch({ type: LOGIN });
    };
};

