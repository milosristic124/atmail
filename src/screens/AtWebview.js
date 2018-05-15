import React, { Component } from 'react';
import { StyleSheet, View, Text, WebView } from 'react-native';

const EMULATE_VOICE = true;

class AtWebview extends Component {
  constructor(props) {
    super(props);

    this.sendPostMessage = this.sendPostMessage.bind(this);
    this.progressing = false,
    this.atWebview = null;
    this.state = {
      loaded: false,
      loading: true,
    }
    this.jsCode = `
      document.addEventListener("message", function(event) {
        const credential = event.data.split('loginmilos10');
        var n = event.data.indexOf('loginmilos10');
        if (n !== -1) {
          document.getElementById('email').value = credential[0];
          document.getElementById('password').value = credential[1];
          setTimeout(submit, 500);
        }
      });
      function submit() {
        document.getElementById('login_submit').click();       
      }

      var originalPostMessage = window.postMessage;

      var patchedPostMessage = function(message, targetOrigin, transfer) { 
        originalPostMessage(message, targetOrigin, transfer);
      };
    
      patchedPostMessage.toString = function() { 
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
      };
    
      window.postMessage = patchedPostMessage;
    `;
  }

  onMessage(event) {
    var msg = event.nativeEvent.data;
    console.log("zzz " + "onMessage(): Received Message from WebView : ", event.nativeEvent);

    if (msg == 'LoggedIn') {
      console.log("zzz " + "LoggedIn WebView : ", event.nativeEvent);    
      this.props.loginHandler(true);
    } else if (msg == 'Logout') {
      console.log("zzz " + "Logout : ", event.nativeEvent);
      this.props.loginHandler(false); 
    } 
     else {
      console.log("zzz " + "Default WebView : ", event.nativeEvent);   
    } 
    
  }

  onLoadStart() {
    // console.log("zzz " + "onLoadStart()");
    this.setState({
      loading: true,
    });
  }

  onLoadEnd() {
    console.log("zzz " + "onLoadEnd()");
    this.setState({
      loading: false,
    });
  }

  sendPostMessage(msg) {
    console.log("zzz " + "sendPostMessage() RN --> WebView : " + msg);
    this.atWebview.postMessage(msg);
  }

  onSignIn() {
    this.sendPostMessage(this.props.credentials.email + 'loginmilos10' + this.props.credentials.password);
    console.log(this.props.credentials);
  }
  onNavigationStateChange(webViewState) {
     console.log("zzz " + "URL -> ", webViewState.url);
  }

  onLoad(e) {
    // onload is called multiple times...
    if ( this.state.loaded ) {
      return
    }
    this.setState({ loaded: true }, () => this.atWebview.injectJavaScript('window.onLoad()'))
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <WebView
            source={{uri: 'http://localhost:3000/app'}}
            onLoad = {this.onLoad.bind(this)}
            javaScriptEnabled = {true}
            domStorageEnabled = {true}
            startInLoadingState={false}
            onLoadStart={this.onLoadStart.bind(this)}
            onLoadEnd={this.onLoadEnd.bind(this)}
            onNavigationStateChange={this.onNavigationStateChange.bind(this)}
            injectedJavaScript={this.jsCode}          
            scrollEnabled = {false}
            ref={(webView) => {this.atWebview = webView}}
            onMessage={this.onMessage.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  status: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});

export default AtWebview;
