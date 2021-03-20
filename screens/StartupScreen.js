import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useDispatch } from "react-redux";
import * as authActions from './../store/actions/auth'


// utils
import colors from "./../utils/colors";
const StartupScreen = props => {

    const dispatch = useDispatch();
    useEffect(() => {
        console.log('start');
        const tryLogin = async () => {
            console.log('1');
            const userData = await AsyncStorage.getItem('userData')
            if (!userData) {
                console.log('there is now data user');
                props.navigation.navigate('Auth')
                return;
            }

            const transformedData = JSON.parse(userData)
            const { token, userId, expiryDate } = transformedData
            const expirationDate = new Date(expiryDate);

            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth');
                return
            }

            props.navigation.navigate('Shop')
            dispatch(authActions.authenticate(userId, token))
        }
        tryLogin()


    }, [dispatch])

    return (
        <View style={s.indicator}>
            <ActivityIndicator size='large' color={colors.primary} />
        </View>
    )
}
StartupScreen.navigationOptions = {
    headerTitle: 'Start Screen'
}

const s = StyleSheet.create({
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default StartupScreen