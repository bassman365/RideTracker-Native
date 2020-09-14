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
import {verifyEmail} from '../../lib/api';
import {Screens} from '../../lib/screens';
import {setVerifiedAsync, VerifiedStates} from '../../lib/storage';

export default function SignInScreen({navigation}) {
  const [verifyCodeText, setVerifyCodeText] = useState('');

  const onVerifySubmit = verifyCode => {
    verifyEmail(verifyCode).then(response => {
      ToastAndroid.show(response.message, ToastAndroid.LONG);
      if (response.success) {
        setVerifiedAsync(VerifiedStates.Verified);
        Keyboard.dismiss();
        navigation.navigate(Screens.SIGNIN);
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
          <Text style={styles.labelText}>
            Please Enter Your Verification Code!
          </Text>
        </View>
        <View style={{flex: 0.2}} />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TextInput
            keyboardType="default"
            onChangeText={text => setVerifyCodeText(text)}
            placeholder="Verification code"
            style={{flex: 0.8, borderWidth: 0, height: 40}}
          />
        </View>
      </View>

      <View style={{flex: 0.1}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            onPress={() => navigation.navigate(Screens.RESEND)}
            style={styles.linkText}>
            need another code?
          </Text>
        </View>
      </View>

      <View
        style={{flex: 2, flexDirection: 'column', justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => onVerifySubmit(verifyCodeText)}
            style={styles.button}
            testID="signUpSubmitButton">
            <Text style={styles.buttonText}>Submit Verification Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
