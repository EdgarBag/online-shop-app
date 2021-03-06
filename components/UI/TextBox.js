import React from 'react'
import { Text, StyleSheet } from 'react-native'

const TextBox = props => {
    return (<Text {...props} style={{ ...props.style, ...s.textBox }}>{props.children}</Text>)
}

const s = StyleSheet.create({
    textBox: {
        fontFamily: 'caviar_d_regular'
    }
});

export default TextBox;