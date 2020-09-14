/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import {styles} from '../../lib/styles';
import {signUp} from '../../lib/api';
import {Screens} from '../../lib/screens';
import {validEmail} from '../../lib/validation';
import {VerifiedStates, setVerifiedAsync} from '../../lib/storage';

export default function SignUpScreen({navigation}) {
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [passwordConfirmationText, setPasswordConfirmationText] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onSignUp = (email, password) => {
    signUp(email, password).then(response => {
      ToastAndroid.show(response.message, ToastAndroid.LONG);
      if (response.success) {
        setVerifiedAsync(VerifiedStates.PendingVerification).then(() => {
          Keyboard.dismiss();
          navigation.navigate(Screens.VERIFY);
        });
      }
    });
  };

  const onPasswordConfirmationValidate = (password, passwordConfirmation) => {
    if (password !== passwordConfirmation) {
      ToastAndroid.show(
        'Password and confirm password do not match!',
        ToastAndroid.LONG,
      );
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const onEmailValidate = email => {
    if (!validEmail(email)) {
      ToastAndroid.show(
        'This is not a valid email address!',
        ToastAndroid.LONG,
      );
      setEmailError(true);
    } else {
      setEmailError(false);
    }
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
            onBlur={() => onEmailValidate(emailText)}
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
        <View style={{flex: 0.2}} />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TextInput
            onBlur={() =>
              onPasswordConfirmationValidate(
                passwordText,
                passwordConfirmationText,
              )
            }
            onChangeText={text => setPasswordConfirmationText(text)}
            placeholder="Confirm Password"
            secureTextEntry
            style={{flex: 0.8, borderWidth: 0, height: 40}}
          />
        </View>
      </View>

      <View
        style={{flex: 2, flexDirection: 'column', justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            disabled={
              emailError ||
              passwordError ||
              emailText.length === 0 ||
              passwordText.length === 0
            }
            onPress={() => onSignUp(emailText, passwordText, navigation)}
            style={
              emailError ||
              passwordError ||
              emailText.length === 0 ||
              passwordText.length === 0
                ? styles.disabledButton
                : styles.button
            }
            testID="signUpSubmitButton">
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
