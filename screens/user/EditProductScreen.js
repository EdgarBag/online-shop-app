import React, { useEffect, useCallback, useReducer } from 'react'
<<<<<<< HEAD
import {
    View, StyleSheet, TextInput,
    ScrollView, Button, Platform,
    Alert, KeyboardAvoidingView
} from 'react-native'
=======
import { View, StyleSheet, TextInput, ScrollView, Button, Platform, Alert } from 'react-native'
>>>>>>> origin/master

// redux
import { useSelector, useDispatch } from 'react-redux'
import * as  productActions from './../../store/actions/products'

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButtom'
import TextBox from './../../components/TextBox'

<<<<<<< HEAD
import InputBox from './../../components/UI/InputBox'

const FORM_UPDATE = 'FORM_UPDATE'
=======

const FORM_UPDATE = 'FORM_UPDATE'

>>>>>>> origin/master
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

    const prodId = props.navigation.getParam('productId'),
        editedProduct = useSelector(state =>
            state.products.userProducts.find(prod => prod.id === prodId));
    const dispatch = useDispatch();
<<<<<<< HEAD


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

    const findFalseValid = array => {
        for (const key in array) {
            let value = formState.inputValidities[key];
            if (value === false) {
                return key
            }
        }
    }

    const submitHandler = useCallback(() => {

        if (!formState.formIsValid) {
            let falseInput = findFalseValid(formState.inputValidities);
            Alert.alert('Wrong input!',
                `Please check the errors in the ${falseInput} form!`, [
=======


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
    })

    // const [title, setTitle] = useState(editedProduct ? editedProduct.title : ''),
    //     [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : ''),
    //     [price, setPrice] = useState(''),
    //     [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!',
                'Please check the errors in the form!', [
>>>>>>> origin/master
                { text: 'Done!' }
            ]);
            return;
        }

        if (editedProduct) {
            dispatch(productActions.updateProduct(prodId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl))
        } else {
            dispatch(productActions.createProduct(formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price))
        };

        props.navigation.goBack();
    }, [dispatch, formState.inputValues.title,
        formState.inputValues.description,
        formState.inputValues.imageUrl,
        formState.inputValues.price])

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])
    


    const textChangeHandler = (inputIdentifier, text) => {
<<<<<<< HEAD
        
=======
>>>>>>> origin/master
        let isValidToCheck = false
        if (text.trim().length > 0) {
            isValidToCheck = true
        }
<<<<<<< HEAD
=======

>>>>>>> origin/master
        dispatchFormState({
            type: FORM_UPDATE,
            value: text,
            isValid: isValidToCheck,
            input: inputIdentifier
        })
    }

<<<<<<< HEAD
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
=======
    return (<ScrollView>
        <View style={s.formBox}>
            <View style={s.formControl}>
                <TextBox style={s.label}>Title</TextBox>
                <TextInput
                    style={s.input}
                    onChangeText={textChangeHandler.bind(this, 'title')}
                    value={formState.inputValues.title}
                    // autoCorrect
                    returnKeyType='next' />
            </View>
            <View style={s.formControl}>
                <TextBox style={s.label}>Image URL</TextBox>
                <TextInput
                    style={s.input}
                    onChangeText={textChangeHandler.bind(this, 'imageUrl')}
                    value={formState.inputValues.imageUrl}
                />
            </View>
            {editedProduct ? null : <View style={s.formControl}>
                <TextBox style={s.label}>Price</TextBox>
                <TextInput
                    style={s.input}
                    onChangeText={textChangeHandler.bind(this, 'price')}
                    value={formState.inputValues.price}
                    keyboardType='decimal-pad'
                />
            </View>}
            <View style={s.formControl}>
                <TextBox style={s.label}>Description</TextBox>
                <TextInput
                    style={s.input}
                    onChangeText={textChangeHandler.bind(this, 'description')}
                    value={formState.inputValues.description}
                />
            </View>
        </View>
    </ScrollView>)
>>>>>>> origin/master
};

const s = StyleSheet.create({
    formBox: {
        margin: 20,
    },

    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
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