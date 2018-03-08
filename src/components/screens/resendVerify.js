import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { styles } from '../../lib/styles';
import { resendVerificationCode } from '../../lib/api';
import Screens from '../../lib/screens';
import { validEmail } from '../../lib/validation';

type Props = {};
export default class ResendVerifyScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      emailText: '',
      emailError: true
    };

    this.onResend = this.onResend.bind(this);
    this.onEmailValidate = this.onEmailValidate.bind(this);
  }

  onResend(email) {
    resendVerificationCode(email).then((response) => {
      ToastAndroid.showWithGravity(
        response.message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      if (response.success) {
        this.props.navigation.navigate(Screens.VERIFY);
      }
    });
  }

  onEmailValidate(email) {
    if (!validEmail(email)) {
      ToastAndroid.showWithGravity(
        'This is not a valid email address!',
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      this.setState({emailError: true}); //eslint-disable-line  react/no-set-state
    } else {
      this.setState({emailError: false}); //eslint-disable-line  react/no-set-state
    }
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
            <TextInput
              keyboardType="email-address"
              onBlur={() => this.onEmailValidate(this.state.emailText)}
              onChangeText={(text) => this.setState({ emailText: text })} //eslint-disable-line  react/no-set-state
              placeholder="Email"
              style={{ flex: 0.8, borderWidth: 0, height: 40 }}
            />
          </View>
        </View>

        <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              disabled={this.state.emailError}
              onPress={() => this.onResend(this.state.emailText)}
              style={this.state.emailError ? styles.disabledButton : styles.button}
              testID="signUpSubmitButton">
              <Text style={styles.buttonText}>
                Resend Verification Code!
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }
}

ResendVerifyScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired
};
