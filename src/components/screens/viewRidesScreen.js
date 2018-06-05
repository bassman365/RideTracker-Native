import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import GridView from 'react-native-super-grid';
import { getRidesAsync } from '../../lib/api';
import { getCachedProgramCollectionsAsync } from '../../lib/storage';
import { getShortDisplayDate, getDisplayTimeFromSeconds } from '../../lib/helpers';

type Props = {};
export default class ViewRidesScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      rides: [],
    };
    this.getRidesAsync = this.getRidesAsync.bind(this);
  }

  componentWillMount() {
    this.getRidesAsync().then((rides) => {
      this.setState({rides: rides}); //eslint-disable-line react/no-set-state
    });
  }

  async getRidesAsync() {
    try {
      let rides = [];
      let rideResponse = await getRidesAsync();
      if(!rideResponse.success) {
        throw new Error(rideResponse.message);
      }

      rides = rideResponse.rides;

      let programCollections = await getCachedProgramCollectionsAsync();

      if (programCollections && programCollections.length > 0) {
        const programs = programCollections[0].programs;
        rides.map((ride) => {
          const program = programs.find(x => x.name === ride.program);
          if (program && program.hexColor) {
            ride.color = program.hexColor
          }
        });
      }

      return rides;
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <GridView
        itemDimension={128}
        items={this.state.rides}
        renderItem={ride => (
          <View style={[styles.itemContainer, { backgroundColor: ride.color ? ride.color : '#2980b9' }]}>
            <Text style={styles.itemName}>Program: {ride.program}</Text>
            <Text style={styles.itemCode}>Date: {getShortDisplayDate(ride.date)}</Text>
            <Text style={styles.itemCode}>Weight: {ride.weight}</Text>
            <Text style={styles.itemCode}>Calories: {ride.calories}</Text>
            <Text style={styles.itemCode}>Distance: {ride.distance}</Text>
            <Text style={styles.itemCode}>Level: {ride.level}</Text>
            <Text style={styles.itemCode}>Duration: {getDisplayTimeFromSeconds(ride.durationSeconds)}</Text>
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
    justifyContent: 'space-between',
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
