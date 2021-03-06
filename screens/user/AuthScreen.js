import React, { useReducer, useCallback, useState, useEffect } from 'react'
import {
    View, ScrollView,
    KeyboardAvoidingView, StyleSheet,
    Button, Alert,
    ActivityIndicator
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

// inputs
import InputBox from './../../components/UI/InputBox'
import CardBox from './../../components/UI/Card'
import colors from '../../utils/colors'

import { useDispatch } from 'react-redux'
import * as authActions from './../../store/actions/auth'


// reducer

const FORM_UPDATE = 'FORM_UPDATE'
const formReducer = (state, action) => {
    if (action.type === FORM_UPDATE) {

        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };

        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    }
    return state;
}


const AuthScreen = (props) => {
    const dispatch = useDispatch(),
        [isSignUp, setIsSignUp] = useState(false),
        [isLoading, setIsloading] = useState(false),
        [err, setErr] = useState()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });


    useEffect(() => {
        if (err) {
            Alert.alert('An Error Accurred', err, [{ text: 'Okay!' }])
        }
    }, [err])


    const authHandler = async () => {

        let action;
        if (isSignUp) {
            action = authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password)
        } else {
            action = authActions.logIn(
                formState.inputValues.email,
                formState.inputValues.password)
        };

        setErr(null)
        setIsloading(true)
        try {
            await dispatch(action)
            setIsloading(false)
        }
        catch (error) {
            setErr(error.message)
            setIsloading(false)
        }
    };

    const inputChangeHandler = (inputIdentifier, text) => {
        let isValidToCheck = false
        if (text.trim().length > 0) {
            isValidToCheck = true
        }
        dispatchFormState({
            type: FORM_UPDATE,
            value: text,
            isValid: isValidToCheck,
            input: inputIdentifier
        })
    }

    return (<View behavior='padding' style={s.screen}>
        <LinearGradient colors={['#1A5276', colors.primary]} style={s.gradient}>
            <CardBox style={s.authConttainer}>
                <ScrollView>
                    <InputBox
                        // id='email'
                        label='E-Mail'
                        keyboardType='email-address'
                        required
                        // email
                        // autoCapitalize='none'
                        errorMsg={'Please enter a valid email address.'}
                        onChangeHandler={inputChangeHandler.bind(this, 'email')}
                        inputValue={formState.inputValues.email}
                    />
                    <InputBox
                        id='password'
                        label='Password'
                        keyboardType='default'
                        secureType='default'
                        sequreTextEntry
                        required
                        minLength={5}
                        autoCapitalize='none'
                        errorMsg={'Please enter a valid passwrod address.'}
                        onChangeHandler={(inputChangeHandler.bind(this, 'password'))}
                        inputValue={formState.inputValues.password}
                    />
                    <View style={s.btnsContainer}>

                        {isLoading ?
                            <ActivityIndicator size='small' color={colors.primary} />
                            :
                            <Button
                                title={isSignUp ? 'Sign Up' : 'Login'}
                                color={colors.primary}
                                onPress={authHandler}
                            />}
                        <Button
                            title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`}
                            color={colors.userColor}
                            onPress={() => { setIsSignUp(prevState => !prevState) }} />
                    </View>
                </ScrollView>
            </CardBox>
        </LinearGradient>
    </View>
    )
}

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
}

const s = StyleSheet.create({
    screen: {
        flex: 1,

    },
    authConttainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    gradient: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});

export default AuthScreen