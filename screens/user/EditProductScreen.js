import React, { useEffect, useCallback, useReducer } from 'react'
import { View, StyleSheet, TextInput, ScrollView, Button, Platform, Alert } from 'react-native'

// redux
import { useSelector, useDispatch } from 'react-redux'
import * as  productActions from './../../store/actions/products'

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButtom'
import TextBox from './../../components/TextBox'


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
    })

    // const [title, setTitle] = useState(editedProduct ? editedProduct.title : ''),
    //     [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : ''),
    //     [price, setPrice] = useState(''),
    //     [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input!',
                'Please check the errors in the form!', [
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
};

const s = StyleSheet.create({
    formBox: {
        margin: 20,
    },
    formControl: {
        width: '100%'
    },
    label: {
        marginVertical: 8,
        fontWeight: 'bold'
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