import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/components/screens/homeScreen';
import DetailsScreen from './src/components/screens/detailsScreen';
import SignInScreen from './src/components/screens/signInScreen';

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    SignIn: {
      screen: SignInScreen,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}