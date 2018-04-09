import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, View, Text } from 'react-native';
import { refreshToken } from '../../lib/helpers';
import Screens from '../../lib/screens';

type Props = {};
export default class HomeScreen extends Component<Props> {

  componentDidMount() {
    console.info('home did mount');
    refreshToken().then((response) => {
      const sucessful = response.success ? 'was' : 'was not';
      console.info(`refreshing token ${sucessful} successful`);
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Details')}
          title="Go to Details"
        />
        <View style={{ flex: 0.1 }} />
        <Button
          onPress={() => this.props.navigation.navigate('SignIn')}
          title="Go to Sign In"
        />
        <View style={{ flex: 0.1 }} />
        <Button
          onPress={() => this.props.navigation.navigate(Screens.ADD_RIDE)}
          title="Add a ride!"
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
