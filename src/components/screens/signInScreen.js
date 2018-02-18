import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {};
export default class SignInScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      emailText: '',
      passwordText: '',
    };
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
              style={{ flex: 0.8, borderWidth: 0, height: 40 }}
            />
          </View>
        </View>

        <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}
              style={styles.button}
              testID="signInSubmitButton">
              <Text style={styles.buttonText}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1, backgroundColor: '#FFEB3B' }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'nanumpenscript_regular',
    fontSize: 42,
  },
  buttonText: {
    fontFamily: 'inconsolata_bold',
    fontSize: 22,
    color: 'white'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4359e8',
    padding: 4,
    height: 40,
    flex: 0.8
  },
});

SignInScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired
};
