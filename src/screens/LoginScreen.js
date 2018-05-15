import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  AsyncStorage
} from 'react-native';

import AtWebview from './AtWebview';
import styles from '../styles/Login';
const {width, height} = Dimensions.get('window');

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.atWebview = null;
        this.onEmail = this.onEmail.bind(this);
        this.onPassword = this.onPassword.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
        this.state = {
            isEmailPressed: false,
            isPassPressed: false,
            email: null,
            password: null,
            isWebView: false,
            isLoggedIn: true,
        }
    }
    componentWillMount() {
        AsyncStorage.multiGet(['email', 'password']).then((data) =>{
            if(data[0][1]) {
                console.log('Stored email', data[0]);
                console.log('Stored password', data[1]);
                this.setState({
                    isLoggedIn: true,
                    email: data[0][1],
                    password: data[1][1],
                });     
                this.atWebview.onSignIn();
            } else {
                this.setState({
                    isLoggedIn: false,
                })
            }
        });
    }
    onEmail() {
        console.log('Email');
        this.setState({
            isEmailPressed: true,
           // isPassPressed: false,
        })
    }
    onPassword() {
        console.log('Password');
        this.setState({
            isPassPressed: true,
           // isEmailPressed: false,
        })
    }
    onLogin() {
        console.log(this.state.email, this.state.password);
        this.props.navigation.navigate('HomeScreen', {...{"user": this.state.email, "password": this.state.password}});
    }
    loginHandler(value) {
        console.log('Login handler', value);
        this.setState({
            isLoggedIn: value,
        })
        if(value == true){
            AsyncStorage.multiSet([
                ['email', this.state.email],
                ['password', this.state.password]
            ]);
        } else {
            AsyncStorage.multiRemove(
                ['email', 'password']
            );
        }
    }
    render() {
        return (
            ! this.state.isLoggedIn ?
            <KeyboardAvoidingView style={styles.container} behavior="position" enabled keyboardVerticalOffset={-width/2+50}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logo}
                    />
                </View>
                <View style={styles.loginForm}>
                    <Text style={ !this.state.isEmailPressed ? styles.emailPlace: [styles.emailPlace, { top: -10, fontSize: 13, }]}>Email</Text>                                        
                    <TextInput
                        style={ !this.state.isEmailPressed ? styles.email: [styles.email, {borderBottomColor: 'rgba(0,132,212,1.0)', borderBottomWidth: 1.5}]}
                        placeholderTextColor={'white'}
                        onFocus={this.onEmail}
                        onChangeText={(text) => {
                            this.setState({ email: text, isEmailPressed: true });
                            console.log(this.state.email);
                          }}
                    >
                    </TextInput>
                    <Text style={ !this.state.isPassPressed ? styles.passPlace: [styles.passPlace, { top: 50, fontSize: 13 }]}>Password</Text>                                                            
                    <TextInput
                        style={ !this.state.isPassPressed ? styles.password: [styles.password, {borderBottomColor: 'rgba(0,132,212,1.0)', borderBottomWidth: 1.5}]}
                        placeholderTextColor={'white'}
                        onFocus={this.onPassword}
                        secureTextEntry
                        onChangeText={(text) => {
                            this.setState({ password: text, isPassPressed: true });
                            console.log(this.state.password);
                          }}
                    />
                    <TouchableOpacity onPress={() => {this.atWebview.onSignIn(); this.setState({isWebView: true})}} style={styles.signin}>
                        <Text style={styles.signinText}>SIGN IN</Text>
                    </TouchableOpacity>
 
                </View>
                <AtWebview
                    
                    ref={(atWebview) => {this.atWebview = atWebview}}
                    credentials={{ 'email': this.state.email, 'password': this.state.password}}
                    loginHandler={this.loginHandler}
                    />
            </KeyboardAvoidingView> :                 <AtWebview
                    style={{ top: 10, width: 100, height: 100 }}
                    ref={(atWebview) => {this.atWebview = atWebview}}
                    credentials={{ 'email': this.state.email, 'password': this.state.password}}
                    loginHandler={this.loginHandler}
                    />
        );
    }
}

export default LoginScreen;
