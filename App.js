import 'react-native-gesture-handler';
import * as React from 'react';
import ViewRidesScreen from './src/components/screens/viewRidesScreen';
import SignInScreen from './src/components/screens/signInScreen';
import SignUpScreen from './src/components/screens/signUpScreen';
import InitialScreen from './src/components/screens/initialScreen';
import HomeScreen from './src/components/screens/homeScreen';
import AddRideScreen from './src/components/screens/addRideScreen';
import FinishRideScreen from './src/components/screens/finishRideScreen';
import VerifyEmailScreen from './src/components/screens/verifyEmailScreen';
import ResendVerifyScreen from './src/components/screens/resendVerify';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from './src/lib/screens';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Screens.INITIAL} headerMode="none">
        <Stack.Screen name={Screens.INITIAL} component={InitialScreen} />
        <Stack.Screen name={Screens.HOME} component={HomeScreen} />
        <Stack.Screen name={Screens.SIGNIN} component={SignInScreen} />
        <Stack.Screen name={Screens.SIGNUP} component={SignUpScreen} />
        <Stack.Screen name={Screens.VIEW_RIDES} component={ViewRidesScreen} />
        <Stack.Screen name={Screens.ADD_RIDE} component={AddRideScreen} />
        <Stack.Screen name={Screens.FINISH_RIDE} component={FinishRideScreen} />
        <Stack.Screen name={Screens.VERIFY} component={VerifyEmailScreen} />
        <Stack.Screen name={Screens.RESEND} component={ResendVerifyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
