import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  WebView,
} from 'react-native';

const jsCode = `window.postMessage('Hellow')`;
const WEBVIEW_REF = 'webview';

class HomeScreen extends Component {
  state = {
    cookies    : {},
    webViewUrl : ''
  }
  constructor(props) {
    super(props);
    let {password, user} = this.props.navigation.state.params;
    this.state = {
      password: password,
      user: user,
    }
  }
  async componentDidMount() {
    const continuationToken = await this.getContinuationToken()
    console.log('LogIn completed', continuationToken)
    const accessToken = await this.getAccessToken(continuationToken.continuationToken);
    console.log('Login success', accessToken);
    this.setState({
        continuationToken: continuationToken.continuationToken,
        accessToken: accessToken.accessToken,
    })
    this.refs[WEBVIEW_REF].postMessage('message');
  }
  async getContinuationToken() {
    const url = 'https://api-eu.atmailcloud.com/auth'
    const headers = {
      "pragma": "no-cache",
      "origin": "https://ziltoideu.atmailcloud.com",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9",
      "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3238.0 Safari/537.36",
      "content-type": "application/json;charset=UTF-8",
      "accept": "application/json, text/plain, */*",
      "cache-control": "no-cache",
      "authority": "api-eu.atmailcloud.com",
      "referer": "https://ziltoideu.atmailcloud.com/",
      "x-jmap-extensions": "com.atmail.accounts:1"
    }
    const body = {
      "username": "dev@ziltoideu.atmailcloud.com",
      "clientName": "atmail-webmail",
      "clientVersion": "8.3.9",
      "deviceName": "Chrome"
    }
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: headers,
        // credentials: 'same-origin',
        body: JSON.stringify(body),
      })
      return response.json();
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async getAccessToken(continuationToken) {
    const url = 'https://api-eu.atmailcloud.com/auth'
    const headers = {
      "pragma": "no-cache",
      "origin": "https://ziltoideu.atmailcloud.com",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9",
      "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3238.0 Safari/537.36",
      "content-type": "application/json;charset=UTF-8",
      "accept": "application/json, text/plain, */*",
      "cache-control": "no-cache",
      "referer": "https://ziltoideu.atmailcloud.com/",
      "x-jmap-extensions": "com.atmail.accounts:1"
    }
    const body = {
      "token": continuationToken,
      "method": "password",
      "password": "jiv7q~uGmf",
      "server": ""
    }
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: headers,
        // credentials: 'same-origin',
        body: JSON.stringify(body),
      })
      return response.json();
    } catch (error) {
      return Promise.reject(error)
    }
  }
  onNavigationStateChange = (webViewState: { url: string }) => {
    const { url } = webViewState;

    // when WebView.onMessage called, there is not-http(s) url
    if(url.includes('https')) {
      this.setState({ webViewUrl: url })
    }
  }

  _checkNeededCookies = () => {
    const { cookies, webViewUrl } = this.state;

    if (webViewUrl === 'SUCCESS_URL') {
      if (cookies['cookie-name-for-jwt']) {
        alert(cookies['cookie-name-for-jwt']);
        // do your magic...
      }
    }
  }

  onMessage = (data) => {
    console.log('Data from web', data);
  }
  
  render() {
    console.log(this.state.user, this.state.password);
    // let jsCode = "window.postMessage(document.cookie= 'login=; expires=Bla bla bla')"; // if you need to write some cookies, not sure if it goes to shared cookies, most probably no :)

    return (
      <WebView
        source={{ uri: 'http://localhost:3000/app' }}
        onNavigationStateChange={this.onNavigationStateChange}
        onMessage={this.onMessage}
        injectedJavaScript={jsCode}
        style={{ flex: 1 }}
        scrollEnabled={false}
        javaScriptEnabled={true}
          domStorageEnabled={true}
          isSelected={true}
          ref={WEBVIEW_REF} 
      />
    );
  }
}

export default HomeScreen;
