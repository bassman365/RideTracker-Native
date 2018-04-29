import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, View, Text } from 'react-native';
import { getInProgressRidesAsync } from '../../lib/storage';
import Screens from '../../lib/screens';

type Props = {};
export default class HomeScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      inProgressRidesExist: false,
    }
  }

  componentWillMount() {
    getInProgressRidesAsync().then((rides) => {
      if (rides && rides.length > 0) {
        this.setState({ inProgressRidesExist: true }); //eslint-disable-line  react/no-set-state
      }
    });
  }

  componentDidMount() {
    console.info('home did mount');
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>

        <View style={{ flex: 0.1 }} />
        <Button
          onPress={() => this.props.navigation.navigate('SignIn')}
          title="Go to Sign In"
        />
        <View style={{ flex: 0.1 }} />
        <Button
          onPress={() => this.state.inProgressRidesExist ?
            this.props.navigation.navigate(Screens.FINISH_RIDE) :
            this.props.navigation.navigate(Screens.ADD_RIDE)}
          title={this.state.inProgressRidesExist ?
            "Finish your ride!" :
            "Add a ride!"}
        />
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
