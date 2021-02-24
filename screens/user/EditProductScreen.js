import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, TextInput, ScrollView, Button, Platform } from 'react-native'
import { useSelector } from 'react-redux'

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from '../../components/UI/HeaderButtom'
import TextBox from './../../components/TextBox'

const EditProductScreen = props => {

    const prodId = props.navigation.getParam('productId'),
        editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

    const [title, setTitle] = useState(prodId ? editedProduct.title : ''),
        [imageUrl, setImageUrl] = useState(prodId ? editedProduct.imageUrl : ''),
        [price, setPrice] = useState(''),
        [description, setDescription] = useState(prodId ? editedProduct.description : '');


    const submitHandler = useCallback(() => {
        console.log('submiteds');
    }, [])

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])

    return (<ScrollView>
        <View style={s.formBox}>
            <View style={s.formControl}>
                <TextBox style={s.label}>Title</TextBox>
                <TextInput
                    style={s.input}
                    onChangeText={text => setTitle(text)}
                    value={title} />
            </View>
            <View style={s.formControl}>
                <TextBox style={s.label}>Image URL</TextBox>
                <TextInput
                    style={s.input}
                    onChangeText={text => setImageUrl(text)}
                    value={imageUrl}
                />
            </View>
            {editedProduct ? null : <View style={s.formControl}>
                <TextBox style={s.label}>Price</TextBox>
                <TextInput
                    style={s.input}
                    onChangeText={text => setPrice(text)}
                    value={price}
                />
            </View>}
            <View style={s.formControl}>
                <TextBox style={s.label}>Description</TextBox>
                <TextInput
                    style={s.input}
                    onChangeText={text => setDescription(text)}
                    value={description}
                />
            </View>
            <View>
                <Button title='add product' />
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