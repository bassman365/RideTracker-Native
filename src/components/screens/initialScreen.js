import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import {
  getStartScreen,
  refreshProgramCollections,
  refreshTokenAsync,
} from '../../lib/helpers';

export default class InitialScreen extends Component {
  constructor(props) {
    super(props);

        //TODO use promise all here
        refreshTokenAsync().then(response => {
          const sucessful = response.success ? 'was' : 'was not';
          console.info(`refreshing token ${sucessful} successful`);
        });

        refreshProgramCollections().then(response => {
          const sucessful = response.success ? 'was' : 'was not';
          console.info(`refreshing programCollections ${sucessful} successful`);
        });

        getStartScreen().then(screenName => {
          console.info(`default screen is ${screenName}`);
          this.props.navigation.replace(screenName);
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
