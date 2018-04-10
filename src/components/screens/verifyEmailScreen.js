import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { styles } from '../../lib/styles';
import { verifyEmail } from '../../lib/api';
import Screens from '../../lib/screens';
import { setVerifiedAsync, VerifiedStates } from '../../lib/storage';

type Props = {};
export default class VerifyScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      verifyCodeText: '',
    };

    this.onVerifySubmit = this.onVerifySubmit.bind(this);
  }

  onVerifySubmit(verifyCode) {
    verifyEmail(verifyCode).then((response) => {
      ToastAndroid.show(
        response.message,
        ToastAndroid.LONG
      );
      if(response.success) {
        setVerifiedAsync(VerifiedStates.Verified)
        this.props.navigation.navigate(Screens.SIGNIN);
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 3 }}>
          <View style={{ flex: 0.1 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.titleText}>
              Ride Tracker
            </Text>
          </View>
          <View style={{ flex: 0.2 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.labelText}>
              Please Enter Your Verification Code!
            </Text>
          </View>
          <View style={{ flex: 0.2 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TextInput
              keyboardType="default"
              onChangeText={(text) => this.setState({ verifyCodeText: text })} //eslint-disable-line  react/no-set-state
              placeholder="Verification code"
              style={{ flex: 0.8, borderWidth: 0, height: 40 }}
            />
          </View>
        </View>

        <View style={{ flex: 0.1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text
              onPress={() => this.props.navigation.navigate(Screens.RESEND)}
              style={styles.linkText}>
              need another code?
            </Text>
          </View>
        </View>

        <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => this.onVerifySubmit(this.state.verifyCodeText)}
              style={styles.button}
              testID="signUpSubmitButton">
              <Text style={styles.buttonText}>
                Submit Verification Code
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }
}

VerifyScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired
};


