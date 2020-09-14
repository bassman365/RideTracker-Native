/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Screens} from '../../lib/screens';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import {styles} from '../../lib/styles';
import {signInAsync} from '../../lib/api';
import {
  setTokenAsync,
  setVerifiedAsync,
  VerifiedStates,
} from '../../lib/storage';

export default function SignInScreen({navigation}) {
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  async function handleSignInAsync(email, password) {
    try {
      const response = await signInAsync(email, password);
      ToastAndroid.show(response.message, ToastAndroid.LONG);
      if (response.success) {
        await setTokenAsync(response.token);
        await setVerifiedAsync(VerifiedStates.Verified);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  const onSignIn = (email, password) => {
    handleSignInAsync(email, password).then(result => {
      if (result) {
        Keyboard.dismiss();
        navigation.navigate(Screens.HOME);
      }
    });
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{flex: 3}}>
        <View style={{flex: 0.1}} />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.titleText}>Ride Tracker</Text>
        </View>
        <View style={{flex: 0.2}} />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TextInput
            keyboardType="email-address"
            onChangeText={text => setEmailText(text)}
            placeholder="Email"
            style={{flex: 0.8, borderWidth: 0, height: 40}}
          />
        </View>
        <View style={{flex: 0.2}} />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TextInput
            onChangeText={text => setPasswordText(text)}
            placeholder="Password"
            secureTextEntry
            style={{flex: 0.8, borderWidth: 0, height: 40}}
          />
        </View>
      </View>

      <View
        style={{flex: 2, flexDirection: 'column', justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            disabled={emailText.length === 0 || passwordText.length === 0}
            onPress={() => onSignIn(emailText, passwordText)}
            style={
              emailText.length === 0 || passwordText.length === 0
                ? styles.disabledButton
                : styles.button
            }
            testID="signInSubmitButton">
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            onPress={() => navigation.navigate(Screens.SIGNUP)}
            style={styles.linkText}>
            No Account yet? Sign up now.
          </Text>
        </View>
      </View>
    </View>
  );
}
