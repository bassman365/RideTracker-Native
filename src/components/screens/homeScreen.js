import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, View, Text } from 'react-native';

type Props = {};
export default class HomeScreen extends Component<Props> {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Details')}
          title="Go to Details"
        />
        <Button
          onPress={() => this.props.navigation.navigate('SignIn')}
          title="Go to Sign In"
        />
      </View>
    );
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired
};
