import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation'
import Screens from '../../lib/screens';
import { VerifiedStates, getVerified } from '../../lib/storage'

type Props = {};
export default class InitialScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.getStartScreen = this.getStartScreen.bind(this);
  }

  componentWillMount() {
    getVerified().then((verified) => {
      switch (verified) {
      case VerifiedStates.Unverifed:
        return Screens.SIGNIN;
      case VerifiedStates.PendingVerification:
        return Screens.VERIFY;
      case VerifiedStates.Verified:
        return Screens.HOME;
      default:
        return Screens.SIGNIN;
      }
    }).then((screenName) => {
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: screenName })]
      }));
    });
  }

  getStartScreen() {
    getVerified().then((verified) => {
      switch (verified) {
      case VerifiedStates.Unverifed:
        return Screens.SIGNIN;
      case VerifiedStates.PendingVerification:
        return Screens.VERIFY;
      case VerifiedStates.Verified:
        return Screens.HOME;
      default:
        return Screens.SIGNIN;
      }
    });
  }

  render() {
    return null;
  }
}

InitialScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func
  }).isRequired
};
