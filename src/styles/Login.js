import { 
    StyleSheet, 
    Dimensions, 
    Platform 
} from 'react-native';

var deviceWidth = Dimensions.get('window').width;
const {width, height} = Dimensions.get('window');
var headerTitleWidth = deviceWidth-120;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        width: width,
        height: height,
        backgroundColor: 'rgba(66, 85, 99, 1.0)',
        alignSelf: 'stretch',
    },
    logoContainer: {
       alignItems: 'center',
       justifyContent: 'center',
       marginTop: 150,
    },
    logo: {
        width: 204,
        height: 75,
    },
    errorMessage: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        color: '#F44336',
        marginTop: 40,
    },
    loginForm: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginLeft: 50,
        marginRight: 50,
    },
    email: {
        alignSelf: 'stretch',
        height: 40,
        fontSize: 16,
        fontWeight: '400',
        color: '#ffff',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
    },
    password: {
        alignSelf: 'stretch',
        marginTop: 30,
        height: 40,
        fontSize: 16,
        fontWeight: '400',
        color: '#ffff',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
    },
    emailPlace: { 
        flex:1, 
        alignSelf: 'flex-start', 
        top: 10, color: 'white', 
        fontSize: 18, 
        fontWeight: 'bold', 
        position: 'absolute' 
    },
    passPlace: { 
        flex:1, 
        alignSelf: 'flex-start', 
        top: 70, color: 'white', 
        fontSize: 18, 
        fontWeight: 'bold', 
        position: 'absolute' 
    },
    signin: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        padding: 10,
        backgroundColor: 'rgba(69, 119, 156, 1.0)',
        height: 40,
    },
    signinText: {
        color: 'white',
        fontSize: 16,
    }
});