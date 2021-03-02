import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { useState } from 'react/cjs/react.development'
import TextBox from './../TextBox'

const InputBox = props => {
    const { label, onChangeHandler, inputValue } = props,
        [touched, setTouched] = useState(false);

    const validation = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        let error;
        if (props.required && text.trim().length === 0) {
            isValid = false;
            error = `This field is required and should be fill!`
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
            error = `Wrong Email!`
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
            error = `The price should be greater ${props.min}!`
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
            error = `The prdescription should be minimum ${props.minLength} letters!`
        }

        return isValid
    }

    return (
        <View style={s.formControl}>
            <TextBox style={s.label}>{label}</TextBox>
            <TextInput
                {...props.style}
                style={s.input}
                onChangeText={onChangeHandler}
                value={inputValue}
                returnKeyType='next'
                onBlur={() => setTouched(true)}
            />
            {touched && !validation(inputValue) && < View style={s.errorBox}>
                <TextBox style={s.error}>{props.errorMsg}</TextBox>
            </View>}
        </View >
    )
}

const s = StyleSheet.create({
    formControl: {
        width: '100%'
    },
    label: {
        marginVertical: 8,
        fontWeight: 'bold'
    },
    input: {
        paddingHorizontal: 2,
        borderBottomColor: '#ccc',
        borderBottomWidth: 2
    },
    error: {
        color: 'red',
        fontSize: 13
    },
    errorBox: {
        paddingHorizontal: 5
    }
});

export default InputBox