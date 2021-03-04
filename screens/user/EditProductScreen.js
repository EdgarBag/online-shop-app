import React, { useState, useEffect, useCallback, useReducer } from 'react'
import {
    View, StyleSheet, TextInput,
    ScrollView, Button, Platform,
    Alert, KeyboardAvoidingView, ActivityIndicator,
} from 'react-native'

// redux
import { useSelector, useDispatch, useStore } from 'react-redux'
import * as  productActions from './../../store/actions/products'

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButtom'
import TextBox from './../../components/TextBox'

import InputBox from './../../components/UI/InputBox'
import colors from '../../utils/colors';

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

const EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false),
        [error, setError] = useState();
    const prodId = props.navigation.getParam('productId'),
        editedProduct = useSelector(state =>
            state.products.userProducts.find(prod => prod.id === prodId));
    const dispatch = useDispatch();


    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: '',
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An error accured', error, [{ text: 'Okay' }])
        }
    }, [error])

    const findFalseValid = array => {
        for (const key in array) {
            let value = formState.inputValidities[key];
            if (value === false) {
                return key
            }
        }
    }

    const submitHandler = useCallback(async () => {

        if (!formState.formIsValid) {
            let falseInput = findFalseValid(formState.inputValidities);
            Alert.alert('Wrong input!',
                `Please check the errors in the ${falseInput} form!`, [
                { text: 'Done!' }
            ]);
            return;
        }
        setError(null)
        setIsLoading(true);
        try {
            if (editedProduct) {
                await dispatch(productActions.updateProduct(prodId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl))
            } else {
                await dispatch(productActions.createProduct(formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price))
            };
            props.navigation.goBack();

        } catch (err) {
            setError(err.message)
        }

        setIsLoading(false)

    }, [dispatch, formState.inputValues.title,
        formState.inputValues.description,
        formState.inputValues.imageUrl,
        formState.inputValues.price])

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])


    const textChangeHandler = (inputIdentifier, text) => {
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

    if (isLoading) {
        return (<View style={s.activIndicator}>
            <ActivityIndicator
                size='large'
                color={colors.primary} />
        </View>)
    }


    return (<KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior='padding'
        keyboardVerticalOffset={50}
    >
        <ScrollView>
            <View style={s.formBox}>
                <InputBox
                    label='Title'
                    inputValue={formState.inputValues.title}
                    onChangeHandler={textChangeHandler.bind(this, 'title')}
                    errorMsg={'Please fill title.'}
                    required
                />
                <InputBox
                    label='Image Url'
                    inputValue={formState.inputValues.imageUrl}
                    onChangeHandler={textChangeHandler.bind(this, 'imageUrl')}
                    errorMsg={'Please insert image URL.'}
                />
                {editedProduct ? null : <InputBox
                    label='Price'
                    inputValue={formState.inputValues.price}
                    onChangeHandler={textChangeHandler.bind(this, 'price')}
                    errorMsg={'Please fill price.'}
                    min={0.1}
                />}
                <InputBox
                    label='Description'
                    inputValue={formState.inputValues.description}
                    onChangeHandler={textChangeHandler.bind(this, 'description')}
                    errorMsg={'Please fill description.'}
                    minLength={10}
                />
            </View>
        </ScrollView>
    </KeyboardAvoidingView>)
};

const s = StyleSheet.create({
    formBox: {
        margin: 20,
    },
    activIndicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

EditProductScreen.navigationOptions = navData => {
    const submitHandler = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Orders'
                iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                onPress={submitHandler}
            />
        </HeaderButtons>
    }
}
export default EditProductScreen