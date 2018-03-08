import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/components/screens/homeScreen';
import DetailsScreen from './src/components/screens/detailsScreen';
import SignInScreen from './src/components/screens/signInScreen';
import SignUpScreen from './src/components/screens/signUpScreen';
import VerifyScreen from './src/components/screens/verifyEmailScreen';
import ResendVerifyScreen from './src/components/screens/resendVerify';
import InitialScreen from './src/components/screens/initialScreen';
import Screens from './src/lib/screens';

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
    SignUp: {
      screen: SignUpScreen,
    },
    Verify: {
      screen: VerifyScreen,
    },
    Resend: {
      screen: ResendVerifyScreen,
    },
    Initial: {
      screen: InitialScreen,
    }
  },
  {
    initialRouteName: Screens.INITIAL,
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
