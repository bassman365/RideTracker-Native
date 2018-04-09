import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation'
import { getStartScreen } from '../../lib/helpers';

type Props = {};
export default class InitialScreen extends Component<Props> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    getStartScreen().then((screenName) => {
      console.info(`default screen is ${screenName}`);
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: screenName })]
      }));
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
