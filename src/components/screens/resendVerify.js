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
import {resendVerificationCode} from '../../lib/api';
import {Screens} from '../../lib/screens';
import {validEmail} from '../../lib/validation';

export default function SignInScreen({navigation}) {
  const [emailText, setEmailText] = useState('');
  const [emailError, setEmailError] = useState(true);

  const onResend = email => {
    resendVerificationCode(email).then(response => {
      ToastAndroid.showWithGravity(
        response.message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
      if (response.success) {
        Keyboard.dismiss();
        navigation.navigate(Screens.VERIFY);
      }
    });
  };

  const onEmailValidate = email => {
    if (!validEmail(email)) {
      ToastAndroid.showWithGravity(
        'This is not a valid email address!',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
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
      </View>

      <View
        style={{flex: 2, flexDirection: 'column', justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            disabled={emailError}
            onPress={() => onResend(emailText)}
            style={emailError ? styles.disabledButton : styles.button}
            testID="signUpSubmitButton">
            <Text style={styles.buttonText}>Resend Verification Code!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
