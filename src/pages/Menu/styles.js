import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container : {
       flex: 1,
       justifyContent: 'center',
    },
    button : {
        backgroundColor: '#6BA0FC',
        width: 154,
        height: 41,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    text: {
        color: 'white',
        fontWeight: '700',
        fontFamily: 'Roboto',
        fontSize: 14,
    }
});

export default styles;