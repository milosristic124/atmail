import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

export const Root = StackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        title: 'LoginScreen',
      },
    },
    HomeScreen: {
      screen: HomeScreen,
  },
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
);

export const MainStack = StackNavigator(
  {
  HomeScreen: {
    screen: HomeScreen,
  },
}, {
  navigationOptions: {
    headerVisible: true,
    showLabel: false,
  }
 }
);
export const Tabs = TabNavigator({
    LoginScreen: { screen: LoginScreen},
  }, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
    },
    style: {
      height: 85,
    },
    activeTintColor: '#7567B1',
    labelStyle: {
      marginBottom: 10,
      fontSize: 12,
      fontWeight: '800'
    }
  });
  export const App = StackNavigator({
    LoginScreen: {
      screen: LoginScreen,
    },
    Tabs: {
      screen: Tabs,
    },
  }, {
    mode: 'modal',
    headerMode: 'none',
  });

export default App;
