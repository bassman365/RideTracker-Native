import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import GridView from 'react-native-super-grid';
import { getRidesAsync } from '../../lib/api';
import { getDisplayDate } from '../../lib/helpers';

type Props = {};
export default class ViewRidesScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      rides: [],
    }
  }

  componentWillMount() {
    getRidesAsync().then((response) => {
      if(response.success) {
        this.setState({rides: response.rides}); //eslint-disable-line react/no-set-state
      }
    });
  }

  render() {
    return (
      <GridView
        itemDimension={128}
        items={this.state.rides}
        renderItem={ride => (
          <View style={[styles.itemContainer, { backgroundColor: '#2980b9' }]}>
            <Text style={styles.itemName}>Program: {ride.program}</Text>
            <Text style={styles.itemCode}>Date: {getDisplayDate(ride.date)}</Text>
            <Text style={styles.itemCode}>Weight: {ride.weight}</Text>
            <Text style={styles.itemCode}>Calories: {ride.calories}</Text>
            <Text style={styles.itemCode}>Distance: {ride.distance}</Text>
            <Text style={styles.itemCode}>Level: {ride.level}</Text>
          </View>
        )}
        style={styles.gridView}
      />
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 11,
    color: '#fff',
  },
});

ViewRidesScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired
};
