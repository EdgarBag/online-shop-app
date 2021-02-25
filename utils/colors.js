import { Platform } from 'react-native'

export default {
    primary: '#c2185b',
    accent: '#ffc107',
    primaryOpositive: Platform.OS === 'android' ? 'white' : '#c2185b',
    userColor: '#B0E0E6'
}