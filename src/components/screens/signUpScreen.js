import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../lib/styles';
import { signIn } from '../../lib/api';
import Screens from '../../lib/screens';

type Props = {};
export default class SignUpScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      emailText: '',
      passwordText: '',
      passwordConfirmationText: '',
    };

    this.onSignUp = this.onSignUp.bind(this);
    this.onEmailConfirmationValidate = this.onPasswordConfirmationValidate.bind(this);
  }

  onSignUp(email, password) {
    //try to get jwt
    // const response = signIn(email, password);
    // if(response.success) {
    //   //if successfull store jwt with AsyncStorage
    //   this.props.navigation.navigate(Screens.HOME);
    // } else {
    //   //TODO display validation message
    //   console.error(response.message);
    // }
  }

  onPasswordConfirmationValidate(password, passwordConfirmationText) {

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
              onChangeText={(text) => this.setState({ emailText: text })}
              placeholder="Email"
              style={{ flex: 0.8, borderWidth: 0, height: 40 }}
            />
          </View>
          <View style={{ flex: 0.2 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TextInput
              onChangeText={(text) => this.setState({ passwordText: text })}
              placeholder="Password"
              secureTextEntry
              style={{ flex: 0.8, borderWidth: 0, height: 40 }}
            />
          </View>
          <View style={{ flex: 0.2 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TextInput
              onBlur={() => this.onPasswordConfirmationValidate(this.state.passwordText, this.state.passwordConfirmationText)}
              onChangeText={(text) => this.setState({ passwordConfirmationText: text })}
              placeholder="Confirm Password"
              secureTextEntry
              style={{ flex: 0.8, borderWidth: 0, height: 40 }}
            />
          </View>
        </View>

        <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(Screens.HOME)}
              style={styles.button}
              testID="signInSubmitButton">
              <Text style={styles.buttonText}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text
              onPress={() => this.onSignUp(this.state.emailText, this.state.passwordText)}
              style={styles.linkText}>
              No Account yet? Sign up now.
            </Text>
          </View>
        </View> */}

      </View>
    );
  }
}

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired
};
