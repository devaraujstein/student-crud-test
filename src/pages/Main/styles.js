import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    backContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: '18%'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F9F9F9'
    },
    imageAvatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginRight: 16,
        marginLeft: 16,
        marginTop: 24,
        marginBottom: 24
    },
    photoUpload: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 24
    },
    photoUploadBtn: {
        flexDirection: 'row',
        backgroundColor: '#6BA0FC',
        width: 177,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10

    },
    textInput: {
        width: 354,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginTop: 5,
        paddingLeft: 20
    },
    button: {
        backgroundColor: '#6BA0FC',
        width: 177,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24
    },
    text: {
        color: 'white',
        fontWeight: '700',
        fontFamily: 'Roboto',
        fontSize: 14,
    },
    listContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        backgroundColor: '#FFF',
        width: 354,
        height: 80
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 16,
        marginLeft: 16
    },
    textName: {
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Roboto'
    },
    textAddress: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#9BA4B4'
    },
    listUD: {
        position: 'absolute',
        flexDirection: 'row',
        alignSelf: 'center',
        right: 0
    }
});

export default styles;