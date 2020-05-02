import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, View, Text } from 'react-native';
import { getInProgressRidesAsync } from '../../lib/storage';
import Screens from '../../lib/screens';
import {NavigationEvents} from 'react-navigation';


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgressRidesExist: false,
      loadingInProgressRides: true,
    };
    this.checkForRides = this.checkForRides.bind(this);
  }

  async checkForRides() {
    this.setState({ loadingInProgressRides: true });
    try {
      const rides = await getInProgressRidesAsync();
      if (rides && rides.length > 0) {
        this.setState({ inProgressRidesExist: true });
      } else {
        this.setState({ inProgressRidesExist: false });
      }
    } catch {
      console.error('failed to get in progress rides');
    } finally {
      this.setState({ loadingInProgressRides: false });
    }
  }

  componentDidMount() {
    this.checkForRides();
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <NavigationEvents onWillFocus={this.checkForRides} />
        <View style={{ flex: 0.1 }} />
        <Button
          onPress={() => this.props.navigation.navigate('SignIn')}
          title="Go to Sign In"
        />
        <View style={{ flex: 0.1 }} />
        {!this.state.loadingInProgressRides && (
          <Button
            onPress={() => this.state.inProgressRidesExist ?
              this.props.navigation.navigate(Screens.FINISH_RIDE) :
              this.props.navigation.navigate(Screens.ADD_RIDE)}
            title={this.state.inProgressRidesExist ?
              "Finish your ride!" :
              "Add a ride!"} />
        )}

        <View style={{ flex: 0.1 }} />
        <Button
          onPress={() => this.props.navigation.navigate(Screens.VIEW_RIDES)}
          title="View Your Rides!"
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
