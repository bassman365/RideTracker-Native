import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../lib/styles';
import { signIn } from '../../lib/api';
import Screens from '../../lib/screens';

type Props = {};
export default class SignInScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      emailText: '',
      passwordText: '',
    };

    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn(email, password) {
    //try to get jwt
    const response = signIn(email, password);
    if(response.success) {
      //if successfull store jwt with AsyncStorage
      this.props.navigation.navigate(Screens.HOME);
    } else {
      //TODO display validation message
      console.error(response.message);
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
        </View>

        <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => this.onSignIn(this.state.emailText, this.state.passwordText)}
              style={styles.button}
              testID="signInSubmitButton">
              <Text style={styles.buttonText}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text
              onPress={() => this.props.navigation.navigate(Screens.SIGNUP)}
              style={styles.linkText}>
              No Account yet? Sign up now.
            </Text>
          </View>
        </View>

      </View>
    );
  }
}

SignInScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired
};